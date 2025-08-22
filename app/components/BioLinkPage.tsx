
import React from 'react';
import type { UserData } from '../types';
import { BACKGROUND_PATTERNS } from '../constants';
import { getThemeStyles } from '../utils/themeUtils';
import * as LucideIcons from 'lucide-react';

interface BioLinkPageProps {
  userData: UserData;
  isPreview?: boolean; // Whether in preview mode
}

const BioLinkPage: React.FC<BioLinkPageProps> = ({ userData, isPreview = false }) => {
  const { profile, links, themeSettings } = userData;

  const {
    backgroundClass,
    textClass,
    buttonClass,
    fontClass,
    borderRadiusClass,
    shadowClass,
  } = getThemeStyles(themeSettings);

  const patternClass = BACKGROUND_PATTERNS[themeSettings.backgroundPattern].class;
  
  // Determine height styles based on preview mode
  const heightClass = isPreview ? 'h-full' : 'min-h-screen';
  const contentHeightClass = isPreview ? 'h-full' : 'min-h-screen';
  const justifyClass = isPreview ? 'justify-start pt-8' : 'justify-center';

  // Helper function to render Lucide icons
  const renderIcon = (iconName?: string) => {
    if (!iconName) return <LucideIcons.Link size={20} />;
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={20} /> : <LucideIcons.Link size={20} />;
  };

  return (
    <div className={`flex flex-col items-center ${heightClass} w-full p-6 text-center transition-all duration-300 ${fontClass} ${backgroundClass}`}>
      <div className={`absolute inset-0 ${patternClass} transition-all duration-300`}></div>
      <div className={`relative z-10 flex flex-col items-center ${justifyClass} w-full ${contentHeightClass} py-8`}>
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          <img
            src={profile.imageUrl || 'https://picsum.photos/200'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-2 border-white/50"
          />
          <h1 className={`text-2xl font-bold ${textClass}`}>{profile.name}</h1>
          <p className={`mt-2 mb-6 text-sm max-w-xs ${textClass}`}>{profile.bio}</p>
          <div className="w-full space-y-3">
          {links
            .filter(link => link.isActive)
            .map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 w-full p-4 font-semibold transition-transform duration-200 hover:scale-105 ${buttonClass} ${borderRadiusClass} ${shadowClass}`}
              >
                <span className="flex-shrink-0">
                  {renderIcon(link.icon)}
                </span>
                <span className="flex-1 text-center">{link.title}</span>
                <span className="w-5 flex-shrink-0"></span> {/* Balance spacing */}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioLinkPage;
