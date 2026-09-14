import React from 'react';

export const AmbidexLogo = ({ className = '', style = {} }) => {
  return (
    <div className={`flex items-center select-none ${className}`} style={{ display: 'inline-flex', alignItems: 'center', height: '60px', ...style }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 760 180" 
        style={{ height: '100%', width: 'auto', maxHeight: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="ad_rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#00E5FF" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
          </linearGradient>

          <radialGradient id="ad_glassFill" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#0F172A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.68" />
          </radialGradient>

          <linearGradient id="ad_bracketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="ad_hairlineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="ad_ambiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="ad_dexGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <filter id="ad_cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="translate(48, 16)">
          <circle cx="74" cy="74" r="54" fill="url(#ad_glassFill)" stroke="url(#ad_rimGrad)" strokeWidth="1.25" />
          <circle cx="74" cy="74" r="42" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="2 3" />
          <circle cx="74" cy="74" r="28" fill="none" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.35" />
          <line x1="74" y1="24" x2="74" y2="34" stroke="url(#ad_hairlineGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="74" y1="114" x2="74" y2="124" stroke="url(#ad_hairlineGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="74" x2="34" y2="74" stroke="url(#ad_hairlineGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="114" y1="74" x2="124" y2="74" stroke="url(#ad_hairlineGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 44 48 L 32 48 L 32 100 L 44 100" fill="none" stroke="url(#ad_bracketGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="74" r="2" fill="#00E5FF" filter="url(#ad_cyanGlow)" />
          <path d="M 104 48 L 116 48 L 116 100 L 104 100" fill="none" stroke="url(#ad_bracketGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="116" cy="74" r="2" fill="#00E5FF" filter="url(#ad_cyanGlow)" />
          <circle cx="74" cy="74" r="11" fill="#0A101D" stroke="#00E5FF" strokeWidth="1.25" strokeOpacity="0.8" />
          <circle cx="74" cy="74" r="4.5" fill="#00E5FF" filter="url(#ad_cyanGlow)" />
          <circle cx="74" cy="1.5" r="1.5" fill="#FFFFFF" />
          <path d="M 42 42 Q 74 28 106 42 Q 74 36 42 42 Z" fill="#FFFFFF" opacity="0.22" />
        </g>

        <g transform="translate(205, 106)">
          <text fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="64" letterSpacing="-1.2px">
            <tspan fill="url(#ad_ambiGrad)" fontWeight="300">AMBI</tspan>
            <tspan fill="url(#ad_dexGrad)" fontWeight="800">DEX</tspan>
          </text>
          <circle cx="462" cy="-38" r="4" fill="#00E5FF" filter="url(#ad_cyanGlow)" />
        </g>
      </svg>
    </div>
  );
};

export default AmbidexLogo;
