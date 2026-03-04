import React from 'react';

const Experience = ({ status }) => {
  const experiences = [
    {
      date: 'Sep 2025 - PRESENT',
      company: 'Dotsquares India',
      role: 'Programmer Analyst',
      desc: 'Front-end and site-building across Drupal 10/11 projects; custom theming and component-based SDC development.'
    },
    {
      date: 'Sep 2022 - Sep 2025',
      company: 'Specbee Consulting',
      role: 'Senior Drupal Frontend Developer',
      desc: 'Lead the development of various Drupal 9/10 projects with focus on Storybook and Pattern Lab.'
    },
    {
      date: 'Jan 2021 - Sep 2022',
      company: 'Smashing Infolabs',
      role: 'Drupal Developer',
      desc: 'Responsible for theme development, backend module building, and content architecture.'
    }
  ];

  return (
    <section className={`section-layer ${status}`} id="experience">
      <div className="parallax-text">CAREER</div>
      <div className="container">
        <h2 className="section-title">Architectural Timeline</h2>
        <div className="experience-list" style={{ maxWidth: '100%' }}>
          {experiences.map((exp, i) => (
            <div key={i} className="exp-item">
              <div className="exp-date">{exp.date}</div>
              <div className="exp-company">{exp.company}</div>
              <div className="exp-role">{exp.role}</div>
              <p style={{ color: 'var(--text-muted)' }}>{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
