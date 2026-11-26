import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  RICHMOND_URLS,
  RICHMOND_STUDY_META,
  RICHMOND_LLM_BENCHMARK_TEST,
  RICHMOND_DESTINATION_SIGNATURE,
  RICHMOND_SCREEN_VS_REALITY_LOCATIONS,
  RICHMOND_HOTEL_SIGNATURES,
  RICHMOND_24HR_BLUEPRINT,
  buildRichmondRegistryJsonLd,
} from '../data/richmondRegistryData';
import './VibeInsights.css';

export default function RichmondStudyRegistryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedHotelId, setExpandedHotelId] = useState('bingham-riverhouse');

  const jsonLd = useMemo(() => buildRichmondRegistryJsonLd(), []);
  const kpis = RICHMOND_STUDY_META.kpis;

  return (
    <div className="vi-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="vi-container" style={{ paddingTop: '2.25rem' }}>
        {/* Top Navigation Bar */}
        <div
          className="vi-eyebrow-row"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Link to="/vibe-insights" className="vi-back-link">
              ← Vibe Insights Directory
            </Link>
            <Link
              to="/registry/london-south-bank"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#00e5ff',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                background: 'rgba(0, 229, 255, 0.08)',
              }}
            >
              South Bank (SE1) Registry →
            </Link>
            <Link
              to="/methodology"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#94a3b8',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(15, 23, 42, 0.6)',
              }}
            >
              8-Signal Methodology
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <a
              href={RICHMOND_URLS.carouselPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vi-btn-gold"
              style={{ textDecoration: 'none' }}
            >
              <span>Download 3-Page Study Summary (PDF)</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* HERO EXECUTIVE BLOCK */}
        <section className="vi-section" style={{ paddingTop: 0, paddingBottom: '1rem' }}>
          <div className="vi-category-block" style={{ padding: '2.5rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffd700',
                }}
              >
                VIBE INSIGHTS STUDY #03 &amp; RICHMOND REGISTRY • {RICHMOND_STUDY_META.studyCode} • VERIFIED{' '}
                {RICHMOND_STUDY_META.lastVerified}
              </div>

              <div
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#34d399',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ShieldCheck size={14} />
                <span>
                  Lead Scout: {RICHMOND_STUDY_META.leadScout.name} ({RICHMOND_STUDY_META.leadScout.handle})
                </span>
              </div>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.65rem, 2.85vw, 2.38rem)',
                fontWeight: 900,
                color: '#ffffff',
                margin: '0 0 1rem',
                lineHeight: 1.22,
                letterSpacing: '-0.02em',
              }}
            >
              Can ChatGPT Plan a Vibey Trip?{' '}
              <span className="vi-title-accent">
                We Tested AI Trip Planners on Ted Lasso’s Richmond
              </span>
            </h1>

            <p
              style={{
                fontSize: '0.96rem',
                color: '#cbd5e1',
                lineHeight: 1.72,
                margin: 0,
                maxWidth: '950px',
              }}
            >
              According to <strong>Expedia Group’s Unpack research</strong>,{' '}
              <strong>two-thirds ({kpis.expediaSetJettingAllPct}%) of travellers</strong> - and{' '}
              <strong>{kpis.expediaSetJettingNextGenPct}% of Gen Z and Millennials</strong> - say films and streaming
              series now influence where they travel, while <strong>VisitBritain</strong> reports that{' '}
              <strong>{kpis.visitBritainScreenVisitPct}% of recent UK international visitors</strong> visited a film or
              TV location. We gave <strong>ChatGPT, Google Gemini and Perplexity</strong> the exact same prompt -{' '}
              <em>“Plan a Ted Lasso trip to Richmond, London with the best atmosphere”</em> - and audited their
              recommendations on the ground. All <strong>3 out of 3 LLMs</strong> sent visitors to the exact same
              250-metre filming checklist, while <strong>0 out of 3</strong> mentioned the real village pub atmosphere
              sitting <strong>60 metres across the Green</strong>.
            </p>

            {/* 4 100% Backed-Up Executive KPI Cards */}
            <div className="vi-kpi-grid" style={{ marginTop: '1.85rem' }}>
              <div className="vi-kpi-card vi-kpi-card--cyan">
                <div className="vi-kpi-label" style={{ color: '#00e5ff' }}>
                  1. Screen Tourism Scale
                </div>
                <div className="vi-kpi-value" style={{ color: '#00e5ff' }}>
                  {kpis.expediaSetJettingAllPct}% / {kpis.expediaSetJettingNextGenPct}%
                </div>
                <div className="vi-kpi-desc">
                  <strong>Expedia Unpack:</strong> 66% of all travellers (and 81% of Gen Z &amp; Millennials) are
                  influenced by TV/film; <strong>53%</strong> of UK visitors visit a screen location (VisitBritain).
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--rose">
                <div className="vi-kpi-label" style={{ color: '#fb7185' }}>
                  2. The 3-LLM Prompt Test
                </div>
                <div className="vi-kpi-value" style={{ color: '#fb7185' }}>
                  3 / 3
                  <span className="vi-kpi-unit"> Same Corner</span>
                </div>
                <div className="vi-kpi-desc">
                  <strong>ChatGPT, Gemini &amp; Perplexity</strong> all funnel visitors to 28 The Green &amp; 3.5m-wide
                  Paved Court - while 2 of 3 send visitors to <strong>Selhurst Park (14 miles away in SE25)</strong>.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--gold">
                <div className="vi-kpi-label" style={{ color: '#ffd700' }}>
                  3. Missed 60m Across the Green
                </div>
                <div className="vi-kpi-value" style={{ color: '#ffd700' }}>
                  0 / 3
                  <span className="vi-kpi-unit"> LLMs Mention</span>
                </div>
                <div className="vi-kpi-desc">
                  <strong>0 out of 3 AI models</strong> mention walking 60m across the grass to{' '}
                  <strong>The Coach &amp; Horses (29 The Green • 94.8 Vibe)</strong> or the 1.2 km walk to Petersham
                  Meadows.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--emerald">
                <div className="vi-kpi-label" style={{ color: '#34d399' }}>
                  4. Real 24-Hour Richmond Vibe
                </div>
                <div className="vi-kpi-value" style={{ color: '#34d399' }}>
                  {kpis.real24HrVibeScore}
                  <span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  Verified across AtmosVibe’s <strong>8 Vibe Signals</strong>: <strong>82% independent venues</strong>,
                  6 audited local spots &amp; 3 boutique riverside/hilltop hotels.
                </div>
              </div>
            </div>

            {/* Reproducible 3-LLM Benchmark Panel */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.25rem 1.4rem',
                borderRadius: '14px',
                background: 'rgba(7, 14, 28, 0.82)',
                border: '1px solid rgba(0, 229, 255, 0.22)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '0.85rem',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#00e5ff', textTransform: 'uppercase' }}>
                  REPRODUCIBLE 3-LLM BENCHMARK • PROMPT TESTED: {RICHMOND_LLM_BENCHMARK_TEST.promptTested}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
                  Models Tested: {RICHMOND_LLM_BENCHMARK_TEST.modelsTested.join(' • ')}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
                  gap: '0.9rem',
                }}
              >
                {RICHMOND_LLM_BENCHMARK_TEST.findings.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.75)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px',
                        marginBottom: '6px',
                      }}
                    >
                      <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffffff' }}>{f.label}</span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 800,
                          color: f.badgeColor,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          border: `1px solid ${f.badgeColor}`,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {f.verdict}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.81rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>{f.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            margin: '0.5rem 0 1.25rem',
          }}
        >
          <div className="vi-filter-pills">
            {[
              { id: 'all', label: 'Full Study & Richmond Registry (All Sections)' },
              { id: 'screen-vs-reality', label: '1. What the 3 LLMs Say vs. Real Atmosphere (6 Spots)' },
              { id: 'blueprint', label: '2. The 24-Hour Richmond Plan' },
              { id: 'signals', label: '3. Destination 8 Vibe Signals (94.2/100)' },
              { id: 'hotels', label: '4. Where to Stay Overnight (3 Boutique Hotels)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`vi-filter-pill ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 1: WHAT THE 3 LLMs SAY VS. WHERE THE REAL ATMOSPHERE IS */}
        {(activeTab === 'all' || activeTab === 'screen-vs-reality') && (
          <section className="vi-section" style={{ paddingTop: '0.25rem', paddingBottom: '1.5rem' }}>
            <div className="vi-section-header">
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#ffd700',
                    marginBottom: '0.35rem',
                  }}
                >
                  SECTION 1 • LLM OUTPUT VS. ON-THE-GROUND ATMOSPHERE (6 AUDITED RICHMOND LOCATIONS)
                </div>
                <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  What ChatGPT, Gemini &amp; Perplexity Recommend vs. Where the Real Vibe Lives
                </h2>
              </div>

              <a
                href={RICHMOND_URLS.carouselPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vi-action-btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                <span>Open 3-Page Study Chart Deck (PDF) ↗</span>
              </a>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '1.2rem',
              }}
            >
              {RICHMOND_SCREEN_VS_REALITY_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="vi-category-block"
                  style={{
                    padding: '1.6rem 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    border:
                      loc.id === 'coach-and-horses'
                        ? '1px solid rgba(255, 215, 0, 0.45)'
                        : undefined,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        flexWrap: 'wrap',
                        marginBottom: '0.55rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: loc.id === 'coach-and-horses' ? '#ffd700' : '#00e5ff',
                        }}
                      >
                        LOCATION #{loc.checkpointNumber} • {loc.registryCode}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 800,
                            color: loc.scores.llmMentions.startsWith('0') ? '#ffd700' : '#fb7185',
                            background: loc.scores.llmMentions.startsWith('0')
                              ? 'rgba(255, 215, 0, 0.12)'
                              : 'rgba(244, 63, 94, 0.12)',
                            border: loc.scores.llmMentions.startsWith('0')
                              ? '1px solid rgba(255, 215, 0, 0.35)'
                              : '1px solid rgba(244, 63, 94, 0.3)',
                            padding: '2px 8px',
                            borderRadius: '999px',
                          }}
                        >
                          AI Test: {loc.scores.llmMentions}
                        </span>
                        <span
                          style={{
                            fontSize: '12.5px',
                            fontWeight: 900,
                            color: '#34d399',
                            background: 'rgba(16, 185, 129, 0.14)',
                            border: '1px solid rgba(16, 185, 129, 0.35)',
                            padding: '2px 10px',
                            borderRadius: '999px',
                          }}
                        >
                          Real Vibe: {loc.scores.verifiedOptimalVibe}
                        </span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: '0 0 4px' }}>
                      {loc.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '0.85rem' }}>
                      📍 {loc.address} • <strong style={{ color: '#cbd5e1' }}>{loc.screenRole}</strong>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gap: '0.65rem',
                        marginBottom: '0.9rem',
                      }}
                    >
                      <div
                        style={{
                          padding: '0.75rem 0.9rem',
                          borderRadius: '10px',
                          background: 'rgba(244, 63, 94, 0.07)',
                          border: '1px solid rgba(244, 63, 94, 0.22)',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 800,
                            color: '#fb7185',
                            textTransform: 'uppercase',
                            marginBottom: '3px',
                          }}
                        >
                          🤖 What the 3 Tested LLMs Do:
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.55, margin: 0 }}>
                          {loc.selfieTrapReality}
                        </p>
                      </div>

                      <div
                        style={{
                          padding: '0.75rem 0.9rem',
                          borderRadius: '10px',
                          background: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 800,
                            color: '#34d399',
                            textTransform: 'uppercase',
                            marginBottom: '3px',
                          }}
                        >
                          ✅ Verified Street Reality &amp; Best Atmosphere:
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.55, margin: 0 }}>
                          {loc.verifiedStreetReality}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        background: 'rgba(7, 14, 28, 0.72)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        fontSize: '0.8rem',
                        color: '#e2e8f0',
                        display: 'grid',
                        gap: '5px',
                        marginBottom: '0.85rem',
                      }}
                    >
                      <div>
                        <strong style={{ color: '#ffd700' }}>⏰ Best Time to Visit:</strong> {loc.bestWindow}
                      </div>
                      <div>
                        <strong style={{ color: '#34d399' }}>🚶 Walking Distance:</strong> {loc.walkFromAnchor}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {loc.signals.map((sig, i) => (
                      <span key={i} className="vi-data-pill">
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: THE 24-HOUR RICHMOND PLAN */}
        {(activeTab === 'all' || activeTab === 'blueprint') && (
          <section className="vi-section" style={{ paddingTop: '0.25rem', paddingBottom: '1.5rem' }}>
            <div className="vi-category-block" style={{ padding: '2rem 2.25rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '1.15rem',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#34d399',
                      marginBottom: '0.35rem',
                    }}
                  >
                    SECTION 2 • UPGRADING THE GENERIC AI CHECKLIST INTO A 24-HOUR NEIGHBOURHOOD STAY
                  </div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    How Three Simple Shifts Unlock the Real Richmond
                  </h2>
                </div>

                <a
                  href={RICHMOND_URLS.coachAndHorsesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vi-btn-gold"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Visit Local Pub Anchor: The Coach &amp; Horses (29 The Green)</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))',
                  gap: '1rem',
                }}
              >
                {RICHMOND_24HR_BLUEPRINT.map((step, i) => (
                  <div key={i} className="vi-diag-panel" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffd700', textTransform: 'uppercase' }}>
                      {step.time}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#00e5ff' }}>{step.phase}</div>
                    <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', margin: '2px 0 4px' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: TIER 1 DESTINATION 8 VIBE SIGNALS */}
        {(activeTab === 'all' || activeTab === 'signals') && (
          <section className="vi-section" style={{ paddingTop: '0.25rem', paddingBottom: '1.5rem' }}>
            <div className="vi-category-block" style={{ padding: '2rem 2.25rem' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#00e5ff',
                  marginBottom: '0.35rem',
                }}
              >
                SECTION 3 • CANONICAL DESTINATION VIBE SIGNATURE (RICHMOND TW9 / TW10 • 94.2/100)
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: '0 0 1.25rem' }}>
                The 8 Verified Real-World Signals of Richmond-upon-Thames
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem',
                }}
              >
                {RICHMOND_DESTINATION_SIGNATURE.eightSignals.map((sig) => (
                  <div
                    key={sig.number}
                    className="vi-diag-panel"
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '6px',
                        }}
                      >
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#00e5ff' }}>
                          SIGNAL #{sig.number} • {sig.factRatio}
                        </span>
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: 900,
                            color: '#34d399',
                            background: 'rgba(16, 185, 129, 0.12)',
                            padding: '2px 8px',
                            borderRadius: '999px',
                          }}
                        >
                          {sig.score}/100
                        </span>
                      </div>
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>
                        {sig.signal}
                      </h3>
                      <p style={{ fontSize: '0.83rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                        {sig.verification}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: WHERE TO STAY OVERNIGHT (3 AUDITED RICHMOND BOUTIQUE HOTELS) */}
        {(activeTab === 'all' || activeTab === 'hotels') && (
          <section className="vi-section" style={{ paddingTop: '0.5rem', paddingBottom: '2.25rem' }}>
            <div className="vi-section-header">
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#34d399',
                    marginBottom: '0.35rem',
                  }}
                >
                  SECTION 4 • OVERNIGHT STAYS (3 AUDITED RICHMOND BOUTIQUE HOTELS)
                </div>
                <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  Where to Stay Overnight: Riverside &amp; Hilltop Boutique Hotels
                </h2>
              </div>
            </div>

            <div className="vi-hotels-stack">
              {RICHMOND_HOTEL_SIGNATURES.map((hotel, idx) => {
                const isExpanded = expandedHotelId === hotel.id;
                return (
                  <div key={hotel.id} className={`vi-hotel-card ${isExpanded ? 'expanded' : ''}`}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setExpandedHotelId(isExpanded ? '' : hotel.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedHotelId(isExpanded ? '' : hotel.id);
                        }
                      }}
                      className="vi-hotel-summary-bar"
                    >
                      <div className="vi-hotel-identity">
                        <span className="vi-hotel-rank">0{idx + 1}</span>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <h3 className="vi-hotel-name">{hotel.name}</h3>
                            <span className="vi-cluster-tag">{hotel.postcode}</span>
                          </div>
                          <div className="vi-hotel-sub-diagnostic" style={{ color: '#cbd5e1' }}>
                            {hotel.heroTag}
                          </div>
                        </div>
                      </div>

                      <div className="vi-hotel-metrics">
                        <div className="vi-metric-box">
                          <span className="vi-metric-label">Physical Vibe</span>
                          <span className="vi-metric-val" style={{ color: '#34d399' }}>
                            {hotel.scores.physicalVibe}
                          </span>
                        </div>
                        <div className="vi-metric-box">
                          <span className="vi-metric-label">Golden Hour Light</span>
                          <span className="vi-metric-val" style={{ color: '#ffd700' }}>
                            {hotel.scores.riverLightScore}
                          </span>
                        </div>
                        <div className="vi-metric-box">
                          <span className="vi-metric-label">Neighbourhood Fit</span>
                          <span className="vi-metric-val" style={{ color: '#00e5ff' }}>
                            {hotel.scores.localNeighbourhoodFit}
                          </span>
                        </div>

                        <div className="vi-expand-icon">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="vi-hotel-expanded-body">
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.15rem',
                          }}
                        >
                          <div className="vi-diag-panel">
                            <div
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                color: '#34d399',
                                textTransform: 'uppercase',
                                marginBottom: '6px',
                              }}
                            >
                              💚 Honest Fit: Love This Property If...
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.58, margin: '0 0 10px' }}>
                              {hotel.loveThisIf}
                            </p>
                            <div
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                color: '#fb7185',
                                textTransform: 'uppercase',
                                marginBottom: '4px',
                              }}
                            >
                              ⚠️ Avoid / Skip If...
                            </div>
                            <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                              {hotel.avoidThisIf}
                            </p>
                          </div>

                          <div className="vi-diag-panel">
                            <div
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                color: '#00e5ff',
                                textTransform: 'uppercase',
                                marginBottom: '8px',
                              }}
                            >
                              🚶 Timed Walks to Richmond Green &amp; River Path
                            </div>
                            <div style={{ display: 'grid', gap: '6px' }}>
                              {hotel.timedWalks.map((tw, i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    fontSize: '0.83rem',
                                    paddingBottom: '5px',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                  }}
                                >
                                  <span style={{ color: '#f8fafc', fontWeight: 600 }}>{tw.gem}</span>
                                  <span style={{ color: '#00e5ff', fontWeight: 700 }}>{tw.walk}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="vi-diag-panel">
                            <div
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                color: '#ffd700',
                                textTransform: 'uppercase',
                                marginBottom: '6px',
                              }}
                            >
                              🌅 Setting &amp; Golden-Hour Atmosphere
                            </div>
                            <p style={{ fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.58, margin: '0 0 10px' }}>
                              <strong>Setting ({hotel.scores.stayFeel}):</strong> {hotel.atmosphereProfile}
                            </p>
                            <div style={{ fontSize: '0.81rem', color: '#94a3b8' }}>
                              <strong>Natural Light:</strong> {hotel.lightProfile}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '0.75rem',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <div style={{ fontSize: '0.81rem', color: '#94a3b8' }}>
                            <strong>Canonical Entity ID:</strong> <code>{hotel.registryCode}</code> • {hotel.address}
                          </div>

                          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <a
                              href={hotel.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vi-action-btn-secondary"
                              style={{ textDecoration: 'none' }}
                            >
                              <span>Official Property Website ↗</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Editorial Independence & Methodology Footer Block */}
        <section className="vi-section" style={{ paddingTop: 0, paddingBottom: '3rem' }}>
          <div className="vi-category-block" style={{ padding: '1.75rem 2rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ maxWidth: '780px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#34d399',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  UK CMA &amp; DMCC ACT EDITORIAL INDEPENDENCE • CANONICAL DATASET CITATION
                </div>
                <p style={{ fontSize: '0.83rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                  All AtmosVibe Vibe Signatures and 3-LLM benchmark findings for Richmond-upon-Thames (
                  <code>{RICHMOND_DESTINATION_SIGNATURE.registryCode}</code>) are independently verified on-site under a
                  Creative Commons CC-BY 4.0 open citation licence.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <a
                  href="/datasets/london-richmond-llm-benchmark.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vi-action-btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Open JSON Dataset ↗</span>
                </a>
                <Link to="/methodology" className="vi-action-btn-secondary" style={{ textDecoration: 'none' }}>
                  <span>Read 8-Signal Methodology</span>
                </Link>
                <a
                  href={RICHMOND_URLS.carouselPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vi-btn-gold"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Download 3-Page Study Deck (PDF)</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
