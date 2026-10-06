import React from 'react';
import { Sparkles, ArrowRight, Compass, Zap, TrendingUp } from 'lucide-react';
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
            74% of next-gen travelers research local experiences first. Prove your property is their natural Gateway
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
              <h3 className="tier-heading">OTA Photos</h3>
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
                </div>

              </div>
            </div>

            <div className="card-footer">
              <Link to="/audit" className="tier-cta-btn free-btn">
                <span>Review My OTA Photos Free</span>
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
              <h3 className="tier-heading">Multi-Channel Conversion</h3>
              <p className="tier-subtext">Map your authentic design, social energy, lighting, and proximity to local hotspots across every channel</p>

              {/* 3-Pillar Executive Deliverable Matrix */}
              <div className="pro-pillars-suite">
                
                {/* Pillar 1: Conversion Copy & Visuals */}
                <div className="pillar-block">
                  <div className="pillar-top">
                    <div className="pillar-icon">
                      <Sparkles size={13} />
                    </div>
                    <span className="pillar-title">Conversion Copy &amp; Visuals</span>
                  </div>
                  <ul className="pillar-deliverables-list">
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <div className="deliverable-content">
                        <span className="deliverable-name">Full OTA and Website Photo and Copy</span>
                      </div>
                    </li>
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <div className="deliverable-content">
                        <span className="deliverable-name">Positioning as Local Gateway</span>
                      </div>
                    </li>
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <div className="deliverable-content">
                        <span className="deliverable-name">Social Media Positioning</span>
                      </div>
                    </li>
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <div className="deliverable-content">
                        <span className="deliverable-name">AI Search (GEO) Tagging</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Pillar 2: Market Edge & Competitor Intelligence */}
                <div className="pillar-block">
                  <div className="pillar-top">
                    <div className="pillar-icon">
                      <Compass size={13} />
                    </div>
                    <span className="pillar-title">Market Edge &amp; Competitor Intelligence</span>
                  </div>
                  <ul className="pillar-deliverables-list">
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <div className="deliverable-content">
                        <span className="deliverable-name">Competitor Benchmarking</span>
                      </div>
                    </li>
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <div className="deliverable-content">
                        <span className="deliverable-name">Local Trending Vibes</span>
                      </div>
                    </li>
                  </ul>
                </div>

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
