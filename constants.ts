
import type { UserData, ThemeSettings, BorderRadius, FontFamily } from './types';

// --- THEME CUSTOMIZATION CONSTANTS ---

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  isDarkMode: true,
  colorPaletteId: 'default',
  backgroundColorId: 'default',
  backgroundPattern: 'none',
  cardShadow: true,
  borderRadius: 'lg',
  fontFamily: 'sans',
};

interface PaletteStyle {
    primary: string;
    secondary: string;
    accent: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  light: PaletteStyle;
  dark: PaletteStyle;
}


export const COLOR_PALETTES: ColorPalette[] = [
  { 
    id: 'default', 
    name: 'Default', 
    light: { primary: '#EFF6FF', secondary: '#1D4ED8', accent: '#1E40AF' }, 
    dark: { primary: '#1F2937', secondary: '#FFFFFF', accent: '#D1D5DB' } 
  },
  { 
    id: 'rose', 
    name: 'Rose', 
    light: { primary: '#F43F5E', secondary: '#FFFFFF', accent: '#881337' }, 
    dark: { primary: '#F43F5E', secondary: '#FFFFFF', accent: '#FECDD3' } 
  },
  { 
    id: 'green', 
    name: 'Green', 
    light: { primary: '#10B981', secondary: '#FFFFFF', accent: '#047857' }, 
    dark: { primary: '#10B981', secondary: '#FFFFFF', accent: '#A7F3D0' } 
  },
  { 
    id: 'purple', 
    name: 'Purple', 
    light: { primary: '#8B5CF6', secondary: '#FFFFFF', accent: '#5B21B6' }, 
    dark: { primary: '#8B5CF6', secondary: '#FFFFFF', accent: '#DDD6FE' } 
  },
  { 
    id: 'orange', 
    name: 'Orange', 
    light: { primary: '#F97316', secondary: '#FFFFFF', accent: '#9A3412' }, 
    dark: { primary: '#F97316', secondary: '#FFFFFF', accent: '#FED7AA' } 
  },
  { 
    id: 'blue', 
    name: 'Blue', 
    light: { primary: '#3B82F6', secondary: '#FFFFFF', accent: '#1E40AF' }, 
    dark: { primary: '#3B82F6', secondary: '#FFFFFF', accent: '#BFDBFE' } 
  },
  { 
    id: 'teal', 
    name: 'Teal', 
    light: { primary: '#14B8A6', secondary: '#FFFFFF', accent: '#0F766E' }, 
    dark: { primary: '#14B8A6', secondary: '#FFFFFF', accent: '#99F6E4' } 
  },
  { 
    id: 'pink', 
    name: 'Pink', 
    light: { primary: '#EC4899', secondary: '#FFFFFF', accent: '#9D2463' }, 
    dark: { primary: '#EC4899', secondary: '#FFFFFF', accent: '#FBCFE8' } 
  },
  {
    id: 'sky',
    name: 'Sky',
    light: { primary: '#0EA5E9', secondary: '#FFFFFF', accent: '#0369A1' },
    dark: { primary: '#0EA5E9', secondary: '#FFFFFF', accent: '#7DD3FC' },
  },
  {
    id: 'mint',
    name: 'Mint',
    light: { primary: '#34D399', secondary: '#064E3B', accent: '#047857' },
    dark: { primary: '#34D399', secondary: '#FFFFFF', accent: '#A7F3D0' },
  },
  {
    id: 'lemon',
    name: 'Lemon',
    light: { primary: '#FACC15', secondary: '#422006', accent: '#713F12' },
    dark: { primary: '#FACC15', secondary: '#422006', accent: '#FDE047' },
  },
  {
    id: 'coral',
    name: 'Coral',
    light: { primary: '#FF7F50', secondary: '#FFFFFF', accent: '#B95C37' },
    dark: { primary: '#FF7F50', secondary: '#FFFFFF', accent: '#FFC0A9' },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    light: { primary: '#4F46E5', secondary: '#FFFFFF', accent: '#312E81' },
    dark: { primary: '#4F46E5', secondary: '#FFFFFF', accent: '#A5B4FC' },
  },
  {
    id: 'stone',
    name: 'Stone',
    light: { primary: '#78716C', secondary: '#FFFFFF', accent: '#292524' },
    dark: { primary: '#A8A29E', secondary: '#1C1917', accent: '#E7E5E4' },
  },
  {
    id: 'crimson',
    name: 'Crimson',
    light: { primary: '#DC2626', secondary: '#FFFFFF', accent: '#7F1D1D' },
    dark: { primary: '#DC2626', secondary: '#FFFFFF', accent: '#FECACA' },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    light: { primary: '#059669', secondary: '#FFFFFF', accent: '#047857' },
    dark: { primary: '#059669', secondary: '#FFFFFF', accent: '#6EE7B7' },
  },
  {
    id: 'lavender',
    name: 'Lavender',
    light: { primary: '#C4B5FD', secondary: '#3730A3', accent: '#4338CA' },
    dark: { primary: '#A78BFA', secondary: '#FFFFFF', accent: '#E0E7FF' },
  },
  {
    id: 'peach',
    name: 'Peach',
    light: { primary: '#FFDAB9', secondary: '#8C5A37', accent: '#B95C37' },
    dark: { primary: '#FFB07C', secondary: '#4D2C1B', accent: '#FFD8B1' },
  },
  {
    id: 'olive',
    name: 'Olive',
    light: { primary: '#84CC16', secondary: '#1A2E05', accent: '#365314' },
    dark: { primary: '#A3E635', secondary: '#1A2E05', accent: '#D9F99D' },
  },
  {
    id: 'navy',
    name: 'Navy',
    light: { primary: '#1E3A8A', secondary: '#FFFFFF', accent: '#172554' },
    dark: { primary: '#2563EB', secondary: '#FFFFFF', accent: '#93C5FD' },
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    light: { primary: '#78350F', secondary: '#FFFFFF', accent: '#451A03' },
    dark: { primary: '#92400E', secondary: '#FFFFFF', accent: '#FCD9B6' },
  },
  {
    id: 'slate',
    name: 'Slate',
    light: { primary: '#475569', secondary: '#FFFFFF', accent: '#1E293B' },
    dark: { primary: '#64748B', secondary: '#FFFFFF', accent: '#E2E8F0' },
  },
  {
    id: 'gold',
    name: 'Gold',
    light: { primary: '#FBBF24', secondary: '#422006', accent: '#B45309' },
    dark: { primary: '#F59E0B', secondary: '#FFFFFF', accent: '#FDE68A' },
  },
  {
    id: 'silver',
    name: 'Silver',
    light: { primary: '#D1D5DB', secondary: '#111827', accent: '#4B5563' },
    dark: { primary: '#9CA3AF', secondary: '#FFFFFF', accent: '#F3F4F6' },
  },
];

