import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Building2,
  Compass,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Clock,
  Volume2,
  Sun,
} from 'lucide-react';
import {
  REGISTRY_URLS,
  SOUTH_BANK_DESTINATION_SIGNATURE,
  SOUTH_BANK_HOTEL_SIGNATURES,
  SOUTH_BANK_LOCAL_GEM_SIGNATURES,
  ATMOSVIBE_METHODOLOGY_DATA,
  buildSouthBankRegistryJsonLd,
} from '../data/southBankRegistryData';
import './VibeInsights.css';

export default function SouthBankRegistryPage() {
  const [expandedHotelId, setExpandedHotelId] = useState('sea-containers');
  const [activeTierFilter, setActiveTierFilter] = useState('all');

  const jsonLd = useMemo(() => buildSouthBankRegistryJsonLd(), []);

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
              to="/vibe-insights/london-local-destination-gap"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#ffd700',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 215, 0, 0.35)',
                background: 'rgba(255, 215, 0, 0.08)',
              }}
            >
              Part II: Local Destination “Walled Garden” Study →
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

          <a
            href={REGISTRY_URLS.travelvrseSouthBankHub}
            target="_blank"
            rel="noopener noreferrer"
            className="vi-btn-gold"
            style={{ textDecoration: 'none' }}
          >
            <span>Explore Live Consumer Hub on TravelVRSE</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* TIER 1: DESTINATION VIBE SIGNATURE (SOUTH BANK SE1) */}
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
                  color: '#00e5ff',
                }}
              >
                CANONICAL SENSORY REGISTRY • {SOUTH_BANK_DESTINATION_SIGNATURE.registryCode} • VERIFIED{' '}
                {SOUTH_BANK_DESTINATION_SIGNATURE.lastVerified}
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
                <span>Lead Scout: {SOUTH_BANK_DESTINATION_SIGNATURE.leadScout.name} ({SOUTH_BANK_DESTINATION_SIGNATURE.leadScout.handle})</span>
              </div>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.65rem, 2.8vw, 2.35rem)',
                fontWeight: 900,
                color: '#ffffff',
                margin: '0 0 1rem',
                lineHeight: 1.22,
                letterSpacing: '-0.02em',
              }}
            >
              London South Bank (SE1):{' '}
              <span className="vi-title-accent">
                Destination, Hotel &amp; Local Gem Vibe Signatures
              </span>
            </h1>

            <p
              style={{
                fontSize: '0.96rem',
                color: '#cbd5e1',
                lineHeight: 1.72,
                margin: 0,
                maxWidth: '940px',
              }}
            >
              In Part II of our London 10 Lifestyle Hotel Study, we showed that flagship hotels score{' '}
              <strong>88.4/100</strong> at promoting their own bars yet drop to{' '}
              <strong>45.5/100</strong> at connecting guests to their surrounding neighbourhood. This canonical{' '}
              <strong>South Bank (SE1) Vibe Signature Registry</strong> bridges that gap — uniting the verified{' '}
              <strong>Destination Vibe Signature (91.3/100)</strong>, <strong>3 audited South Bank boutique hotels</strong>, and{' '}
              <strong>6 zero-chain local gems &amp; cultural attractions</strong> into a single machine-readable graph powering both B2B hotel merchandising and live consumer discovery on{' '}
              <a
                href={REGISTRY_URLS.travelvrseSouthBankHub}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#00e5ff', fontWeight: 700 }}
              >
                TravelVRSE
              </a>
              .
            </p>

            {/* 4 Destination KPI Cards */}
            <div className="vi-kpi-grid" style={{ marginTop: '1.85rem' }}>
              <div className="vi-kpi-card vi-kpi-card--emerald">
                <div className="vi-kpi-label" style={{ color: '#34d399' }}>
                  1. Destination Vibe Signature
                </div>
                <div className="vi-kpi-value" style={{ color: '#34d399' }}>
                  {SOUTH_BANK_DESTINATION_SIGNATURE.compositeVibeScore}
                  <span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  Brutalist riverside cultural icons (Tate Modern, BFI) paired with mid-century maritime rooftops &amp; artisan courtyards.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--cyan">
                <div className="vi-kpi-label" style={{ color: '#00e5ff' }}>
                  2. Pedestrian Walkability
                </div>
                <div className="vi-kpi-value" style={{ color: '#00e5ff' }}>
                  {SOUTH_BANK_DESTINATION_SIGNATURE.walkabilityScore}
                  <span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  Timed on foot: <strong>2–8 minute flat walking corridors</strong> connecting all 3 audited hotels to 6 cultural &amp; culinary anchors.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--gold">
                <div className="vi-kpi-label" style={{ color: '#ffd700' }}>
                  3. Independent Gem Ratio
                </div>
                <div className="vi-kpi-value" style={{ color: '#ffd700' }}>
                  {SOUTH_BANK_DESTINATION_SIGNATURE.independentGemRatioPct}%
                  <span className="vi-kpi-unit"> Zero-Chain</span>
                </div>
                <div className="vi-kpi-desc">
                  Anchored by <strong>Gabriel’s Wharf</strong> (strict zero-chain artisan charter 120m from Sea Containers) &amp; <strong>Borough Market</strong>.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--rose">
                <div className="vi-kpi-label" style={{ color: '#fb7185' }}>
                  4. Sleep Sanctuary vs. Buzz
                </div>
                <div className="vi-kpi-value" style={{ color: '#fb7185' }}>
                  34–37<span className="vi-kpi-unit"> dB Quiet</span>
                </div>
                <div className="vi-kpi-desc">
                  Verified acoustic contrast between <strong>68 dB</strong> rooftop/bar buzz and <strong>34–37 dB</strong> glazed upper suites &amp; inland mews.
                </div>
              </div>
            </div>

            {/* Diurnal Rhythm Bar */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.15rem 1.35rem',
                borderRadius: '14px',
                background: 'rgba(7, 14, 28, 0.72)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#00e5ff', textTransform: 'uppercase' }}>
                  ☀️ Morning ({SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.morning.window}) • {SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.morning.db}
                </div>
                <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '3px' }}>
                  {SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.morning.feel}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#ffd700', textTransform: 'uppercase' }}>
                  🚶 Afternoon ({SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.afternoon.window}) • {SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.afternoon.db}
                </div>
                <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '3px' }}>
                  {SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.afternoon.feel}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#fb7185', textTransform: 'uppercase' }}>
                  🌇 Golden Hour ({SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.goldenHour.window}) • {SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.goldenHour.db}
                </div>
                <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '3px' }}>
                  {SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.goldenHour.feel}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
                  🌙 Late Night ({SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.lateNight.window}) • {SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.lateNight.db}
                </div>
                <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '3px' }}>
                  {SOUTH_BANK_DESTINATION_SIGNATURE.diurnalAcoustics.lateNight.feel}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Filter Bar for Tier 1 (8 District Signals) / Tier 2 (Hotels) / Tier 3 (Local Gems) */}
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
              { id: 'all', label: 'All 3 Registry Tiers (Destination + 3 Hotels + 6 Local Gems)' },
              { id: 'destination', label: 'Tier 1: Destination 8 Signals' },
              { id: 'hotels', label: 'Tier 2: South Bank Hotels (3)' },
              { id: 'gems', label: 'Tier 3: Local Gems & Attractions (6)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTierFilter(tab.id)}
                className={`vi-filter-pill ${activeTierFilter === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TIER 1B: THE 8 VERIFIED DESTINATION VIBE SIGNALS */}
        {(activeTierFilter === 'all' || activeTierFilter === 'destination') && (
          <section className="vi-section" style={{ paddingTop: '0.25rem', paddingBottom: '1.25rem' }}>
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
                TIER 1 • DESTINATION VIBE SIGNATURE BREAKDOWN (SOUTH BANK SE1)
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: '0 0 1.25rem' }}>
                The 8 Verified Real-World Signals of London’s South Bank
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem',
                }}
              >
                {SOUTH_BANK_DESTINATION_SIGNATURE.eightSignals.map((sig) => (
                  <div key={sig.number} className="vi-diag-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

        {/* TIER 2: SOUTH BANK HOTEL VIBE SIGNATURES */}
        {(activeTierFilter === 'all' || activeTierFilter === 'hotels') && (
          <section className="vi-section" style={{ paddingTop: '0.5rem', paddingBottom: '1.25rem' }}>
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
                  TIER 2 • AUDITED HOTEL VIBE SIGNATURES &amp; HONEST-FIT VERDICTS (3 PROPERTIES)
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  South Bank Boutique Hotel Vibe Signatures
                </h2>
              </div>

              <a
                href={REGISTRY_URLS.travelvrseCompare}
                target="_blank"
                rel="noopener noreferrer"
                className="vi-action-btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                <span>Compare Sea Containers vs. Bankside on TravelVRSE ↗</span>
              </a>
            </div>

            <div className="vi-hotels-stack">
              {SOUTH_BANK_HOTEL_SIGNATURES.map((hotel, idx) => {
                const isExpanded = expandedHotelId === hotel.id;
                return (
                  <div
                    key={hotel.id}
                    className={`vi-hotel-card ${isExpanded ? 'expanded' : ''}`}
                  >
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
                            {hotel.inLondon10Study && (
                              <span
                                style={{
                                  fontSize: '10.5px',
                                  fontWeight: 800,
                                  padding: '2px 8px',
                                  borderRadius: '999px',
                                  background: 'rgba(255, 215, 0, 0.14)',
                                  color: '#ffd700',
                                  border: '1px solid rgba(255, 215, 0, 0.35)',
                                }}
                              >
                                In London 10 Study
                              </span>
                            )}
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
                          <span className="vi-metric-label">Own Vibe (Web)</span>
                          <span className="vi-metric-val" style={{ color: '#00e5ff' }}>
                            {hotel.scores.ownPropertyDigital}
                          </span>
                        </div>
                        <div className="vi-metric-box">
                          <span className="vi-metric-label">Local Area (Web)</span>
                          <span
                            className="vi-metric-val"
                            style={{
                              color:
                                hotel.scores.localDestinationDigital >= 60
                                  ? '#34d399'
                                  : '#ffd700',
                            }}
                          >
                            {hotel.scores.localDestinationDigital}
                          </span>
                        </div>
                        <div className="vi-metric-box">
                          <span className="vi-metric-label">OTA Top-5</span>
                          <span className="vi-metric-val" style={{ color: '#fb7185' }}>
                            {hotel.scores.otaTop5Hero}
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
                          {/* Love This If / Avoid This If */}
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

                          {/* Timed Walking Corridors to Local Gems */}
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
                              🚶 Timed Pedestrian Walks to Local Gems
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
                            <div style={{ fontSize: '0.79rem', color: '#94a3b8', marginTop: '8px' }}>
                              <strong>Acoustics:</strong> {hotel.acousticProfile}
                            </div>
                          </div>

                          {/* Vibe Insights Multi-Channel Audit Connection */}
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
                              📊 Vibe Insights Multi-Channel Benchmark Note
                            </div>
                            <p style={{ fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.58, margin: '0 0 10px' }}>
                              {hotel.vibeInsightsAuditNote}
                            </p>
                            <div style={{ fontSize: '0.79rem', color: '#94a3b8' }}>
                              <strong>Golden Hour &amp; Light:</strong> {hotel.lightProfile}
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
                            {hotel.vibeInsightsPart1Url && (
                              <Link to={hotel.vibeInsightsPart1Url} className="vi-action-btn-secondary">
                                <span>Inspect 5 Booking.com Hero Photos (Study Part I)</span>
                              </Link>
                            )}
                            <a
                              href={hotel.travelvrseCompareUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vi-btn-gold"
                              style={{ textDecoration: 'none' }}
                            >
                              <span>View on TravelVRSE South Bank Hub</span>
                              <ArrowUpRight size={13} />
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

        {/* TIER 3: VERIFIED LOCAL GEMS & CULTURAL ATTRACTIONS VIBE SIGNATURES */}
        {(activeTierFilter === 'all' || activeTierFilter === 'gems') && (
          <section className="vi-section" style={{ paddingTop: '0.5rem', paddingBottom: '2.5rem' }}>
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
                  TIER 3 • LOCAL GEMS, MARKETS &amp; CULTURAL ATTRACTIONS (6 VERIFIED VIBE SIGNATURES)
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  South Bank Local Gems &amp; Cultural Attraction Signatures
                </h2>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1.15rem',
              }}
            >
              {SOUTH_BANK_LOCAL_GEM_SIGNATURES.map((gem) => (
                <div
                  key={gem.id}
                  className="vi-category-block"
                  style={{
                    padding: '1.5rem 1.65rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#00e5ff',
                        }}
                      >
                        {gem.registryCode} • {gem.category}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 900,
                          color: '#34d399',
                          background: 'rgba(16, 185, 129, 0.14)',
                          border: '1px solid rgba(16, 185, 129, 0.35)',
                          padding: '3px 10px',
                          borderRadius: '999px',
                        }}
                      >
                        {gem.vibeScore} Vibe
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: '0 0 4px' }}>
                      {gem.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '0.75rem' }}>
                      📍 {gem.address}
                    </div>

                    <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 0.9rem' }}>
                      {gem.vibeSignatureSummary}
                    </p>

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
                        <strong style={{ color: '#ffd700' }}>⏰ Peak Vibe Window:</strong> {gem.bestWindow}
                      </div>
                      <div>
                        <strong style={{ color: '#00e5ff' }}>🔊 Acoustic Profile:</strong> {gem.acousticProfile}
                      </div>
                      <div>
                        <strong style={{ color: '#34d399' }}>💚 Love This If:</strong> {gem.loveThisIf}
                      </div>
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px' }}>
                      Timed Walk Radii from Audited South Bank Hotels:
                    </div>
                    <div style={{ display: 'grid', gap: '3px', marginBottom: '0.85rem' }}>
                      {gem.walkFromHotels.map((w, i) => (
                        <div key={i} style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                          • {w}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {gem.signals.map((sig, i) => (
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
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: '4px' }}>
                  UK CMA &amp; DMCC ACT EDITORIAL INDEPENDENCE • CANONICAL DATASET CITATION
                </div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                  {ATMOSVIBE_METHODOLOGY_DATA.editorialDisclosure}
                </p>
              </div>

              <Link to="/methodology" className="vi-action-btn-secondary">
                <span>Read Full 8-Signal Methodology →</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
