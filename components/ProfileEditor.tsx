import React, { useState } from 'react';
import { useUserData } from '../hooks/useUserData';
import type { ThemeSettings } from '../types';
import { generateBio, isAiAvailable } from '../services/geminiService';
import { SparklesIcon } from './icons';

interface EditorProps {
  userData: ReturnType<typeof useUserData>[0];
  setUserData: ReturnType<typeof useUserData>[1];
}

const ProfileEditor: React.FC<EditorProps> = ({ userData, setUserData }) => {
  const [bioKeywords, setBioKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProfileChange = <K extends keyof typeof userData.profile>(field: K, value: (typeof userData.profile)[K]) => {
    setUserData(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  };

  const handleGenerateBio = async () => {
    if (!bioKeywords) return;
    setIsGenerating(true);
    const newBio = await generateBio(bioKeywords);
    handleProfileChange('bio', newBio);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="profile-image-url" className="block text-sm font-medium text-gray-400 mb-2">Profile Picture URL</label>
            <input
              id="profile-image-url"
              type="text"
              value={userData.profile.imageUrl}
              onChange={e => handleProfileChange('imageUrl', e.target.value)}
              placeholder="https://example.com/avatar.png"
              aria-label="Profile picture URL"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-400 mb-2">Profile Title</label>
            <input
              id="profile-name"
              type="text"
              value={userData.profile.name}
              onChange={e => handleProfileChange('name', e.target.value)}
              placeholder="Your name or title"
              aria-label="Profile title"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="profile-bio" className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
            <textarea
              id="profile-bio"
              value={userData.profile.bio}
              onChange={e => handleProfileChange('bio', e.target.value)}
              rows={3}
              placeholder="Tell your audience about yourself"
              aria-label="Profile bio"
              className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
            <label className="block text-sm font-medium text-gray-300 mb-1">Generate Bio with AI</label>
             <p className="text-xs text-gray-500 mb-3">Describe yourself in a few keywords.</p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="e.g., 'React developer, coffee lover'"
                value={bioKeywords}
                onChange={e => setBioKeywords(e.target.value)}
                disabled={!isAiAvailable || isGenerating}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800/50"
              />
              <button
                onClick={handleGenerateBio}
                disabled={!isAiAvailable || isGenerating || !bioKeywords}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-40"
              >
                {isGenerating ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                    <><SparklesIcon className="w-5 h-5"/> Generate</>
                )}
              </button>
            </div>
            {!isAiAvailable && <p className="text-xs text-gray-500 mt-2">AI features disabled. Set API_KEY to enable.</p>}
          </div>
        </div>
    </div>
  );
};

export default ProfileEditor;


