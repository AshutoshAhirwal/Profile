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
          <div className="bento-item large">
            <h4>Open Source</h4>
            <p style={{ color: 'var(--text-muted)' }}>Contributor to Drupal Core patches and maintainer of several community modules. 105+ credits evidence on Drupal.org.</p>
          </div>
          <div className="bento-item">
            <a href="https://www.drupal.org/u/ashutosh-ahirwal" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.7rem', width: '100%', textAlign: 'center' }}>VIEW DRUPAL.ORG</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
