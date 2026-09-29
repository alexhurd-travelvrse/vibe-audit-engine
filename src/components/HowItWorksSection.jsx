import React from 'react';
import { Link2, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HowItWorksSection.css';

const STEPS = [
  {
    num: "01",
    title: "Paste Your Listing",
    body: "Drop in your Booking.com or OTA URL.",
    icon: <Link2 size={24} className="text-cyan" />,
    badge: "INSTANT INPUT"
  },
  {
    num: "02",
    title: "AI Vibe & Visual Re-Sequence",
    body: "Our engine analyzes your imagery against emotional dwell metrics and re-sequences your gallery to lead with high-vibe sensory anchors.",
    icon: <Cpu size={24} className="text-gold" />,
    badge: "SENSORY ANALYSIS"
  },
  {
    num: "03",
    title: "Unlock Your Vibe Fingerprint™",
    body: "See your top visual fix immediately, then unlock your full multi-channel conversion pack—from direct booking copy to AI travel search indexing.",
    icon: <Sparkles size={24} className="text-cyan" />,
    badge: "MULTI-CHANNEL PACK"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="how-it-works-streamlined" id="how-it-works">
      <div className="container">
        
        {/* Section Header */}
        <div className="hiw-header animate-fade-up">
          <div className="hiw-badge">THE WORKFLOW</div>
          <h2 className="hiw-title">
            How It <span className="text-cyan">Works</span>
          </h2>
          <p className="hiw-subtitle">
            From raw listing URL to high-converting photo order in three simple steps.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="hiw-cards-grid">
          {STEPS.map((s, idx) => (
            <div key={idx} className="hiw-step-card animate-fade-up">
              <div className="step-card-header">
                <span className="step-number">{s.num}</span>
                <span className="step-type-badge">{s.badge}</span>
              </div>
              <div className="step-icon-bubble">
                {s.icon}
              </div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="hiw-action-strip animate-fade-up">
          <div className="strip-text">
            Ready to test your property? It takes under 60 seconds.
          </div>
          <Link to="/audit" className="strip-cta-btn">
            <span>Test My Listing Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
