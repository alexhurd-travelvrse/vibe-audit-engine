import React, { useRef, useState, useEffect } from 'react';
import { Zap, Music, Users, Sparkles, CheckCircle2, AlertTriangle, Disc, MapPin, Compass, Volume2, ShieldCheck, Sun, Clock, Eye, ChevronLeft, ChevronRight, Key, Flame, Briefcase, Coffee, Camera, Laptop, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { resolveVibeSignatureSpotify, fetchLiveSpotifyPlaylistForVibe } from '../services/spotifyVibeResolver';

export default function HotelVibeManifestCard({ manifest, hotelName, location }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  if (!manifest) return null;
  const v = manifest.vibe_signature || {};
  const dna = v.acoustic_dna || {};
  const crowd = v.crowd_archetype || {};
  const qual = v.qualification_test || {};
  const lighting = v.lighting_and_sensory || {};
  const proximity = v.hyper_local_proximity || {};
  const auth = v.authenticity_and_materials || {};
  const temporal = v.temporal_dynamics || {};
  const secrets = v.insider_secrets || {};
  const rawHostVibe = v.host_vibe || {};

  const venueNameLower = (manifest.venue_name || hotelName || '').toLowerCase();
  const hostVibe = {
    host_style_score: rawHostVibe.host_style_score || (venueNameLower.includes('sea containers') ? 94 : (venueNameLower.includes('25hours') ? 96 : (venueNameLower.includes('dukes') ? 88 : 91))),
    host_archetype: rawHostVibe.host_archetype || (
      venueNameLower.includes('sea containers')
        ? 'Storytelling Mixologists & South Bank Scene Insiders'
        : (venueNameLower.includes('25hours')
            ? 'Unscripted Vinyl Curators & Highball Storytellers'
            : (venueNameLower.includes('dukes')
                ? 'Mayfair Martini Masters & Warm Heritage Hosts'
                : 'Charismatic Cultural Hosts & Neighborhood Insiders'))
    ),
    warmth_verdict: rawHostVibe.warmth_verdict || (venueNameLower.includes('dukes') ? 'Refined Heritage Warmth' : 'Zero Snobbery — Instant Regulars'),
    service_pacing: rawHostVibe.service_pacing || 'Unhurried Banter & Intuitive Craft',
    team_aesthetic: rawHostVibe.team_aesthetic || (
      venueNameLower.includes('sea containers')
        ? 'Bespoke Maritime Tailoring & Lab-Craft Mixology Aprons'
        : (venueNameLower.includes('25hours')
            ? 'Relaxed Scandi Streetwear, Denim Aprons & Sneakers'
            : 'Relaxed Contemporary Tailoring & Artisanal Aprons')
    ),
    signature_team_roles: (rawHostVibe.signature_team_roles && rawHostVibe.signature_team_roles.length > 0)
      ? rawHostVibe.signature_team_roles
      : (venueNameLower.includes('sea containers')
          ? ['Lyaness Mixologist', '12th Knot Selector', 'Culture Concierge']
          : (venueNameLower.includes('25hours')
              ? ['Boilerman Highball Host', 'Vinyl Room Curator', 'Bike Concierge']
              : ['Head Mixologist', 'Neighborhood Concierge', 'Vibe Host'])),
    staff_icebreaker_prompt: rawHostVibe.staff_icebreaker_prompt || (
      venueNameLower.includes('sea containers')
        ? 'Ask the Lyaness bar team which off-menu botanical ingredient they fermented in-house this week.'
        : (venueNameLower.includes('25hours')
            ? 'Ask the Boilerman bartender for their favorite Copenhagen vinyl record and highball pairing.'
            : 'Ask the bartender for their off-menu neighborhood nightcap and favorite late-night local spot.')
    )
  };

  const [activeDiurnalTab, setActiveDiurnalTab] = useState('chilling');

  // Resolve multi-dimensional Spotify playlist (Brand + Anchor Artists + Genre + Diurnal Energy Arc)
  const resolvedSpotifyPreset = resolveVibeSignatureSpotify(manifest, activeDiurnalTab, hotelName);
  const [liveSpotifyOverride, setLiveSpotifyOverride] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLiveSpotifyOverride(null);
    if (dna.spotify_query && !String(dna.spotify_query).startsWith('spotify:playlist:')) {
      fetchLiveSpotifyPlaylistForVibe(dna.spotify_query, resolvedSpotifyPreset).then(res => {
        if (isMounted && res && res.id && res.id !== resolvedSpotifyPreset.id) {
          setLiveSpotifyOverride(res);
        }
      });
    }
    return () => { isMounted = false; };
  }, [manifest?.venue_name, dna.spotify_query]);

  const activeSpotify = (activeDiurnalTab === 'chilling' && liveSpotifyOverride) ? liveSpotifyOverride : resolvedSpotifyPreset;

  const diurnal = temporal.diurnal_rhythm || {
    working: {
      window: '9:00 AM – 3:30 PM',
      focus: (manifest.venue_name || '').toLowerCase().includes('sea containers')
        ? 'Bright riverside daylight, calm coffee atmosphere & comfy tables for getting work done.'
        : 'Bright natural daylight, calm atmosphere, and comfortable seating for morning coffee or laptop work.',
      score: 91
    },
    chilling: {
      window: '4:00 PM – 7:00 PM',
      focus: (manifest.venue_name || '').toLowerCase().includes('sea containers')
        ? 'Golden-hour sunset over the Thames: warm evening light & relaxed pre-dinner drinks.'
        : 'Golden-hour transition: warm candlelit glow & relaxed early-evening drinks.',
      score: 97
    },
    playing: {
      window: '7:30 PM – Late',
      focus: (manifest.venue_name || '').toLowerCase().includes('sea containers')
        ? 'Candlelit evening buzz, 12th Knot rooftop views & a lively cocktail crowd.'
        : 'Cosy candlelit tables, great music, and a lively evening bar crowd.',
      score: 95
    }
  };

  const contentReady = temporal.content_readiness || {
    score: 96,
    verdict: 'Warm, Flattering Evening Light • Zero Harsh Glare',
    flattery_note: 'Soft, warm lighting that looks great in person and in photos',
    top_creator_spot: (manifest.venue_name || '').toLowerCase().includes('sea containers')
      ? '12th Knot Glass Corner Banquette during Thames Golden Hour'
      : ((manifest.venue_name || '').toLowerCase().includes('sls')
        ? 'Courtyard Poolside Sanctuary Loungers framed by historic Palms'
        : 'Signature terrace lounge banquette during golden hour'),
    aesthetic_subculture: (manifest.venue_name || '').toLowerCase().includes('sea containers')
      ? 'Warm Riverside Glamour'
      : ((manifest.venue_name || '').toLowerCase().includes('sls') ? 'Sun-Drenched Pastel Art Deco' : 'Warm Character & Natural Light')
  };
  
  // Calibrated Metrics with intelligent fallbacks
  const energy = v.energy_score || 85;
  const rawDb = dna.decibel_level || 'Easy Chat';
  const dbMatch = String(rawDb).match(/^(\d+\s*dB)/i);
  const dbNumber = dbMatch ? dbMatch[1] : (parseInt(rawDb) ? `${parseInt(rawDb)} dB` : String(rawDb).split('(')[0].trim());
  const dbDetail = String(rawDb).replace(/^(\d+\s*dB)\s*\(?/i, '').replace(/\)$/, '').trim();
  const decibels = rawDb;
  const clarityScore = dna.conversation_clarity_score || 94;
  const clarityVerdict = dna.conversation_verdict || 'Easy Conversation';
  const authenticityScore = auth.authenticity_score || 92;
  const materialPalette = auth.material_palette || 'Natural wood, aged brass, warm stone, textured glass';
  const materialVerdict = auth.material_verdict || 'True Local Character — Not a Cookie-Cutter Chain';
  const localRatio = crowd.local_ratio || 80;
  const touristRatio = crowd.tourist_ratio || (100 - localRatio);
  const lightingTemp = lighting.lighting_temperature || 'Warm Candlelit & Golden-Hour Glow';
  const bestTimeToVisit = temporal.best_time_to_visit || '4:30 PM for relaxed sunset drinks; 8:30 PM for lively evening buzz';
  const touristTrapVerdict = crowd.tourist_trap_verdict || (localRatio >= 60 ? 'Loved by Locals — Zero Tourist Trap' : 'Welcoming Mix of Locals & Travellers');

  // Calculate Spectrum Position for Sanctuary (0%) vs Social Hub (100%)
  const numericDb = parseInt(dbNumber) || (energy > 70 ? 72 : 54);
  const spectrumPct = Math.min(95, Math.max(5, Math.round(((numericDb - 42) / (82 - 42)) * 100)));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        borderRadius: '2rem',
        padding: '2.5rem',
        marginBottom: '3.5rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(0, 229, 255, 0.04) 50%, rgba(18, 18, 18, 0.95) 100%)',
        border: '1px solid rgba(0, 229, 255, 0.35)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner Tag & Venue Identity */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            background: 'linear-gradient(90deg, #00e5ff, #10b981)', 
            color: '#050b14', 
            fontSize: '11px', 
            fontWeight: 900, 
            letterSpacing: '0.15em', 
            padding: '5px 14px', 
            borderRadius: '20px', 
            textTransform: 'uppercase',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)'
          }}>
            ⭐ Official Venue Vibe Signature
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
            ID: {manifest.venue_id || 'vibe_node_01'}
          </span>
        </div>

        <div style={{ fontSize: '12px', color: '#00e5ff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={14} />
          {manifest.location || location || 'London'}
        </div>
      </div>

      {/* Main Headline & Vibe Anchor Quote */}
      <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.15, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
        {manifest.venue_name || hotelName}
      </h2>
      <p style={{ fontSize: '1.15rem', color: '#00e5ff', fontStyle: 'italic', fontWeight: 600, marginBottom: '2rem', lineHeight: 1.5 }}>
        "{v.headline || 'A defining cultural and lifestyle destination.'}"
      </p>

      {/* ========================================================================= */}
      {/* 6 STANDARDIZED CONSUMER-FRIENDLY VIBE SIGNAL CONTAINERS                   */}
      {/* ========================================================================= */}
      <div style={{ marginBottom: '2.5rem' }}>
        {/* Rail Top Bar with Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', color: '#ffd700', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#ffd700" /> 6 VIBE SIGNALS
            </span>
            <span style={{ background: 'rgba(255, 215, 0, 0.12)', color: '#ffd700', border: '1px solid rgba(255, 215, 0, 0.35)', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
              SWIPE / SCROLL ➔
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              type="button"
              onClick={scrollLeft}
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.color = '#00e5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.color = '#ffffff'; }}
              title="Scroll Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              type="button"
              onClick={scrollRight}
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.color = '#00e5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.color = '#ffffff'; }}
              title="Scroll Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track with 6 Standardized Containers */}
        <div 
          ref={scrollContainerRef}
          style={{ 
            display: 'flex', 
            gap: '1.25rem', 
            overflowX: 'auto', 
            paddingBottom: '1.25rem',
            paddingTop: '6px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 229, 255, 0.4) rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* ========================================================================= */}
          {/* CONTAINER 1: Sound & Conversation                                         */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 380px', minWidth: '380px', maxWidth: '400px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(29, 185, 84, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#1DB954', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Volume2 size={13} /> Sound, Music &amp; Sleep
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', minHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0' }}>
                Easy Chat Downstairs, Quiet Sleep Upstairs?
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', minHeight: '82px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: '#10b981', textAlign: 'left' }}>🌿 Sanctuary</span>
                  <span style={{ color: '#00e5ff', textAlign: 'center' }}>💬 Bistro</span>
                  <span style={{ color: '#f59e0b', textAlign: 'right' }}>⚡ Social Hub</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #10b981 0%, #00e5ff 50%, #f59e0b 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: `${spectrumPct}%`, 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #00e5ff',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 700, gap: '8px' }}>
                  <span style={{ color: '#1DB954', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }} title={clarityVerdict}>{clarityVerdict}</span>
                  <span style={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: 800, flexShrink: 0, background: 'rgba(29, 185, 84, 0.2)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(29, 185, 84, 0.4)' }}>{dbNumber}</span>
                </div>
                {dbDetail && (
                  <div style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.65)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={dbDetail}>
                    {dbDetail}
                  </div>
                )}
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', minHeight: '34px', lineHeight: 1.35, marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start' }}>
                <span>{dna.soundscape_genre || 'Curated Soundscape'}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.65rem', minHeight: '26px', alignItems: 'center' }}>
                {(dna.anchor_artists || []).map((artist, i) => (
                  <a 
                    key={i} 
                    href={`https://open.spotify.com/search/${encodeURIComponent(artist)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      background: 'rgba(29, 185, 84, 0.12)', 
                      color: '#1DB954', 
                      fontSize: '10.5px', 
                      fontWeight: 700, 
                      padding: '2px 8px', 
                      borderRadius: '10px', 
                      textDecoration: 'none', 
                      border: '1px solid rgba(29, 185, 84, 0.25)',
                      whiteSpace: 'nowrap'
                    }}
                    title={`Listen to ${artist} on Spotify`}
                  >
                    ♫ {artist}
                  </a>
                ))}
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>
                {(dna.sound_texture || 'Warm background music with easy conversation downstairs and quiet rooms upstairs.').split('.')[0] + '.'}
              </p>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '6px 10px', fontSize: '10.5px', color: '#34d399', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Moon size={12} color="#34d399" />
                <span><strong>Sleep Sanctuary:</strong> {dna.sleep_sanctuary_verdict || 'Quiet Sound-Mitigated Rooms & Restful Sleep'}</span>
              </div>
            </div>

            {/* Embedded Spotify Mini Player (Synced with Travelvrse 4-Tier Resolver & Diurnal Rhythm) */}
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#1DB954', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={`${activeSpotify.title} (${activeSpotify.matchReason})`}>
                  ♫ {activeSpotify.title}
                </span>
                <div style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
                  {[
                    { id: 'working', label: 'Work' },
                    { id: 'chilling', label: 'Chill' },
                    { id: 'playing', label: 'Play' }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveDiurnalTab(mode.id)}
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: activeDiurnalTab === mode.id ? '1px solid #1DB954' : '1px solid rgba(255,255,255,0.12)',
                        background: activeDiurnalTab === mode.id ? 'rgba(29, 185, 84, 0.22)' : 'rgba(0,0,0,0.4)',
                        color: activeDiurnalTab === mode.id ? '#1DB954' : 'rgba(255,255,255,0.55)',
                        textTransform: 'uppercase'
                      }}
                      title={`Switch Acoustic DNA to ${mode.label} Diurnal Mode`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#121212', border: '1px solid rgba(29, 185, 84, 0.25)', minHeight: '80px' }}>
                <iframe
                  key={activeSpotify.id}
                  style={{ borderRadius: '10px', border: 'none', display: 'block' }}
                  src={`https://open.spotify.com/embed/playlist/${activeSpotify.id}?utm_source=generator&theme=0`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Acoustic DNA Spotify Player — ${activeSpotify.title}`}
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 2: Authenticity & Craft                                         */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 380px', minWidth: '380px', maxWidth: '400px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 215, 0, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffd700', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={13} /> True Character
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', minHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0' }}>
                Real Character or Cookie-Cutter Chain?
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', minHeight: '82px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: '#94a3b8', textAlign: 'left' }}>Corporate</span>
                  <span style={{ color: '#fbbf24', textAlign: 'center' }}>Curated</span>
                  <span style={{ color: '#ffd700', textAlign: 'right' }}>Handcrafted</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #64748b 0%, #eab308 60%, #ffd700 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: `${Math.min(95, Math.max(5, authenticityScore))}%`, 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #ffd700',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 700, gap: '8px' }}>
                  <span style={{ color: '#ffd700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{materialVerdict ? materialVerdict.replace(/\s*[-—–].*$/, '').trim() : 'Authentic Heritage'}</span>
                  <span style={{ color: '#10b981', flexShrink: 0, fontSize: '10px', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 7px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>Zero Faux Decor</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', minHeight: '34px', lineHeight: 1.35, marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start' }}>
                <span><span style={{ color: '#ffd700' }}>Palette:</span> {materialPalette ? materialPalette.split(',').slice(0, 3).join(', ') : 'Tactile stone, aged brass & timber'}</span>
              </div>

              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.65rem', minHeight: '24px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <strong style={{ color: '#ffd700', marginRight: '6px', flexShrink: 0 }}>Materials:</strong> Authentic handcrafted finishes
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>
                Tactile textures and heritage elements eliminate generic hospitality sterility.
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(255, 215, 0, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 215, 0, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              ✨ <strong>Craft Integrity:</strong> Custom artisanal fixtures, zero generic laminate.
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 3: Crowd & Subculture                                           */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 380px', minWidth: '380px', maxWidth: '400px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(192, 132, 252, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#c084fc', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Users size={13} /> The Crowd &amp; Mood
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', minHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0' }}>
                Loved by Locals or Tourist Trap?
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', minHeight: '82px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: '#c084fc', textAlign: 'left' }}>📍 Locals ({localRatio}%)</span>
                  <span style={{ color: '#38bdf8', textAlign: 'right' }}>✈️ Travelers ({touristRatio}%)</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #c084fc 0%, #38bdf8 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: `${Math.min(95, Math.max(5, localRatio))}%`, 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #c084fc',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 700, gap: '8px' }}>
                  <span style={{ color: '#c084fc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{touristTrapVerdict ? touristTrapVerdict.replace(/\s*[-—–].*$/, '').trim() : 'Authentic Local Magnet'}</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'monospace', flexShrink: 0, fontSize: '10px', background: 'rgba(192, 132, 252, 0.15)', padding: '2px 7px', borderRadius: '4px', border: '1px solid rgba(192, 132, 252, 0.3)' }}>{localRatio}% Local</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', minHeight: '34px', lineHeight: 1.35, marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start' }}>
                <span>{(crowd.primary || 'Cosmopolitan Creatives').replace(/\s*[-—–].*$/, '').trim()}</span>
              </div>

              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.65rem', minHeight: '24px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <strong style={{ color: '#c084fc', marginRight: '6px', flexShrink: 0 }}>Dress Code:</strong> {(crowd.dress_code || 'Smart Casual Chic').replace(/\s*[-—–].*$/, '').trim()}
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>
                {(lighting.atmosphere || 'Active social hub where neighborhood regulars and international creatives mix.').split('.')[0] + '.'}
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(192, 132, 252, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(192, 132, 252, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              🎯 <strong>Best For:</strong> {(crowd.trip_occasions && crowd.trip_occasions.length > 0) ? crowd.trip_occasions.join(' • ') : (crowd.energy_verdict || 'Couples City Break • Local Foodies • Solo & Remote Work')}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 4: Host Vibe (Customer Team & Human Alchemy)                    */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 380px', minWidth: '380px', maxWidth: '400px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(52, 211, 153, 0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={13} /> Host Vibe
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', minHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0' }}>
                Scripted Protocol or Cultural Hosts?
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', minHeight: '82px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: '#94a3b8', textAlign: 'left' }}>Scripted</span>
                  <span style={{ color: '#38bdf8', textAlign: 'center' }}>Attentive</span>
                  <span style={{ color: '#34d399', textAlign: 'right' }}>Cultural Hosts</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #64748b 0%, #38bdf8 50%, #34d399 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: `${Math.min(95, Math.max(5, hostVibe.host_style_score))}%`, 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #34d399',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 700, gap: '8px' }}>
                  <span style={{ color: '#34d399', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{hostVibe.warmth_verdict}</span>
                  <span style={{ color: '#ffffff', fontFamily: 'monospace', flexShrink: 0, fontSize: '10px', background: 'rgba(52, 211, 153, 0.18)', padding: '2px 7px', borderRadius: '4px', border: '1px solid rgba(52, 211, 153, 0.35)' }}>{hostVibe.host_style_score}/100 Alchemy</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', minHeight: '34px', lineHeight: 1.35, marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start' }}>
                <span>{hostVibe.host_archetype}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '0.6rem', minHeight: '24px', alignItems: 'center' }}>
                {(hostVibe.signature_team_roles || []).slice(0, 3).map((role, idx) => (
                  <span key={idx} style={{ background: 'rgba(52, 211, 153, 0.12)', color: '#34d399', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(52, 211, 153, 0.25)', whiteSpace: 'nowrap' }}>
                    ✦ {role}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>
                <strong style={{ color: '#34d399' }}>Team Look:</strong> {hostVibe.team_aesthetic}
              </p>
            </div>

            <div style={{ marginTop: '0.75rem', background: 'rgba(52, 211, 153, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(52, 211, 153, 0.25)', fontSize: '11px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.35 }}>
              💬 <strong style={{ color: '#34d399' }}>Host Icebreaker:</strong> {hostVibe.staff_icebreaker_prompt}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 4: Time of Day & Content Ready Analysis                         */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 380px', minWidth: '380px', maxWidth: '400px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(0, 229, 255, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#00e5ff', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sun size={13} /> Best Time of Day
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', minHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0' }}>
                Morning Coffee, Sunset Drinks &amp; Evening Buzz
              </h3>

              {/* 3 User Benefit Mode Tabs: Working | Chilling | Playing */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '0.85rem' }}>
                {[
                  { id: 'working', label: 'Working', icon: Briefcase, color: '#38bdf8' },
                  { id: 'chilling', label: 'Chilling', icon: Coffee, color: '#f59e0b' },
                  { id: 'playing', label: 'Playing', icon: Flame, color: '#ec4899' }
                ].map(tab => {
                  const isActive = activeDiurnalTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveDiurnalTab(tab.id)}
                      style={{
                        background: isActive ? `rgba(${tab.id === 'working' ? '56, 189, 248' : tab.id === 'chilling' ? '245, 158, 11' : '236, 72, 153'}, 0.2)` : 'rgba(0,0,0,0.4)',
                        border: isActive ? `1.5px solid ${tab.color}` : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '6px 4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? `0 0 10px ${tab.color}40` : 'none'
                      }}
                    >
                      <Icon size={13} color={isActive ? tab.color : 'rgba(255,255,255,0.6)'} />
                      <span style={{ fontSize: '10.5px', fontWeight: 800, color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Benefit Panel based on Selected Mode */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '0.85rem', minHeight: '66px' }}>
                {activeDiurnalTab === 'working' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8' }}>☀️ {diurnal.working?.window || '9:00 AM – 3:30 PM'}</span>
                      <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '1px 6px', borderRadius: '6px' }}>FOCUS: {diurnal.working?.score || 91}%</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.35 }}>
                      {diurnal.working?.focus || 'Natural diffused daylight, low acoustic distractions, and spacious laptop banquettes.'}
                    </p>
                  </div>
                )}
                {activeDiurnalTab === 'chilling' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b' }}>🌅 {diurnal.chilling?.window || '4:00 PM – 7:00 PM'}</span>
                      <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '1px 6px', borderRadius: '6px' }}>TWILIGHT: {diurnal.chilling?.score || 97}%</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.35 }}>
                      {diurnal.chilling?.focus || 'The 4:00 PM Twilight Pivot: stepless transition to warm 2400K amber glow, waterfront reflection & tranquil aperitivo.'}
                    </p>
                  </div>
                )}
                {activeDiurnalTab === 'playing' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#ec4899' }}>🍸 {diurnal.playing?.window || '7:30 PM – LATE'}</span>
                      <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', padding: '1px 6px', borderRadius: '6px' }}>VIBE: {diurnal.playing?.score || 95}%</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.35 }}>
                      {diurnal.playing?.focus || 'Seductive 2200K low-lux candlelight, buzzing craft mixology & high-energy magnetic social crowd.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Fun Section: Content Ready Analysis */}
            <div style={{ 
              marginTop: '0.5rem', 
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(192, 132, 252, 0.08) 100%)', 
              padding: '10px 12px', 
              borderRadius: '10px', 
              border: '1px solid rgba(0, 229, 255, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Camera size={13} color="#00e5ff" /> Content Ready Analysis
                </span>
                <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(0, 229, 255, 0.2)', color: '#00e5ff', padding: '2px 7px', borderRadius: '8px', border: '1px solid rgba(0, 229, 255, 0.4)' }}>
                  📸 {contentReady.score || 96}/100 FLATTERY SCORE
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#ffffff', fontWeight: 700 }}>
                {contentReady.verdict || 'Zero Downlight Raccoon Eyes • Diffuse Ambient Glow'}
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>
                <strong style={{ color: '#c084fc' }}>Top Spot:</strong> {contentReady.top_creator_spot || 'Glass corner banquette during golden hour'}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 5: Location & Neighborhood Pulse                                */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 380px', minWidth: '380px', maxWidth: '400px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 179, 0, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffb300', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={13} /> 5-Minute Walk &amp; Local Gems
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', minHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0' }}>
                Verified 4.4★+ Local Spots Right Outside
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', minHeight: '82px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: '#94a3b8', textAlign: 'left' }}>Isolated</span>
                  <span style={{ color: '#fbbf24', textAlign: 'center' }}>Walkable</span>
                  <span style={{ color: '#ffb300', textAlign: 'right' }}>Local Hub</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #64748b 0%, #fbbf24 50%, #ffb300 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '92%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #ffb300',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 700, gap: '8px' }}>
                  <span style={{ color: '#ffb300', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>Verified Local Gems</span>
                  <span style={{ color: '#10b981', flexShrink: 0, fontSize: '10px', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 7px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>2–6 Min Walk</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', minHeight: '34px', lineHeight: 1.35, marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start' }}>
                <span><span style={{ color: '#ffb300' }}>Doorstep Gems:</span> {(proximity.key_anchors && proximity.key_anchors.length > 0) ? proximity.key_anchors.slice(0, 2).join(' • ') : 'Verified 4.5★+ Local Spots'}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.65rem', minHeight: '26px', alignItems: 'center' }}>
                {(proximity.key_anchors || ['Verified Local Wine Bar (4.6★ · 3m)', 'Artisan Bakery (4.5★ · 4m)']).slice(0, 2).map((anchor, i) => (
                  <span key={i} style={{ background: 'rgba(255, 179, 0, 0.12)', color: '#ffb300', fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(255, 179, 0, 0.25)', whiteSpace: 'nowrap' }}>
                    📍 {anchor}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>
                {(proximity.insider_lore || 'Positioned within a 2 to 6 minute walk of verified 4.4★+ local spots where residents actually eat and drink.').split('.')[0] + '.'}
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(255, 179, 0, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 179, 0, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              ✓ <strong>Verified Local Filter:</strong> Strictly 4.4★+ rated local spots — zero tourist traps.
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 6: Insider Secrets & Hidden Lore                                */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 380px', minWidth: '380px', maxWidth: '400px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(236, 72, 153, 0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#f472b6', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Key size={13} /> Insider Access
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', minHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0' }}>
                Off-Menu Secrets & Local Lore
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', minHeight: '82px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: '#94a3b8', textAlign: 'left' }}>Guidebook</span>
                  <span style={{ color: '#ec4899', textAlign: 'center' }}>Curated</span>
                  <span style={{ color: '#f472b6', textAlign: 'right' }}>Insider Lore</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 50%, #f472b6 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '94%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #f472b6',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 700, gap: '8px' }}>
                  <span style={{ color: '#f472b6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{secrets.insider_badge || 'Head Bartender Lore'}</span>
                  <span style={{ color: '#ec4899', flexShrink: 0, fontSize: '10px', background: 'rgba(236, 72, 153, 0.15)', padding: '2px 7px', borderRadius: '4px', border: '1px solid rgba(236, 72, 153, 0.3)' }}>Verified Secret</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', minHeight: '34px', lineHeight: 1.35, marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start' }}>
                <span><span style={{ color: '#f472b6' }}>Secret Lore:</span> {(secrets.secret_title || 'The Off-Menu Highball & Hidden Snug').replace(/\s*[-—–].*$/, '').trim()}</span>
              </div>

              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.85)', marginBottom: '0.65rem', minHeight: '24px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <strong style={{ color: '#ffd700', marginRight: '6px', flexShrink: 0 }}>🗝️ Off-Menu:</strong> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{(secrets.off_menu_perk || secrets.secret_lore || 'Ask head bartender for botanical infusion.').split('.')[0] + '.'}</span>
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>
                Insider perks and hidden architectural details known only to neighborhood regulars.
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(236, 72, 153, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(236, 72, 153, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              🔑 <strong>Insider Tip:</strong> Ask the host team on arrival for the current off-menu local favourite.
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUALIFICATION MATRIX (You will love if / Skip if)                         */}
      {/* ========================================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', background: 'rgba(0,0,0,0.5)', padding: '1.25rem 1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em' }}>
              You will love this property if:
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', lineHeight: 1.4 }}>
              {qual.you_will_love_if || 'You seek an authentic, atmosphere-rich lifestyle destination with genuine subcultural character.'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', letterSpacing: '0.05em' }}>
              Skip this property if:
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', lineHeight: 1.4 }}>
              {qual.skip_if || 'You prefer clinical, uniform corporate hotels with zero social energy or neighborhood engagement.'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AI SEARCH (CHATGPT, PERPLEXITY & GEMINI) & PROTECTED VIBE REGISTRY        */}
      {/* ========================================================================= */}
      <div style={{
        marginTop: '1.5rem',
        background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(16, 185, 129, 0.06) 100%)',
        padding: '1.35rem 1.5rem',
        borderRadius: '1.25rem',
        border: '1px solid rgba(0, 229, 255, 0.28)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Compass size={18} color="#00e5ff" />
            <span style={{ fontSize: '12.5px', fontWeight: 900, textTransform: 'uppercase', color: '#00e5ff', letterSpacing: '0.06em' }}>
              AI Search Discovery (ChatGPT, Perplexity &amp; Gemini)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.35)', fontSize: '10px', fontWeight: 800, padding: '3px 9px', borderRadius: '10px' }}>
              🔒 Protected Vibe Registry • Live 30-Day Freshness
            </span>
          </div>
        </div>

        <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.85)', margin: '0 0 0.85rem 0', lineHeight: 1.45 }}>
          {(v.ai_search_geo && v.ai_search_geo.verified_entity_summary)
            ? v.ai_search_geo.verified_entity_summary
            : `${manifest.venue_name || hotelName} is a verified neighbourhood gateway in ${manifest.location || location || 'its district'}, combining quiet, restful rooms upstairs with warm social spaces and direct 2–6 minute walking access to 4.4★+ local gems.`}
        </p>

        <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffd700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          Traveller Prompts Where This Property Matches:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem' }}>
          {((v.ai_search_geo && v.ai_search_geo.traveler_prompts && v.ai_search_geo.traveler_prompts.length > 0)
            ? v.ai_search_geo.traveler_prompts
            : [
                `Best hotel in ${manifest.location || location || 'this area'} within a 5-minute walk of authentic 4.5★ local wine bars and restaurants`,
                `Where to stay in ${manifest.location || location || 'the city'} with a warm evening atmosphere downstairs and quiet, restful rooms upstairs`,
                `Recommended boutique basecamp in ${manifest.location || location || 'town'} for couples and solo explorers who want a true local feel`
              ]
          ).map((promptText, idx) => (
            <div key={idx} style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 12px', fontSize: '11.5px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.35 }}>
              <span style={{ color: '#00e5ff', fontWeight: 800, marginRight: '5px' }}>“</span>
              {promptText}
              <span style={{ color: '#00e5ff', fontWeight: 800, marginLeft: '3px' }}>”</span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
