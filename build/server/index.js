import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToReadableStream } from "react-dom/server";
import { ServerRouter, UNSAFE_withComponentProps, Meta, Links, Outlet, ScrollRestoration, Scripts, useLoaderData, Link } from "react-router";
import * as LucideIcons from "lucide-react";
import { useState, forwardRef, useEffect, useMemo, useCallback, useRef } from "react";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { GoogleGenAI } from "@google/genai";
async function handleRequest(request, responseStatusCode, responseHeaders, reactRouterContext, loadContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(ServerRouter, { context: reactRouterContext, url: request.url }),
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (request.signal.aborted) {
    body.cancel();
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        src: "https://cdn.tailwindcss.com"
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_THEME_SETTINGS = {
  isDarkMode: true,
  colorPaletteId: "default",
  backgroundColorId: "default",
  backgroundPattern: "none",
  cardShadow: true,
  borderRadius: "lg",
  fontFamily: "sans"
};
const COLOR_PALETTES = [
  {
    id: "default",
    name: "Default",
    light: { primary: "#EFF6FF", secondary: "#1D4ED8", accent: "#1E40AF" },
    dark: { primary: "#1F2937", secondary: "#FFFFFF", accent: "#D1D5DB" }
  },
  {
    id: "rose",
    name: "Rose",
    light: { primary: "#F43F5E", secondary: "#FFFFFF", accent: "#881337" },
    dark: { primary: "#F43F5E", secondary: "#FFFFFF", accent: "#FECDD3" }
  },
  {
    id: "green",
    name: "Green",
    light: { primary: "#10B981", secondary: "#FFFFFF", accent: "#047857" },
    dark: { primary: "#10B981", secondary: "#FFFFFF", accent: "#A7F3D0" }
  },
  {
    id: "purple",
    name: "Purple",
    light: { primary: "#8B5CF6", secondary: "#FFFFFF", accent: "#5B21B6" },
    dark: { primary: "#8B5CF6", secondary: "#FFFFFF", accent: "#DDD6FE" }
  },
  {
    id: "orange",
    name: "Orange",
    light: { primary: "#F97316", secondary: "#FFFFFF", accent: "#9A3412" },
    dark: { primary: "#F97316", secondary: "#FFFFFF", accent: "#FED7AA" }
  },
  {
    id: "blue",
    name: "Blue",
    light: { primary: "#3B82F6", secondary: "#FFFFFF", accent: "#1E40AF" },
    dark: { primary: "#3B82F6", secondary: "#FFFFFF", accent: "#BFDBFE" }
  },
  {
    id: "teal",
    name: "Teal",
    light: { primary: "#14B8A6", secondary: "#FFFFFF", accent: "#0F766E" },
    dark: { primary: "#14B8A6", secondary: "#FFFFFF", accent: "#99F6E4" }
  },
  {
    id: "pink",
    name: "Pink",
    light: { primary: "#EC4899", secondary: "#FFFFFF", accent: "#9D2463" },
    dark: { primary: "#EC4899", secondary: "#FFFFFF", accent: "#FBCFE8" }
  },
  {
    id: "sky",
    name: "Sky",
    light: { primary: "#0EA5E9", secondary: "#FFFFFF", accent: "#0369A1" },
    dark: { primary: "#0EA5E9", secondary: "#FFFFFF", accent: "#7DD3FC" }
  },
  {
    id: "mint",
    name: "Mint",
    light: { primary: "#34D399", secondary: "#064E3B", accent: "#047857" },
    dark: { primary: "#34D399", secondary: "#FFFFFF", accent: "#A7F3D0" }
  },
  {
    id: "lemon",
    name: "Lemon",
    light: { primary: "#FACC15", secondary: "#422006", accent: "#713F12" },
    dark: { primary: "#FACC15", secondary: "#422006", accent: "#FDE047" }
  },
  {
    id: "coral",
    name: "Coral",
    light: { primary: "#FF7F50", secondary: "#FFFFFF", accent: "#B95C37" },
    dark: { primary: "#FF7F50", secondary: "#FFFFFF", accent: "#FFC0A9" }
  },
  {
    id: "indigo",
    name: "Indigo",
    light: { primary: "#4F46E5", secondary: "#FFFFFF", accent: "#312E81" },
    dark: { primary: "#4F46E5", secondary: "#FFFFFF", accent: "#A5B4FC" }
  },
  {
    id: "stone",
    name: "Stone",
    light: { primary: "#78716C", secondary: "#FFFFFF", accent: "#292524" },
    dark: { primary: "#A8A29E", secondary: "#1C1917", accent: "#E7E5E4" }
  },
  {
    id: "crimson",
    name: "Crimson",
    light: { primary: "#DC2626", secondary: "#FFFFFF", accent: "#7F1D1D" },
    dark: { primary: "#DC2626", secondary: "#FFFFFF", accent: "#FECACA" }
  },
  {
    id: "emerald",
    name: "Emerald",
    light: { primary: "#059669", secondary: "#FFFFFF", accent: "#047857" },
    dark: { primary: "#059669", secondary: "#FFFFFF", accent: "#6EE7B7" }
  },
  {
    id: "lavender",
    name: "Lavender",
    light: { primary: "#C4B5FD", secondary: "#3730A3", accent: "#4338CA" },
    dark: { primary: "#A78BFA", secondary: "#FFFFFF", accent: "#E0E7FF" }
  },
  {
    id: "peach",
    name: "Peach",
    light: { primary: "#FFDAB9", secondary: "#8C5A37", accent: "#B95C37" },
    dark: { primary: "#FFB07C", secondary: "#4D2C1B", accent: "#FFD8B1" }
  },
  {
    id: "olive",
    name: "Olive",
    light: { primary: "#84CC16", secondary: "#1A2E05", accent: "#365314" },
    dark: { primary: "#A3E635", secondary: "#1A2E05", accent: "#D9F99D" }
  },
  {
    id: "navy",
    name: "Navy",
    light: { primary: "#1E3A8A", secondary: "#FFFFFF", accent: "#172554" },
    dark: { primary: "#2563EB", secondary: "#FFFFFF", accent: "#93C5FD" }
  },
  {
    id: "chocolate",
    name: "Chocolate",
    light: { primary: "#78350F", secondary: "#FFFFFF", accent: "#451A03" },
    dark: { primary: "#92400E", secondary: "#FFFFFF", accent: "#FCD9B6" }
  },
  {
    id: "slate",
    name: "Slate",
    light: { primary: "#475569", secondary: "#FFFFFF", accent: "#1E293B" },
    dark: { primary: "#64748B", secondary: "#FFFFFF", accent: "#E2E8F0" }
  },
  {
    id: "gold",
    name: "Gold",
    light: { primary: "#FBBF24", secondary: "#422006", accent: "#B45309" },
    dark: { primary: "#F59E0B", secondary: "#FFFFFF", accent: "#FDE68A" }
  },
  {
    id: "silver",
    name: "Silver",
    light: { primary: "#D1D5DB", secondary: "#111827", accent: "#4B5563" },
    dark: { primary: "#9CA3AF", secondary: "#FFFFFF", accent: "#F3F4F6" }
  }
];
const BACKGROUND_COLORS = [
  { id: "default", name: "Default", light: "bg-gray-100", dark: "bg-gray-900" },
  { id: "slate", name: "Slate", light: "bg-slate-100", dark: "bg-slate-900" },
  { id: "pink", name: "Pink", light: "bg-pink-50", dark: "bg-pink-950" },
  { id: "green", name: "Green", light: "bg-green-50", dark: "bg-green-950" },
  { id: "purple", name: "Purple", light: "bg-purple-50", dark: "bg-purple-950" },
  { id: "orange", name: "Orange", light: "bg-orange-50", dark: "bg-orange-950" },
  { id: "blue", name: "Blue", light: "bg-blue-50", dark: "bg-blue-950" },
  { id: "yellow", name: "Yellow", light: "bg-yellow-50", dark: "bg-yellow-950" }
];
const BACKGROUND_PATTERNS = {
  none: { name: "None", description: "No background pattern", class: "" },
  dots: { name: "Dots", description: "Subtle dotted pattern", class: "bg-[radial-gradient(theme(colors.gray.500/.1)_1px,transparent_1px)] [background-size:16px_16px]" },
  lines: { name: "Lines", description: "Diagonal line pattern", class: "bg-[linear-gradient(45deg,theme(colors.gray.500/.1)_25%,transparent_25%,transparent_50%,theme(colors.gray.500/.1)_50%,theme(colors.gray.500/.1)_75%,transparent_75%,transparent)] [background-size:20px_20px]" },
  waves: { name: "Waves", description: "Wavy line pattern", class: `bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2080%2040'%20width='80'%20height='40'%3E%3Cpath%20fill='none'%20stroke='rgba(120,120,120,0.1)'%20stroke-width='2'%20d='M0%2039.5c10-10%2030-10%2040%200s30%2010%2040%200v-40C70%20-10.5%2050%20-10.5%2040%200S10-10.5%200%200'%3E%3C/path%3E%3C/svg%3E")]` }
};
const BORDER_RADIUS_OPTIONS = [
  { id: "none", name: "None", class: "rounded-none" },
  { id: "sm", name: "Small", class: "rounded-md" },
  { id: "md", name: "Medium", class: "rounded-xl" },
  { id: "lg", name: "Large", class: "rounded-full" }
];
const FONT_FAMILY_OPTIONS = [
  { id: "sans", name: "Sans", description: "Clean, modern sans-serif font (Inter)", class: "font-sans", previewText: "The quick brown fox jumps over the lazy dog." },
  { id: "serif", name: "Serif", description: "Elegant serif font with classic appeal (Merriweather)", class: "font-serif", previewText: "The quick brown fox jumps over the lazy dog." }
];
const INITIAL_USER_DATA = {
  profile: {
    name: "Your Name",
    bio: "Welcome to my page! Check out my links below.",
    imageUrl: "https://picsum.photos/id/870/200/200"
  },
  links: [
    { id: "1", title: "Personal Website", url: "https://www.haydenbleasel.com/", isActive: true },
    { id: "2", title: "X / Twitter", url: "https://x.com/haydenbleasel", isActive: true },
    { id: "3", title: "GitHub", url: "https://github.com/haydenbleasel", isActive: true },
    { id: "4", title: "LinkedIn", url: "https://www.linkedin.com/in/haydenbleasel", isActive: true }
  ],
  themeSettings: DEFAULT_THEME_SETTINGS
};
function getThemeStyles(themeSettings) {
  const {
    isDarkMode,
    colorPaletteId,
    backgroundColorId,
    cardShadow,
    borderRadius,
    fontFamily
  } = themeSettings;
  const bgColor = BACKGROUND_COLORS.find((c) => c.id === backgroundColorId) || BACKGROUND_COLORS[0];
  const backgroundClass = isDarkMode ? bgColor.dark : bgColor.light;
  const palette = COLOR_PALETTES.find((p) => p.id === colorPaletteId) || COLOR_PALETTES[0];
  const modeStyles = isDarkMode ? palette.dark : palette.light;
  const textClass = `text-[${modeStyles.accent}]`;
  const buttonClass = `bg-[${modeStyles.primary}] text-[${modeStyles.secondary}]`;
  const accentHoverTextClass = `hover:text-[${modeStyles.accent}]`;
  const iconWrapperClass = `bg-[${modeStyles.primary}] text-[${modeStyles.secondary}]`;
  const font = FONT_FAMILY_OPTIONS.find((f) => f.id === fontFamily) || FONT_FAMILY_OPTIONS[0];
  const fontClass = font.class;
  const radius = BORDER_RADIUS_OPTIONS.find((r) => r.id === borderRadius) || BORDER_RADIUS_OPTIONS[0];
  const borderRadiusClass = radius.class;
  const shadowClass = cardShadow ? "shadow-lg" : "shadow-none";
  return {
    backgroundClass,
    textClass,
    buttonClass,
    fontClass,
    borderRadiusClass,
    shadowClass,
    accentHoverTextClass,
    iconWrapperClass
  };
}
const BioLinkPage = ({ userData, isPreview = false }) => {
  if (!userData) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-900 text-white flex items-center justify-center", children: "Loading..." });
  }
  const { profile, links: links2, themeSettings } = userData;
  if (!profile || !themeSettings) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-900 text-white flex items-center justify-center", children: "Loading..." });
  }
  const {
    backgroundClass,
    textClass,
    buttonClass,
    fontClass,
    borderRadiusClass,
    shadowClass
  } = getThemeStyles(themeSettings);
  const patternClass = BACKGROUND_PATTERNS[themeSettings.backgroundPattern].class;
  const heightClass = isPreview ? "h-full" : "min-h-screen";
  const contentHeightClass = isPreview ? "h-full" : "min-h-screen";
  const justifyClass = isPreview ? "justify-start pt-8" : "justify-center";
  const renderIcon = (iconName) => {
    if (!iconName) return /* @__PURE__ */ jsx(LucideIcons.Link, { size: 20 });
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { size: 20 }) : /* @__PURE__ */ jsx(LucideIcons.Link, { size: 20 });
  };
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center ${heightClass} w-full p-6 text-center transition-all duration-300 ${fontClass} ${backgroundClass}`, children: [
    /* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${patternClass} transition-all duration-300` }),
    /* @__PURE__ */ jsx("div", { className: `relative z-10 flex flex-col items-center ${justifyClass} w-full ${contentHeightClass} py-8`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full max-w-sm mx-auto", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: profile.imageUrl || "https://picsum.photos/200",
          alt: "Profile",
          className: "w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-2 border-white/50"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: `text-2xl font-bold ${textClass}`, children: profile.name }),
      /* @__PURE__ */ jsx("p", { className: `mt-2 mb-6 text-sm max-w-xs ${textClass}`, children: profile.bio }),
      /* @__PURE__ */ jsx("div", { className: "w-full space-y-3", children: (links2 || []).filter((link) => link.isActive).map((link) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: link.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: `flex items-center justify-center gap-3 w-full p-4 font-semibold transition-transform duration-200 hover:scale-105 ${buttonClass} ${borderRadiusClass} ${shadowClass}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: renderIcon(link.icon) }),
            /* @__PURE__ */ jsx("span", { className: "flex-1 text-center", children: link.title }),
            /* @__PURE__ */ jsx("span", { className: "w-5 flex-shrink-0" }),
            " "
          ]
        },
        link.id
      )) })
    ] }) })
  ] });
};
const demoUserData$1 = {
  profile: {
    name: "AI Link-in-Bio",
    bio: "Create your beautiful link page ✨",
    imageUrl: ""
  },
  links: [{
    id: "1",
    title: "Create Your Page",
    url: "/admin",
    isActive: true,
    icon: "Zap"
  }, {
    id: "2",
    title: "About This Tool",
    url: "/about",
    isActive: true,
    icon: "Info"
  }, {
    id: "3",
    title: "View This Demo",
    url: "/",
    isActive: true,
    icon: "Smartphone"
  }, {
    id: "4",
    title: "GitHub Repository",
    url: "https://github.com",
    isActive: true,
    icon: "Github"
  }],
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
async function loader$2({
  context
}) {
  const env = context.cloudflare.env;
  try {
    if (!env.DB) {
      return demoUserData$1;
    }
    const userResult = await env.DB.prepare(`
      SELECT id, name, bio, image_url, theme_settings 
      FROM users 
      ORDER BY id DESC 
      LIMIT 1
    `).first();
    if (!userResult) {
      return demoUserData$1;
    }
    const linksResult = await env.DB.prepare(`
      SELECT link_id, title, url, is_active, icon
      FROM links 
      WHERE user_id = ? 
      ORDER BY order_index ASC
    `).bind(userResult.id).all();
    const userData = {
      profile: {
        name: userResult.name,
        bio: userResult.bio || "",
        imageUrl: userResult.image_url || ""
      },
      links: linksResult.results.map((link) => ({
        id: link.link_id,
        title: link.title,
        url: link.url,
        isActive: Boolean(link.is_active),
        icon: link.icon || "Link"
      })),
      themeSettings: JSON.parse(userResult.theme_settings)
    };
    return userData;
  } catch (error) {
    console.error("Failed to load user data for SSR:", error);
    return demoUserData$1;
  }
}
const home = UNSAFE_withComponentProps(function HomePage() {
  const userData = useLoaderData();
  return /* @__PURE__ */ jsx("div", {
    className: "relative",
    children: /* @__PURE__ */ jsx(BioLinkPage, {
      userData
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const API_BASE = "/api";
class DataService {
  // Load user data from server (still used by admin interface)
  static async loadUserData() {
    try {
      const response = await fetch(`${API_BASE}/data`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error("Failed to load data from server:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Network error loading data:", error);
      return null;
    }
  }
  // Save data to server
  static async saveUserData(userData) {
    try {
      const response = await fetch(`${API_BASE}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.json().catch(() => ({ message: "Unknown error" }));
        return {
          success: false,
          error: error.message || "Failed to save data"
        };
      }
    } catch (error) {
      console.error("Failed to save data:", error);
      return {
        success: false,
        error: "Network error: Unable to save data"
      };
    }
  }
}
const LinkIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" }) });
const UserIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" }) });
const PaletteIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8a2 2 0 002-2v-4a2 2 0 00-2-2h-8a2 2 0 00-2 2v4a2 2 0 002 2z" }) });
const TrashIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) });
const PlusIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) });
const PencilIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }) });
const SparklesIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 3v4M3 5h4M6 17v4m-2-2h4m1-12a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V6zM17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }) });
const SunIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" }) });
const LayoutTemplateIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 8.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6A2.25 2.25 0 0 1 15.75 3.75h2.25A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" }) });
const DragHandleIcon = ({ className }) => /* @__PURE__ */ jsxs("svg", { className, viewBox: "0 0 20 20", fill: "currentColor", children: [
  /* @__PURE__ */ jsx("circle", { cx: "7", cy: "5", r: "1.5" }),
  /* @__PURE__ */ jsx("circle", { cx: "13", cy: "5", r: "1.5" }),
  /* @__PURE__ */ jsx("circle", { cx: "7", cy: "10", r: "1.5" }),
  /* @__PURE__ */ jsx("circle", { cx: "13", cy: "10", r: "1.5" }),
  /* @__PURE__ */ jsx("circle", { cx: "7", cy: "15", r: "1.5" }),
  /* @__PURE__ */ jsx("circle", { cx: "13", cy: "15", r: "1.5" })
] });
const COMMON_LINK_ICONS = [
  { name: "Link", label: "Website" },
  { name: "Youtube", label: "YouTube" },
  { name: "Instagram", label: "Instagram" },
  { name: "Twitter", label: "Twitter/X" },
  { name: "Facebook", label: "Facebook" },
  { name: "Linkedin", label: "LinkedIn" },
  { name: "Github", label: "GitHub" },
  { name: "Mail", label: "Email" },
  { name: "MessageCircle", label: "Chat" },
  { name: "Phone", label: "Phone" },
  { name: "MapPin", label: "Location" },
  { name: "Calendar", label: "Calendar" },
  { name: "Music", label: "Music" },
  { name: "Camera", label: "Photography" },
  { name: "ShoppingBag", label: "Shop" },
  { name: "Heart", label: "Favorite" },
  { name: "Star", label: "Featured" },
  { name: "BookOpen", label: "Blog" },
  { name: "Video", label: "Video" },
  { name: "Headphones", label: "Podcast" },
  { name: "Briefcase", label: "Portfolio" },
  { name: "Globe", label: "Website" },
  { name: "Zap", label: "Featured" },
  { name: "Coffee", label: "Support" }
];
const IconPicker = ({ selectedIcon, onIconSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredIcons = COMMON_LINK_ICONS.filter(
    (icon) => icon.label.toLowerCase().includes(searchTerm.toLowerCase()) || icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleIconSelect = (iconName) => {
    onIconSelect(iconName);
    onClose();
  };
  const renderIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return null;
    return /* @__PURE__ */ jsx(IconComponent, { size: 20 });
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full max-h-[500px] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Choose an Icon" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "text-gray-400 hover:text-gray-600 transition-colors",
          children: /* @__PURE__ */ jsx(LucideIcons.X, { size: 20 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(LucideIcons.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 16 }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search icons...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2 overflow-y-auto flex-1", children: filteredIcons.map((icon) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleIconSelect(icon.name),
        className: `flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:bg-gray-50 ${selectedIcon === icon.name ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`,
        title: icon.label,
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-gray-700 mb-1", children: renderIcon(icon.name) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 text-center leading-tight", children: icon.label })
        ]
      },
      icon.name
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t border-gray-200", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleIconSelect(""),
        className: "w-full py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm",
        children: "Remove Icon"
      }
    ) })
  ] }) });
};
const LinkItem = forwardRef(({ link, isEditing, themeStyles, onEdit, onSave, onCancel, onDelete, onToggleActive, style, handleAttributes, handleListeners, showHandle = true }, ref) => {
  const [editTitle, setEditTitle] = useState(link.title);
  const [editUrl, setEditUrl] = useState(link.url);
  const [editIcon, setEditIcon] = useState(link.icon || "");
  const [showIconPicker, setShowIconPicker] = useState(false);
  useEffect(() => {
    if (isEditing) {
      setEditTitle(link.title);
      setEditUrl(link.url);
      setEditIcon(link.icon || "");
    }
  }, [isEditing, link.title, link.url, link.icon]);
  const handleSave = () => {
    onSave(link.id, editTitle, editUrl, editIcon);
  };
  const renderIcon = (iconName) => {
    if (!iconName) return /* @__PURE__ */ jsx(LucideIcons.Link, { size: 20 });
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { size: 20 }) : /* @__PURE__ */ jsx(LucideIcons.Link, { size: 20 });
  };
  return /* @__PURE__ */ jsxs("div", { ref, style, ...handleAttributes, className: `bg-gray-900 rounded-lg transition-all hover:bg-gray-800/50 ${isEditing ? "border border-blue-500" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-4 ${isEditing ? "p-4" : "p-3"}`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          ...handleListeners,
          className: `p-1 cursor-grab text-gray-500 hover:text-white transition-colors focus:outline-none ${!showHandle || isEditing ? "hidden" : ""}`,
          "aria-label": "Drag to reorder",
          title: "Drag to reorder",
          children: /* @__PURE__ */ jsx(DragHandleIcon, { className: "w-5 h-5" })
        }
      ),
      isEditing ? /* @__PURE__ */ jsxs("div", { className: "w-full space-y-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: editTitle,
            onChange: (e) => setEditTitle(e.target.value),
            className: "w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white",
            placeholder: "Link title",
            "aria-label": "Link title"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            value: editUrl,
            onChange: (e) => setEditUrl(e.target.value),
            className: "w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white",
            placeholder: "Link URL",
            "aria-label": "Link URL"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-300", children: "Icon" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowIconPicker(true),
              className: "flex items-center gap-2 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors",
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-gray-300", children: renderIcon(editIcon) }),
                /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: editIcon || "Choose icon..." }),
                /* @__PURE__ */ jsx(LucideIcons.ChevronDown, { size: 16, className: "text-gray-400" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: onCancel, className: "px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600", children: "Cancel" }),
          /* @__PURE__ */ jsx("button", { onClick: handleSave, className: `px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${themeStyles.buttonClass}`, children: "Save" })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${themeStyles.iconWrapperClass}`, children: renderIcon(link.icon || "") }),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow overflow-hidden", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-white truncate", children: link.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 truncate", children: link.url })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 flex items-center gap-3 ml-auto", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: `toggle-${link.id}`, className: "flex items-center cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: `toggle-${link.id}`, className: "sr-only", checked: link.isActive, onChange: (e) => onToggleActive(e.target.checked), "aria-label": `Toggle ${link.title || "link"} active`, title: `Toggle ${link.title || "link"} active` }),
            /* @__PURE__ */ jsx("div", { className: `block w-10 h-6 rounded-full transition ${link.isActive ? "bg-blue-500" : "bg-gray-700"}` }),
            /* @__PURE__ */ jsx("div", { className: `dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${link.isActive ? "translate-x-4" : "translate-x-0"}` })
          ] }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => onEdit(link.id), className: `p-1 text-gray-400 transition-colors ${themeStyles.accentHoverTextClass}`, "aria-label": "Edit link", title: "Edit link", children: /* @__PURE__ */ jsx(PencilIcon, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => onDelete(link.id), className: "p-1 text-red-500/80 hover:text-red-500 transition-colors", "aria-label": "Delete link", title: "Delete link", children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" }) })
        ] })
      ] })
    ] }),
    showIconPicker && /* @__PURE__ */ jsx(
      IconPicker,
      {
        selectedIcon: editIcon,
        onIconSelect: setEditIcon,
        onClose: () => setShowIconPicker(false)
      }
    )
  ] });
});
LinkItem.displayName = "LinkItem";
const SortableLinkItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.1 : 1,
    zIndex: isDragging ? 50 : "auto"
  };
  return /* @__PURE__ */ jsx(
    LinkItem,
    {
      ref: setNodeRef,
      style,
      handleAttributes: attributes,
      handleListeners: listeners,
      ...props
    }
  );
};
const LinksEditor = ({ userData, setUserData }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [editingLinkId, setEditingLinkId] = useState(null);
  const { themeSettings } = userData;
  const themeStyles = useMemo(() => getThemeStyles(themeSettings), [themeSettings]);
  const [activeId, setActiveId] = useState(null);
  const linkIds = useMemo(() => userData.links.map((l) => l.id), [userData.links]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleAddLink = () => {
    if (!newTitle || !newUrl) return;
    const newId = `link_${userData.links.length}_${newTitle.replace(/\s+/g, "_").toLowerCase()}`;
    const newLink = {
      id: newId,
      title: newTitle,
      url: newUrl,
      isActive: true,
      icon: "Link"
      // Default icon
    };
    setUserData((prev) => ({ ...prev, links: [...prev.links, newLink] }));
    setNewTitle("");
    setNewUrl("");
  };
  const handleLinkChange = useCallback((id, field, value) => {
    setUserData((prev) => ({
      ...prev,
      links: prev.links.map((link) => link.id === id ? { ...link, [field]: value } : link)
    }));
  }, [setUserData]);
  const handleDeleteLink = useCallback((id) => {
    setUserData((prev) => ({ ...prev, links: prev.links.filter((link) => link.id !== id) }));
  }, [setUserData]);
  const handleSaveEdit = (id, title, url, icon) => {
    handleLinkChange(id, "title", title);
    handleLinkChange(id, "url", url);
    if (icon !== void 0) {
      handleLinkChange(id, "icon", icon);
    }
    setEditingLinkId(null);
  };
  const handleDragStart = useCallback((event) => {
    setActiveId(String(event.active.id));
  }, []);
  const handleDragCancel = useCallback((_event) => {
    setActiveId(null);
  }, []);
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setUserData((prev) => {
        const oldIndex = prev.links.findIndex((link) => link.id === active.id);
        const newIndex = prev.links.findIndex((link) => link.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return { ...prev, links: arrayMove(prev.links, oldIndex, newIndex) };
      });
    }
    setActiveId(null);
  }, [setUserData]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Link Title" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "e.g. My Website",
            value: newTitle,
            onChange: (e) => setNewTitle(e.target.value),
            className: "w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "URL" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            placeholder: "https://example.com",
            value: newUrl,
            onChange: (e) => setNewUrl(e.target.value),
            className: "w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleAddLink,
        className: `w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors ${themeStyles.buttonClass}`,
        children: [
          /* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }),
          " Add Link"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mt-8", children: "Your Links" }),
      /* @__PURE__ */ jsxs(DndContext, { sensors, collisionDetection: closestCenter, modifiers: [restrictToVerticalAxis], onDragStart: handleDragStart, onDragCancel: handleDragCancel, onDragEnd: handleDragEnd, children: [
        /* @__PURE__ */ jsx(SortableContext, { items: linkIds, strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: userData.links.map((link) => /* @__PURE__ */ jsx(
          SortableLinkItem,
          {
            id: link.id,
            link,
            themeStyles,
            isEditing: editingLinkId === link.id,
            onEdit: () => setEditingLinkId(link.id),
            onSave: handleSaveEdit,
            onCancel: () => setEditingLinkId(null),
            onDelete: handleDeleteLink,
            onToggleActive: (isActive) => handleLinkChange(link.id, "isActive", isActive)
          },
          link.id
        )) }) }),
        /* @__PURE__ */ jsx(DragOverlay, { children: activeId ? (() => {
          const activeLink = userData.links.find((l) => l.id === activeId);
          return activeLink ? /* @__PURE__ */ jsx(
            LinkItem,
            {
              link: activeLink,
              isEditing: false,
              themeStyles,
              onEdit: () => {
              },
              onSave: () => {
              },
              onCancel: () => {
              },
              onDelete: () => {
              },
              onToggleActive: () => {
              },
              showHandle: false
            }
          ) : null;
        })() : null })
      ] })
    ] })
  ] });
};
const API_KEY = "PLACEHOLDER_API_KEY";
let ai = null;
{
  ai = new GoogleGenAI({ apiKey: API_KEY });
}
const isAiAvailable = !!ai;
const generateBio = async (keywords) => {
  if (!ai) {
    return Promise.resolve("AI features are disabled. Please configure your API_KEY.");
  }
  try {
    const prompt = `Generate a short, engaging, and professional bio (max 160 characters) for a 'link-in-bio' page. The bio should be based on these keywords: "${keywords}". The tone should be friendly yet professional. Do not use hashtags.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 50,
        temperature: 0.7
      }
    });
    return response.text.trim().replace(/^"|"$/g, "");
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Failed to generate bio. Please try again.";
  }
};
const ImageUpload = ({
  currentImageUrl,
  onImageUploaded,
  className = ""
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileSelect = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if (result.success && result.imageUrl) {
        onImageUploaded(result.imageUrl);
      } else {
        setError(result.error || "Failed to upload image");
      }
    } catch (error2) {
      console.error("Upload error:", error2);
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      handleFileSelect(file);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: handleClick,
        onDrop: handleDrop,
        onDragOver: handleDragOver,
        className: `
          relative w-24 h-24 mx-auto rounded-full border-2 border-dashed border-gray-600 
          hover:border-gray-500 transition-colors cursor-pointer group overflow-hidden
          ${uploading ? "pointer-events-none opacity-50" : ""}
        `,
        children: [
          currentImageUrl ? /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: currentImageUrl,
                alt: "Profile",
                className: "w-full h-full object-cover rounded-full"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(LucideIcons.Upload, { size: 16, className: "text-white" }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center text-gray-500 group-hover:text-gray-400 transition-colors", children: [
            /* @__PURE__ */ jsx(LucideIcons.Upload, { size: 20, className: "mb-1" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Upload" })
          ] }),
          uploading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(LucideIcons.Loader2, { size: 16, className: "text-white animate-spin" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        onChange: handleFileInputChange,
        className: "hidden"
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm mt-2 text-center", children: error }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs mt-2 text-center", children: [
      "Click or drag image to upload",
      /* @__PURE__ */ jsx("br", {}),
      "Max 5MB, JPG/PNG"
    ] })
  ] });
};
const ProfileEditor = ({ userData, setUserData }) => {
  const [bioKeywords, setBioKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const handleProfileChange = (field, value) => {
    setUserData((prev) => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  };
  const handleGenerateBio = async () => {
    if (!bioKeywords) return;
    setIsGenerating(true);
    const newBio = await generateBio(bioKeywords);
    handleProfileChange("bio", newBio);
    setIsGenerating(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-400 mb-4", children: "Profile Picture" }),
      /* @__PURE__ */ jsx(
        ImageUpload,
        {
          currentImageUrl: userData.profile.imageUrl,
          onImageUploaded: (imageUrl) => handleProfileChange("imageUrl", imageUrl),
          className: "flex flex-col items-center"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "profile-name", className: "block text-sm font-medium text-gray-400 mb-2", children: "Profile Title" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "profile-name",
          type: "text",
          value: userData.profile.name,
          onChange: (e) => handleProfileChange("name", e.target.value),
          placeholder: "Your name or title",
          "aria-label": "Profile title",
          className: "w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "profile-bio", className: "block text-sm font-medium text-gray-400 mb-2", children: "Bio" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "profile-bio",
          value: userData.profile.bio,
          onChange: (e) => handleProfileChange("bio", e.target.value),
          rows: 3,
          placeholder: "Tell your audience about yourself",
          "aria-label": "Profile bio",
          className: "w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-900 rounded-lg border border-gray-800", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-1", children: "Generate Bio with AI" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-3", children: "Describe yourself in a few keywords." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "e.g., 'React developer, coffee lover'",
            value: bioKeywords,
            onChange: (e) => setBioKeywords(e.target.value),
            disabled: !isAiAvailable || isGenerating,
            className: "w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800/50"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleGenerateBio,
            disabled: !isAiAvailable || isGenerating || !bioKeywords,
            className: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-40",
            children: isGenerating ? /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(SparklesIcon, { className: "w-5 h-5" }),
              " Generate"
            ] })
          }
        )
      ] }),
      !isAiAvailable && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "AI features disabled. Set API_KEY to enable." })
    ] })
  ] }) });
};
const ThemeEditor = ({ userData, setUserData }) => {
  const { themeSettings } = userData;
  const [themeTab, setThemeTab] = useState("colors");
  const handleThemeChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      themeSettings: { ...prev.themeSettings, [field]: value }
    }));
  };
  const resetDefaults = () => {
    setUserData((prev) => ({ ...prev, themeSettings: DEFAULT_THEME_SETTINGS }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white", children: "Theme Settings" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Customize the appearance of your page" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: resetDefaults, className: "px-4 py-2 text-sm font-medium bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors", children: "Reset Defaults" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-lg p-4 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(SunIcon, { className: "w-6 h-6 text-gray-400" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: "Dark Mode" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Switch between light and dark theme" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("label", { htmlFor: "dark-mode-toggle", className: "flex items-center cursor-pointer", title: "Toggle dark mode", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", id: "dark-mode-toggle", className: "sr-only", checked: themeSettings.isDarkMode, onChange: (e) => handleThemeChange("isDarkMode", e.target.checked), "aria-label": "Toggle dark mode", title: "Toggle dark mode" }),
        /* @__PURE__ */ jsx("div", { className: "block bg-gray-700 w-12 h-7 rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: `dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${themeSettings.isDarkMode ? "translate-x-5" : ""}` })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-1 flex space-x-1 bg-gray-900 rounded-lg", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setThemeTab("colors"), className: `w-full py-2 text-sm font-semibold rounded-md ${themeTab === "colors" ? "bg-gray-800" : "hover:bg-gray-800/50"}`, children: "Colors" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setThemeTab("background"), className: `w-full py-2 text-sm font-semibold rounded-md ${themeTab === "background" ? "bg-gray-800" : "hover:bg-gray-800/50"}`, children: "Background" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setThemeTab("effects"), className: `w-full py-2 text-sm font-semibold rounded-md ${themeTab === "effects" ? "bg-gray-800" : "hover:bg-gray-800/50"}`, children: "Effects" })
    ] }),
    themeTab === "colors" && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: "Color Theme" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4 mt-3", children: COLOR_PALETTES.map((palette) => {
          const currentModePalette = themeSettings.isDarkMode ? palette.dark : palette.light;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleThemeChange("colorPaletteId", palette.id),
              className: `text-center space-y-2 p-3 rounded-lg border-2 transition-colors focus:outline-none ${themeSettings.colorPaletteId === palette.id ? "border-blue-500 bg-gray-900" : "border-gray-800 bg-gray-900/50 hover:border-gray-700"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "w-10 h-10 mx-auto rounded-full overflow-hidden flex items-center justify-center border border-white/10", children: [
                  /* @__PURE__ */ jsx("div", { style: { backgroundColor: currentModePalette.primary }, className: "w-1/2 h-full" }),
                  /* @__PURE__ */ jsx("div", { className: "w-[3px] h-full bg-gray-900" }),
                  /* @__PURE__ */ jsx("div", { style: { backgroundColor: currentModePalette.secondary }, className: "w-1/2 h-full" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium capitalize", children: palette.name })
              ]
            },
            palette.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: "Theme Preview" }),
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-900 rounded-lg mt-3 space-y-4 border border-gray-800", children: (() => {
          const currentPalette = COLOR_PALETTES.find((p) => p.id === themeSettings.colorPaletteId) || COLOR_PALETTES[0];
          const currentColors = themeSettings.isDarkMode ? currentPalette.dark : currentPalette.light;
          const previewItems = [
            { label: "Primary", color: currentColors.primary },
            { label: "Secondary", color: currentColors.secondary },
            { label: "Accent", color: currentColors.accent }
          ];
          return previewItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                style: { backgroundColor: item.color },
                className: "w-8 h-8 rounded-full border-2 border-white/10"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: item.label })
          ] }, item.label));
        })() })
      ] })
    ] }),
    themeTab === "background" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: "Page Background Color" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-3", children: "Choose a background color for your page" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4", children: BACKGROUND_COLORS.map((color) => /* @__PURE__ */ jsx("button", { onClick: () => handleThemeChange("backgroundColorId", color.id), className: `w-full h-12 rounded-lg border-2 ${themeSettings.backgroundColorId === color.id ? "border-blue-500" : "border-gray-700 hover:border-gray-500"} ${themeSettings.isDarkMode ? color.dark : color.light}`, "aria-label": `Select background color ${color.id}`, title: `Select background color ${color.id}` }, color.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: "Background Pattern" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 mt-3", children: Object.entries(BACKGROUND_PATTERNS).map(([id, pattern]) => /* @__PURE__ */ jsxs("button", { onClick: () => handleThemeChange("backgroundPattern", id), className: `p-3 rounded-lg border-2 text-left ${themeSettings.backgroundPattern === id ? "border-blue-500" : "border-gray-800 bg-gray-900 hover:border-gray-700"}`, children: [
          /* @__PURE__ */ jsx("div", { className: `h-16 rounded-md bg-gray-800 mb-2 ${pattern.class}` }),
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-white", children: pattern.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: pattern.description })
        ] }, id)) })
      ] })
    ] }),
    themeTab === "effects" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-gray-900 p-3 rounded-lg border border-gray-800", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: "Card Shadow" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Add shadows to cards for depth" })
        ] }),
        /* @__PURE__ */ jsx("label", { htmlFor: "shadow-toggle", className: "flex items-center cursor-pointer", title: "Toggle card shadow", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", id: "shadow-toggle", className: "sr-only", checked: themeSettings.cardShadow, onChange: (e) => handleThemeChange("cardShadow", e.target.checked), "aria-label": "Toggle card shadow", title: "Toggle card shadow" }),
          /* @__PURE__ */ jsx("div", { className: "block bg-gray-700 w-12 h-7 rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: `dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${themeSettings.cardShadow ? "translate-x-5" : ""}` })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white mb-2", children: "Border Radius" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: BORDER_RADIUS_OPTIONS.map((option) => /* @__PURE__ */ jsx("button", { onClick: () => handleThemeChange("borderRadius", option.id), className: `py-2 text-sm font-semibold rounded-md ${themeSettings.borderRadius === option.id ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700"}`, children: option.name }, option.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white mb-2", children: "Font Family" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: FONT_FAMILY_OPTIONS.map((option) => /* @__PURE__ */ jsxs("button", { onClick: () => handleThemeChange("fontFamily", option.id), className: `block w-full text-left p-4 rounded-lg border-2 ${themeSettings.fontFamily === option.id ? "border-blue-500 bg-gray-900" : "border-gray-800 bg-gray-900 hover:border-gray-700"}`, children: [
          /* @__PURE__ */ jsx("p", { className: `text-lg font-medium text-white ${option.class}`, children: option.name }),
          /* @__PURE__ */ jsx("p", { className: `text-sm text-gray-400 mt-1 ${option.class}`, children: option.previewText }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: option.description })
        ] }, option.id)) })
      ] })
    ] })
  ] });
};
const createTemplate = (category, index, settings) => {
  const defaultSettings = {
    isDarkMode: true,
    colorPaletteId: "default",
    backgroundColorId: "default",
    backgroundPattern: "none",
    cardShadow: true,
    borderRadius: "md",
    fontFamily: "sans"
  };
  return {
    id: `${category}-${index}`,
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} #${index}`,
    description: `A unique design from the ${category} collection.`,
    themeSettings: { ...defaultSettings, ...settings }
  };
};
const TEMPLATE_CATEGORIES = [
  {
    id: "minimal",
    name: "Minimal & Clean",
    description: "Simple, modern, and professional designs with a focus on typography and whitespace.",
    templates: [
      createTemplate("minimal", 1, { isDarkMode: false, colorPaletteId: "default", borderRadius: "sm", fontFamily: "sans" }),
      createTemplate("minimal", 2, { isDarkMode: true, colorPaletteId: "stone", backgroundColorId: "slate", borderRadius: "md", fontFamily: "sans" }),
      createTemplate("minimal", 3, { isDarkMode: false, colorPaletteId: "silver", cardShadow: false, borderRadius: "none", fontFamily: "sans" }),
      createTemplate("minimal", 4, { isDarkMode: true, colorPaletteId: "slate", backgroundPattern: "dots", borderRadius: "sm", fontFamily: "sans" }),
      createTemplate("minimal", 5, { isDarkMode: false, colorPaletteId: "default", backgroundColorId: "blue", borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("minimal", 6, { isDarkMode: true, colorPaletteId: "silver", backgroundColorId: "default", cardShadow: false, borderRadius: "md", fontFamily: "sans" }),
      createTemplate("minimal", 7, { isDarkMode: false, colorPaletteId: "stone", borderRadius: "none", fontFamily: "serif" }),
      createTemplate("minimal", 8, { isDarkMode: true, colorPaletteId: "default", backgroundPattern: "lines", borderRadius: "sm", fontFamily: "sans" }),
      createTemplate("minimal", 9, { isDarkMode: false, colorPaletteId: "slate", backgroundColorId: "slate", borderRadius: "md", fontFamily: "sans" }),
      createTemplate("minimal", 10, { isDarkMode: true, colorPaletteId: "indigo", cardShadow: true, borderRadius: "lg", fontFamily: "sans" }),
      createTemplate("minimal", 11, { isDarkMode: false, colorPaletteId: "mint", borderRadius: "sm", fontFamily: "sans" }),
      createTemplate("minimal", 12, { isDarkMode: true, colorPaletteId: "default", backgroundColorId: "slate", borderRadius: "none", fontFamily: "serif" }),
      createTemplate("minimal", 13, { isDarkMode: false, colorPaletteId: "stone", cardShadow: false, borderRadius: "lg", fontFamily: "sans" }),
      createTemplate("minimal", 14, { isDarkMode: true, colorPaletteId: "silver", backgroundPattern: "dots", borderRadius: "md", fontFamily: "sans" }),
      createTemplate("minimal", 15, { isDarkMode: false, colorPaletteId: "sky", borderRadius: "sm", fontFamily: "serif" })
    ]
  },
  {
    id: "bold",
    name: "Bold & Vibrant",
    description: "High-contrast, energetic themes that make a strong statement with vivid colors.",
    templates: [
      createTemplate("bold", 1, { colorPaletteId: "rose", backgroundPattern: "lines", borderRadius: "none" }),
      createTemplate("bold", 2, { isDarkMode: false, colorPaletteId: "crimson", backgroundColorId: "orange", borderRadius: "sm" }),
      createTemplate("bold", 3, { colorPaletteId: "lemon", backgroundColorId: "yellow", borderRadius: "lg" }),
      createTemplate("bold", 4, { isDarkMode: false, colorPaletteId: "coral", fontFamily: "serif", borderRadius: "md" }),
      createTemplate("bold", 5, { colorPaletteId: "orange", backgroundPattern: "waves", borderRadius: "none" }),
      createTemplate("bold", 6, { colorPaletteId: "gold", backgroundColorId: "orange", borderRadius: "lg" }),
      createTemplate("bold", 7, { isDarkMode: false, colorPaletteId: "pink", borderRadius: "sm", cardShadow: false }),
      createTemplate("bold", 8, { colorPaletteId: "crimson", backgroundPattern: "dots", borderRadius: "md", fontFamily: "serif" }),
      createTemplate("bold", 9, { isDarkMode: false, colorPaletteId: "rose", backgroundColorId: "pink", borderRadius: "lg" }),
      createTemplate("bold", 10, { colorPaletteId: "lemon", borderRadius: "none" }),
      createTemplate("bold", 11, { isDarkMode: true, colorPaletteId: "coral", backgroundColorId: "default", borderRadius: "sm" }),
      createTemplate("bold", 12, { isDarkMode: false, colorPaletteId: "orange", backgroundPattern: "lines", borderRadius: "md" }),
      createTemplate("bold", 13, { colorPaletteId: "gold", fontFamily: "serif", borderRadius: "lg" }),
      createTemplate("bold", 14, { isDarkMode: false, colorPaletteId: "pink", cardShadow: false, borderRadius: "none" }),
      createTemplate("bold", 15, { colorPaletteId: "crimson", backgroundColorId: "slate", borderRadius: "md" })
    ]
  },
  {
    id: "elegant",
    name: "Elegant & Professional",
    description: "Sophisticated and polished themes, perfect for corporate or personal branding.",
    templates: [
      createTemplate("elegant", 1, { isDarkMode: true, colorPaletteId: "navy", fontFamily: "serif", borderRadius: "sm" }),
      createTemplate("elegant", 2, { isDarkMode: false, colorPaletteId: "indigo", backgroundColorId: "blue", borderRadius: "md" }),
      createTemplate("elegant", 3, { isDarkMode: true, colorPaletteId: "chocolate", fontFamily: "serif", borderRadius: "none" }),
      createTemplate("elegant", 4, { isDarkMode: false, colorPaletteId: "gold", backgroundColorId: "yellow", cardShadow: false, borderRadius: "lg" }),
      createTemplate("elegant", 5, { isDarkMode: true, colorPaletteId: "slate", backgroundPattern: "dots", borderRadius: "sm" }),
      createTemplate("elegant", 6, { isDarkMode: false, colorPaletteId: "default", fontFamily: "serif", borderRadius: "md" }),
      createTemplate("elegant", 7, { isDarkMode: true, colorPaletteId: "stone", backgroundColorId: "slate", borderRadius: "sm" }),
      createTemplate("elegant", 8, { isDarkMode: false, colorPaletteId: "silver", cardShadow: false, borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("elegant", 9, { isDarkMode: true, colorPaletteId: "navy", backgroundPattern: "lines", borderRadius: "none" }),
      createTemplate("elegant", 10, { isDarkMode: false, colorPaletteId: "chocolate", backgroundColorId: "orange", borderRadius: "md" }),
      createTemplate("elegant", 11, { isDarkMode: true, colorPaletteId: "indigo", fontFamily: "serif", borderRadius: "sm" }),
      createTemplate("elegant", 12, { isDarkMode: false, colorPaletteId: "gold", borderRadius: "lg" }),
      createTemplate("elegant", 13, { isDarkMode: true, colorPaletteId: "default", backgroundColorId: "default", borderRadius: "sm", fontFamily: "serif" }),
      createTemplate("elegant", 14, { isDarkMode: false, colorPaletteId: "slate", backgroundPattern: "dots", borderRadius: "md" }),
      createTemplate("elegant", 15, { isDarkMode: true, colorPaletteId: "stone", cardShadow: false, borderRadius: "none" })
    ]
  },
  {
    id: "dark",
    name: "Dark & Moody",
    description: "Atmospheric and immersive themes using deep, rich colors and high contrast.",
    templates: [
      createTemplate("dark", 1, { colorPaletteId: "purple", backgroundColorId: "purple", backgroundPattern: "waves" }),
      createTemplate("dark", 2, { colorPaletteId: "crimson", backgroundColorId: "slate", borderRadius: "none" }),
      createTemplate("dark", 3, { colorPaletteId: "teal", backgroundColorId: "default", cardShadow: false }),
      createTemplate("dark", 4, { colorPaletteId: "indigo", backgroundColorId: "slate", backgroundPattern: "lines", borderRadius: "sm" }),
      createTemplate("dark", 5, { colorPaletteId: "navy", backgroundColorId: "blue", borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("dark", 6, { colorPaletteId: "chocolate", backgroundColorId: "orange", borderRadius: "md" }),
      createTemplate("dark", 7, { colorPaletteId: "slate", backgroundColorId: "slate", backgroundPattern: "dots", borderRadius: "sm" }),
      createTemplate("dark", 8, { colorPaletteId: "emerald", backgroundColorId: "green", fontFamily: "serif" }),
      createTemplate("dark", 9, { colorPaletteId: "rose", backgroundColorId: "pink", borderRadius: "none" }),
      createTemplate("dark", 10, { colorPaletteId: "purple", backgroundPattern: "lines", borderRadius: "sm", cardShadow: false }),
      createTemplate("dark", 11, { colorPaletteId: "crimson", backgroundColorId: "default", borderRadius: "md" }),
      createTemplate("dark", 12, { colorPaletteId: "teal", backgroundColorId: "slate", fontFamily: "serif" }),
      createTemplate("dark", 13, { colorPaletteId: "indigo", backgroundPattern: "waves", borderRadius: "lg" }),
      createTemplate("dark", 14, { colorPaletteId: "navy", backgroundColorId: "default", borderRadius: "sm" }),
      createTemplate("dark", 15, { colorPaletteId: "chocolate", cardShadow: false, borderRadius: "none" })
    ]
  },
  {
    id: "playful",
    name: "Playful & Creative",
    description: "Fun, quirky, and imaginative themes perfect for artists, creators, and streamers.",
    templates: [
      createTemplate("playful", 1, { isDarkMode: false, colorPaletteId: "sky", backgroundColorId: "blue", borderRadius: "lg", backgroundPattern: "dots" }),
      createTemplate("playful", 2, { colorPaletteId: "lemon", backgroundColorId: "yellow", borderRadius: "lg", cardShadow: false }),
      createTemplate("playful", 3, { isDarkMode: true, colorPaletteId: "pink", borderRadius: "lg", fontFamily: "serif", backgroundPattern: "waves" }),
      createTemplate("playful", 4, { isDarkMode: false, colorPaletteId: "coral", backgroundColorId: "orange", borderRadius: "lg" }),
      createTemplate("playful", 5, { colorPaletteId: "lavender", backgroundColorId: "purple", borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("playful", 6, { isDarkMode: false, colorPaletteId: "mint", backgroundColorId: "green", borderRadius: "lg" }),
      createTemplate("playful", 7, { colorPaletteId: "peach", backgroundColorId: "orange", borderRadius: "lg", backgroundPattern: "dots" }),
      createTemplate("playful", 8, { isDarkMode: false, colorPaletteId: "rose", borderRadius: "lg", cardShadow: false, fontFamily: "serif" }),
      createTemplate("playful", 9, { colorPaletteId: "sky", backgroundColorId: "slate", borderRadius: "lg", backgroundPattern: "lines" }),
      createTemplate("playful", 10, { isDarkMode: false, colorPaletteId: "lemon", borderRadius: "lg" }),
      createTemplate("playful", 11, { colorPaletteId: "pink", backgroundColorId: "pink", borderRadius: "lg" }),
      createTemplate("playful", 12, { isDarkMode: false, colorPaletteId: "coral", borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("playful", 13, { colorPaletteId: "lavender", backgroundPattern: "waves", borderRadius: "lg" }),
      createTemplate("playful", 14, { isDarkMode: false, colorPaletteId: "mint", cardShadow: false, borderRadius: "lg" }),
      createTemplate("playful", 15, { colorPaletteId: "peach", backgroundColorId: "default", borderRadius: "lg", fontFamily: "serif" })
    ]
  },
  {
    id: "natural",
    name: "Natural & Earthy",
    description: "Calm and organic themes inspired by nature, featuring earthy tones and textures.",
    templates: [
      createTemplate("natural", 1, { colorPaletteId: "green", backgroundColorId: "green", fontFamily: "serif" }),
      createTemplate("natural", 2, { isDarkMode: false, colorPaletteId: "olive", backgroundColorId: "yellow", borderRadius: "sm" }),
      createTemplate("natural", 3, { colorPaletteId: "stone", backgroundColorId: "slate", backgroundPattern: "waves", fontFamily: "serif" }),
      createTemplate("natural", 4, { isDarkMode: false, colorPaletteId: "peach", backgroundColorId: "orange", borderRadius: "md" }),
      createTemplate("natural", 5, { colorPaletteId: "chocolate", backgroundColorId: "default", fontFamily: "serif", borderRadius: "sm" }),
      createTemplate("natural", 6, { isDarkMode: false, colorPaletteId: "mint", backgroundColorId: "green", cardShadow: false, borderRadius: "lg" }),
      createTemplate("natural", 7, { colorPaletteId: "emerald", backgroundColorId: "green", backgroundPattern: "dots" }),
      createTemplate("natural", 8, { isDarkMode: false, colorPaletteId: "stone", fontFamily: "serif", borderRadius: "sm" }),
      createTemplate("natural", 9, { colorPaletteId: "olive", backgroundColorId: "slate", borderRadius: "md" }),
      createTemplate("natural", 10, { isDarkMode: false, colorPaletteId: "green", backgroundPattern: "waves", borderRadius: "lg" }),
      createTemplate("natural", 11, { colorPaletteId: "peach", backgroundColorId: "default", fontFamily: "serif" }),
      createTemplate("natural", 12, { isDarkMode: false, colorPaletteId: "chocolate", borderRadius: "sm", cardShadow: false }),
      createTemplate("natural", 13, { colorPaletteId: "mint", backgroundColorId: "slate", fontFamily: "serif" }),
      createTemplate("natural", 14, { isDarkMode: false, colorPaletteId: "emerald", backgroundPattern: "dots", borderRadius: "md" }),
      createTemplate("natural", 15, { colorPaletteId: "stone", backgroundColorId: "green", borderRadius: "lg" })
    ]
  },
  {
    id: "futuristic",
    name: "Futuristic & Tech",
    description: "Sleek, modern, and high-tech designs with sharp lines and cool color palettes.",
    templates: [
      createTemplate("futuristic", 1, { colorPaletteId: "blue", backgroundColorId: "slate", borderRadius: "none", backgroundPattern: "lines" }),
      createTemplate("futuristic", 2, { colorPaletteId: "sky", backgroundColorId: "blue", cardShadow: false, borderRadius: "sm" }),
      createTemplate("futuristic", 3, { colorPaletteId: "indigo", backgroundColorId: "purple", borderRadius: "none" }),
      createTemplate("futuristic", 4, { colorPaletteId: "teal", backgroundColorId: "default", backgroundPattern: "dots", borderRadius: "sm" }),
      createTemplate("futuristic", 5, { colorPaletteId: "slate", backgroundColorId: "slate", fontFamily: "sans", borderRadius: "none" }),
      createTemplate("futuristic", 6, { colorPaletteId: "purple", backgroundColorId: "purple", backgroundPattern: "lines", borderRadius: "none" }),
      createTemplate("futuristic", 7, { colorPaletteId: "navy", backgroundColorId: "blue", cardShadow: false, borderRadius: "sm" }),
      createTemplate("futuristic", 8, { isDarkMode: false, colorPaletteId: "silver", borderRadius: "none", fontFamily: "sans" }),
      createTemplate("futuristic", 9, { colorPaletteId: "blue", backgroundPattern: "waves", borderRadius: "sm" }),
      createTemplate("futuristic", 10, { colorPaletteId: "sky", backgroundColorId: "slate", borderRadius: "none" }),
      createTemplate("futuristic", 11, { colorPaletteId: "indigo", cardShadow: false, borderRadius: "sm" }),
      createTemplate("futuristic", 12, { colorPaletteId: "teal", backgroundPattern: "lines", borderRadius: "none" }),
      createTemplate("futuristic", 13, { colorPaletteId: "slate", backgroundColorId: "default", borderRadius: "sm" }),
      createTemplate("futuristic", 14, { colorPaletteId: "purple", cardShadow: false, borderRadius: "none" }),
      createTemplate("futuristic", 15, { colorPaletteId: "navy", backgroundPattern: "dots", borderRadius: "sm" })
    ]
  },
  {
    id: "soft",
    name: "Soft & Pastel",
    description: "Gentle, light, and dreamy themes featuring soft color palettes and a calming aesthetic.",
    templates: [
      createTemplate("soft", 1, { isDarkMode: false, colorPaletteId: "lavender", backgroundColorId: "purple", borderRadius: "lg", cardShadow: false }),
      createTemplate("soft", 2, { isDarkMode: false, colorPaletteId: "peach", backgroundColorId: "orange", borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("soft", 3, { isDarkMode: false, colorPaletteId: "pink", backgroundColorId: "pink", backgroundPattern: "dots", borderRadius: "lg" }),
      createTemplate("soft", 4, { isDarkMode: false, colorPaletteId: "mint", backgroundColorId: "green", borderRadius: "lg" }),
      createTemplate("soft", 5, { isDarkMode: false, colorPaletteId: "sky", backgroundColorId: "blue", borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("soft", 6, { isDarkMode: false, colorPaletteId: "rose", backgroundColorId: "pink", cardShadow: false, borderRadius: "lg" }),
      createTemplate("soft", 7, { isDarkMode: false, colorPaletteId: "coral", backgroundColorId: "orange", backgroundPattern: "waves", borderRadius: "lg" }),
      createTemplate("soft", 8, { isDarkMode: false, colorPaletteId: "default", backgroundColorId: "default", borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("soft", 9, { isDarkMode: false, colorPaletteId: "lavender", backgroundPattern: "dots", borderRadius: "lg" }),
      createTemplate("soft", 10, { isDarkMode: false, colorPaletteId: "peach", cardShadow: false, borderRadius: "lg" }),
      createTemplate("soft", 11, { isDarkMode: false, colorPaletteId: "pink", fontFamily: "serif", borderRadius: "lg" }),
      createTemplate("soft", 12, { isDarkMode: false, colorPaletteId: "mint", backgroundColorId: "default", borderRadius: "lg" }),
      createTemplate("soft", 13, { isDarkMode: false, colorPaletteId: "sky", backgroundPattern: "waves", borderRadius: "lg", cardShadow: false }),
      createTemplate("soft", 14, { isDarkMode: false, colorPaletteId: "rose", backgroundColorId: "default", borderRadius: "lg", fontFamily: "serif" }),
      createTemplate("soft", 15, { isDarkMode: false, colorPaletteId: "coral", backgroundColorId: "pink", borderRadius: "lg" })
    ]
  }
];
const TemplatePreview = ({ themeSettings }) => {
  const {
    backgroundClass,
    buttonClass,
    borderRadiusClass,
    shadowClass
  } = getThemeStyles(themeSettings);
  const patternClass = BACKGROUND_PATTERNS[themeSettings.backgroundPattern].class;
  const getPreviewPlaceholderColor = (isDark) => isDark ? "bg-gray-400/50" : "bg-gray-600/50";
  const placeholderColor = getPreviewPlaceholderColor(themeSettings.isDarkMode);
  return /* @__PURE__ */ jsxs("div", { className: `relative w-full h-40 overflow-hidden ${backgroundClass}`, children: [
    /* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${patternClass}` }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center justify-start pt-6 h-full w-full", children: [
      /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full mb-2 ${placeholderColor} opacity-50` }),
      /* @__PURE__ */ jsx("div", { className: `h-3 w-16 rounded-sm mb-1 ${placeholderColor} opacity-80` }),
      /* @__PURE__ */ jsx("div", { className: `h-2 w-24 rounded-sm ${placeholderColor} opacity-60 mb-3` }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 w-full px-8", children: [
        /* @__PURE__ */ jsx("div", { className: `h-5 w-full ${buttonClass} ${borderRadiusClass} ${shadowClass}` }),
        /* @__PURE__ */ jsx("div", { className: `h-5 w-full ${buttonClass} ${borderRadiusClass} ${shadowClass}` })
      ] })
    ] })
  ] });
};
const TemplatesEditor = ({ onApply }) => {
  const [activeCategory, setActiveCategory] = useState(TEMPLATE_CATEGORIES[0].id);
  const selectedCategory = TEMPLATE_CATEGORIES.find((cat) => cat.id === activeCategory);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-8 h-[70vh]", children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-1/4 xl:w-1/5 pr-4 border-r border-gray-800 space-y-2 overflow-y-auto", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-white px-2 mb-4", children: "Categories" }),
      TEMPLATE_CATEGORIES.map((category) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveCategory(category.id),
          className: `w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${activeCategory === category.id ? "bg-blue-600 text-white font-semibold" : "text-gray-300 hover:bg-gray-800"}`,
          children: category.name
        },
        category.id
      ))
    ] }),
    /* @__PURE__ */ jsx("main", { className: "w-3/4 xl:w-4/5 overflow-y-auto pl-4", children: selectedCategory && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h4", { className: "font-bold text-white text-2xl mb-2", children: selectedCategory.name }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6 max-w-2xl", children: selectedCategory.description }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: selectedCategory.templates.map((template) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 rounded-lg border border-gray-800 overflow-hidden group transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10", children: [
        /* @__PURE__ */ jsx(TemplatePreview, { themeSettings: template.themeSettings }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white text-lg", children: template.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1 mb-4", children: template.description }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onApply(template.themeSettings),
              className: "w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950",
              children: "Apply Template"
            }
          )
        ] })
      ] }, template.id)) })
    ] }) })
  ] });
};
const TemplateModal = ({ children, onClose }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "template-modal-title",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-gray-950 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-800",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "sticky top-0 bg-gray-950/80 backdrop-blur-sm p-6 border-b border-gray-800 flex justify-between items-center z-10 flex-shrink-0", children: [
              /* @__PURE__ */ jsx("h2", { id: "template-modal-title", className: "text-2xl font-bold text-white", children: "Templates" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors",
                  "aria-label": "Close templates dialog",
                  children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-6 md:p-8 flex-grow overflow-y-hidden", children })
          ]
        }
      )
    }
  );
};
const TabButton = ({ isActive, onClick, children }) => /* @__PURE__ */ jsx(
  "button",
  {
    onClick,
    className: `w-full py-2.5 px-1 flex items-center justify-center gap-2 text-sm font-semibold rounded-md transition-colors ${isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`,
    children
  }
);
const demoUserData = {
  profile: {
    name: "Your Name",
    bio: "Your bio description here",
    imageUrl: ""
  },
  links: [],
  themeSettings: {
    isDarkMode: true,
    colorPaletteId: "default",
    backgroundColorId: "default",
    backgroundPattern: "none",
    cardShadow: true,
    borderRadius: "lg",
    fontFamily: "sans"
  }
};
async function loader$1({
  context
}) {
  const env = context.cloudflare.env;
  try {
    if (!env.DB) {
      return demoUserData;
    }
    const userResult = await env.DB.prepare(`
      SELECT id, name, bio, image_url, theme_settings 
      FROM users 
      ORDER BY id DESC 
      LIMIT 1
    `).first();
    if (!userResult) {
      return demoUserData;
    }
    const linksResult = await env.DB.prepare(`
      SELECT link_id, title, url, is_active, icon
      FROM links 
      WHERE user_id = ? 
      ORDER BY order_index ASC
    `).bind(userResult.id).all();
    const userData = {
      profile: {
        name: userResult.name,
        bio: userResult.bio || "",
        imageUrl: userResult.image_url || ""
      },
      links: linksResult.results.map((link) => ({
        id: link.link_id,
        title: link.title,
        url: link.url,
        isActive: Boolean(link.is_active),
        icon: link.icon || "Link"
      })),
      themeSettings: JSON.parse(userResult.theme_settings)
    };
    return userData;
  } catch (error) {
    console.error("Failed to load user data for admin SSR:", error);
    return demoUserData;
  }
}
const admin = UNSAFE_withComponentProps(function AdminPage() {
  const initialUserData = useLoaderData();
  const [userData, setUserData] = useState(initialUserData);
  const [activeTab, setActiveTab] = useState("profile");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveResult, setLastSaveResult] = useState(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const handleApplyTemplate = (themeSettings) => {
    setUserData((prev) => ({
      ...prev,
      themeSettings
    }));
    setIsTemplateModalOpen(false);
  };
  const handleSaveToCloud = async () => {
    setIsLoading(true);
    try {
      const result = await DataService.saveUserData(userData);
      setLastSaveResult(result);
      if (result.success) {
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3e3);
      }
    } catch (error) {
      setLastSaveResult({
        success: false,
        error: error instanceof Error ? error.message : "Failed to save"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-gray-300",
    children: [/* @__PURE__ */ jsx("header", {
      className: "bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-6 py-3 flex justify-between items-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-xl font-bold text-white",
          children: "AI Link-in-Bio"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-4",
          children: [/* @__PURE__ */ jsxs("button", {
            onClick: () => setIsTemplateModalOpen(true),
            className: "px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold shadow-md flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(LayoutTemplateIcon, {
              className: "w-5 h-5"
            }), "Templates"]
          }), /* @__PURE__ */ jsx("button", {
            onClick: handleSaveToCloud,
            disabled: isLoading,
            className: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold shadow-md",
            children: isLoading ? "Saving..." : "Save"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/",
            className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-md",
            children: "View Homepage"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs("main", {
      className: "container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-2 bg-black rounded-xl shadow-2xl p-6",
        children: [/* @__PURE__ */ jsx("div", {
          className: "mb-6",
          children: /* @__PURE__ */ jsxs("div", {
            className: "p-1 flex space-x-1 bg-gray-900/80 rounded-lg",
            children: [/* @__PURE__ */ jsxs(TabButton, {
              isActive: activeTab === "profile",
              onClick: () => setActiveTab("profile"),
              children: [/* @__PURE__ */ jsx(UserIcon, {
                className: "w-5 h-5"
              }), " Profile"]
            }), /* @__PURE__ */ jsxs(TabButton, {
              isActive: activeTab === "links",
              onClick: () => setActiveTab("links"),
              children: [/* @__PURE__ */ jsx(LinkIcon, {
                className: "w-5 h-5"
              }), " Links"]
            }), /* @__PURE__ */ jsxs(TabButton, {
              isActive: activeTab === "theme",
              onClick: () => setActiveTab("theme"),
              children: [/* @__PURE__ */ jsx(PaletteIcon, {
                className: "w-5 h-5"
              }), " Theme"]
            })]
          })
        }), activeTab === "profile" && /* @__PURE__ */ jsx(ProfileEditor, {
          userData,
          setUserData
        }), activeTab === "links" && /* @__PURE__ */ jsx(LinksEditor, {
          userData,
          setUserData
        }), activeTab === "theme" && /* @__PURE__ */ jsx(ThemeEditor, {
          userData,
          setUserData
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "lg:col-span-1",
        children: /* @__PURE__ */ jsx("div", {
          className: "sticky top-24",
          children: /* @__PURE__ */ jsxs("div", {
            className: "relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[650px] w-[375px] shadow-2xl shadow-blue-500/10",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-[160px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"
            }), /* @__PURE__ */ jsx("div", {
              className: "h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"
            }), /* @__PURE__ */ jsx("div", {
              className: "h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"
            }), /* @__PURE__ */ jsx("div", {
              className: "h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"
            }), /* @__PURE__ */ jsx("div", {
              className: "rounded-[2rem] overflow-hidden w-full h-full bg-white",
              children: /* @__PURE__ */ jsx(BioLinkPage, {
                userData,
                isPreview: true
              })
            })]
          })
        })
      })]
    }), showSaveSuccess && (lastSaveResult == null ? void 0 : lastSaveResult.success) && /* @__PURE__ */ jsxs("div", {
      className: "fixed top-20 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-30 max-w-sm",
      children: [/* @__PURE__ */ jsx("div", {
        className: "font-semibold",
        children: "Page saved successfully!"
      }), lastSaveResult.error && /* @__PURE__ */ jsx("div", {
        className: "text-sm mt-1 opacity-80",
        children: lastSaveResult.error
      })]
    }), lastSaveResult && !lastSaveResult.success && /* @__PURE__ */ jsxs("div", {
      className: "fixed top-20 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-30 max-w-sm",
      children: [/* @__PURE__ */ jsx("div", {
        className: "font-semibold mb-1",
        children: "Save failed"
      }), /* @__PURE__ */ jsx("div", {
        className: "text-sm",
        children: lastSaveResult.error
      })]
    }), isTemplateModalOpen && /* @__PURE__ */ jsx(TemplateModal, {
      onClose: () => setIsTemplateModalOpen(false),
      children: /* @__PURE__ */ jsx(TemplatesEditor, {
        onApply: handleApplyTemplate
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: admin,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function AboutPage() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl font-bold text-gray-900 sm:text-5xl",
          children: "About AI Link-in-Bio"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-4 text-xl text-gray-600",
          children: "Create beautiful, customizable link pages in minutes"
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-16",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
          children: [/* @__PURE__ */ jsx("div", {
            className: "pt-6",
            children: /* @__PURE__ */ jsx("div", {
              className: "flow-root bg-white rounded-lg px-6 pb-8",
              children: /* @__PURE__ */ jsxs("div", {
                className: "-mt-6",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-2xl",
                    children: "🎨"
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "mt-8 text-lg font-medium text-gray-900 tracking-tight",
                  children: "Beautiful Themes"
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-5 text-base text-gray-500",
                  children: "Choose from a variety of professionally designed themes and color schemes."
                })]
              })
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "pt-6",
            children: /* @__PURE__ */ jsx("div", {
              className: "flow-root bg-white rounded-lg px-6 pb-8",
              children: /* @__PURE__ */ jsxs("div", {
                className: "-mt-6",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-2xl",
                    children: "⚡"
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "mt-8 text-lg font-medium text-gray-900 tracking-tight",
                  children: "Fast & Responsive"
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-5 text-base text-gray-500",
                  children: "Lightning-fast loading times and perfect responsiveness on all devices."
                })]
              })
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "pt-6",
            children: /* @__PURE__ */ jsx("div", {
              className: "flow-root bg-white rounded-lg px-6 pb-8",
              children: /* @__PURE__ */ jsxs("div", {
                className: "-mt-6",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-2xl",
                    children: "🔧"
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "mt-8 text-lg font-medium text-gray-900 tracking-tight",
                  children: "Easy to Customize"
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-5 text-base text-gray-500",
                  children: "Drag and drop interface with real-time preview of your changes."
                })]
              })
            })
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-16 text-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/admin",
          className: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700",
          children: "Get Started"
        })
      })]
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const preview = UNSAFE_withComponentProps(function PreviewPage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await DataService.loadUserData();
        setUserData(data || INITIAL_USER_DATA);
      } catch (error) {
        console.error("Failed to load user data for preview", error);
        setUserData(INITIAL_USER_DATA);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  if (isLoading || !userData) {
    return /* @__PURE__ */ jsx("div", {
      className: "flex items-center justify-center h-screen bg-gray-100",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("div", {
          className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-500",
          children: "Loading Preview..."
        })]
      })
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen",
    children: /* @__PURE__ */ jsx(BioLinkPage, {
      userData
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: preview
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  context
}) {
  var _a;
  const env = context.cloudflare.env;
  try {
    const userResult = await env.DB.prepare(`SELECT id, name, bio, image_url, theme_settings FROM users ORDER BY id DESC LIMIT 1`).first();
    if (!userResult) {
      return Response.json(null, {
        status: 404
      });
    }
    const linksResult = await env.DB.prepare(`SELECT id, title, url, icon, is_active FROM links WHERE user_id = ? ORDER BY order_index ASC`).bind(userResult.id).all();
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
      links: ((_a = linksResult.results) == null ? void 0 : _a.map((link) => ({
        id: link.id.toString(),
        title: link.title,
        url: link.url,
        icon: link.icon || "Link",
        isActive: link.is_active === 1
      }))) || []
    };
    return Response.json(userData);
  } catch (error) {
    console.error("Error loading user data:", error);
    return Response.json({
      error: "Failed to load data"
    }, {
      status: 500
    });
  }
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
async function action({
  request,
  context
}) {
  const env = context.cloudflare.env;
  try {
    const userData = await request.json();
    const existingUser = await env.DB.prepare(`SELECT id FROM users ORDER BY id DESC LIMIT 1`).first();
    let userId = (existingUser == null ? void 0 : existingUser.id) || 1;
    if (existingUser) {
      await env.DB.prepare(`UPDATE users SET 
         name = ?, 
         bio = ?, 
         image_url = ?, 
         theme_settings = ? 
         WHERE id = ?`).bind(userData.profile.name, userData.profile.bio, userData.profile.imageUrl, JSON.stringify(userData.themeSettings), userId).run();
    } else {
      await env.DB.prepare(`INSERT INTO users (name, bio, image_url, theme_settings) 
         VALUES (?, ?, ?, ?)`).bind(userData.profile.name, userData.profile.bio, userData.profile.imageUrl, JSON.stringify(userData.themeSettings)).run();
      userId = 1;
    }
    await env.DB.prepare(`DELETE FROM links WHERE user_id = ?`).bind(userId).run();
    for (let i = 0; i < userData.links.length; i++) {
      const link = userData.links[i];
      await env.DB.prepare(`INSERT INTO links (user_id, link_id, title, url, icon, is_active, order_index) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(
        userId,
        `link_${userId}_${i}`,
        // Generate unique link_id
        link.title,
        link.url,
        link.icon || "Link",
        link.isActive ? 1 : 0,
        i
      ).run();
    }
    return Response.json({
      success: true
    });
  } catch (error) {
    console.error("Error saving user data:", error);
    return Response.json({
      success: false,
      message: "Failed to save data"
    }, {
      status: 500
    });
  }
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D0tFyxRz.js", "imports": ["/assets/chunk-UH6JLGW7-BWGKVKdm.js", "/assets/index-DvEMbgo5.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-BNOUgMe-.js", "imports": ["/assets/chunk-UH6JLGW7-BWGKVKdm.js", "/assets/index-DvEMbgo5.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DUsAFJYC.js", "imports": ["/assets/chunk-UH6JLGW7-BWGKVKdm.js", "/assets/BioLinkPage-DqpxeZS-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin": { "id": "routes/admin", "parentId": "root", "path": "admin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/admin-Coyj0xUF.js", "imports": ["/assets/chunk-UH6JLGW7-BWGKVKdm.js", "/assets/dataService-Bzs1NMx2.js", "/assets/BioLinkPage-DqpxeZS-.js", "/assets/index-DvEMbgo5.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-D8Heu3gi.js", "imports": ["/assets/chunk-UH6JLGW7-BWGKVKdm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/preview": { "id": "routes/preview", "parentId": "root", "path": "preview", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/preview-DtrggnDZ.js", "imports": ["/assets/chunk-UH6JLGW7-BWGKVKdm.js", "/assets/BioLinkPage-DqpxeZS-.js", "/assets/dataService-Bzs1NMx2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.data": { "id": "routes/api.data", "parentId": "root", "path": "api/data", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.data-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.save": { "id": "routes/api.save", "parentId": "root", "path": "api/save", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.save-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-3de71488.js", "version": "3de71488", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/preview": {
    id: "routes/preview",
    parentId: "root",
    path: "preview",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/api.data": {
    id: "routes/api.data",
    parentId: "root",
    path: "api/data",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/api.save": {
    id: "routes/api.save",
    parentId: "root",
    path: "api/save",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
