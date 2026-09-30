import React, { useState } from 'react';
import { ArrowRight, Sparkles, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MidPageCta.css';

export default function MidPageCta() {
  const [url, setUrl] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot) {
      console.warn('[Bot Detector] Honeypot triggered.');
      return;
    }
    const trimmed = url.trim();
    if (trimmed) {
      navigate(`/audit?bookingUrl=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/audit');
    }
  };

  return (
    <section className="mid-page-cta-section" id="mid-cta">
      <div className="container">
        <div className="mid-cta-card animate-fade-up">
          <div className="cta-glow-backdrop"></div>
          
          <div className="cta-badge">
            <Sparkles size={14} className="text-gold" />
            <span>60-SECOND VIBE SIGNATURE PREVIEW</span>
          </div>

          <h2 className="cta-headline">
            Don't let a bad photo order cost you <span className="cta-headline-red">15% in listing conversion</span>
          </h2>

          <p className="cta-body">
            Map your property's Vibe Signature against local neighborhood dynamics to unlock content that makes your listing stand out across every channel
          </p>

          <form onSubmit={handleSubmit} className="mid-cta-form">
            {/* Hidden Honeypot Field for Bot Defense */}
            <input 
              type="text" 
              name="b2b_website_hp" 
              value={honeypot} 
              onChange={(e) => setHoneypot(e.target.value)} 
              style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} 
              tabIndex={-1} 
              autoComplete="off" 
            />
            <div className="mid-input-wrapper">
              <Camera size={18} className="mid-input-icon" />
              <input 
                type="text"
                placeholder="Enter Booking.com URL or client Id"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mid-input-field"
              />
            </div>
            <button type="submit" className="mid-cta-btn">
              <span>Unlock My Vibe Signature Free</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mid-cta-micro">
            <span>Instant preview</span>
            <span>•</span>
            <span>Zero obligation</span>
            <span>•</span>
            <span>No login required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
