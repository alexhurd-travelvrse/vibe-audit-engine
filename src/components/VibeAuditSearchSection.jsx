import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrapeLocalSignals, fetchMasterVibeAudit } from '../personaEngine';
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
    neighborhood: 'Southbank',
    email: '',
    propertyUrl: ''
  });
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [analysis, setAnalysis] = useState(null);

  const handleLaunch = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (isLiveProduction) {
      if (!formData.email || !formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
        setEmailError('Work email is required to access the live Vibe Audit report.');
        return;
      }
      submitLeadToFormspree(formData);
    } else {
      if (formData.email && formData.email.includes('@')) {
        submitLeadToFormspree(formData);
      }
    }

    setLoading(true);
    setProcessingStage(1);

    try {
      const [signals, masterAudit] = await Promise.all([
        scrapeLocalSignals(formData.city || 'London', formData.neighborhood || 'Southbank').catch(err => {
          console.warn('Local signals fetch error:', err);
          return { categories: {} };
        }),
        fetchMasterVibeAudit(
          formData.propertyName || 'Sea Containers London',
          formData.city || 'London',
          formData.neighborhood || 'Southbank'
        ).catch(err => {
          console.warn('Master Vibe Audit fetch error:', err);
          return null;
        })
      ]);

      setAnalysis({ signals, masterAudit });
      setLoading(false);
    } catch (err) {
      console.error('Audit engine failure:', err);
      setLoading(false);
      alert('Analysis engine encountered a timeout. Please try again.');
    }
  };

  return (
    <section id="vibe-audit-engine" className="vibe-search-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header animate-fade-up">
          <div className="audit-badge">
            <Sparkles size={16} className="text-cyan" />
            <span>AI-POWERED DIAGNOSTIC ENGINE</span>
          </div>
          <h2 className="section-title">
            Vibe <span className="text-cyan">Audit</span> <span className="text-gold">Engine</span>
          </h2>
          <p className="subtitle">
            <span className="text-cyan" style={{ fontWeight: 800 }}>78%</span> of Next-Gen Travelers search for local experiences first — uncover your property's experiential discoverability score and conversion gaps in seconds.
          </p>
        </div>

        {/* Search Box Container */}
        <div className="vibe-search-wrapper animate-fade-up delay-1">
          <div className="glass-card vibe-search-card">
            <form onSubmit={handleLaunch} className="vibe-search-form">
              
              <div className="vibe-form-grid">
                {/* Property Identity */}
                <div className="vibe-input-field">
                  <label className="vibe-label">Property Identity</label>
                  <div className="vibe-input-wrapper">
                    <Search size={18} className="vibe-input-icon text-cyan" />
                    <input 
                      type="text" 
                      className="vibe-input" 
                      placeholder="e.g. Sea Containers London"
                      value={formData.propertyName}
                      onChange={e => setFormData({ ...formData, propertyName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Primary Market */}
                <div className="vibe-input-field">
                  <label className="vibe-label">Primary Market</label>
                  <div className="vibe-input-wrapper">
                    <MapPin size={18} className="vibe-input-icon text-gold" />
                    <input 
                      type="text" 
                      className="vibe-input" 
                      placeholder="e.g. London, Barcelona, Paris"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                {/* Neighborhood */}
                <div className="vibe-input-field">
                  <label className="vibe-label">Neighborhood / District</label>
                  <div className="vibe-input-wrapper">
                    <Globe size={18} className="vibe-input-icon text-cyan" />
                    <input 
                      type="text" 
                      className="vibe-input" 
                      placeholder="e.g. Southbank, Soho, Eixample"
                      value={formData.neighborhood}
                      onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div className="vibe-input-field">
                  <label className="vibe-label">
                    Work Email {isLiveProduction ? <span className="required-tag">* Required</span> : <span className="optional-tag">(Optional)</span>}
                  </label>
                  <div className="vibe-input-wrapper">
                    <Zap size={18} className="vibe-input-icon text-gold" />
                    <input 
                      type="email" 
                      className={`vibe-input ${emailError ? 'input-error' : ''}`}
                      placeholder="name@hotelgroup.com"
                      value={formData.email}
                      onChange={e => {
                        setEmailError('');
                        setFormData({ ...formData, email: e.target.value });
                      }}
                    />
                  </div>
                  {emailError && <span className="error-message">⚠️ {emailError}</span>}
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

            </form>
          </div>
        </div>

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
                <h3>Analyzing Local Cultural & Acoustic Signals</h3>
                <p>Synthesizing hospitality sentiment, Booking.com OTA visibility gaps, and TikTok/Instagram subcultures for <strong>{formData.propertyName || 'Property'}</strong> in {formData.neighborhood}, {formData.city}...</p>
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
