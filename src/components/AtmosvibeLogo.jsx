import React from 'react';

export const AtmosvibeLogo = ({ className = '', style = {} }) => {
  return (
    <div className={`flex items-center select-none ${className}`} style={{ display: 'inline-flex', alignItems: 'center', height: '60px', ...style }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 760 180" 
        style={{ height: '100%', width: 'auto', maxHeight: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="glassRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>

          <radialGradient id="glassBackplate" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#0F172A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
          </radialGradient>

          <linearGradient id="atmosGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="vibeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="translate(48, 20)">
          <circle cx="70" cy="70" r="58" fill="url(#glassBackplate)" stroke="url(#glassRim)" strokeWidth="1.5" />
          <circle cx="70" cy="70" r="46" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.2" />
          <path d="M 48 52 L 70 94 L 92 52" fill="none" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <path d="M 48 52 L 70 94 L 92 52" fill="none" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
          <circle cx="70" cy="106" r="4.5" fill="#F59E0B" filter="url(#goldGlow)" />
          <circle cx="70" cy="106" r="2" fill="#FEF08A" />
          <path d="M 36 36 Q 70 20 104 36 Q 70 30 36 36 Z" fill="#FFFFFF" opacity="0.2" />
        </g>

        <g transform="translate(205, 108)">
          <text fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="64" letterSpacing="-1px">
            <tspan fill="url(#atmosGrad)" fontWeight="300">ATMOS</tspan>
            <tspan fill="url(#vibeGrad)" fontWeight="800">VIBE</tspan>
          </text>
          <circle cx="438" cy="-38" r="4" fill="#F59E0B" filter="url(#goldGlow)" />
        </g>
      </svg>
    </div>
  );
};

export default AtmosvibeLogo;
