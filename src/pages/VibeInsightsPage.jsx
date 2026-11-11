import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  ExternalLink,
  Lock,
  Unlock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Eye,
  Camera,
  X,
  ShieldCheck,
} from 'lucide-react';
import {
  LONDON_10_STUDY_META,
  LONDON_10_HOTELS,
} from '../data/london10StudyData';
import { validateWorkEmail, isLocalhostEnvironment } from '../utils/workEmailValidator';
import './VibeInsights.css';

const isLocalhost = isLocalhostEnvironment();

export default function VibeInsightsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialHotelParam = searchParams.get('hotel') || '';
  const initialClaimParam = searchParams.get('claim') === '1';

  const [selectedCluster, setSelectedCluster] = useState('All 10 Icons');
  const [expandedHotelId, setExpandedHotelId] = useState(initialHotelParam);
  const [openDetailsByHotel, setOpenDetailsByHotel] = useState({});
  const [claimModalHotel, setClaimModalHotel] = useState(null);
  const [claimedHotels, setClaimedHotels] = useState({});
  const [claimEmailError, setClaimEmailError] = useState('');
  const [claimForm, setClaimForm] = useState({
    name: '',
    email: '',
    role: 'General Manager / Hotel Leadership',
  });
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  const toggleHotelDetails = (hotelId, e) => {
    if (e) e.stopPropagation();
    setOpenDetailsByHotel((prev) => ({
      ...prev,
      [hotelId]: !prev[hotelId],
    }));
  };

  useEffect(() => {
    const hotelFromQuery = searchParams.get('hotel');
    if (hotelFromQuery) {
      const match = LONDON_10_HOTELS.find((h) => h.id === hotelFromQuery);
      if (match) {
        setExpandedHotelId(match.id);
        if (initialClaimParam) {
          setClaimModalHotel(match);
        }
        setTimeout(() => {
          const el = document.getElementById(`hotel-${match.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, initialClaimParam]);

  const clusters = [
    'All 10 Icons',
    'South Bank',
    'Shoreditch',
    'Fitzrovia & Marylebone',
    "King's Cross & City",
  ];

  const filteredHotels = useMemo(() => {
    if (selectedCluster === 'All 10 Icons') return LONDON_10_HOTELS;
    return LONDON_10_HOTELS.filter((h) => h.cluster === selectedCluster);
  }, [selectedCluster]);

  const openClaimDossier = (hotel, e) => {
    if (e) e.stopPropagation();
    setClaimEmailError('');
    setExpandedHotelId(hotel.id);
    setClaimModalHotel(hotel);
    setSearchParams({ hotel: hotel.id, claim: '1' }, { replace: true });
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!claimModalHotel) return;

    const emailCheck = validateWorkEmail(claimForm.email);
    if (!emailCheck.valid) {
      setClaimEmailError(emailCheck.message);
      return;
    }
    setClaimEmailError('');

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xaqlrjor';
    try {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: claimForm.name,
          email: claimForm.email,
          role: claimForm.role,
          hotelName: claimModalHotel.name,
          neighborhood: claimModalHotel.neighborhood,
          city: 'London',
          timestamp: new Date().toISOString(),
          source: 'Vibe Insights - London 10 Study Dossier Claim',
        }),
      });
    } catch (err) {
      // Non-blocking
    }

    setClaimedHotels((prev) => ({
      ...prev,
      [claimModalHotel.id]: {
        claimedAt: new Date().toISOString(),
        email: claimForm.email,
        role: claimForm.role,
        name: claimForm.name || 'Verified Property Team',
      },
    }));
  };

  const handleInstantUnlockDemo = (hotel) => {
    setClaimedHotels((prev) => ({
      ...prev,
      [hotel.id]: {
        claimedAt: new Date().toISOString(),
        email: `gm@${hotel.id.replace(/-/g, '')}.com`,
        role: 'Executive Preview (Instant Unlock)',
        name: `${hotel.name} Leadership Team`,
      },
    }));
  };

  const studyJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          '@id': `${LONDON_10_STUDY_META.canonicalUrl}#study`,
          headline: LONDON_10_STUDY_META.title,
          description: LONDON_10_STUDY_META.subtitle,
          datePublished: LONDON_10_STUDY_META.publishDate,
          dateModified: LONDON_10_STUDY_META.publishDate,
          identifier: LONDON_10_STUDY_META.studyCode,
          author: {
            '@type': 'Organization',
            name: 'AtmosVibe Hospitality Intelligence',
            url: 'https://atmosvibe.io',
          },
          publisher: {
            '@type': 'Organization',
            name: 'AtmosVibe',
            url: 'https://atmosvibe.io',
          },
          sdPublisher: {
            '@type': 'Organization',
            name: 'AtmosVibe',
            url: 'https://atmosvibe.io',
          },
        },
        {
          '@type': 'Dataset',
          '@id': `${LONDON_10_STUDY_META.canonicalUrl}#dataset`,
          name: '2026 London Lifestyle Hotel Vibe Dataset: Physical Presence vs. Owned Digital (Own Vibe & Local Destination) vs. Booking.com Top-5 Gallery',
          description: LONDON_10_STUDY_META.subtitle,
          url: LONDON_10_STUDY_META.canonicalUrl,
          creator: {
            '@type': 'Organization',
            name: 'AtmosVibe',
            url: 'https://atmosvibe.io',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${LONDON_10_STUDY_META.canonicalUrl}#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Do top lifestyle hotels market their local destination vibe effectively on owned websites and social media?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'In the 2026 AtmosVibe audit of 10 flagship London lifestyle hotels, properties scored 88.4/100 at marketing their own internal bars, rooftops, and design on owned websites and Instagram, yet averaged just 45.5/100 at marketing their local neighbourhood and destination vibe — operating largely as self-contained F&B walled gardens.',
              },
            },
            {
              '@type': 'Question',
              name: 'What images appear in the Top-5 Booking.com gallery slots of London lifestyle hotels?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Across 50 audited Top-5 Hero slots on Booking.com, 70% (35 of 50) were occupied by repetitive bedrooms, couches, bathroom sinks, toiletries, or gym treadmills (averaging 56.5/100 vs. 92.5/100 physical reality). Only 14% showcased rooftop bars or signature restaurants, and only 16% showed destination views or architectural landmarks.',
              },
            },
          ],
        },
      ],
    }),
    []
  );

  return (
    <div className="vi-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studyJsonLd) }}
      />

      <div className="vi-container" style={{ paddingTop: '2.25rem' }}>
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
          <Link to="/vibe-insights" className="vi-back-link">
            ← Vibe Insights Directory
          </Link>

          <button
            type="button"
            onClick={() => openClaimDossier(LONDON_10_HOTELS[0])}
            className="vi-btn-gold"
          >
            <Unlock size={13} />
            <span>Claim Property Report (10 London Hotels)</span>
          </button>
        </div>

        {/* 1. Executive Summary + 4 Score Containers Underneath */}
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
                EXECUTIVE SUMMARY • LONDON LIFESTYLE HOTEL VIBE STUDY
              </div>

              <a
                href="#london-10-scoreboard"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ffd700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span>View 10-Hotel Scoreboard &amp; Claim Report ↓</span>
              </a>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.65rem, 2.8vw, 2.35rem)',
                fontWeight: 900,
                color: '#ffffff',
                margin: '0 0 1.15rem',
                lineHeight: 1.22,
                letterSpacing: '-0.02em',
              }}
            >
              Two Digital Blind Spots:{' '}
              <span className="vi-title-accent">
                The “Walled Garden” on Owned Channels &amp; Utility Clutter on OTAs
              </span>
            </h1>

            <p style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: 1.75, margin: 0, maxWidth: '900px' }}>
              Modern leisure travellers increasingly choose hotels for three drivers:{' '}
              <strong>overall atmosphere and vibe</strong>,{' '}
              <strong>destination restaurants and rooftop bars</strong>, and{' '}
              <strong>walkable neighbourhood character</strong>. To test how hotels deliver on this shift digitally, AtmosVibe audited{' '}
              <strong>10 of London’s most iconic lifestyle hotels</strong> across South Bank, Shoreditch, Fitzrovia, Marylebone, King’s Cross, and the City — revealing a stark divide across their physical, owned, and OTA touchpoints:
            </p>

            {/* 4 Score Containers Directly Under Executive Summary */}
            <div className="vi-kpi-grid" style={{ marginTop: '2rem' }}>
              <div className="vi-kpi-card vi-kpi-card--emerald">
                <div className="vi-kpi-label" style={{ color: '#34d399' }}>
                  A. Physical Vibe &amp; Experiences
                </div>
                <div className="vi-kpi-value" style={{ color: '#34d399' }}>
                  {LONDON_10_STUDY_META.kpis.avgPhysicalVibeScore}
                  <span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  Extraordinary real-world architecture, destination rooftops &amp; dining rooms, and prime walkable London districts.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--cyan">
                <div className="vi-kpi-label" style={{ color: '#00e5ff' }}>
                  B1. Owned Digital: Vibe &amp; Experiences
                </div>
                <div className="vi-kpi-value" style={{ color: '#00e5ff' }}>
                  {LONDON_10_STUDY_META.kpis.avgOwnPropertyDigitalScore}
                  <span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  Hotel websites &amp; Instagram excel at showcasing <strong>their own</strong> internal bars, signature dining, and design DNA.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--gold">
                <div className="vi-kpi-label" style={{ color: '#ffd700' }}>
                  B2. Owned Digital: Local Vibe
                </div>
                <div className="vi-kpi-value" style={{ color: '#ffd700' }}>
                  {LONDON_10_STUDY_META.kpis.avgLocalDestinationDigitalScore}
                  <span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  <strong>The “Walled Garden” Blind Spot:</strong> Aside from <em>The Hoxton</em> &amp; <em>One Hundred Shoreditch</em>, top hotels barely market the street culture outside their doors.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--rose">
                <div className="vi-kpi-label" style={{ color: '#fb7185' }}>
                  C. OTA Top-5 Hero Score
                </div>
                <div className="vi-kpi-value" style={{ color: '#fb7185' }}>
                  {LONDON_10_STUDY_META.kpis.avgOtaTop5Score}
                  <span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  <strong>70% of Booking.com Hero slots</strong> show repetitive beds, sinks, soap bottles &amp; treadmills — vs. just <strong>14%</strong> social/culinary &amp; <strong>16%</strong> destination.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive 10-Hotel Scoreboard */}
        <section id="london-10-scoreboard" className="vi-section">
          <div className="vi-section-header">
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#00e5ff',
                  marginBottom: '0.35rem',
                }}
              >
                10-HOTEL BENCHMARK • PHYSICAL vs. OWN DIGITAL vs. LOCAL DIGITAL vs. OTA TOP-5
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                The 10-Hotel London Lifestyle Scoreboard
              </h2>
            </div>

            <div className="vi-filter-pills">
              {clusters.map((cluster) => (
                <button
                  key={cluster}
                  type="button"
                  onClick={() => setSelectedCluster(cluster)}
                  className={`vi-filter-pill ${selectedCluster === cluster ? 'active' : ''}`}
                >
                  {cluster}
                </button>
              ))}
            </div>
          </div>

          <div className="vi-hotels-stack">
            {filteredHotels.map((hotel) => {
              const isExpanded = expandedHotelId === hotel.id;
              const isClaimed = Boolean(claimedHotels[hotel.id]);

              return (
                <div
                  key={hotel.id}
                  id={`hotel-${hotel.id}`}
                  className={`vi-hotel-card ${isExpanded ? 'expanded' : ''}`}
                >
                  {/* Clickable Summary Row */}
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
                    className="vi-hotel-summary-row"
                  >
                    <div className="vi-hotel-left">
                      <div className="vi-hotel-thumb-wrap">
                        <img src={hotel.localSlot1Hero} alt={hotel.name} />
                        <span className="vi-hotel-rank-badge">#{hotel.index}</span>
                      </div>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="vi-hotel-name-row">
                          <h3 className="vi-hotel-name">{hotel.name}</h3>
                          <span className="vi-data-pill">{hotel.neighborhood}</span>
                          {isClaimed && (
                            <span
                              className="vi-status-pill vi-status-pill--live"
                              style={{ fontSize: '10px' }}
                            >
                              ✓ Dossier Unlocked
                            </span>
                          )}
                        </div>

                        <p className="vi-hotel-praise">{hotel.realWorldVibePraise}</p>

                        <div className="vi-defect-tag">
                          <AlertTriangle size={13} />
                          <span>OTA Top-5 Hero Mix: {hotel.otaDiagnosticTag}</span>
                        </div>
                      </div>
                    </div>

                    <div className="vi-hotel-right">
                      <div className="vi-score-box vi-score-box--real" style={{ minWidth: '72px' }}>
                        <div className="vi-score-box-label" style={{ color: '#34d399' }}>
                          Physical
                        </div>
                        <div className="vi-score-box-val" style={{ color: '#34d399', fontSize: '1.15rem' }}>
                          {hotel.mathVibeScore}
                        </div>
                      </div>

                      <div
                        className="vi-score-box"
                        style={{
                          minWidth: '72px',
                          background: 'rgba(0, 229, 255, 0.08)',
                          borderColor: 'rgba(0, 229, 255, 0.28)',
                        }}
                      >
                        <div className="vi-score-box-label" style={{ color: '#00e5ff' }}>
                          Own Vibe
                        </div>
                        <div className="vi-score-box-val" style={{ color: '#00e5ff', fontSize: '1.15rem' }}>
                          {hotel.ownPropertyDigitalScore}
                        </div>
                      </div>

                      <div
                        className="vi-score-box"
                        style={{
                          minWidth: '72px',
                          background: 'rgba(255, 215, 0, 0.08)',
                          borderColor: 'rgba(255, 215, 0, 0.28)',
                        }}
                      >
                        <div className="vi-score-box-label" style={{ color: '#ffd700' }}>
                          Local Vibe
                        </div>
                        <div className="vi-score-box-val" style={{ color: '#ffd700', fontSize: '1.15rem' }}>
                          {hotel.localDestinationDigitalScore}
                        </div>
                      </div>

                      <div className="vi-score-box vi-score-box--ota" style={{ minWidth: '72px' }}>
                        <div className="vi-score-box-label" style={{ color: '#fb7185' }}>
                          OTA Top-5
                        </div>
                        <div className="vi-score-box-val" style={{ color: '#fb7185', fontSize: '1.15rem' }}>
                          {hotel.otaTop5Score}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => openClaimDossier(hotel, e)}
                        className="vi-btn-gold"
                      >
                        {isClaimed ? <Unlock size={13} /> : <Lock size={13} />}
                        <span>{isClaimed ? 'View Dossier' : 'Claim Report'}</span>
                      </button>

                      <div style={{ color: '#94a3b8', padding: '0 4px' }}>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded 5-Slot Filmstrip & 3-Column Breakdown (Mounted in DOM for SEO/Crawlers) */}
                  <div
                    className="vi-hotel-expanded"
                    style={{ display: isExpanded ? undefined : 'none' }}
                  >
                      {/* 5-Slot Bento Strip */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '0.75rem',
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              color: '#00e5ff',
                            }}
                          >
                            <Camera size={14} />
                            <span>
                              Pillar C: Live Booking.com Top-5 Hero Images ({hotel.heroTop5Mix.summary})
                            </span>
                          </div>
                          <a
                            href={hotel.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '11.5px',
                              color: '#94a3b8',
                              textDecoration: 'none',
                            }}
                          >
                            <span>Verify Live Booking.com Listing</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>

                        <div className="vi-slots-grid">
                          {hotel.top5.map((slotItem) => (
                            <div
                              key={slotItem.photoId}
                              onClick={() => setActivePhotoModal({ hotel, slotItem })}
                              className={`vi-slot-card ${
                                slotItem.isCommodity ? 'vi-slot-card--drag' : 'vi-slot-card--good'
                              }`}
                            >
                              <div>
                                <div className="vi-slot-img-wrap">
                                  <img
                                    src={
                                      slotItem.slot === 1
                                        ? hotel.localSlot1Hero
                                        : slotItem.imageUrl
                                    }
                                    alt={slotItem.title}
                                    onError={(e) => {
                                      e.currentTarget.src = hotel.localSlot1Hero;
                                    }}
                                  />
                                  <span className="vi-slot-num-badge">SLOT #{slotItem.slot}</span>
                                  <span
                                    className="vi-slot-status-badge"
                                    style={{
                                      background: slotItem.isCommodity ? '#f43f5e' : '#10b981',
                                      color: slotItem.isCommodity ? '#ffffff' : '#040914',
                                    }}
                                  >
                                    {slotItem.isCommodity ? 'Utility / Duplicate' : 'Vibe Hero'}
                                  </span>
                                </div>

                                <div className="vi-slot-body">
                                  <div
                                    className="vi-slot-verdict"
                                    style={{
                                      color: slotItem.isCommodity ? '#fda4af' : '#6ee7b7',
                                    }}
                                  >
                                    {slotItem.slotVerdict}
                                  </div>
                                  <div className="vi-slot-caption">
                                    OTA AI Caption: “{slotItem.title}”
                                  </div>
                                </div>
                              </div>

                              <div className="vi-slot-footer">
                                <span>Click to inspect &amp; replace</span>
                                <Eye size={12} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Click-to-Expand Bar for Full Channel Breakdown & 5-Slot Sequence */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '0.75rem',
                          marginTop: '1.15rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <button
                          type="button"
                          onClick={(e) => toggleHotelDetails(hotel.id, e)}
                          className="vi-action-btn-secondary"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#00e5ff',
                            borderColor: 'rgba(0, 229, 255, 0.35)',
                            background: 'rgba(0, 229, 255, 0.06)',
                          }}
                        >
                          <span>
                            {openDetailsByHotel[hotel.id]
                              ? 'Hide Channel Breakdown & Recommended 5-Slot Sequence'
                              : 'View Owned Digital Breakdown, Buried Icons & 5-Slot Fix'}
                          </span>
                          {openDetailsByHotel[hotel.id] ? (
                            <ChevronUp size={15} />
                          ) : (
                            <ChevronDown size={15} />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => openClaimDossier(hotel, e)}
                          className="vi-btn-gold"
                        >
                          <Unlock size={14} />
                          <span>Claim Full {hotel.name} Report</span>
                        </button>
                      </div>

                      {/* 3-Column Diagnostic Breakdown (Hidden Until Clicked) */}
                      <div
                        className="vi-diag-grid"
                        style={{
                          display: openDetailsByHotel[hotel.id] ? undefined : 'none',
                        }}
                      >
                        {/* Col 1: Owned Digital Split (Own Vibe vs. Local Destination) */}
                        <div
                          onClick={(e) => openClaimDossier(hotel, e)}
                          className="vi-diag-panel"
                          style={{ cursor: 'pointer' }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                color: '#00e5ff',
                                marginBottom: '0.65rem',
                              }}
                            >
                              Owned Digital &amp; Social: Own Vibe vs. Local Destination
                            </div>

                            <div className="vi-math-row">
                              <span>A. Physical Vibe Score</span>
                              <strong style={{ color: '#34d399' }}>{hotel.mathVibeScore} / 100</strong>
                            </div>
                            <div className="vi-math-row">
                              <span>B1. Owned Digital — Own Property Vibe</span>
                              <strong style={{ color: '#00e5ff' }}>{hotel.ownPropertyDigitalScore} / 100</strong>
                            </div>
                            <div className="vi-math-row">
                              <span>B2. Owned Digital — Local Destination Vibe</span>
                              <strong style={{ color: '#ffd700' }}>{hotel.localDestinationDigitalScore} / 100</strong>
                            </div>
                            <div className="vi-math-row">
                              <span>C. Booking.com Top-5 Hero Score</span>
                              <strong style={{ color: '#fb7185' }}>{hotel.otaTop5Score} / 100</strong>
                            </div>

                            <div style={{ marginTop: '0.85rem' }}>
                              <div style={{ fontSize: '11px', fontWeight: 800, color: '#00e5ff', marginBottom: '3px' }}>
                                Own Property Marketing ({hotel.ownPropertyDigitalScore}/100):
                              </div>
                              <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.55, margin: '0 0 0.65rem' }}>
                                {hotel.ownPropertyDigitalSummary}
                              </p>
                              <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffd700', marginBottom: '3px' }}>
                                Local Destination Marketing ({hotel.localDestinationDigitalScore}/100):
                              </div>
                              <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                                {hotel.localDestinationDigitalSummary}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Col 2: OTA Reality & Missing Heroes */}
                        <div
                          onClick={(e) => openClaimDossier(hotel, e)}
                          className="vi-diag-panel"
                          style={{ cursor: 'pointer' }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                color: '#fb7185',
                                marginBottom: '0.5rem',
                              }}
                            >
                              OTA Top-5 Diagnosis &amp; Buried Icons
                            </div>
                            <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '0.75rem', lineHeight: 1.55 }}>
                              {hotel.otaRealitySummary}
                            </p>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                              Missing from Booking.com Top 5:
                            </div>
                            {hotel.buriedGems.map((gem, idx) => (
                              <div key={idx} className="vi-math-row" style={{ color: '#e2e8f0' }}>
                                <span>✕ {gem}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#ffd700', marginTop: '0.5rem' }}>
                            Click to unlock full {hotel.totalPhotos}-photo audit →
                          </div>
                        </div>

                        {/* Col 3: Rule of 5 Fix (Email-Gated Until Claimed) */}
                        <div
                          onClick={(e) => openClaimDossier(hotel, e)}
                          className="vi-diag-panel"
                          style={{ cursor: 'pointer', position: 'relative' }}
                        >
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.5rem',
                                fontSize: '11px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                color: '#ffd700',
                                marginBottom: '0.5rem',
                              }}
                            >
                              <span>Recommended Top-5 Hero Sequence</span>
                              {!claimedHotels[hotel.id] && (
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '10px',
                                    padding: '2px 7px',
                                    borderRadius: '999px',
                                    background: 'rgba(255, 215, 0, 0.14)',
                                    border: '1px solid rgba(255, 215, 0, 0.35)',
                                    color: '#ffd700',
                                  }}
                                >
                                  <Lock size={10} />
                                  <span>Work Email Gate</span>
                                </span>
                              )}
                            </div>

                            {claimedHotels[hotel.id] ? (
                              hotel.ruleOf5Fix.map((step, idx) => (
                                <div key={idx} className="vi-math-row" style={{ fontSize: '11px', color: '#cbd5e1' }}>
                                  <span>{step}</span>
                                </div>
                              ))
                            ) : (
                              <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                                <div
                                  aria-hidden="true"
                                  style={{
                                    filter: 'blur(5px)',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                    opacity: 0.45,
                                  }}
                                >
                                  <div className="vi-math-row" style={{ fontSize: '11px', color: '#cbd5e1' }}>
                                    <span>Slot #1 (Destination &amp; Rooftop Hero): Primary golden-hour signature anchor</span>
                                  </div>
                                  <div className="vi-math-row" style={{ fontSize: '11px', color: '#cbd5e1' }}>
                                    <span>Slot #2 (Social &amp; Culinary Anchor): High-energy bar &amp; dining room sequence</span>
                                  </div>
                                  <div className="vi-math-row" style={{ fontSize: '11px', color: '#cbd5e1' }}>
                                    <span>Slot #3 (Signature Suite): Best panoramic bedroom framed with neighbourhood view</span>
                                  </div>
                                  <div className="vi-math-row" style={{ fontSize: '11px', color: '#cbd5e1' }}>
                                    <span>Slot #4 (Architectural Identity): Design-led lobby, terrace or cultural lounge</span>
                                  </div>
                                  <div className="vi-math-row" style={{ fontSize: '11px', color: '#cbd5e1' }}>
                                    <span>Slot #5 (Local Destination Gateway): Direct walkable neighbourhood micro-vibe</span>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    marginTop: '0.65rem',
                                    padding: '0.65rem 0.75rem',
                                    borderRadius: '10px',
                                    background: 'rgba(5, 8, 17, 0.85)',
                                    border: '1px solid rgba(255, 215, 0, 0.28)',
                                    fontSize: '11.5px',
                                    color: '#e2e8f0',
                                    lineHeight: 1.45,
                                  }}
                                >
                                  <strong style={{ color: '#ffd700' }}>🔒 5-Slot Replacement Blueprint Locked:</strong>{' '}
                                  Enter your work email to unlock the exact Partner Central photo replacement sequence for {hotel.name}.
                                </div>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => openClaimDossier(hotel, e)}
                            className="vi-btn-gold"
                            style={{ width: '100%', marginTop: '0.75rem' }}
                          >
                            <Unlock size={14} />
                            <span>
                              {claimedHotels[hotel.id]
                                ? `View Full ${hotel.name} Dossier`
                                : `Unlock 5-Slot Fix (Work Email)`}
                            </span>
                          </button>
                        </div>
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Methodology & Upcoming Series Outlook */}
        <section id="methodology" className="vi-section">
          <div className="vi-category-block" style={{ padding: '2.5rem' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#00e5ff',
                marginBottom: '0.75rem',
              }}
            >
              RESEARCH METHODOLOGY • MULTI-CHANNEL VIBE AUDIT
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ffffff', margin: '0 0 1rem', lineHeight: 1.3 }}>
              How We Audited Physical Presence, Owned Digital &amp; OTA Hero Galleries
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', maxWidth: '840px', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              To measure how London’s flagship lifestyle hotels match up to modern vibe-led booking behaviour across South Bank, Shoreditch, Fitzrovia, Marylebone, King’s Cross, and the City, each property was scored out of 100 across four dimensions.{' '}
              <span style={{ color: '#cbd5e1' }}>
                (Industry context: Expedia Group’s <em>Unpack</em> research documented a +1,090% YoY surge in guest reviews citing “vibe,” with 90%+ of travellers weighting property vibe when booking.)
              </span>
            </p>

            <div className="vi-kpi-grid" style={{ marginTop: '1rem' }}>
              <div className="vi-kpi-card">
                <div className="vi-kpi-label" style={{ color: '#34d399' }}>A. Physical Vibe • 92.5 Avg</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>On-Property &amp; District Reality</div>
                <div className="vi-kpi-desc">
                  Evaluates architectural character, signature rooftop bars &amp; restaurants, interior lighting/acoustics, and walkable proximity to local cultural anchors.
                </div>
              </div>

              <div className="vi-kpi-card">
                <div className="vi-kpi-label" style={{ color: '#00e5ff' }}>B1. Own Vibe • 88.4 Avg</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Owned Internal Merchandising</div>
                <div className="vi-kpi-desc">
                  Measures how effectively the hotel’s official website and Instagram showcase its own onsite F&amp;B venues, social energy, and design DNA.
                </div>
              </div>

              <div className="vi-kpi-card">
                <div className="vi-kpi-label" style={{ color: '#ffd700' }}>B2. Local Vibe • 45.5 Avg</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Destination Gateway Score</div>
                <div className="vi-kpi-desc">
                  Tests whether owned web &amp; social content connects guests to walkable neighbourhood micro-vibes (markets, pubs, galleries) vs. acting as an inward-looking walled garden.
                </div>
              </div>

              <div className="vi-kpi-card">
                <div className="vi-kpi-label" style={{ color: '#fb7185' }}>C. OTA Top-5 • 56.5 Avg</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Booking.com Hero Mix</div>
                <div className="vi-kpi-desc">
                  Audits the first 5 Booking.com thumbnails for balanced Social/Culinary, Destination, and Signature Suite representation vs. repetitive beds, sinks, and utility clutter.
                </div>
              </div>
            </div>

            {/* Upcoming Part 2 Research Note & Substack Briefing */}
            <div
              style={{
                marginTop: '1.75rem',
                paddingTop: '1.35rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  flex: '1 1 520px',
                  fontSize: '0.9rem',
                  color: '#cbd5e1',
                  lineHeight: 1.65,
                }}
              >
                <strong style={{ color: '#00e5ff' }}>Next in This Series:</strong> Having established how London’s top 10 lifestyle icons perform, our follow-up study will examine mainstream 4-star and upper-upscale hotels across these same London neighbourhoods — testing how properties without an iconic onsite rooftop or destination restaurant market their local neighbourhood vibe.
              </div>

              <a
                href={LONDON_10_STUDY_META.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vi-action-btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.65rem 1.15rem',
                  borderColor: 'rgba(255, 215, 0, 0.4)',
                  background: 'rgba(255, 215, 0, 0.08)',
                  color: '#ffd700',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Follow Vibe Insights on Substack</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Photo Slot Inspection Modal */}
      {activePhotoModal && (
        <div onClick={() => setActivePhotoModal(null)} className="vi-modal-backdrop">
          <div onClick={(e) => e.stopPropagation()} className="vi-modal-box">
            <div className="vi-modal-header">
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#00e5ff', textTransform: 'uppercase' }}>
                  {activePhotoModal.hotel.name} • Live Booking.com Slot #{activePhotoModal.slotItem.slot}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 0' }}>
                  {activePhotoModal.slotItem.slotVerdict}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="vi-action-btn-secondary"
              >
                <X size={15} />
              </button>
            </div>

            <div className="vi-modal-body">
              <div style={{ borderRadius: '12px', overflow: 'hidden', maxHeight: '300px', background: '#050811', marginBottom: '1rem' }}>
                <img
                  src={
                    activePhotoModal.slotItem.slot === 1
                      ? activePhotoModal.hotel.localSlot1Hero
                      : activePhotoModal.slotItem.imageUrl
                  }
                  alt={activePhotoModal.slotItem.title}
                  onError={(e) => {
                    e.currentTarget.src = activePhotoModal.hotel.localSlot1Hero;
                  }}
                  style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div className="vi-math-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                <span style={{ color: '#94a3b8', fontSize: '11px' }}>
                  Booking.com Computer-Vision Caption (Photo ID #{activePhotoModal.slotItem.photoId}):
                </span>
                <strong style={{ color: '#ffffff', fontStyle: 'italic' }}>
                  “{activePhotoModal.slotItem.title}”
                </strong>
                <span style={{ color: '#ffd700', marginTop: '4px' }}>
                  Recommended Fix:{' '}
                  {claimedHotels[activePhotoModal.hotel.id]
                    ? activePhotoModal.hotel.ruleOf5Fix[
                        (activePhotoModal.slotItem.slot - 1) %
                          activePhotoModal.hotel.ruleOf5Fix.length
                      ]
                    : '🔒 Locked — Claim the full property report with your work email to view the exact slot replacement.'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    const h = activePhotoModal.hotel;
                    setActivePhotoModal(null);
                    openClaimDossier(h);
                  }}
                  className="vi-btn-gold"
                >
                  <Unlock size={14} />
                  <span>Claim Full {activePhotoModal.hotel.name} Replacement Plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Claim Detailed Property Dossier Modal */}
      {claimModalHotel && (
        <div onClick={() => setClaimModalHotel(null)} className="vi-modal-backdrop">
          <div onClick={(e) => e.stopPropagation()} className="vi-modal-box">
            <div className="vi-modal-header">
              <div>
                <div className="vi-eyebrow-badge" style={{ marginBottom: '0.5rem' }}>
                  <ShieldCheck size={13} />
                  <span>PROPERTY COMMERCIAL DOSSIER • {LONDON_10_STUDY_META.studyCode}-#{claimModalHotel.index}</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  {claimModalHotel.name} ({claimModalHotel.neighborhood})
                </h3>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                  Physical:{' '}
                  <strong style={{ color: '#34d399' }}>{claimModalHotel.mathVibeScore}/100</strong> • Own Vibe:{' '}
                  <strong style={{ color: '#00e5ff' }}>{claimModalHotel.ownPropertyDigitalScore}/100</strong> • Local Vibe:{' '}
                  <strong style={{ color: '#ffd700' }}>{claimModalHotel.localDestinationDigitalScore}/100</strong> • OTA Top-5:{' '}
                  <strong style={{ color: '#fb7185' }}>{claimModalHotel.otaTop5Score}/100</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setClaimModalHotel(null)}
                className="vi-action-btn-secondary"
              >
                <X size={15} />
              </button>
            </div>

            <div className="vi-modal-body">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  Select Audited Property
                </label>
                <select
                  value={claimModalHotel.id}
                  onChange={(e) => {
                    const selected = LONDON_10_HOTELS.find((h) => h.id === e.target.value);
                    if (selected) setClaimModalHotel(selected);
                  }}
                  className="vi-input"
                >
                  {LONDON_10_HOTELS.map((h) => (
                    <option key={h.id} value={h.id}>
                      #{h.index} {h.name} ({h.neighborhood}) — Physical {h.mathVibeScore} / OTA {h.otaTop5Score}
                    </option>
                  ))}
                </select>
              </div>

              {!claimedHotels[claimModalHotel.id] ? (
                <>
                  <div className="vi-sector-matrix" style={{ marginTop: 0, marginBottom: '1.25rem', gap: '0.75rem' }}>
                    <div className="vi-diag-panel">
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffd700' }}>
                        1. Local Destination &amp; Owned Digital Gap Audit
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px' }}>
                        See which walkable {claimModalHotel.neighborhood} micro-vibes and internal social/culinary heroes are missing across your owned site and deeper gallery.
                      </div>
                    </div>
                    <div className="vi-diag-panel">
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#34d399' }}>
                        2. Partner Central 5-Slot Blueprint
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px' }}>
                        Exact slot-by-slot Hero replacement plan for Booking.com &amp; Expedia Partner Central.
                      </div>
                    </div>
                  </div>

                  <form
                    onSubmit={handleClaimSubmit}
                    style={{
                      background: '#050811',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '14px',
                      padding: '1.25rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                        Unlock the Full {claimModalHotel.name} Dossier
                      </span>
                      {isLocalhost && (
                        <button
                          type="button"
                          onClick={() => handleInstantUnlockDemo(claimModalHotel)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#00e5ff',
                            fontSize: '12px',
                            fontWeight: 700,
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                        >
                          ⚡ Instant Executive Preview (1-Click Unlock)
                        </button>
                      )}
                    </div>

                    <div className="vi-form-grid-3">
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={claimForm.name}
                          onChange={(e) => setClaimForm({ ...claimForm, name: e.target.value })}
                          className="vi-input"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder={`gm@${claimModalHotel.id.replace(/-/g, '')}.com`}
                          value={claimForm.email}
                          onChange={(e) => {
                            setClaimForm({ ...claimForm, email: e.target.value });
                            if (claimEmailError) setClaimEmailError('');
                          }}
                          className="vi-input"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                          Role
                        </label>
                        <select
                          value={claimForm.role}
                          onChange={(e) => setClaimForm({ ...claimForm, role: e.target.value })}
                          className="vi-input"
                        >
                          <option>General Manager / Hotel Leadership</option>
                          <option>Commercial / Revenue Director</option>
                          <option>Brand, PR &amp; Digital Marketing</option>
                          <option>Ownership / Asset Management</option>
                        </select>
                      </div>
                    </div>

                    {claimEmailError && (
                      <div
                        style={{
                          color: '#fb7185',
                          fontSize: '12px',
                          fontWeight: 700,
                          marginTop: '0.6rem',
                        }}
                      >
                        ⚠️ {claimEmailError}
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '0.65rem',
                        marginTop: '1rem',
                      }}
                    >
                      {isLocalhost && (
                        <button
                          type="button"
                          onClick={() => handleInstantUnlockDemo(claimModalHotel)}
                          className="vi-action-btn-secondary"
                        >
                          Instant Preview
                        </button>
                      )}
                      <button type="submit" className="vi-btn-gold">
                        <Unlock size={14} />
                        <span>Unlock Full {claimModalHotel.name} Report</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="vi-callout-banner" style={{ marginTop: 0 }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#34d399' }}>
                        ✓ UNLOCKED EXECUTIVE PROPERTY DOSSIER • {claimedHotels[claimModalHotel.id].name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#cbd5e1' }}>
                        Prepared for {claimedHotels[claimModalHotel.id].email} ({claimedHotels[claimModalHotel.id].role})
                      </div>
                    </div>
                    <Link
                      to={`/audit?demo=sea-containers-london`}
                      className="vi-btn-primary"
                    >
                      <span>Open in Live Audit Engine</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className="vi-diag-panel">
                    <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffd700', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                      Booking.com &amp; Expedia Partner Central 5-Slot Replacement Sheet
                    </div>
                    {claimModalHotel.top5.map((slotItem, idx) => (
                      <div key={slotItem.photoId} className="vi-math-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}>
                        <span style={{ color: '#fda4af', fontWeight: 700 }}>
                          Current Slot #{slotItem.slot}: {slotItem.slotVerdict} (ID #{slotItem.photoId})
                        </span>
                        <span style={{ color: '#34d399', fontWeight: 600 }}>
                          → {claimModalHotel.ruleOf5Fix[idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
