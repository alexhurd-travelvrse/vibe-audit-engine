import React, { useState, useMemo, useEffect } from 'react';
import {
  Lock,
  Sparkles,
  Search,
  X,
  ExternalLink,
  Code2,
  Compass,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import {
  VIBE_FILTER_CATEGORIES,
  SAMPLE_VIBE_PROMPTS,
  TRAVEL_CURIOUS_BLACK_CAB_TOURS,
  scoreTourByVibes
} from '../data/travelCuriousBlackCabVibes';
import './VibeApiDemoPage.css';

const STORAGE_KEY = 'atmosvibe_tc_vibe_api_unlocked';

const DNA_LABELS = [
  { key: 'storytellingDepth', label: 'Storytelling Depth' },
  { key: 'subculturalGravity', label: 'Subculture Gravity' },
  { key: 'visualDrama', label: 'Visual Drama' },
  { key: 'secretGemIndex', label: 'Secret Gem Index' },
  { key: 'familyMultiGen', label: 'Family & Multi-Gen' },
  { key: 'intimacyExclusivity', label: 'Private Exclusivity' }
];

export default function VibeApiDemoPage() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Interactive Vibe Filters & Search state
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState('all');
  const [viewMode, setViewMode] = useState('discovery'); // 'discovery' | 'api-json'

  // Modal state for inspecting a single tour's full Vibe Signature + JSON payload
  const [activeTourModal, setActiveTourModal] = useState(null);
  const [modalTab, setModalTab] = useState('signature'); // 'signature' | 'json'
  const [copiedJson, setCopiedJson] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const cleaned = passwordInput.trim().toLowerCase();
    // Accept exact requested password "travelvcurious" (and "travelcurious" / "atmosvibe")
    if (cleaned === 'travelvcurious' || cleaned === 'travelcurious' || cleaned === 'atmosvibe') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsUnlocked(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Incorrect access password. Please try again.');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsUnlocked(false);
    setPasswordInput('');
    setPasswordError('');
  };

  const toggleVibeFilter = (vibeId) => {
    setSelectedVibes((prev) =>
      prev.includes(vibeId) ? prev.filter((id) => id !== vibeId) : [...prev, vibeId]
    );
  };

  const applySamplePrompt = (promptObj) => {
    setSearchQuery(promptObj.query);
    setSelectedVibes(promptObj.vibes || []);
  };

  const clearAllFilters = () => {
    setSelectedVibes([]);
    setSearchQuery('');
    setDurationFilter('all');
  };

  // Count how many tours belong to each vibe category
  const vibeCategoryCounts = useMemo(() => {
    const counts = {};
    for (const cat of VIBE_FILTER_CATEGORIES) {
      counts[cat.id] = TRAVEL_CURIOUS_BLACK_CAB_TOURS.filter((t) =>
        t.vibeTags.includes(cat.id)
      ).length;
    }
    return counts;
  }, []);

  // Dynamically score, filter, and rank tours
  const rankedTours = useMemo(() => {
    const scored = TRAVEL_CURIOUS_BLACK_CAB_TOURS.map((tour) => {
      const evaluation = scoreTourByVibes(tour, selectedVibes, searchQuery, durationFilter);
      return {
        ...tour,
        _visible: evaluation.visible,
        _matchScore: evaluation.matchScore,
        _matchedVibes: evaluation.matchedVibes
      };
    }).filter((t) => t._visible);

    return scored.sort((a, b) => b._matchScore - a._matchScore);
  }, [selectedVibes, searchQuery, durationFilter]);

  // Construct live API response preview
  const liveApiPayload = useMemo(() => {
    return {
      api_version: '2026.10.v1',
      partner_id: 'travel-curious',
      collection_slug: 'black-cab-heritage-tours',
      source_url: 'https://travelcurious.com/collections/black-cab-heritage-tours',
      excluded_segments: ['airport_transfers', 'station_transfers'],
      query_context: {
        active_vibe_filters: selectedVibes.length > 0 ? selectedVibes : 'ALL_VIBES',
        natural_language_prompt: searchQuery || null,
        duration_bucket: durationFilter,
        matched_tours_count: rankedTours.length
      },
      results: rankedTours.map((t, index) => ({
        rank: index + 1,
        tour_id: t.id,
        title: t.title,
        vibe_match_score: t._matchScore,
        vibe_archetype: t.vibeArchetype,
        matched_vibe_tags: t._matchedVibes,
        duration: t.durationLabel,
        price_from_gbp: t.priceFromGbp,
        booking_url: t.url,
        sensory_signature: t.sensorySignature,
        dna_telemetry_radar: t.dnaRadar,
        signature_moments: t.signatureMoments,
        ideal_guest_personas: t.idealPersonas
      }))
    };
  }, [rankedTours, selectedVibes, searchQuery, durationFilter]);

  const copyPayloadToClipboard = (obj) => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveTourModal(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!isUnlocked) {
    return (
      <Layout>
        <div className="tc-gate-wrapper">
          <div className="tc-gate-card">
            <div className="tc-gate-lock-icon">
              <Lock size={28} />
            </div>
            <div className="tc-gate-badge">
              <Sparkles size={12} /> PARTNER SANDBOX · PASSWORD PROTECTED
            </div>
            <form onSubmit={handlePasswordSubmit} className="tc-gate-form">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordError('');
                  setPasswordInput(e.target.value);
                }}
                placeholder="Enter access password"
                className="tc-gate-input"
                autoFocus
              />
              {passwordError && <p className="tc-gate-error">{passwordError}</p>}
              <button type="submit" className="tc-gate-btn">
                <ShieldCheck size={18} />
                <span>Unlock Vibe API Demo</span>
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="tc-vibe-page">
        {/* Sticky Partner Top Bar */}
        <div className="tc-top-bar">
          <div className="tc-top-bar-inner">
            <div className="tc-top-bar-left">
              <span className="tc-partner-pill">
                <Sparkles size={12} /> ATMOSVIBE API × TRAVEL CURIOUS
              </span>
              <a
                href="https://travelcurious.com/collections/black-cab-heritage-tours"
                target="_blank"
                rel="noopener noreferrer"
                className="tc-source-link"
              >
                <span>Collection: London Black Cab Heritage Tours</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <div className="tc-top-bar-right">
              <div className="tc-mode-toggle">
                <button
                  type="button"
                  className={`tc-mode-btn ${viewMode === 'discovery' ? 'active' : ''}`}
                  onClick={() => setViewMode('discovery')}
                >
                  <Compass size={14} />
                  <span>Vibe Discovery UI</span>
                </button>
                <button
                  type="button"
                  className={`tc-mode-btn ${viewMode === 'api-json' ? 'active' : ''}`}
                  onClick={() => setViewMode('api-json')}
                >
                  <Code2 size={14} />
                  <span>Live API Payload ({rankedTours.length})</span>
                </button>
              </div>

              <button type="button" onClick={handleLock} className="tc-lock-btn" title="Lock Demo">
                <Lock size={13} />
                <span>Lock</span>
              </button>
            </div>
          </div>
        </div>

        <div className="tc-container">
          {/* Hero Section */}
          <div className="tc-hero">
            <div className="tc-hero-eyebrow">
              <span>🚖 LONDON BLACK CAB HERITAGE COLLECTION · 16 EXPERIENCES MAPPED</span>
            </div>
            <h1 className="tc-hero-title">
              Discover London’s Iconic Black Cab Tours by{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #00e5ff, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Vibe Signature
              </span>
            </h1>
            <p className="tc-hero-subtitle">
              Every Travel Curious Black Cab Heritage Tour has been enriched with an 8-signal{' '}
              <strong>AtmosVibe Signature</strong>—mapping subcultural gravity, acoustic storytelling, visual aura, and
              circadian energy so travellers and concierges can match the right cab experience in seconds.
            </p>
          </div>

          {/* Interactive Vibe Filter & Prompt Control Panel */}
          <div className="tc-controls-panel">
            {/* Natural Language Vibe Search Input */}
            <div className="tc-search-row">
              <div className="tc-search-input-wrap">
                <Search size={18} className="tc-search-icon" />
                <input
                  type="text"
                  className="tc-search-input"
                  placeholder="Search tours by vibe, mood, film, era, or landmark (e.g. '60s Soho vinyl & Abbey Road', 'Victorian ghost alleys', 'Regency Bath')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="tc-clear-input-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* One-Click Vibe Prompts */}
            <div className="tc-prompts-row">
              <span className="tc-prompts-label">Try a Vibe Prompt:</span>
              {SAMPLE_VIBE_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="tc-prompt-chip"
                  onClick={() => applySamplePrompt(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* 8 Vibe Category Multi-Select Cards */}
            <div className="tc-vibe-filters-header">
              <div className="tc-vibe-filters-title">
                <SlidersHorizontal size={15} />
                <span>Filter by Tour Vibe Signature (Select one or combine multiple vibes)</span>
              </div>
              {(selectedVibes.length > 0 || searchQuery || durationFilter !== 'all') && (
                <button type="button" className="tc-reset-btn" onClick={clearAllFilters}>
                  Reset All Filters ({selectedVibes.length + (searchQuery ? 1 : 0) + (durationFilter !== 'all' ? 1 : 0)})
                </button>
              )}
            </div>

            <div className="tc-vibe-grid">
              {VIBE_FILTER_CATEGORIES.map((cat) => {
                const isSelected = selectedVibes.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`tc-vibe-filter-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleVibeFilter(cat.id)}
                  >
                    <div className="tc-vibe-filter-top">
                      <span className="tc-vibe-filter-name">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </span>
                      <span className="tc-vibe-count-badge">{vibeCategoryCounts[cat.id]}</span>
                    </div>
                    <span className="tc-vibe-filter-desc">{cat.shortDesc}</span>
                  </button>
                );
              })}
            </div>

            {/* Duration Filter Tabs + Live Match Counter */}
            <div className="tc-subcontrols-row">
              <div className="tc-duration-tabs">
                {[
                  { id: 'all', label: 'All Durations (16)' },
                  { id: 'express', label: '⚡ Express 2-Hr Tours' },
                  { id: 'half-day', label: '🌤️ Half-Day 4-Hr Tours' },
                  { id: 'full-day', label: '🏛️ Full-Day 5–8 Hr Tours' },
                  { id: 'extended', label: '🌄 Day Trips & 9–11 Hr Odysseys' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`tc-duration-tab ${durationFilter === tab.id ? 'active' : ''}`}
                    onClick={() => setDurationFilter(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="tc-results-counter">
                Showing <strong>{rankedTours.length}</strong> of {TRAVEL_CURIOUS_BLACK_CAB_TOURS.length} Heritage Tours
                {selectedVibes.length > 0 && ' · Ranked by Vibe Resonance'}
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: INTERACTIVE DISCOVERY GRID */}
          {viewMode === 'discovery' ? (
            rankedTours.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 1.5rem',
                  background: 'rgba(13, 20, 36, 0.7)',
                  borderRadius: '18px',
                  border: '1px solid rgba(148, 163, 184, 0.2)'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  No Black Cab tours matched that exact filter combination
                </h3>
                <p style={{ color: 'rgba(203, 213, 225, 0.75)', marginBottom: '1.25rem' }}>
                  Try clearing one of your filters or selecting our Bespoke "Build Your Own" Black Cab tours which can be tailored to any London vibe.
                </p>
                <button type="button" className="tc-gate-btn" style={{ maxWidth: '240px' }} onClick={clearAllFilters}>
                  Show All 16 Heritage Tours
                </button>
              </div>
            ) : (
              <div className="tc-tours-grid">
                {rankedTours.map((tour) => (
                  <article key={tour.id} className="tc-tour-card">
                    {/* Tour Image & Overlay Badges */}
                    <div className="tc-tour-media">
                      <img src={tour.imageUrl} alt={tour.title} className="tc-tour-img" loading="lazy" />
                      <div className="tc-tour-media-overlay" />
                      <div className="tc-tour-top-badges">
                        <span className="tc-duration-badge">
                          <Clock size={11} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                          {tour.durationLabel}
                        </span>
                        <span className="tc-match-badge">{tour._matchScore}% VIBE MATCH</span>
                      </div>
                      <div className="tc-tour-bottom-meta">
                        <span className="tc-archetype-tag">{tour.vibeArchetype}</span>
                        <span className="tc-price-tag">{tour.priceLabel}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="tc-tour-body">
                      <h2 className="tc-tour-title">{tour.title}</h2>
                      <p className="tc-tour-summary">{tour.shortSummary}</p>

                      {/* Vibe Pills */}
                      <div className="tc-vibe-pills-row">
                        {tour.vibePills.map((pill, idx) => (
                          <span key={idx} className="tc-vibe-pill">
                            ✦ {pill}
                          </span>
                        ))}
                        {tour.vibeTags.map((tagId) => {
                          const cat = VIBE_FILTER_CATEGORIES.find((c) => c.id === tagId);
                          if (!cat) return null;
                          const isHighlighted = selectedVibes.includes(tagId);
                          return (
                            <span
                              key={tagId}
                              className="tc-vibe-pill"
                              style={
                                isHighlighted
                                  ? {
                                      background: 'rgba(251, 191, 36, 0.2)',
                                      borderColor: '#fbbf24',
                                      color: '#fbbf24'
                                    }
                                  : {
                                      background: 'rgba(148, 163, 184, 0.12)',
                                      borderColor: 'rgba(148, 163, 184, 0.28)',
                                      color: '#cbd5e1'
                                    }
                              }
                            >
                              {cat.icon} {cat.label}
                            </span>
                          );
                        })}
                      </div>

                      {/* Sensory Snapshot */}
                      <div className="tc-sensory-box">
                        <div className="tc-sensory-row">
                          <span className="tc-sensory-label">Visual Aura:</span>
                          <span>{tour.sensorySignature.visualAura}</span>
                        </div>
                        <div className="tc-sensory-row">
                          <span className="tc-sensory-label">Storytelling:</span>
                          <span>{tour.sensorySignature.sonicMood}</span>
                        </div>
                        <div className="tc-sensory-row">
                          <span className="tc-sensory-label">Peak Window:</span>
                          <span>{tour.sensorySignature.circadianPeak}</span>
                        </div>
                      </div>

                      {/* 6-Axis Vibe DNA Telemetry Bars */}
                      <div className="tc-dna-mini-grid">
                        {DNA_LABELS.map(({ key, label }) => {
                          const val = tour.dnaRadar?.[key] || 85;
                          return (
                            <div key={key} className="tc-dna-bar-item">
                              <div className="tc-dna-bar-top">
                                <span>{label}</span>
                                <span style={{ color: '#00e5ff' }}>{val}/100</span>
                              </div>
                              <div className="tc-dna-track">
                                <div className="tc-dna-fill" style={{ width: `${val}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Actions */}
                      <div className="tc-tour-actions">
                        <button
                          type="button"
                          className="tc-btn-signature"
                          onClick={() => {
                            setActiveTourModal(tour);
                            setModalTab('signature');
                          }}
                        >
                          <Sparkles size={14} />
                          <span>Full Vibe Signature &amp; API</span>
                        </button>
                        <a
                          href={tour.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tc-btn-book"
                        >
                          <span>Book Tour</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : (
            /* VIEW MODE 2: LIVE ENTERPRISE API JSON SANDBOX */
            <div className="tc-controls-panel">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#00e5ff', letterSpacing: '1px' }}>
                    LIVE REST / GRAPHQL VIBE API RESPONSE
                  </div>
                  <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
                    GET /api/v1/vibe-search?partner=travel-curious&amp;collection=black-cab-heritage-tours
                  </h3>
                </div>
                <button
                  type="button"
                  className="tc-btn-signature"
                  style={{ flex: '0 0 auto', padding: '0.55rem 1rem' }}
                  onClick={() => copyPayloadToClipboard(liveApiPayload)}
                >
                  {copiedJson ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedJson ? 'Copied JSON!' : 'Copy Full JSON Payload'}</span>
                </button>
              </div>
              <pre className="tc-code-block">{JSON.stringify(liveApiPayload, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* FULL VIBE SIGNATURE & API JSON MODAL */}
        {activeTourModal && (
          <div className="tc-modal-backdrop" onClick={() => setActiveTourModal(null)}>
            <div className="tc-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="tc-modal-header">
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#fbbf24',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      marginBottom: '0.35rem'
                    }}
                  >
                    <Sparkles size={13} /> {activeTourModal.vibeArchetype} · {activeTourModal._matchScore}% Vibe Match
                  </div>
                  <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#ffffff' }}>{activeTourModal.title}</h2>
                  <div style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    Tour ID: <strong style={{ color: '#00e5ff' }}>{activeTourModal.id}</strong> · {activeTourModal.durationLabel} ·{' '}
                    <strong style={{ color: '#ffffff' }}>{activeTourModal.priceLabel}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="tc-modal-close"
                  onClick={() => setActiveTourModal(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Tabs */}
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  className={`tc-mode-btn ${modalTab === 'signature' ? 'active' : ''}`}
                  style={{ border: '1px solid rgba(0, 229, 255, 0.3)', padding: '8px 14px' }}
                  onClick={() => setModalTab('signature')}
                >
                  <Sparkles size={14} />
                  <span>AtmosVibe Tour Signature</span>
                </button>
                <button
                  type="button"
                  className={`tc-mode-btn ${modalTab === 'json' ? 'active' : ''}`}
                  style={{ border: '1px solid rgba(0, 229, 255, 0.3)', padding: '8px 14px' }}
                  onClick={() => setModalTab('json')}
                >
                  <Code2 size={14} />
                  <span>Tour API JSON Object</span>
                </button>
              </div>

              {modalTab === 'signature' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {/* Signature On-Route Moments */}
                  <div
                    style={{
                      background: 'rgba(5, 8, 17, 0.7)',
                      border: '1px solid rgba(0, 229, 255, 0.22)',
                      borderRadius: '14px',
                      padding: '1rem 1.15rem'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.9px',
                        color: '#00e5ff',
                        marginBottom: '0.65rem'
                      }}
                    >
                      Signature On-Route Vibe Moments
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      {(activeTourModal.signatureMoments || []).map((m, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: '#e2e8f0' }}>
                          <CheckCircle2 size={16} color="#00e5ff" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sensory Breakdown */}
                  <div className="tc-sensory-box" style={{ marginBottom: 0, fontSize: '0.84rem', padding: '1rem 1.15rem' }}>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">Visual Aura:</span>
                      <span>{activeTourModal.sensorySignature.visualAura}</span>
                    </div>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">Sonic &amp; Guide Mood:</span>
                      <span>{activeTourModal.sensorySignature.sonicMood}</span>
                    </div>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">Pacing &amp; Cadence:</span>
                      <span>{activeTourModal.sensorySignature.pacingCadence}</span>
                    </div>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">Circadian Peak:</span>
                      <span>{activeTourModal.sensorySignature.circadianPeak}</span>
                    </div>
                  </div>

                  {/* Ideal Traveler Personas */}
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.9px',
                        color: '#fbbf24',
                        marginBottom: '0.5rem'
                      }}
                    >
                      Highest-Converting Traveler Personas
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {(activeTourModal.idealPersonas || []).map((persona, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '999px',
                            background: 'rgba(251, 191, 36, 0.12)',
                            border: '1px solid rgba(251, 191, 36, 0.35)',
                            color: '#fde68a',
                            fontSize: '0.8rem',
                            fontWeight: 700
                          }}
                        >
                          👤 {persona}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Duration Variants if Bespoke 7-10h */}
                  {activeTourModal.durationVariants && (
                    <div
                      style={{
                        background: 'rgba(5, 8, 17, 0.65)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '12px',
                        padding: '0.9rem 1.1rem'
                      }}
                    >
                      <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#00e5ff', marginBottom: '0.55rem', textTransform: 'uppercase' }}>
                        Available Bespoke Duration Options on Travel Curious
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                        {activeTourModal.durationVariants.map((v, i) => (
                          <a
                            key={i}
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.55rem 0.75rem',
                              borderRadius: '8px',
                              background: 'rgba(0, 229, 255, 0.08)',
                              border: '1px solid rgba(0, 229, 255, 0.25)',
                              color: '#f8fafc',
                              textDecoration: 'none',
                              fontSize: '0.8rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <strong>{v.label}</strong>
                            <span style={{ color: '#00e5ff', fontWeight: 700 }}>{v.price}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
                    <a
                      href={activeTourModal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tc-btn-book"
                      style={{ padding: '0.75rem 1.35rem', fontSize: '0.88rem' }}
                    >
                      <span>View &amp; Book on Travel Curious</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.6rem' }}>
                    <button
                      type="button"
                      className="tc-btn-signature"
                      style={{ flex: '0 0 auto', padding: '0.45rem 0.9rem' }}
                      onClick={() => copyPayloadToClipboard(activeTourModal)}
                    >
                      {copiedJson ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedJson ? 'Copied!' : 'Copy Tour JSON'}</span>
                    </button>
                  </div>
                  <pre className="tc-code-block">{JSON.stringify(activeTourModal, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
}
