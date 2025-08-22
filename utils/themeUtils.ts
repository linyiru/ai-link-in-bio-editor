
import { ThemeSettings } from '../types';
import { BACKGROUND_COLORS, BORDER_RADIUS_OPTIONS, FONT_FAMILY_OPTIONS, COLOR_PALETTES } from '../constants';

// Static color class mappings for each palette
const PALETTE_CLASSES = {
  default: {
    light: {
      primary: 'bg-palette-default-primary-light',
      secondary: 'text-palette-default-secondary-light', 
      accent: 'text-palette-default-accent-light'
    },
    dark: {
      primary: 'bg-palette-default-primary-dark',
      secondary: 'text-palette-default-secondary-dark',
      accent: 'text-palette-default-accent-dark'
    }
  },
  rose: {
    light: {
      primary: 'bg-palette-rose-primary',
      secondary: 'text-palette-rose-secondary',
      accent: 'text-palette-rose-accent-light'
    },
    dark: {
      primary: 'bg-palette-rose-primary',
      secondary: 'text-palette-rose-secondary',
      accent: 'text-palette-rose-accent-dark'
    }
  },
  green: {
    light: {
      primary: 'bg-palette-green-primary',
      secondary: 'text-palette-green-secondary',
      accent: 'text-palette-green-accent-light'
    },
    dark: {
      primary: 'bg-palette-green-primary',
      secondary: 'text-palette-green-secondary',
      accent: 'text-palette-green-accent-dark'
    }
  },
  purple: {
    light: {
      primary: 'bg-palette-purple-primary',
      secondary: 'text-palette-purple-secondary',
      accent: 'text-palette-purple-accent-light'
    },
    dark: {
      primary: 'bg-palette-purple-primary',
      secondary: 'text-palette-purple-secondary',
      accent: 'text-palette-purple-accent-dark'
    }
  },
  orange: {
    light: {
      primary: 'bg-palette-orange-primary',
      secondary: 'text-palette-orange-secondary',
      accent: 'text-palette-orange-accent-light'
    },
    dark: {
      primary: 'bg-palette-orange-primary',
      secondary: 'text-palette-orange-secondary',
      accent: 'text-palette-orange-accent-dark'
    }
  },
  blue: {
    light: {
      primary: 'bg-palette-blue-primary',
      secondary: 'text-palette-blue-secondary',
      accent: 'text-palette-blue-accent-light'
    },
    dark: {
      primary: 'bg-palette-blue-primary',
      secondary: 'text-palette-blue-secondary',
      accent: 'text-palette-blue-accent-dark'
    }
  },
  teal: {
    light: {
      primary: 'bg-palette-teal-primary',
      secondary: 'text-palette-teal-secondary',
      accent: 'text-palette-teal-accent-light'
    },
    dark: {
      primary: 'bg-palette-teal-primary',
      secondary: 'text-palette-teal-secondary',
      accent: 'text-palette-teal-accent-dark'
    }
  },
  pink: {
    light: {
      primary: 'bg-palette-pink-primary',
      secondary: 'text-palette-pink-secondary',
      accent: 'text-palette-pink-accent-light'
    },
    dark: {
      primary: 'bg-palette-pink-primary',
      secondary: 'text-palette-pink-secondary',
      accent: 'text-palette-pink-accent-dark'
    }
  },
  sky: {
    light: {
      primary: 'bg-palette-sky-primary',
      secondary: 'text-palette-sky-secondary',
      accent: 'text-palette-sky-accent-light'
    },
    dark: {
      primary: 'bg-palette-sky-primary',
      secondary: 'text-palette-sky-secondary',
      accent: 'text-palette-sky-accent-dark'
    }
  },
  mint: {
    light: {
      primary: 'bg-palette-mint-primary',
      secondary: 'text-palette-mint-secondary-light',
      accent: 'text-palette-mint-accent-light'
    },
    dark: {
      primary: 'bg-palette-mint-primary',
      secondary: 'text-palette-mint-secondary-dark',
      accent: 'text-palette-mint-accent-dark'
    }
  },
  lemon: {
    light: {
      primary: 'bg-palette-lemon-primary',
      secondary: 'text-palette-lemon-secondary-light',
      accent: 'text-palette-lemon-accent-light'
    },
    dark: {
      primary: 'bg-palette-lemon-primary',
      secondary: 'text-palette-lemon-secondary-dark',
      accent: 'text-palette-lemon-accent-dark'
    }
  },
  coral: {
    light: {
      primary: 'bg-palette-coral-primary',
      secondary: 'text-palette-coral-secondary',
      accent: 'text-palette-coral-accent-light'
    },
    dark: {
      primary: 'bg-palette-coral-primary',
      secondary: 'text-palette-coral-secondary',
      accent: 'text-palette-coral-accent-dark'
    }
  },
  indigo: {
    light: {
      primary: 'bg-palette-indigo-primary',
      secondary: 'text-palette-indigo-secondary',
      accent: 'text-palette-indigo-accent-light'
    },
    dark: {
      primary: 'bg-palette-indigo-primary',
      secondary: 'text-palette-indigo-secondary',
      accent: 'text-palette-indigo-accent-dark'
    }
  },
  stone: {
    light: {
      primary: 'bg-palette-stone-primary-light',
      secondary: 'text-palette-stone-secondary-light',
      accent: 'text-palette-stone-accent-light'
    },
    dark: {
      primary: 'bg-palette-stone-primary-dark',
      secondary: 'text-palette-stone-secondary-dark',
      accent: 'text-palette-stone-accent-dark'
    }
  },
  crimson: {
    light: {
      primary: 'bg-palette-crimson-primary',
      secondary: 'text-palette-crimson-secondary',
      accent: 'text-palette-crimson-accent-light'
    },
    dark: {
      primary: 'bg-palette-crimson-primary',
      secondary: 'text-palette-crimson-secondary',
      accent: 'text-palette-crimson-accent-dark'
    }
  },
  emerald: {
    light: {
      primary: 'bg-palette-emerald-primary',
      secondary: 'text-palette-emerald-secondary',
      accent: 'text-palette-emerald-accent-light'
    },
    dark: {
      primary: 'bg-palette-emerald-primary',
      secondary: 'text-palette-emerald-secondary',
      accent: 'text-palette-emerald-accent-dark'
    }
  },
  lavender: {
    light: {
      primary: 'bg-palette-lavender-primary-light',
      secondary: 'text-palette-lavender-secondary-light',
      accent: 'text-palette-lavender-accent-light'
    },
    dark: {
      primary: 'bg-palette-lavender-primary-dark',
      secondary: 'text-palette-lavender-secondary-dark',
      accent: 'text-palette-lavender-accent-dark'
    }
  },
  peach: {
    light: {
      primary: 'bg-palette-peach-primary-light',
      secondary: 'text-palette-peach-secondary-light',
      accent: 'text-palette-peach-accent-light'
    },
    dark: {
      primary: 'bg-palette-peach-primary-dark',
      secondary: 'text-palette-peach-secondary-dark',
      accent: 'text-palette-peach-accent-dark'
    }
  },
  olive: {
    light: {
      primary: 'bg-palette-olive-primary-light',
      secondary: 'text-palette-olive-secondary-light',
      accent: 'text-palette-olive-accent-light'
    },
    dark: {
      primary: 'bg-palette-olive-primary-dark',
      secondary: 'text-palette-olive-secondary-dark',
      accent: 'text-palette-olive-accent-dark'
    }
  },
  navy: {
    light: {
      primary: 'bg-palette-navy-primary-light',
      secondary: 'text-palette-navy-secondary',
      accent: 'text-palette-navy-accent-light'
    },
    dark: {
      primary: 'bg-palette-navy-primary-dark',
      secondary: 'text-palette-navy-secondary',
      accent: 'text-palette-navy-accent-dark'
    }
  },
  chocolate: {
    light: {
      primary: 'bg-palette-chocolate-primary-light',
      secondary: 'text-palette-chocolate-secondary',
      accent: 'text-palette-chocolate-accent-light'
    },
    dark: {
      primary: 'bg-palette-chocolate-primary-dark',
      secondary: 'text-palette-chocolate-secondary',
      accent: 'text-palette-chocolate-accent-dark'
    }
  },
  slate: {
    light: {
      primary: 'bg-palette-slate-primary-light',
      secondary: 'text-palette-slate-secondary',
      accent: 'text-palette-slate-accent-light'
    },
    dark: {
      primary: 'bg-palette-slate-primary-dark',
      secondary: 'text-palette-slate-secondary',
      accent: 'text-palette-slate-accent-dark'
    }
  },
  gold: {
    light: {
      primary: 'bg-palette-gold-primary-light',
      secondary: 'text-palette-gold-secondary-light',
      accent: 'text-palette-gold-accent-light'
    },
    dark: {
      primary: 'bg-palette-gold-primary-dark',
      secondary: 'text-palette-gold-secondary-dark',
      accent: 'text-palette-gold-accent-dark'
    }
  },
  silver: {
    light: {
      primary: 'bg-palette-silver-primary-light',
      secondary: 'text-palette-silver-secondary-light',
      accent: 'text-palette-silver-accent-light'
    },
    dark: {
      primary: 'bg-palette-silver-primary-dark',
      secondary: 'text-palette-silver-secondary-dark',
      accent: 'text-palette-silver-accent-dark'
    }
  }
};

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

    const paletteClasses = PALETTE_CLASSES[colorPaletteId as keyof typeof PALETTE_CLASSES] || PALETTE_CLASSES.default;
    const modeClasses = isDarkMode ? paletteClasses.dark : paletteClasses.light;
    
    const textClass = modeClasses.accent;
    const buttonClass = `${modeClasses.primary} ${modeClasses.secondary}`;
    const accentHoverTextClass = `hover:${modeClasses.accent}`;
    const iconWrapperClass = `${modeClasses.primary} ${modeClasses.secondary}`;

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