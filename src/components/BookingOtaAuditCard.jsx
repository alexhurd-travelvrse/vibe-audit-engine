import React, { useState } from 'react';
import { Camera, TrendingUp, AlertCircle, Check, Copy, ExternalLink, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingOtaAuditCard({ otaData, hotelName }) {
  if (!otaData) return null;

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('recommended'); // 'recommended' | 'comparison'
  const photos = otaData.optimal_5_photo_sequence || [];
  const livePhotos = otaData.live_photos || [];
  const copyRewrite = otaData.anti_commodity_copy_rewrite || {};

  const beforeScore = otaData.before_merchandising_score || 44;
  const afterScore = otaData.after_merchandising_score || 93;
  const uplift = otaData.projected_conversion_uplift || '+21.5%';
  
  // Extract or synthesize clean strategic shift bullets
  const strategicShifts = (otaData.key_strategic_shifts && otaData.key_strategic_shifts.length > 0)
    ? otaData.key_strategic_shifts
    : [
        `Align visual sequence with top local search drivers: ${otaData.local_vibe_synergy_context || 'Highlight signature F&B and wellness over repetitive bedroom imagery.'}`,
        `Eliminate drop-off friction: ${otaData.conversion_diagnosis || 'Resolve geographic and amenities ambiguity in the first 5 slots.'}`,
        'Activate high-conversion storytelling: Ground destination authenticity with dedicated Spa, exterior architecture, and design bathroom proof-points.'
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
            background: 'linear-gradient(90deg, #0071c2, #00b4d8)', 
            color: '#ffffff', 
            fontSize: '11px', 
            fontWeight: 900, 
            letterSpacing: '0.15em', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            textTransform: 'uppercase' 
          }}>
            🏨 Booking.com Visual & Copy Diagnostic
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
            Recommended Photos
          </button>
          {livePhotos.length > 0 && (
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
          {/* Current Baseline Score */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(239, 68, 68, 0.04) 100%)', 
            border: '1px solid rgba(239, 68, 68, 0.35)', 
            borderRadius: '1.15rem', 
            padding: '1.1rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#ef4444', letterSpacing: '0.1em', marginBottom: '4px' }}>
              Current Sequence Score
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#ef4444', fontFamily: 'monospace', lineHeight: 1 }}>
              {beforeScore}<span style={{ fontSize: '16px', color: 'rgba(239,68,68,0.6)' }}>/100</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '6px' }}>
              Commodity Friction & Drop-Off
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
              Optimized Sequence Score
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
              Projected Conversion Uplift
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#00e5ff', fontFamily: 'monospace', lineHeight: 1 }}>
              {uplift}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(0,229,255,0.85)', fontWeight: 700, marginTop: '6px' }}>
              Booking Velocity Multiplier
            </div>
          </div>
        </div>

        {/* Identified Drop-Off Flaw Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          marginBottom: '1.25rem', 
          background: 'rgba(239, 68, 68, 0.08)', 
          padding: '10px 16px', 
          borderRadius: '12px', 
          border: '1px solid rgba(239, 68, 68, 0.25)' 
        }}>
          <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '13px', lineHeight: 1.4 }}>
            <strong style={{ color: '#ef4444', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Identified Flaw: </strong>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{otaData.current_drop_off_flaw || 'Leading with generic corporate imagery that dampens lifestyle appeal.'}</span>
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

      {/* SECTION: Recommended Photos Grid */}
      {viewMode === 'recommended' && (
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Camera size={20} color="#00e5ff" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              Recommended Photos
            </h3>
          </div>

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
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80';
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
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        background: isRetained ? '#00e5ff' : 'rgba(255,255,255,0.1)', 
                        color: isRetained ? '#000' : '#fff', 
                        fontSize: '11px', 
                        fontWeight: 900, 
                        padding: '4px 10px', 
                        borderRadius: '8px' 
                      }}>
                        {isRetained ? `SLOT #${slotNum}` : `NEW SLOT #${slotNum}`}
                      </span>
                      <span style={{ fontSize: '10px', color: '#00e5ff', fontWeight: 800 }}>
                        {badge.text}
                      </span>
                    </div>
                  )}

                  {/* Photo Subject & Scannable Bullet Points */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                        {item.photo_subject}
                      </div>

                      {/* Readable Bullet Points */}
                      <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                        {item.bullet_points && Array.isArray(item.bullet_points) && item.bullet_points.length > 0 ? (
                          item.bullet_points.map((pt, pIdx) => (
                            <li key={pIdx} style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.45 }}>
                              {pt}
                            </li>
                          ))
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
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80';
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

      {/* Anti-Commodity Copy Rewrite */}
      <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Anti-Commodity Copy Rewrite (Booking.com Overview)
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

    </motion.div>
  );
}
