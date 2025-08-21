import React, { useState } from 'react';
import { useUserData } from '../hooks/useUserData';
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

const EditorPage: React.FC = () => {
  const [userData, setUserData] = useUserData();
  const [activeTab, setActiveTab] = useState<EditorTab>('profile');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const handleApplyTemplate = (themeSettings: ThemeSettings) => {
    setUserData(prev => ({ ...prev, themeSettings }));
    setIsTemplateModalOpen(false);
  };

  return (
    <div className="min-h-screen text-gray-300">
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
            <a
              href="/#/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-md"
            >
              Live Preview
            </a>
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
                 <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl shadow-blue-500/10">
                    <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
                        <BioLinkPage userData={userData} />
                    </div>
                </div>
            </div>
        </div>
      </main>

      {isTemplateModalOpen && (
        <TemplateModal onClose={() => setIsTemplateModalOpen(false)}>
            <TemplatesEditor onApply={handleApplyTemplate}/>
        </TemplateModal>
      )}
    </div>
  );
};

export default EditorPage;
