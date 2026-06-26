import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Team from './pages/Team';
import ProjectDetail from './pages/ProjectDetail';
import { LanguageProvider, useLanguage } from './i18n';

const AppShell: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const pathFromPublicUrl = (() => {
    try {
      return new URL(publicUrl).pathname.replace(/\/$/, '');
    } catch {
      return publicUrl.replace(/\/$/, '');
    }
  })();
  const basename = pathFromPublicUrl || '/';
  const assetPrefix = publicUrl || '';
  const grainStyle = { '--grain-url': `url(${assetPrefix}/noise.png)` } as React.CSSProperties;
  const { language, toggleLanguage } = useLanguage();

  return (
    <Router basename={basename}>
      <div className="App has-grain" style={grainStyle}>
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <img src={`${assetPrefix}/AlexSkySignature2.png`} alt="Stomii Studios" draggable={false} />
            </Link>
          </div>
          <div className="nav-right">
            <Link to="/work" className="nav-link">
              {language === 'ja' ? '作品' : 'WORK'}
            </Link>
            <Link to="/team" className="nav-link">
              {language === 'ja' ? 'チーム' : 'TEAM'}
            </Link>
            <Link to="/contact" className="nav-link">
              {language === 'ja' ? '連絡先' : 'CONTACT'}
            </Link>
            <button type="button" className="nav-language-toggle" onClick={toggleLanguage}>
              {language === 'ja' ? 'EN' : 'JP'}
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:projectSlug" element={<ProjectDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppShell />
  </LanguageProvider>
);

export default App;
