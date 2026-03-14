import React from 'react';
import './design-gallery.css';

const concepts = [
  {
    id: 'concept-1',
    eyebrow: 'Concept 01',
    name: 'Consultant Clean',
    tone: 'Inspired by service-led personal sites with trust signals',
    description:
      'A polished consultant-style portfolio with clear positioning, a trust strip, and structured service-proof blocks.',
    palette: ['#fbf7ef', '#121826', '#1f5eff'],
    heroLabel: 'Drupal Frontend Developer',
    heroTitle: 'Helping product teams ship scalable Drupal experiences.',
    heroCopy:
      'A cleaner, higher-trust version of your portfolio focused on delivery, accessibility, and enterprise execution.',
    ctaPrimary: 'Book a Call',
    ctaSecondary: 'View Work',
    strip: ['Specbee', 'Dotsquares', 'Drupal.org'],
    highlights: [
      '5+ years in Drupal delivery',
      '105+ contribution credits',
      'Frontend systems and accessibility',
    ],
    projects: [
      'Enterprise healthcare redesign',
      'University component library',
      'Drupal open source credibility',
    ],
  },
  {
    id: 'concept-2',
    eyebrow: 'Concept 02',
    name: 'Editorial Portfolio',
    tone: 'Inspired by designer portfolios with softer composition',
    description:
      'A more visual layout with large typography, curved sections, and featured project storytelling.',
    palette: ['#f3e8d9', '#2f241f', '#d97706'],
    heroLabel: 'Portfolio 2026',
    heroTitle: 'A warmer, more visual personal brand without losing professionalism.',
    heroCopy:
      'This direction feels fresher and more premium for clients while still staying strong for hiring teams.',
    ctaPrimary: 'See Case Studies',
    ctaSecondary: 'About Me',
    strip: ['Case Study', 'Selected Work', 'Visual Identity'],
    highlights: [
      'Bigger project storytelling',
      'Stronger art direction',
      'Premium but approachable',
    ],
    projects: [
      'Hero-led project showcase',
      'Editorial about section',
      'Visual proof over tech lists',
    ],
  },
  {
    id: 'concept-3',
    eyebrow: 'Concept 03',
    name: 'Modern Technical',
    tone: 'Inspired by current dark-mode product portfolios',
    description:
      'A refined dark concept with cleaner hierarchy, glass surfaces, and stronger product-style framing.',
    palette: ['#07111b', '#dbe7f3', '#22c7f2'],
    heroLabel: 'Systems-driven frontend',
    heroTitle: 'Technical enough to feel unique, clean enough to feel current.',
    heroCopy:
      'This keeps your engineering personality while removing the older portfolio cues that made the first version feel dated.',
    ctaPrimary: 'Explore Work',
    ctaSecondary: 'Resume',
    strip: ['SDC', 'Twig', 'Performance'],
    highlights: [
      'Product UI aesthetic',
      'Sharper motion language',
      'Better for a dev audience',
    ],
    projects: [
      'Metrics-driven hero',
      'Signal-first experience blocks',
      'Open source profile feature',
    ],
  },
];

function DesignGallery() {
  return (
    <main className="design-gallery">
      <section className="gallery-hero">
        <p className="gallery-kicker">Updated Visual Directions</p>
        <h1>These concepts are closer to the newer portfolio style you referenced.</h1>
        <p className="gallery-intro">
          I rebuilt the previews around the patterns from your references: cleaner hierarchy,
          stronger trust, better whitespace, softer shapes, and more modern section rhythm.
        </p>
      </section>

      <section className="concept-grid">
        {concepts.map((concept) => (
          <article key={concept.id} className="concept-card">
            <div className="concept-header">
              <div>
                <p className="concept-eyebrow">{concept.eyebrow}</p>
                <h2>{concept.name}</h2>
              </div>
              <div className="palette-row" aria-label={`${concept.name} palette`}>
                {concept.palette.map((color) => (
                  <span key={color} style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            <p className="concept-description">{concept.description}</p>

            <div className={`concept-preview ${concept.id}`}>
              <header className="preview-nav">
                <strong>Ashutosh</strong>
                <nav>
                  <span>About</span>
                  <span>Work</span>
                  <span>Experience</span>
                </nav>
                <button type="button">Contact</button>
              </header>

              <section className="preview-hero">
                <p className="hero-label">{concept.heroLabel}</p>
                <h3>{concept.heroTitle}</h3>
                <p>{concept.heroCopy}</p>
                <div className="hero-actions">
                  <button type="button">{concept.ctaPrimary}</button>
                  <button type="button" className="ghost">
                    {concept.ctaSecondary}
                  </button>
                </div>
              </section>

              <section className="preview-strip">
                {concept.strip.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </section>

              <section className="preview-layout">
                <div className="feature-panel large">
                  <p className="panel-kicker">Featured Work</p>
                  <strong>Selected Drupal builds with stronger case-study framing</strong>
                  <div className="panel-art" />
                </div>

                <div className="mini-stack">
                  {concept.highlights.map((item) => (
                    <div key={item} className="feature-panel small">
                      <p className="panel-kicker">Signal</p>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
              </section>

              <section className="preview-footer">
                {concept.projects.map((item) => (
                  <div key={item} className="footer-chip">
                    <span>{item}</span>
                  </div>
                ))}
              </section>
            </div>

            <p className="concept-caption">
              <strong>Best for:</strong> {concept.tone}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default DesignGallery;
