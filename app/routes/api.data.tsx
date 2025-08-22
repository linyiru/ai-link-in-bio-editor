import type { LoaderFunctionArgs } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.cloudflare.env;
  
  try {
    // Load user data from database (single user application)
    const userResult = await env.DB.prepare(
      `SELECT id, name, bio, image_url, theme_settings FROM users ORDER BY id DESC LIMIT 1`
    ).first();

    if (!userResult) {
      return Response.json(null, { status: 404 });
    }

    // Load links for this user
    const linksResult = await env.DB.prepare(
      `SELECT id, title, url, icon, is_active FROM links WHERE user_id = ? ORDER BY order_index ASC`
    ).bind(userResult.id).all();

    const userData = {
      profile: {
        name: userResult.name,
        bio: userResult.bio,
        imageUrl: userResult.image_url
      },
      themeSettings: userResult.theme_settings ? JSON.parse(userResult.theme_settings) : {
        isDarkMode: true,
        colorPaletteId: "default",
        backgroundColorId: "default",
        backgroundPattern: "none",
        cardShadow: true,
        borderRadius: "lg",
        fontFamily: "sans"
      },
      links: linksResult.results?.map((link: any) => ({
        id: link.id.toString(),
        title: link.title,
        url: link.url,
        icon: link.icon || 'Link',
        isActive: link.is_active === 1
      })) || []
    };

    return Response.json(userData);
  } catch (error) {
    console.error('Error loading user data:', error);
    return Response.json({ error: 'Failed to load data' }, { status: 500 });
  }
}