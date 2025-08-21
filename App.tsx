
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import PreviewPage from './pages/PreviewPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
