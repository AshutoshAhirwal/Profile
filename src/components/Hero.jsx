import React from 'react';
import Terminal from './Terminal';

const Hero = ({ status }) => {
  return (
    <section className={`section-layer hero ${status}`} id="home">
      <div className="parallax-text">ARCHITECTURE</div>
      <div className="hero-glow"></div>
      <div className="container">
        <div className="hero-content">
          <span className="badge">SENIOR DRUPAL ENGINEER</span>
          <h1 className="hero-title">Thinking Outside <span>The Drupal Box.</span></h1>
          <p className="hero-description">Senior Frontend Architect with 5.1+ years specializing in complex, scalable Drupal ecosystems.</p>
          
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary" id="btn-work">ENTER BLUEPRINT</a>
          </div>
          
          <Terminal />
        </div>
      </div>
    </section>
  );
};

export default Hero;
