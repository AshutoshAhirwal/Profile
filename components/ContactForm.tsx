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
    background: 'var(--dim2)', 
    border: `1px solid ${hasError ? '#ff4d4d' : 'rgba(245,240,232,.1)'}`, 
    padding: '0.8rem', 
    color: 'var(--cream)', 
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
    outline: 'none',
  });

  const errorTextStyle: React.CSSProperties = {
    color: '#ff4d4d',
    fontSize: '0.6rem',
    marginTop: '0.3rem',
    display: 'block'
  };

  return (
    <div className="contact-form-container" style={{ maxWidth: '800px', width: '100%', marginTop: '3rem', position: 'relative', zIndex: 10 }}>
      <form onSubmit={handleSubmit} className="contact-grid">
        <div className="grid-item">
          <label style={labelStyle}>Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            <option value="drupal-migration">Drupal Migration</option>
            <option value="frontend-architecture">Frontend Architecture</option>
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
            style={{ ...inputStyle(!!errors.message), resize: 'none' }} 
          ></textarea>
          {errors.message && <span style={errorTextStyle}>{errors.message}</span>}
        </div>

        <div className="grid-full">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
          >
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message →'}
          </button>
          {status === 'error' && <span style={{ ...errorTextStyle, textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem' }}>Failed to send message. Please try again.</span>}
        </div>
      </form>
    </div>
  );
}
