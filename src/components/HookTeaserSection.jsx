import React from 'react';
import { Sparkles, ArrowRight, Compass, Zap, CheckCircle2 } from 'lucide-react';
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
            Gateway to Your <span className="teaser-title-accent">Destination</span>
          </h2>
          <p className="teaser-description">
            AtmosVibe ensures your brand stands out as the defining gateway to your destination across all channels. We also create a Vibe Signature for your destination, compare and verify it against yours, and give you a clear action plan where there are gaps
          </p>
        </div>

        {/* Linear Stack */}
        <div className="linear-teaser-stack">
          
          {/* TIER 1: Free Vibe Snapshot */}
          <div className="unlock-card free-tier-card animate-fade-up">
            <div className="card-top-bar">
              <div className="step-tag free-tag">STEP 1: FREE VIBE SNAPSHOT</div>
              <span className="price-tag free-price">100% FREE</span>
            </div>

            <div className="tier-content">
              <div className="tier-content-header-row">
                <div>
                  <h3 className="tier-heading">Optimise Your OTA Photos</h3>
                </div>
              </div>

                {/* Visual Interactive Showcase: 5-Photo Strip + Headline Vibe Signature */}
                <div className="visual-photo-reorder">
                  
                  {/* Pulse Indicators Bar */}
                  <div className="pulse-bar-row">
                    <div className="vibe-signature-pulse">
                      <span className="vibe-pulse-dot"></span>
                      <span className="pulse-text">Your Vibe: <strong>Golden-Hour Riverside Drinks &amp; Easy Social Buzz</strong></span>
                    </div>

                    <div className="area-demand-pulse">
                      <span className="pulse-dot"></span>
                      <span className="pulse-text">What guests search for nearby: <strong>Sunset river terraces &amp; walkable local wine bars</strong></span>
                    </div>
                  </div>

                  {/* Side-by-Side Before & After Comparison Containers */}
                  <div className="before-after-collage-row">
                    
                    {/* Before Card: Standard Rooms & Features */}
                    <div className="collage-card before-card">
                      <div className="collage-card-header before-header">
                        <span className="collage-badge before-badge">BEFORE: GENERIC ROOM FIRST</span>
                      </div>
                      
                      <div className="collage-hero-wrap">
                        <img 
                          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80" 
                          alt="Before: Generic Standard Bed" 
                          className="collage-hero-img desaturated"
                        />
                        <div className="collage-slot-tag before-slot-tag">Slot #1: Standard Bed</div>
                        <div className="collage-status-tag before-status-tag">Easy to Scroll Past</div>
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
                        <span>Looks like every other hotel · Hides what makes staying here special</span>
                      </div>
                    </div>

                    {/* After Card: Local Gateway Hook */}
                    <div className="collage-card after-card">
                      <div className="collage-card-header after-header">
                        <span className="collage-badge after-badge">AFTER: VIBE &amp; NEIGHBOURHOOD FIRST</span>
                      </div>

                      <div className="collage-hero-wrap">
                        <img 
                          src="/assets/hook_riverside_bar.jpg" 
                          alt="After: Riverside Restaurant & Bar" 
                          className="collage-hero-img vibrant"
                        />
                        <div className="collage-slot-tag after-slot-tag">Slot #1: Golden-Hour Riverside Bar</div>
                        <div className="collage-status-tag after-status-tag">+4.2s Longer Look</div>
                      </div>

                      <div className="collage-thumbs-strip">
                        <div className="collage-thumb-item">
                          <img src="/assets/hook_riverside_suite.jpg" alt="Slot 2 Quiet Room" />
                          <span className="thumb-cap">#2 Quiet Room</span>
                        </div>
                        <div className="collage-thumb-item">
                          <img src="/assets/hook_riverside_terrace.jpg" alt="Slot 3 Social Sunset Terrace" />
                          <span className="thumb-cap">#3 Sunset Terrace</span>
                        </div>
                        <div className="collage-thumb-item">
                          <img src="/assets/hook_riverside_facade.jpg" alt="Slot 4 Riverside Street Presence" />
                          <span className="thumb-cap">#4 Street Presence</span>
                        </div>
                      </div>

                      <div className="collage-verdict after-verdict">
                        <span>Stops the scroll with evening warmth, real room comfort &amp; local buzz</span>
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
              <div className="tier-content-header-row">
                <div>
                  <h3 className="tier-heading">Stand Out Everywhere Guests Search</h3>
                  <p className="tier-micro-desc">Turn your atmosphere and local destination gems into clear, trustworthy proof across every booking channel</p>
                </div>
              </div>

                {/* Distribution Channel Pill Strip */}
                <div className="channel-distribution-strip">
                  <span className="channel-tag">Booking.com &amp; OTAs</span>
                  <span className="channel-tag">Direct Website</span>
                  <span className="channel-tag">Instagram &amp; Reels</span>
                  <span className="channel-tag">AI Search (ChatGPT &amp; Perplexity)</span>
                </div>

                {/* Streamlined High-Impact Deliverables Grid */}
                <div className="pro-deliverables-compact-grid">
                  <div className="pro-deliverable-card">
                    <div className="pro-deliv-icon-wrap">
                      <Sparkles size={16} className="text-gold" />
                    </div>
                    <div className="pro-deliv-body">
                      <h4 className="pro-deliv-title">First-Impression Photo Order</h4>
                      <p className="pro-deliv-desc">Put your most inviting photo in Slot #1—backed by a bright, honest room and your destination view</p>
                    </div>
                  </div>

                  <div className="pro-deliverable-card">
                    <div className="pro-deliv-icon-wrap">
                      <Compass size={16} className="text-gold" />
                    </div>
                    <div className="pro-deliv-body">
                      <h4 className="pro-deliv-title">Verified 5-Minute Walk Guide</h4>
                      <p className="pro-deliv-desc">Connect your front door to verified 4.5★+ local wine bars, cafés, and markets travellers love</p>
                    </div>
                  </div>

                  <div className="pro-deliverable-card">
                    <div className="pro-deliv-icon-wrap">
                      <Zap size={16} className="text-gold" />
                    </div>
                    <div className="pro-deliv-body">
                      <h4 className="pro-deliv-title">Get Recommended by AI Assistants</h4>
                      <p className="pro-deliv-desc">Give ChatGPT, Gemini &amp; Perplexity the plain-English facts and local links they need to recommend you</p>
                    </div>
                  </div>

                  <div className="pro-deliverable-card">
                    <div className="pro-deliv-icon-wrap">
                      <CheckCircle2 size={16} className="text-gold" />
                    </div>
                    <div className="pro-deliv-body">
                      <h4 className="pro-deliv-title">Social Buzz + Quiet Sleep Proof</h4>
                      <p className="pro-deliv-desc">Show guests where the evening atmosphere comes alive and reassure them they'll sleep soundly upstairs</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="card-footer">
                <Link to="/partner" className="tier-cta-btn pro-btn">
                  <span>Unlock Your Complete Vibe Signature™</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

        </div>

      </div>
    </section>
  );
}
