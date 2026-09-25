import React, { useState } from 'react';
import { Database, Code2, Cpu, Globe, ArrowRight, CheckCircle2, Copy, Check, Send, X, Layers, Sparkles, ExternalLink, Zap } from 'lucide-react';
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
          form_type: 'AtmosVibe Enterprise Data API Licensing Enquiry',
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
    <section className="data-api-section" id="data-api">
      <div className="data-api-container">
        
        {/* Header */}
        <div className="data-api-header">
          <div className="data-api-pill">
            <Zap size={13} /> ATMOSVIBE ENTERPRISE DATA API
          </div>
          <h2 className="data-api-headline">
            LICENSE REAL-TIME VIBE DATA FOR <span style={{ background: 'linear-gradient(90deg, #00e5ff, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>YOUR DIRECT PLATFORM</span>
          </h2>
          <p className="data-api-narrative">
            License AtmosVibe's deep hospitality intelligence layer to embed real-time Vibe Manifests, acoustic DNA diagnostics, local subcultural trend vectors, and visual re-sequencing algorithms directly into your direct booking engine, mobile app, travel metaverse, or OTA portal.
          </p>
        </div>

        {/* 3 API Capabilities Cards */}
        <div className="api-features-grid">
          <div className="api-feature-card">
            <div className="api-icon-wrap">
              <Database size={26} />
            </div>
            <h3 className="api-feature-title">Direct Booking Funnel Injection</h3>
            <p className="api-feature-desc">
              Dynamically stream venue acoustic profiles, sensory tags, and diurnal energy dials into your direct booking funnel to convert visitors with rich, authentic atmosphere proof-points.
            </p>
          </div>

          <div className="api-feature-card">
            <div className="api-icon-wrap" style={{ background: 'rgba(236, 72, 153, 0.12)', borderColor: 'rgba(236, 72, 153, 0.3)', color: '#ec4899' }}>
              <Globe size={26} />
            </div>
            <h3 className="api-feature-title">Hyper-Local Subcultural Graph</h3>
            <p className="api-feature-desc">
              Continuous real-time geospatial and multimodal intelligence streams tracking trending nightlife, gastronomy, and cultural magnets around each property to connect guest intent with local gravity.
            </p>
          </div>

          <div className="api-feature-card">
            <div className="api-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.12)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#f59e0b' }}>
              <Layers size={26} />
            </div>
            <h3 className="api-feature-title">Multi-Property OTA & Enterprise Feed</h3>
            <p className="api-feature-desc">
              Ingest structured anti-commodity metadata, optimal 5-photo visual hierarchies, and AI copy rewrites across hundreds of global properties in real time via low-latency REST & GraphQL.
            </p>
          </div>
        </div>

        {/* API Interactive Demo & Code Terminal */}
        <div className="api-demo-grid">
          <div className="api-demo-info">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00e5ff', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              <Code2 size={14} /> Developer-Ready SDK & Webhooks
            </div>
            <h3>Embed Structured Atmosphere Diagnostics in Minutes</h3>
            <p>
              Integrate with our lightweight SDK or query our REST API directly. Every response delivers validated JSON with complete sensory manifests, acoustic decay rates, and optimal visual re-sequencing tags.
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

        {/* ========================================================================= */}
        {/* CASE STUDY SECTION: TRAVELVRSE */}
        {/* ========================================================================= */}
        <div className="case-study-card">
          <div className="case-study-badge">
            <Sparkles size={13} /> CASE STUDY: TRAVELVRSE SPATIAL PLATFORM
          </div>

          <div className="case-study-grid">
            {/* Left Content */}
            <div>
              <h3 className="case-study-title">
                How Travelvrse Powers 3D Spatial Travel Discovery with the AtmosVibe Data API
              </h3>
              
              <p className="case-study-narrative">
                <strong>Travelvrse</strong>, the pioneering 3D spatial travel exploration platform, integrated AtmosVibe's real-time Data API to power their virtual city districts in Barcelona and London. By streaming live acoustic signatures, diurnal time-of-day soundscapes, and neighborhood subcultural hotspots directly into 3D environments, Travelvrse transformed static hotel listings into interactive spatial discoveries.
              </p>

              <ul className="case-study-highlights">
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span><strong>Real-Time Soundscape Generation:</strong> Ingests diurnal acoustic profiles to synthesize time-of-day audio atmospheres with automatic creator voiceover ducking.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span><strong>Gamified Spatial Radar:</strong> Powers the interactive 3D Radar HUD and sensory micro-tag cards with live hotel amenity ratings and verified photography.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span><strong>Direct Booking Resonance:</strong> Elevates boutique hotel partners with zero commodity clutter, driving direct booking intent straight from the virtual exploration feed.</span>
                </li>
              </ul>

              <div className="case-quote-box">
                <p className="case-quote-text">
                  "By licensing AtmosVibe's Data API, we bridged raw hotel metadata with dynamic local subcultures, giving travelers the emotional confidence to book directly from our 3D spatial metaverse."
                </p>
                <div className="case-quote-author">
                  — Travelvrse Engineering & Metaverse Operations
                </div>
              </div>
            </div>

            {/* Right Metric Impact Cards */}
            <div className="case-metrics-wrap">
              <div className="metric-box">
                <div className="metric-value">+34%</div>
                <div className="metric-label">Direct Booking Intent</div>
                <div className="metric-desc">Travelers validating venue atmosphere and acoustic DNA prior to checkout.</div>
              </div>

              <div className="metric-box">
                <div className="metric-value" style={{ color: '#ffd700' }}>2.8x</div>
                <div className="metric-label">Extended Session Duration</div>
                <div className="metric-desc">Explorers actively interacting with 3D Radar micro-cards and Diurnal Dials.</div>
              </div>

              <div className="metric-box">
                <div className="metric-value" style={{ color: '#10b981' }}>&lt;120ms</div>
                <div className="metric-label">Real-Time Data Sync</div>
                <div className="metric-desc">Synchronized multi-property acoustic and visual intelligence feeds across web & VR.</div>
              </div>
            </div>
          </div>
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
                    <Database size={14} /> AtmosVibe Data API Licensing
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    Request API Documentation & Sandbox Key
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>
                    Speak directly with our engineering team to explore custom API quotas, webhooks, and direct booking engine integrations.
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
                  Thank you! Our engineering team will review your requirements for <strong>{formData.company || 'your platform'}</strong> and email your sandbox API credentials to <strong>{formData.email}</strong> within 24 hours.
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
