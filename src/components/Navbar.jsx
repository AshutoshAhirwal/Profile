import React, { useState } from 'react';

const Navbar = ({ activeSection, onToggleMode, isVisualMode, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: 'ARCHITECT', id: 'home' },
    { name: 'CORE', id: 'about' },
    { name: 'PATH', id: 'experience' },
    { name: 'BUILDS', id: 'projects' },
    { name: 'STACK', id: 'skills' },
    { name: 'CONNECT', id: 'contact' },
  ];

  return (
    <nav>
      <div className="container nav-container">
        <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#paint0_linear)"/>
             <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <defs>
               <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                 <stop stopColor="#3B82F6" />
                 <stop offset="1" stopColor="#8B5CF6" />
               </linearGradient>
             </defs>
          </svg>
          ASHUTOSH AHIRWAL
        </a>
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          {links.map((link, index) => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`} 
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(index);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className={`nav-actions ${isMobileMenuOpen ? 'mobile-active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            id="view-toggle" 
            className="btn-toggle"
            onClick={onToggleMode}
          >
            VIEW: {isVisualMode ? 'VISUAL' : 'STRUCTURE'}
          </button>
          <a 
            href="/Ashutosh-Ahirwal-Resume.pdf" 
            download
            className="btn btn-secondary" 
            style={{ padding: '10px 20px', fontSize: '0.85rem', marginLeft: '0px' }}
          >
            RESUME
          </a>
          <a 
            href="mailto:ashutosh15798@gmail.com" 
            className="btn btn-primary" 
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            HIRE ME
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
