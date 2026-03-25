'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  company: string;
  projectType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    company: '',
    projectType: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const phoneRegex = /^[\d\s+\-()]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.projectType) newErrors.projectType = 'Please select a project type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user typing
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          company: '',
          projectType: '',
          message: '',
        });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const labelStyle: React.CSSProperties = { 
    fontSize: '0.6rem', 
    color: 'var(--gold)', 
    letterSpacing: '0.1em', 
    textTransform: 'uppercase', 
    marginBottom: '0.5rem', 
    display: 'block' 
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({ 
    width: '100%', 
    background: 'rgba(245, 240, 232, 0.03)', 
    border: `1px solid ${hasError ? '#ff4d4d' : 'rgba(245,240,232, 0.08)'}`,
    padding: '1.2rem', 
    color: 'var(--cream)', 
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    borderRadius: '4px',
  });

  const errorTextStyle: React.CSSProperties = {
    color: '#ff4d4d',
    fontSize: '0.6rem',
    marginTop: '0.3rem',
    display: 'block'
  };

  return (
    <div className="contact-form-container" style={{ maxWidth: '900px', width: '100%', marginTop: '4rem', position: 'relative', zIndex: 10 }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.5rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>Start a Conversation</h3>
        <p style={{ color: 'rgba(245,240,232, 0.4)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>Fill out the form below and I'll get back to you within 24 hours.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="contact-grid" style={{ background: 'rgba(10,10,11, 0.4)', padding: '3.5rem', border: '1px solid var(--dim2)', backdropFilter: 'blur(20px)', borderRadius: '8px' }}>
        <div className="grid-item">
          <label style={labelStyle}>Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            style={inputStyle(!!errors.name)} 
          />
          {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
        </div>
        
        <div className="grid-item">
          <label style={labelStyle}>Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            style={inputStyle(!!errors.email)} 
          />
          {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
        </div>

        <div className="grid-item">
          <label style={labelStyle}>Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 00000 00000"
            style={inputStyle(!!errors.phone)} 
          />
          {errors.phone && <span style={errorTextStyle}>{errors.phone}</span>}
        </div>

        <div className="grid-item">
          <label style={labelStyle}>Company (Optional)</label>
          <input 
            type="text" 
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Specbee / Dotsquares"
            style={inputStyle(false)} 
          />
        </div>

        <div className="grid-full">
          <label style={labelStyle}>Project Type</label>
          <select 
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            style={{ ...inputStyle(!!errors.projectType), appearance: 'none' }}
          >
            <option value="" disabled>Select a service...</option>
            <option value="drupal-dev">Drupal Development</option>
            <option value="drupal-migration">Drupal Site</option>
            <option value="frontend-architecture">Drupal Frontend Architecture</option>
            <option value="consultation">Technical Consultation</option>
            <option value="other">Other</option>
          </select>
          {errors.projectType && <span style={errorTextStyle}>{errors.projectType}</span>}
        </div>

        <div className="grid-full">
          <label style={labelStyle}>Message</label>
          <textarea 
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            style={{ ...inputStyle(!!errors.message), resize: 'none' }} 
          ></textarea>
          {errors.message && <span style={errorTextStyle}>{errors.message}</span>}
        </div>

        <div className="grid-full">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="btn-submit"
          >
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message →'}
          </button>
          {status === 'error' && <span style={{ ...errorTextStyle, textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem' }}>Failed to send message. Please try again.</span>}
        </div>
      </form>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .grid-item { grid-column: span 1; }
        .grid-full { grid-column: span 2; }
        
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .grid-item, .grid-full { grid-column: span 1; }
          .contact-form-container form { padding: 2rem !important; }
        }

        .contact-grid input:focus, .contact-grid textarea:focus, .contact-grid select:focus {
          border-color: var(--gold) !important;
          background: rgba(197, 162, 93, 0.05) !important;
          box-shadow: 0 0 20px rgba(197, 162, 93, 0.1);
        }
        .btn-submit {
          background: var(--gold) !important;
          color: var(--ink) !important;
          padding: 1.4rem !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.3em !important;
          border: none !important;
          cursor: pointer !important;
          transition: all 0.4s !important;
          margin-top: 1rem !important;
          width: 100% !important;
          font-size: 0.7rem !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        .btn-submit:hover {
          background: #E5C27D !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 10px 30px rgba(197, 162, 93, 0.3) !important;
        }
        .btn-submit:disabled { opacity: 0.6 !important; cursor: not-allowed !important; }
      `}</style>
    </div>
  );
}
