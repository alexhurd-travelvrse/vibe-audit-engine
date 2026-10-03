import React from 'react';
import './AiFutureGraphic.css';

/**
 * AiFutureGraphic
 * A quirky, futuristic, 100% graphic micro-emblem demonstrating
 * AI compatibility, neural vibe extraction, and multi-channel readiness.
 * Pure vector SVG with glowing cybernetic animations — zero text.
 */
export default function AiFutureGraphic() {
  return (
    <span 
      className="ai-future-graphic-container" 
      title="AtmosVibe AI Engine // Autonomous Agent & Multichannel Ready"
      role="img" 
      aria-label="AI Compatible & Multichannel Ready"
    >
      <svg 
        className="ai-future-svg" 
        viewBox="0 0 110 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cyber capsule gradient background */}
          <linearGradient id="aiCapsuleBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08101e" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#0d1b2e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#150e28" stopOpacity="0.95" />
          </linearGradient>

          {/* Border neon gradient */}
          <linearGradient id="aiBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffd700" stopOpacity="0.8" />
          </linearGradient>

          {/* Core AI iris glow */}
          <radialGradient id="aiIrisGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#00e5ff" />
            <stop offset="85%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          {/* Synapse line glow */}
          <linearGradient id="aiSynapseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>

          {/* Filter for neon bloom */}
          <filter id="aiGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer futuristic capsule chassis */}
        <rect 
          x="1" 
          y="1" 
          width="108" 
          height="30" 
          rx="15" 
          fill="url(#aiCapsuleBg)" 
          stroke="url(#aiBorderGrad)" 
          strokeWidth="1.2" 
          className="ai-chassis"
        />

        {/* --- SECTION 1: Quirky AI Cyber-Eye / Core (Left) --- */}
        <g className="ai-core-group" transform="translate(17, 16)">
          {/* Rotating dashed gyro ring */}
          <circle 
            r="10" 
            stroke="#00e5ff" 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            opacity="0.7" 
            className="ai-gyro-spin" 
          />
          {/* Counter-rotating micro ring */}
          <circle 
            r="7.5" 
            stroke="#c084fc" 
            strokeWidth="0.8" 
            strokeDasharray="2 3" 
            opacity="0.6" 
            className="ai-gyro-spin-reverse" 
          />
          {/* Glowing AI Iris / Core */}
          <circle 
            r="4.8" 
            fill="url(#aiIrisGlow)" 
            className="ai-iris-pulse" 
          />
          {/* Quirky Scanning Pupil / Laser Beam */}
          <g className="ai-pupil-scanner">
            <circle r="1.8" fill="#ffffff" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#00ffff" strokeWidth="0.75" opacity="0.9" />
          </g>
          {/* Top & Bottom cyber ticks */}
          <line x1="0" y1="-11" x2="0" y2="-9" stroke="#00e5ff" strokeWidth="1" />
          <line x1="0" y1="9" x2="0" y2="11" stroke="#00e5ff" strokeWidth="1" />
        </g>

        {/* --- SECTION 2: Synaptic Neural Bus / Quantum Bridge (Center) --- */}
        {/* Animated circuit pathways with moving photons */}
        <path 
          d="M 28 16 L 38 16 M 38 16 L 43 11 L 49 11 M 38 16 L 43 21 L 49 21" 
          stroke="url(#aiSynapseGrad)" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ai-neural-circuit"
        />
        {/* Flowing data pulses */}
        <circle cx="34" cy="16" r="1.2" fill="#00e5ff" className="ai-photon-pulse-1" />
        <circle cx="46" cy="11" r="1.2" fill="#c084fc" className="ai-photon-pulse-2" />
        <circle cx="46" cy="21" r="1.2" fill="#ffd700" className="ai-photon-pulse-3" />

        {/* --- SECTION 3: Multichannel Constellation Nodes (Right) --- */}
        {/* Node 1: OTA Digital Grid / Calendar Channel */}
        <g transform="translate(56, 9)" className="ai-channel-node ai-channel-ota">
          <rect x="0" y="0" width="8" height="8" rx="2" fill="rgba(0, 229, 255, 0.15)" stroke="#00e5ff" strokeWidth="0.8" />
          {/* Micro grid dots */}
          <circle cx="2.5" cy="2.5" r="0.6" fill="#00e5ff" />
          <circle cx="5.5" cy="2.5" r="0.6" fill="#00e5ff" />
          <circle cx="2.5" cy="5.5" r="0.6" fill="#00e5ff" />
          <circle cx="5.5" cy="5.5" r="0.6" fill="#00e5ff" />
        </g>

        {/* Node 2: Spatial Web / AR Visor Channel */}
        <g transform="translate(70, 9)" className="ai-channel-node ai-channel-spatial">
          <path 
            d="M 1 4 C 1 2, 8 2, 8 4 C 8 2, 15 2, 15 4 C 15 6, 8 6, 8 4 C 8 6, 1 6, 1 4 Z" 
            fill="rgba(192, 132, 252, 0.2)" 
            stroke="#c084fc" 
            strokeWidth="0.8" 
          />
          <circle cx="4.5" cy="4" r="0.8" fill="#ffffff" />
          <circle cx="11.5" cy="4" r="0.8" fill="#ffffff" />
        </g>

        {/* Node 3: AI Agent / Autonomous Search Channel */}
        <g transform="translate(58, 20)" className="ai-channel-node ai-channel-agent">
          <polygon points="5,0 9,4 5,8 1,4" fill="rgba(255, 215, 0, 0.2)" stroke="#ffd700" strokeWidth="0.8" />
          <circle cx="5" cy="4" r="1" fill="#ffd700" className="ai-agent-sparkle" />
        </g>

        {/* Node 4: Dynamic Vibe Wave / Social Channel */}
        <g transform="translate(73, 20)" className="ai-channel-node ai-channel-social">
          <path 
            d="M 0 4 Q 3 0, 6 4 T 12 4" 
            stroke="#00e5ff" 
            strokeWidth="1" 
            strokeLinecap="round" 
            fill="none" 
            className="ai-vibe-wave" 
          />
          <circle cx="12" cy="4" r="1.2" fill="#ffd700" />
        </g>

        {/* Inter-node connecting filaments */}
        <line x1="64" y1="13" x2="70" y2="13" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="0.6" strokeDasharray="1 1" />
        <line x1="66" y1="24" x2="73" y2="24" stroke="rgba(255, 215, 0, 0.4)" strokeWidth="0.6" strokeDasharray="1 1" />
        <line x1="60" y1="17" x2="62" y2="20" stroke="rgba(192, 132, 252, 0.4)" strokeWidth="0.6" strokeDasharray="1 1" />

        {/* Satellite Micro Sparkle */}
        <g transform="translate(95, 16)" className="ai-star-sparkle">
          <path 
            d="M 0 -4 L 1.2 -1.2 L 4 0 L 1.2 1.2 L 0 4 L -1.2 1.2 L -4 0 L -1.2 -1.2 Z" 
            fill="#00e5ff" 
            filter="url(#aiGlowFilter)"
          />
          <circle r="0.8" fill="#ffffff" />
        </g>
      </svg>
    </span>
  );
}
