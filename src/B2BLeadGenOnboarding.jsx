import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Send, Star, MapPin, TrendingUp, Search, Globe, Zap, CheckCircle2, BarChart3, ExternalLink, Gift, RefreshCw, Activity, Info, Compass, Radio, Layers, Cpu, Sparkles, Lock, Unlock, Key, ShieldCheck, X, Mail, Phone, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  scrapeLocalSignals, 
  auditDiscoverability, 
  generatePropulsionQuest,
  fetchMasterVibeAudit,
  fetchMasterVibeAuditManifest,
  fetchMasterVibeAuditPhotos,
  lookupHotelCandidates
} from './personaEngine';
import HotelVibeManifestCard from './components/HotelVibeManifestCard';
import InteractiveQuizCard from './components/InteractiveQuizCard';
import BookingOtaAuditCard from './components/BookingOtaAuditCard';
import './B2BLeadGenOnboarding.css';

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
        websiteUrl: data.propertyUrl,
        instagramUrl: data.instagramUrl,
        timestamp: new Date().toISOString(),
        source: 'Vibe Audit - Lead Gen'
      })
    });
    console.log('[Formspree] Lead captured successfully');
  } catch (err) {
    console.warn('[Formspree] Non-blocking lead capture warning:', err);
  }
};

export const KNOWN_SLUG_TITLES = {
  'twoninezeroone-collinsave': 'The Miami Beach EDITION',
  'the-plymouth-miami-beach': 'The Plymouth South Beach',
  'sea-containers-london': 'Sea Containers London',
  'sls-south-beach': 'SLS South Beach Miami',
  'dukes': 'Dukes The Palm, a Royal Hideaway Hotel',
  'mandarin-oriental-hyde-park-london': 'Mandarin Oriental Hyde Park, London',
  '1-hotel-south-beach': '1 Hotel South Beach',
  'the-standard-spa-miami-beach': 'The Standard Spa, Miami Beach',
  'faena-miami-beach': 'Faena Hotel Miami Beach',
  'the-ned': 'The Ned London',
  'the-london-edition': 'The London EDITION'
};

