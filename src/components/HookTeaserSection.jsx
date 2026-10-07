import React from 'react';
import { Sparkles, ArrowRight, Compass, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HookTeaserSection.css';

export default function HookTeaserSection() {
  return (
    <section className="hook-teaser-section" id="how-we-use-it">
      <div className="container">
        
        {/* Section Header */}
        <div className="hook-teaser-header animate-fade-up">
          <div className="teaser-eyebrow">
            <Sparkles size={14} />
            <span>HOW WE USE IT</span>
          </div>
          <h2 className="teaser-title">
            <span className="text-gold-gradient">Turn Local Demand into Bookings</span>
          </h2>
          <p className="teaser-description">
            We connect what travelers are actively searching for in your neighbourhood directly to your booking channels
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
              <h3 className="tier-heading">Optimise Your OTA Photos</h3>
              <p className="tier-subtext">Maps neighbourhood search demand to your top 5 photo slots to hook high-intent travelers</p>

              {/* Visual Interactive Showcase: 5-Photo Strip + Headline Vibe Signature */}
              <div className="visual-photo-reorder">
                
                {/* Local Area Search Pulse Indicator */}
                <div className="area-demand-pulse">
                  <span className="pulse-dot"></span>
                  <span className="pulse-text">Trending in your area: <strong>Riverside terrace &amp; artisan social spots</strong></span>
                </div>

                {/* Hero Slot (#1 - The "Hook Photo") */}
                <div className="reorder-hero-slot">
                  <div className="hero-img-wrap">
                    <img 
                      src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" 
                      alt="Recommended Slot 1 Hero Photo - Riverside Gateway Terrace" 
                      className="hero-img"
                    />
                    <div className="hero-slot-badge-left">
                      <Zap size={11} />
                      <span>SLOT #1: LOCAL GATEWAY HOOK</span>
                    </div>
                    <div className="hero-slot-badge-right">
                      <TrendingUp size={11} />
                      <span>+4.2s Dwell Time</span>
                    </div>
                    <div className="hero-slot-caption">
                      <span>Stops the scroll by leading with your hotel's best match to local demand</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Row: Slots #2 - #5 */}
                <div className="reorder-thumbnails-row">
                  <div className="reorder-thumb-item">
                    <div className="thumb-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=300&q=80" 
                        alt="Slot 2 Local Design" 
                      />
                      <span className="thumb-badge">#2 Local Design</span>
                    </div>
                  </div>
                  <div className="reorder-thumb-item">
                    <div className="thumb-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=300&q=80" 
                        alt="Slot 3 Sunset Terrace" 
                      />
                      <span className="thumb-badge">#3 Sunset Terrace</span>
                    </div>
                  </div>
                  <div className="reorder-thumb-item">
                    <div className="thumb-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80" 
                        alt="Slot 4 Neighborhood Bar" 
                      />
                      <span className="thumb-badge">#4 Local Bar</span>
                    </div>
                  </div>
                  <div className="reorder-thumb-item">
                    <div className="thumb-img-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80" 
                        alt="Slot 5 Serene Retreat" 
                      />
                      <span className="thumb-badge">#5 Serene Retreat</span>
                    </div>
                  </div>
                </div>

                {/* Headline Vibe Signature Glass Pill */}
                <div className="headline-vibe-box">
                  <div className="headline-vibe-header">
                    <Sparkles size={13} className="cyan-sparkle" />
                    <span className="headline-vibe-label">YOUR VIBE SIGNATURE™</span>
                  </div>
                  <div className="headline-vibe-quote">
                    "Maritime Glamour &amp; Thameside Buzz"
                  </div>
                </div>

              </div>
            </div>

            <div className="card-footer">
              <Link to="/audit" className="tier-cta-btn free-btn">
                <span>Optimise My OTA Photos Free</span>
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
              <h3 className="tier-heading">Stand Out Across All Channels</h3>
              <p className="tier-subtext">Scale your local gateway positioning to maximise bookings across OTAs, your website, social media, and AI search</p>

              {/* Distribution Channel Pill Strip */}
              <div className="channel-distribution-strip">
                <span className="channel-tag">OTAs</span>
                <span className="channel-tag">Hotel Website</span>
                <span className="channel-tag">Social Media</span>
                <span className="channel-tag">AI Search (GEO)</span>
              </div>

              {/* 2-Pillar Deliverable Matrix */}
              <div className="pro-pillars-suite">
                
                {/* Pillar 1: Gateway Conversion Assets */}
                <div className="pillar-block">
                  <div className="pillar-top">
                    <div className="pillar-icon">
                      <Sparkles size={13} />
                    </div>
                    <span className="pillar-title">Gateway Conversion Assets</span>
                  </div>
                  <ul className="pillar-deliverables-list">
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <span className="deliverable-name">High-converting photo sequencing</span>
                    </li>
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <span className="deliverable-name">Local gateway narrative</span>
                    </li>
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <span className="deliverable-name">AI Search (GEO) entity tags</span>
                    </li>
                  </ul>
                </div>

                {/* Pillar 2: Local Market Intelligence */}
                <div className="pillar-block">
                  <div className="pillar-top">
                    <div className="pillar-icon">
                      <Compass size={13} />
                    </div>
                    <span className="pillar-title">Local Market Intelligence</span>
                  </div>
                  <ul className="pillar-deliverables-list">
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <span className="deliverable-name">Neighborhood vibe radar</span>
                    </li>
                    <li className="deliverable-item">
                      <span className="deliverable-bullet">•</span>
                      <span className="deliverable-name">Competitor vibe benchmarking</span>
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
