import React from 'react';
import { Camera, Sparkles, Music, Share2, Search, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
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
            Prove your hotel is more than just a room. Map your authentic design, energy, lighting, and proximity to local hotspots directly to what next-gen travelers are searching for.
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
              <p className="tier-subtext">Immediate sensory photo reordering mapped to local neighborhood search demand.</p>

              <div className="tree-structure">
                <div className="tree-item">
                  <div className="tree-node-icon cyan-icon">
                    <Camera size={18} />
                  </div>
                  <div className="tree-node-details">
                    <div className="tree-node-title">Reordered Top 5 Hero Photos</div>
                    <div className="tree-node-meta">Ordered by emotional dwell time &amp; traveler hook rate</div>
                  </div>
                </div>

                <div className="tree-branch-line"></div>

                <div className="tree-item">
                  <div className="tree-node-icon cyan-icon">
                    <Sparkles size={18} />
                  </div>
                  <div className="tree-node-details">
                    <div className="tree-node-title">Primary Vibe Archetype</div>
                    <div className="tree-node-meta">e.g., "Golden-Hour Socialite", "Sanctuary Minimalist", or "Maritime Neo-Classic"</div>
                  </div>
                </div>
              </div>

              <div className="tier-badge-strip">
                <span className="feature-pill"><CheckCircle2 size={13} /> 60-Second Run</span>
                <span className="feature-pill"><CheckCircle2 size={13} /> Live Visual Preview</span>
              </div>
            </div>

            <div className="card-footer">
              <Link to="/audit" className="tier-cta-btn free-btn">
                <span>Preview My Vibe Signature Free</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* TIER 2: The Full Vibe Fingerprint™ */}
          <div className="unlock-card pro-tier-card animate-fade-up">
            <div className="card-top-bar">
              <div className="step-tag pro-tag">STEP 2: FULL VIBE FINGERPRINT™</div>
              <span className="price-tag pro-price">CLAIM PROPERTY</span>
            </div>

            <div className="tier-content">
              <h3 className="tier-heading">The Full Multi-Channel Engine</h3>
              <p className="tier-subtext">Comprehensive acoustic, narrative, and AI search assets to make your brand stand out and power bookings across all channels.</p>

              <div className="tree-structure">
                <div className="tree-item">
                  <div className="tree-node-icon gold-icon">
                    <Music size={18} />
                  </div>
                  <div className="tree-node-details">
                    <div className="tree-node-title">Acoustic &amp; Neighborhood Rhythm Index</div>
                    <div className="tree-node-meta">Soundscape profiling, local decibel curves, micro-culture tempo &amp; ambient playlists</div>
                  </div>
                </div>

                <div className="tree-branch-line gold-line"></div>

                <div className="tree-item">
                  <div className="tree-node-icon gold-icon">
                    <Share2 size={18} />
                  </div>
                  <div className="tree-node-details">
                    <div className="tree-node-title">High-Resonance Copy Hooks</div>
                    <div className="tree-node-meta">For Direct Website hero copy, Instagram bio, &amp; pre-stay concierge comms</div>
                  </div>
                </div>

                <div className="tree-branch-line gold-line"></div>

                <div className="tree-item">
                  <div className="tree-node-icon gold-icon">
                    <Search size={18} />
                  </div>
                  <div className="tree-node-details">
                    <div className="tree-node-title">Generative AI Search Optimization (GEO Tags)</div>
                    <div className="tree-node-meta">Structured schema &amp; context tags so ChatGPT, Perplexity &amp; Gemini recommend your vibe</div>
                  </div>
                </div>
              </div>

              <div className="tier-badge-strip">
                <span className="feature-pill gold-pill"><ShieldCheck size={13} /> Verified Ownership</span>
                <span className="feature-pill gold-pill"><Zap size={13} /> Direct Site Boost</span>
                <span className="feature-pill gold-pill"><Search size={13} /> AI Engine Discoverability</span>
              </div>
            </div>

            <div className="card-footer">
              <Link to="/audit" className="tier-cta-btn pro-btn">
                <span>Unlock Full Vibe Fingerprint™</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
