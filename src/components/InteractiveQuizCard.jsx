import React, { useState } from 'react';
import { HelpCircle, Award, CheckCircle2, XCircle, Sparkles, Box, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InteractiveQuizCard({ quizData }) {
  if (!quizData) return null;

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (id) => {
    setSelectedOption(id);
    setHasAnswered(true);
  };

  const isCorrect = selectedOption === quizData.correct_option_id;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        borderRadius: '2rem',
        padding: '2.5rem',
        marginBottom: '3.5rem',
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(18, 18, 18, 0.85) 100%)',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.08)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            background: 'linear-gradient(90deg, #FFD700, #FFA500)', 
            color: '#000', 
            fontSize: '11px', 
            fontWeight: 900, 
            letterSpacing: '0.15em', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            textTransform: 'uppercase' 
          }}>
            🎮 3D Spatial Gamification
          </span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600 }}>
            Target: Scene #{quizData.target_scene_id || 2} ({quizData.scene_name || 'Lobby & Social Spaces'})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFD700', fontSize: '13px', fontWeight: 800 }}>
          <Award size={18} />
          <span>Reward: {quizData.reward_badge || 'Explorer Badge'}</span>
        </div>
      </div>

      <h3 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        {quizData.mission_title || 'Secret Design Lore Challenge'}
      </h3>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
        {quizData.challenge_prompt || 'Scan the iconic environment and test your knowledge of this venue.'}
      </p>

      {/* Question Box */}
      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <HelpCircle size={22} color="#FFD700" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4 }}>
            {quizData.question}
          </div>
        </div>
      </div>

      {/* Interactive Options A, B, C, D */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {(quizData.options || []).map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isThisCorrect = opt.id === quizData.correct_option_id;

          let btnBg = 'rgba(255,255,255,0.04)';
          let btnBorder = 'rgba(255,255,255,0.1)';
          let textColor = '#ffffff';

          if (hasAnswered) {
            if (isThisCorrect) {
              btnBg = 'rgba(16, 185, 129, 0.2)';
              btnBorder = '#10b981';
              textColor = '#34d399';
            } else if (isSelected && !isThisCorrect) {
              btnBg = 'rgba(239, 68, 68, 0.2)';
              btnBorder = '#ef4444';
              textColor = '#f87171';
            }
          } else if (isSelected) {
            btnBorder = '#FFD700';
            btnBg = 'rgba(255, 215, 0, 0.1)';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              style={{
                background: btnBg,
                border: `1px solid ${btnBorder}`,
                borderRadius: '1rem',
                padding: '1rem 1.25rem',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: textColor
              }}
            >
              <span style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                background: isSelected ? '#FFD700' : 'rgba(255,255,255,0.1)', 
                color: isSelected ? '#000' : '#fff',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '13px',
                flexShrink: 0
              }}>
                {opt.id}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>
                {opt.text}
              </span>
              {hasAnswered && isThisCorrect && (
                <CheckCircle2 size={18} color="#10b981" style={{ marginLeft: 'auto' }} />
              )}
              {hasAnswered && isSelected && !isThisCorrect && (
                <XCircle size={18} color="#ef4444" style={{ marginLeft: 'auto' }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Lore Reveal & Reward Feedback */}
      {hasAnswered && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: isCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 215, 0, 0.08)',
            border: `1px solid ${isCorrect ? '#10b981' : 'rgba(255, 215, 0, 0.4)'}`,
            borderRadius: '1.25rem',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <Sparkles size={24} color={isCorrect ? '#10b981' : '#FFD700'} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: isCorrect ? '#34d399' : '#FFD700', marginBottom: '0.4rem' }}>
              {isCorrect ? '🎉 Correct! Spatial Lore Unlocked' : '📖 Insider Lore Reveal:'}
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
              {quizData.success_lore_reveal}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.2)', padding: '4px 10px', borderRadius: '12px' }}>
                🎖️ Unlocked: {quizData.reward_badge}
              </span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                Ready to deploy to Experience #{quizData.target_scene_id || 2} in 3D Splat Viewport.
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
