
export interface Link {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  icon?: string; // Icon name from Lucide React library
}

export interface Profile {
  name: string;
  bio: string;
  imageUrl: string;
}

export type BorderRadius = 'none' | 'sm' | 'md' | 'lg';
export type FontFamily = 'sans' | 'serif';
export type BackgroundPattern = 'none' | 'dots' | 'lines' | 'waves';

export interface ThemeSettings {
  isDarkMode: boolean;
  colorPaletteId: string;
  backgroundColorId: string;
  backgroundPattern: BackgroundPattern;
  cardShadow: boolean;
  borderRadius: BorderRadius;
  fontFamily: FontFamily;
}

export interface UserData {
  profile: Profile;
  links: Link[];
  themeSettings: ThemeSettings;
}
