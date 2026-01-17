import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Team from './pages/Team';

const App: React.FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/' : '/';
  const assetPrefix = process.env.PUBLIC_URL || '';
  const grainStyle = { '--grain-url': `url(${assetPrefix}/noise.png)` } as React.CSSProperties;

  return (
    <Router basename={basename}>
      <div className="App has-grain" style={grainStyle}>
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <img src={`${assetPrefix}/AlexSkySignature2.png`} alt="Alexander Sky Logo" />
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
          <Route path="/work" element={<Work />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
