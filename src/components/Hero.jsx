import React from 'react';
import Terminal from './Terminal';

const Hero = ({ status, onNavigate, isMobile }) => {
  return (
    <section className={`section-layer hero ${status}`} id="home">
      <div className="parallax-text">ARCHITECTURE</div>
      <div className="hero-glow"></div>
      <div className="container">
        <div className="hero-content">
          <span className="badge animate-fade-up">SENIOR DRUPAL ENGINEER</span>
          <h1 className="hero-title animate-fade-up delay-100">Thinking Outside <span>The Drupal Box.</span></h1>
          <p className="hero-description animate-fade-up delay-200">Senior Frontend Architect with 5.1+ years specializing in complex, scalable Drupal ecosystems.</p>
          
          <div className="hero-btns animate-fade-up delay-300">
            <a 
              href="#projects" 
              className="btn btn-primary" 
              id="btn-work"
              onClick={(e) => {
                if (!isMobile) {
                  e.preventDefault();
                  onNavigate();
                }
              }}
            >
              ENTER BLUEPRINT
            </a>
          </div>
          
          <div className="animate-pop-in delay-400">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
