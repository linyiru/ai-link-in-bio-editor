import React, { useState, useEffect } from 'react';
import type { UserData } from '../types';
import { INITIAL_USER_DATA } from '../constants';
import { DataService } from '../services/dataService';
import BioLinkPage from '../components/BioLinkPage';

export default function PreviewPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await DataService.loadUserData();
        setUserData(data || INITIAL_USER_DATA);
      } catch (error) {
        console.error("Failed to load user data for preview", error);
        setUserData(INITIAL_USER_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading || !userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading Preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BioLinkPage userData={userData} />
    </div>
  );
}