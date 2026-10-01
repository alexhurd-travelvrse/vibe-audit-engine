import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Code2, Globe, ArrowRight, CheckCircle2, Copy, Check, Send, X, Sparkles, ExternalLink, Zap, Compass, Users } from 'lucide-react';
import './DataApiSection.css';

export default function DataApiSection() {
  const [activeTab, setActiveTab] = useState('json'); // 'json' | 'curl' | 'js'
  const [copied, setCopied] = useState(false);
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

  const sampleJson = `{
  "venue_id": "the_alma_wandsworth_london",
  "venue_name": "The Alma",
  "location": "East Hill, Wandsworth, London",
  "vibe_manifest": {
    "composite_vibe_score": 92,
    "acoustic_dna": {
      "reverberation_index": "Warm Wood Resonant",
      "chatter_density_db": 68,
      "curated_soundtrack_style": "British Indie Vinyl & Eclectic Soul",
      "diurnal_vibe_shift": "Sunlit Brunch -> Golden Hour Gastro -> Hi-Fi Social Night"
    },
    "subcultural_gravity": {
      "neighborhood_affinity_index": 0.94,
      "primary_subculture": "Artisan Craft Gastronomy & Craft Ale Sanctuary",
      "destination_power_score": 88
    },
    "optimal_5_photo_sequence": [
      { "slot": 1, "category": "HERO_CULTURAL_MAGNET", "subject": "The Alma Dining Room" },
      { "slot": 2, "category": "EXTERIOR_LANDMARK", "subject": "Corner Architectural Facade" },
      { "slot": 3, "category": "SIGNATURE_SUITE_BEDROOM", "subject": "Boutique Heritage Bedroom" },
      { "slot": 4, "category": "WELLNESS_SPA_LOBBY", "subject": "Boutique Arrival & Living Lounge" },
      { "slot": 5, "category": "SECONDARY_ROOM_BATHROOM", "subject": "Contemporary Luxury Bathroom" }
    ]
  }
}`;

  const sampleCurl = `curl -X GET "https://api.atmosvibe.com/v1/venue/the_alma_wandsworth_london/vibe-manifest" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`;

  const sampleJs = `import { AtmosVibeClient } from '@atmosvibe/sdk';

const client = new AtmosVibeClient({ apiKey: process.env.ATMOSVIBE_API_KEY });

// Retrieve real-time Vibe Manifest & Acoustic DNA
const manifest = await client.venues.getVibeManifest('the_alma_wandsworth_london');

console.log(\`Composite Vibe Score: \${manifest.vibe_manifest.composite_vibe_score}\`);
console.log(\`Acoustic DNA: \${manifest.vibe_manifest.acoustic_dna.curated_soundtrack_style}\`);`;

  const getActiveCode = () => {
    if (activeTab === 'curl') return sampleCurl;
    if (activeTab === 'js') return sampleJs;
    return sampleJson;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            License AtmosVibe's deep hospitality intelligence layer to embed real-time Vibe Manifests, acoustic DNA diagnostics, local subcultural trend vectors, and visual re-sequencing algorithms directly into your direct booking engine, mobile app, travel metaverse, or OTA portal
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

        {/* ========================================================================= */}
        {/* COMBINED CASE STUDY SECTION: TRAVELVRSE */}
        {/* ========================================================================= */}
        <div className="case-study-card">
          <div className="case-study-top-strip">
            <div className="case-study-badge">
              <img src="/models/travelvrse_logo_main.svg" alt="Travelvrse" className="travelvrse-pill-logo" />
              <span>CASE STUDY: TRAVELVRSE SPATIAL PLATFORM</span>
            </div>

            <Link to="/partner" className="case-study-direct-link">
              <span>Read Full Case Study &amp; Partner Program</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="case-study-grid">
            {/* Left Content */}
            <div>
              <h3 className="case-study-title">
                How Travelvrse Powers 3D Spatial Travel Discovery with the AtmosVibe VIBE API
              </h3>
              
              <p className="case-study-narrative">
                <strong>Travelvrse</strong>, the pioneering 3D spatial travel exploration platform, integrated AtmosVibe's real-time VIBE API to power their virtual city districts in Barcelona and London. By streaming live acoustic signatures, diurnal time-of-day soundscapes, and neighborhood subcultural hotspots directly into 3D environments, Travelvrse transformed static hotel listings into interactive spatial discoveries
              </p>

              <ul className="case-study-highlights">
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span><strong>Real-Time Soundscape Generation:</strong> Ingests diurnal acoustic profiles to synthesize time-of-day audio atmospheres with automatic creator voiceover ducking</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span><strong>Gamified Spatial Radar:</strong> Powers the interactive 3D Radar HUD and sensory micro-tag cards with live hotel amenity ratings and verified photography</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span><strong>Direct Booking Resonance:</strong> Elevates boutique hotel partners with zero commodity clutter, driving direct booking intent straight from the virtual exploration feed</span>
                </li>
              </ul>

              <div className="case-quote-box">
                <p className="case-quote-text">
                  "By licensing AtmosVibe's VIBE API, we bridged raw hotel metadata with dynamic local subcultures, giving travelers the emotional confidence to book directly from our 3D spatial metaverse"
                </p>
                <div className="case-quote-author">
                  — Travelvrse Engineering &amp; Metaverse Operations
                </div>
              </div>

              {/* Action Buttons: Become a Partner & Case Study */}
              <div className="case-study-action-row">
                <Link to="/partner" className="case-study-partner-btn">
                  <Sparkles size={16} />
                  <span>Become a Partner</span>
                </Link>

                <Link to="/partner" className="case-study-enquire-btn">
                  <ExternalLink size={16} />
                  <span>Read Full Case Study</span>
                </Link>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="api-secondary-btn"
                  style={{ padding: '0.85rem 1.4rem', fontSize: '0.9rem' }}
                >
                  <Code2 size={15} />
                  <span>Request API Sandbox</span>
                </button>
              </div>
            </div>

            {/* Right Visual & Metric Impact Cards */}
            <div className="case-metrics-wrap">
              {/* Spatial Visual Preview Card Linking Off to Case Study */}
              <Link to="/partner" className="spatial-preview-slot" title="View Travelvrse Case Study">
                <div className="spatial-img-wrap">
                  <img 
                    src="/models/Screenshothomepage.png" 
                    alt="Travelvrse 3D Spatial Travel Platform" 
                    className="spatial-img"
                  />
                  <div className="spatial-overlay-badge">
                    <span className="live-dot" />
                    <span>LIVE 3D SPATIAL RADAR HUD</span>
                  </div>
                  <div className="spatial-hover-chip">
                    <span>Explore Case Study</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>

              {/* 3 Metrics Row */}
              <div className="metrics-row-grid">
                <Link to="/partner" className="clickable-metric-box">
                  <div className="metric-value">+34%</div>
                  <div className="metric-label">Direct Booking Intent</div>
                  <div className="metric-desc">Pre-checkout atmosphere and acoustic verification</div>
                </Link>

                <Link to="/partner" className="clickable-metric-box">
                  <div className="metric-value" style={{ color: '#ffd700' }}>2.8x</div>
                  <div className="metric-label">Session Duration</div>
                  <div className="metric-desc">Explorers actively engaging with 3D Radar micro-cards</div>
                </Link>

                <Link to="/partner" className="clickable-metric-box">
                  <div className="metric-value" style={{ color: '#10b981' }}>&lt;120ms</div>
                  <div className="metric-label">Data Sync</div>
                  <div className="metric-desc">Synchronized acoustic feeds across web and 3D</div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* API Interactive Demo & Code Terminal */}
        <div className="api-demo-grid">
          <div className="api-demo-info">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00e5ff', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              <Code2 size={14} /> Developer-Ready SDK &amp; Webhooks
            </div>
            <h3>Embed Structured Atmosphere Diagnostics in Minutes</h3>
            <p>
              Integrate with our lightweight SDK or query our REST API directly. Every response delivers validated JSON with complete sensory manifests, acoustic decay rates, and optimal visual re-sequencing tags
            </p>

            <div className="api-pill-list">
              <span className="api-mini-pill">⚡ &lt;120ms Latency</span>
              <span className="api-mini-pill">🔒 99.9% Enterprise SLA</span>
              <span className="api-mini-pill">📦 REST / GraphQL / Webhooks</span>
              <span className="api-mini-pill">🛡️ Strict Rate Limit Shield</span>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="api-primary-btn"
              style={{ fontSize: '0.95rem', padding: '0.9rem 1.8rem' }}
            >
              <span>REQUEST API SANDBOX KEY</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Terminal Window */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="terminal-dot" style={{ background: '#ef4444' }} />
                <div className="terminal-dot" style={{ background: '#f59e0b' }} />
                <div className="terminal-dot" style={{ background: '#10b981' }} />
              </div>

              <div className="terminal-tabs">
                <button 
                  className={`terminal-tab ${activeTab === 'json' ? 'active' : ''}`}
                  onClick={() => setActiveTab('json')}
                >
                  JSON Response
                </button>
                <button 
                  className={`terminal-tab ${activeTab === 'curl' ? 'active' : ''}`}
                  onClick={() => setActiveTab('curl')}
                >
                  cURL
                </button>
                <button 
                  className={`terminal-tab ${activeTab === 'js' ? 'active' : ''}`}
                  onClick={() => setActiveTab('js')}
                >
                  Node SDK
                </button>
              </div>

              <button 
                onClick={handleCopyCode}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: copied ? '#10b981' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 700
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <pre className="terminal-body">
              <code>{getActiveCode()}</code>
            </pre>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="api-cta-bar">
          <Link to="/partner" className="case-study-partner-btn" style={{ padding: '1.1rem 2.2rem', fontSize: '1rem', borderRadius: '35px' }}>
            <Sparkles size={18} />
            <span>BECOME A PARTNER</span>
          </Link>

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
