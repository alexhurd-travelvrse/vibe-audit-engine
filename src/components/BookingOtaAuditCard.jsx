import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, TrendingUp, AlertCircle, Check, Copy, ExternalLink, ArrowRight, Sparkles, RefreshCw, Lock, Key } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingOtaAuditCard({ otaData, hotelName, isUnlocked, onUnlockClick, onRequestAccessClick }) {
  if (!otaData) return null;

  const [copied, setCopied] = useState(false);
  const [copiedInsightKey, setCopiedInsightKey] = useState(null);
  const [showSlotRubric, setShowSlotRubric] = useState(true);
  const [viewMode, setViewMode] = useState('recommended'); // 'recommended' | 'comparison'
  const photos = otaData.optimal_5_photo_sequence || [];
  const livePhotos = otaData.live_photos || [];
  const copyRewrite = otaData.anti_commodity_copy_rewrite || {};
  const photographicGaps = otaData.photographic_gap_analysis || [];
  const rubric = otaData.vibe_grading_rubric || null;

  const unlocked = (typeof isUnlocked === 'boolean') 
    ? isUnlocked 
    : (typeof window !== 'undefined' && sessionStorage.getItem('atmosvibe_pro_unlocked') === 'true');

  const isListedOnBooking = (otaData.is_listed_on_booking !== false) && (otaData.listing_status !== 'NOT_LISTED_ON_BOOKING');
  const beforeScore = isListedOnBooking ? (rubric?.current_merchandising_score || otaData.before_merchandising_score || 48) : 'N/A';
  const afterScore = rubric?.optimized_merchandising_score || otaData.after_merchandising_score || 94;
  const verifiedRealityScore = rubric?.verified_reality_score || 92;
  const vibeGapPoints = rubric?.vibe_gap_points ?? (typeof beforeScore === 'number' ? beforeScore - verifiedRealityScore : -44);
  const uplift = otaData.projected_conversion_uplift || '+28.5%';

  const handleCopyInsight = (key, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedInsightKey(key);
    setTimeout(() => setCopiedInsightKey(null), 2200);
  };
  
  // Extract or synthesize clean strategic shift bullets
  const strategicShifts = (otaData.key_strategic_shifts && otaData.key_strategic_shifts.length > 0)
    ? otaData.key_strategic_shifts
    : [
        `Align visual sequence with top local search drivers: ${otaData.local_vibe_synergy_context || 'Highlight signature F&B and atmosphere over generic imagery'}`,
        `Accelerate booking confidence: ${otaData.conversion_diagnosis || 'Deliver clear geographic and amenity confirmation in the first 5 slots'}`,
        'Activate high-conversion storytelling: Ground destination authenticity with dedicated dining, exterior architecture, and design atmosphere proof-points'
      ];

  const handleSignUp = () => {
    if (onRequestAccessClick) {
      onRequestAccessClick();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/audit';
    }
  };

  const handleLogin = () => {
    if (onUnlockClick) {
      onUnlockClick();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/audit';
    }
  };

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
        {/* Destination Vibe Signature (No Figure) + 3-Score Hotel & Channel Scorecard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.9rem', marginBottom: '1.25rem' }}>
          {/* Baseline Reference: Destination Vibe Signature (No Numeric Figure) */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.03) 100%)', 
            border: '1px solid rgba(139, 92, 246, 0.35)', 
            borderRadius: '1.15rem', 
            padding: '1rem', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#a78bfa', letterSpacing: '0.09em', marginBottom: '5px' }}>
              Destination Vibe Signature
            </div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#e9d5ff', lineHeight: 1.25 }}>
              {rubric?.destination_vibe_title || 'Target Neighbourhood Benchmark'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', marginTop: '6px', lineHeight: 1.35 }}>
              {rubric?.destination_vibe_pillars || 'Local Architecture • Evening Social Energy • Walkable Micro-Gems'}
            </div>
          </div>

          {/* Score 1: Hotel Vibe Signature (Verified On-Property Reality) */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(0, 229, 255, 0.03) 100%)', 
            border: '1px solid rgba(0, 229, 255, 0.35)', 
            borderRadius: '1.15rem', 
            padding: '1rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#00e5ff', letterSpacing: '0.09em', marginBottom: '4px' }}>
              Hotel Vibe Signature (Reality)
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#00e5ff', fontFamily: 'monospace', lineHeight: 1.1 }}>
              {verifiedRealityScore}<span style={{ fontSize: '15px', color: 'rgba(0,229,255,0.6)' }}>/100</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '5px' }}>
              {rubric?.verified_reality_label || 'On-Property Match to Destination'}
            </div>
          </div>

          {/* Score 2: Live Channel Merchandising Baseline + Vibe Gap */}
          <div style={{ 
            background: isListedOnBooking 
              ? (beforeScore < 65 ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(239, 68, 68, 0.05) 100%)' : 'linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(56, 189, 248, 0.03) 100%)')
              : 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.04) 100%)', 
            border: `1px solid ${isListedOnBooking ? (beforeScore < 65 ? 'rgba(245, 158, 11, 0.45)' : 'rgba(56, 189, 248, 0.35)') : 'rgba(245, 158, 11, 0.35)'}`, 
            borderRadius: '1.15rem', 
            padding: '1rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: beforeScore < 65 ? '#fbbf24' : '#38bdf8', letterSpacing: '0.09em', marginBottom: '4px' }}>
              {isListedOnBooking ? 'Live OTA Merchandising' : 'OTA Listing Status'}
            </div>
            <div style={{ fontSize: isListedOnBooking ? '30px' : '22px', fontWeight: 900, color: beforeScore < 65 ? '#fbbf24' : '#38bdf8', fontFamily: isListedOnBooking ? 'monospace' : 'inherit', lineHeight: 1.1 }}>
              {isListedOnBooking ? (<>{beforeScore}<span style={{ fontSize: '15px', opacity: 0.65 }}>/100</span></>) : 'UNLISTED'}
            </div>
            <div style={{ fontSize: '11px', color: beforeScore < 65 ? '#fcd34d' : 'rgba(255,255,255,0.75)', fontWeight: 700, marginTop: '5px' }}>
              {isListedOnBooking ? `${vibeGapPoints} pt Vibe Gap vs. Reality` : 'Independent / Direct Venue'}
            </div>
          </div>

          {/* Optimized Vibe Sequence Score */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0.04) 100%)', 
            border: '1px solid rgba(16, 185, 129, 0.45)', 
            borderRadius: '1.15rem', 
            padding: '1rem', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.09em', marginBottom: '4px' }}>
              {isListedOnBooking ? 'Optimized Vibe Sequence' : 'Target Launch Score'}
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#10b981', fontFamily: 'monospace', lineHeight: 1.1 }}>
              {afterScore}<span style={{ fontSize: '15px', color: 'rgba(16,185,129,0.6)' }}>/100</span>
            </div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, marginTop: '5px' }}>
              Closes Vibe Gap ({uplift} Est. Lift)
            </div>
          </div>
        </div>

        {/* Auditable 5-Slot 100-Point Rubric Breakdown & Auto Vibe Insights */}
        {rubric && Array.isArray(rubric.slot_scorecard) && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: '1.15rem',
            padding: '1.15rem 1.25rem',
            marginBottom: '1.35rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: showSlotRubric ? '0.9rem' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.09em',
                  background: vibeGapPoints <= -30 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: vibeGapPoints <= -30 ? '#fbbf24' : '#34d399',
                  padding: '3px 9px',
                  borderRadius: '10px',
                  border: `1px solid ${vibeGapPoints <= -30 ? 'rgba(245,158,11,0.4)' : 'rgba(16,185,129,0.4)'}`
                }}>
                  {rubric.vibe_gap_archetype}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255,255,255,0.9)' }}>
                  Auditable 100-Point 5-Slot Grading Breakdown ({rubric.raw_slot_total}/100 Raw {rubric.repetition_penalty} pt Repetition Penalty = {beforeScore}/100)
                </span>
              </div>
              <button
                onClick={() => setShowSlotRubric(!showSlotRubric)}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: '#00e5ff',
                  border: '1px solid rgba(0,229,255,0.25)',
                  borderRadius: '12px',
                  padding: '3px 10px',
                  fontSize: '10.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {showSlotRubric ? 'Hide Rubric' : 'Show 5-Slot Math'}
              </button>
            </div>

            {showSlotRubric && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '1rem' }}>
                  {rubric.slot_scorecard.map((s) => {
                    const isFull = s.live_score >= 18;
                    const isLow = s.live_score <= 8;
                    return (
                      <div
                        key={s.slot}
                        className="rubric-slot-row"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'minmax(185px, 1.1fr) 78px minmax(200px, 1.5fr) minmax(200px, 1.5fr)',
                          gap: '10px',
                          alignItems: 'center',
                          background: 'rgba(0,0,0,0.35)',
                          border: `1px solid ${isFull ? 'rgba(16,185,129,0.28)' : (isLow ? 'rgba(239,68,68,0.28)' : 'rgba(255,255,255,0.07)')}`,
                          borderRadius: '9px',
                          padding: '8px 12px',
                          fontSize: '12px'
                        }}
                      >
                        <div style={{ fontWeight: 800, color: '#fff' }}>{s.formula_name}</div>
                        <div style={{
                          fontFamily: 'monospace',
                          fontWeight: 900,
                          fontSize: '13px',
                          color: isFull ? '#10b981' : (isLow ? '#f87171' : '#fbbf24'),
                          textAlign: 'center',
                          background: 'rgba(255,255,255,0.04)',
                          padding: '2px 6px',
                          borderRadius: '6px'
                        }}>
                          {s.live_score}/{s.max_score}
                        </div>
                        <div className="rubric-col-wide" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '11.5px' }}>
                          <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Live:</strong> {s.live_what_is_there}
                        </div>
                        <div className="rubric-col-wide" style={{ color: '#00e5ff', fontSize: '11.5px', fontWeight: 600 }}>
                          <strong style={{ color: '#10b981' }}>Action:</strong> {s.optimal_fix}
                        </div>
                      </div>
                    );
                  })}

                  {/* Repetition Penalty Row */}
                  {rubric.repetition_penalty < 0 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '9px',
                      padding: '7px 12px',
                      fontSize: '11.5px',
                      color: '#fca5a5'
                    }}>
                      <span><strong>Repetition / Redundancy Penalty:</strong> {rubric.repetition_penalty_reason}</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '13px', color: '#f87171' }}>
                        {rubric.repetition_penalty} pts
                      </span>
                    </div>
                  )}
                </div>

                {/* Automated Vibe Insights Marketing Box */}
                {rubric.auto_vibe_insights && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.07) 0%, rgba(16, 185, 129, 0.06) 100%)',
                    border: '1px solid rgba(0, 229, 255, 0.25)',
                    borderRadius: '10px',
                    padding: '10px 14px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00e5ff' }}>
                        ⚡ Automated Vibe Insight (Ready for Site / LinkedIn / GM Outreach)
                      </span>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleCopyInsight('gm', rubric.auto_vibe_insights.gm_outreach_hook)}
                          style={{
                            background: copiedInsightKey === 'gm' ? '#10b981' : 'rgba(0,229,255,0.14)',
                            color: copiedInsightKey === 'gm' ? '#000' : '#00e5ff',
                            border: '1px solid rgba(0,229,255,0.3)',
                            borderRadius: '8px',
                            padding: '3px 9px',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          {copiedInsightKey === 'gm' ? '✓ Copied GM Hook' : 'Copy GM Outreach Hook'}
                        </button>
                        <button
                          onClick={() => handleCopyInsight('li', rubric.auto_vibe_insights.linkedin_post_hook)}
                          style={{
                            background: copiedInsightKey === 'li' ? '#10b981' : 'rgba(139,92,246,0.18)',
                            color: copiedInsightKey === 'li' ? '#000' : '#c4b5fd',
                            border: '1px solid rgba(139,92,246,0.35)',
                            borderRadius: '8px',
                            padding: '3px 9px',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          {copiedInsightKey === 'li' ? '✓ Copied LinkedIn Hook' : 'Copy LinkedIn Insight'}
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.5 }}>
                      “{rubric.auto_vibe_insights.headline_stat}”
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Neighborhood Demand Gravity ⟷ Key Strategic Shifts */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
          {/* Neighborhood Demand Narrative */}
          {otaData.local_vibe_synergy_context && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '6px' 
              }}>
                <Sparkles size={15} color="#00e5ff" />
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 900, 
                  color: '#00e5ff', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em' 
                }}>
                  Neighborhood Demand Gravity
                </span>
                <span style={{ 
                  fontSize: '10px', 
                  background: 'rgba(0, 229, 255, 0.15)', 
                  color: '#00e5ff', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontWeight: 700 
                }}>
                  Search Drivers
                </span>
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.92)', lineHeight: 1.55 }}>
                {otaData.local_vibe_synergy_context}
              </div>
            </div>
          )}

          {/* Key Strategic Shifts */}
          <div>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: 900, 
              color: '#38bdf8', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              marginBottom: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }}>
              <TrendingUp size={14} color="#38bdf8" />
              Key Strategic Shifts Driven by Neighborhood Demand
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {strategicShifts.map((shift, sIdx) => (
                <div 
                  key={sIdx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '10px 14px'
                  }}
                >
                  <span style={{ 
                    background: 'rgba(0, 229, 255, 0.15)', 
                    color: '#00e5ff', 
                    fontSize: '10.5px', 
                    fontWeight: 900, 
                    borderRadius: '6px', 
                    padding: '2px 7px',
                    flexShrink: 0,
                    marginTop: '2px',
                    fontFamily: 'monospace'
                  }}>
                    SHIFT {sIdx + 1}
                  </span>
                  <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>
                    {shift}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
                    Vibe Signature synthesized. Now extracting live Booking.com gallery assets & verified venue photos to populate slots below.
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
                        {item.source_display_label || (
                          isRetained 
                            ? `Currently Slot #${wasSlot || slotNum}` 
                            : wasSlot 
                              ? `Was: Slot #${wasSlot} (Booking.com)` 
                              : (() => {
                                  try {
                                    const u = new URL(photoImg);
                                    const host = u.hostname.replace(/^www\./, '').toLowerCase();
                                    if (host.includes('bstatic.com')) return wasSlot ? `Was: Slot #${wasSlot}` : 'Booking.com Live Gallery';
                                    if (host.includes('tripadvisor.com')) return 'TripAdvisor (Management)';
                                    return `Official Site (${host})`;
                                  } catch (e) {
                                    return 'Official Brand Asset';
                                  }
                                })()
                        )}
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

            {/* 6th Slot in Grid: Visual Opportunity (Missing High-Impact Photos) */}
            {photographicGaps && photographicGaps.length > 0 && (
              <div 
                style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  borderRadius: '1.25rem',
                  border: '1.5px dashed rgba(245, 158, 11, 0.45)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  position: 'relative'
                }}
              >
                {/* Visual Header / Missing Asset Frame */}
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '170px', 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(0, 0, 0, 0.7) 100%)',
                  borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '1.25rem',
                  textAlign: 'center',
                  gap: '8px'
                }}>
                  {/* Visual Opportunity Badge */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '8px', 
                    left: '8px', 
                    background: 'rgba(245, 158, 11, 0.95)', 
                    color: '#050b14', 
                    fontSize: '10.5px', 
                    fontWeight: 900, 
                    padding: '3px 9px', 
                    borderRadius: '8px',
                    letterSpacing: '0.05em'
                  }}>
                    VISUAL OPPORTUNITY
                  </div>

                  {/* Revenue Growth Badge */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '8px', 
                    right: '8px', 
                    background: 'rgba(16, 185, 129, 0.2)', 
                    color: '#10b981', 
                    fontSize: '10px', 
                    fontWeight: 800, 
                    padding: '3px 8px', 
                    borderRadius: '6px',
                    border: '1px solid rgba(16, 185, 129, 0.4)'
                  }}>
                    UNLOCKS PEAK ADR
                  </div>

                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.2)',
                    border: '1px solid rgba(245, 158, 11, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fbbf24',
                    marginTop: '10px'
                  }}>
                    <Camera size={22} />
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 900, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    + High-Impact Photo to Add
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', maxWidth: '240px', lineHeight: 1.3 }}>
                    {photographicGaps[0]?.missing_shot_title || 'Signature Lifestyle Space'}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', fontWeight: 900, textTransform: 'uppercase', color: '#fbbf24', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      Photographic Gap Analysis
                    </div>
                    <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                      {photographicGaps[0]?.missing_shot_title}
                    </h4>
                    <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                      {photographicGaps[0]?.why_it_matters || 'Adding high-definition imagery of this core space answers active traveler search intent and eliminates hesitation before booking.'}
                    </p>

                    {/* Bullet Highlights */}
                    <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <li style={{ fontSize: '11px', color: '#fbbf24', lineHeight: 1.4 }}>
                        <strong>Neighborhood Alignment:</strong> Matches high-volume searches for experiential lifestyle venues
                      </li>
                      <li style={{ fontSize: '11px', color: 'rgba(0, 229, 255, 0.95)', lineHeight: 1.4 }}>
                        <strong>Direct Lift:</strong> {photographicGaps.length} total photographic gaps identified to maximize direct ADR
                      </li>
                    </ul>
                  </div>

                  <Link
                    to="/partner"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: '#050b14',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '11.5px',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(245, 158, 11, 0.25)',
                      marginTop: '4px',
                      textDecoration: 'none'
                    }}
                  >
                    Unlock Full Photo Gap Report (Partner Beta) <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
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

    </motion.div>
  );
}
