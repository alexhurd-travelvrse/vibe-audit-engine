import React from 'react';

export const ResonexLogo = ({ className = '', style = {} }) => {
  return (
    <div className={`flex items-center select-none ${className}`} style={{ display: 'inline-flex', alignItems: 'center', height: '60px', ...style }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 760 180" 
        style={{ height: '100%', width: 'auto', maxHeight: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="rx2_rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>

          <radialGradient id="rx2_glassFill" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#0F172A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.65" />
          </radialGradient>

          <linearGradient id="rx2_cyanConduit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <linearGradient id="rx2_goldConduit" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          <linearGradient id="rx2_resonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="rx2_exGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <filter id="rx2_goldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="translate(48, 16)">
          <circle cx="74" cy="74" r="56" fill="url(#rx2_glassFill)" stroke="url(#rx2_rimGrad)" strokeWidth="1.5" />
          <circle cx="74" cy="74" r="44" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.2" />
          <line x1="42" y1="42" x2="60" y2="60" stroke="url(#rx2_cyanConduit)" strokeWidth="5" strokeLinecap="round" />
          <line x1="88" y1="88" x2="106" y2="106" stroke="url(#rx2_cyanConduit)" strokeWidth="5" strokeLinecap="round" />
          <line x1="42" y1="106" x2="60" y2="88" stroke="url(#rx2_goldConduit)" strokeWidth="5" strokeLinecap="round" />
          <line x1="88" y1="60" x2="106" y2="42" stroke="url(#rx2_goldConduit)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="74" cy="74" r="14" fill="#0A101D" stroke="url(#rx2_rimGrad)" strokeWidth="1.5" />
          <circle cx="74" cy="74" r="9" fill="none" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.4" />
          <circle cx="74" cy="74" r="4" fill="#F59E0B" filter="url(#rx2_goldGlow)" />
          <circle cx="74" cy="74" r="1.5" fill="#FFFFFF" />
          <path d="M 40 40 Q 74 24 108 40 Q 74 34 40 40 Z" fill="#FFFFFF" opacity="0.2" />
        </g>

        <g transform="translate(205, 108)">
          <text fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="64" letterSpacing="-1.2px">
            <tspan fill="url(#rx2_resonGrad)" fontWeight="300">RESON</tspan>
            <tspan fill="url(#rx2_exGrad)" fontWeight="800">EX</tspan>
          </text>
          <circle cx="438" cy="-38" r="4" fill="#F59E0B" filter="url(#rx2_goldGlow)" />
        </g>
      </svg>
    </div>
  );
};

export default ResonexLogo;
