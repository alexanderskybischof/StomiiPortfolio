import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));
const Team = lazy(() => import('./pages/Team'));

const App: React.FC = () => {
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

  return (
    <Router basename={basename}>
      <div className="App has-grain" style={grainStyle}>
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <img src={`${assetPrefix}/AlexSkySignature2.png`} alt="Alexander Sky Logo" decoding="async" />
            </Link>
          </div>
          <div className="nav-right">
            <Link to="/work" className="nav-link">
              WORK
            </Link>
            <Link to="/team" className="nav-link">
              TEAM
            </Link>
            <Link to="/contact" className="nav-link">
              CONTACT
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/work"
            element={
              <Suspense fallback={<div className="page">Loading work…</div>}>
                <Work />
              </Suspense>
            }
          />
          <Route
            path="/team"
            element={
              <Suspense fallback={<div className="page">Loading team…</div>}>
                <Team />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div className="page">Loading contact…</div>}>
                <Contact />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
