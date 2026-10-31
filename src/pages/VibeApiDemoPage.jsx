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
  Check,
  Trophy,
  Zap
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

export default function VibeApiDemoPage() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Pure Atmospheric Filters & Mood Search state
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('discovery'); // 'discovery' | 'before-after' | 'api-json'

  // Modal state for inspecting a single tour's full Vibe Signature + JSON payload
  const [activeTourModal, setActiveTourModal] = useState(null);
  const [modalTab, setModalTab] = useState('signature'); // 'signature' | 'json'
  const [copiedJson, setCopiedJson] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const cleaned = passwordInput.trim().toLowerCase();
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

  // Dynamically score, filter, and rank tours purely by Atmospheric Vibe Match
  const rankedTours = useMemo(() => {
    const scored = TRAVEL_CURIOUS_BLACK_CAB_TOURS.map((tour) => {
      const evaluation = scoreTourByVibes(tour, selectedVibes, searchQuery);
      return {
        ...tour,
        _visible: evaluation.visible,
        _matchScore: evaluation.matchScore,
        _matchedVibes: evaluation.matchedVibes
      };
    }).filter((t) => t._visible);

    return scored.sort((a, b) => b._matchScore - a._matchScore);
  }, [selectedVibes, searchQuery]);

  const isFilteringActive = selectedVibes.length > 0 || searchQuery.trim().length > 0;
  const top3Shortlist = useMemo(() => rankedTours.slice(0, 3), [rankedTours]);

  // Construct live API response preview
  const liveApiPayload = useMemo(() => {
    return {
      api_version: '2026.10.v2-pure-vibe',
      partner_id: 'travel-curious',
      collection_slug: 'black-cab-heritage-tours',
      source_url: 'https://travelcurious.com/collections/black-cab-heritage-tours',
      query_context: {
        active_mood_filters: selectedVibes.length > 0 ? selectedVibes : 'ALL_MOODS',
        vibe_prompt: searchQuery || null,
        shortlist_winners: top3Shortlist.map((t, i) => ({
          shortlist_rank: i + 1,
          tour_id: t.id,
          title: t.title,
          vibe_archetype: t.vibeArchetype,
          why_it_wins_shortlist: t.shortlistHook
        }))
      },
      results: rankedTours.map((t, index) => ({
        rank: index + 1,
        tour_id: t.id,
        title: t.title,
        vibe_match_score: t._matchScore,
        vibe_archetype: t.vibeArchetype,
        shortlist_hook: t.shortlistHook,
        matched_vibe_tags: t._matchedVibes,
        five_signal_vibe_signature: t.fiveSignalSignature,
        signature_on_route_moments: t.signatureMoments,
        booking_url: t.url
      }))
    };
  }, [rankedTours, top3Shortlist, selectedVibes, searchQuery]);

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
                <span>London Black Cab Heritage Collection</span>
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
                  <span>Vibe Shortlist &amp; Discovery</span>
                </button>
                <button
                  type="button"
                  className={`tc-mode-btn ${viewMode === 'before-after' ? 'active' : ''}`}
                  onClick={() => setViewMode('before-after')}
                >
                  <Zap size={14} />
                  <span>Before vs. After Catalogue</span>
                </button>
                <button
                  type="button"
                  className={`tc-mode-btn ${viewMode === 'api-json' ? 'active' : ''}`}
                  onClick={() => setViewMode('api-json')}
                >
                  <Code2 size={14} />
                  <span>Live Vibe API JSON</span>
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
              <span>🚖 WINNING THE SHORTLIST THROUGH PURE ATMOSPHERE</span>
            </div>
            <h1 className="tc-hero-title">
              Match the London Mood You Want to{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #00e5ff, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Step Inside
              </span>
            </h1>
            <p className="tc-hero-subtitle">
              Travellers don’t shortlist a tour because of a dry route list—they shortlist an{' '}
              <strong>atmosphere, an era, and a feeling</strong>. Select a London mood below to elevate the top
              Black Cab experiences to the <strong>#1 spot on the shortlist</strong>.
            </p>
          </div>

          {/* Interactive Mood Filter & Vibe Prompt Panel */}
          <div className="tc-controls-panel">
            {/* Natural Language Vibe Search Input */}
            <div className="tc-search-row">
              <div className="tc-search-input-wrap">
                <Search size={18} className="tc-search-icon" />
                <input
                  type="text"
                  className="tc-search-input"
                  placeholder="Describe the London atmosphere you want to feel (e.g. 'Swinging 60s Soho vinyl', 'Gaslit Victorian Noir at dusk', 'Blue-hour Thames lights')..."
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

            {/* One-Click Mood Prompts */}
            <div className="tc-prompts-row">
              <span className="tc-prompts-label">Instant Mood Prompts:</span>
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

            {/* 8 Pure Atmospheric Mood Filters */}
            <div className="tc-vibe-filters-header">
              <div className="tc-vibe-filters-title">
                <SlidersHorizontal size={15} />
                <span>How Do You Want London to Feel? (Select one or blend multiple atmospheres)</span>
              </div>
              {isFilteringActive && (
                <button type="button" className="tc-reset-btn" onClick={clearAllFilters}>
                  Clear Mood Filters ({selectedVibes.length + (searchQuery ? 1 : 0)})
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
                    <span className="tc-vibe-mood-words">{cat.moodWord}</span>
                    <span className="tc-vibe-filter-desc">{cat.shortDesc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VIEW MODE 1: VIBE SHORTLIST & DISCOVERY */}
          {viewMode === 'discovery' && (
            <>
              {/* TOP 3 SHORTLIST WINNERS BANNER */}
              {rankedTours.length > 0 && (
                <div className="tc-shortlist-spotlight">
                  <div className="tc-shortlist-header">
                    <div className="tc-shortlist-badge">
                      <Trophy size={16} />
                      <span>
                        {isFilteringActive
                          ? `Top ${Math.min(3, rankedTours.length)} Vibe Shortlist Winners for Your Selected Mood`
                          : 'Top 3 Flagship Vibe Shortlist Winners'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                      Showing <strong>{rankedTours.length}</strong> atmospheric matches
                    </span>
                  </div>

                  <div className="tc-shortlist-grid">
                    {top3Shortlist.map((tour, idx) => (
                      <div key={tour.id} className="tc-shortlist-mini-card">
                        <div className="tc-shortlist-rank-row">
                          <span className="tc-shortlist-rank-pill">
                            #{idx + 1} SHORTLIST MATCH · {tour._matchScore}% VIBE
                          </span>
                          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>
                            {tour.durationLabel}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff' }}>
                          {tour.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00e5ff' }}>
                          ✦ {tour.vibeArchetype}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.79rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                          {tour.shortlistHook}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FULL CARDS GRID */}
              {rankedTours.length === 0 ? (
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
                    No single preset tour matched that exact mood blend
                  </h3>
                  <p style={{ color: 'rgba(203, 213, 225, 0.75)', marginBottom: '1.25rem' }}>
                    Clear one mood filter or select <strong>Secret Alleyways &amp; Insider "Knowledge"</strong> to see our bespoke Black Cab editions that blend multiple London moods.
                  </p>
                  <button type="button" className="tc-gate-btn" style={{ maxWidth: '240px' }} onClick={clearAllFilters}>
                    Reset Mood Filters
                  </button>
                </div>
              ) : (
                <div className="tc-tours-grid">
                  {rankedTours.map((tour, index) => {
                    const isTop3 = index < 3;
                    return (
                      <article
                        key={tour.id}
                        className={`tc-tour-card ${isTop3 ? 'shortlist-winner' : ''}`}
                      >
                        {/* Tour Image & Overlay Badges */}
                        <div className="tc-tour-media">
                          <img src={tour.imageUrl} alt={tour.title} className="tc-tour-img" loading="lazy" />
                          <div className="tc-tour-media-overlay" />
                          <div className="tc-tour-top-badges">
                            {isTop3 ? (
                              <span className="tc-rank-ribbon">🏆 #{index + 1} Shortlist Winner</span>
                            ) : (
                              <span className="tc-duration-badge">
                                <Clock size={11} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                                {tour.durationLabel}
                              </span>
                            )}
                            <span className="tc-match-badge">{tour._matchScore}% VIBE MATCH</span>
                          </div>
                          <div className="tc-tour-bottom-meta">
                            <span className="tc-archetype-tag">{tour.vibeArchetype}</span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="tc-tour-body">
                          <h2 className="tc-tour-title">{tour.title}</h2>

                          {/* Why This Wins the Shortlist Hook */}
                          <div className="tc-shortlist-hook-box">
                            <strong style={{ color: '#00e5ff' }}>Why it wins the shortlist: </strong>
                            {tour.shortlistHook}
                          </div>

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

                          {/* The 5-Signal Tour Vibe Signature */}
                          <div className="tc-sensory-box">
                            <div className="tc-sensory-row">
                              <span className="tc-sensory-label">🎭 Era &amp; World:</span>
                              <span>{tour.fiveSignalSignature.eraWorld}</span>
                            </div>
                            <div className="tc-sensory-row">
                              <span className="tc-sensory-label">🌆 Visual Aura:</span>
                              <span>{tour.fiveSignalSignature.visualAura}</span>
                            </div>
                            <div className="tc-sensory-row">
                              <span className="tc-sensory-label">🎙️ Host Energy:</span>
                              <span>{tour.fiveSignalSignature.raconteurEnergy}</span>
                            </div>
                            <div className="tc-sensory-row">
                              <span className="tc-sensory-label">🎵 Emotional Mood:</span>
                              <span>{tour.fiveSignalSignature.emotionalMood}</span>
                            </div>
                            <div className="tc-sensory-row">
                              <span className="tc-sensory-label">🕰️ Peak Window:</span>
                              <span>{tour.fiveSignalSignature.peakWindow}</span>
                            </div>
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
                              <span>Inspect Vibe Signature</span>
                            </button>
                            <a
                              href={tour.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tc-btn-book"
                            >
                              <span>Explore Tour</span>
                              <ExternalLink size={13} />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* VIEW MODE 2: BEFORE VS AFTER (FIXING CATALOGUE BLUR) */}
          {viewMode === 'before-after' && (
            <div className="tc-controls-panel">
              <div style={{ marginBottom: '1.35rem' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  WHY TOURS LOSE THE SHORTLIST · BEFORE VS. AFTER ATMOSVIBE
                </div>
                <h2 style={{ margin: '0.25rem 0 0.4rem', fontSize: '1.4rem' }}>
                  Eliminating "Catalogue Commodity Blur" Through Atmospheric Signatures
                </h2>
                <p style={{ margin: 0, color: 'rgba(203, 213, 225, 0.8)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                  On Travel Curious’s current collection page, tours are described as flat landmark lists—and their bespoke Black Cab listings repeat the exact same sentence (<em>"Discover iconic London attractions and hidden gems, all from the back seat of a London taxi"</em>). See how AtmosVibe transforms flat copy into magnetic, shortlist-winning atmosphere:
                </p>
              </div>

              <div className="tc-compare-list">
                {rankedTours.map((tour) => (
                  <div key={tour.id} className="tc-compare-row">
                    {/* BEFORE: Current Live Travel Curious Card */}
                    <div className="tc-compare-before">
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.4rem' }}>
                        ❌ Current Travel Curious Listing (Logistics / Route Copy)
                      </div>
                      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.02rem', color: '#f8fafc' }}>{tour.title}</h3>
                      <p style={{ margin: '0 0 0.75rem', fontSize: '0.84rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.5 }}>
                        "{tour.originalCatalogueCopy}"
                      </p>
                      <div style={{ fontSize: '0.76rem', color: '#fca5a5' }}>
                        <strong>Why it risks drop-off:</strong> Zero sensory mood, zero host energy, and no atmospheric hook to stand out on a traveller’s shortlist.
                      </div>
                    </div>

                    {/* AFTER: AtmosVibe Enriched Tour Signature */}
                    <div className="tc-compare-after">
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.4rem' }}>
                        ✦ AtmosVibe 5-Signal Signature ({tour.vibeArchetype})
                      </div>
                      <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.02rem', color: '#ffffff' }}>{tour.title}</h3>
                      <p style={{ margin: '0 0 0.65rem', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                        <strong style={{ color: '#fbbf24' }}>Shortlist Hook: </strong>
                        {tour.shortlistHook}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.74rem' }}>
                        <span className="tc-vibe-pill">🎭 {tour.fiveSignalSignature.eraWorld}</span>
                        <span className="tc-vibe-pill">🎵 {tour.fiveSignalSignature.emotionalMood}</span>
                        <span className="tc-vibe-pill">🕰️ {tour.fiveSignalSignature.peakWindow}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW MODE 3: LIVE VIBE API JSON */}
          {viewMode === 'api-json' && (
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
                    LIVE ATMOSVIBE SHORTLIST &amp; SIGNATURE PAYLOAD
                  </div>
                  <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem' }}>
                    GET /api/v1/vibe-shortlist?partner=travel-curious&amp;collection=black-cab-heritage-tours
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
                  <span>5-Signal Atmospheric Signature</span>
                </button>
                <button
                  type="button"
                  className={`tc-mode-btn ${modalTab === 'json' ? 'active' : ''}`}
                  style={{ border: '1px solid rgba(0, 229, 255, 0.3)', padding: '8px 14px' }}
                  onClick={() => setModalTab('json')}
                >
                  <Code2 size={14} />
                  <span>Tour Vibe API JSON</span>
                </button>
              </div>

              {modalTab === 'signature' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {/* Why it wins the shortlist */}
                  <div className="tc-shortlist-hook-box" style={{ marginBottom: 0, fontSize: '0.9rem' }}>
                    <strong style={{ color: '#00e5ff' }}>Why It Wins the Shortlist: </strong>
                    {activeTourModal.shortlistHook}
                  </div>

                  {/* 5-Signal Sensory Breakdown */}
                  <div className="tc-sensory-box" style={{ marginBottom: 0, fontSize: '0.84rem', padding: '1rem 1.15rem' }}>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">🎭 Era &amp; World:</span>
                      <span>{activeTourModal.fiveSignalSignature.eraWorld}</span>
                    </div>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">🌆 Visual Aura:</span>
                      <span>{activeTourModal.fiveSignalSignature.visualAura}</span>
                    </div>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">🎙️ Host Energy:</span>
                      <span>{activeTourModal.fiveSignalSignature.raconteurEnergy}</span>
                    </div>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">🎵 Emotional Mood:</span>
                      <span>{activeTourModal.fiveSignalSignature.emotionalMood}</span>
                    </div>
                    <div className="tc-sensory-row">
                      <span className="tc-sensory-label">🕰️ Peak Window:</span>
                      <span>{activeTourModal.fiveSignalSignature.peakWindow}</span>
                    </div>
                  </div>

                  {/* 3 Cinematic On-Route Vibe Moments */}
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
                      3 Signature On-Route Atmospheric Moments
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

                  {/* Before vs After Copy Comparison inside Modal */}
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.06)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '12px',
                      padding: '0.85rem 1.05rem',
                      fontSize: '0.8rem',
                      color: '#cbd5e1'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: '#fca5a5', marginBottom: '0.25rem', fontSize: '0.73rem', textTransform: 'uppercase' }}>
                      Original Travel Curious Catalogue Description (Before AtmosVibe):
                    </div>
                    <em>"{activeTourModal.originalCatalogueCopy}"</em>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
                    <a
                      href={activeTourModal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tc-btn-book"
                      style={{ padding: '0.75rem 1.35rem', fontSize: '0.88rem' }}
                    >
                      <span>View on Travel Curious</span>
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
