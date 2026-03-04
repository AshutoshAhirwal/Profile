import React from 'react';

const Navbar = ({ activeSection, onToggleMode, isVisualMode, onNavigate }) => {
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
        <a href="#" className="logo">ASHUTOSH</a>
        <ul className="nav-links">
          {links.map((link, index) => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`} 
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(index);
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-24" style={{ gap: '16px' }}>
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
