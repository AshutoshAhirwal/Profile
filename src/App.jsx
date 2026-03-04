import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Particles from './components/Particles';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisualMode, setIsVisualMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];

  const transitionTo = useCallback((index) => {
    if (index < 0 || index >= sections.length || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning, sections.length]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 50) return;
      if (e.deltaY > 0) transitionTo(currentIndex + 1);
      else transitionTo(currentIndex - 1);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') transitionTo(currentIndex + 1);
      if (e.key === 'ArrowUp') transitionTo(currentIndex - 1);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, transitionTo]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      document.querySelectorAll('.parallax-text').forEach(text => {
        text.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMode = () => {
    setIsVisualMode(!isVisualMode);
    document.body.classList.toggle('structure-mode');
    
    // Glitch effect
    document.body.style.filter = 'invert(1) contrast(2)';
    setTimeout(() => document.body.style.filter = 'none', 150);
  };

  const getStatus = (index) => {
    if (index === currentIndex) return 'active';
    if (index < currentIndex) return 'prev';
    return 'next';
  };

  return (
    <div className="portfolio-root">
      <CustomCursor />
      <Particles />
      
      <Navbar 
        activeSection={sections[currentIndex]} 
        isVisualMode={isVisualMode}
        onToggleMode={toggleMode}
        onNavigate={transitionTo}
      />

      <main className="stage-container">
        <Hero status={getStatus(0)} />
        <About status={getStatus(1)} />
        <Experience status={getStatus(2)} />
        <Projects status={getStatus(3)} />
        <Skills status={getStatus(4)} />
        <Contact status={getStatus(5)} />
      </main>
    </div>
  );
}


export default App;
