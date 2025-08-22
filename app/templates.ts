
import type { ThemeSettings } from './types';

export interface Template {
  id: string;
  name: string;
  description: string;
  themeSettings: ThemeSettings;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  templates: Template[];
}

const colorPalettes: ThemeSettings['colorPaletteId'][] = ['default', 'rose', 'green', 'purple', 'orange', 'blue', 'teal', 'pink', 'sky', 'mint', 'lemon', 'coral', 'indigo', 'stone', 'crimson', 'emerald', 'lavender', 'peach', 'olive', 'navy', 'chocolate', 'slate', 'gold', 'silver'];
const backgroundColors: ThemeSettings['backgroundColorId'][] = ['default', 'slate', 'pink', 'green', 'purple', 'orange', 'blue', 'yellow'];
const backgroundPatterns: ThemeSettings['backgroundPattern'][] = ['none', 'dots', 'lines', 'waves'];
const borderRadii: ThemeSettings['borderRadius'][] = ['none', 'sm', 'md', 'lg'];
const fontFamilies: ThemeSettings['fontFamily'][] = ['sans', 'serif'];

// Helper to create a unique template
const createTemplate = (category: string, index: number, settings: Partial<ThemeSettings>): Template => {
    const defaultSettings: ThemeSettings = {
        isDarkMode: true,
        colorPaletteId: 'default',
        backgroundColorId: 'default',
        backgroundPattern: 'none',
        cardShadow: true,
        borderRadius: 'md',
        fontFamily: 'sans',
    };
    return {
        id: `${category}-${index}`,
        name: `${category.charAt(0).toUpperCase() + category.slice(1)} #${index}`,
        description: `A unique design from the ${category} collection.`,
        themeSettings: { ...defaultSettings, ...settings },
    };
};

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
    {
        id: 'minimal',
        name: 'Minimal & Clean',
        description: 'Simple, modern, and professional designs with a focus on typography and whitespace.',
        templates: [
            createTemplate('minimal', 1, { isDarkMode: false, colorPaletteId: 'default', borderRadius: 'sm', fontFamily: 'sans' }),
            createTemplate('minimal', 2, { isDarkMode: true, colorPaletteId: 'stone', backgroundColorId: 'slate', borderRadius: 'md', fontFamily: 'sans' }),
            createTemplate('minimal', 3, { isDarkMode: false, colorPaletteId: 'silver', cardShadow: false, borderRadius: 'none', fontFamily: 'sans' }),
            createTemplate('minimal', 4, { isDarkMode: true, colorPaletteId: 'slate', backgroundPattern: 'dots', borderRadius: 'sm', fontFamily: 'sans' }),
            createTemplate('minimal', 5, { isDarkMode: false, colorPaletteId: 'default', backgroundColorId: 'blue', borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('minimal', 6, { isDarkMode: true, colorPaletteId: 'silver', backgroundColorId: 'default', cardShadow: false, borderRadius: 'md', fontFamily: 'sans' }),
            createTemplate('minimal', 7, { isDarkMode: false, colorPaletteId: 'stone', borderRadius: 'none', fontFamily: 'serif' }),
            createTemplate('minimal', 8, { isDarkMode: true, colorPaletteId: 'default', backgroundPattern: 'lines', borderRadius: 'sm', fontFamily: 'sans' }),
            createTemplate('minimal', 9, { isDarkMode: false, colorPaletteId: 'slate', backgroundColorId: 'slate', borderRadius: 'md', fontFamily: 'sans' }),
            createTemplate('minimal', 10, { isDarkMode: true, colorPaletteId: 'indigo', cardShadow: true, borderRadius: 'lg', fontFamily: 'sans' }),
            createTemplate('minimal', 11, { isDarkMode: false, colorPaletteId: 'mint', borderRadius: 'sm', fontFamily: 'sans' }),
            createTemplate('minimal', 12, { isDarkMode: true, colorPaletteId: 'default', backgroundColorId: 'slate', borderRadius: 'none', fontFamily: 'serif' }),
            createTemplate('minimal', 13, { isDarkMode: false, colorPaletteId: 'stone', cardShadow: false, borderRadius: 'lg', fontFamily: 'sans' }),
            createTemplate('minimal', 14, { isDarkMode: true, colorPaletteId: 'silver', backgroundPattern: 'dots', borderRadius: 'md', fontFamily: 'sans' }),
            createTemplate('minimal', 15, { isDarkMode: false, colorPaletteId: 'sky', borderRadius: 'sm', fontFamily: 'serif' }),
        ],
    },
    {
        id: 'bold',
        name: 'Bold & Vibrant',
        description: 'High-contrast, energetic themes that make a strong statement with vivid colors.',
        templates: [
            createTemplate('bold', 1, { colorPaletteId: 'rose', backgroundPattern: 'lines', borderRadius: 'none' }),
            createTemplate('bold', 2, { isDarkMode: false, colorPaletteId: 'crimson', backgroundColorId: 'orange', borderRadius: 'sm' }),
            createTemplate('bold', 3, { colorPaletteId: 'lemon', backgroundColorId: 'yellow', borderRadius: 'lg' }),
            createTemplate('bold', 4, { isDarkMode: false, colorPaletteId: 'coral', fontFamily: 'serif', borderRadius: 'md' }),
            createTemplate('bold', 5, { colorPaletteId: 'orange', backgroundPattern: 'waves', borderRadius: 'none' }),
            createTemplate('bold', 6, { colorPaletteId: 'gold', backgroundColorId: 'orange', borderRadius: 'lg' }),
            createTemplate('bold', 7, { isDarkMode: false, colorPaletteId: 'pink', borderRadius: 'sm', cardShadow: false }),
            createTemplate('bold', 8, { colorPaletteId: 'crimson', backgroundPattern: 'dots', borderRadius: 'md', fontFamily: 'serif' }),
            createTemplate('bold', 9, { isDarkMode: false, colorPaletteId: 'rose', backgroundColorId: 'pink', borderRadius: 'lg' }),
            createTemplate('bold', 10, { colorPaletteId: 'lemon', borderRadius: 'none' }),
            createTemplate('bold', 11, { isDarkMode: true, colorPaletteId: 'coral', backgroundColorId: 'default', borderRadius: 'sm' }),
            createTemplate('bold', 12, { isDarkMode: false, colorPaletteId: 'orange', backgroundPattern: 'lines', borderRadius: 'md' }),
            createTemplate('bold', 13, { colorPaletteId: 'gold', fontFamily: 'serif', borderRadius: 'lg' }),
            createTemplate('bold', 14, { isDarkMode: false, colorPaletteId: 'pink', cardShadow: false, borderRadius: 'none' }),
            createTemplate('bold', 15, { colorPaletteId: 'crimson', backgroundColorId: 'slate', borderRadius: 'md' }),
        ],
    },
    {
        id: 'elegant',
        name: 'Elegant & Professional',
        description: 'Sophisticated and polished themes, perfect for corporate or personal branding.',
        templates: [
            createTemplate('elegant', 1, { isDarkMode: true, colorPaletteId: 'navy', fontFamily: 'serif', borderRadius: 'sm' }),
            createTemplate('elegant', 2, { isDarkMode: false, colorPaletteId: 'indigo', backgroundColorId: 'blue', borderRadius: 'md' }),
            createTemplate('elegant', 3, { isDarkMode: true, colorPaletteId: 'chocolate', fontFamily: 'serif', borderRadius: 'none' }),
            createTemplate('elegant', 4, { isDarkMode: false, colorPaletteId: 'gold', backgroundColorId: 'yellow', cardShadow: false, borderRadius: 'lg' }),
            createTemplate('elegant', 5, { isDarkMode: true, colorPaletteId: 'slate', backgroundPattern: 'dots', borderRadius: 'sm' }),
            createTemplate('elegant', 6, { isDarkMode: false, colorPaletteId: 'default', fontFamily: 'serif', borderRadius: 'md' }),
            createTemplate('elegant', 7, { isDarkMode: true, colorPaletteId: 'stone', backgroundColorId: 'slate', borderRadius: 'sm' }),
            createTemplate('elegant', 8, { isDarkMode: false, colorPaletteId: 'silver', cardShadow: false, borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('elegant', 9, { isDarkMode: true, colorPaletteId: 'navy', backgroundPattern: 'lines', borderRadius: 'none' }),
            createTemplate('elegant', 10, { isDarkMode: false, colorPaletteId: 'chocolate', backgroundColorId: 'orange', borderRadius: 'md' }),
            createTemplate('elegant', 11, { isDarkMode: true, colorPaletteId: 'indigo', fontFamily: 'serif', borderRadius: 'sm' }),
            createTemplate('elegant', 12, { isDarkMode: false, colorPaletteId: 'gold', borderRadius: 'lg' }),
            createTemplate('elegant', 13, { isDarkMode: true, colorPaletteId: 'default', backgroundColorId: 'default', borderRadius: 'sm', fontFamily: 'serif' }),
            createTemplate('elegant', 14, { isDarkMode: false, colorPaletteId: 'slate', backgroundPattern: 'dots', borderRadius: 'md' }),
            createTemplate('elegant', 15, { isDarkMode: true, colorPaletteId: 'stone', cardShadow: false, borderRadius: 'none' }),
        ],
    },
    {
        id: 'dark',
        name: 'Dark & Moody',
        description: 'Atmospheric and immersive themes using deep, rich colors and high contrast.',
        templates: [
            createTemplate('dark', 1, { colorPaletteId: 'purple', backgroundColorId: 'purple', backgroundPattern: 'waves' }),
            createTemplate('dark', 2, { colorPaletteId: 'crimson', backgroundColorId: 'slate', borderRadius: 'none' }),
            createTemplate('dark', 3, { colorPaletteId: 'teal', backgroundColorId: 'default', cardShadow: false }),
            createTemplate('dark', 4, { colorPaletteId: 'indigo', backgroundColorId: 'slate', backgroundPattern: 'lines', borderRadius: 'sm' }),
            createTemplate('dark', 5, { colorPaletteId: 'navy', backgroundColorId: 'blue', borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('dark', 6, { colorPaletteId: 'chocolate', backgroundColorId: 'orange', borderRadius: 'md' }),
            createTemplate('dark', 7, { colorPaletteId: 'slate', backgroundColorId: 'slate', backgroundPattern: 'dots', borderRadius: 'sm' }),
            createTemplate('dark', 8, { colorPaletteId: 'emerald', backgroundColorId: 'green', fontFamily: 'serif' }),
            createTemplate('dark', 9, { colorPaletteId: 'rose', backgroundColorId: 'pink', borderRadius: 'none' }),
            createTemplate('dark', 10, { colorPaletteId: 'purple', backgroundPattern: 'lines', borderRadius: 'sm', cardShadow: false }),
            createTemplate('dark', 11, { colorPaletteId: 'crimson', backgroundColorId: 'default', borderRadius: 'md' }),
            createTemplate('dark', 12, { colorPaletteId: 'teal', backgroundColorId: 'slate', fontFamily: 'serif' }),
            createTemplate('dark', 13, { colorPaletteId: 'indigo', backgroundPattern: 'waves', borderRadius: 'lg' }),
            createTemplate('dark', 14, { colorPaletteId: 'navy', backgroundColorId: 'default', borderRadius: 'sm' }),
            createTemplate('dark', 15, { colorPaletteId: 'chocolate', cardShadow: false, borderRadius: 'none' }),
        ],
    },
    {
        id: 'playful',
        name: 'Playful & Creative',
        description: 'Fun, quirky, and imaginative themes perfect for artists, creators, and streamers.',
        templates: [
            createTemplate('playful', 1, { isDarkMode: false, colorPaletteId: 'sky', backgroundColorId: 'blue', borderRadius: 'lg', backgroundPattern: 'dots' }),
            createTemplate('playful', 2, { colorPaletteId: 'lemon', backgroundColorId: 'yellow', borderRadius: 'lg', cardShadow: false }),
            createTemplate('playful', 3, { isDarkMode: true, colorPaletteId: 'pink', borderRadius: 'lg', fontFamily: 'serif', backgroundPattern: 'waves' }),
            createTemplate('playful', 4, { isDarkMode: false, colorPaletteId: 'coral', backgroundColorId: 'orange', borderRadius: 'lg' }),
            createTemplate('playful', 5, { colorPaletteId: 'lavender', backgroundColorId: 'purple', borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('playful', 6, { isDarkMode: false, colorPaletteId: 'mint', backgroundColorId: 'green', borderRadius: 'lg' }),
            createTemplate('playful', 7, { colorPaletteId: 'peach', backgroundColorId: 'orange', borderRadius: 'lg', backgroundPattern: 'dots' }),
            createTemplate('playful', 8, { isDarkMode: false, colorPaletteId: 'rose', borderRadius: 'lg', cardShadow: false, fontFamily: 'serif' }),
            createTemplate('playful', 9, { colorPaletteId: 'sky', backgroundColorId: 'slate', borderRadius: 'lg', backgroundPattern: 'lines' }),
            createTemplate('playful', 10, { isDarkMode: false, colorPaletteId: 'lemon', borderRadius: 'lg' }),
            createTemplate('playful', 11, { colorPaletteId: 'pink', backgroundColorId: 'pink', borderRadius: 'lg' }),
            createTemplate('playful', 12, { isDarkMode: false, colorPaletteId: 'coral', borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('playful', 13, { colorPaletteId: 'lavender', backgroundPattern: 'waves', borderRadius: 'lg' }),
            createTemplate('playful', 14, { isDarkMode: false, colorPaletteId: 'mint', cardShadow: false, borderRadius: 'lg' }),
            createTemplate('playful', 15, { colorPaletteId: 'peach', backgroundColorId: 'default', borderRadius: 'lg', fontFamily: 'serif' }),
        ],
    },
    {
        id: 'natural',
        name: 'Natural & Earthy',
        description: 'Calm and organic themes inspired by nature, featuring earthy tones and textures.',
        templates: [
            createTemplate('natural', 1, { colorPaletteId: 'green', backgroundColorId: 'green', fontFamily: 'serif' }),
            createTemplate('natural', 2, { isDarkMode: false, colorPaletteId: 'olive', backgroundColorId: 'yellow', borderRadius: 'sm' }),
            createTemplate('natural', 3, { colorPaletteId: 'stone', backgroundColorId: 'slate', backgroundPattern: 'waves', fontFamily: 'serif' }),
            createTemplate('natural', 4, { isDarkMode: false, colorPaletteId: 'peach', backgroundColorId: 'orange', borderRadius: 'md' }),
            createTemplate('natural', 5, { colorPaletteId: 'chocolate', backgroundColorId: 'default', fontFamily: 'serif', borderRadius: 'sm' }),
            createTemplate('natural', 6, { isDarkMode: false, colorPaletteId: 'mint', backgroundColorId: 'green', cardShadow: false, borderRadius: 'lg' }),
            createTemplate('natural', 7, { colorPaletteId: 'emerald', backgroundColorId: 'green', backgroundPattern: 'dots' }),
            createTemplate('natural', 8, { isDarkMode: false, colorPaletteId: 'stone', fontFamily: 'serif', borderRadius: 'sm' }),
            createTemplate('natural', 9, { colorPaletteId: 'olive', backgroundColorId: 'slate', borderRadius: 'md' }),
            createTemplate('natural', 10, { isDarkMode: false, colorPaletteId: 'green', backgroundPattern: 'waves', borderRadius: 'lg' }),
            createTemplate('natural', 11, { colorPaletteId: 'peach', backgroundColorId: 'default', fontFamily: 'serif' }),
            createTemplate('natural', 12, { isDarkMode: false, colorPaletteId: 'chocolate', borderRadius: 'sm', cardShadow: false }),
            createTemplate('natural', 13, { colorPaletteId: 'mint', backgroundColorId: 'slate', fontFamily: 'serif' }),
            createTemplate('natural', 14, { isDarkMode: false, colorPaletteId: 'emerald', backgroundPattern: 'dots', borderRadius: 'md' }),
            createTemplate('natural', 15, { colorPaletteId: 'stone', backgroundColorId: 'green', borderRadius: 'lg' }),
        ],
    },
    {
        id: 'futuristic',
        name: 'Futuristic & Tech',
        description: 'Sleek, modern, and high-tech designs with sharp lines and cool color palettes.',
        templates: [
            createTemplate('futuristic', 1, { colorPaletteId: 'blue', backgroundColorId: 'slate', borderRadius: 'none', backgroundPattern: 'lines' }),
            createTemplate('futuristic', 2, { colorPaletteId: 'sky', backgroundColorId: 'blue', cardShadow: false, borderRadius: 'sm' }),
            createTemplate('futuristic', 3, { colorPaletteId: 'indigo', backgroundColorId: 'purple', borderRadius: 'none' }),
            createTemplate('futuristic', 4, { colorPaletteId: 'teal', backgroundColorId: 'default', backgroundPattern: 'dots', borderRadius: 'sm' }),
            createTemplate('futuristic', 5, { colorPaletteId: 'slate', backgroundColorId: 'slate', fontFamily: 'sans', borderRadius: 'none' }),
            createTemplate('futuristic', 6, { colorPaletteId: 'purple', backgroundColorId: 'purple', backgroundPattern: 'lines', borderRadius: 'none' }),
            createTemplate('futuristic', 7, { colorPaletteId: 'navy', backgroundColorId: 'blue', cardShadow: false, borderRadius: 'sm' }),
            createTemplate('futuristic', 8, { isDarkMode: false, colorPaletteId: 'silver', borderRadius: 'none', fontFamily: 'sans' }),
            createTemplate('futuristic', 9, { colorPaletteId: 'blue', backgroundPattern: 'waves', borderRadius: 'sm' }),
            createTemplate('futuristic', 10, { colorPaletteId: 'sky', backgroundColorId: 'slate', borderRadius: 'none' }),
            createTemplate('futuristic', 11, { colorPaletteId: 'indigo', cardShadow: false, borderRadius: 'sm' }),
            createTemplate('futuristic', 12, { colorPaletteId: 'teal', backgroundPattern: 'lines', borderRadius: 'none' }),
            createTemplate('futuristic', 13, { colorPaletteId: 'slate', backgroundColorId: 'default', borderRadius: 'sm' }),
            createTemplate('futuristic', 14, { colorPaletteId: 'purple', cardShadow: false, borderRadius: 'none' }),
            createTemplate('futuristic', 15, { colorPaletteId: 'navy', backgroundPattern: 'dots', borderRadius: 'sm' }),
        ],
    },
    {
        id: 'soft',
        name: 'Soft & Pastel',
        description: 'Gentle, light, and dreamy themes featuring soft color palettes and a calming aesthetic.',
        templates: [
            createTemplate('soft', 1, { isDarkMode: false, colorPaletteId: 'lavender', backgroundColorId: 'purple', borderRadius: 'lg', cardShadow: false }),
            createTemplate('soft', 2, { isDarkMode: false, colorPaletteId: 'peach', backgroundColorId: 'orange', borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('soft', 3, { isDarkMode: false, colorPaletteId: 'pink', backgroundColorId: 'pink', backgroundPattern: 'dots', borderRadius: 'lg' }),
            createTemplate('soft', 4, { isDarkMode: false, colorPaletteId: 'mint', backgroundColorId: 'green', borderRadius: 'lg' }),
            createTemplate('soft', 5, { isDarkMode: false, colorPaletteId: 'sky', backgroundColorId: 'blue', borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('soft', 6, { isDarkMode: false, colorPaletteId: 'rose', backgroundColorId: 'pink', cardShadow: false, borderRadius: 'lg' }),
            createTemplate('soft', 7, { isDarkMode: false, colorPaletteId: 'coral', backgroundColorId: 'orange', backgroundPattern: 'waves', borderRadius: 'lg' }),
            createTemplate('soft', 8, { isDarkMode: false, colorPaletteId: 'default', backgroundColorId: 'default', borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('soft', 9, { isDarkMode: false, colorPaletteId: 'lavender', backgroundPattern: 'dots', borderRadius: 'lg' }),
            createTemplate('soft', 10, { isDarkMode: false, colorPaletteId: 'peach', cardShadow: false, borderRadius: 'lg' }),
            createTemplate('soft', 11, { isDarkMode: false, colorPaletteId: 'pink', fontFamily: 'serif', borderRadius: 'lg' }),
            createTemplate('soft', 12, { isDarkMode: false, colorPaletteId: 'mint', backgroundColorId: 'default', borderRadius: 'lg' }),
            createTemplate('soft', 13, { isDarkMode: false, colorPaletteId: 'sky', backgroundPattern: 'waves', borderRadius: 'lg', cardShadow: false }),
            createTemplate('soft', 14, { isDarkMode: false, colorPaletteId: 'rose', backgroundColorId: 'default', borderRadius: 'lg', fontFamily: 'serif' }),
            createTemplate('soft', 15, { isDarkMode: false, colorPaletteId: 'coral', backgroundColorId: 'pink', borderRadius: 'lg' }),
        ],
    },
];
