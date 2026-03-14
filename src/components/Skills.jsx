import React from 'react';

const Skills = ({ status }) => {
  return (
    <section className={`section-layer ${status}`} id="skills">
      <div className="parallax-text">STACK</div>
      <div className="container">
        <h2 className="section-title animate-fade-right">Technical Matrix</h2>
        <div className="skills-wrapper">
          <div className="skill-category animate-fade-up delay-100">
            <h4>Modern Frontend</h4>
            <SkillItem name="Twig / SASS / SDC" progress="95%" />
            <SkillItem name="Tailwind / Bootstrap" progress="92%" />
            <SkillItem name="Storybook / Pattern Lab" progress="88%" />
          </div>
          <div className="skill-category animate-fade-up delay-300">
            <h4>Drupal Core</h4>
            <SkillItem name="Site Building / Config" progress="98%" />
            <SkillItem name="Layout Builder / Views" progress="96%" />
            <SkillItem name="Drush / Composer" progress="94%" />
          </div>
        </div>
        
        <div className="blog-preview-grid">
           <a href="https://www.specbee.com/blogs/writing-smarter-drupal-code-starts-with-package-json" target="_blank" rel="noreferrer" className="bento-item animate-pop-in delay-500">Writing Smarter Drupal Code</a>
           <a href="https://www.specbee.com/blogs/starterkit-theme-in-drupal-10" target="_blank" rel="noreferrer" className="bento-item animate-pop-in delay-600">Drupal 10 Starterkit Theme</a>
        </div>
      </div>
    </section>
  );
};

const SkillItem = ({ name, progress }) => (
  <div className="skill-item">
    <span className="skill-name">{name}</span>
    <div className="skill-bar">
      <div className="skill-progress" style={{ width: progress }}></div>
    </div>
  </div>
);

export default Skills;
