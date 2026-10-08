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
            <span>HOW WE USE VIBE SIGNATURES</span>
          </div>
          <h2 className="teaser-title">
            <span className="text-gold-gradient">Become the Gateway to Your Neighbourhood</span>
          </h2>
          <p className="teaser-description">
            74% of Next-Gen travelers book local experiences before a hotel. AtmosVibe uses your Vibe Signature to ensure you are showcasing what makes you unique based on local demand. Across all channels
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

              {/* Visual Interactive Showcase: 5-Photo Strip + Headline Vibe Signature */}
              <div className="visual-photo-reorder">
                
                {/* Your Vibe Signature Indicator */}
                <div className="vibe-signature-pulse">
                  <span className="vibe-pulse-dot"></span>
                  <span className="pulse-text">Your Vibe Signature: <strong>Maritime Glamour &amp; Thameside Buzz</strong></span>
                </div>

                {/* Local Area Search Pulse Indicator */}
                <div className="area-demand-pulse">
                  <span className="pulse-dot"></span>
                  <span className="pulse-text">Trending in your area: <strong>Riverside terrace &amp; artisan social spots</strong></span>
                </div>

                {/* Side-by-Side Before & After Comparison Containers */}
                <div className="before-after-collage-row">
                  
                  {/* Before Card: Standard Rooms & Features */}
                  <div className="collage-card before-card">
                    <div className="collage-card-header before-header">
                      <span className="collage-badge before-badge">BEFORE: ROOMS &amp; FEATURES</span>
                    </div>
                    
                    <div className="collage-hero-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80" 
                        alt="Before: Generic Standard Bed" 
                        className="collage-hero-img desaturated"
                      />
                      <div className="collage-slot-tag before-slot-tag">Slot #1: Standard Bed</div>
                      <div className="collage-status-tag before-status-tag">Standard Listing</div>
                    </div>

                    <div className="collage-thumbs-strip">
                      <div className="collage-thumb-item">
                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" alt="Slot 2 Bathroom" />
                        <span className="thumb-cap">#2 En-Suite</span>
                      </div>
                      <div className="collage-thumb-item">
                        <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=300&q=80" alt="Slot 3 Desk" />
                        <span className="thumb-cap">#3 Desk</span>
                      </div>
                      <div className="collage-thumb-item">
                        <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80" alt="Slot 4 Corridor" />
                        <span className="thumb-cap">#4 Corridor</span>
                      </div>
                    </div>

                    <div className="collage-verdict before-verdict">
                      <span>Majors on interior utility · Ignores local search demand</span>
                    </div>
                  </div>

                  {/* After Card: Local Gateway Hook */}
                  <div className="collage-card after-card">
                    <div className="collage-card-header after-header">
                      <span className="collage-badge after-badge">AFTER: LOCAL GATEWAY HOOK</span>
                    </div>

                    <div className="collage-hero-wrap">
                      <img 
                        src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80" 
                        alt="After: Riverside Gateway Terrace" 
                        className="collage-hero-img vibrant"
                      />
                      <div className="collage-slot-tag after-slot-tag">Slot #1: Riverside Terrace</div>
                      <div className="collage-status-tag after-status-tag">+4.2s Dwell</div>
                    </div>

                    <div className="collage-thumbs-strip">
                      <div className="collage-thumb-item">
                        <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80" alt="Slot 2 Artisan Social Bar" />
                        <span className="thumb-cap">#2 Social Bar</span>
                      </div>
                      <div className="collage-thumb-item">
                        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=80" alt="Slot 3 Maritime Glamour" />
                        <span className="thumb-cap">#3 Maritime</span>
                      </div>
                      <div className="collage-thumb-item">
                        <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=300&q=80" alt="Slot 4 Sunset River" />
                        <span className="thumb-cap">#4 Sunset</span>
                      </div>
                    </div>

                    <div className="collage-verdict after-verdict">
                      <span>Directly matches Maritime Buzz &amp; Riverside terrace demand</span>
                    </div>
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
