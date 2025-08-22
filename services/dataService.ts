import type { UserData } from '../types';

const API_BASE = '/api';

export class DataService {
  // Load user data from server
  static async loadUserData(): Promise<UserData | null> {
    try {
      const response = await fetch(`${API_BASE}/data`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to load data from server:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Failed to load data from server:', error);
      return null;
    }
  }

  // Save data to server
  static async saveUserData(userData: UserData): Promise<{ success: boolean; error?: string }> {
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
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        return {
          success: false,
          error: error.message || 'Failed to save data'
        };
      }
    } catch (error) {
      console.error('Failed to save to server:', error);
      return {
        success: false,
        error: 'Network error: Unable to save data'
      };
    }
  }

}