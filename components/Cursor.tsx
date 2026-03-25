'use client';

import { useEffect, useState } from 'react';

export default function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    };

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const animateRing = () => {
      setRingPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(animateRing);
    };
    const animationFrame = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  return (
    <>
      <div 
        id="cursor" 
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }} 
      />
      <div 
        id="cursor-ring" 
        style={{ 
          left: `${ringPos.x}px`, 
          top: `${ringPos.y}px` 
        }} 
      />
      <div id="progress" style={{ width: `${progress}%` }} />
      <div className="noise-overlay" />
      
      {/* Accessibility Helpers */}
      <div className="acc-reading-guide-bar" style={{ top: `${mousePos.y}px` }} />
      <div className="acc-reading-mask-overlay" />
    </>
  );
}
