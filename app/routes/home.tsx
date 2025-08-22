import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import BioLinkPage from "../components/BioLinkPage";
import type { UserData } from "../types";

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

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.cloudflare.env;
  
  try {
    if (!env.DB) {
      return demoUserData;
    }

    // Get the first (and only) user's data
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

    return userData;
  } catch (error) {
    console.error('Failed to load user data for SSR:', error);
    return demoUserData;
  }
}

export default function HomePage() {
  const userData = useLoaderData<typeof loader>();

  return (
    <div className="relative">
      <BioLinkPage userData={userData} />
    </div>
  );
}