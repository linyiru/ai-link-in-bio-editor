import type { UserData } from '../types';

const API_BASE = '/api';

export class DataService {
  private static userSlug: string | null = null;

  // Load data from server by slug, or from localStorage as fallback
  static async loadUserData(slug?: string): Promise<UserData | null> {
    if (slug) {
      try {
        const response = await fetch(`${API_BASE}/page/${slug}`);
        if (response.ok) {
          const data = await response.json();
          this.userSlug = slug;
          return data;
        }
      } catch (error) {
        console.error('Failed to load data from server:', error);
      }
    }

    // Fallback to localStorage
    try {
      const item = localStorage.getItem('link-in-bio-data');
      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }

    return null;
  }

  // Save data to server and get shareable link
  static async saveUserData(userData: UserData): Promise<{ success: boolean; slug?: string; url?: string; error?: string }> {
    try {
      const response = await fetch(`${API_BASE}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          slug: this.userSlug
        })
      });

      if (response.ok) {
        const result = await response.json();
        this.userSlug = result.slug;
        
        // Also save to localStorage as backup
        localStorage.setItem('link-in-bio-data', JSON.stringify(userData));
        
        return {
          success: true,
          slug: result.slug,
          url: result.url
        };
      } else {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Failed to save data'
        };
      }
    } catch (error) {
      console.error('Failed to save data to server:', error);
      
      // Fallback to localStorage
      try {
        localStorage.setItem('link-in-bio-data', JSON.stringify(userData));
        return {
          success: true,
          error: 'Saved locally only (server unavailable)'
        };
      } catch (localError) {
        return {
          success: false,
          error: 'Failed to save data'
        };
      }
    }
  }

  // Get current user slug
  static getCurrentSlug(): string | null {
    return this.userSlug;
  }

  // Set user slug (for when loading from URL)
  static setCurrentSlug(slug: string) {
    this.userSlug = slug;
  }

  // Clear current session
  static clearSession() {
    this.userSlug = null;
  }
}