'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accessibility, X, RefreshCw, Eye, Languages, 
  ZoomIn, Type, AlignCenter, AlignLeft, AlignRight, 
  ChevronsUpDown, ArrowLeftRight, Contrast, 
  Palette, Droplet, VolumeX, ImageOff, MousePointer, 
  Scan, Focus, View, User
} from 'lucide-react';

type AccessibilityState = {
  // Profiles
  profiles: {
    seizure: boolean;
    vision: boolean;
    adhd: boolean;
    cognitive: boolean;
    motor: boolean;
    blind: boolean;
    senior: boolean;
  };
  // Content
  scaling: number; // 0 to 5
  readableFont: boolean;
  highlightTitles: boolean;
  highlightLinks: boolean;
  textMagnifier: boolean;
  fontSize: number; // -3 to 3
  textAlign: 'left' | 'center' | 'right' | 'default';
  lineHeight: number; // 0 to 3
  letterSpacing: number; // 0 to 3
  // Colors
  contrast: 'dark' | 'light' | 'high' | 'default';
  saturation: 'high' | 'low' | 'monochrome' | 'default';
  textColor: string | null;
  titleColor: string | null;
  backgroundColor: string | null;
  // Orientation
  mute: boolean;
  hideImages: boolean;
  readMode: boolean;
  readingGuide: boolean;
  stopAnimations: boolean;
  readingMask: boolean;
  highlightHover: boolean;
  highlightFocus: boolean;
  cursor: 'black' | 'white' | 'default';
};

