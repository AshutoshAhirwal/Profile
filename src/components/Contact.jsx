import React from 'react';

const Contact = ({ status }) => {
  return (
    <section className={`section-layer ${status}`} id="contact">
      <div className="parallax-text">CONNECT</div>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Initiate Transmission</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px' }}>
          Ready to help MNCs and innovative startups build the next generation of Drupal enterprise solutions.
        </p>
        
        <div className="social-links" style={{ justifyContent: 'center', transform: 'scale(1.5)' }}>
          <a href="https://www.linkedin.com/in/ashutosh-ahirwal-546859184/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://www.drupal.org/u/ashutosh-ahirwal" target="_blank" rel="noreferrer"><i className="fab fa-drupal"></i></a>
          <a href="mailto:ashutosh15798@gmail.com"><i className="fas fa-envelope"></i></a>
        </div>
        
        <div style={{ marginTop: '80px', fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
          AUTH: ASHUTOSH_AHIRWAL // VER: 2026.03.01 // STATUS: AVAILABLE_FOR_HIRE
        </div>
      </div>
    </section>
  );
};

export default Contact;
