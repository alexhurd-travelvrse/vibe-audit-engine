import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrapeLocalSignals, fetchMasterVibeAudit, fetchMasterVibeAuditManifest, fetchMasterVibeAuditPhotos, lookupHotelCandidates } from '../personaEngine';
import HotelVibeManifestCard from './HotelVibeManifestCard';
import BookingOtaAuditCard from './BookingOtaAuditCard';
import InteractiveQuizCard from './InteractiveQuizCard';
import './VibeAuditSearchSection.css';

// Environment detector: Enforce email on live Vercel/Production, bypass on localhost
const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.includes('192.168.') ||
  window.location.hostname.endsWith('.local')
);
const isLiveProduction = !isLocalhost;

const submitLeadToFormspree = async (data) => {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xaqlrjor';
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        hotelName: data.propertyName,
        city: data.city,
        neighborhood: data.neighborhood,
        bookingId: data.bookingId,
        websiteUrl: data.propertyUrl,
        timestamp: new Date().toISOString(),
        source: 'Main Page Search Engine - Lead Gen'
      })
    });
    console.log('[Formspree] Lead captured successfully');
  } catch (err) {
    console.warn('[Formspree] Non-blocking lead capture warning:', err);
  }
};

const VibeAuditSearchSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyName: '',
    city: 'London',
    neighborhood: '',
    bookingId: '',
    email: '',
    propertyUrl: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [ambiguousCandidates, setAmbiguousCandidates] = useState(null);
  const activePhase2AbortRef = useRef(null);

  const executeAudit = async (targetHotel, targetCity, targetNeighborhood, directBookingUrl = null, bookingId = null) => {
    setAmbiguousCandidates(null);
    setLoading(true);
    setProcessingStage(1);

    // Abort any obsolete Phase 2 in-flight request if user submits a new property search
    if (activePhase2AbortRef.current) {
      console.log('[Client] Aborting previous Phase 2 request due to new hotel audit submission.');
      activePhase2AbortRef.current.abort();
    }
    const abortController = new AbortController();
    activePhase2AbortRef.current = abortController;

    try {
      // 1. PHASE 1: Fetch and render Manifest FIRST and ONLY Manifest first
      const masterAudit = await fetchMasterVibeAuditManifest(
        targetHotel,
        targetCity,
        targetNeighborhood,
        directBookingUrl,
        bookingId
      );

      // Render the complete Manifest & strategic text immediately!
      setAnalysis({ signals: { categories: {} }, masterAudit });
      setLoading(false);

      // Background supplemental signals fetch
      scrapeLocalSignals(targetCity, targetNeighborhood).then(sig => {
        if (sig && sig.categories) {
          setAnalysis(prev => prev ? { ...prev, signals: sig } : prev);
        }
      }).catch(err => console.warn('Supplemental signals error:', err));

      // 2. PHASE 2: Background Visual Photo Resolution & Quality Checks
      if (masterAudit && masterAudit.ota_conversion_audit) {
        fetchMasterVibeAuditPhotos(
          targetHotel,
          targetCity,
          targetNeighborhood,
          masterAudit.ota_conversion_audit.optimal_5_photo_sequence,
          abortController.signal,
          directBookingUrl,
          masterAudit.ota_conversion_audit.key_strategic_shifts,
          bookingId
        ).then(photoResults => {
          if (photoResults && photoResults.optimal_5_photo_sequence) {
            setAnalysis(prev => {
              if (!prev || !prev.masterAudit) return prev;
              return {
                ...prev,
                masterAudit: {
                  ...prev.masterAudit,
                  ota_conversion_audit: {
                    ...prev.masterAudit.ota_conversion_audit,
                    is_listed_on_booking: photoResults.is_listed_on_booking,
                    listing_status: photoResults.listing_status,
                    live_photos: photoResults.live_photos,
                    optimal_5_photo_sequence: photoResults.optimal_5_photo_sequence,
                    photos_status: 'RESOLVED'
                  }
                }
              };
            });
          }
        }).catch(photoErr => {
          if (photoErr.name === 'AbortError') {
            console.log('[Photo Gatekeeper] Previous Phase 2 request successfully aborted.');
            return;
          }
          console.warn('[Photo Gatekeeper] Phase 2 resolution error:', photoErr);
        });
      }
    } catch (err) {
      console.error('Audit engine failure:', err);
      setLoading(false);
      alert('Analysis engine encountered a timeout. Please try again.');
    }
  };

  const handleLaunch = async (e) => {
    e.preventDefault();
    setEmailError('');
    const errors = {};

    if (!formData.propertyName || !formData.propertyName.trim()) {
      errors.propertyName = 'Hotel Name is required';
    }
    if (!formData.city || !formData.city.trim()) {
      errors.city = 'City / Primary Market is required';
    }
    const rawBooking = String(formData.bookingId || '').trim();
    if (!rawBooking) {
      errors.bookingId = 'Booking.com ID or URL is required';
    }

    // Require valid work email on live production environments
    if (isLiveProduction) {
      if (!formData.email || !formData.email.trim()) {
        errors.email = 'Please enter your work email to generate your Vibe Audit.';
      } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
        errors.email = 'Please enter a valid work email address.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    let targetHotel = formData.propertyName.trim();
    let targetCity = formData.city.trim();
    let targetNeighborhood = formData.neighborhood ? formData.neighborhood.trim() : '';

    let directBookingUrl = null;
    let cleanId = null;

    if (rawBooking.includes('booking.com')) {
      directBookingUrl = rawBooking;
    } else {
      cleanId = rawBooking.replace(/[^\d]/g, '');
      if (cleanId && cleanId !== '357028') {
        directBookingUrl = `https://www.booking.com/hotel.html?hotel_id=${cleanId}`;
      }
    }

    if (formData.email && formData.email.includes('@')) {
      submitLeadToFormspree({ ...formData, bookingId: cleanId || rawBooking });
    }

    setLoading(true);
    setProcessingStage(1);
    setAmbiguousCandidates(null);

    await executeAudit(targetHotel, targetCity, targetNeighborhood, directBookingUrl, cleanId);
  };

  const handleSelectCandidate = (candidate) => {
    const selectedTitle = candidate.title || formData.propertyName;
    setFormData(prev => ({
      ...prev,
      propertyName: selectedTitle
    }));
    executeAudit(selectedTitle, formData.city || 'London', formData.neighborhood || '', candidate.url);
  };

  return (
    <section id="vibe-audit-engine" className="vibe-search-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header animate-fade-up">
          <h2 className="section-title">
            Vibe <span className="text-cyan">Audit</span>
          </h2>
          <p className="subtitle">
            Atmospheric visual merchandising captures subcultural gravity, eliminates bounce rates, and converts casual browsers into direct bookings.
          </p>
        </div>

        {/* Search Box Container */}
        <div className="vibe-search-wrapper animate-fade-up delay-1">
          <div className="glass-card vibe-search-card">
            <form onSubmit={handleLaunch} className="vibe-search-form">
              
              <div className="vibe-form-grid">
                {/* Hotel Name */}
                <div className="vibe-input-field">
                  <label className="vibe-label">
                    Hotel Name <span style={{ color: '#ef4444', fontWeight: 900 }}>*</span>
                  </label>
                  <div className="vibe-input-wrapper">
                    <Search size={18} className="vibe-input-icon text-cyan" />
                    <input 
                      type="text" 
                      className={`vibe-input ${fieldErrors.propertyName ? 'input-error' : ''}`}
                      placeholder="e.g. Sea Containers London"
                      value={formData.propertyName}
                      onChange={e => {
                        setFieldErrors(prev => ({ ...prev, propertyName: '' }));
                        setFormData({ ...formData, propertyName: e.target.value });
                      }}
                    />
                  </div>
                  {fieldErrors.propertyName && <span className="error-message">⚠️ {fieldErrors.propertyName}</span>}
                </div>

                {/* Primary Market / City */}
                <div className="vibe-input-field">
                  <label className="vibe-label">
                    Primary Market / City <span style={{ color: '#ef4444', fontWeight: 900 }}>*</span>
                  </label>
                  <div className="vibe-input-wrapper">
                    <MapPin size={18} className="vibe-input-icon text-gold" />
                    <input 
                      type="text" 
                      className={`vibe-input ${fieldErrors.city ? 'input-error' : ''}`}
                      placeholder="e.g. London, Miami, Paris"
                      value={formData.city}
                      onChange={e => {
                        setFieldErrors(prev => ({ ...prev, city: '' }));
                        setFormData({ ...formData, city: e.target.value });
                      }}
                    />
                  </div>
                  {fieldErrors.city && <span className="error-message">⚠️ {fieldErrors.city}</span>}
                </div>

                {/* Booking.com Property ID or URL */}
                <div className="vibe-input-field">
                  <label className="vibe-label">
                    Booking.com ID or URL <span style={{ color: '#ef4444', fontWeight: 900 }}>*</span>
                  </label>
                  <div className="vibe-input-wrapper">
                    <Hash size={18} className="vibe-input-icon text-cyan" />
                    <input 
                      type="text" 
                      className={`vibe-input ${fieldErrors.bookingId ? 'input-error' : ''}`}
                      placeholder="e.g. 1048291 or Booking.com URL"
                      value={formData.bookingId}
                      onChange={e => {
                        setFieldErrors(prev => ({ ...prev, bookingId: '' }));
                        setFormData({ ...formData, bookingId: e.target.value });
                      }}
                    />
                  </div>
                  {fieldErrors.bookingId && <span className="error-message">⚠️ {fieldErrors.bookingId}</span>}
                </div>

                {/* Neighborhood (Optional) */}
                <div className="vibe-input-field">
                  <label className="vibe-label">Neighborhood (Optional)</label>
                  <div className="vibe-input-wrapper">
                    <Globe size={18} className="vibe-input-icon text-gold" />
                    <input 
                      type="text" 
                      className="vibe-input" 
                      placeholder="e.g. South Bank, Soho"
                      value={formData.neighborhood}
                      onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div className="vibe-input-field">
                  <label className="vibe-label">
                    Work Email {isLiveProduction ? <span style={{ color: '#ef4444', fontWeight: 900 }}>*</span> : <span className="optional-tag">(Optional in Dev)</span>}
                  </label>
                  <div className="vibe-input-wrapper">
                    <Zap size={18} className="vibe-input-icon text-cyan" />
                    <input 
                      type="email" 
                      className={`vibe-input ${fieldErrors.email || emailError ? 'input-error' : ''}`}
                      placeholder="name@hotelgroup.com"
                      value={formData.email}
                      onChange={e => {
                        setEmailError('');
                        setFieldErrors(prev => ({ ...prev, email: '' }));
                        setFormData({ ...formData, email: e.target.value });
                      }}
                    />
                  </div>
                  {(fieldErrors.email || emailError) && <span className="error-message">⚠️ {fieldErrors.email || emailError}</span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="vibe-action-row">
                <button type="submit" className="btn btn-primary vibe-launch-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="spinner-mini" />
                      <span>ANALYZING SIGNALS...</span>
                    </>
                  ) : (
                    <>
                      <span>LAUNCH VIBE AUDIT</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>

              {/* Micro-Consent Disclaimer */}
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', lineHeight: 1.5, margin: 0 }}>
                  🔒 By clicking <strong>Launch Vibe Audit</strong>, you agree to our{' '}
                  <Link to="/terms" style={{ color: '#00e5ff', textDecoration: 'underline' }}>Terms & Conditions</Link>{' '}
                  and acknowledge our{' '}
                  <Link to="/privacy" style={{ color: '#00e5ff', textDecoration: 'underline' }}>Privacy Policy</Link>. 
                  Your work email is used to authenticate your audit and deliver diagnostic reports. We never spam.
                </p>
              </div>

            </form>
          </div>
        </div>

        {/* Ambiguous Property Disambiguation Selector */}
        <AnimatePresence>
          {ambiguousCandidates && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="disambiguation-container glass-card"
            >
              <div className="disambiguation-header">
                <span className="disambiguation-pill">SELECT EXACT PROPERTY</span>
                <h3 className="disambiguation-title">Multiple Matching Properties Found</h3>
                <p className="disambiguation-subtitle">
                  We found {ambiguousCandidates.length} properties matching "{formData.propertyName}" in {formData.city}. Which property would you like to audit?
                </p>
              </div>
              <div className="disambiguation-cards-grid">
                {ambiguousCandidates.map((c, idx) => (
                  <div 
                    key={c.slug || idx} 
                    className="disambiguation-card"
                    onClick={() => handleSelectCandidate(c)}
                  >
                    <div className="disambiguation-card-header">
                      <span className="disambiguation-card-num">Option #{idx + 1}</span>
                      <span className="disambiguation-card-tag">Verified Hotel</span>
                    </div>
                    <h4 className="disambiguation-card-name">{c.title}</h4>
                    {c.snippet && (
                      <p className="disambiguation-card-snippet">{c.snippet}</p>
                    )}
                    <button 
                      type="button" 
                      className="btn btn-outline disambiguation-select-btn"
                    >
                      Audit This Hotel →
                    </button>
                  </div>
                ))}
              </div>
              <div className="disambiguation-actions">
                <button 
                  type="button" 
                  className="btn btn-ghost-cancel"
                  onClick={() => setAmbiguousCandidates(null)}
                >
                  ✕ Cancel & Refine Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="audit-loading-banner glass-card"
            >
              <div className="spinner-glow" />
              <div className="loading-text">
                <h3>Synthesizing Hotel Vibe Manifest & Acoustic DNA</h3>
                <p>Synthesizing cultural gravity, acoustic architecture, and design manifest for <strong>{formData.propertyName || 'Property'}</strong> in {formData.neighborhood}, {formData.city}...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Inline Analysis Results */}
        <AnimatePresence>
          {analysis && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="audit-inline-results"
            >
              <div className="results-header-banner glass-card">
                <div>
                  <h3 className="results-hotel-title">{formData.propertyName || 'Property Vibe Report'}</h3>
                  <p className="results-location"><MapPin size={16} className="text-cyan" /> {formData.neighborhood}, {formData.city}</p>
                </div>
                <div className="results-actions">
                  <button 
                    onClick={() => {
                      setAnalysis(null);
                      window.scrollTo({ top: document.getElementById('vibe-audit-engine')?.offsetTop - 80, behavior: 'smooth' });
                    }} 
                    className="btn btn-outline"
                    style={{ fontSize: '0.85rem', padding: '8px 18px' }}
                  >
                    New Search
                  </button>
                </div>
              </div>

              {/* Master Vibe Manifest Card */}
              {analysis.masterAudit && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <HotelVibeManifestCard 
                    manifest={analysis.masterAudit} 
                    hotelName={formData.propertyName || 'Property'} 
                    location={`${formData.neighborhood}, ${formData.city}`} 
                  />
                </div>
              )}

              {/* Booking.com OTA Conversion Audit */}
              {analysis.masterAudit?.ota_conversion_audit && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <BookingOtaAuditCard 
                    otaData={analysis.masterAudit.ota_conversion_audit} 
                    hotelName={formData.propertyName || 'Property'} 
                  />
                </div>
              )}

              {/* Interactive Quiz Card */}
              {analysis.masterAudit?.interactive_quiz_challenge && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <InteractiveQuizCard 
                    quizData={analysis.masterAudit.interactive_quiz_challenge} 
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default VibeAuditSearchSection;
