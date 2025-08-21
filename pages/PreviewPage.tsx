
import React, { useState, useEffect } from 'react';
import type { UserData } from '../types';
import { INITIAL_USER_DATA } from '../constants';
import BioLinkPage from '../components/BioLinkPage';

const PreviewPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('link-in-bio-data');
      setUserData(item ? JSON.parse(item) : INITIAL_USER_DATA);
    } catch (error) {
      console.error("Failed to load user data from localStorage for preview", error);
      setUserData(INITIAL_USER_DATA);
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500">Loading Preview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BioLinkPage userData={userData} />
    </div>
  );
};

export default PreviewPage;
