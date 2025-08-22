import React, { useState } from 'react';
import BioLinkPage from '../components/BioLinkPage';
import type { UserData } from '../types';

// Demo data for first-time visitors
const demoUserData: UserData = {
  profile: {
    name: "AI Link-in-Bio",
    bio: "Create your beautiful link page ✨",
    imageUrl: ""
  },
  links: [
    {
      id: "1",
      title: "Create Your Page",
      url: "#/admin",
      isActive: true,
      icon: "Zap"
    },
    {
      id: "2", 
      title: "About This Tool",
      url: "#/about",
      isActive: true,
      icon: "Info"
    },
    {
      id: "3",
      title: "View This Demo",
      url: "#/",
      isActive: true,
      icon: "Smartphone"
    },
    {
      id: "4",
      title: "GitHub Repository",
      url: "https://github.com",
      isActive: true,
      icon: "Github"
    }
  ],
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

// Extend Window interface to include our SSR data
declare global {
  interface Window {
    __INITIAL_USER_DATA__?: UserData;
  }
}

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Use SSR data if available, otherwise use demo data
    if (typeof window !== 'undefined' && window.__INITIAL_USER_DATA__) {
      return window.__INITIAL_USER_DATA__;
    }
    return demoUserData;
  });

  return (
    <div className="relative">
      <BioLinkPage userData={userData} />
    </div>
  );
};

export default HomePage;