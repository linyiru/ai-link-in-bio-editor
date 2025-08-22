import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BioLinkPage from '../components/BioLinkPage';
import type { UserData } from '../types';
import { DataService } from '../services/dataService';
import { INITIAL_USER_DATA } from '../constants';

const PublicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!slug) {
        setError('Invalid page URL');
        setIsLoading(false);
        return;
      }

      try {
        const data = await DataService.loadUserData(slug);
        if (data) {
          setUserData(data);
        } else {
          setError('Page not found');
        }
      } catch (err) {
        setError('Failed to load page');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/admin" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Own Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <BioLinkPage userData={userData} />
      <div className="fixed bottom-4 right-4">
        <Link 
          to="/admin"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-lg"
        >
          Create Your Own
        </Link>
      </div>
    </div>
  );
};

export default PublicPage;