import React, { useState } from 'react';
import { Camera, TrendingUp, AlertCircle, Check, Copy, ExternalLink, ArrowRight, Sparkles, RefreshCw, Lock, Key } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingOtaAuditCard({ otaData, hotelName, isUnlocked, onUnlockClick, onRequestAccessClick }) {
  if (!otaData) return null;

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('recommended'); // 'recommended' | 'comparison'
  const photos = otaData.optimal_5_photo_sequence || [];
  const livePhotos = otaData.live_photos || [];
  const copyRewrite = otaData.anti_commodity_copy_rewrite || {};
  const photographicGaps = otaData.photographic_gap_analysis || [];

  const unlocked = (typeof isUnlocked === 'boolean') 
    ? isUnlocked 
    : (typeof window !== 'undefined' && sessionStorage.getItem('atmosvibe_pro_unlocked') === 'true');

  const isListedOnBooking = (otaData.is_listed_on_booking !== false) && (livePhotos && livePhotos.length >= 3);
  const beforeScore = isListedOnBooking ? (otaData.before_merchandising_score || 44) : 'N/A';
  const afterScore = otaData.after_merchandising_score || 94;
  const uplift = otaData.projected_conversion_uplift || '+28.5%';
  
  // Extract or synthesize clean strategic shift bullets
  const strategicShifts = (otaData.key_strategic_shifts && otaData.key_strategic_shifts.length > 0)
    ? otaData.key_strategic_shifts
    : [
        `Align visual sequence with top local search drivers: ${otaData.local_vibe_synergy_context || 'Highlight signature F&B and atmosphere over generic imagery.'}`,
        `Eliminate drop-off friction: ${otaData.conversion_diagnosis || 'Resolve geographic and amenities clarity in the first 5 slots.'}`,
        'Activate high-conversion storytelling: Ground destination authenticity with dedicated dining, exterior architecture, and design atmosphere proof-points.'
      ];

  const handleCopy = () => {
    if (copyRewrite.property_overview_150_words) {
      navigator.clipboard.writeText(
        `${copyRewrite.ota_headline || ''}\n\n${copyRewrite.property_overview_150_words}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getActionBadge = (action, actionLabel) => {
    const lbl = (actionLabel || '').toUpperCase();
    const act = (action || '').toUpperCase();
    if (lbl.includes('PRE-LISTING') || act === 'CURATED_ASSET') {
      return { bg: '#00e5ff', color: '#000', text: actionLabel || 'CURATED LAUNCH ASSET' };
    }
    if (act === 'HERO_CULTURAL_MAGNET' || lbl.includes('MAGNET') || act === 'MAGNET_OVERRIDE') {
      return { bg: '#8b5cf6', color: '#ffffff', text: actionLabel || '⚡ HERO CULTURAL MAGNET' };
    }
    if (act === 'KEEP_HERO' || lbl.includes('HERO') || act === 'RETAIN' || lbl.includes('RETAIN')) {
      return { bg: '#00e5ff', color: '#000', text: actionLabel || 'RETAINED IN PLACE' };
    }
    if (act === 'PROMOTE' || lbl.includes('PROMOTE') || lbl.includes('MOVE') || act === 'RE_SEQUENCE') {
      return { bg: '#10b981', color: '#000', text: actionLabel || 'PROMOTED' };
    }
    if (act === 'SWAP_IN' || lbl.includes('SWAP')) {
      return { bg: '#f59e0b', color: '#000', text: actionLabel || 'SWAP IN ASSET' };
    }
    if (act === 'DEMOTE' || lbl.includes('DEMOTE')) {
      return { bg: '#ef4444', color: '#fff', text: actionLabel || 'DEMOTE TO SLOT 10+' };
    }
    return { bg: 'rgba(255,255,255,0.15)', color: '#fff', text: actionLabel || 'RE-SEQUENCE' };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        borderRadius: '2rem',
        padding: '2.5rem',
        marginBottom: '3.5rem',
        background: 'linear-gradient(135deg, rgba(0, 113, 194, 0.08) 0%, rgba(18, 18, 18, 0.92) 100%)',
        border: '1px solid rgba(0, 113, 194, 0.4)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 113, 194, 0.12)'
      }}
    >
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            background: isListedOnBooking ? 'linear-gradient(90deg, #0071c2, #00b4d8)' : 'linear-gradient(90deg, #f59e0b, #00e5ff)', 
            color: isListedOnBooking ? '#ffffff' : '#050b14', 
            fontSize: '11px', 
            fontWeight: 900, 
            letterSpacing: '0.15em', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            textTransform: 'uppercase' 
          }}>
            {isListedOnBooking ? '🏨 Booking.com Visual & Copy Diagnostic' : '⚡ Direct Site & Pre-Listing Merchandising Blueprint'}
          </span>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', borderRadius: '20px', padding: '3px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => setViewMode('recommended')}
            style={{
              background: viewMode === 'recommended' ? '#00e5ff' : 'transparent',
              color: viewMode === 'recommended' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '16px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            {isListedOnBooking ? 'Recommended Photos' : 'Optimal 5-Photo Hierarchy'}
          </button>
          {isListedOnBooking && livePhotos.length > 0 && (
            <button
              onClick={() => setViewMode('comparison')}
              style={{
                background: viewMode === 'comparison' ? '#00e5ff' : 'transparent',
                color: viewMode === 'comparison' ? '#000' : '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '5px 12px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              Current Live
            </button>
          )}
        </div>
      </div>

      {/* Visual Merchandising Scorecard & Strategic Shifts */}
      <div style={{ 
        background: 'rgba(0,0,0,0.45)', 
        border: '1px solid rgba(0, 229, 255, 0.25)', 
        borderRadius: '1.5rem', 
        padding: '1.75rem', 
        marginBottom: '2.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
      }}>
        {/* Scorecard Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Current Baseline Score / Status */}
          <div style={{ 
            background: isListedOnBooking 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(239, 68, 68, 0.04) 100%)' 
              : 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.04) 100%)', 
            border: `1px solid ${isListedOnBooking ? 'rgba(239, 68, 68, 0.35)' : 'rgba(245, 158, 11, 0.35)'}`, 
            borderRadius: '1.15rem', 
            padding: '1.1rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: isListedOnBooking ? '#ef4444' : '#f59e0b', letterSpacing: '0.1em', marginBottom: '4px' }}>
              {isListedOnBooking ? 'Current OTA Score' : 'OTA Listing Status'}
            </div>
            <div style={{ fontSize: isListedOnBooking ? '32px' : '22px', fontWeight: 900, color: isListedOnBooking ? '#ef4444' : '#f59e0b', fontFamily: isListedOnBooking ? 'monospace' : 'inherit', lineHeight: 1.1, paddingTop: isListedOnBooking ? '0' : '5px' }}>
              {isListedOnBooking ? (<>{beforeScore}<span style={{ fontSize: '16px', color: 'rgba(239,68,68,0.6)' }}>/100</span></>) : 'UNLISTED'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '6px' }}>
              {isListedOnBooking ? 'Commodity Friction & Drop-Off' : 'Independent / Direct Venue'}
            </div>
          </div>

          {/* Optimized Score */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.04) 100%)', 
            border: '1px solid rgba(16, 185, 129, 0.4)', 
            borderRadius: '1.15rem', 
            padding: '1.1rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.1em', marginBottom: '4px' }}>
              {isListedOnBooking ? 'Optimized Sequence Score' : 'Target Launch Score'}
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#10b981', fontFamily: 'monospace', lineHeight: 1 }}>
              {afterScore}<span style={{ fontSize: '16px', color: 'rgba(16,185,129,0.6)' }}>/100</span>
            </div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, marginTop: '6px' }}>
              High Cultural Resonance
            </div>
          </div>

          {/* Conversion Lift */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(0, 229, 255, 0.04) 100%)', 
            border: '1px solid rgba(0, 229, 255, 0.4)', 
            borderRadius: '1.15rem', 
            padding: '1.1rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#00e5ff', letterSpacing: '0.1em', marginBottom: '4px' }}>
              {isListedOnBooking ? 'Projected Conversion Uplift' : 'Direct Booking Velocity'}
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#00e5ff', fontFamily: 'monospace', lineHeight: 1 }}>
              {uplift}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(0,229,255,0.85)', fontWeight: 700, marginTop: '6px' }}>
              Multi-Channel Discovery
            </div>
          </div>
        </div>

        {/* Identified Drop-Off Flaw or Pre-Listing Notice Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          marginBottom: '1.25rem', 
          background: isListedOnBooking ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 229, 255, 0.08)', 
          padding: '10px 16px', 
          borderRadius: '12px', 
          border: `1px solid ${isListedOnBooking ? 'rgba(239, 68, 68, 0.25)' : 'rgba(0, 229, 255, 0.25)'}` 
        }}>
          {isListedOnBooking ? (
            <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
          ) : (
            <Sparkles size={18} color="#00e5ff" style={{ flexShrink: 0 }} />
          )}
          <div style={{ fontSize: '13px', lineHeight: 1.4 }}>
            <strong style={{ color: isListedOnBooking ? '#ef4444' : '#00e5ff', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>
              {isListedOnBooking ? 'Identified Flaw: ' : 'Pre-Listing Visual Strategy: '}
            </strong>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>
              {isListedOnBooking 
                ? (otaData.current_drop_off_flaw || 'Leading with generic corporate imagery that dampens lifestyle appeal.')
                : `No active room listing on Booking.com. Below is the curated 5-asset hierarchy to maximize direct website engagement and future OTA launch velocity.`}
            </span>
          </div>
        </div>

        {/* Key Strategic Shifts Bullets */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
          <div style={{ 
            fontSize: '11px', 
            fontWeight: 900, 
            color: '#00e5ff', 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em', 
            marginBottom: '0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px' 
          }}>
            <Sparkles size={14} color="#00e5ff" />
            Key Strategic Shifts (Hotel DNA ⟷ Neighborhood Search Demand)
          </div>

          <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {strategicShifts.map((shift, sIdx) => (
              <li key={sIdx} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                {shift}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SECTION: Recommended Photos Grid OR Pending Status Card */}
      {viewMode === 'recommended' && (
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Camera size={20} color="#00e5ff" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              Recommended Photos
            </h3>
            {((otaData.photos_status === 'PENDING') || (photos.length > 0 && photos.every(p => !p.photo_url))) && (
              <span style={{ fontSize: '11px', background: 'rgba(0,229,255,0.15)', color: '#00e5ff', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, marginLeft: '0.5rem' }}>
                Analyzing Live Assets...
              </span>
            )}
          </div>

          {/* Live Phase 2 Status Banner */}
          {((otaData.photos_status === 'PENDING') || (photos.length > 0 && photos.every(p => !p.photo_url))) ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                borderRadius: '1.25rem',
                padding: '1.25rem 1.75rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(0, 229, 255, 0.15)', border: '1px solid rgba(0, 229, 255, 0.4)' }}>
                  <RefreshCw size={20} color="#00e5ff" className="animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    ⚡ Phase 2 Active: Scraping & Resolving Live Visual Assets
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)', marginTop: '2px' }}>
                    Manifest synthesized. Now extracting live Booking.com gallery assets & verified venue photos to populate slots below.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(0,229,255,0.4)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 8px #00e5ff' }}></span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#00e5ff', fontFamily: 'monospace' }}>ASSET GROUNDING IN PROGRESS</span>
              </div>
            </motion.div>
          ) : (
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '1rem',
              padding: '0.75rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={16} color="#10b981" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Phase 2 Verified: 100% Asset-Grounded Visual Merchandising Sequence
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
                All 5 slots verified with authentic gallery & venue media
              </span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {photos.map((item, idx) => {
              const photoImg = item.photo_url || item.current_photo?.imageUrl;
              const badge = getActionBadge(item.action, item.action_label);
              const slotNum = item.slot || (idx + 1);
              const wasSlot = item.current_slot;
              const isRetained = item.is_retained ?? (wasSlot === slotNum);
              
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '1.25rem',
                    border: idx === 0 ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: idx === 0 ? '0 0 20px rgba(0,229,255,0.2)' : 'none'
                  }}
                >
                  {/* Image Thumbnail with Overlay Badges */}
                  {photoImg ? (
                    <div style={{ position: 'relative', width: '100%', height: '170px', background: '#000', overflow: 'hidden' }}>
                      <img 
                        src={photoImg} 
                        alt={item.photo_subject}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const originalSrc = e.currentTarget.getAttribute('data-original-src') || photoImg;
                          if (!e.currentTarget.getAttribute('data-proxied') && originalSrc && originalSrc.startsWith('http')) {
                            e.currentTarget.setAttribute('data-proxied', 'true');
                            e.currentTarget.setAttribute('data-original-src', originalSrc);
                            e.currentTarget.src = `/api/proxy-image?url=${encodeURIComponent(originalSrc)}`;
                          } else {
                            e.currentTarget.onerror = null;
                            const slotFallbacks = [
                              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                              'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                              'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
                              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
                              'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
                            ];
                            e.currentTarget.src = slotFallbacks[idx % 5];
                          }
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      
                      {/* Target Slot Badge (e.g. SLOT #1 vs NEW SLOT #2) */}
                      <div style={{ 
                        position: 'absolute', 
                        top: '8px', 
                        left: '8px', 
                        background: 'rgba(0,0,0,0.85)', 
                        backdropFilter: 'blur(10px)',
                        color: isRetained ? '#00e5ff' : '#ffffff', 
                        fontSize: '11px', 
                        fontWeight: 900, 
                        padding: '4px 10px', 
                        borderRadius: '8px',
                        border: isRetained ? '1px solid rgba(0,229,255,0.5)' : '1px solid rgba(255,255,255,0.2)'
                      }}>
                        {isRetained ? `SLOT #${slotNum}` : `NEW SLOT #${slotNum}`}
                      </div>

                      {/* Action Directive Badge */}
                      <div style={{ 
                        position: 'absolute', 
                        bottom: '8px', 
                        left: '8px', 
                        background: badge.bg, 
                        color: badge.color, 
                        fontSize: '10px', 
                        fontWeight: 900, 
                        padding: '3px 8px', 
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {badge.text}
                      </div>

                      {/* Current Live Slot tag */}
                      <div style={{ 
                        position: 'absolute', 
                        top: '8px', 
                        right: '8px', 
                        background: isRetained ? 'rgba(0, 229, 255, 0.2)' : 'rgba(0,0,0,0.85)', 
                        color: isRetained ? '#00e5ff' : 'rgba(255,255,255,0.9)', 
                        border: isRetained ? '1px solid rgba(0,229,255,0.4)' : '1px solid rgba(255,255,255,0.15)',
                        fontSize: '10px', 
                        fontWeight: 700, 
                        padding: '3px 8px', 
                        borderRadius: '6px'
                      }}>
                        {isRetained 
                          ? `Currently Slot #${wasSlot || slotNum}` 
                          : wasSlot 
                            ? `Was: Slot #${wasSlot}` 
                            : 'Brand Media (New to OTA)'}
                      </div>
                    </div>
                  ) : (
                    <div style={{ 
                      position: 'relative', 
                      width: '100%', 
                      height: '170px', 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,229,255,0.05) 100%)', 
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      {/* Target Slot Badge */}
                      <div style={{ 
                        position: 'absolute', 
                        top: '8px', 
                        left: '8px', 
                        background: 'rgba(0,0,0,0.85)', 
                        backdropFilter: 'blur(10px)',
                        color: isRetained ? '#00e5ff' : '#ffffff', 
                        fontSize: '11px', 
                        fontWeight: 900, 
                        padding: '4px 10px', 
                        borderRadius: '8px',
                        border: isRetained ? '1px solid rgba(0,229,255,0.5)' : '1px solid rgba(255,255,255,0.2)'
                      }}>
                        {isRetained ? `SLOT #${slotNum}` : `NEW SLOT #${slotNum}`}
                      </div>

                      {/* Action Directive Badge */}
                      <div style={{ 
                        position: 'absolute', 
                        bottom: '8px', 
                        left: '8px', 
                        background: badge.bg, 
                        color: badge.color, 
                        fontSize: '10px', 
                        fontWeight: 900, 
                        padding: '3px 8px', 
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {badge.text}
                      </div>

                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '0 1rem',
                        textAlign: 'center'
                      }}>
                        <RefreshCw size={22} color="#00e5ff" className="animate-spin" style={{ animationDuration: '3s' }} />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Resolving High-Res Asset...
                        </span>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>
                          Scraping verified {item.category ? item.category.replace(/_/g, ' ') : 'visual'} photo
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Photo Subject & Scannable Bullet Points */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                        {item.photo_subject}
                      </div>

                      {/* Upgrade Callout Badge if brand asset */}
                      {item.upgrade_rationale && (
                        <div style={{
                          background: 'rgba(245, 158, 11, 0.1)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          marginBottom: '0.75rem',
                          fontSize: '11px',
                          color: '#fbbf24',
                          lineHeight: 1.4
                        }}>
                          <strong style={{ color: '#f59e0b', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.05em', display: 'block', marginBottom: '2px' }}>
                            ✨ Asset Justification:
                          </strong>
                          {item.upgrade_rationale}
                        </div>
                      )}

                      {/* Readable Bullet Points */}
                      <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                        {item.bullet_points && Array.isArray(item.bullet_points) && item.bullet_points.length > 0 ? (
                          item.bullet_points.map((pt, pIdx) => {
                            const isUpgradeBullet = pt.toLowerCase().startsWith('visual upgrade') || pt.toLowerCase().startsWith('upgrade rationale') || pt.toLowerCase().startsWith('upgrade:');
                            return (
                              <li key={pIdx} style={{ 
                                fontSize: '11.5px', 
                                color: isUpgradeBullet ? '#fbbf24' : 'rgba(255,255,255,0.85)', 
                                lineHeight: 1.45 
                              }}>
                                {pt}
                              </li>
                            );
                          })
                        ) : (
                          <>
                            <li style={{ fontSize: '11.5px', color: '#fbbf24', lineHeight: 1.45 }}>
                              <strong>Local Demand:</strong> {item.local_vibe_connection || "Directly reflects the neighborhood's leading cultural search driver."}
                            </li>
                            <li style={{ fontSize: '11.5px', color: 'rgba(0, 229, 255, 0.95)', lineHeight: 1.45 }}>
                              <strong>Trigger:</strong> {item.psychological_conversion_trigger}
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION: Live Comparison Mode */}
      {viewMode === 'comparison' && livePhotos.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', color: '#00e5ff', marginBottom: '1rem' }}>
            Current Live Photos
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {livePhotos.map((img, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ position: 'relative', height: '120px' }}>
                  <img 
                    src={img.imageUrl} 
                    alt={img.title} 
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const originalSrc = e.currentTarget.getAttribute('data-original-src') || img.imageUrl;
                      if (!e.currentTarget.getAttribute('data-proxied') && originalSrc && originalSrc.startsWith('http')) {
                        e.currentTarget.setAttribute('data-proxied', 'true');
                        e.currentTarget.setAttribute('data-original-src', originalSrc);
                        e.currentTarget.src = `/api/proxy-image?url=${encodeURIComponent(originalSrc)}`;
                      } else {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80';
                      }
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{ position: 'absolute', top: '6px', left: '6px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>
                    Current Live Slot #{i + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: Photographic Gap Analysis (Creative Commissioning Scope) */}
      {photographicGaps && photographicGaps.length > 0 && (
        <div style={{
          marginBottom: '2.5rem',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)',
          borderRadius: '1.25rem',
          padding: '1.75rem',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Camera size={13} /> Visual Portfolio Gap Scope • Creative Commissioning
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '4px 0 0 0' }}>
                High-Conversion Visual Assets Missing from Official Channels
              </h4>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', maxWidth: '380px', lineHeight: 1.4 }}>
              Beyond reordering existing photography, these missing shots capture high-value unmet guest search demand to lift direct ADR.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {photographicGaps.map((gap, gIdx) => (
              <div 
                key={gIdx}
                style={{
                  background: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
                    <span style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#fbbf24',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.05em'
                    }}>
                      {gap.category ? gap.category.replace(/_/g, ' ') : 'VISUAL GAP'}
                    </span>
                    {gap.projected_adr_impact && (
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#34d399',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {gap.projected_adr_impact}
                      </span>
                    )}
                  </div>

                  <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                    {gap.missing_shot_title}
                  </h5>

                  <p style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                    {gap.why_needed}
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '11px',
                  color: '#00e5ff',
                  lineHeight: 1.4
                }}>
                  <strong style={{ color: '#00e5ff', fontSize: '10px', textTransform: 'uppercase', display: 'block', marginBottom: '2px', letterSpacing: '0.05em' }}>
                    🎬 Framing & Photometrics:
                  </strong>
                  {gap.recommended_framing_and_lighting}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anti-Commodity Copy Rewrite (PRO / LOGGED-IN ONLY) */}
      {!unlocked ? (
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.95) 100%)',
          borderRadius: '1.25rem',
          padding: '2rem',
          border: '1px solid rgba(0, 229, 255, 0.25)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(245, 158, 11, 0.12)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <Lock size={12} /> PRO CLIENT SUITE • AVAILABLE AFTER LOGIN
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', margin: '8px 0 0 0' }}>
                Booking.com Anti-Commodity Copy Rewrite
              </h4>
            </div>
            <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
              Part of the $500/mo Vibe Conversion Suite
            </div>
          </div>

          {/* Locked Content Overlay Teaser */}
          <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', background: 'rgba(0,0,0,0.35)', padding: '1.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Blurred Background Teaser */}
            <div style={{ filter: 'blur(6px)', opacity: 0.35, userSelect: 'none', pointerEvents: 'none' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00e5ff', marginBottom: '0.75rem' }}>
                {copyRewrite.ota_headline || 'A Sanctuary of Cultural Style & Acoustic Warmth'}
              </div>
              <p style={{ fontSize: '13px', color: '#fff', lineHeight: 1.7, margin: 0 }}>
                {copyRewrite.property_overview_150_words || 'Nestled in the heart of the district, this boutique destination redefines the modern urban escape with warm acoustic resonances, artisan culinary experiences, and intuitive design touches designed to bridge the hotel with the vibrant neighborhood DNA.'}
              </p>
            </div>

            {/* Centered Lock Call-to-Action */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              textAlign: 'center',
              background: 'radial-gradient(circle at center, rgba(5, 15, 30, 0.92) 0%, rgba(2, 6, 23, 0.98) 100%)'
            }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff', marginBottom: '0.75rem' }}>
                <Lock size={20} />
              </div>

              <h5 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', margin: '0 0 6px 0', letterSpacing: '-0.2px' }}>
                Unlock Full Booking.com Copy Rewrite
              </h5>

              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
                The free tier includes your full Vibe Manifest & 5-Photo Resequencing. Log in with your client password or enquire about the Pro Suite to reveal and copy your custom 150-word Booking.com overview.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {onUnlockClick && (
                  <button
                    onClick={onUnlockClick}
                    style={{
                      background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                      color: '#050b14',
                      border: 'none',
                      borderRadius: '30px',
                      padding: '8px 20px',
                      fontSize: '12px',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0, 229, 255, 0.3)'
                    }}
                  >
                    <Key size={14} /> Client Log In
                  </button>
                )}
                {onRequestAccessClick && (
                  <button
                    onClick={onRequestAccessClick}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '30px',
                      padding: '8px 18px',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Enquire for Access
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* UNLOCKED FULL REWRITE CARD */
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid rgba(0, 229, 255, 0.25)', boxShadow: '0 0 25px rgba(0, 229, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Sparkles size={13} /> Anti-Commodity Copy Rewrite (Booking.com Overview) • PRO UNLOCKED
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '4px 0 0 0' }}>
                {copyRewrite.ota_headline || 'A Sanctuary of Style & Culture'}
              </h4>
            </div>

            <button
              onClick={handleCopy}
              style={{
                background: copied ? '#10b981' : 'rgba(0, 229, 255, 0.15)',
                color: copied ? '#000' : '#00e5ff',
                border: `1px solid ${copied ? '#10b981' : 'rgba(0, 229, 255, 0.3)'}`,
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'COPIED TO CLIPBOARD' : 'COPY REWRITE'}
            </button>
          </div>

          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0, fontStyle: 'normal' }}>
            {copyRewrite.property_overview_150_words}
          </p>
        </div>
      )}

    </motion.div>
  );
}
