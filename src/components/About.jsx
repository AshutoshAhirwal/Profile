import React from 'react';

const About = ({ status }) => {
  return (
    <section className={`section-layer ${status}`} id="about">
      <div className="parallax-text">PROFILE</div>
      <div className="container">
        <div className="bento-grid">
          <div className="bento-item large">
            <h2 className="section-title">Senior Strategy</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              Specialized in crafting scalable, accessible, and high-performance user interfaces using Twig, SDC, and Layout Builder. 
              Proactive Drupal contributor with 105+ credits.
            </p>
            <div className="hero-glow" style={{ bottom: '-20%', right: '-20%', opacity: 0.1 }}></div>
          </div>
          <div className="bento-item">
            <h4 style={{ color: 'var(--accent-primary)' }}>105+</h4>
            <p>Drupal.org Credits</p>
          </div>
          <div className="bento-item">
            <h4 style={{ color: 'var(--accent-primary)' }}>5.1Y</h4>
            <p>Experience</p>
          </div>
          <div className="bento-item wide">
            <h4>MNC Ready</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Proven track record of mentoring junior developers and delivering SEO-compliant, enterprise-grade solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
