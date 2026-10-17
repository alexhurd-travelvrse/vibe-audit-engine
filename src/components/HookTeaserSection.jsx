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
            Gateway to Your <span className="teaser-title-accent">Neighbourhood</span>
          </h2>
          <p className="teaser-description">
            AtmosVibe ensures your property stands out as the defining gateway to your neighbourhood across all channels
          </p>
        </div>

        {/* Linear Stack */}
        <div className="linear-teaser-stack">
          
          {/* TIER 1: Instant Output (Free) */}
          <div className="unlock-card free-tier-card animate-fade-up">
            <div className="card-top-bar">
              <div className="step-tag free-tag">STEP 1: INSTANT OUTPUT</div>
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
                      <span className="pulse-text">Your Vibe Signature: <strong>Maritime Glamour &amp; Thameside Buzz</strong></span>
                    </div>

                    <div className="area-demand-pulse">
                      <span className="pulse-dot"></span>
                      <span className="pulse-text">Trending in your area: <strong>Riverside terrace &amp; artisan social spots</strong></span>
                    </div>
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
                          src="/assets/hook_riverside_bar.jpg" 
                          alt="After: Riverside Restaurant & Bar" 
                          className="collage-hero-img vibrant"
                        />
                        <div className="collage-slot-tag after-slot-tag">Slot #1: Riverside Bar &amp; Dining</div>
                        <div className="collage-status-tag after-status-tag">+4.2s Dwell</div>
                      </div>

                      <div className="collage-thumbs-strip">
                        <div className="collage-thumb-item">
                          <img src="/assets/hook_riverside_facade.jpg" alt="Slot 2 Riverside Facade" />
                          <span className="thumb-cap">#2 Facade</span>
                        </div>
                        <div className="collage-thumb-item">
                          <img src="/assets/hook_riverside_suite.jpg" alt="Slot 3 Riverview Suite" />
                          <span className="thumb-cap">#3 Suite</span>
                        </div>
                        <div className="collage-thumb-item">
                          <img src="/assets/hook_riverside_terrace.jpg" alt="Slot 4 Social Sunset Terrace" />
                          <span className="thumb-cap">#4 Social</span>
                        </div>
                      </div>

                      <div className="collage-verdict after-verdict">
                        <span>Directly matches Maritime Glamour &amp; Riverside terrace demand</span>
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
                  <h3 className="tier-heading">Stand Out Across All Channels</h3>
                  <p className="tier-micro-desc">Deploy your hotel's distinct cultural gravity across every touchpoint travellers use to choose a destination</p>
                </div>
              </div>

                {/* Distribution Channel Pill Strip */}
                <div className="channel-distribution-strip">
                  <span className="channel-tag">OTAs</span>
                  <span className="channel-tag">Hotel Website</span>
                  <span className="channel-tag">Social Media</span>
                  <span className="channel-tag">AI Search (GEO)</span>
                </div>

                {/* Streamlined High-Impact Deliverables Grid */}
                <div className="pro-deliverables-compact-grid">
                  <div className="pro-deliverable-card">
                    <div className="pro-deliv-icon-wrap">
                      <Sparkles size={16} className="text-gold" />
                    </div>
                    <div className="pro-deliv-body">
                      <h4 className="pro-deliv-title">High-Converting Photo Re-Ordering</h4>
                      <p className="pro-deliv-desc">5-slot sequencing scientifically optimized to match active micro-district search queries</p>
                    </div>
                  </div>

                  <div className="pro-deliverable-card">
                    <div className="pro-deliv-icon-wrap">
                      <Compass size={16} className="text-gold" />
                    </div>
                    <div className="pro-deliv-body">
                      <h4 className="pro-deliv-title">Local Gateway Narrative</h4>
                      <p className="pro-deliv-desc">Compelling storytelling positioning your lobby as the direct portal to neighbourhood culture</p>
                    </div>
                  </div>

                  <div className="pro-deliverable-card">
                    <div className="pro-deliv-icon-wrap">
                      <Zap size={16} className="text-gold" />
                    </div>
                    <div className="pro-deliv-body">
                      <h4 className="pro-deliv-title">AI Search (GEO) Semantic Tags</h4>
                      <p className="pro-deliv-desc">Structured entities ensuring ChatGPT, Gemini &amp; Perplexity recommend your property</p>
                    </div>
                  </div>

                  <div className="pro-deliverable-card">
                    <div className="pro-deliv-icon-wrap">
                      <CheckCircle2 size={16} className="text-gold" />
                    </div>
                    <div className="pro-deliv-body">
                      <h4 className="pro-deliv-title">Neighbourhood Vibe Radar &amp; Benchmarks</h4>
                      <p className="pro-deliv-desc">Subcultural market intelligence monitoring shifting guest demand in real time</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="card-footer">
                <Link to="/partner" className="tier-cta-btn pro-btn">
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
