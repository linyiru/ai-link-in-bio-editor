import React, { useState } from 'react';
import { Link } from 'react-router';
import { useUserData } from '../hooks/useUserData';
import { DataService } from '../services/dataService';
import type { ThemeSettings } from '../types';
import BioLinkPage from '../components/BioLinkPage';
import { LinkIcon, PaletteIcon, UserIcon, LayoutTemplateIcon } from '../components/icons';
import LinksEditor from '../components/LinksEditor';
import ProfileEditor from '../components/ProfileEditor';
import ThemeEditor from '../components/ThemeEditor';
import TemplatesEditor from '../components/TemplatesEditor';
import TemplateModal from '../components/TemplateModal';
import TabButton from '../components/TabButton';

type EditorTab = 'profile' | 'links' | 'theme';

export default function AdminPage() {
  const [userData, setUserData, isDataLoading] = useUserData();
  const [activeTab, setActiveTab] = useState<EditorTab>('profile');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveResult, setLastSaveResult] = useState<{ 
    success: boolean; 
    error?: string;
  } | null>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleApplyTemplate = (themeSettings: ThemeSettings) => {
    setUserData(prev => ({ ...prev, themeSettings }));
    setIsTemplateModalOpen(false);
  };

  const handleSaveToCloud = async () => {
    setIsLoading(true);
    try {
      const result = await DataService.saveUserData(userData);
      setLastSaveResult(result);
      if (result.success) {
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
      }
    } catch (error) {
      setLastSaveResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <header className="bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-20">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">AI Link-in-Bio</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsTemplateModalOpen(true)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold shadow-md flex items-center gap-2"
            >
              <LayoutTemplateIcon className="w-5 h-5"/>
              Templates
            </button>
            <button
              onClick={handleSaveToCloud}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold shadow-md"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <Link 
              to="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-md"
            >
              View Homepage
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-black rounded-xl shadow-2xl p-6">
          <div className="mb-6">
            <div className="p-1 flex space-x-1 bg-gray-900/80 rounded-lg">
              <TabButton
                  isActive={activeTab === 'profile'}
                  onClick={() => setActiveTab('profile')}
              >
                  <UserIcon className="w-5 h-5"/> Profile
              </TabButton>
              <TabButton
                  isActive={activeTab === 'links'}
                  onClick={() => setActiveTab('links')}
              >
                  <LinkIcon className="w-5 h-5"/> Links
              </TabButton>
              <TabButton
                  isActive={activeTab === 'theme'}
                  onClick={() => setActiveTab('theme')}
              >
                  <PaletteIcon className="w-5 h-5"/> Theme
              </TabButton>
            </div>
          </div>
          {activeTab === 'profile' && <ProfileEditor userData={userData} setUserData={setUserData} />}
          {activeTab === 'links' && <LinksEditor userData={userData} setUserData={setUserData} />}
          {activeTab === 'theme' && <ThemeEditor userData={userData} setUserData={setUserData} />}
        </div>

        <div className="lg:col-span-1">
            <div className="sticky top-24">
                 <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[650px] w-[375px] shadow-2xl shadow-blue-500/10">
                    <div className="w-[160px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
                        <BioLinkPage userData={userData} isPreview={true} />
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Success notification */}
      {showSaveSuccess && lastSaveResult?.success && (
        <div className="fixed top-20 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-30 max-w-sm">
          <div className="font-semibold">Page saved successfully!</div>
          {lastSaveResult.error && (
            <div className="text-sm mt-1 opacity-80">{lastSaveResult.error}</div>
          )}
        </div>
      )}

      {/* Error notification */}
      {lastSaveResult && !lastSaveResult.success && (
        <div className="fixed top-20 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-30 max-w-sm">
          <div className="font-semibold mb-1">Save failed</div>
          <div className="text-sm">{lastSaveResult.error}</div>
        </div>
      )}

      {isTemplateModalOpen && (
        <TemplateModal onClose={() => setIsTemplateModalOpen(false)}>
            <TemplatesEditor onApply={handleApplyTemplate}/>
        </TemplateModal>
      )}
    </div>
  );
}