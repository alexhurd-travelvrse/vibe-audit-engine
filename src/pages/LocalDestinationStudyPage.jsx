import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Unlock,
  Compass,
  Building2,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react';
import {
  LONDON_10_STUDY_META,
  LONDON_10_HOTELS,
} from '../data/london10StudyData';
import { validateWorkEmail, isLocalhostEnvironment } from '../utils/workEmailValidator';
import './VibeInsights.css';

const isLocalhost = isLocalhostEnvironment();

export const LOCAL_DESTINATION_STUDY_META = {
  slug: 'london-local-destination-gap',
  canonicalUrl: 'https://www.atmosvibe.io/vibe-insights/london-local-destination-gap',
  studyCode: 'AV-RES-2026-LON-DEST',
  publishDate: '2026-11-16',
  title:
    'The “Walled Garden” Blind Spot: Why London’s Best Lifestyle Hotels Hide the Neighbourhoods Outside Their Doors',
  subtitle:
    'AtmosVibe Part II Benchmark of 10 Flagship London Hotels: Comparing On-Site Vibe & Experiences Marketing (88.4/100) vs. Local Destination Marketing on Own Websites (45.5/100) and OTA Hero Galleries (16% Destination Context).',
};

const NEIGHBOURHOOD_POTENTIAL_BY_ID = {
  'hoxton-shoreditch': {
    walkableScore: 96,
    stepOutGems: 'Columbia Road Flower Market, Brick Lane vintage & curry houses, Redchurch Street indie boutiques, Great Eastern Street late-night bars',
    walledGardenVerdict: 'Best-in-Cohort Local Guide (66/100) — Yet Buried 3 Clicks Deep & Absent on OTAs',
    aiSearchRisk: 'Medium: Strong Shoreditch brand association on web, but OTA hero gallery defaults to a bathroom sink (#2) and generic street bus (#3).',
  },
  'hoxton-southwark': {
    walkableScore: 95,
    stepOutGems: 'Borough Market artisan food stalls (8 mins), Tate Modern & Bankside riverwalk (5 mins), BFI Southbank & National Theatre, Maltby Street Ropewalk',
    walledGardenVerdict: 'Strong Editorial Guide (64/100) — Disconnected from Visual Hero Slots',
    aiSearchRisk: 'Medium: Publishes Southwark neighbourhood tips, yet neither the South Bank Thames skyline nor Seabird’s 14th-floor view appears in its OTA Top 5.',
  },
  'one-hundred-shoreditch': {
    walkableScore: 95,
    stepOutGems: 'Shoreditch High Street coffee culture, Boxpark & Boundary Street bistros, Spitalfields Market, East End independent art galleries',
    walledGardenVerdict: 'Solid East London Awareness (61/100) — 85% of Hero Space Still Inward-Facing',
    aiSearchRisk: 'Medium: Captures East London rooftop energy at Kaso, but repeats 3 indoor suite couches in its OTA Top 5 instead of framing Shoreditch.',
  },
  'sea-containers': {
    walkableScore: 97,
    stepOutGems: 'Direct South Bank Thames Path frontage, Tate Modern, Shakespeare’s Globe, Oxo Tower Wharf, Borough Market & Gabriel’s Wharf',
    walledGardenVerdict: 'Moderate “Walled Garden” (46/100) — Frames the River, Ignores Street-Level Culture',
    aiSearchRisk: 'High: Despite sitting directly on London’s most walkable cultural riverfront, digital storytelling focuses almost exclusively on keeping guests inside Lyaness and 12th Knot.',
  },
  'the-standard-london': {
    walkableScore: 94,
    stepOutGems: 'Coal Drops Yard architecture & dining (4 mins), Regent’s Canal towpath to Camden/Islington, Granary Square fountains, British Library & Eurostar gateway',
    walledGardenVerdict: 'Self-Contained Nightlife Bubble (44/100) — Uses St Pancras as Backdrop Only',
    aiSearchRisk: 'High: 90%+ of owned content keeps the guest inside Decimo and Sweeties, missing the massive regeneration of King’s Cross and Coal Drops Yard.',
  },
  'hart-shoreditch': {
    walkableScore: 93,
    stepOutGems: 'Old Street creative quarter, Curtain Road live music & cocktail dens, Spitalfields historic weavers’ lanes, Brick Lane & Hoxton Square',
    walledGardenVerdict: 'Template-Constrained (42/100) — Corporate Mileage Bullets Replace Street Vibe',
    aiSearchRisk: 'High: Honours Shoreditch cabinetmakers in interior design, but Hilton’s standard web template reduces East London’s most vibrant nightlife district to static distance bullets.',
  },
  'treehouse-london': {
    walkableScore: 95,
    stepOutGems: 'Marylebone High Street village boutiques & Daunt Books, Regent’s Park & Primrose Hill, Soho theatres, Fitzrovia independent wine bars',
    walledGardenVerdict: 'Skyline-Only Framing (39/100) — Looks Over London from 16 Floors Up Without Touching the Street',
    aiSearchRisk: 'High: Sells panoramic skyline views brilliantly from The Nest, but leaves Marylebone Village and Fitzrovia street-level discovery almost completely untold.',
  },
  'london-edition': {
    walkableScore: 97,
    stepOutGems: 'Charlotte Street pavement bistros (2 mins), Soho vinyl shops & jazz clubs, Oxford Street & Mayfair galleries, West End theatreland',
    walledGardenVerdict: 'Closed Luxury Island (34/100) — Zero Connection to Fitzrovia or Soho Outside',
    aiSearchRisk: 'Severe: Sits on arguably the best dining and nightlife border in London (Fitzrovia/Soho), yet markets itself strictly as an inward-facing velvet fortress.',
  },
  'the-ned': {
    walkableScore: 92,
    stepOutGems: 'St Paul’s Cathedral (6 mins), Leadenhall Market Victorian arcades, Bloomberg Arcade dining, historic City alleyways & Sky Garden',
    walledGardenVerdict: 'All-In-One Fortress (31/100) — 9 Internal Restaurants Crowd Out the City of London',
    aiSearchRisk: 'Severe: Because The Ned operates 9 restaurants under one roof, its digital footprint treats the historic City of London as non-existent.',
  },
  'the-mandrake': {
    walkableScore: 96,
    stepOutGems: 'Newman Street & Charlotte Street culinary strip, Fitzrovia contemporary art galleries, Soho late-night bars, Bloomsbury museum quarter',
    walledGardenVerdict: 'Inward-Looking Secret World (28/100) — Lowest Local Destination Score in Study',
    aiSearchRisk: 'Severe: Deliberately positions itself as a hidden sanctuary, leaving travellers and AI search engines with zero signal of its prime Fitzrovia gallery-and-bistro doorstep.',
  },
};

