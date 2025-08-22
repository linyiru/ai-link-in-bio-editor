import type { ActionFunctionArgs } from "react-router";

export async function action({ request, context }: ActionFunctionArgs) {
  const env = context.cloudflare.env;
  
  try {
    const userData = await request.json();
    
    // For single-user application, always use user ID 1 or create if doesn't exist
    const existingUser = await env.DB.prepare(
      `SELECT id FROM users ORDER BY id DESC LIMIT 1`
    ).first();

    let userId = existingUser?.id || 1;

    // Update or insert user data
    if (existingUser) {
      await env.DB.prepare(
        `UPDATE users SET 
         name = ?, 
         bio = ?, 
         image_url = ?, 
         theme_settings = ? 
         WHERE id = ?`
      ).bind(
        userData.profile.name,
        userData.profile.bio,
        userData.profile.imageUrl,
        JSON.stringify(userData.themeSettings),
        userId
      ).run();
    } else {
      await env.DB.prepare(
        `INSERT INTO users (name, bio, image_url, theme_settings) 
         VALUES (?, ?, ?, ?)`
      ).bind(
        userData.profile.name,
        userData.profile.bio,
        userData.profile.imageUrl,
        JSON.stringify(userData.themeSettings)
      ).run();
      userId = 1; // First user
    }

    // Clear existing links
    await env.DB.prepare(`DELETE FROM links WHERE user_id = ?`).bind(userId).run();

    // Insert new links
    for (let i = 0; i < userData.links.length; i++) {
      const link = userData.links[i];
      await env.DB.prepare(
        `INSERT INTO links (user_id, link_id, title, url, icon, is_active, order_index) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        userId,
        `link_${Date.now()}_${i}`, // Generate unique link_id
        link.title,
        link.url,
        link.icon || 'Link',
        link.isActive ? 1 : 0,
        i
      ).run();
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    return Response.json(
      { success: false, message: 'Failed to save data' }, 
      { status: 500 }
    );
  }
}