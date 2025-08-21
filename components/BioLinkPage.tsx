
import React from 'react';
import type { UserData } from '../types';
import { BACKGROUND_PATTERNS } from '../constants';
import { getThemeStyles } from '../utils/themeUtils';

interface BioLinkPageProps {
  userData: UserData;
}

const BioLinkPage: React.FC<BioLinkPageProps> = ({ userData }) => {
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

  return (
    <div className={`flex flex-col items-center h-full w-full p-6 text-center transition-all duration-300 ${fontClass} ${backgroundClass}`}>
      <div className={`absolute inset-0 ${patternClass} transition-all duration-300`}></div>
      <div className="relative z-10 flex flex-col items-center w-full">
        <img
          src={profile.imageUrl || 'https://picsum.photos/200'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-2 border-white/50"
        />
        <h1 className={`text-2xl font-bold ${textClass}`}>{profile.name}</h1>
        <p className={`mt-2 mb-6 text-sm max-w-xs ${textClass}`}>{profile.bio}</p>
        <div className="w-full max-w-xs space-y-3">
          {links
            .filter(link => link.isActive)
            .map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full p-4 font-semibold transition-transform duration-200 hover:scale-105 ${buttonClass} ${borderRadiusClass} ${shadowClass}`}
              >
                {link.title}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BioLinkPage;
