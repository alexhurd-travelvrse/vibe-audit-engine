import React from 'react';
import { AlertTriangle, TrendingDown, EyeOff, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProblemSection.css';

export default function ProblemSection() {
  return (
    <section className="problem-conversion-section" id="problem">
      <div className="container">
        
        {/* Section Header */}
        <div className="problem-header animate-fade-up">
          <div className="problem-badge">
            <AlertTriangle size={14} className="text-red-warning" />
            <span>THE COMMODITY TRAP</span>
          </div>

          <h2 className="problem-main-title">
            The Problem: <span className="text-red-gradient">The First 5 Photos Kill Your Conversion</span>
          </h2>

          <p className="problem-lead-sentence">
            OTAs force you into a commodity template. Your photos shouldn't follow it.
          </p>

          <p className="problem-sub-lead">
            Most properties lead with a sterile bed, an empty bathroom, and a generic lobby corner. Meanwhile:
          </p>
        </div>

        {/* 2 Big Stat Cards */}
        <div className="problem-stats-grid">
          
          <div className="problem-stat-card animate-fade-up">
            <div className="stat-card-glow-cyan"></div>
            <div className="stat-figure text-cyan">74%</div>
            <div className="stat-label">Neighborhood &amp; Soundscape Priority</div>
            <p className="stat-description">
              <strong>74% of Next-Gen Travelers</strong> research the neighborhood vibe, energy, and soundscape before looking at room specifics.
            </p>
            <div className="stat-footer-badge">
              <Compass size={14} /> Sensory Decision Matrix
            </div>
          </div>

          <div className="problem-stat-card animate-fade-up">
            <div className="stat-card-glow-gold"></div>
            <div className="stat-figure text-gold">&gt;80%</div>
            <div className="stat-label">First 5 Photos Click-Through Impact</div>
            <p className="stat-description">
              <strong>The First 5 Images</strong> determine over 80% of booking click-throughs. If those images don't immediately communicate your property's tempo and culture, you end up competing on price alone.
            </p>
            <div className="stat-footer-badge gold-badge">
              <TrendingDown size={14} /> Price War Vulnerability
            </div>
          </div>

        </div>

        {/* The Scroll Fatigue Breakdown Box */}
        <div className="scroll-fatigue-banner animate-fade-up">
          <div className="banner-icon-col">
            <EyeOff size={32} className="text-red-warning" />
          </div>
          <div className="banner-text-col">
            <h4 className="banner-title">The "OTA Scroll Fatigue" Reality</h4>
            <p className="banner-body">
              Travelers scroll past dozens of identical bed-and-bath thumbnails every minute. When your hero sequence lacks an atmospheric anchor, you blend into the commodity background and bleed high-margin direct guests to OTAs.
            </p>
          </div>
          <div className="banner-action-col">
            <Link to="/audit" className="banner-fix-btn">
              <span>Fix Your Order</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
