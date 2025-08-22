import React, { useState, useEffect } from 'react';
import type { UserData } from '../types';
import { INITIAL_USER_DATA, DEFAULT_THEME_SETTINGS } from '../constants';
import { DataService } from '../services/dataService';

const LOCAL_STORAGE_KEY = 'link-in-bio-data';

export const useUserDataWithCloud = (): [
  UserData, 
  React.Dispatch<React.SetStateAction<UserData>>,
  {
    saveToCloud: () => Promise<{ success: boolean; slug?: string; url?: string; error?: string }>;
    isLoading: boolean;
    lastSaveResult: { success: boolean; slug?: string; url?: string; error?: string } | null;
  }
] => {
  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (item) {
        const parsedData = JSON.parse(item);
        // Ensure themeSettings exists and has all default keys
        parsedData.themeSettings = {
          ...DEFAULT_THEME_SETTINGS,
          ...(parsedData.themeSettings || {})
        };
        return parsedData;
      }
      return INITIAL_USER_DATA;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return INITIAL_USER_DATA;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveResult, setLastSaveResult] = useState<{ 
    success: boolean; 
    slug?: string; 
    url?: string; 
    error?: string;
  } | null>(null);

  // Auto-save to localStorage with debounce
  useEffect(() => {
    try {
      const timeoutId = setTimeout(() => {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
      }, 500);
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Failed to save user data to localStorage:", error);
    }
  }, [userData]);

  const saveToCloud = async () => {
    setIsLoading(true);
    try {
      const result = await DataService.saveUserData(userData);
      setLastSaveResult(result);
      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save to cloud'
      };
      setLastSaveResult(errorResult);
      return errorResult;
    } finally {
      setIsLoading(false);
    }
  };

  return [userData, setUserData, { saveToCloud, isLoading, lastSaveResult }];
};