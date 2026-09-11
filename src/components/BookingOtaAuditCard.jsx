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

      {/* Flaw & Diagnosis Alert */}
      <div style={{ 
        background: 'rgba(239, 68, 68, 0.08)', 
        border: '1px solid rgba(239, 68, 68, 0.3)', 
        borderRadius: '1.25rem', 
        padding: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', color: '#ef4444', letterSpacing: '0.05em' }}>
              Identified Booking.com Drop-Off Flaw:
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
              {otaData.current_drop_off_flaw || 'Leading with generic corporate imagery that dampens lifestyle appeal.'}
            </div>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0, paddingLeft: '1.75rem' }}>
          {otaData.conversion_diagnosis}
        </p>
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

                  {/* Photo Subject & Psychological Trigger */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                        {item.photo_subject}
                      </div>
                    </div>
                    
                    <div style={{ 
                      marginTop: '0.75rem', 
                      paddingTop: '0.75rem', 
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      fontSize: '11px', 
                      color: 'rgba(0, 229, 255, 0.9)', 
                      fontWeight: 600,
                      lineHeight: 1.3
                    }}>
                      🎯 <strong>Trigger:</strong> {item.psychological_conversion_trigger}
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
                  <img src={img.imageUrl} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
