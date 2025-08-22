import React, { useState, useEffect } from 'react';
import type { UserData } from '../types';
import { INITIAL_USER_DATA, DEFAULT_THEME_SETTINGS } from '../constants';
import { DataService } from '../services/dataService';

export const useUserData = (): [UserData, React.Dispatch<React.SetStateAction<UserData>>, boolean] => {
  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from server on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await DataService.loadUserData();
        if (data) {
          // Ensure themeSettings exists and has all default keys
          data.themeSettings = {
            ...DEFAULT_THEME_SETTINGS,
            ...(data.themeSettings || {})
          };
          setUserData(data);
        }
      } catch (error) {
        console.error("Failed to load user data from server:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return [userData, setUserData, isLoading];
};