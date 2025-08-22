import React from 'react';
import type { ThemeSettings } from '../types';
import { getThemeStyles } from '../utils/themeUtils';
import { BACKGROUND_PATTERNS } from '../constants';

interface TemplatePreviewProps {
  themeSettings: ThemeSettings;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ themeSettings }) => {
  const {
    backgroundClass,
    buttonClass,
    borderRadiusClass,
    shadowClass,
  } = getThemeStyles(themeSettings);

  const patternClass = BACKGROUND_PATTERNS[themeSettings.backgroundPattern].class;

  // Use a different text color utility for the preview to ensure visibility
  const getPreviewPlaceholderColor = (isDark: boolean) => isDark ? 'bg-gray-400/50' : 'bg-gray-600/50';
  const placeholderColor = getPreviewPlaceholderColor(themeSettings.isDarkMode);


  return (
    <div className={`relative w-full h-40 overflow-hidden ${backgroundClass}`}>
      <div className={`absolute inset-0 ${patternClass}`}></div>
      <div className="relative z-10 flex flex-col items-center justify-start pt-6 h-full w-full">
        {/* Fake Profile */}
        <div className={`w-10 h-10 rounded-full mb-2 ${placeholderColor} opacity-50`}></div>
        <div className={`h-3 w-16 rounded-sm mb-1 ${placeholderColor} opacity-80`}></div>
        <div className={`h-2 w-24 rounded-sm ${placeholderColor} opacity-60 mb-3`}></div>
        
        {/* Fake Links */}
        <div className="space-y-1.5 w-full px-8">
          <div className={`h-5 w-full ${buttonClass} ${borderRadiusClass} ${shadowClass}`}></div>
          <div className={`h-5 w-full ${buttonClass} ${borderRadiusClass} ${shadowClass}`}></div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
