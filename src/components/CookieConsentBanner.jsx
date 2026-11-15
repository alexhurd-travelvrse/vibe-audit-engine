import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check, Shield } from 'lucide-react';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('atmosvibe_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('atmosvibe_cookie_consent', 'accepted');
    if (typeof window.__setVercelAnalyticsIgnore === 'function') {
      window.__setVercelAnalyticsIgnore(false);
    }
    setIsVisible(false);
  };

  const handleDeclineNonEssential = () => {
    localStorage.setItem('atmosvibe_cookie_consent', 'rejected');
    if (typeof window.__setVercelAnalyticsIgnore === 'function') {
      window.__setVercelAnalyticsIgnore(true);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '20px',
        right: '20px',
        maxWidth: '680px',
        margin: '0 auto',
        zIndex: 99990,
        background: 'rgba(10, 16, 30, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(56, 189, 248, 0.28)',
        borderRadius: '16px',
        padding: '20px 24px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.1)',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
        animation: 'slideUp 0.3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div
          style={{
            padding: '10px',
            borderRadius: '12px',
            background: 'rgba(56, 189, 248, 0.12)',
            color: '#38bdf8',
            flexShrink: 0
          }}
        >
          <Cookie size={24} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#f8fafc' }}>
              Cookie &amp; Privacy Notice
            </h3>
            <button
              onClick={handleDeclineNonEssential}
              aria-label="Dismiss and use essential only"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>

          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 16px 0' }}>
            We use essential cookies and anonymous analytics to understand how hospitality partners explore Vibe
            Signatures and benchmark studies. We never sell your data or deploy cross-site advertising trackers. Read our{' '}
            <Link to="/cookies" style={{ color: '#38bdf8', textDecoration: 'underline', fontWeight: 500 }}>
              Cookie Policy
            </Link>
            .
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleAcceptAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                transition: 'opacity 0.2s'
              }}
            >
              <Check size={15} /> Accept All
            </button>

            <button
              onClick={handleDeclineNonEssential}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#cbd5e1',
                fontWeight: 600,
                fontSize: '13px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              <Shield size={14} /> Essential Only
            </button>

            <Link
              to="/cookies"
              style={{
                fontSize: '12px',
                color: '#94a3b8',
                textDecoration: 'none',
                marginLeft: 'auto',
                padding: '6px 8px'
              }}
            >
              Customise &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
