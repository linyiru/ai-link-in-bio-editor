import React from 'react';
import { Link } from 'react-router-dom';
import BioLinkPage from '../components/BioLinkPage';
import type { UserData } from '../types';

// Demo data for the about page
const demoUserData: UserData = {
  profile: {
    name: "Alex Chen",
    bio: "Digital Creator & Tech Enthusiast",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  links: [
    {
      id: "1",
      title: "YouTube Channel",
      url: "https://youtube.com",
      isActive: true,
      icon: "Youtube"
    },
    {
      id: "2", 
      title: "Instagram",
      url: "https://instagram.com",
      isActive: true,
      icon: "Instagram"
    },
    {
      id: "3",
      title: "Twitter/X",
      url: "https://twitter.com",
      isActive: true,
      icon: "Twitter"
    },
    {
      id: "4",
      title: "LinkedIn",
      url: "https://linkedin.com", 
      isActive: true,
      icon: "Linkedin"
    },
    {
      id: "5",
      title: "Portfolio",
      url: "https://example.com",
      isActive: true,
      icon: "Globe"
    }
  ],
  themeSettings: {
    isDarkMode: false,
    colorPaletteId: "blue",
    backgroundColorId: "blue",
    backgroundPattern: "none",
    cardShadow: true,
    borderRadius: "md",
    fontFamily: "sans"
  }
};

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              AI Link-in-Bio
            </Link>
            <p className="text-sm text-gray-600">Create your beautiful link page in minutes</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/admin"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              Create Your Page
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your <span className="text-blue-600">Links</span>, 
            <br />Your <span className="text-indigo-600">Style</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create a beautiful, personalized link page with AI-powered customization. 
            Share one link that connects to everything that matters to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/admin"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl text-lg"
            >
              🚀 Get Started Free
            </Link>
            <button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-3 rounded-xl hover:border-gray-400 transition-colors font-semibold text-lg"
            >
              📱 View Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-3">Beautiful Themes</h3>
            <p className="text-gray-600">Choose from multiple color palettes, fonts, and background patterns to match your style.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
            <p className="text-gray-600">Get smart suggestions for content and styling with integrated Google Gemini AI.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-gray-600">Powered by Cloudflare Workers for instant loading worldwide.</p>
          </div>
        </div>

        {/* Demo Preview */}
        <div id="demo" className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
            See it in action
          </h3>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-gray-900">
                Everything you need to shine online
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Drag & drop link ordering</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Live preview while editing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Cloud storage & sharing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Mobile-optimized design</span>
                </li>
              </ul>
              <Link 
                to="/admin"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Start Building →
              </Link>
            </div>
            
            {/* Mobile Preview */}
            <div className="flex justify-center">
              <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[650px] w-[375px] shadow-2xl">
                <div className="w-[160px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
                  <BioLinkPage userData={demoUserData} isPreview={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-xl mb-8 opacity-90">Join thousands of creators who've built their online presence</p>
            <Link 
              to="/admin"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-bold text-lg shadow-lg"
            >
              Create Your Free Page
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4">AI Link-in-Bio</div>
          <p className="text-gray-400 mb-6">Built with React + Cloudflare Workers</p>
          <div className="text-sm text-gray-500">
            Powered by AI • Lightning Fast • Free to Use
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;