export function parseBookingUrl(input) {
  if (!input || typeof input !== 'string') return null;
  const match = input.match(/booking\.com\/hotel\/([a-z]{2})\/([a-zA-Z0-9-_]+)(?:\.[a-z]{2,3}(?:-[a-z]{2,4})?)?\.html/i);
  if (!match) return null;
  const country = match[1].toLowerCase();
  const slug = match[2].toLowerCase();
  const cleanUrl = `https://www.booking.com/hotel/${country}/${slug}.html`;

  let cleanTitle = KNOWN_SLUG_TITLES[slug] || slug
    .replace(/-/g, ' ')
    .replace(/\b(the|hotel|resort|spa|suites|and|&)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
  if (!cleanTitle) cleanTitle = slug.replace(/-/g, ' ');

  let inferredCity = '';
  let inferredNeighborhood = '';
  if (slug.includes('miami-beach') || slug.includes('south-beach') || slug.includes('plymouth') || slug === 'twoninezeroone-collinsave') {
    inferredCity = 'Miami';
    inferredNeighborhood = 'Miami Beach';
  } else if (slug.includes('london')) {
    inferredCity = 'London';
  } else if (slug.includes('dubai')) {
    inferredCity = 'Dubai';
  }

  return {
    cleanUrl,
    country,
    slug,
    cleanTitle,
    inferredCity,
    inferredNeighborhood
  };
}

const PROCESSING_PHASES = [
  {
    title: "Scanning Local Micro-District Gravity",
    detail: "Indexing Google Places & neighborhood subculture search momentum...",
    percentage: 25,
    badge: "STAGE 1/4 • GEOSPATIAL RADAR"
  },
  {
    title: "Auditing Social & Editorial Citations",
    detail: "Synthesizing architectural reviews, editorial critique & local press...",
    percentage: 50,
    badge: "STAGE 2/4 • CULTURAL CITATIONS"
  },
  {
    title: "Synthesizing Vibe Manifest & Acoustic DNA",
    detail: "Evaluating soundscape profiles, sensory palette, and design archetypes...",
    percentage: 75,
    badge: "STAGE 3/4 • SENSORY ARCHITECTURE"
  },
  {
    title: "Finalizing Vibe Manifest & Conversion Strategy",
    detail: "Compiling cultural gravity manifest and 5-slot visual conversion blueprint...",
    percentage: 95,
    badge: "STAGE 4/4 • MANIFEST SYNTHESIS"
  }
];

const B2BLeadGenOnboarding = ({ initialStep = 'input' }) => {
  const [step, setStep] = useState(initialStep);
  const [processingStage, setProcessingStage] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [ambiguousCandidates, setAmbiguousCandidates] = useState(null);
  const [isVerifyingProperty, setIsVerifyingProperty] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    propertyName: '',
    propertyUrl: '',
    bookingId: '',
    instagramUrl: '',
    city: 'London',
    neighborhood: '',
    sweeteners: ['cocktails', 'wellness', 'local-craft'],
    reward: 'SPECIAL GUEST REWARD'
  });
  const [analysis, setAnalysis] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(1);
  const activePhase2AbortRef = useRef(null);

  // Pro Intelligence Gate & Modal States
  const [isProUnlocked, setIsProUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('atmosvibe_pro_unlocked') === 'true';
    }
    return false;
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    propertyName: '',
    city: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'atmosvibe') {
      setIsProUnlocked(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('atmosvibe_pro_unlocked', 'true');
      }
      setIsPasswordModalOpen(false);
      setPasswordInput('');
      setPasswordError('');
    } else {
      setPasswordError('Invalid client password. Please check your access code or request one below.');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    try {
      await fetch('https://formspree.io/f/xaqlrjor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          form_type: 'Pro Vibe Intelligence Access Request',
          submitted_at: new Date().toISOString()
        })
      });
      setIsContactSubmitted(true);
    } catch (err) {
      console.warn('Contact submission error:', err);
      setIsContactSubmitted(true);
    } finally {
      setIsContactSubmitting(false);
    }
  };

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  useEffect(() => {
    let interval;
    if (step === 'processing') {
      setPhaseIndex(0);
      interval = setInterval(() => {
        setPhaseIndex(prev => (prev < PROCESSING_PHASES.length - 1 ? prev + 1 : prev));
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleSelectCandidate = (candidate) => {
    const selectedTitle = candidate.title || formData.propertyName;
    setFormData(prev => ({ 
      ...prev, 
      propertyName: selectedTitle,
      propertyUrl: candidate.url
    }));
    setAmbiguousCandidates(null);
    executeAudit(selectedTitle, formData.city, formData.neighborhood, candidate.url);
  };

  const startAnalysis = async () => {
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
      errors.bookingId = 'Booking.com Property ID or Listing URL is required';
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

    setAmbiguousCandidates(null);
    executeAudit(targetHotel, targetCity, targetNeighborhood, directBookingUrl, cleanId);
  };

  const executeAudit = async (targetHotel, targetCity, targetNeighborhood, directBookingUrl, bookingId = null) => {
    // 1. Immediately abort any prior in-flight Phase 2 resolution & reset analysis state
    if (activePhase2AbortRef.current) {
      console.log('[Client] Aborting previous in-flight Phase 2 photo resolution due to new search.');
      activePhase2AbortRef.current.abort();
    }
    const abortController = new AbortController();
    activePhase2AbortRef.current = abortController;

    setAmbiguousCandidates(null);
    setAnalysis(null);
    setStep('processing');
    setProcessingStage(1);

    try {
      // 2. PHASE 1: Fast Manifest FIRST and ONLY the Manifest first
      const masterAudit = await fetchMasterVibeAuditManifest(
        targetHotel, 
        targetCity, 
        targetNeighborhood,
        directBookingUrl,
        bookingId
      );
      
      if (abortController.signal.aborted) return;

      // Render results immediately!
      setAnalysis({ signals: { categories: {} }, masterAudit, auditResults: null, challenge: null });
      setStep('results');
      setCurrentPhase(1);

      // Background non-blocking load of supplemental category signals
      scrapeLocalSignals(targetCity, targetNeighborhood).then(sig => {
        if (abortController.signal.aborted) return;
        if (sig && sig.categories) {
          setAnalysis(prev => (prev && prev.masterAudit?.venue_id === masterAudit?.venue_id) ? { ...prev, signals: sig } : prev);
        }
      }).catch(err => console.warn("Supplemental signals error:", err));

      // 3. PHASE 2: Background Gemini Vision Photo Resolution & Verification
      if (masterAudit && masterAudit.ota_conversion_audit) {
        const photoPromise = directBookingUrl
          ? Promise.resolve({ selected: { url: directBookingUrl, title: targetHotel } })
          : lookupHotelCandidates(targetHotel, targetCity, targetNeighborhood, directBookingUrl, bookingId);

        photoPromise.then(lookup => {
          if (abortController.signal.aborted) return null;
          const resolvedBookingUrl = directBookingUrl || lookup?.selected?.url || null;
          const resolvedHotelName = targetHotel || lookup?.selected?.title;
          return fetchMasterVibeAuditPhotos(
            resolvedHotelName,
            targetCity,
            targetNeighborhood,
            masterAudit.ota_conversion_audit.optimal_5_photo_sequence,
            abortController.signal,
            resolvedBookingUrl,
            masterAudit.ota_conversion_audit.key_strategic_shifts,
            bookingId
          );
        }).then(photoResults => {
          if (abortController.signal.aborted || !photoResults) return;
          if (photoResults && photoResults.optimal_5_photo_sequence) {
            setAnalysis(prev => {
              if (!prev || !prev.masterAudit || prev.masterAudit.venue_id !== masterAudit.venue_id) return prev;
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
          if (!abortController.signal.aborted) {
            console.warn('[Photo Gatekeeper] Phase 2 resolution error:', photoErr);
          }
        });
      }

    } catch (err) {
      if (!abortController.signal.aborted) {
        console.error("Analysis launch failed", err);
        setStep('input');
        alert("Analysis engine encountered an error. Please try a broader neighborhood or city.");
      }
    }
  };

  const runPhase2 = async () => {
    setCurrentPhase(2);
    try {
      const auditResults = await auditDiscoverability(formData.propertyName, formData.city, analysis.signals.categories, formData.propertyUrl, formData.instagramUrl, formData.neighborhood);
      setAnalysis(prev => ({ ...prev, auditResults }));
      const challenge = generatePropulsionQuest(auditResults, formData.propertyName, formData.reward);
      setAnalysis(prev => ({ ...prev, challenge }));
    } catch (err) {
      console.error("Phase 2 analysis failed", err);
    }
  };

  const saveToLocalServer = async () => {
    let experiences = [];
    if (analysis.auditResults) {
      const audits = Object.entries(analysis.auditResults.categoryAudits || {}).map(([catName, audit]) => ({ catName, ...audit }));
      const onsitePasses = audits.filter(a => a.onsiteMark === 'Pass').slice(0, 3);
      const onsiteCatNames = onsitePasses.map(a => a.catName);
      const localGaps = audits.filter(a => !onsiteCatNames.includes(a.catName)).slice(0, 2);

      let expId = 1;
      onsitePasses.forEach(audit => {
        experiences.push({
          exp_id: String(expId++),
          name: audit.vibeName,
          vibe_category: audit.catName,
          description: `Experience the ${audit.vibeName} vibe at our hotel.`,
          gamification: "Module 3 - AI Audio Vibe Mixer"
        });
      });
      localGaps.forEach(audit => {
        experiences.push({
          exp_id: String(expId++),
          name: audit.vibeName,
          vibe_category: audit.catName,
          description: audit.topVenueName || `Explore the local ${audit.vibeName} vibe.`,
          gamification: "Module 4 & 5 - Spatial Capture"
        });
      });
    }

    const manifest = {
      client_metadata: {
        hotel_name: formData.propertyName,
        property_url: formData.propertyUrl,
        destination: formData.city,
        branding: { primary_color: "#00F2FF", reward_label: formData.reward }
      },
      challenge_configuration: {
        ...(analysis.challenge || {}),
        experiences: experiences.length > 0 ? experiences : undefined,
        total_experiences: experiences.length > 0 ? experiences.length : 5
      },
      generated_at: new Date().toISOString(),
      creator: "TravelVRSE Scale Engine v4.0"
    };

    const companyId = formData.propertyName.toLowerCase().replace(/\s+/g, '-');

    try {
      const response = await fetch('http://localhost:5177/api/save-full-manifest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId, manifestData: manifest }),
        mode: 'cors'
      });
      
      if (response.ok) {
        alert(`Configuration successfully saved to Hotel Dashboard for ${formData.propertyName}!`);
      } else {
        alert("Failed to save. Ensure the Hotel Wizard (Vite) is running on port 5177.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error trying to save. Ensure the Hotel Wizard is running on port 5177.");
    }
  };

  return (
    <div className="b2b-portal-container">
      <div className="bg-gradient-mesh" />
      
      <nav className="b2b-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" className="back-link" style={{ marginTop: '0.5rem' }}>
          <div className="back-icon-wrapper">
            <ArrowLeft size={16} />
          </div>
          <span>Back to Home</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/models/Atmosvibe6.svg" 
            alt="AtmosVibe" 
            style={{ height: '48px', width: 'auto', display: 'block' }} 
          />
        </div>
      </nav>

      <main className="b2b-main">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="b2b-welcome-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 className="b2b-hero-title">VIBE AUDIT</h1>
              <p className="b2b-hero-subtitle">The High-Fidelity Propulsion Scale Diagnostic</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="b2b-cta-button" onClick={() => setStep('input')}>
                  Launch Vibe Audit
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'input' && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="form-section">
              <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.75rem 0', textTransform: 'uppercase' }}>
                  VIBE <span style={{ color: '#00e5ff', background: 'linear-gradient(90deg, #00e5ff, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MATTERS</span>
                </h2>
                <p style={{ color: 'rgba(230, 241, 255, 0.85)', fontSize: '15px', lineHeight: 1.65, maxWidth: '720px', margin: '0 auto 1.75rem auto' }}>
                  Today's high-intent guests book atmospheres, not just square footage. Atmospheric visual merchandising captures subcultural gravity, eliminates bounce rates, and converts casual browsers into direct bookings.
                </p>

                {/* High-Conversion 5-Slot OTA Resequencing Preview Card */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid rgba(0, 229, 255, 0.35)',
                  borderRadius: '1.5rem',
                  padding: '1.25rem 1.5rem',
                  width: '100%',
                  maxWidth: '750px',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 229, 255, 0.12)',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', color: '#ffd700', letterSpacing: '0.06em' }}>
                      2. HIGH-CONVERSION 5-SLOT OTA RESEQUENCING
                    </span>
                    <span style={{ 
                      background: 'rgba(0, 229, 255, 0.12)', 
                      border: '1px solid rgba(0, 229, 255, 0.5)', 
                      color: '#00e5ff', 
                      fontSize: '11px', 
                      fontWeight: 900, 
                      padding: '3px 10px', 
                      borderRadius: '12px', 
                      fontFamily: 'monospace'
                    }}>
                      +21.5% Booking Lift
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '8px',
                    marginBottom: '0.85rem'
                  }}>
                    {/* Slot 1: Cultural Magnet */}
                    <div style={{
                      position: 'relative',
                      height: '76px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '2px solid #00e5ff',
                      boxShadow: '0 0 12px rgba(0, 229, 255, 0.4)'
                    }} title="Slot #1: Rooftop Hi-Fi Lounge (Cultural Magnet)">
                      <img 
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" 
                        alt="Cultural Magnet" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        background: '#00e5ff',
                        color: '#050b14',
                        fontSize: '8.5px',
                        fontWeight: 900,
                        padding: '2px 5px',
                        borderRadius: '3px',
                        letterSpacing: '0.02em'
                      }}>#1 MAGNET</span>
                    </div>

                    {/* Slot 2: Exterior Landmark */}
                    <div style={{
                      position: 'relative',
                      height: '76px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }} title="Slot #2: Waterfront Exterior Landmark">
                      <img 
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" 
                        alt="Exterior Landmark" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        color: '#ffffff',
                        fontSize: '8.5px',
                        fontWeight: 800,
                        padding: '2px 5px',
                        borderRadius: '3px'
                      }}>#2 EXTERIOR</span>
                    </div>

                    {/* Slot 3: Signature Suite */}
                    <div style={{
                      position: 'relative',
                      height: '76px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }} title="Slot #3: Signature King Suite">
                      <img 
                        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80" 
                        alt="Signature Suite" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        color: '#ffffff',
                        fontSize: '8.5px',
                        fontWeight: 800,
                        padding: '2px 5px',
                        borderRadius: '3px'
                      }}>#3 SUITE</span>
                    </div>

                    {/* Slot 4: Spa/Dining */}
                    <div style={{
                      position: 'relative',
                      height: '76px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }} title="Slot #4: Thermal Spa & Wellness">
                      <img 
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80" 
                        alt="Spa Wellness" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        color: '#ffffff',
                        fontSize: '8.5px',
                        fontWeight: 800,
                        padding: '2px 5px',
                        borderRadius: '3px'
                      }}>#4 SPA/F&B</span>
                    </div>

                    {/* Slot 5: Luxury Bathroom */}
                    <div style={{
                      position: 'relative',
                      height: '76px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }} title="Slot #5: Modern Marble Bathroom">
                      <img 
                        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80" 
                        alt="Luxury Bathroom" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        color: '#ffffff',
                        fontSize: '8.5px',
                        fontWeight: 800,
                        padding: '2px 5px',
                        borderRadius: '3px'
                      }}>#5 BATH</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap', gap: '6px' }}>
                    <span>Commodity Score: <strong style={{ color: '#ef4444' }}>40/100</strong> ➔ <strong style={{ color: '#10b981' }}>95/100</strong></span>
                    <span style={{ color: '#00e5ff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: '#f59e0b' }}>⚡</span> Solves Drop-Off Flaws
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '2rem' }}>
                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="input-label" style={{ marginBottom: '0.75rem' }}>
                    Hotel Name <span style={{ color: '#ef4444', fontWeight: 900 }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ 
                      fontSize: '1.1rem', 
                      padding: '1rem 1.5rem',
                      border: fieldErrors.propertyName ? '1px solid #ef4444' : undefined 
                    }} 
                    value={formData.propertyName} 
                    placeholder="e.g. Sea Containers London" 
                    onChange={e => {
                      setFieldErrors(prev => ({ ...prev, propertyName: '' }));
                      setFormData({...formData, propertyName: e.target.value});
                    }} 
                  />
                  {fieldErrors.propertyName && (
                    <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>
                      ⚠️ {fieldErrors.propertyName}
                    </div>
                  )}
                </div>
                
                <div className="grid-2" style={{ gap: '1.5rem' }}>
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label" style={{ marginBottom: '0.75rem' }}>
                          Primary Market / City <span style={{ color: '#ef4444', fontWeight: 900 }}>*</span>
                        </label>
                        <input 
                          type="text" 
                          className="form-input" 
                          style={{ 
                            fontSize: '1.1rem', 
                            padding: '1rem 1.5rem',
                            border: fieldErrors.city ? '1px solid #ef4444' : undefined 
                          }} 
                          value={formData.city} 
                          placeholder="e.g. London" 
                          onChange={e => {
                            setFieldErrors(prev => ({ ...prev, city: '' }));
                            setFormData({...formData, city: e.target.value});
                          }} 
                        />
                        {fieldErrors.city && (
                          <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>
                            ⚠️ {fieldErrors.city}
                          </div>
                        )}
                    </div>
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label" style={{ marginBottom: '0.75rem' }}>Neighborhood (Optional)</label>
                        <input type="text" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.neighborhood} placeholder="e.g. South Bank" onChange={e => setFormData({...formData, neighborhood: e.target.value})} />
                    </div>
                </div>

                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="input-label" style={{ marginBottom: '0.75rem' }}>
                    Booking.com ID or URL <span style={{ color: '#ef4444', fontWeight: 900 }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ 
                      fontSize: '1.05rem', 
                      padding: '1rem 1.5rem',
                      border: fieldErrors.bookingId ? '1px solid #ef4444' : undefined,
                      letterSpacing: '0.02em'
                    }} 
                    value={formData.bookingId} 
                    placeholder="e.g. 1048291 or Booking.com URL" 
                    onChange={e => {
                      setFieldErrors(prev => ({ ...prev, bookingId: '' }));
                      setFormData({...formData, bookingId: e.target.value});
                    }} 
                  />
                  {fieldErrors.bookingId && (
                    <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>
                      ⚠️ {fieldErrors.bookingId}
                    </div>
                  )}
                </div>

                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="input-label" style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                      Work Email {isLiveProduction ? <span style={{ color: '#ef4444', fontWeight: 900 }}>*</span> : <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>(Optional in Dev)</span>}
                    </span>
                  </label>
                  <input 
                    type="email" 
                    className="form-input" 
                    style={{ 
                      fontSize: '1.1rem', 
                      padding: '1rem 1.5rem',
                      border: emailError ? '1px solid #ef4444' : undefined 
                    }} 
                    value={formData.email} 
                    placeholder="Enter your work email" 
                    onChange={e => {
                      setEmailError('');
                      setFormData({...formData, email: e.target.value});
                    }} 
                  />
                  {emailError && (
                    <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 700, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      ⚠️ {emailError}
                    </div>
                  )}
                </div>

                <button 
                  className="launch-button" 
                  style={{ 
                    padding: '1.25rem', 
                    fontSize: '1.2rem', 
                    marginTop: '1.5rem',
                    opacity: isVerifyingProperty ? 0.7 : 1,
                    cursor: isVerifyingProperty ? 'wait' : 'pointer'
                  }} 
                  onClick={startAnalysis}
                  disabled={isVerifyingProperty}
                >
                  {isVerifyingProperty ? 'VERIFYING VENUE INVENTORY...' : 'LAUNCH VIBE AUDIT'}
                </button>

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
              </div>

              {/* Ambiguous Property Disambiguation Selector */}
              <AnimatePresence>
                {ambiguousCandidates && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      marginTop: '2rem',
                      padding: '2rem',
                      borderRadius: '1.5rem',
                      background: 'rgba(5, 15, 30, 0.95)',
                      border: '1px solid rgba(0, 229, 255, 0.4)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
                    }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#00e5ff', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'rgba(0, 229, 255, 0.12)', padding: '4px 12px', borderRadius: '20px' }}>
                        SELECT EXACT PROPERTY
                      </span>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                        Multiple Matching Properties Found
                      </h3>
                      <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
                        We found {ambiguousCandidates.length} properties matching "{formData.propertyName}". Which property would you like to audit?
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                      {ambiguousCandidates.map((c, idx) => (
                        <div 
                          key={c.slug || idx} 
                          onClick={() => handleSelectCandidate(c)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(0, 229, 255, 0.25)',
                            borderRadius: '1rem',
                            padding: '1.25rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 800 }}>Option #{idx + 1}</span>
                              <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '10px' }}>Verified Hotel</span>
                            </div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>{c.title}</h4>
                            {c.snippet && (
                              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4, margin: '0 0 1rem 0' }}>{c.snippet}</p>
                            )}
                          </div>
                          <button 
                            type="button" 
                            className="launch-button"
                            style={{ padding: '0.6rem 1rem', fontSize: '12px', fontWeight: 800, marginTop: 'auto' }}
                          >
                            Audit This Hotel →
                          </button>
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <button 
                        type="button" 
                        onClick={() => setAmbiguousCandidates(null)}
                        style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', fontSize: '12px' }}
                      >
                        ✕ Cancel & Refine Search
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div 
              key="processing" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '4rem 1rem 8rem', maxWidth: '800px', margin: '0 auto' }}
            >
              {/* 2-Tier Pipeline Info Banner */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                background: 'rgba(0, 229, 255, 0.08)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                borderRadius: '50px',
                color: '#00e5ff',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '2rem'
              }}>
                <Zap size={14} /> Phase 1: Synthesizing Vibe Manifest First
              </div>
              {/* Dual-Ring Cyber Radar */}
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 2.5rem' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px dashed rgba(56, 189, 248, 0.3)',
                  animation: 'spin 8s linear infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  inset: '8px',
                  borderRadius: '50%',
                  border: '3px solid transparent',
                  borderTopColor: '#00E5FF',
                  borderRightColor: '#F59E0B',
                  animation: 'spin 1.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  inset: '28px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(5, 11, 20, 0.8) 70%)',
                  boxShadow: '0 0 25px rgba(0, 229, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Radio size={24} color="#00E5FF" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
                </div>
              </div>

              {/* Phase Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '100px', color: '#00E5FF', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
                <Sparkles size={13} color="#00E5FF" />
                <span>{PROCESSING_PHASES[phaseIndex].badge}</span>
              </div>

              {/* Dynamic Phase Title */}
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '0.75rem', letterSpacing: '-0.02em', minHeight: '3rem' }}>
                {PROCESSING_PHASES[phaseIndex].title}
              </h2>

              {/* Dynamic Detail Text */}
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '15px', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.6, minHeight: '2.5rem' }}>
                {PROCESSING_PHASES[phaseIndex].detail}
              </p>

              {/* Progress Bar */}
              <div style={{ maxWidth: '480px', margin: '0 auto 3rem', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '100px', padding: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{
                  height: '8px',
                  borderRadius: '100px',
                  background: 'linear-gradient(90deg, #00E5FF 0%, #38BDF8 60%, #F59E0B 100%)',
                  width: `${PROCESSING_PHASES[phaseIndex].percentage}%`,
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 0 12px rgba(0, 229, 255, 0.5)'
                }} />
              </div>

              {/* Live Telemetry Phased Checklist */}
              <div style={{ maxWidth: '540px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                {PROCESSING_PHASES.map((phase, idx) => {
                  const isDone = idx < phaseIndex;
                  const isCurrent = idx === phaseIndex;
                  return (
                    <div 
                      key={phase.badge}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 18px',
                        borderRadius: '12px',
                        background: isCurrent ? 'rgba(0, 229, 255, 0.06)' : isDone ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.01)',
                        border: isCurrent ? '1px solid rgba(0, 229, 255, 0.35)' : isDone ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.03)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {isDone ? (
                          <CheckCircle2 size={18} color="#00E5FF" />
                        ) : isCurrent ? (
                          <Activity size={18} color="#F59E0B" style={{ animation: 'pulse 1s infinite' }} />
                        ) : (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginLeft: '5px' }} />
                        )}
                        <span style={{ fontSize: '13px', fontWeight: isCurrent ? 800 : 500, color: isCurrent ? '#FFFFFF' : isDone ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)' }}>
                          {phase.title}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: isDone ? '#00E5FF' : isCurrent ? '#F59E0B' : 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
                        {isDone ? 'COMPLETE' : isCurrent ? 'PROCESSING...' : 'QUEUED'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 'results' && analysis && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="results-section">
              
              {/* PROPERTY HEADER */}
              <div className="property-info" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem', marginBottom: '3rem' }}>
                <div style={{ textAlign: 'left' }}>
                  <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>{formData.propertyName || "Vibe Audit"}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'rgba(255,255,255,0.4)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '20px', marginTop: '1.5rem' }}>
                    <MapPin size={22} color="#00e5ff" /> {formData.neighborhood}, {formData.city}
                  </div>
                </div>
              </div>

              {/* 1. HOTEL VIBE MANIFEST & ACOUSTIC DNA (PRIMARY SCORECARD) */}
              {analysis.masterAudit && (
                <HotelVibeManifestCard 
                  manifest={analysis.masterAudit} 
                  hotelName={formData.propertyName} 
                  location={`${formData.neighborhood}, ${formData.city}`} 
                />
              )}

              {/* 2. BOOKING.COM VISUAL & COPY AUDIT TEASER PACK (PROMINENT CONVERSION REPORT) */}
              {analysis.masterAudit?.ota_conversion_audit && (
                <BookingOtaAuditCard 
                  otaData={analysis.masterAudit.ota_conversion_audit} 
                  hotelName={formData.propertyName} 
                  isUnlocked={isProUnlocked}
                  onUnlockClick={() => {
                    setPasswordError('');
                    setIsPasswordModalOpen(true);
                  }}
                  onRequestAccessClick={() => {
                    setContactForm({
                      name: '',
                      propertyName: formData.propertyName || '',
                      city: `${formData.neighborhood ? formData.neighborhood + ', ' : ''}${formData.city || ''}`,
                      email: formData.email || '',
                      phone: '',
                      message: `Hi AtmosVibe Team, I would like to request access to the Booking.com Copy Rewrite and Pro Vibe Intelligence suite for ${formData.propertyName || 'our property'}.`
                    });
                    setIsContactSubmitted(false);
                    setIsContactModalOpen(true);
                  }}
                />
              )}

              {/* 🔒 PRO VIBE INTELLIGENCE GATEWAY */}
              {!isProUnlocked ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pro-gate-card" 
                  style={{
                    marginTop: '4rem',
                    padding: '3.5rem 2rem',
                    borderRadius: '2rem',
                    background: 'linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 25, 45, 0.9) 100%)',
                    border: '1px solid rgba(0, 229, 255, 0.35)',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(0, 229, 255, 0.12)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '50px', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.35)', color: '#00e5ff', fontSize: '11.5px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                    <Lock size={14} /> Extended Vibe Intelligence Locked
                  </div>

                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                    Unlock Full Neighborhood & 3D Interactive Discovery
                  </h3>
                  
                  <p style={{ maxWidth: '780px', margin: '0 auto 2.5rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                    Gain immediate access to your property's 3D Interactive Discovery Quiz, Hyper-Local Subculture & Venue rankings, and the custom 5-Challenge Onsite Experience framework.
                  </p>

                  {/* Feature preview chips */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '950px', margin: '0 auto 3rem', textAlign: 'left' }}>
                    <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <div style={{ color: '#00e5ff', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🎮 3D Interactive Quiz
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                        Gamified guest engagement & direct spatial discovery challenges.
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <div style={{ color: '#ec4899', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🌍 Local Subcultures
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                        Deep neighborhood venue radar & social trend velocity.
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🎯 5-Challenge Framework
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                        Onsite strengths vs local gap matrix & Hotel Wizard export.
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <button 
                      className="launch-button" 
                      style={{ padding: '1.1rem 2.2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)', color: '#050b14', fontWeight: 900 }}
                      onClick={() => {
                        setPasswordError('');
                        setIsPasswordModalOpen(true);
                      }}
                    >
                      <Key size={20} /> Unlock with Client Password
                    </button>

                    <button 
                      className="cta-button" 
                      style={{ margin: 0, padding: '1.1rem 2.2rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#ffffff' }}
                      onClick={() => {
                        setContactForm({
                          name: '',
                          propertyName: formData.propertyName || '',
                          city: `${formData.neighborhood ? formData.neighborhood + ', ' : ''}${formData.city || ''}`,
                          email: formData.email || '',
                          phone: '',
                          message: `Hi AtmosVibe Team, I would like to request full Pro Vibe Intelligence access for ${formData.propertyName || 'our property'}.`
                        });
                        setIsContactSubmitted(false);
                        setIsContactModalOpen(true);
                      }}
                    >
                      <Send size={18} /> Get in Contact / Request Access
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* UNLOCKED PRO STATUS HEADER */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginTop: '4rem',
                      marginBottom: '2.5rem',
                      padding: '1.25rem 2rem',
                      borderRadius: '1.25rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <ShieldCheck size={26} color="#10b981" />
                      <div>
                        <div style={{ fontWeight: 900, color: '#10b981', fontSize: '1.1rem', letterSpacing: '0.5px' }}>PRO VIBE INTELLIGENCE UNLOCKED</div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Displaying interactive 3D quiz, hyper-local subcultures, and 5-challenge framework.</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setIsProUnlocked(false);
                        if (typeof window !== 'undefined') {
                          sessionStorage.removeItem('atmosvibe_pro_unlocked');
                        }
                      }}
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}
                    >
                      Lock Pro View
                    </button>
                  </motion.div>

                  {/* 3. 3D INTERACTIVE QUIZ CHALLENGE */}
                  {analysis.masterAudit?.interactive_quiz_challenge && (
                    <InteractiveQuizCard 
                      quizData={analysis.masterAudit.interactive_quiz_challenge} 
                    />
                  )}

                  {/* 4. LOCAL NEIGHBOURHOOD VIBE SIGNALS & TOP VENUES */}
                  <motion.section 
                    initial={{opacity: 0, y: 20}} 
                    animate={{opacity: 1, y: 0}} 
                    style={{ 
                      marginTop: '0rem', 
                      padding: '3rem', 
                      background: 'rgba(255,255,255,0.02)', 
                      borderRadius: '2rem', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      marginBottom: '3.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                      <Globe color="#00e5ff" size={24} />
                      <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Top Local Neighbourhood Subcultures</h2>
                    </div>

                    {Object.entries(analysis.signals.categories || {})
                      .filter(([categoryName]) => categoryName.toLowerCase() !== 'hotel')
                      .map(([categoryName, data], index) => {
                      const { Top3Vibes, TopLocalVenue, ExtendedRadiusSearch, syntheticIntent } = data;
                      
                      return (
                        <div key={categoryName} style={{ marginBottom: '5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '2px' }}>
                            {categoryName}
                          </h3>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                            {/* LEFT COLUMN: VIBES & INTENT */}
                            <div>
                              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                                Top Subcultures (AtmosVibe AI)
                              </h4>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                                {Top3Vibes?.map((vibe, i) => (
                                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: i === 0 ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: i === 0 ? '#00e5ff' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: i === 0 ? '#000' : '#fff' }}>
                                      {vibe.rank}
                                    </div>
                                    <div>
                                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: i === 0 ? '#00e5ff' : '#fff' }}>{vibe.vibeName}</div>
                                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Trend: {vibe.growthTrend}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {syntheticIntent?.frequentHumanQueries && (
                                 <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                                      Agentic Search Telemetry
                                    </h4>
                                    <div style={{ padding: '1.5rem', background: 'rgba(0, 229, 255, 0.05)', borderLeft: '4px solid #00e5ff', borderRadius: '0 1rem 1rem 0' }}>
                                      <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                                        "{Array.isArray(syntheticIntent.frequentHumanQueries) ? syntheticIntent.frequentHumanQueries[0] : syntheticIntent.frequentHumanQueries}"
                                      </p>
                                    </div>
                                 </div>
                              )}
                            </div>

                            {/* RIGHT COLUMN: HYPER-LOCAL VENUE & EXTENDED RADIUS */}
                            <div>
                              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                                Hyper-Local Reality Check
                              </h4>
                              
                              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Top {analysis.signals.neighborhood} Venue</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>{TopLocalVenue?.name}</div>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                    <Star size={16} color="#FFD700" /> {TopLocalVenue?.googlePlacesScore} ({TopLocalVenue?.reviewCount} reviews)
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                    <MapPin size={16} color="#00e5ff" /> {TopLocalVenue?.distanceFromHotelKm}km away
                                  </div>
                                </div>
                              </div>

                              {/* HYPE SCORECARD */}
                              <div style={{ padding: '1.5rem', background: 'rgba(138, 43, 226, 0.05)', borderRadius: '1rem', border: '1px solid rgba(138, 43, 226, 0.3)', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#b28dff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Validation Layer</div>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Social (TikTok/IG)</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: TopLocalVenue?.socialVelocity === 'Viral High Velocity' ? '#FF3E6C' : '#00e5ff' }}>
                                      {TopLocalVenue?.socialVelocity || 'N/A'}
                                    </div>
                                  </div>
                                  <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }}></div>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Editorial (TimeOut/etc)</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: TopLocalVenue?.editorialMentions > 0 ? '#10b981' : '#fff' }}>
                                      {TopLocalVenue?.editorialMentions || 0} Mentions
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        
                        </div>
                      );
                    })}
                  </motion.section>

                  {/* SECTION A.5: Launch Phase 2 Button */}
                  {currentPhase === 1 && (
                      <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                         <button className="launch-button" style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }} onClick={runPhase2}>
                             Launch Phase 2: Deep Digital Audit <ChevronRight size={24} />
                         </button>
                      </div>
                  )}

                    {/* SECTION B: Your Vibe Audit */}
                    {currentPhase >= 2 && (
                    <div style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                        <Search color="#ec4899" size={24} />
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Vibe Audit</h2>
                      </div>
                      
                      {!analysis.auditResults ? (
                         <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#ec4899', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>Agent B is hunting...</h3>
                            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Scanning {formData.propertyName}'s website and Instagram footprint against local trends.</p>
                         </div>
                      ) : (
                         <div>
                            {/* Summary Scorecard */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                               <div style={{ padding: '2rem', background: 'rgba(236, 72, 153, 0.05)', borderRadius: '1rem', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                                  <div style={{ fontSize: '0.8rem', color: '#ec4899', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Onsite Vibe Score</div>
                                  <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff' }}>{analysis.auditResults.avgOnsiteScore}%</div>
                                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Does your website offer the vibe?</div>
                               </div>
                               <div style={{ padding: '2rem', background: 'rgba(0, 229, 255, 0.05)', borderRadius: '1rem', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
                                  <div style={{ fontSize: '0.8rem', color: '#00e5ff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Gateway Score</div>
                                  <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff' }}>{analysis.auditResults.avgLocalGatewayScore}%</div>
                                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Do you promote the top local venues?</div>
                               </div>
                               <div style={{ padding: '2rem', background: 'rgba(138, 43, 226, 0.05)', borderRadius: '1rem', border: '1px solid rgba(138, 43, 226, 0.2)' }}>
                                  <div style={{ fontSize: '0.8rem', color: '#b28dff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Instagram Social Score</div>
                                  <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff' }}>{analysis.auditResults.avgSocialScore}%</div>
                                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Are you posting about these vibes?</div>
                               </div>
                            </div>
                            
                            {/* Per-Category Diagnostics */}
                            {Object.entries(analysis.auditResults.categoryAudits || {}).map(([catName, audit]) => (
                               <div key={catName} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', marginBottom: '1rem', borderLeft: (audit.onsiteMark === 'Pass' || audit.gatewayMark === 'Pass' || audit.socialMark === 'Pass') ? '4px solid #10b981' : '4px solid #ef4444' }}>
                                  <div style={{ marginBottom: '1.5rem' }}>
                                     <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>{catName}: {audit.vibeName}</h4>
                                  </div>
                                  
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                                     {/* Onsite Scorecard */}
                                     <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(236, 72, 153, 0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                           <span style={{ fontSize: '0.8rem', color: '#ec4899', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Onsite Check</span>
                                           <span style={{ fontSize: '0.9rem', fontWeight: 900, color: audit.onsiteMark === 'Pass' ? '#10b981' : '#ef4444' }}>{audit.onsiteMark}</span>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.25rem' }}>
                                           Keywords Match: <strong>{audit.keywordsMatchCount}</strong>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                           {audit.foundKeywords && audit.foundKeywords.length > 0 ? 
                                              `Identified: ${audit.foundKeywords.join(', ')}` : 
                                              'No keywords identified'}
                                        </div>
                                     </div>

                                     {/* Gateway Scorecard */}
                                     <div style={{ padding: '1rem', background: 'rgba(0, 229, 255, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(0, 229, 255, 0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                           <span style={{ fontSize: '0.8rem', color: '#00e5ff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Gateway Check</span>
                                           <span style={{ fontSize: '0.9rem', fontWeight: 900, color: audit.gatewayMark === 'Pass' ? '#10b981' : '#ef4444' }}>{audit.gatewayMark}</span>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.25rem' }}>
                                           Target Venue:
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                           {audit.topVenueName || 'No venue provided'}
                                        </div>
                                     </div>

                                     {/* Instagram Scorecard */}
                                     <div style={{ padding: '1rem', background: 'rgba(138, 43, 226, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(138, 43, 226, 0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                           <span style={{ fontSize: '0.8rem', color: '#b28dff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Instagram Check</span>
                                           <span style={{ fontSize: '0.9rem', fontWeight: 900, color: audit.socialMark === 'Pass' ? '#10b981' : '#ef4444' }}>{audit.socialMark}</span>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.25rem' }}>
                                           Keywords Match: <strong>{audit.socialMatchCount}</strong>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                           {audit.foundSocialKeywords && audit.foundSocialKeywords.length > 0 ? 
                                              `Identified: ${audit.foundSocialKeywords.join(', ')}` : 
                                              'No keywords identified'}
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            ))}
                         </div>
                      )}
                      
                      {/* Launch Phase 3 Button */}
                      {analysis.auditResults && currentPhase === 2 && (
                        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                           <button className="launch-button" style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'linear-gradient(45deg, #B5942D, #FFD700)' }} onClick={() => setCurrentPhase(3)}>
                               Reveal Phase 3: TravelVRSE Strategy <ChevronRight size={24} />
                           </button>
                        </div>
                      )}

                    </div>
                    )}

                    {/* SECTION C: Showcase Your Vibe */}
                    {currentPhase >= 3 && (() => {
                      const audits = Object.entries(analysis.auditResults?.categoryAudits || {}).map(([catName, audit]) => ({ catName, ...audit }));
                      const onsitePasses = audits.filter(a => a.onsiteMark === 'Pass').slice(0, 3);
                      const onsiteCatNames = onsitePasses.map(a => a.catName);
                      const localGaps = audits.filter(a => !onsiteCatNames.includes(a.catName)).slice(0, 2);

                      return (
                        <div style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                            <Star color="#B5942D" size={24} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phase 3: The 5-Challenge Framework</h2>
                          </div>
                          
                          {!analysis.auditResults ? (
                             <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '1rem', marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>Awaiting Audit Telemetry...</h3>
                             </div>
                          ) : (
                             <div style={{ marginBottom: '3rem' }}>
                                <div style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(181, 148, 45, 0.1) 0%, rgba(181, 148, 45, 0.02) 100%)', borderRadius: '1rem', border: '1px solid rgba(181, 148, 45, 0.3)', marginBottom: '2rem' }}>
                                   <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#B5942D', textTransform: 'uppercase', marginBottom: '1rem' }}>Recommended Strategy</h3>
                                   <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                      Based on the vibe audit, we recommend a 5-challenge experience covering {onsitePasses.length} onsite strengths and {localGaps.length} local gaps.
                                   </p>
                                   
                                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                     <div>
                                       <h4 style={{ color: '#10b981', marginBottom: '1rem', textTransform: 'uppercase' }}>3 Onsite Experiences</h4>
                                       {onsitePasses.map((p, i) => (
                                         <div key={i} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                                           <strong>{p.catName}: {p.vibeName}</strong>
                                           <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>Keywords: {p.keywords?.join(', ') || p.foundKeywords?.join(', ') || 'N/A'}</div>
                                         </div>
                                       ))}
                                     </div>
                                     <div>
                                       <h4 style={{ color: '#ec4899', marginBottom: '1rem', textTransform: 'uppercase' }}>2 Local Gaps</h4>
                                       {localGaps.map((g, i) => (
                                         <div key={i} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                                           <strong>{g.catName}: {g.vibeName}</strong>
                                           <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', marginTop: '0.25rem' }}>Venue: {g.topVenueName}</div>
                                           <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>Keywords: {g.keywords?.join(', ') || g.foundSocialKeywords?.join(', ') || 'N/A'}</div>
                                         </div>
                                       ))}
                                     </div>
                                   </div>
                                </div>
                             </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                             <button className="launch-button" style={{ maxWidth: '550px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', fontSize: '1.1rem' }} onClick={saveToLocalServer}>
                               Send 5-Challenge Framework to Hotel Wizard <ExternalLink size={20} />
                             </button>
                          </div>
                        </div>
                      );
                    })()}

                  {/* ACTION FOOTER */}
                  <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <button onClick={() => setStep('onboarding')} className="back-link">
                      <div className="back-icon-wrapper"><ArrowLeft size={16} /></div>
                      NEW AUDIT
                    </button>
                    <button className="cta-button" style={{ margin: 0 }}>
                      DOWNLOAD FULL REPORT <Gift size={20} />
                    </button>
                  </div>
                </>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ================= PASSWORD UNLOCK MODAL ================= */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(2, 6, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setIsPasswordModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '480px',
                background: 'linear-gradient(135deg, #07111e 0%, #0d1e34 100%)',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                borderRadius: '1.75rem',
                padding: '2.5rem',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,229,255,0.15)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#00e5ff' }}>
                  <Key size={26} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '0 0 0.5rem 0' }}>
                  Client Access
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', margin: 0 }}>
                  Enter your AtmosVibe client password to unlock full neighborhood subcultures & the 3D quiz engine.
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordError('');
                      setPasswordInput(e.target.value);
                    }}
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.06)',
                      border: passwordError ? '1px solid #ef4444' : '1px solid rgba(0,229,255,0.3)',
                      color: '#fff',
                      fontSize: '1.1rem',
                      outline: 'none',
                      textAlign: 'center',
                      letterSpacing: '2px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {passwordError && (
                    <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'center', fontWeight: 600 }}>
                      ⚠️ {passwordError}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="launch-button"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                    color: '#050b14',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Verify & Unlock
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Don't have a code? </span>
                <button
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setContactForm({
                      name: '',
                      propertyName: formData.propertyName || '',
                      city: `${formData.neighborhood ? formData.neighborhood + ', ' : ''}${formData.city || ''}`,
                      email: formData.email || '',
                      phone: '',
                      message: `Hi AtmosVibe Team, I would like to request client access for ${formData.propertyName || 'our property'}.`
                    });
                    setIsContactSubmitted(false);
                    setIsContactModalOpen(true);
                  }}
                  style={{ background: 'none', border: 'none', color: '#00e5ff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Request access here
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CONTACT / GET IN TOUCH MODAL ================= */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(2, 6, 15, 0.88)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setIsContactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '560px',
                background: 'linear-gradient(135deg, #07111e 0%, #0d1e34 100%)',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                borderRadius: '1.75rem',
                padding: '2.5rem',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,229,255,0.15)',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsContactModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>

              {isContactSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#10b981' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '0.75rem' }}>
                    Request Received!
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Thank you. Our Vibe Conversion team will review your property's audit profile and provide your Pro access code shortly.
                  </p>
                  <button
                    onClick={() => setIsContactModalOpen(false)}
                    className="launch-button"
                    style={{ padding: '0.9rem 2rem', fontSize: '1rem', background: 'linear-gradient(135deg, #00e5ff, #0284c7)', color: '#050b14', fontWeight: 900 }}
                  >
                    Return to Audit
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', color: '#00e5ff', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      <Send size={12} /> Contact Vibe Specialist
                    </div>
                    <h3 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '0 0 0.5rem 0' }}>
                      Request Pro Access
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', margin: 0 }}>
                      Connect with our conversion specialists to activate full neighborhood intelligence and 3D guest workflows.
                    </p>
                  </div>

                  <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@hotel.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Property Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Hotel Name"
                          value={contactForm.propertyName}
                          onChange={(e) => setContactForm({ ...contactForm, propertyName: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Phone (Optional)</label>
                        <input
                          type="tel"
                          placeholder="+44 20 ..."
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Message / Goals</label>
                      <textarea
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isContactSubmitting}
                      className="launch-button"
                      style={{
                        marginTop: '0.5rem',
                        padding: '1rem',
                        fontSize: '1rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                        color: '#050b14',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: isContactSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isContactSubmitting ? 0.7 : 1
                      }}
                    >
                      {isContactSubmitting ? 'Submitting Request...' : 'Submit Request'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default B2BLeadGenOnboarding;
