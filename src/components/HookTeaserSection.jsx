import React from 'react';
import { Camera, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Volume2, Share2, Bot, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HookTeaserSection.css';

export default function HookTeaserSection() {
  return (
    <section className="hook-teaser-section" id="vibe-signatures">
      <div className="container">
        
        {/* Section Header */}
        <div className="hook-teaser-header animate-fade-up">
          <div className="teaser-eyebrow">
            <Sparkles size={14} />
            <span>VIBE SIGNATURES</span>
          </div>
          <h2 className="teaser-title">
            <span className="text-gold-gradient">Stand Out From the Crowd</span>
          </h2>
          <p className="teaser-description">
            Prove your hotel is more than just a room. Map your authentic design, energy, lighting, and proximity to local hotspots directly to what next-gen travelers are searching for
          </p>
        </div>

        {/* 2-Tier Architecture Grid */}
        <div className="unlock-grid">
          
          {/* TIER 1: Instant Output (Free) */}
          <div className="unlock-card free-tier-card animate-fade-up">
            <div className="card-top-bar">
              <div className="step-tag free-tag">STEP 1: INSTANT OUTPUT</div>
              <span className="price-tag free-price">100% FREE</span>
            </div>

            <div className="tier-content">
              <h3 className="tier-heading">The OTA Photo Reorder</h3>
              <p className="tier-subtext">Instant photo recommendations that map your unique property features to neighborhood search demand</p>

              {/* Visual Interactive Showcase: 5-Photo Strip + Headline Vibe Signature */}
              <div className="visual-photo-reorder">
                
                {/* Hero Slot (#1 - The "Hook Photo") */}
                <div className="reorder-hero-slot">
                  <div className="hero-img-wrap">
                    <img 
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                      alt="Recommended Slot 1 Hero Photo - Lively Social Space" 
                      className="hero-img"
                    />
                    <div className="hero-slot-badge-left">
                      <Zap size={11} />
                      <span>SLOT #1: SOCIAL MAGNET</span>
                    </div>
                    <div className="hero-slot-badge-right">
                      <TrendingUp size={11} />
                      <span>+4.2s Dwell Time</span>
                    </div>
                    <div className="hero-slot-caption">
                      <span>Stops the scroll with high-energy social atmosphere</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Row: Slots #2 - #5 */}
                <div className="reorder-thumbnails-row">
                  <div className="reorder-thumb-item">
                    <div className="thumb-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=300&q=80" 
                        alt="Slot 2 Design Bed" 
                      />
                      <span className="thumb-badge">#2 Design</span>
                    </div>
                  </div>
                  <div className="reorder-thumb-item">
                    <div className="thumb-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=80" 
                        alt="Slot 3 Vinyl Lounge" 
                      />
                      <span className="thumb-badge">#3 Lounge</span>
                    </div>
                  </div>
                  <div className="reorder-thumb-item">
                    <div className="thumb-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80" 
                        alt="Slot 4 Craft Velocity" 
                      />
                      <span className="thumb-badge">#4 Bar</span>
                    </div>
                  </div>
                  <div className="reorder-thumb-item">
                    <div className="thumb-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80" 
                        alt="Slot 5 Wellness" 
                      />
                      <span className="thumb-badge">#5 Wellness</span>
                    </div>
                  </div>
                </div>

                {/* Headline Vibe Signature Glass Pill */}
                <div className="headline-vibe-box">
                  <div className="headline-vibe-header">
                    <Sparkles size={13} className="cyan-sparkle" />
                    <span className="headline-vibe-label">HEADLINE VIBE SIGNATURE</span>
                  </div>
                  <div className="headline-vibe-quote">
                    "Maritime Glamour &amp; Thameside Buzz"
                  </div>
                  <div className="headline-vibe-examples">
                    <span className="vibe-example-chip">Sea Containers: Maritime Glamour</span>
                    <span className="vibe-example-chip">Plymouth: Art Deco Oasis</span>
                    <span className="vibe-example-chip">25hours: Vinyl Social Hub</span>
                  </div>
                </div>

              </div>

              <div className="tier-badge-strip">
                <span className="feature-pill"><CheckCircle2 size={13} /> 60-Second Run</span>
                <span className="feature-pill"><CheckCircle2 size={13} /> Live Visual Preview</span>
                <span className="feature-pill"><CheckCircle2 size={13} /> Zero Setup</span>
              </div>
            </div>

            <div className="card-footer">
              <Link to="/audit" className="tier-cta-btn free-btn">
                <span>Preview My Vibe Signature Free</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* TIER 2: The Complete Vibe Signature™ */}
          <div className="unlock-card pro-tier-card animate-fade-up">
            <div className="card-top-bar">
              <div className="step-tag pro-tag">STEP 2: COMPLETE VIBE SIGNATURE™</div>
              <span className="price-tag pro-price">CLAIM PROPERTY</span>
            </div>

            <div className="tier-content">
              <h3 className="tier-heading">The Full Multi-Channel Engine</h3>
              <p className="tier-subtext">Comprehensive acoustic, narrative, and AI search assets powered by our proprietary Vibe Fingerprinting engine to make your brand stand out across all channels</p>

              {/* Visual Micro-UI Asset Suite: 3 Interactive Product Snippets */}
              <div className="visual-pro-suite">
                
                {/* Micro-UI 1: Acoustic & Soundscape */}
                <div className="pro-micro-card acoustic-card">
                  <div className="micro-card-top">
                    <div className="micro-card-title-row">
                      <div className="micro-icon gold-micro-icon">
                        <Volume2 size={14} />
                      </div>
                      <span className="micro-label">ACOUSTIC &amp; NEIGHBORHOOD RHYTHM</span>
                    </div>
                    <div className="sound-eq-visual" aria-hidden="true">
                      <span className="eq-bar bar-1"></span>
                      <span className="eq-bar bar-2"></span>
                      <span className="eq-bar bar-3"></span>
                      <span className="eq-bar bar-4"></span>
                      <span className="eq-bar bar-5"></span>
                    </div>
                  </div>
                  <div className="micro-card-content">
                    <div className="sound-stat-line">
                      <span className="sound-db-badge">64 dB</span>
                      <span className="sound-profile-name">Warm Vinyl Hum &amp; Neighborhood Tempo</span>
                    </div>
                    <div className="micro-meta-tag">Curated ambient tempo &amp; local micro-culture soundscape</div>
                  </div>
                </div>

                {/* Micro-UI 2: Multi-Channel Copy Hooks */}
                <div className="pro-micro-card copy-card">
                  <div className="micro-card-top">
                    <div className="micro-card-title-row">
                      <div className="micro-icon gold-micro-icon">
                        <Share2 size={14} />
                      </div>
                      <span className="micro-label">HIGH-RESONANCE COPY HOOKS</span>
                    </div>
                    <span className="copy-channel-badge">Direct + Social</span>
                  </div>
                  <div className="micro-card-content">
                    <div className="quote-snippet">
                      "Mid-century maritime design meets South Bank cocktail velocity &mdash; where Thames views meet vinyl rhythm"
                    </div>
                    <div className="micro-meta-tag">Optimized for Direct Website hero copy, Instagram bio &amp; pre-stay comms</div>
                  </div>
                </div>

                {/* Micro-UI 3: AI Search & GEO Tags */}
                <div className="pro-micro-card ai-geo-card">
                  <div className="micro-card-top">
                    <div className="micro-card-title-row">
                      <div className="micro-icon gold-micro-icon">
                        <Bot size={14} />
                      </div>
                      <span className="micro-label">AI SEARCH ENGINE OPTIMIZATION (GEO TAGS)</span>
                    </div>
                    <span className="ai-verified-badge">Perplexity &amp; ChatGPT</span>
                  </div>
                  <div className="micro-card-content">
                    <div className="ai-citation-bubble">
                      <span className="ai-prompt-indicator">AI Citation:</span> "Recommended hotel for travelers seeking curated vinyl lounges, rooftop Thames views, and craft mixology"
                    </div>
                    <div className="micro-meta-tag">Structured schema &amp; context tags so AI engines actively recommend your vibe</div>
                  </div>
                </div>

              </div>

              <div className="tier-badge-strip">
                <span className="feature-pill gold-pill"><ShieldCheck size={13} /> Verified Ownership</span>
                <span className="feature-pill gold-pill"><Zap size={13} /> Multi-Channel Boost</span>
                <span className="feature-pill gold-pill"><Bot size={13} /> AI Engine Discoverability</span>
              </div>
            </div>

            <div className="card-footer">
              <Link to="/audit" className="tier-cta-btn pro-btn">
                <span>Unlock Complete Vibe Signature™</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
