'use client';

import { portfolioData as d } from "@/lib/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const getTransition = (delay = 0) => ({
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as any,
    delay
  });

  return (
    <main>
      {/* NAV */}
      <nav>
        <a href="#hero" className="nav-logo">{d.header.logo}</a>
        <ul className="nav-links">
          {d.header.navLinks.map((link, i) => (
            <li key={i}><a href={link.href}>{link.name}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <motion.p {...fadeUp} transition={getTransition(0.3)} className="hero-eyebrow">{d.hero.eyebrow}</motion.p>
        <motion.h1 {...fadeUp} transition={getTransition(0.5)} className="hero-name">
          {d.hero.firstName}<br />
          <span className="line2">{d.hero.lastName}</span>
        </motion.h1>
        <motion.p {...fadeUp} transition={getTransition(0.7)} className="hero-title">
          Senior <span>Drupal</span> Frontend Developer —
          <em> {d.hero.subtitle}</em>
        </motion.p>
        <motion.div {...fadeUp} transition={getTransition(0.9)} className="hero-cta">
          <a href={d.hero.ctaPrimary.href} className="btn-primary">{d.hero.ctaPrimary.text}</a>
          <a href={d.hero.ctaSecondary.href} className="btn-outline">{d.hero.ctaSecondary.text}</a>
        </motion.div>
        <motion.div {...fadeUp} transition={getTransition(1.2)} className="hero-badges">
          {d.hero.badges.map((badge, i) => (
            <div key={i} className="hero-badge">{badge}</div>
          ))}
        </motion.div>
        <motion.div {...fadeUp} transition={getTransition(1.4)} className="hero-scroll-hint">
          <div className="scroll-line"></div>
          Scroll to explore
        </motion.div>
      </section>

      {/* NUMBERS BAND */}
      <div id="numbers-band">
        {d.statsBand.map((item, i) => (
          <motion.div key={i} {...fadeUp} transition={getTransition(i * 0.1)} className="band-item">
            <div className="band-num">{item.num}</div>
            <div className="band-label">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="about-text">
          <motion.div {...fadeUp} transition={getTransition()} className="section-label">{d.about.label}</motion.div>
          <motion.h2 {...fadeUp} transition={getTransition(0.1)} className="section-heading">
            {d.about.heading.split('\n')[0]}<br />
            <em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "rgba(245,240,232,.5)" }}>
              {d.about.heading.split('\n')[1]}
            </em>
          </motion.h2>
          <motion.div {...fadeUp} transition={getTransition(0.2)}>
            {d.about.description.map((desc, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </motion.div>
          <div className="about-stats">
            {d.about.stats.map((stat, i) => (
              <motion.div key={i} {...fadeUp} transition={getTransition(0.3 + i * 0.1)} className="stat-card">
                <div className="stat-num">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div {...fadeUp} transition={getTransition(0.2)} className="about-visual">
          <div className="orbit-ring"><div className="orbit-dot"></div></div>
          <div className="orbit-ring"></div>
          <div className="avatar-frame">
            <img 
              src="/images/ashutosh.jpg" 
              alt="Ashutosh Ahirwal" 
              className="avatar-img"
            />
            <div className="avatar-overlay"></div>
            <div className="avatar-corner tl"></div>
            <div className="avatar-corner tr"></div>
            <div className="avatar-corner bl"></div>
            <div className="avatar-corner br"></div>
          </div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <motion.div {...fadeUp} transition={getTransition()} className="section-label">{d.skills.label}</motion.div>
        <motion.h2 {...fadeUp} transition={getTransition(0.1)} className="section-heading">{d.skills.heading}</motion.h2>
        <div className="skills-grid">
          {d.skills.categories.map((cat, i) => (
            <motion.div key={i} {...fadeUp} transition={getTransition(0.1 * i)} className="skill-group">
              <span className="skill-group-icon">{cat.icon}</span>
              <div className="skill-group-title">{cat.title}</div>
              <div className="skill-tags">
                {cat.tags.map((tag, j) => (
                  <span key={j} className={`skill-tag ${tag.gold ? 'gold' : ''}`}>{tag.name}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <motion.div {...fadeUp} transition={getTransition()} className="section-label">{d.experience.label}</motion.div>
        <motion.h2 {...fadeUp} transition={getTransition(0.1)} className="section-heading">{d.experience.heading}</motion.h2>
        <div className="exp-timeline">
          {d.experience.items.map((exp, i) => (
            <motion.div key={i} {...fadeUp} transition={getTransition()} className={`exp-item ${exp.current ? 'exp-current' : ''}`}>
              <div className="exp-date">{exp.date}</div>
              <div className="exp-content">
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company" data-location={exp.location}>{exp.company}</div>
                <div className="exp-desc">
                  <ul>
                    {exp.description.map((desc, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                </div>
                <div className="exp-tags">
                  {exp.tags.map((tag, j) => (
                    <span key={j} className="skill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <motion.div {...fadeUp} transition={getTransition()} className="section-label">{d.projects.label}</motion.div>
        <motion.h2 {...fadeUp} transition={getTransition(0.1)} className="section-heading">{d.projects.heading}</motion.h2>
        <motion.p {...fadeUp} transition={getTransition(0.2)} className="projects-intro">{d.projects.intro}</motion.p>
        
        <div className="projects-featured">
          {d.projects.featured.map((p, i) => (
            <motion.div key={i} {...fadeUp} transition={getTransition()} className="project-card featured">
              <div className="project-num">{p.num}</div>
              <div className="project-label">{p.category}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-stack">
                {p.stack.map((s, j) => (
                  <span key={j}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="projects-grid">
          {d.projects.grid.map((p, i) => (
            <motion.div key={i} {...fadeUp} transition={getTransition(0.1 * (i % 3))} className="project-card sm">
              <div className="project-label">{p.category}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-stack">
                {p.stack.map((s, j) => (
                  <span key={j}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications">
        <motion.div {...fadeUp} transition={getTransition()} className="section-label">{d.publications.label}</motion.div>
        <motion.h2 {...fadeUp} transition={getTransition(0.1)} className="section-heading">{d.publications.heading}</motion.h2>
        <div className="pub-grid">
          {d.publications.items.map((pub, i) => (
            <motion.div key={i} {...fadeUp} transition={getTransition(0.1 * i)} className="pub-card">
              <div className="pub-platform">{pub.platform}</div>
              <h3 className="pub-title">{pub.title}</h3>
              <p className="pub-desc">{pub.description}</p>
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="pub-link">Read Article</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community">
        <motion.div {...fadeUp} transition={getTransition()} className="section-label">{d.community.label}</motion.div>
        <motion.h2 {...fadeUp} transition={getTransition(0.1)} className="section-heading">{d.community.heading}</motion.h2>
        <div className="community-split">
          <motion.div {...fadeUp} transition={getTransition(0.1)}>
            <div className="credits-visual">
              <div className="credits-big">{d.community.credits}</div>
              <div className="credits-label">{d.community.creditsLabel}</div>
              <div className="credits-sub">{d.community.creditsSub}</div>
            </div>
          </motion.div>
          <div className="community-list">
            {d.community.items.map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={getTransition(0.1 * i)} className="community-item">
                <div className={`c-dot ${item.color}`}></div>
                <div>
                  <div className="ct-title">{item.title}</div>
                  <div className="ct-sub">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools">
        <motion.div {...fadeUp} transition={getTransition()} className="section-label">{d.tools.label}</motion.div>
        <motion.h2 {...fadeUp} transition={getTransition(0.1)} className="section-heading">{d.tools.heading}</motion.h2>
        <div className="tools-row">
          {d.tools.pills.map((pill, i) => (
            <motion.div 
              key={i} 
              {...fadeUp} 
              transition={getTransition(0.05 * (i % 10))} 
              className="tool-pill"
            >
              <div className="tp-dot" style={{ background: `var(--${pill.color})` }}></div>
              {pill.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <motion.div {...fadeUp} transition={getTransition()} className="section-label">{d.education.label}</motion.div>
        <motion.h2 {...fadeUp} transition={getTransition(0.1)} className="section-heading">{d.education.heading}</motion.h2>
        <div className="edu-grid">
          {d.education.items.map((edu, i) => (
            <motion.div key={i} {...fadeUp} transition={getTransition(0.1 * i)} className="edu-card">
              <div className="edu-year">{edu.year}</div>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-field">{edu.field}</div>
              <div className="edu-school">{edu.school}</div>
              <div className="edu-location">{edu.location}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <motion.div {...fadeUp} transition={getTransition()} className="section-label" style={{ justifyContent: "center" }}>{d.contact.label}</motion.div>
        <motion.div {...fadeUp} transition={getTransition(0.1)} className="contact-big">
          {d.contact.heading}
          <span className="ghost">{d.contact.ghost}</span>
        </motion.div>
        <div className="contact-info">
          <motion.a {...fadeUp} transition={getTransition(0.2)} href={`mailto:${d.contact.email}`} className="contact-email">{d.contact.email}</motion.a>
          <motion.span {...fadeUp} transition={getTransition(0.3)} className="contact-phone">{d.contact.phone}</motion.span>
        </div>
        <ContactForm />
        <div className="social-links">
          {d.contact.socialLinks.map((link, i) => (
            <motion.div key={i} {...fadeUp} transition={getTransition(0.5 + i * 0.1)} style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="social-link">{link.name}</a>
              {i < d.contact.socialLinks.length - 1 && <span style={{ color: "rgba(245,240,232,.1)" }}>—</span>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>{d.footer.copyright}</span>
        <span>{d.footer.text}</span>
        <span>{d.footer.languages}</span>
      </footer>
    </main>
  );
}
