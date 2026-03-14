import React from 'react';

const About = ({ status }) => {
  return (
    <section className={`section-layer ${status}`} id="about">
      <div className="parallax-text">PROFILE</div>
      <div className="container">
        <div className="bento-grid">
          <div className="bento-item large" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="section-title" style={{ marginBottom: '0' }}>Senior Strategy</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
              Specialized in crafting scalable, accessible, and high-performance user interfaces using Twig, SDC, and Layout Builder. 
              Proactive Drupal contributor with 105+ credits.
            </p>
            
            <div>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Critical Infrastructure</h4>
              <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.6' }}>
                Architecting headless decoupling layers, modernizing build tools (Vite/Webpack), and building robust component-driven foundations that scale effortlessly.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Performance Metrics</h4>
              <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.6' }}>
                Obsessive about Core Web Vitals, accessibility standards (WCAG 2.1 AA), semantic markup, and optimizing frontend payload delivery.
              </p>
            </div>

            <div className="hero-glow" style={{ bottom: '-20%', right: '-20%', opacity: 0.1 }}></div>
          </div>

          <div className="bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', marginBottom: '8px' }}>105+</h4>
            <p style={{ color: 'var(--text-muted)' }}>Drupal.org Credits</p>
          </div>

          <div className="bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', marginBottom: '8px' }}>5.1Y</h4>
            <p style={{ color: 'var(--text-muted)' }}>Experience</p>
          </div>

          <div className="bento-item wide" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>MNC Ready</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Proven track record of mentoring junior developers, establishing strict frontend workflows, and delivering SEO-compliant, enterprise-grade solutions for distributed teams. I bridge the gap between complex backend constraints and flawless user interfaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