export const BACKGROUND_COLORS = [
  { id: 'default', name: 'Default', light: 'bg-gray-100', dark: 'bg-gray-900' },
  { id: 'slate', name: 'Slate', light: 'bg-slate-100', dark: 'bg-slate-900' },
  { id: 'pink', name: 'Pink', light: 'bg-pink-50', dark: 'bg-pink-950' },
  { id: 'green', name: 'Green', light: 'bg-green-50', dark: 'bg-green-950' },
  { id: 'purple', name: 'Purple', light: 'bg-purple-50', dark: 'bg-purple-950' },
  { id: 'orange', name: 'Orange', light: 'bg-orange-50', dark: 'bg-orange-950' },
  { id: 'blue', name: 'Blue', light: 'bg-blue-50', dark: 'bg-blue-950' },
  { id: 'yellow', name: 'Yellow', light: 'bg-yellow-50', dark: 'bg-yellow-950' },
];

export const BACKGROUND_PATTERNS = {
  none: { name: 'None', description: 'No background pattern', class: '' },
  dots: { name: 'Dots', description: 'Subtle dotted pattern', class: 'bg-[radial-gradient(theme(colors.gray.500/.1)_1px,transparent_1px)] [background-size:16px_16px]' },
  lines: { name: 'Lines', description: 'Diagonal line pattern', class: 'bg-[linear-gradient(45deg,theme(colors.gray.500/.1)_25%,transparent_25%,transparent_50%,theme(colors.gray.500/.1)_50%,theme(colors.gray.500/.1)_75%,transparent_75%,transparent)] [background-size:20px_20px]' },
  waves: { name: 'Waves', description: 'Wavy line pattern', class: 'bg-[url("data:image/svg+xml,%3Csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20viewBox=\'0%200%2080%2040\'%20width=\'80\'%20height=\'40\'%3E%3Cpath%20fill=\'none\'%20stroke=\'rgba(120,120,120,0.1)\'%20stroke-width=\'2\'%20d=\'M0%2039.5c10-10%2030-10%2040%200s30%2010%2040%200v-40C70%20-10.5%2050%20-10.5%2040%200S10-10.5%200%200\'%3E%3C/path%3E%3C/svg%3E")]' },
};

export const BORDER_RADIUS_OPTIONS: { id: BorderRadius, name: string, class: string }[] = [
  { id: 'none', name: 'None', class: 'rounded-none' },
  { id: 'sm', name: 'Small', class: 'rounded-md' },
  { id: 'md', name: 'Medium', class: 'rounded-xl' },
  { id: 'lg', name: 'Large', class: 'rounded-full' },
];

export const FONT_FAMILY_OPTIONS: { id: FontFamily, name: string, description: string, class: string, previewText: string }[] = [
  { id: 'sans', name: 'Sans', description: 'Clean, modern sans-serif font (Inter)', class: 'font-sans', previewText: 'The quick brown fox jumps over the lazy dog.' },
  { id: 'serif', name: 'Serif', description: 'Elegant serif font with classic appeal (Merriweather)', class: 'font-serif', previewText: 'The quick brown fox jumps over the lazy dog.' },
];

// --- INITIAL DATA ---

export const INITIAL_USER_DATA: UserData = {
  profile: {
    name: 'Your Name',
    bio: 'Welcome to my page! Check out my links below.',
    imageUrl: 'https://picsum.photos/id/870/200/200',
  },
  links: [
    { id: '1', title: 'Personal Website', url: 'https://www.haydenbleasel.com/', isActive: true },
    { id: '2', title: 'X / Twitter', url: 'https://x.com/haydenbleasel', isActive: true },
    { id: '3', title: 'GitHub', url: 'https://github.com/haydenbleasel', isActive: true },
    { id: '4', title: 'LinkedIn', url: 'https://www.linkedin.com/in/haydenbleasel', isActive: true },
  ],
  themeSettings: DEFAULT_THEME_SETTINGS,
};