export default function LocalDestinationStudyPage() {
  const [selectedCluster, setSelectedCluster] = useState('All 10 Icons');
  const [expandedHotelId, setExpandedHotelId] = useState('the-mandrake');
  const [claimModalHotel, setClaimModalHotel] = useState(null);
  const [claimedHotels, setClaimedHotels] = useState({});
  const [claimEmailError, setClaimEmailError] = useState('');
  const [claimForm, setClaimForm] = useState({
    name: '',
    email: '',
    role: 'General Manager / Hotel Leadership',
  });

  const clusters = [
    'All 10 Icons',
    'Fitzrovia & Marylebone',
    "King's Cross & City",
    'South Bank',
    'Shoreditch',
  ];

  // Sort from biggest Walled Garden gap (lowest local destination score) to highest, or allow toggle
  const [sortOrder, setSortOrder] = useState('lowest-first');

  const sortedHotels = useMemo(() => {
    const base =
      selectedCluster === 'All 10 Icons'
        ? [...LONDON_10_HOTELS]
        : LONDON_10_HOTELS.filter((h) => h.cluster === selectedCluster);

    return base.sort((a, b) =>
      sortOrder === 'lowest-first'
        ? a.localDestinationDigitalScore - b.localDestinationDigitalScore
        : b.localDestinationDigitalScore - a.localDestinationDigitalScore
    );
  }, [selectedCluster, sortOrder]);

  const handleClaimSubmit = (e) => {
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
          source: 'Vibe Insights - Local Destination Study Dossier Claim',
        }),
      });
    } catch {
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
      '@type': 'ScholarlyArticle',
      headline: LOCAL_DESTINATION_STUDY_META.title,
      description: LOCAL_DESTINATION_STUDY_META.subtitle,
      datePublished: LOCAL_DESTINATION_STUDY_META.publishDate,
      identifier: LOCAL_DESTINATION_STUDY_META.studyCode,
      url: LOCAL_DESTINATION_STUDY_META.canonicalUrl,
      author: {
        '@type': 'Organization',
        name: 'AtmosVibe',
        url: 'https://www.atmosvibe.io',
      },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/vibe-insights" className="vi-back-link">
              ← Vibe Insights Directory
            </Link>
            <Link
              to="/vibe-insights/london-boutique-ota-gap"
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
              Read Part I: OTA Top-5 Hero Photo Study →
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setClaimModalHotel(LONDON_10_HOTELS[8])}
            className="vi-btn-gold"
          >
            <Unlock size={13} />
            <span>Claim Local Destination Dossier</span>
          </button>
        </div>

        {/* 1. Executive Summary Card */}
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
                STUDY PART II • {LOCAL_DESTINATION_STUDY_META.studyCode} • LOCAL DESTINATION BENCHMARK
              </div>

              <a
                href="#local-destination-scoreboard"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#00e5ff',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span>Jump to 10-Hotel Neighbourhood Ranking ↓</span>
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
              The “Walled Garden” Blind Spot:{' '}
              <span className="vi-title-accent">
                Why London’s Best Hotels Score 88.4 on Own Vibe—Yet Drop to 45.5 on Their Local Neighbourhood
              </span>
            </h1>

            <p
              style={{
                fontSize: '0.98rem',
                color: '#cbd5e1',
                lineHeight: 1.75,
                margin: 0,
                maxWidth: '940px',
              }}
            >
              When leisure travellers research a city break today—across Google, social media and AI search (ChatGPT, Perplexity and Gemini)—they increasingly search for the{' '}
              <strong>destination and neighbourhood vibe first</strong> (Shoreditch street culture, South Bank riverside walks, Soho &amp; Fitzrovia bistros or King’s Cross regeneration) before shortlisting a hotel. Yet when we audited how 10 flagship London lifestyle hotels showcase their local destination across their{' '}
              <strong>own websites, Instagram feeds and OTA galleries</strong>, we uncovered a major structural gap: properties score{' '}
              <strong>88.4/100</strong> at promoting their in-house bars and rooms, yet drop by{' '}
              <strong style={{ color: '#fb7185' }}>42.9 points</strong> to{' '}
              <strong>45.5/100</strong> on local destination storytelling.
            </p>

            {/* 4 Key Findings Grid */}
            <div className="vi-kpi-grid" style={{ marginTop: '2rem' }}>
              <div className="vi-kpi-card vi-kpi-card--emerald">
                <div className="vi-kpi-label" style={{ color: '#34d399' }}>
                  1. Real-World Walkable Location
                </div>
                <div className="vi-kpi-value" style={{ color: '#34d399' }}>
                  95.0<span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  Every hotel in the cohort sits on a world-class cultural doorstep—from Borough Market &amp; Tate Modern to Charlotte Street &amp; Brick Lane.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--cyan">
                <div className="vi-kpi-label" style={{ color: '#00e5ff' }}>
                  2. Own Site: In-House Vibe &amp; F&amp;B
                </div>
                <div className="vi-kpi-value" style={{ color: '#00e5ff' }}>
                  88.4<span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  Websites &amp; Instagram heavily promote <strong>internal</strong> rooftop bars, restaurants and bedrooms—protecting in-house F&amp;B spend.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--gold">
                <div className="vi-kpi-label" style={{ color: '#ffd700' }}>
                  3. Own Site: Local Destination Vibe
                </div>
                <div className="vi-kpi-value" style={{ color: '#ffd700' }}>
                  45.5<span className="vi-kpi-unit"> / 100</span>
                </div>
                <div className="vi-kpi-desc">
                  <strong>-42.9 pt Drop-Off:</strong> 7 of 10 hotels treat the outside neighbourhood as an afterthought or reduce it to static Tube mileage bullets.
                </div>
              </div>

              <div className="vi-kpi-card vi-kpi-card--rose">
                <div className="vi-kpi-label" style={{ color: '#fb7185' }}>
                  4. OTA Top-5: Destination Context
                </div>
                <div className="vi-kpi-value" style={{ color: '#fb7185' }}>
                  16%<span className="vi-kpi-unit"> (8 / 50 Slots)</span>
                </div>
                <div className="vi-kpi-desc">
                  <strong>84% of Booking.com Hero slots</strong> show zero exterior, skyline or street-level context—disconnecting the hotel from its destination.
                </div>
              </div>
            </div>

            {/* Visual Exhibit: Hotel A vs. Hotel B */}
            <div
              style={{
                marginTop: '2rem',
                padding: '1.5rem',
                borderRadius: '16px',
                background: 'rgba(7, 14, 28, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#00e5ff',
                  marginBottom: '0.6rem',
                }}
              >
                VISUAL EXHIBIT • THE TRAVELLER SHORTLIST TEST (HOTEL A vs. HOTEL B)
              </div>
              <img
                src="/AtmosVibe-Personal-Hotel-A-vs-B.png"
                alt="Hotel A (Walled Garden) vs Hotel B (Destination Gateway)"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </section>

        {/* 2. The 3 Archetypes of the "Walled Garden" Trap */}
        <section className="vi-section" style={{ paddingTop: '0.5rem', paddingBottom: '1rem' }}>
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
              DIAGNOSTIC FRAMEWORK • WHY HOTELS HIDE THEIR OWN NEIGHBOURHOOD
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: '0 0 1.25rem' }}>
              The Three “Walled Garden” Patterns Across London’s Top 10
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.15rem',
              }}
            >
              <div
                style={{
                  padding: '1.35rem',
                  borderRadius: '14px',
                  background: 'rgba(251, 113, 133, 0.06)',
                  border: '1px solid rgba(251, 113, 133, 0.25)',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#fb7185', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Archetype 01 • Score Range: 28–34 / 100
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>
                  The “Inward Fortress” (Mandrake, Ned, EDITION)
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                  Properties operating major internal F&amp;B ecosystems (such as The Ned’s 9 restaurants or Berners Tavern at EDITION) naturally focus their digital merchandising on in-house dining and nightlife. The trade-off: their websites read like self-contained private worlds, leaving little signal of the surrounding <em>Fitzrovia</em> or <em>City of London</em> neighbourhood for travellers or AI search engines.
                </p>
              </div>

              <div
                style={{
                  padding: '1.35rem',
                  borderRadius: '14px',
                  background: 'rgba(255, 215, 0, 0.06)',
                  border: '1px solid rgba(255, 215, 0, 0.25)',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffd700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Archetype 02 • Score Range: 39–46 / 100
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>
                  The “Skyline Backdrop Only” (Treehouse, Sea Containers, Standard, Hart)
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                  These hotels use London’s skyline as a cinematic backdrop from 10–16 floors up (St Paul’s from 12th Knot, St Pancras from The Standard, London Eye from Treehouse), or rely on corporate brand templates with static mileage bullets—missing the walkable street culture of Marylebone Village, Coal Drops Yard, or Bankside right at ground level.
                </p>
              </div>

              <div
                style={{
                  padding: '1.35rem',
                  borderRadius: '14px',
                  background: 'rgba(52, 211, 153, 0.06)',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Archetype 03 • Score Range: 61–66 / 100
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>
                  The “Buried Guide” (Hoxton Shoreditch, Hoxton Southwark, 100 Shoreditch)
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                  Ennismore (The Hoxton) and Lore Group (One Hundred Shoreditch) lead the cohort by publishing genuine indie neighbourhood guides and local maker partnerships. Yet even here, local guides sit buried in secondary sub-menus and vanish completely from their Booking.com Top-5 Hero photos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Interactive 10-Hotel Local Destination Scoreboard */}
        <section id="local-destination-scoreboard" className="vi-section">
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
                10-HOTEL RANKING • OWN VIBE MARKETING vs. LOCAL DESTINATION CONNECTION
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                London 10 Local Destination Scorecard
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() =>
                  setSortOrder(sortOrder === 'lowest-first' ? 'highest-first' : 'lowest-first')
                }
                className="vi-filter-pill active"
                style={{ borderColor: 'rgba(0, 229, 255, 0.4)', color: '#00e5ff' }}
              >
                {sortOrder === 'lowest-first'
                  ? 'Sorted: Biggest Walled Garden First ↑'
                  : 'Sorted: Best Local Gateway First ↓'}
              </button>

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
          </div>

          <div className="vi-hotels-stack">
            {sortedHotels.map((hotel, rankIdx) => {
              const isExpanded = expandedHotelId === hotel.id;
              const localMeta = NEIGHBOURHOOD_POTENTIAL_BY_ID[hotel.id] || {};
              const ownToLocalGap = (
                hotel.localDestinationDigitalScore - hotel.ownPropertyDigitalScore
              ).toFixed(0);
              const destSlots = hotel.heroTop5Mix.destinationExterior;

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
                      <span className="vi-hotel-rank">#{rankIdx + 1}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <h3 className="vi-hotel-name">{hotel.name}</h3>
                          <span className="vi-cluster-tag">{hotel.neighborhood}</span>
                        </div>
                        <div className="vi-hotel-sub-diagnostic" style={{ color: '#cbd5e1' }}>
                          {localMeta.walledGardenVerdict}
                        </div>
                      </div>
                    </div>

                    <div className="vi-hotel-metrics">
                      <div className="vi-metric-box">
                        <span className="vi-metric-label">Own Vibe (Web)</span>
                        <span className="vi-metric-val" style={{ color: '#00e5ff' }}>
                          {hotel.ownPropertyDigitalScore}
                        </span>
                      </div>

                      <div className="vi-metric-box">
                        <span className="vi-metric-label">Local Vibe (Web)</span>
                        <span
                          className="vi-metric-val"
                          style={{
                            color:
                              hotel.localDestinationDigitalScore >= 60
                                ? '#34d399'
                                : hotel.localDestinationDigitalScore >= 40
                                ? '#ffd700'
                                : '#fb7185',
                          }}
                        >
                          {hotel.localDestinationDigitalScore}
                        </span>
                      </div>

                      <div className="vi-metric-box">
                        <span className="vi-metric-label">Walled Garden Gap</span>
                        <span className="vi-metric-val" style={{ color: '#fb7185' }}>
                          {ownToLocalGap} pts
                        </span>
                      </div>

                      <div className="vi-metric-box">
                        <span className="vi-metric-label">OTA Dest. Slots</span>
                        <span
                          className="vi-metric-val"
                          style={{ color: destSlots > 0 ? '#ffd700' : '#fb7185' }}
                        >
                          {destSlots}/5
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
                          marginBottom: '1.25rem',
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
                            1. Real-World Step-Out Neighbourhood ({hotel.neighborhood})
                          </div>
                          <p style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                            <strong>Walkable Gems Steps from the Door:</strong> {localMeta.stepOutGems}.
                          </p>
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
                            2. Owned Website &amp; Social Local Audit ({hotel.localDestinationDigitalScore}/100)
                          </div>
                          <p style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                            {hotel.localDestinationDigitalSummary}
                          </p>
                        </div>

                        <div className="vi-diag-panel">
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 800,
                              color: '#fb7185',
                              textTransform: 'uppercase',
                              marginBottom: '6px',
                            }}
                          >
                            3. OTA &amp; AI Search Visibility Impact
                          </div>
                          <p style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                            {localMeta.aiSearchRisk}
                          </p>
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
                        <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                          <strong>Recommended Gateway Fix:</strong> {hotel.ruleOf5Fix[4]}
                        </div>

                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <Link
                            to={`/vibe-insights/london-boutique-ota-gap?hotel=${hotel.id}`}
                            className="vi-action-btn-secondary"
                          >
                            <span>Inspect 5 Booking.com Photos</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => setClaimModalHotel(hotel)}
                            className="vi-btn-gold"
                          >
                            <Unlock size={13} />
                            <span>Claim {hotel.name} Local Vibe Fix</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Strategic Takeaway: How to Turn Your Neighbourhood Into Direct & OTA Bookings */}
        <section className="vi-section" style={{ paddingTop: '0.5rem', paddingBottom: '3rem' }}>
          <div className="vi-category-block" style={{ padding: '2.25rem' }}>
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
              THE COMMERCIAL FIX • FROM WALLED GARDEN TO DESTINATION GATEWAY
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 1rem' }}>
              How Leading Hotels Connect On-Site Vibe with Their Local Destination
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '880px' }}>
              Showcasing your surrounding neighbourhood does not cannibalise your hotel bar—it is what gets high-spend leisure travellers to choose your postcode and your property in the first place:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
              }}
            >
              <div className="vi-diag-panel">
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#00e5ff', marginBottom: '6px' }}>
                  1. Dedicate 1 of Your Top-5 OTA Hero Slots to Destination Context
                </div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  Pair 2 on-site experience shots (rooftop/dining/lobby) and 1–2 sleep-proof room shots with <strong>1 unmistakable neighbourhood or skyline gateway hero</strong>—never 4 white beds or a traffic light.
                </p>
              </div>

              <div className="vi-diag-panel">
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffd700', marginBottom: '6px' }}>
                  2. Pair In-House F&amp;B with Curated Micro-Walks on Your Homepage
                </div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  Instead of hiding neighbourhood guides 3 clicks deep or listing Tube station distances, frame the guest journey: <em>“Morning coffee on Redchurch Street → afternoon galleries → sunset oysters on our 14th-floor rooftop.”</em>
                </p>
              </div>

              <div className="vi-diag-panel">
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#34d399', marginBottom: '6px' }}>
                  3. Feed Verified Neighbourhood Signals to AI Search (ChatGPT &amp; Perplexity)
                </div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  LLMs recommend hotels based on structured semantic links between your property’s vibe and nearby cultural landmarks. A verified Vibe Signature ensures AI search engines cite you as the definitive basecamp for your district.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Claim Modal */}
      {claimModalHotel && (
        <div className="vi-modal-backdrop" onClick={() => setClaimModalHotel(null)}>
          <div className="vi-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="vi-modal-header">
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#ffd700', textTransform: 'uppercase' }}>
                  LOCAL DESTINATION &amp; OTA VIBE DOSSIER
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 0' }}>
                  {claimModalHotel.name} ({claimModalHotel.neighborhood})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setClaimModalHotel(null)}
                className="vi-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="vi-modal-body">
              {!claimedHotels[claimModalHotel.id] ? (
                <>
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, marginTop: 0 }}>
                    Unlock the complete <strong>{claimModalHotel.name}</strong> Vibe Signature &amp; Local Destination Gateway blueprint (Own Website + OTA Top-5 + AI Search schema):
                  </p>
                  <form onSubmit={handleClaimSubmit}>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Alex Morgan"
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
                    </div>

                    {claimEmailError && (
                      <div style={{ color: '#fb7185', fontSize: '12px', fontWeight: 700, marginTop: '0.6rem' }}>
                        ⚠️ {claimEmailError}
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem', marginTop: '1rem' }}>
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
                        <span>Unlock {claimModalHotel.name} Dossier</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="vi-callout-banner" style={{ marginTop: 0 }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#34d399' }}>
                        ✓ UNLOCKED LOCAL DESTINATION DOSSIER • {claimModalHotel.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#cbd5e1' }}>
                        Own Vibe: {claimModalHotel.ownPropertyDigitalScore}/100 • Local Vibe: {claimModalHotel.localDestinationDigitalScore}/100 • OTA Top-5: {claimModalHotel.otaTop5Score}/100
                      </div>
                    </div>
                    <Link to="/audit?demo=sea-containers-london" className="vi-btn-primary">
                      <span>Open Live Audit Engine</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className="vi-diag-panel">
                    <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffd700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      Recommended 5-Slot Vibe + Destination Blueprint
                    </div>
                    {claimModalHotel.ruleOf5Fix.map((fix, idx) => (
                      <div key={idx} className="vi-math-row">
                        <span style={{ color: '#34d399', fontWeight: 600 }}>→ {fix}</span>
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
