// Helper function to generate a unique slug
function generateSlug() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function handleApiRequest(request, env, ctx) {
  const url = new URL(request.url);
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Check if database is available
  if (!env.DB) {
    console.error('Database binding not found');
    return new Response(JSON.stringify({ 
      error: 'Database not configured',
      details: 'D1 database binding is missing. Please check your wrangler.toml configuration and ensure the database is created and bound properly.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Extract route from URL pathname (remove /api/ prefix)
  const route = url.pathname.replace('/api/', '');
  
  try {
    // GET /api/page/:slug - Get user data by slug
    if (request.method === 'GET' && route.startsWith('page/')) {
      const slug = route.split('/')[1];
      
      if (!slug) {
        return new Response(JSON.stringify({ error: 'Slug is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Get user data
      const userResult = await env.DB.prepare(`
        SELECT id, name, bio, image_url, theme_settings 
        FROM users 
        WHERE user_slug = ?
      `).bind(slug).first();

      if (!userResult) {
        return new Response(JSON.stringify({ error: 'Page not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Get user links
      const linksResult = await env.DB.prepare(`
        SELECT link_id, title, url, is_active
        FROM links 
        WHERE user_id = ? 
        ORDER BY order_index ASC
      `).bind(userResult.id).all();

      const userData = {
        profile: {
          name: userResult.name,
          bio: userResult.bio || '',
          imageUrl: userResult.image_url || ''
        },
        links: linksResult.results.map((link) => ({
          id: link.link_id,
          title: link.title,
          url: link.url,
          isActive: Boolean(link.is_active)
        })),
        themeSettings: JSON.parse(userResult.theme_settings)
      };

      return new Response(JSON.stringify(userData), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST /api/upload-image - Upload profile image to R2
    if (request.method === 'POST' && route === 'upload-image') {
      try {
        const formData = await request.formData();
        const file = formData.get('image');
        
        if (!file) {
          return new Response(JSON.stringify({ error: 'No image file provided' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          return new Response(JSON.stringify({ error: 'File must be an image' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Validate file size (max 5MB for R2, 1MB for base64 fallback)
        const maxSize = env.IMAGES ? 5 * 1024 * 1024 : 1024 * 1024;
        if (file.size > maxSize) {
          const maxSizeStr = env.IMAGES ? '5MB' : '1MB (local dev mode)';
          return new Response(JSON.stringify({ error: `File size must be less than ${maxSizeStr}` }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        let imageUrl;

        // Check if R2 is available (production/remote mode)
        if (env.IMAGES) {
          // Generate unique filename
          const fileExtension = file.name.split('.').pop() || 'jpg';
          const filename = `profile-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
          
          // Upload to R2
          const arrayBuffer = await file.arrayBuffer();
          await env.IMAGES.put(filename, arrayBuffer, {
            httpMetadata: {
              contentType: file.type,
            },
          });

          // Determine the best URL strategy for serving images
          if (env.R2_PUBLIC_URL && !env.R2_PUBLIC_URL.includes('your-r2-bucket')) {
            // Option 1: Use configured custom domain (recommended for production)
            imageUrl = `${env.R2_PUBLIC_URL}/${filename}`;
            console.log('Using configured R2_PUBLIC_URL (custom domain):', imageUrl);
          } else {
            // Option 2: Use Worker API endpoint (default - always works, no setup needed)
            imageUrl = `${url.origin}/api/image/${filename}`;
            console.log('Using Worker API endpoint:', imageUrl);
            console.log('💡 For faster loading, set up a custom domain:');
            console.log('   1. Configure a custom domain for your R2 bucket in Cloudflare Dashboard');
            console.log('   2. Set R2_PUBLIC_URL environment variable to your domain');
            console.log('   3. This provides faster direct access with CDN benefits');
          }
        } else {
          // Fallback for local development: return base64 data URL
          console.log('R2 not available, using base64 fallback for local development');
          const arrayBuffer = await file.arrayBuffer();
          const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
          imageUrl = `data:${file.type};base64,${base64}`;
        }
        
        return new Response(JSON.stringify({ 
          success: true, 
          imageUrl: imageUrl,
          isLocal: !env.IMAGES
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Image upload error:', error);
        return new Response(JSON.stringify({ 
          error: 'Failed to upload image',
          details: error instanceof Error ? error.message : 'Unknown error'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // POST /api/save - Save/update user data
    if (request.method === 'POST' && route === 'save') {
      const userData = await request.json();
      
      let userSlug = userData.slug;
      
      // If no slug provided, generate a new one and create new user
      if (!userSlug) {
        userSlug = generateSlug();
        
        // Insert new user
        const insertResult = await env.DB.prepare(`
          INSERT INTO users (user_slug, name, bio, image_url, theme_settings, updated_at)
          VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).bind(
          userSlug,
          userData.profile.name,
          userData.profile.bio,
          userData.profile.imageUrl,
          JSON.stringify(userData.themeSettings)
        ).run();

        const userId = insertResult.meta.last_row_id;

        // Insert links
        for (let i = 0; i < userData.links.length; i++) {
          const link = userData.links[i];
          await env.DB.prepare(`
            INSERT INTO links (user_id, link_id, title, url, is_active, order_index)
            VALUES (?, ?, ?, ?, ?, ?)
          `).bind(
            userId,
            link.id,
            link.title,
            link.url,
            link.isActive ? 1 : 0,
            i
          ).run();
        }
      } else {
        // Update existing user
        const userResult = await env.DB.prepare(`
          SELECT id FROM users WHERE user_slug = ?
        `).bind(userSlug).first();

        if (!userResult) {
          return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const userId = userResult.id;

        // Update user
        await env.DB.prepare(`
          UPDATE users 
          SET name = ?, bio = ?, image_url = ?, theme_settings = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(
          userData.profile.name,
          userData.profile.bio,
          userData.profile.imageUrl,
          JSON.stringify(userData.themeSettings),
          userId
        ).run();

        // Delete existing links and insert new ones
        await env.DB.prepare(`DELETE FROM links WHERE user_id = ?`).bind(userId).run();

        for (let i = 0; i < userData.links.length; i++) {
          const link = userData.links[i];
          await env.DB.prepare(`
            INSERT INTO links (user_id, link_id, title, url, is_active, order_index)
            VALUES (?, ?, ?, ?, ?, ?)
          `).bind(
            userId,
            link.id,
            link.title,
            link.url,
            link.isActive ? 1 : 0,
            i
          ).run();
        }
      }

      return new Response(JSON.stringify({ 
        success: true, 
        slug: userSlug,
        url: `${url.origin}/#/page/${userSlug}`
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET /api/image/:filename - Proxy R2 images for development
    if (request.method === 'GET' && route.startsWith('image/')) {
      const filename = route.split('/')[1];
      
      if (!filename) {
        return new Response('Filename required', { status: 400 });
      }

      try {
        if (env.IMAGES) {
          const object = await env.IMAGES.get(filename);
          if (object === null) {
            return new Response('Image not found', { status: 404 });
          }

          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set('etag', object.httpEtag);
          
          // Add cache headers for better performance
          headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
          headers.set('Access-Control-Allow-Origin', '*');

          return new Response(object.body, {
            headers,
          });
        } else {
          return new Response('R2 storage not available', { status: 503 });
        }
      } catch (error) {
        console.error('Image proxy error:', error);
        return new Response('Failed to fetch image', { status: 500 });
      }
    }

    // GET /api/health - Health check endpoint
    if (request.method === 'GET' && route === 'health') {
      try {
        // Test database connection by checking if tables exist
        const usersTable = await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").first();
        const linksTable = await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='links'").first();
        
        return new Response(JSON.stringify({
          status: usersTable && linksTable ? 'healthy' : 'tables_missing',
          database: 'connected',
          tables: {
            users: !!usersTable,
            links: !!linksTable
          },
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (dbError) {
        return new Response(JSON.stringify({
          status: 'unhealthy',
          database: 'error',
          error: dbError.message,
          timestamp: new Date().toISOString()
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }


    // 404 for unknown routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}