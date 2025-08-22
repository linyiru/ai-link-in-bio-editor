
import { ThemeSettings } from '../types';
import { BACKGROUND_COLORS, BORDER_RADIUS_OPTIONS, FONT_FAMILY_OPTIONS } from '../constants';

// Static class mappings for Tailwind v4 compatibility
const PALETTE_CLASSES = {
  'default': {
    light: {
      text: 'text-blue-primary',
      button: 'bg-blue-primary text-blue-secondary',
      accentHover: 'hover:text-blue-accent-light',
      iconWrapper: 'bg-blue-primary text-blue-secondary',
    },
    dark: {
      text: 'text-blue-accent-dark',
      button: 'bg-blue-primary text-blue-secondary',
      accentHover: 'hover:text-blue-accent-dark',
      iconWrapper: 'bg-blue-primary text-blue-secondary',
    }
  },
  'rose': {
    light: {
      text: 'text-rose-accent-light',
      button: 'bg-rose-primary text-rose-secondary',
      accentHover: 'hover:text-rose-accent-light',
      iconWrapper: 'bg-rose-primary text-rose-secondary',
    },
    dark: {
      text: 'text-rose-accent-dark',
      button: 'bg-rose-primary text-rose-secondary',
      accentHover: 'hover:text-rose-accent-dark',
      iconWrapper: 'bg-rose-primary text-rose-secondary',
    }
  },
  'green': {
    light: {
      text: 'text-green-accent-light',
      button: 'bg-green-primary text-green-secondary',
      accentHover: 'hover:text-green-accent-light',
      iconWrapper: 'bg-green-primary text-green-secondary',
    },
    dark: {
      text: 'text-green-accent-dark',
      button: 'bg-green-primary text-green-secondary',
      accentHover: 'hover:text-green-accent-dark',
      iconWrapper: 'bg-green-primary text-green-secondary',
    }
  },
  'purple': {
    light: {
      text: 'text-purple-accent-light',
      button: 'bg-purple-primary text-purple-secondary',
      accentHover: 'hover:text-purple-accent-light',
      iconWrapper: 'bg-purple-primary text-purple-secondary',
    },
    dark: {
      text: 'text-purple-accent-dark',
      button: 'bg-purple-primary text-purple-secondary',
      accentHover: 'hover:text-purple-accent-dark',
      iconWrapper: 'bg-purple-primary text-purple-secondary',
    }
  },
  'orange': {
    light: {
      text: 'text-orange-accent-light',
      button: 'bg-orange-primary text-orange-secondary',
      accentHover: 'hover:text-orange-accent-light',
      iconWrapper: 'bg-orange-primary text-orange-secondary',
    },
    dark: {
      text: 'text-orange-accent-dark',
      button: 'bg-orange-primary text-orange-secondary',
      accentHover: 'hover:text-orange-accent-dark',
      iconWrapper: 'bg-orange-primary text-orange-secondary',
    }
  },
  'blue': {
    light: {
      text: 'text-blue-accent-light',
      button: 'bg-blue-primary text-blue-secondary',
      accentHover: 'hover:text-blue-accent-light',
      iconWrapper: 'bg-blue-primary text-blue-secondary',
    },
    dark: {
      text: 'text-blue-accent-dark',
      button: 'bg-blue-primary text-blue-secondary',
      accentHover: 'hover:text-blue-accent-dark',
      iconWrapper: 'bg-blue-primary text-blue-secondary',
    }
  },
  'teal': {
    light: {
      text: 'text-teal-accent-light',
      button: 'bg-teal-primary text-teal-secondary',
      accentHover: 'hover:text-teal-accent-light',
      iconWrapper: 'bg-teal-primary text-teal-secondary',
    },
    dark: {
      text: 'text-teal-accent-dark',
      button: 'bg-teal-primary text-teal-secondary',
      accentHover: 'hover:text-teal-accent-dark',
      iconWrapper: 'bg-teal-primary text-teal-secondary',
    }
  },
  'pink': {
    light: {
      text: 'text-pink-accent-light',
      button: 'bg-pink-primary text-pink-secondary',
      accentHover: 'hover:text-pink-accent-light',
      iconWrapper: 'bg-pink-primary text-pink-secondary',
    },
    dark: {
      text: 'text-pink-accent-dark',
      button: 'bg-pink-primary text-pink-secondary',
      accentHover: 'hover:text-pink-accent-dark',
      iconWrapper: 'bg-pink-primary text-pink-secondary',
    }
  },
  'sky': {
    light: {
      text: 'text-sky-accent-light',
      button: 'bg-sky-primary text-sky-secondary',
      accentHover: 'hover:text-sky-accent-light',
      iconWrapper: 'bg-sky-primary text-sky-secondary',
    },
    dark: {
      text: 'text-sky-accent-dark',
      button: 'bg-sky-primary text-sky-secondary',
      accentHover: 'hover:text-sky-accent-dark',
      iconWrapper: 'bg-sky-primary text-sky-secondary',
    }
  },
  'coral': {
    light: {
      text: 'text-coral-accent-light',
      button: 'bg-coral-primary text-coral-secondary',
      accentHover: 'hover:text-coral-accent-light',
      iconWrapper: 'bg-coral-primary text-coral-secondary',
    },
    dark: {
      text: 'text-coral-accent-dark',
      button: 'bg-coral-primary text-coral-secondary',
      accentHover: 'hover:text-coral-accent-dark',
      iconWrapper: 'bg-coral-primary text-coral-secondary',
    }
  },
  'indigo': {
    light: {
      text: 'text-indigo-accent-light',
      button: 'bg-indigo-primary text-indigo-secondary',
      accentHover: 'hover:text-indigo-accent-light',
      iconWrapper: 'bg-indigo-primary text-indigo-secondary',
    },
    dark: {
      text: 'text-indigo-accent-dark',
      button: 'bg-indigo-primary text-indigo-secondary',
      accentHover: 'hover:text-indigo-accent-dark',
      iconWrapper: 'bg-indigo-primary text-indigo-secondary',
    }
  },
  'crimson': {
    light: {
      text: 'text-crimson-accent-light',
      button: 'bg-crimson-primary text-crimson-secondary',
      accentHover: 'hover:text-crimson-accent-light',
      iconWrapper: 'bg-crimson-primary text-crimson-secondary',
    },
    dark: {
      text: 'text-crimson-accent-dark',
      button: 'bg-crimson-primary text-crimson-secondary',
      accentHover: 'hover:text-crimson-accent-dark',
      iconWrapper: 'bg-crimson-primary text-crimson-secondary',
    }
  },
  'emerald': {
    light: {
      text: 'text-emerald-accent-light',
      button: 'bg-emerald-primary text-emerald-secondary',
      accentHover: 'hover:text-emerald-accent-light',
      iconWrapper: 'bg-emerald-primary text-emerald-secondary',
    },
    dark: {
      text: 'text-emerald-accent-dark',
      button: 'bg-emerald-primary text-emerald-secondary',
      accentHover: 'hover:text-emerald-accent-dark',
      iconWrapper: 'bg-emerald-primary text-emerald-secondary',
    }
  },
  'mint': {
    light: {
      text: 'text-mint-accent-light',
      button: 'bg-mint-primary text-mint-secondary',
      accentHover: 'hover:text-mint-accent-light',
      iconWrapper: 'bg-mint-primary text-mint-secondary',
    },
    dark: {
      text: 'text-mint-accent-dark',
      button: 'bg-mint-primary text-mint-secondary',
      accentHover: 'hover:text-mint-accent-dark',
      iconWrapper: 'bg-mint-primary text-mint-secondary',
    }
  },
  'lemon': {
    light: {
      text: 'text-lemon-accent-light',
      button: 'bg-lemon-primary text-lemon-secondary',
      accentHover: 'hover:text-lemon-accent-light',
      iconWrapper: 'bg-lemon-primary text-lemon-secondary',
    },
    dark: {
      text: 'text-lemon-accent-dark',
      button: 'bg-lemon-primary text-lemon-secondary',
      accentHover: 'hover:text-lemon-accent-dark',
      iconWrapper: 'bg-lemon-primary text-lemon-secondary',
    }
  },
  'stone': {
    light: {
      text: 'text-stone-accent-light',
      button: 'bg-stone-primary text-stone-secondary',
      accentHover: 'hover:text-stone-accent-light',
      iconWrapper: 'bg-stone-primary text-stone-secondary',
    },
    dark: {
      text: 'text-stone-accent-dark',
      button: 'bg-stone-primary text-stone-secondary',
      accentHover: 'hover:text-stone-accent-dark',
      iconWrapper: 'bg-stone-primary text-stone-secondary',
    }
  },
  'lavender': {
    light: {
      text: 'text-lavender-accent-light',
      button: 'bg-lavender-primary text-lavender-secondary',
      accentHover: 'hover:text-lavender-accent-light',
      iconWrapper: 'bg-lavender-primary text-lavender-secondary',
    },
    dark: {
      text: 'text-lavender-accent-dark',
      button: 'bg-lavender-primary text-lavender-secondary',
      accentHover: 'hover:text-lavender-accent-dark',
      iconWrapper: 'bg-lavender-primary text-lavender-secondary',
    }
  },
  'peach': {
    light: {
      text: 'text-peach-accent-light',
      button: 'bg-peach-primary text-peach-secondary',
      accentHover: 'hover:text-peach-accent-light',
      iconWrapper: 'bg-peach-primary text-peach-secondary',
    },
    dark: {
      text: 'text-peach-accent-dark',
      button: 'bg-peach-primary text-peach-secondary',
      accentHover: 'hover:text-peach-accent-dark',
      iconWrapper: 'bg-peach-primary text-peach-secondary',
    }
  },
  'olive': {
    light: {
      text: 'text-olive-accent-light',
      button: 'bg-olive-primary text-olive-secondary',
      accentHover: 'hover:text-olive-accent-light',
      iconWrapper: 'bg-olive-primary text-olive-secondary',
    },
    dark: {
      text: 'text-olive-accent-dark',
      button: 'bg-olive-primary text-olive-secondary',
      accentHover: 'hover:text-olive-accent-dark',
      iconWrapper: 'bg-olive-primary text-olive-secondary',
    }
  },
  'navy': {
    light: {
      text: 'text-navy-accent-light',
      button: 'bg-navy-primary text-navy-secondary',
      accentHover: 'hover:text-navy-accent-light',
      iconWrapper: 'bg-navy-primary text-navy-secondary',
    },
    dark: {
      text: 'text-navy-accent-dark',
      button: 'bg-navy-primary text-navy-secondary',
      accentHover: 'hover:text-navy-accent-dark',
      iconWrapper: 'bg-navy-primary text-navy-secondary',
    }
  },
  'chocolate': {
    light: {
      text: 'text-chocolate-accent-light',
      button: 'bg-chocolate-primary text-chocolate-secondary',
      accentHover: 'hover:text-chocolate-accent-light',
      iconWrapper: 'bg-chocolate-primary text-chocolate-secondary',
    },
    dark: {
      text: 'text-chocolate-accent-dark',
      button: 'bg-chocolate-primary text-chocolate-secondary',
      accentHover: 'hover:text-chocolate-accent-dark',
      iconWrapper: 'bg-chocolate-primary text-chocolate-secondary',
    }
  },
  'slate': {
    light: {
      text: 'text-slate-accent-light',
      button: 'bg-slate-primary text-slate-secondary',
      accentHover: 'hover:text-slate-accent-light',
      iconWrapper: 'bg-slate-primary text-slate-secondary',
    },
    dark: {
      text: 'text-slate-accent-dark',
      button: 'bg-slate-primary text-slate-secondary',
      accentHover: 'hover:text-slate-accent-dark',
      iconWrapper: 'bg-slate-primary text-slate-secondary',
    }
  },
  'gold': {
    light: {
      text: 'text-gold-accent-light',
      button: 'bg-gold-primary text-gold-secondary',
      accentHover: 'hover:text-gold-accent-light',
      iconWrapper: 'bg-gold-primary text-gold-secondary',
    },
    dark: {
      text: 'text-gold-accent-dark',
      button: 'bg-gold-primary text-gold-secondary',
      accentHover: 'hover:text-gold-accent-dark',
      iconWrapper: 'bg-gold-primary text-gold-secondary',
    }
  },
  'silver': {
    light: {
      text: 'text-silver-accent-light',
      button: 'bg-silver-primary text-silver-secondary',
      accentHover: 'hover:text-silver-accent-light',
      iconWrapper: 'bg-silver-primary text-silver-secondary',
    },
    dark: {
      text: 'text-silver-accent-dark',
      button: 'bg-silver-primary text-silver-secondary',
      accentHover: 'hover:text-silver-accent-dark',
      iconWrapper: 'bg-silver-primary text-silver-secondary',
    }
  }
} as const;

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

    // Get static classes from the mapping
    const paletteClasses = PALETTE_CLASSES[colorPaletteId as keyof typeof PALETTE_CLASSES] || PALETTE_CLASSES.default;
    const modeClasses = isDarkMode ? paletteClasses.dark : paletteClasses.light;
    
    const textClass = modeClasses.text;
    const buttonClass = modeClasses.button;
    const accentHoverTextClass = modeClasses.accentHover;
    const iconWrapperClass = modeClasses.iconWrapper;

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