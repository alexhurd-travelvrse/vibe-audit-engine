import React, { useState, useEffect } from 'react';
import { Lock, Key, Sparkles, CheckCircle2, X, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import './GatedSectionAuth.css';

// Shared Hook to detect & dispatch auth state changes
export function useAuthGate() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('atmosvibe_pro_unlocked') === 'true' || 
             sessionStorage.getItem('atmosvibe_registered') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const unlocked = sessionStorage.getItem('atmosvibe_pro_unlocked') === 'true' || 
                       sessionStorage.getItem('atmosvibe_registered') === 'true';
      setIsUnlocked(unlocked);
    };

    window.addEventListener('atmosvibe-auth-change', handleAuthChange);
    return () => window.removeEventListener('atmosvibe-auth-change', handleAuthChange);
  }, []);

  const unlock = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('atmosvibe_pro_unlocked', 'true');
      sessionStorage.setItem('atmosvibe_registered', 'true');
      window.dispatchEvent(new Event('atmosvibe-auth-change'));
    }
    setIsUnlocked(true);
  };

  const lock = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('atmosvibe_pro_unlocked');
      sessionStorage.removeItem('atmosvibe_registered');
      window.dispatchEvent(new Event('atmosvibe-auth-change'));
    }
    setIsUnlocked(false);
  };

  return { isUnlocked, unlock, lock };
}

// Lock Overlay Card displayed directly over gated sections
export function GatedSectionLock({
  badgeLabel = "PRIVATE BETA · REGISTRATION REQUIRED",
  title = "Unlock Full Suite Access",
  description = "This section is currently available to verified clients and registered partners.",
  perks = [],
  onRegisterClick,
  onLoginClick
}) {
  return (
    <div className="gated-overlay-container">
      <div className="gated-lock-card">
        <div className="gated-lock-icon-wrap">
          <Lock size={28} />
        </div>
        
        <div className="gated-lock-badge">
          <Sparkles size={12} /> {badgeLabel}
        </div>

        <h3 className="gated-lock-title">{title}</h3>
        <p className="gated-lock-desc">{description}</p>

        {perks && perks.length > 0 && (
          <ul className="gated-unlock-perks">
            {perks.map((perk, idx) => (
              <li key={idx} className="gated-unlock-perk-item">
                <CheckCircle2 size={16} color="#00e5ff" style={{ flexShrink: 0 }} />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="gated-lock-actions">
          <button onClick={onRegisterClick} className="gated-btn-primary">
            <Sparkles size={16} />
            <span>Register for Free Access</span>
          </button>
          
          <button onClick={onLoginClick} className="gated-btn-secondary">
            <Key size={15} />
            <span>Client Log In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Authentication & Registration Modals
export function AuthModals({
  isRegisterOpen,
  isLoginOpen,
  onClose,
  onSuccess
}) {
  // Registration Form State
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    company: '',
    role: 'hotel'
  });
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  // Login Form State
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsRegisterSubmitting(true);
    try {
      await fetch('https://formspree.io/f/xaqlrjor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...registerForm,
          form_type: 'AtmosVibe Early Access Member Registration',
          registered_at: new Date().toISOString()
        })
      });
      setIsRegisterSuccess(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('atmosvibe_pro_unlocked', 'true');
        sessionStorage.setItem('atmosvibe_registered', 'true');
        window.dispatchEvent(new Event('atmosvibe-auth-change'));
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.warn('Registration note:', err);
      // Auto-unlock even if offline/dev
      setIsRegisterSuccess(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('atmosvibe_pro_unlocked', 'true');
        sessionStorage.setItem('atmosvibe_registered', 'true');
        window.dispatchEvent(new Event('atmosvibe-auth-change'));
      }
      if (onSuccess) onSuccess();
    } finally {
      setIsRegisterSubmitting(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanPass = loginPass.trim().toLowerCase();
    // Allow 'atmosvibe', 'travelvrse', or valid email
    if (cleanPass === 'atmosvibe' || cleanPass === 'travelvrse' || (cleanPass.includes('@') && cleanPass.includes('.'))) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('atmosvibe_pro_unlocked', 'true');
        sessionStorage.setItem('atmosvibe_registered', 'true');
        window.dispatchEvent(new Event('atmosvibe-auth-change'));
      }
      if (onSuccess) onSuccess();
      onClose();
      setLoginPass('');
      setLoginError('');
    } else {
      setLoginError('Invalid access code. Please use member code "atmosvibe" or register for free access.');
    }
  };

  return (
    <>
      {/* REGISTRATION MODAL */}
      {isRegisterOpen && (
        <div className="auth-modal-overlay" onClick={onClose}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            {!isRegisterSuccess ? (
              <>
                <div className="auth-modal-header">
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00e5ff', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                    <ShieldCheck size={14} /> Free Member Registration
                  </div>
                  <h3 className="auth-modal-title">Unlock Early Beta Access</h3>
                  <p className="auth-modal-subtitle">
                    Register below to immediately access the AtmosVibe Enterprise VIBE API sandbox and Global Market Vibe Maps.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="auth-modal-form">
                  <div className="auth-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Vance"
                      className="auth-form-input"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    />
                  </div>

                  <div className="auth-form-row">
                    <div className="auth-form-group">
                      <label>Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="jordan@hotelgroup.com"
                        className="auth-form-input"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      />
                    </div>
                    <div className="auth-form-group">
                      <label>Company / Venue *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alma Collection / Platform"
                        className="auth-form-input"
                        value={registerForm.company}
                        onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="auth-form-group">
                    <label>Primary Focus</label>
                    <select
                      className="auth-form-select"
                      value={registerForm.role}
                      onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                    >
                      <option value="hotel">Hotel / Boutique Venue Owner</option>
                      <option value="ota">OTA / Booking Platform / App</option>
                      <option value="concierge">Travel Concierge / Itinerary Designer</option>
                      <option value="developer">Developer / Data Licensing</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isRegisterSubmitting}
                    className="gated-btn-primary"
                    style={{ width: '100%', marginTop: '0.5rem', padding: '14px' }}
                  >
                    {isRegisterSubmitting ? 'Registering...' : 'Register & Unlock Immediate Access'}
                    <ArrowRight size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <CheckCircle2 size={32} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.6rem' }}>
                  Access Granted!
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Welcome! The VIBE API and VIBE INSIGHTS sections are now unlocked across your session.
                </p>
                <button
                  onClick={() => { setIsRegisterSuccess(false); onClose(); }}
                  className="gated-btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                >
                  Explore Unlocked Features
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="auth-modal-overlay" onClick={onClose}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            <div className="auth-modal-header">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ffd700', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                <Key size={14} /> Member Access
              </div>
              <h3 className="auth-modal-title">Client Pass Code Log In</h3>
              <p className="auth-modal-subtitle">
                Enter your client pass code or registered email to immediately unlock the suite.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="auth-modal-form">
              <div className="auth-form-group">
                <label>Pass Code or Registered Email</label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Enter pass code (e.g. atmosvibe)"
                  className="auth-form-input"
                  value={loginPass}
                  onChange={(e) => {
                    setLoginPass(e.target.value);
                    setLoginError('');
                  }}
                />
              </div>

              {loginError && (
                <div className="auth-form-error">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="gated-btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', padding: '14px' }}
              >
                <span>Unlock Member Access</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    // trigger registration
                    window.dispatchEvent(new CustomEvent('atmosvibe-open-register'));
                  }}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Don't have a code? Register for free access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
