import React from 'react';

const Projects = ({ status }) => {
  return (
    <section className={`section-layer ${status}`} id="projects">
      <div className="parallax-text">BUILDS</div>
      <div className="container">
        <h2 className="section-title">Critical Infrastructure</h2>
        <div className="bento-grid" style={{ gridTemplateRows: 'auto' }}>
          <div className="bento-item wide">
            <h4 style={{ color: 'var(--accent-primary)' }}>Zayed University</h4>
            <p style={{ color: 'var(--text-muted)' }}>Drupal theming and custom module design for sharing data JSON for modern frontend consumption.</p>
          </div>
          <div className="bento-item">
            <h4 style={{ color: 'var(--accent-primary)' }}>Apollo Hospitals</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Drupal 9, SDC, Twig, Layout Builder ecosystem.</p>
          </div>
          <div className="bento-item">
             <h4 style={{ color: 'var(--accent-primary)' }}>Nerivio</h4>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Drupal 9 + Tailwind CSS implementation.</p>
          </div>
          
          <div className="bento-item large" style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
            <h4>Open Source</h4>
            <p style={{ color: 'var(--text-muted)' }}>Contributor to Drupal Core patches and maintainer of several community modules. 105+ credits evidence on Drupal.org.</p>
            <div>
              <a href="https://www.drupal.org/u/ashutosh-ahirwal" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>VIEW DRUPAL.ORG</a>
            </div>
            <div className="hero-glow" style={{ bottom: '-20%', right: '-20%', opacity: 0.1 }}></div>
          </div>
          
          <div className="bento-item">
            <h4 style={{ color: 'var(--accent-primary)' }}>First Industrial</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Custom theming from scratch for internal site.</p>
          </div>

          <div className="bento-item">
            <h4 style={{ color: 'var(--accent-primary)' }}>Livine</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Drupal 9, Twig, Layout Builder.</p>
          </div>

          <div className="bento-item">
            <h4 style={{ color: 'var(--accent-primary)' }}>Heritage Foundation</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Drupal 9, Paragraphs, Views.</p>
          </div>
          
          <div className="bento-item">
            <h4 style={{ color: 'var(--accent-primary)' }}>Ubicquia</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Drupal 8, Full Custom Redesign.</p>
          </div>

          <div className="bento-item wide">
            <h4 style={{ color: 'var(--accent-primary)' }}>Great Southern Homes</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Drupal 8, Elastic Search, Custom theme architecture.</p>
          </div>
          
          <div className="bento-item">
             <h4 style={{ color: 'var(--accent-primary)' }}>EDB</h4>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Drupal 8, Webform, Views integrations.</p>
          </div>
          <div className="bento-item">
             <h4 style={{ color: 'var(--accent-primary)' }}>Barbeque Nation</h4>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Drupal 8 core implementations.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
