import React, { useState, useEffect } from 'react';
import type { UserData } from '../types';
import { INITIAL_USER_DATA, DEFAULT_THEME_SETTINGS } from '../constants';

const LOCAL_STORAGE_KEY = 'link-in-bio-data';

export const useUserData = (): [UserData, React.Dispatch<React.SetStateAction<UserData>>] => {
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

  useEffect(() => {
    try {
      const timeoutId = setTimeout(() => {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
      }, 500); // Debounce saving to localStorage
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Failed to save user data to localStorage:", error);
    }
  }, [userData]);

  return [userData, setUserData];
};