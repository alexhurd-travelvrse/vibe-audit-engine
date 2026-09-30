import React from 'react';
import { XCircle, CheckCircle2, Flame, Sparkles, TrendingUp, AlertOctagon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ComparisonBlock.css';

const STANDARD_OTA_ITEMS = [
  {
    slot: 1,
    title: "Wide-angle empty standard bedroom",
    critique: "Sterile wide shot. Blends into every other hotel in the destination search results.",
    vibeImpact: "😴 Passive / Commodity",
    dwellRating: "0.8s avg dwell"
  },
  {
    slot: 2,
    title: "Bathroom sink & mirror",
    critique: "Clinical checklist photo before the guest has even developed an emotional attachment.",
    vibeImpact: "🚿 Routine Utility",
    dwellRating: "0.5s avg dwell"
  },
  {
    slot: 3,
    title: "Reception desk",
    critique: "Reminds guest of wait times, check-in friction, and hotel bureaucracy.",
    vibeImpact: "📋 Administrative",
    dwellRating: "0.4s avg dwell"
  },
  {
    slot: 4,
    title: "Hallway",
    critique: "Carpet and doors. Pure dead space that accelerates swipe-away fatigue.",
    vibeImpact: "🚪 Zero Resonance",
    dwellRating: "0.3s avg dwell"
  },
  {
    slot: 5,
    title: "Exterior building shot",
    critique: "Generic street-level architecture with traffic; fails to convey hospitality tempo.",
    vibeImpact: "🏢 Distant Concrete",
    dwellRating: "0.6s avg dwell"
  }
];

const ATMOSVIBE_ITEMS = [
  {
    slot: 1,
    title: "Golden-hour courtyard / social anchor",
    benefit: "Hero Cultural Magnet. Hooks high-intent guests immediately and halts OTA scroll fatigue.",
    vibeAnchor: "Cultural Magnet",
    dwellRating: "+4.2s emotional dwell"
  },
  {
    slot: 2,
    title: "Curated interior detail / texture & lighting",
    benefit: "Tactile craftsmanship, atmospheric ambient lighting, and bespoke design identity.",
    vibeAnchor: "Tactile Architecture",
    dwellRating: "+3.1s sensory dwell"
  },
  {
    slot: 3,
    title: "Local neighborhood energy / step-out scene",
    benefit: "Connects with 74% of guests who book the local vibe before the room.",
    vibeAnchor: "Neighborhood Rhythm",
    dwellRating: "+3.8s context dwell"
  },
  {
    slot: 4,
    title: "Hero bedroom with natural light",
    benefit: "Aspirational sanctuary bathed in natural sunlight. Now the guest wants to sleep here.",
    vibeAnchor: "Sanctuary Haven",
    dwellRating: "+3.5s booking intent"
  },
  {
    slot: 5,
    title: "Signature amenity (vinyl bar, plunge pool, communal table)",
    benefit: "The definitive memory-maker that seals the booking decision and justifies premium ADR.",
    vibeAnchor: "Experiential Anchor",
    dwellRating: "+4.0s checkout trigger"
  }
];

export default function ComparisonBlock() {
  return (
    <section className="comparison-proof-section" id="proof-comparison">
      <div className="container">
        
        {/* Header */}
        <div className="comparison-header animate-fade-up">
          <div className="proof-pill">
            <Sparkles size={14} className="text-gold" />
            <span>PROOF &amp; SEQUENCE SCIENCE</span>
          </div>
          <h2 className="comparison-title">
            The Proof: <span className="text-cyan">Standard OTA Sequence vs. AtmosVibe Reorder</span>
          </h2>
          <p className="comparison-sub">
            OTAs default to a sterile commodity sequence that hurts conversion. The AtmosVibe Reorder sequence captures high-value dwell time and converts casual lookers into bookings
          </p>
        </div>

        {/* Dual Column Comparison Grid */}
        <div className="comparison-grid">
          
          {/* LEFT: Standard OTA Sequence */}
          <div className="sequence-column loser-column animate-fade-up">
            <div className="col-top loser-top">
              <div className="col-status-tag loser-tag">
                <AlertOctagon size={14} />
                LEAKING ATTENTION &amp; CONVERSION
              </div>
              <h3 className="col-heading">The Standard OTA Sequence</h3>
              <p className="col-subheading">Algorithm-driven default order that drives price shopping</p>
            </div>

            <div className="slot-list">
              {STANDARD_OTA_ITEMS.map((item) => (
                <div key={item.slot} className="comparison-slot loser-slot">
                  <div className="slot-indicator loser-indicator">
                    <span className="slot-num">{item.slot}</span>
                    <XCircle size={16} className="text-red-warning" />
                  </div>
                  <div className="slot-content">
                    <div className="slot-title-row">
                      <h4 className="slot-title">{item.title}</h4>
                      <span className="slot-dwell-loser">{item.dwellRating}</span>
                    </div>
                    <p className="slot-critique">{item.critique}</p>
                    <div className="slot-meta-row">
                      <span className="loser-vibe-pill">{item.vibeImpact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-bottom loser-bottom">
              <div className="bottom-metric-loser">
                <span className="metric-callout">-15% Dwell &amp; Conversion</span>
                <span className="metric-note">Forces race-to-the-bottom discounting</span>
              </div>
            </div>
          </div>

          {/* RIGHT: AtmosVibe Reorder Sequence */}
          <div className="sequence-column winner-column animate-fade-up">
            <div className="col-top winner-top">
              <div className="col-status-tag winner-tag">
                <Flame size={14} />
                ATMOSVIBE REORDER
              </div>
              <h3 className="col-heading text-cyan">The AtmosVibe Reorder</h3>
              <p className="col-subheading">Sensory dwell engineering that sells atmosphere and lifts ADR</p>
            </div>

            <div className="slot-list">
              {ATMOSVIBE_ITEMS.map((item) => (
                <div key={item.slot} className="comparison-slot winner-slot">
                  <div className="slot-indicator winner-indicator">
                    <span className="slot-num gold-num">{item.slot}</span>
                    <CheckCircle2 size={16} className="text-cyan" />
                  </div>
                  <div className="slot-content">
                    <div className="slot-title-row">
                      <h4 className="slot-title text-white">{item.title}</h4>
                      <span className="slot-dwell-winner">{item.dwellRating}</span>
                    </div>
                    <p className="slot-benefit">{item.benefit}</p>
                    <div className="slot-meta-row">
                      <span className="winner-vibe-pill">{item.vibeAnchor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-bottom winner-bottom">
              <div className="bottom-metric-winner">
                <span className="metric-callout-gold">+18% First-Impression Hook Rate</span>
                <span className="metric-note-cyan">Stops OTA scroll fatigue in under 1.5 seconds</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
