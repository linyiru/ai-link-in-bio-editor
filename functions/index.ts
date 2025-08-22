import { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
  ASSETS: any; // For serving static assets
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

// Demo data for first-time visitors
const demoUserData: UserData = {
  profile: {
    name: "AI Link-in-Bio",
    bio: "Create your beautiful link page ✨",
    imageUrl: ""
  },
  links: [
    {
      id: "1",
      title: "Create Your Page",
      url: "/admin",
      isActive: true,
      icon: "Zap"
    },
    {
      id: "2", 
      title: "About This Tool",
      url: "/about",
      isActive: true,
      icon: "Info"
    },
    {
      id: "3",
      title: "View This Demo",
      url: "/",
      isActive: true,
      icon: "Smartphone"
    },
    {
      id: "4",
      title: "GitHub Repository",
      url: "https://github.com",
      isActive: true,
      icon: "Github"
    }
  ],
  themeSettings: {
    isDarkMode: false,
    colorPaletteId: "blue",
    backgroundColorId: "blue",
    backgroundPattern: "dots",
    cardShadow: true,
    borderRadius: "lg",
    fontFamily: "sans"
  }
};

async function getUserData(env: Env): Promise<UserData> {
  try {
    // Get the user's data from database
    const userResult = await env.DB.prepare(`
      SELECT id, name, bio, image_url, theme_settings 
      FROM users 
      ORDER BY id DESC 
      LIMIT 1
    `).first();

    if (!userResult) {
      return demoUserData;
    }

    // Get user links
    const linksResult = await env.DB.prepare(`
      SELECT link_id, title, url, is_active, icon
      FROM links 
      WHERE user_id = ? 
      ORDER BY order_index ASC
    `).bind(userResult.id).all();

    return {
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
  } catch (error) {
    console.error('Failed to load user data for SSR:', error);
    return demoUserData;
  }
}

export async function onRequest(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Only handle GET requests for the homepage
  if (request.method !== 'GET' || url.pathname !== '/') {
    // Let static assets pass through
    return env.ASSETS.fetch(request);
  }

  // Get user data for SSR
  const userData = await getUserData(env);

  // Inject the user data into the HTML
  const response = await env.ASSETS.fetch(request);
  
  if (response.headers.get('content-type')?.includes('text/html')) {
    let html = await response.text();
    
    // Inject user data as a global variable
    const dataScript = `
      <script>
        window.__INITIAL_USER_DATA__ = ${JSON.stringify(userData)};
      </script>
    `;
    
    // Inject before closing head tag
    html = html.replace('</head>', `${dataScript}</head>`);
    
    return new Response(html, {
      headers: response.headers
    });
  }

  return response;
}