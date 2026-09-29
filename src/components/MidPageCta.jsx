import React, { useState } from 'react';
import { ArrowRight, Sparkles, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MidPageCta.css';

export default function MidPageCta() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <span>60-SECOND CONVERSION DIAGNOSTIC</span>
          </div>

          <h2 className="cta-headline">
            Don't let a bad photo order cost you <span className="cta-headline-red">15% in direct conversion.</span>
          </h2>

          <p className="cta-body">
            See how your property ranks against modern traveler sentiment in 60 seconds.
          </p>

          <form onSubmit={handleSubmit} className="mid-cta-form">
            <div className="mid-input-wrapper">
              <Camera size={18} className="mid-input-icon" />
              <input 
                type="text"
                placeholder="Paste Booking.com listing URL or hotel name..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mid-input-field"
              />
            </div>
            <button type="submit" className="mid-cta-btn">
              <span>Audit My Booking.com Listing Free</span>
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