const initialState: AccessibilityState = {
  profiles: { seizure: false, vision: false, adhd: false, cognitive: false, motor: false, blind: false, senior: false },
  scaling: 0,
  readableFont: false,
  highlightTitles: false,
  highlightLinks: false,
  textMagnifier: false,
  fontSize: 0,
  textAlign: 'default',
  lineHeight: 0,
  letterSpacing: 0,
  contrast: 'default',
  saturation: 'default',
  textColor: null,
  titleColor: null,
  backgroundColor: null,
  mute: false,
  hideImages: false,
  readMode: false,
  readingGuide: false,
  stopAnimations: false,
  readingMask: false,
  highlightHover: false,
  highlightFocus: false,
  cursor: 'default',
};

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<AccessibilityState>(initialState);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('close-a11y-menu', handleClose);
    return () => window.removeEventListener('close-a11y-menu', handleClose);
  }, []);

  const toggleOpen = () => {
    if (!isOpen) {
      window.dispatchEvent(new CustomEvent('close-chatbot'));
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const body = document.body;
    
    // Clear existing classes
    body.className = body.className.split(' ').filter(c => !c.startsWith('acc-')).join(' ');

    // Profiles
    Object.entries(state.profiles).forEach(([key, active]) => {
      if (active) body.classList.add(`acc-${key}`);
    });

    // Simple Toggles
    if (state.readableFont) body.classList.add('acc-readable-font');
    if (state.highlightTitles) body.classList.add('acc-highlight-titles');
    if (state.highlightLinks) body.classList.add('acc-highlight-links');
    if (state.mute) body.classList.add('acc-mute');
    if (state.hideImages) body.classList.add('acc-hide-images');
    if (state.readMode) body.classList.add('acc-read-mode');
    if (state.readingGuide) body.classList.add('acc-reading-guide');
    if (state.stopAnimations) body.classList.add('acc-stop-animations');
    if (state.readingMask) body.classList.add('acc-reading-mask');
    if (state.highlightHover) body.classList.add('acc-highlight-hover');
    if (state.highlightFocus) body.classList.add('acc-highlight-focus');

    // Values
    body.setAttribute('data-acc-scaling', state.scaling.toString());
    body.setAttribute('data-acc-font-size', state.fontSize.toString());
    body.setAttribute('data-acc-text-align', state.textAlign);
    body.setAttribute('data-acc-line-height', state.lineHeight.toString());
    body.setAttribute('data-acc-letter-spacing', state.letterSpacing.toString());
    body.setAttribute('data-acc-contrast', state.contrast);
    body.setAttribute('data-acc-saturation', state.saturation);
    body.setAttribute('data-acc-cursor', state.cursor);

    // Colors
    if (state.textColor) {
      body.style.setProperty('--acc-text-color', state.textColor);
    } else {
      body.style.removeProperty('--acc-text-color');
    }

    if (state.titleColor) {
      body.style.setProperty('--acc-title-color', state.titleColor);
    } else {
      body.style.removeProperty('--acc-title-color');
    }

    if (state.backgroundColor) {
      body.style.setProperty('--acc-bg-color', state.backgroundColor);
    } else {
      body.style.removeProperty('--acc-bg-color');
    }

  }, [state]);

  const toggleProfile = (id: keyof AccessibilityState['profiles']) => {
    setState(prev => ({ ...prev, profiles: { ...prev.profiles, [id]: !prev.profiles[id] } }));
  };

  const updateState = (key: keyof AccessibilityState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const reset = () => setState(initialState);

  const colors = ["#0076B4", "#7A549C", "#C83733", "#D07021", "#26999F", "#4D7831", "#ffffff", "#000000"];

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="acc-trigger"
        onClick={toggleOpen}
      >
        <Accessibility size={24} color="var(--ink)" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="acc-overlay" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="acc-sidebar">
              <div className="acc-header">
                <div className="acc-header-top">
                  <button onClick={() => setIsOpen(false)} className="acc-close"><X size={20} /></button>
                  <div className="acc-lang"><Languages size={14} style={{ marginRight: '4px' }} /> ENGLISH (US)</div>
                </div>
                <h2 className="acc-title">Accessibility Adjustments</h2>
                <div className="acc-actions">
                  <button onClick={reset} className="acc-action-btn"><RefreshCw size={14} /> Reset Settings</button>
                  <button className="acc-action-btn"><Eye size={14} /> Statement</button>
                </div>
              </div>

              <div className="acc-content">
                {/* PROFILES */}
                <div className="acc-section">
                  <div className="acc-section-label">Accessibility Profiles</div>
                  <div className="acc-grid">
                    {Object.keys(state.profiles).map((p) => (
                      <div key={p} className={`acc-card ${state.profiles[p as keyof AccessibilityState['profiles']] ? 'active' : ''}`} onClick={() => toggleProfile(p as any)}>
                        <div className="acc-card-title">{p.charAt(0).toUpperCase() + p.slice(1)} Safe</div>
                        <div className="acc-card-desc">Profile for {p} accessibility</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CONTENT ADJUSTMENTS */}
                <div className="acc-section">
                  <div className="acc-section-label">Content Adjustments</div>
                  <div className="acc-tools">
                    <div className="acc-tool-item">
                      <div className="acc-tool-info"><ZoomIn size={16} /> <span>Content Scaling</span></div>
                      <div className="acc-tool-ctrl">
                        <button onClick={() => updateState('scaling', Math.max(0, state.scaling - 1))}>-</button>
                        <span>{state.scaling === 0 ? 'Default' : `${state.scaling * 20}%`}</span>
                        <button onClick={() => updateState('scaling', Math.min(5, state.scaling + 1))}>+</button>
                      </div>
                    </div>
                    
                    <div className="acc-tool-grid">
                      <button className={`acc-box ${state.readableFont ? 'active' : ''}`} onClick={() => updateState('readableFont', !state.readableFont)}><Type size={16} /> <span>Readable Font</span></button>
                      <button className={`acc-box ${state.highlightTitles ? 'active' : ''}`} onClick={() => updateState('highlightTitles', !state.highlightTitles)}><AlignCenter size={16} /> <span>Highlight Titles</span></button>
                      <button className={`acc-box ${state.highlightLinks ? 'active' : ''}`} onClick={() => updateState('highlightLinks', !state.highlightLinks)}><Scan size={16} /> <span>Highlight Links</span></button>
                    </div>

                    <div className="acc-tool-item">
                      <div className="acc-tool-info"><ChevronsUpDown size={16} /> <span>Line Height</span></div>
                      <div className="acc-tool-ctrl">
                        <button onClick={() => updateState('lineHeight', Math.max(0, state.lineHeight - 1))}>-</button>
                        <span>{state.lineHeight === 0 ? 'Default' : state.lineHeight}</span>
                        <button onClick={() => updateState('lineHeight', Math.min(3, state.lineHeight + 1))}>+</button>
                      </div>
                    </div>

                    <div className="acc-tool-item">
                      <div className="acc-tool-info"><ArrowLeftRight size={16} /> <span>Letter Spacing</span></div>
                      <div className="acc-tool-ctrl">
                        <button onClick={() => updateState('letterSpacing', Math.max(0, state.letterSpacing - 1))}>-</button>
                        <span>{state.letterSpacing === 0 ? 'Default' : state.letterSpacing}</span>
                        <button onClick={() => updateState('letterSpacing', Math.min(3, state.letterSpacing + 1))}>+</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLOR ADJUSTMENTS */}
                <div className="acc-section">
                  <div className="acc-section-label">Color Adjustments</div>
                  <div className="acc-tool-grid">
                    <button className={`acc-box ${state.contrast === 'dark' ? 'active' : ''}`} onClick={() => updateState('contrast', state.contrast === 'dark' ? 'default' : 'dark')}><Contrast size={16} /> <span>Dark Mode</span></button>
                    <button className={`acc-box ${state.contrast === 'high' ? 'active' : ''}`} onClick={() => updateState('contrast', state.contrast === 'high' ? 'default' : 'high')}><Contrast size={16} /> <span>High Contrast</span></button>
                    <button className={`acc-box ${state.saturation === 'monochrome' ? 'active' : ''}`} onClick={() => updateState('saturation', state.saturation === 'monochrome' ? 'default' : 'monochrome')}><Droplet size={16} /> <span>Monochrome</span></button>
                  </div>
                  <div className="acc-color-section">
                    <div className="acc-tool-label">Adjust Text color</div>
                    <div className="acc-colors">
                      {colors.map(c => <button key={c} style={{ background: c }} onClick={() => updateState('textColor', c)} className={state.textColor === c ? 'active' : ''} />)}
                      <button className="acc-color-reset" onClick={() => updateState('textColor', null)}>✕</button>
                    </div>
                  </div>
                </div>

                {/* ORIENTATION ADJUSTMENTS */}
                <div className="acc-section">
                  <div className="acc-section-label">Orientation Adjustments</div>
                  <div className="acc-tool-grid">
                    <button className={`acc-box ${state.mute ? 'active' : ''}`} onClick={() => updateState('mute', !state.mute)}><VolumeX size={16} /> <span>Mute Sounds</span></button>
                    <button className={`acc-box ${state.hideImages ? 'active' : ''}`} onClick={() => updateState('hideImages', !state.hideImages)}><ImageOff size={16} /> <span>Hide Images</span></button>
                    <button className={`acc-box ${state.readMode ? 'active' : ''}`} onClick={() => updateState('readMode', !state.readMode)}><View size={16} /> <span>Read Mode</span></button>
                    <button className={`acc-box ${state.cursor === 'black' ? 'active' : ''}`} onClick={() => updateState('cursor', state.cursor === 'black' ? 'default' : 'black')}><MousePointer size={16} /> <span>Black Cursor</span></button>
                    <button className={`acc-box ${state.cursor === 'white' ? 'active' : ''}`} onClick={() => updateState('cursor', state.cursor === 'white' ? 'default' : 'white')}><MousePointer size={16} /> <span>White Cursor</span></button>
                  </div>
                </div>
              </div>

              <div className="acc-footer">Web Accessibility Solution by Ashutosh</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .acc-trigger { position: fixed; bottom: 2rem; right: 2rem; width: 50px; height: 50px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.3); border: none; cursor: pointer; z-index: 1000; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .acc-trigger:hover { transform: scale(1.1) rotate(10deg); }
        
        .acc-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); z-index: 1001; }
        .acc-sidebar { position: fixed; top: 0; right: 0; bottom: 0; width: 100%; max-width: 420px; background: var(--ink); color: var(--cream); z-index: 10002; display: flex; flex-direction: column; overflow: hidden; border-left: 1px solid var(--dim2); box-shadow: -20px 0 50px rgba(0,0,0,0.5); }
        
        .acc-header { padding: 2rem 1.5rem; background: var(--ink); border-bottom: 1px solid var(--dim2); }
        .acc-header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .acc-close { background: var(--dim); border: 1px solid var(--dim2); color: var(--cream); cursor: pointer; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
        .acc-close:hover { background: var(--dim2); border-color: var(--gold); transform: rotate(90deg); }
        .acc-lang { font-size: 0.65rem; display: flex; align-items: center; font-weight: 700; letter-spacing: 0.1em; color: var(--gold); text-transform: uppercase; }
        .acc-title { font-family: 'Instrument Serif', serif; font-size: 2.2rem; font-weight: 400; margin-bottom: 1.5rem; color: var(--cream); line-height: 1.1; }
        
        .acc-actions { display: flex; gap: 0.75rem; }
        .acc-action-btn { flex: 1; background: var(--dim); color: var(--cream); border: 1px solid var(--dim2); padding: 0.8rem; border-radius: 8px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; transition: all 0.3s; min-height: 44px; }
        .acc-action-btn:hover { border-color: var(--gold); background: var(--dim2); color: var(--gold); }
        
        .acc-content { flex: 1; padding: 2rem; overflow-y: auto; scrollbar-width: none; }
        .acc-content::-webkit-scrollbar { display: none; }
        
        .acc-section { margin-bottom: 3rem; }
        .acc-section-label { font-weight: 800; font-size: 0.6rem; color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem; letter-spacing: 0.25em; display: flex; align-items: center; gap: 1rem; opacity: 0.8; }
        .acc-section-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, var(--dim2), transparent); }
        
        .acc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        @media (max-width: 420px) { .acc-grid { grid-template-columns: 1fr; } }
        .acc-card { background: var(--dim); padding: 1rem; border-radius: 12px; cursor: pointer; border: 1px solid var(--dim2); transition: all 0.3s; display: flex; flex-direction: column; gap: 0.4rem; min-height: 70px; justify-content: center; }
        .acc-card:hover { border-color: var(--gold-dim); background: var(--dim2); }
        .acc-card.active { border-color: var(--gold); background: rgba(197, 162, 93, 0.1); }
        .acc-card-title { font-weight: 700; font-size: 0.75rem; color: var(--gold); }
        .acc-card-desc { font-size: 0.6rem; color: rgba(245,240,232,0.5); line-height: 1.4; }
        
        .acc-tools { display: flex; flex-direction: column; gap: 0.75rem; }
        .acc-tool-item { background: var(--dim); padding: 0.75rem 1rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--dim2); min-height: 60px; }
        .acc-tool-info { display: flex; align-items: center; gap: 0.75rem; font-weight: 700; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,240,232,0.8); }
        .acc-tool-ctrl { display: flex; align-items: center; gap: 0.75rem; }
        .acc-tool-ctrl button { width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--dim2); background: var(--dim2); color: var(--cream); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; font-size: 1.2rem; }
        .acc-tool-ctrl button:hover { border-color: var(--gold); color: var(--gold); }
        .acc-tool-ctrl span { font-size: 0.7rem; font-weight: 800; min-width: 40px; text-align: center; color: var(--gold); }
        
        .acc-box { background: var(--dim); border: 1px solid var(--dim2); padding: 1.2rem 0.5rem; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; cursor: pointer; transition: all 0.3s; color: rgba(245,240,232,0.6); min-height: 80px; justify-content: center; }
        .acc-box span { font-size: 0.55rem; font-weight: 800; text-align: center; text-transform: uppercase; letter-spacing: 0.12em; }
        .acc-box:hover { border-color: var(--gold-dim); background: var(--dim2); color: var(--cream); }
        .acc-box.active { border-color: var(--gold); background: rgba(197, 162, 93, 0.1); color: var(--gold); }
        
        .acc-colors { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; background: var(--dim); padding: 1rem; border-radius: 12px; border: 1px solid var(--dim2); }
        .acc-colors button { width: 32px; height: 32px; border-radius: 6px; border: 2px solid transparent; cursor: pointer; position: relative; transition: transform 0.2s; }
        .acc-colors button:hover { transform: scale(1.1); }
        .acc-colors button.active { border-color: var(--gold); transform: scale(1.1); }
        .acc-color-reset { background: var(--dim2) !important; color: var(--cream) !important; font-size: 14px !important; display: flex; align-items: center; justify-content: center; font-weight: 800 !important; }
        
        .acc-footer { padding: 2rem; text-align: center; font-size: 0.55rem; font-weight: 700; color: rgba(245,240,232,0.3); text-transform: uppercase; letter-spacing: 0.2em; border-top: 1px solid var(--dim2); background: var(--ink); }

        @media (max-width: 480px) {
          .acc-sidebar { max-width: 100%; border-left: none; }
          .acc-header { padding: 1.5rem; }
          .acc-content { padding: 1.5rem; }
          .acc-title { font-size: 1.8rem; }
          .acc-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
