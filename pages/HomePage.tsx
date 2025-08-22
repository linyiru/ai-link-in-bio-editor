import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BioLinkPage from '../components/BioLinkPage';
import type { UserData } from '../types';
import { DataService } from '../services/dataService';

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

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(demoUserData);
  const [isLoading, setIsLoading] = useState(false);

  // Load user's data from database
  useEffect(() => {
    const tryLoadUserData = async () => {
      setIsLoading(true);
      try {
        const data = await DataService.loadUserData();
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.log('Using demo data for homepage');
      } finally {
        setIsLoading(false);
      }
    };
    
    tryLoadUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <BioLinkPage userData={userData} />
    </div>
  );
};

export default HomePage;