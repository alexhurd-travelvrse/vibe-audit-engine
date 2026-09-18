import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Send, Star, MapPin, TrendingUp, Search, Globe, Zap, CheckCircle2, BarChart3, ExternalLink, Gift, RefreshCw, Activity, Info, Compass, Radio, Layers, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  scrapeLocalSignals, 
  auditDiscoverability, 
  generatePropulsionQuest,
  fetchMasterVibeAudit
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

const PROCESSING_PHASES = [
  {
    title: "Scanning Local Micro-District Gravity",
    detail: "Indexing Google Places & neighborhood subculture search momentum...",
    percentage: 22,
    badge: "STAGE 1/5 • GEOSPATIAL RADAR"
  },
  {
    title: "Auditing Social & Editorial Citations",
    detail: "Synthesizing viral mentions, TikTok velocity, Time Out & local reviews...",
    percentage: 46,
    badge: "STAGE 2/5 • SOCIAL VELOCITY"
  },
  {
    title: "Ingesting Live Booking.com Visual Slots",
    detail: "Resolving property gallery slots and extracting signature visual assets...",
    percentage: 70,
    badge: "STAGE 3/5 • VISUAL MERCHANDISING"
  },
  {
    title: "Multimodal Gemini Vibe Synthesis",
    detail: "Evaluating 5-slot sequence psychology and revenue conversion triggers...",
    percentage: 88,
    badge: "STAGE 4/5 • AI PROPULSION MODEL"
  },
  {
    title: "Finalizing Master Vibe Audit Report",
    detail: "Compiling acoustic DNA scorecard, optimal gallery & interactive challenge...",
    percentage: 97,
    badge: "STAGE 5/5 • REPORT SYNTHESIS"
  }
];

const B2BLeadGenOnboarding = ({ initialStep = 'input' }) => {
  const [step, setStep] = useState(initialStep);
  const [processingStage, setProcessingStage] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    propertyName: '',
    propertyUrl: '',
    instagramUrl: '',
    city: 'London',
    neighborhood: '',
    sweeteners: ['cocktails', 'wellness', 'local-craft'],
    reward: 'SPECIAL GUEST REWARD'
  });
  const [analysis, setAnalysis] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(1);

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

  const startAnalysis = async () => {
    setEmailError('');

    // Require valid work email on live production environments
    if (isLiveProduction) {
      if (!formData.email || !formData.email.trim()) {
        setEmailError('Please enter your work email to receive and launch your Vibe Audit.');
        return;
      }
      if (!formData.email.includes('@') || !formData.email.includes('.')) {
        setEmailError('Please enter a valid work email address (e.g. alex@hotelgroup.com).');
        return;
      }
    }

    if (formData.email && formData.email.includes('@')) {
      submitLeadToFormspree(formData);
    }

    setStep('processing');
    setProcessingStage(1);
    
    try {
      // Execute in parallel:
      // 1. Local signals (Macro/Micro subcultures & top venues)
      // 2. Master Vibe Audit (5-dim manifest, quiz, Booking.com audit)
      const [signals, masterAudit] = await Promise.all([
        scrapeLocalSignals(formData.city, formData.neighborhood).catch(err => {
          console.warn("Local signals fetch error:", err);
          return { categories: {} };
        }),
        fetchMasterVibeAudit(formData.propertyName || 'Sea Containers London', formData.city, formData.neighborhood).catch(err => {
          console.warn("Master Vibe Audit fetch error:", err);
          return null;
        })
      ]);
      
      setAnalysis({ signals, masterAudit, auditResults: null, challenge: null });
      setStep('results');
      setCurrentPhase(1);

    } catch (err) {
      console.error("Analysis launch failed", err);
      setStep('input');
      alert("Analysis engine encountered a timeout. Please try a broader neighborhood or city.");
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
            src="/models/atmosVibe4.svg" 
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
              <div style={{ textAlign: 'center', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0, lineHeight: 1.6, maxWidth: '750px' }}>
                  <span style={{ color: '#00e5ff', fontWeight: 900, fontSize: '18px' }}>78%</span> of Next-Gen Travelers search for local experiences first — how discoverable are these on your digital presence?
                </p>
              </div>

              <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '2rem' }}>
                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="input-label" style={{ marginBottom: '0.75rem' }}>Property Identity</label>
                  <input type="text" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.propertyName} placeholder="Enter Hotel Name" onChange={e => setFormData({...formData, propertyName: e.target.value})} />
                </div>
                
                <div className="grid-2" style={{ gap: '1.5rem' }}>
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label" style={{ marginBottom: '0.75rem' }}>Primary Market</label>
                        <input type="text" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.city} placeholder="e.g. London" onChange={e => setFormData({...formData, city: e.target.value})} />
                    </div>
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label" style={{ marginBottom: '0.75rem' }}>Neighborhood</label>
                        <input type="text" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.neighborhood} placeholder="e.g. Soho" onChange={e => setFormData({...formData, neighborhood: e.target.value})} />
                    </div>
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

                <button className="launch-button" style={{ padding: '1.25rem', fontSize: '1.2rem', marginTop: '1.5rem' }} onClick={startAnalysis}>
                    LAUNCH VIBE AUDIT 🚀
                </button>
              </div>
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
                />
              )}

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
                            Top Subcultures (Gemini AI)
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

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default B2BLeadGenOnboarding;
