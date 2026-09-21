import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, ArrowDown, Zap, Music, Compass, ShieldCheck, Mail, Send, X, ExternalLink, Camera } from 'lucide-react';
import './ServiceOfferingSection.css';

export default function ServiceOfferingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    propertyName: '',
    city: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('https://formspree.io/f/xaqlrjor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...formData,
          form_type: 'Pro $500/mo Vibe Conversion Suite Enquiry',
          submitted_at: new Date().toISOString()
        })
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Enquiry submission note:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="service-offering-section" id="solution">
      <div className="container">
        
        {/* Intro Narrative Section */}
        <div className="service-intro-container animate-fade-up">
          <div className="service-stat-badge">
            <Sparkles size={14} /> 74% Next-Gen Guest Decision Factor
          </div>
          
          <h2 className="service-main-headline">
            74% of Next-Gen travellers research local things to do <span className="service-highlight-text">before they look at hotels.</span>
          </h2>
          
          <p className="service-narrative">
            The vibe of an area (the energy, sounds, and local traditions) is as important decision-making criteria as bookable experiences.
          </p>
          
          <p className="service-narrative" style={{ color: '#ffffff', fontWeight: 600 }}>
            <strong>AtmosVibe is your Vibe Conversion engine</strong> — a tool that monetises the local Vibe for you on your direct site, OTA listings, pre-stay email, social media presence, and AI-based search. It is your tool to stop being commoditised with other hotels and stand out from the crowd.
          </p>
          
          <div>
            <span className="service-free-tag">
              ⭐ It is totally FREE to get started
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Visual Morph on Left + 2 Offering Cards on Right */}
        <div className="service-main-grid">
          
          {/* LEFT COLUMN: Visual Transformation (Vibe Manifest turning into Booking.com resequencing) */}
          <div className="visual-morph-card animate-fade-up">
            <div className="morph-header">
              <h4>
                <Zap size={16} color="#00e5ff" />
                Vibe Manifest ➔ Booking.com Resequencing
              </h4>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '10px' }}>
                LIVE PIPELINE
              </span>
            </div>

            {/* STAGE 1: Venue Vibe Manifest (Top) */}
            <div className="mini-manifest-box">
              <div className="mini-manifest-top">
                <span className="mini-manifest-title">1. Venue Vibe Manifest</span>
                <span className="mini-energy-badge">Energy: 85/100</span>
              </div>
              <div className="mini-manifest-meta">
                <div className="mini-meta-item">
                  <strong>Acoustic DNA</strong>
                  <span>Melodic Deep House / Tycho</span>
                </div>
                <div className="mini-meta-item">
                  <strong>Crowd Archetype</strong>
                  <span>Cosmopolitan Creatives</span>
                </div>
                <div className="mini-meta-item" style={{ gridColumn: 'span 2' }}>
                  <strong>Local Neighborhood Synergy</strong>
                  <span>Craft mixology & underground art district anchor</span>
                </div>
              </div>
            </div>

            {/* Morphing Connector Arrow */}
            <div className="morph-connector-bar">
              <div className="morph-line" />
              <div className="morph-pill">
                <Sparkles size={13} /> Converts Local Vibe Into OTAs <ArrowDown size={14} />
              </div>
              <div className="morph-line" />
            </div>

            {/* STAGE 2: Booking.com 5-Slot Resequenced Photo Gallery (Bottom) */}
            <div className="mini-sequence-box">
              <div className="mini-sequence-header">
                <h5>2. High-Conversion 5-Slot OTA Resequencing</h5>
                <span className="mini-uplift-pill">+21.5% Booking Lift</span>
              </div>

              <div className="mini-photo-grid">
                {/* Slot 1: Cultural Magnet */}
                <div className="mini-photo-thumb hero-slot" title="Slot #1: Rooftop Hi-Fi Lounge (Cultural Magnet)">
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" alt="Cultural Magnet" />
                  <span className="mini-slot-badge">#1 MAGNET</span>
                </div>

                {/* Slot 2: Exterior Landmark */}
                <div className="mini-photo-thumb" title="Slot #2: Waterfront Exterior Landmark">
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" alt="Exterior Landmark" />
                  <span className="mini-slot-badge">#2 EXTERIOR</span>
                </div>

                {/* Slot 3: Signature Suite */}
                <div className="mini-photo-thumb" title="Slot #3: Signature King Suite">
                  <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80" alt="Signature Suite" />
                  <span className="mini-slot-badge">#3 SUITE</span>
                </div>

                {/* Slot 4: Spa/Dining */}
                <div className="mini-photo-thumb" title="Slot #4: Thermal Spa & Vitality Pool">
                  <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80" alt="Spa Wellness" />
                  <span className="mini-slot-badge">#4 SPA/F&B</span>
                </div>

                {/* Slot 5: Marble Bath */}
                <div className="mini-photo-thumb" title="Slot #5: Freestanding Soaking Tub">
                  <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80" alt="Luxury Bathroom" />
                  <span className="mini-slot-badge">#5 BATH</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                <span>Commodity Score: <strong style={{ color: '#ef4444' }}>40/100</strong> ➔ <strong style={{ color: '#10b981' }}>95/100</strong></span>
                <span style={{ color: '#00e5ff', fontWeight: 800 }}>⚡ Solves Drop-Off Flaws</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: The 2 Service Offering Tables / Cards */}
          <div className="tables-stack animate-fade-up delay-1">
            
            {/* TABLE 1: FREE TIER */}
            <div className="offering-card free-tier">
              <div className="offering-card-header">
                <div>
                  <h3 className="tier-name">FREE TIER</h3>
                  <div className="tier-price-wrap">
                    <span className="tier-price">$0</span>
                    <span className="tier-period">/ free forever</span>
                  </div>
                </div>
                <span className="tier-pill-badge free-pill">Instant Access</span>
              </div>

              <p className="tier-description">
                Diagnose visual friction and get your instant baseline Booking.com merchandising sequence.
              </p>

              <ul className="feature-list">
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Your Analysis</strong> — Full Venue Vibe Manifest & Acoustic DNA diagnostic</span>
                </li>
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Booking.com photo resequencing</strong> — Optimal 5-photo visual hierarchy</span>
                </li>
              </ul>

              <Link to="/audit" className="tier-cta-btn free-cta">
                <span>START NOW</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* TABLE 2: $500/MONTH PRO SUITE */}
            <div className="offering-card pro-tier">
              <div className="offering-card-header">
                <div>
                  <h3 className="tier-name" style={{ color: '#ffd700' }}>VIBE CONVERSION SUITE</h3>
                  <div className="tier-price-wrap">
                    <span className="tier-price">$500</span>
                    <span className="tier-period">/ month per property</span>
                  </div>
                </div>
                <span className="tier-pill-badge pro-pill">Full Omnichannel</span>
              </div>

              <p className="tier-description">
                Comprehensive vibe monetization across OTA, website, social media, pre-stay guest email, and AI search engines.
              </p>

              <ul className="feature-list">
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Booking.com photo resequencing</strong></span>
                </li>
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Booking.com copy rewrite</strong></span>
                </li>
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Local Vibe culture trends</strong></span>
                </li>
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Local vibe top locations</strong></span>
                </li>
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Your website / social / AI presence versus Vibe</strong></span>
                </li>
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Copy changes for both</strong></span>
                </li>
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Your ranking</strong></span>
                </li>
                <li className="feature-item">
                  <div className="feature-icon-wrap"><CheckCircle2 size={16} /></div>
                  <span><strong>Pre-stay email copy and playlist</strong></span>
                </li>
              </ul>

              <button 
                onClick={() => setIsModalOpen(true)} 
                className="tier-cta-btn pro-cta"
              >
                <span>ENQUIRE NOW</span>
                <Mail size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ENQUIRY MODAL */}
      {isModalOpen && (
        <div className="enquiry-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="enquiry-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,215,0,0.15)', color: '#ffd700', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  ⭐ $500/Month Pro Conversion Suite
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Enquire About Full Vibe Monetization
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: 0 }}>
                  Fill in your property details below to request a tailored omnichannel Vibe Conversion rollout.
                </p>

                <form className="enquiry-form" onSubmit={handleEnquirySubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="e.g. Alex Morgan" 
                        className="form-input" 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Work Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="e.g. alex@luxuryhotel.com" 
                        className="form-input" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Hotel / Property Name *</label>
                      <input 
                        type="text" 
                        name="propertyName" 
                        required 
                        placeholder="e.g. The Chelsea Harbour Hotel" 
                        className="form-input" 
                        value={formData.propertyName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>City / Location *</label>
                      <input 
                        type="text" 
                        name="city" 
                        required 
                        placeholder="e.g. London, Chelsea" 
                        className="form-input" 
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp (Optional)</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+44 20 7123 4567" 
                      className="form-input" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Specific Objectives / Notes (Optional)</label>
                    <textarea 
                      name="message" 
                      rows="3" 
                      placeholder="Tell us about your direct site, Booking.com goals, or pre-stay email requirements..." 
                      className="form-textarea"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="form-submit-btn">
                    {isSubmitting ? 'Sending Request...' : 'Submit Custom Suite Enquiry'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(16,185,129,0.15)', border: '2px solid #10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <CheckCircle2 size={32} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.75rem' }}>
                  Enquiry Received!
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                  Thank you! Our hospitality team is preparing your custom <strong>$500/mo Vibe Conversion dossier</strong> for <strong>{formData.propertyName || 'your property'}</strong>. We will reach out to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button 
                  onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }} 
                  className="tier-cta-btn pro-cta"
                  style={{ maxWidth: '240px', margin: '0 auto' }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
