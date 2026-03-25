"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Sparkles, Trash2, ExternalLink, ShieldCheck, Accessibility } from "lucide-react";
import { portfolioData as d } from "@/lib/data";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  links?: { name: string; href: string }[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const timer = setTimeout(() => {
        addBotMessage(`Hi! I'm ${d.hero.firstName}'s AI Assistant. I'm here to answer any questions about his ${d.statsBand[0].num} years of Drupal expertise, his portfolio projects, or even the accessibility features of this site. How can I help you today?`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string, links?: { name: string; href: string }[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Math.random().toString(36).substring(7),
        text,
        sender: "bot",
        timestamp: new Date(),
        links
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const generateResponse = (input: string) => {
    const q = input.toLowerCase();
    
    // 1. HELP / WHAT CAN YOU DO
    if (q.includes("help") || q.includes("what can you") || q.includes("can you do") || q.includes("commands") || q.includes("how to use")) {
      return {
        text: "I can help you navigate Ashutosh's portfolio! Ask me about:\n\n• His **Skills** and **Tech Stack**\n• His **Work Experience**\n• Specific **Projects** (like Apollo Hospitals)\n• His **Technical Articles**\n• **Accessibility** features\n• How to **Contact** or hire him",
        links: [{ name: "See his Resume", href: "#experience" }]
      };
    }

    // 2. ABOUT & GENERAL
    if (q.includes("who is") || q.includes("about") || q.includes("ashutosh") || q.includes("who are you") || q.includes("yourself")) {
      return {
        text: `${d.hero.firstName} is a ${d.hero.role} with over ${d.statsBand[0].num} years of experience. He is an expert in creating enterprise-grade Drupal solutions with a focus on modern frontend workflows using SDC, Twig, and React. He's currently based in ${d.hero.eyebrow.split('·')[1].trim()}.`,
        links: [{ name: "Full Bio", href: "#about" }]
      };
    }

    // 3. SKILLS & TECHNOLOGY
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("stack") || q.includes("frontend") || q.includes("react") || q.includes("twig") || q.includes("sdc") || q.includes("tailwind") || q.includes("storybook")) {
      const mainSkills = d.skills.categories.slice(0, 3).map(c => c.title).join(", ");
      return {
        text: `Ashutosh is a specialist in ${mainSkills}. He is a master of ${d.hero.badges[1]} and is one of the few developers who deeply integrates **Single Directory Components (SDC)** with **Storybook** for Drupal theming.`,
        links: [{ name: "All Skills", href: "#skills" }]
      };
    }

    // 4. EXPERIENCE & CAREER
    if (q.includes("experience") || q.includes("career") || q.includes("work history") || q.includes("job") || q.includes("company") || q.includes("where") || q.includes("past")) {
      const current = d.experience.items[0];
      return {
        text: `He is currently a ${current.role} at **${current.company}**. Over his career, he has spent significant time at **Specbee** (3 years) and **Smashing Infolabs**, delivering 15+ high-impact enterprise projects for clients across Healthcare and Finance.`,
        links: [{ name: "Experience Details", href: "#experience" }]
      };
    }

    // 5. PROJECTS (Specific & General)
    if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("apollo") || q.includes("nerivio") || q.includes("zayed") || q.includes("bmo")) {
      const featured = d.projects.featured.map(p => p.title).join(" and ");
      return {
        text: `Ashutosh has delivered mission-critical drupal sites like **${featured}**. Whether it's ${d.projects.featured[1].description.toLowerCase()} or building component-based UIs for Healthcare portals, he ensures pixel-perfection and scalability.`,
        links: [{ name: "View All Projects", href: "#projects" }]
      };
    }

    // 6. PUBLICATIONS & WRITING
    if (q.includes("blog") || q.includes("article") || q.includes("write") || q.includes("publication") || q.includes("specbee")) {
      return {
        text: "Ashutosh is an active technical writer. He's published deep-dives on the Specbee blog about Drupal 10's Starterkit theme and modern package.json workflows. He loves sharing architectural patterns with the community.",
        links: d.publications.items.map(i => ({ name: i.title.split('—')[0].trim(), href: i.link }))
      };
    }

    // 7. ACCESSIBILITY (UNIQUE!)
    if (q.includes("accessibility") || q.includes("a11y") || q.includes("wcag") || q.includes("menu") || q.includes("how do i see") || q.includes("color") || q.includes("blind") || q.includes("vision")) {
      return {
        text: "This site is built with a custom-engineered **Accessibility Engine**! You can trigger it using the blue icon next to me. It supports Content Scaling, Readable Fonts, Seizure-safe profiles, ADHD-friendly modes, and advanced contrast adjustments to meet WCAG standards.",
        links: [{ name: "Scroll Up to see Menu", href: "#hero" }]
      };
    }

    // 8. CONTACT & HIRE
    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("social") || q.includes("linkedin") || q.includes("reach") || q.includes("message")) {
      return {
        text: `Interested in working together? You can email Ashutosh at **${d.contact.email}** or call him at **${d.contact.phone.split('·')[0].trim()}**. He is currently based in Jaipur and open to new opportunities.`,
        links: d.contact.socialLinks.map(s => ({ name: s.name, href: s.href }))
      };
    }

    // 9. EDUCATION
    if (q.includes("education") || q.includes("study") || q.includes("college") || q.includes("degree") || q.includes("university") || q.includes("academic")) {
      const edu = d.education.items[0];
      return {
        text: `Ashutosh completed his **${edu.degree}** in ${edu.field} at ${edu.school} (${edu.year}). He also holds a Diploma from Shri Vaishnav Polytechnic College.`,
        links: [{ name: "Academic History", href: "#education" }]
      };
    }

    // 10. COMMUNITY & CONTRIBUTIONS
    if (q.includes("community") || q.includes("contribution") || q.includes("drupal.org") || q.includes("credits") || q.includes("open source")) {
      return {
        text: `With **${d.community.credits} credits** on Drupal.org, Ashutosh is a dedicated open-source contributor. He maintains modules, contributes to core patches, and mentors junior developers in the Drupal ecosystem.`,
        links: [{ name: "Drupal.org Profile", href: d.contact.socialLinks[1].href }]
      };
    }

    // FALLBACK
    return {
      text: "I want to be as helpful as possible! My knowledge is centered on Ashutosh's technical journey. You can ask about his **Skills**, view his **Projects**, or find out how to **Contact** him. What's on your mind?",
      links: [
        { name: "See all Skills", href: "#skills" },
        { name: "View Projects", href: "#projects" },
        { name: "Contact Ashutosh", href: "#contact" }
      ]
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    
    const response = generateResponse(inputValue);
    addBotMessage(response.text, response.links);
  };

  const clearChat = () => {
    setMessages([]);
    setIsOpen(false);
  };

  return (
    <div className="chatbot-wrapper" style={{ position: 'fixed', bottom: '2rem', right: '6.5rem', zIndex: 9999 }}>
      {/* Floating Toggle Button */}
      <motion.button
        className="chatbot-toggle"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--ink)',
          border: '1px solid var(--gold-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          position: 'relative'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} color="var(--gold)" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot size={24} color="var(--gold)" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Active Ping */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', backgroundColor: 'var(--teal)', borderRadius: '50%', border: '2px solid var(--ink)', boxShadow: '0 0 10px var(--teal)' }} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            style={{
              position: 'absolute',
              bottom: '75px',
              right: '-4.5rem',
              width: 'min(420px, 92vw)',
              height: 'min(640px, 80vh)',
              backgroundColor: 'rgba(10, 10, 11, 0.98)',
              backdropFilter: 'blur(25px)',
              border: '1px solid var(--dim2)',
              borderRadius: '28px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(0,0,0,1)',
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '1.5rem', borderBottom: '1px solid var(--dim2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(197, 162, 93, 0.1) 0%, transparent 100%)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'var(--dim)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--gold-dim)'
                }}>
                  <Sparkles size={22} color="var(--gold)" />
                </div>
                <div>
                  <h4 style={{ color: 'var(--cream)', fontSize: '1rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Portfolio AI</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <motion.div 
                      animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }} 
                      transition={{ duration: 1.5, repeat: Infinity }} 
                      style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--teal)' }} 
                    />
                    <span style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Ready to assist</span>
                  </div>
                </div>
              </div>
              <button onClick={clearChat} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,0.2)', padding: '0.5rem' }}>
                <Trash2 size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '90%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.5rem', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                    }}>
                      <div style={{ 
                        width: '24px', height: '24px', borderRadius: '50%', 
                        backgroundColor: msg.sender === 'user' ? 'var(--gold)' : 'var(--dim)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--dim2)'
                      }}>
                        {msg.sender === 'user' ? <User size={12} color="var(--ink)" /> : <Bot size={12} color="var(--gold)" />}
                      </div>
                      <span style={{ fontSize: '0.6rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800 }}>
                        {msg.sender === 'user' ? 'Visitor' : 'Assistant'}
                      </span>
                    </div>
                    <div style={{ 
                      padding: '1.2rem 1.4rem', 
                      borderRadius: msg.sender === 'user' ? '22px 4px 22px 22px' : '4px 22px 22px 22px',
                      backgroundColor: msg.sender === 'user' ? 'var(--gold)' : 'rgba(245,240,238,0.03)',
                      color: msg.sender === 'user' ? 'var(--ink)' : 'var(--cream)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      border: msg.sender === 'user' ? 'none' : '1px solid var(--dim2)',
                      boxShadow: msg.sender === 'user' ? '0 12px 30px rgba(197, 162, 93, 0.25)' : 'none',
                      whiteSpace: 'pre-line'
                    }}>
                      {msg.text}
                      
                      {msg.links && msg.links.length > 0 && (
                        <div style={{ marginTop: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
                          {msg.links.map((link, idx) => (
                            <a 
                              key={idx} 
                              href={link.href} 
                              target={link.href.startsWith('#') ? '_self' : '_blank'}
                              style={{ 
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', padding: '0.5rem 1rem',
                                backgroundColor: msg.sender === 'user' ? 'rgba(0,0,0,0.1)' : 'rgba(197, 162, 93, 0.08)',
                                border: `1px solid ${msg.sender === 'user' ? 'rgba(0,0,0,0.15)' : 'var(--gold-dim)'}`,
                                borderRadius: '100px', textDecoration: 'none', color: msg.sender === 'user' ? 'var(--ink)' : 'var(--gold)',
                                fontWeight: 600, transition: 'all 0.3s'
                              }}
                            >
                              {link.name}
                              <ExternalLink size={11} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.5rem', padding: '1rem', backgroundColor: 'rgba(245,240,238,0.02)', borderRadius: '4px 22px 22px 22px', border: '1px solid var(--dim2)' }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }} style={{ width: '5px', height: '5px', background: 'var(--gold)', borderRadius: '50%' }} />
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--dim2)', backgroundColor: 'rgba(10,10,11,0.7)' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  style={{ 
                    width: '100%', padding: '1.2rem 4rem 1.2rem 1.7rem', backgroundColor: 'rgba(245,240,238,0.02)', 
                    border: '1px solid var(--dim2)', borderRadius: '100px', color: 'var(--cream)', fontSize: '0.95rem', outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-dim)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(197, 162, 93, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--dim2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <motion.button 
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={handleSend}
                  style={{ 
                    position: 'absolute', right: '10px', width: '44px', height: '44px', borderRadius: '50%', 
                    backgroundColor: 'var(--gold)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(197, 162, 93, 0.3)'
                  }}
                >
                  <Send size={20} color="var(--ink)" />
                </motion.button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem', padding: '0 0.8rem' }}>
                <p style={{ fontSize: '9px', opacity: 0.25, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream)', fontWeight: 800 }}>
                  Ashutosh Ahirwal — v2.0
                </p>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <Accessibility size={12} color="var(--gold-dim)" />
                  <ShieldCheck size={12} color="var(--gold-dim)" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
