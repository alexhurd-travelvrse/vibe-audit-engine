import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Globe, ArrowRight, CheckCircle2, Send, X, Zap, Compass, Users } from 'lucide-react';
import './DataApiSection.css';

export default function DataApiSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    website: '',
    email: '',
    phone: '',
    useCase: '',
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
          form_type: 'AtmosVibe Enterprise VIBE API Licensing Enquiry',
          submitted_at: new Date().toISOString()
        })
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn('API enquiry submission note:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="data-api-section" id="vibe-api">
      <div className="data-api-container">
        
        {/* Header */}
        <div className="data-api-header">
          <div className="data-api-pill">
            <Zap size={13} /> ATMOSVIBE ENTERPRISE VIBE API
          </div>
          <h2 className="data-api-headline">
            PUT VIBE AT THE <span style={{ background: 'linear-gradient(90deg, #00e5ff, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FRONT OF YOUR BUSINESS</span>
          </h2>
          <p className="data-api-narrative">
            Make Your App more relevant by licensing Vibe data
          </p>
        </div>

        {/* 3 Audience Boxes: OTAs, Trip Planning, Travel Concierge Services */}
        <div className="api-features-grid">
          {/* Card 1: OTAs */}
          <div className="api-feature-card">
            <div className="api-card-header-row">
              <div className="api-icon-wrap">
                <Globe size={24} />
              </div>
              <span className="api-card-tag">Search &amp; Ranking Engine</span>
            </div>
            <h3 className="api-feature-title">OTAs</h3>
            <p className="api-feature-desc">
              Transform generic search filters into high-converting atmospheric discovery. Stream real-time Vibe Signatures, acoustic DNA, and anti-commodity photo rankings into hotel listing cards to slash bounce rates and lift boutique booking conversion
            </p>

            {/* Interactive Visual Micro-HUD: Live Listing Ranking */}
            <div className="api-visual-hud">
              <div className="hud-top-bar">
                <div className="hud-signal-dot" />
                <span className="hud-label">Alma Wandsworth OTA Feed</span>
                <span className="hud-score-badge">+22.4% LIFT</span>
              </div>
              <div className="hud-content-row">
                <div className="hud-thumb-slot">
                  <img src="/models/Screenshothomepage.png" alt="Listing preview" />
                  <span className="hud-photo-badge">#1 VIBE RANK</span>
                </div>
                <div className="hud-details-col">
                  <div className="hud-venue-name">The Alma Wandsworth</div>
                  <div className="hud-meta-tags">
                    <span className="hud-pill">Vinyl Hi-Fi</span>
                    <span className="hud-pill">Artisan Gastronomy</span>
                  </div>
                  <div className="hud-score-text">
                    Vibe Score: <strong>92/100</strong> (Acoustic Verified)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Trip Planning */}
          <div className="api-feature-card">
            <div className="api-card-header-row">
              <div className="api-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.12)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#ffd700' }}>
                <Compass size={24} />
              </div>
              <span className="api-card-tag gold-tag">Circadian Atmosphere Sync</span>
            </div>
            <h3 className="api-feature-title">Trip Planning</h3>
            <p className="api-feature-desc">
              Synchronize dynamic diurnal vibes with guest itineraries. Power intelligent morning-to-night transitions matching exact circadian energy—from sunlit courtyard brunch to golden hour cocktails and late-night hi-fi social vinyl sessions
            </p>

            {/* Interactive Visual Micro-HUD: Diurnal Timeline */}
            <div className="api-visual-hud">
              <div className="hud-top-bar">
                <div className="hud-signal-dot gold-dot" />
                <span className="hud-label">Diurnal Itinerary Sync</span>
                <span className="hud-score-badge gold-badge">3 SLOTS ACTIVE</span>
              </div>
              <div className="hud-itinerary-list">
                <div className="itinerary-item">
                  <span className="itinerary-time">10:00</span>
                  <div className="itinerary-info">
                    <span className="itinerary-title">Sunlit Courtyard Brunch</span>
                    <span className="itinerary-vibe">Acoustic DNA 68dB · Natural Light</span>
                  </div>
                </div>
                <div className="itinerary-item">
                  <span className="itinerary-time">17:30</span>
                  <div className="itinerary-info">
                    <span className="itinerary-title">Golden Hour Gastro Hour</span>
                    <span className="itinerary-vibe">Warm Wood Resonant · Ambient Social</span>
                  </div>
                </div>
                <div className="itinerary-item">
                  <span className="itinerary-time">21:30</span>
                  <div className="itinerary-info">
                    <span className="itinerary-title">Hi-Fi Social Night Lounge</span>
                    <span className="itinerary-vibe">British Indie &amp; Soul · Intimate Buzz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Travel Concierge Services */}
          <div className="api-feature-card">
            <div className="api-card-header-row">
              <div className="api-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34d399' }}>
                <Users size={24} />
              </div>
              <span className="api-card-tag emerald-tag">Taste Graph AI Matching</span>
            </div>
            <h3 className="api-feature-title">Travel Concierge Services</h3>
            <p className="api-feature-desc">
              Equip luxury concierge desks, bespoke itinerary designers, and conversational AI agents with instant sensory manifests. Eliminate atmospheric guesswork by pairing high-intent travelers with verified soundscapes and cultural aura
            </p>

            {/* Interactive Visual Micro-HUD: AI Concierge Match Preview */}
            <div className="api-visual-hud">
              <div className="hud-top-bar">
                <div className="hud-signal-dot emerald-dot" />
                <span className="hud-label">VIP Taste Match</span>
                <span className="hud-score-badge emerald-badge">98% COMPATIBLE</span>
              </div>
              <div className="concierge-chat-preview">
                <div className="chat-bubble user-bubble">
                  "Find an intimate London boutique with zero nightclub noise spillover and authentic vinyl acoustics"
                </div>
                <div className="chat-bubble ai-bubble">
                  <span className="ai-match-highlight">Matched: The Alma Wandsworth (92 Vibe)</span>
                  <span className="ai-match-sub">Verified: 68dB acoustic boundary, warm wood resonance, zero late night spill</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Widget: Positioned Under Vibe API */}
        <div className="api-case-study-widget-wrap">
          <Link to="/partner" className="api-case-study-widget" title="Read Travelvrse Case Study & Partner Program">
            <div className="widget-logo-col">
              <span className="widget-kicker">FEATURED CASE STUDY</span>
              <img src="/models/travelvrse_logo_main.svg" alt="Travelvrse" className="api-partner-logo" />
            </div>

            <div className="widget-content-col">
              <div className="widget-title">
                How Travelvrse Powers 3D Spatial Travel Discovery with the AtmosVibe VIBE API
              </div>
              <div className="widget-metrics-inline">
                <span className="widget-pill"><strong>+34%</strong> Direct Booking Intent</span>
                <span className="widget-pill"><strong>2.8x</strong> Session Duration</span>
                <span className="widget-pill"><strong>&lt;120ms</strong> Real-Time Sync</span>
              </div>
            </div>

            <div className="widget-cta-col">
              <span className="widget-cta-btn">
                <span>View Case Study &amp; Partner Program</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>

        {/* Bottom CTA Bar */}
        <div className="api-cta-bar">
          <button onClick={() => setIsModalOpen(true)} className="api-primary-btn">
            <Send size={18} />
            <span>ENQUIRE ABOUT API LICENSING</span>
          </button>
          
          <a href="/audit" className="api-secondary-btn">
            <span>RUN A FREE VENUE AUDIT FIRST</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>

      {/* API LICENSING ENQUIRY MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00e5ff', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    <Database size={14} /> AtmosVibe VIBE API Licensing
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    Request API Documentation &amp; Sandbox Key
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>
                    Speak directly with our engineering team to explore custom API quotas, webhooks, and direct booking engine integrations
                  </p>
                </div>

                <form onSubmit={handleEnquirySubmit} className="enquiry-form">
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

                  <div className="form-row">
                    <div className="form-group">
                      <label>Work Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="alex@travelplatform.com" 
                        className="form-input" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Company / Platform *</label>
                      <input 
                        type="text" 
                        name="company" 
                        required 
                        placeholder="e.g. Travelvrse / Direct OTA" 
                        className="form-input" 
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Platform Website</label>
                      <input 
                        type="text" 
                        name="website" 
                        placeholder="https://platform.com" 
                        className="form-input" 
                        value={formData.website}
                        onChange={handleInputChange}
                      />
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
                  </div>

                  <div className="form-group">
                    <label>Integration Objectives / Expected Call Volume</label>
                    <textarea 
                      name="message" 
                      rows="3" 
                      placeholder="Tell us how you plan to embed Vibe Manifests into your direct site, booking engine, or spatial app..." 
                      className="form-textarea" 
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="form-submit-btn">
                    {isSubmitting ? 'Sending Request...' : 'Submit API Access Request'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(16,185,129,0.15)', border: '2px solid #10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <CheckCircle2 size={32} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.75rem' }}>
                  API Access Request Received!
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                  Thank you! Our engineering team will review your requirements for <strong>{formData.company || 'your platform'}</strong> and email your sandbox API credentials to <strong>{formData.email}</strong> within 24 hours
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
