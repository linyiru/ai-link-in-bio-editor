import type { UserData } from '../types';

const API_BASE = '/api';

export class DataService {
  private static readonly STORAGE_KEY = 'link-in-bio-data';

  // Load user data from server, fallback to localStorage
  static async loadUserData(): Promise<UserData | null> {
    try {
      // Try to load from server first
      const response = await fetch(`${API_BASE}/data`);
      if (response.ok) {
        const data = await response.json();
        // Also save to localStorage as backup
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      console.error('Failed to load data from server:', error);
    }

    // Fallback to localStorage
    try {
      const item = localStorage.getItem(this.STORAGE_KEY);
      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }

    return null;
  }

  // Save data to server and localStorage
  static async saveUserData(userData: UserData): Promise<{ success: boolean; error?: string }> {
    // Always save to localStorage first
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }

    // Try to save to server
    try {
      const response = await fetch(`${API_BASE}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Failed to save to server'
        };
      }
    } catch (error) {
      console.error('Failed to save to server:', error);
      return {
        success: true, // Still success since we saved to localStorage
        error: 'Saved locally only (server unavailable)'
      };
    }
  }

  // Clear all saved data
  static clearUserData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear data from localStorage:', error);
    }
  }
}