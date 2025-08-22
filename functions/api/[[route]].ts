import { D1Database, R2Bucket } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
  IMAGES: R2Bucket;
  GEMINI_API_KEY: string;
  R2_PUBLIC_URL?: string; // Optional R2 public URL base
}

interface UserData {
  profile: {
    name: string;
    bio: string;
    imageUrl: string;
  };
  links: Array<{
    id: string;
    title: string;
    url: string;
    isActive: boolean;
    icon?: string;
  }>;
  themeSettings: {
    isDarkMode: boolean;
    colorPaletteId: string;
    backgroundColorId: string;
    backgroundPattern: string;
    cardShadow: boolean;
    borderRadius: string;
    fontFamily: string;
  };
}

// Helper function to generate a unique slug
function generateSlug(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function onRequest(context: { request: Request; env: Env; params: { route: string[] } }) {
  return handleRequest(context);
}

async function handleRequest(context: { request: Request; env: Env; params: { route: string[] } }) {
  const { request, env, params } = context;
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

  const route = params.route?.join('/') || '';
  
  try {
    // GET /api/data - Get single user data (for single-user app)
    if (request.method === 'GET' && route === 'data') {
      // Get the first (and only) user's data
      const userResult = await env.DB.prepare(`
        SELECT id, name, bio, image_url, theme_settings 
        FROM users 
        ORDER BY id DESC 
        LIMIT 1
      `).first();

      if (!userResult) {
        // Return null when no user data exists (users start from zero)
        return new Response('null', {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Get user links
      const linksResult = await env.DB.prepare(`
        SELECT link_id, title, url, is_active, icon
        FROM links 
        WHERE user_id = ? 
        ORDER BY order_index ASC
      `).bind(userResult.id).all();

      const userData: UserData = {
        profile: {
          name: userResult.name as string,
          bio: userResult.bio as string || '',
          imageUrl: userResult.image_url as string || ''
        },
        links: linksResult.results.map((link: any) => ({
          id: link.link_id,
          title: link.title,
          url: link.url,
          isActive: Boolean(link.is_active),
          icon: link.icon || 'Link'
        })),
        themeSettings: JSON.parse(userResult.theme_settings as string)
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
        const file = formData.get('image') as File;
        
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

        let imageUrl: string;

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

          // Return the public URL
          const baseUrl = env.R2_PUBLIC_URL || 'https://your-r2-bucket.r2.dev';
          imageUrl = `${baseUrl}/${filename}`;
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

    // POST /api/save - Save/update user data (single-user mode)
    if (request.method === 'POST' && route === 'save') {
      const userData: UserData = await request.json();
      
      // Check if user already exists
      const userResult = await env.DB.prepare(`
        SELECT id FROM users ORDER BY id DESC LIMIT 1
      `).first();

      let userId: number;

      if (!userResult) {
        // Create first user
        const insertResult = await env.DB.prepare(`
          INSERT INTO users (user_slug, name, bio, image_url, theme_settings, updated_at)
          VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).bind(
          'main', // Fixed slug for single user
          userData.profile.name,
          userData.profile.bio,
          userData.profile.imageUrl,
          JSON.stringify(userData.themeSettings)
        ).run();

        userId = insertResult.meta.last_row_id as number;
      } else {
        // Update existing user
        userId = userResult.id as number;

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

        // Delete existing links
        await env.DB.prepare(`DELETE FROM links WHERE user_id = ?`).bind(userId).run();
      }

      // Insert links
      for (let i = 0; i < userData.links.length; i++) {
        const link = userData.links[i];
        await env.DB.prepare(`
          INSERT INTO links (user_id, link_id, title, url, is_active, order_index, icon)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          userId,
          link.id,
          link.title,
          link.url,
          link.isActive ? 1 : 0,
          i,
          link.icon || 'Link'
        ).run();
      }

      return new Response(JSON.stringify({ 
        success: true
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
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