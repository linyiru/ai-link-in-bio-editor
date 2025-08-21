
import { ThemeSettings } from '../types';
import { BACKGROUND_COLORS, BORDER_RADIUS_OPTIONS, FONT_FAMILY_OPTIONS, COLOR_PALETTES } from '../constants';

export function getThemeStyles(themeSettings: ThemeSettings) {
    const {
        isDarkMode,
        colorPaletteId,
        backgroundColorId,
        cardShadow,
        borderRadius,
        fontFamily,
    } = themeSettings;

    const bgColor = BACKGROUND_COLORS.find(c => c.id === backgroundColorId) || BACKGROUND_COLORS[0];
    const backgroundClass = isDarkMode ? bgColor.dark : bgColor.light;

    const palette = COLOR_PALETTES.find(p => p.id === colorPaletteId) || COLOR_PALETTES[0];
    const modeStyles = isDarkMode ? palette.dark : palette.light;
    
    const textClass = `text-[${modeStyles.accent}]`;
    const buttonClass = `bg-[${modeStyles.primary}] text-[${modeStyles.secondary}]`;
    const accentHoverTextClass = `hover:text-[${modeStyles.accent}]`;
    const iconWrapperClass = `bg-[${modeStyles.primary}] text-[${modeStyles.secondary}]`;


    const font = FONT_FAMILY_OPTIONS.find(f => f.id === fontFamily) || FONT_FAMILY_OPTIONS[0];
    const fontClass = font.class;

    const radius = BORDER_RADIUS_OPTIONS.find(r => r.id === borderRadius) || BORDER_RADIUS_OPTIONS[0];
    const borderRadiusClass = radius.class;

    const shadowClass = cardShadow ? 'shadow-lg' : 'shadow-none';
    
    return {
        backgroundClass,
        textClass,
        buttonClass,
        fontClass,
        borderRadiusClass,
        shadowClass,
        accentHoverTextClass,
        iconWrapperClass,
    };
}