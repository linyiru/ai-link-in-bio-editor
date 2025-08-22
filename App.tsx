
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import PreviewPage from './pages/PreviewPage';
import PublicPage from './pages/PublicPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  // Check if we're on the admin path
  const isAdminPath = location.pathname === '/admin';
  
  // If on any admin path, show the admin interface directly
  if (isAdminPath) {
    return <EditorPage />;
  }
  
  // Otherwise, show the regular public site routing
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/preview" element={<PreviewPage />} />
      <Route path="/:username" element={<PublicPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
