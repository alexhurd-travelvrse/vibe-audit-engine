import React, { useState } from 'react';
import './GetAiReadyBadge.css';

/**
 * GetAiReadyBadge
 * A quirky, futuristic, interactive micro-badge combining developer HTTP humor,
 * an animated winking cyber-bot, a live radar status beacon, and the callout:
 * "GET AI READY".
 */
export default function GetAiReadyBadge() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);

    // Smooth scroll to the Enterprise Vibe API & AI layer if available
    const el = document.getElementById('vibe-api');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <span 
      className={`get-ai-ready-badge ${clicked ? 'badge-activated' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="AtmosVibe AI Engine // Autonomous Agent, Spatial Web & Multichannel Ready"
    >
      {/* 1. Live Radar Status Beacon (Green/Cyan Ping) */}
      <span className="badge-beacon-wrapper">
        <span className="badge-beacon-ping"></span>
        <span className="badge-beacon-dot"></span>
      </span>

      {/* 2. Quirky Developer HTTP Method Token */}
      <span className="badge-method-tag">GET</span>

      {/* 3. Core Text: AI READY */}
      <span className="badge-ready-text">AI READY</span>

      {/* 4. Quirky Animated Cyber-Bot with Winking Eyes */}
      <span className="badge-bot-wrapper">
        <svg 
          viewBox="0 0 20 20" 
          fill="none" 
          className="badge-bot-svg" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Antenna */}
          <line x1="10" y1="4" x2="10" y2="1.5" stroke="#00e5ff" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="10" cy="1.5" r="1.4" fill="#ffd700" className="bot-antenna-beacon" />

          {/* Robot Head */}
          <rect x="3" y="4" width="14" height="11" rx="3.5" fill="#0d1b2e" stroke="#00e5ff" strokeWidth="1.1" />

          {/* Visor Area */}
          <rect x="5" y="6.5" width="10" height="5" rx="2" fill="#050b14" />

          {/* Left Eye (Open/Pulsing) */}
          <circle cx="7.5" cy="9" r="1.3" fill="#00e5ff" className="bot-eye-left" />

          {/* Right Eye (Playful Wink Animation) */}
          <path d="M 11.2 9 Q 12.5 7.6 13.8 9" stroke="#ffd700" strokeWidth="1.3" strokeLinecap="round" className="bot-eye-right" />

          {/* Rosy Cheek Micro-Blush (Quirky Fun Factor) */}
          <circle cx="5.2" cy="12" r="0.75" fill="rgba(244, 114, 182, 0.7)" />
          <circle cx="14.8" cy="12" r="0.75" fill="rgba(244, 114, 182, 0.7)" />

          {/* Mini Sparkle Star Orbiting */}
          <path 
            d="M 17 3 L 17.8 4.2 L 19 5 L 17.8 5.8 L 17 7 L 16.2 5.8 L 15 5 L 16.2 4.2 Z" 
            fill="#ffd700" 
            className="bot-sparkle-star" 
          />
        </svg>
      </span>

      {/* 5. Holographic Laser Shimmer Sweep across pill */}
      <span className="badge-shimmer-sheen"></span>
    </span>
  );
}
