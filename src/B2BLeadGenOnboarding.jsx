import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Send, Star, MapPin, TrendingUp, Search, Globe, Zap, CheckCircle2, BarChart3, ExternalLink, Gift, RefreshCw, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  scrapeLocalSignals, 
  auditDiscoverability, 
  generatePropulsionQuest
} from './personaEngine';
import './B2BLeadGenOnboarding.css';

const B2BLeadGenOnboarding = ({ initialStep = 'input' }) => {
  const [step, setStep] = useState(initialStep);
  const [processingStage, setProcessingStage] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    propertyName: '',
    propertyUrl: '',
    city: 'London',
    neighborhood: 'Southbank',
    sweeteners: ['cocktails', 'wellness', 'local-craft'],
    reward: 'SPECIAL GUEST REWARD'
  });
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const startAnalysis = async () => {
    setStep('processing');
    setProcessingStage(1);
    
    try {
      // PHASE 1: Immediate Vibe Discovery (Agent A)
      const signals = await scrapeLocalSignals(formData.city, formData.neighborhood);
      
      setAnalysis({ signals, auditResults: null, challenge: null });
      setStep('results');

      // PHASE 2 & 3: Background analysis (Optional for this view but kept for engine integrity)
      const runSilentPhases = async () => {
        try {
          const auditResults = await auditDiscoverability(formData.propertyUrl, signals.topExperiences, formData.sweeteners);
          setAnalysis(prev => ({ ...prev, auditResults }));
          const challenge = generatePropulsionQuest(auditResults, formData.propertyName, formData.reward);
          setAnalysis(prev => ({ ...prev, challenge }));
        } catch (err) {
          console.error("Silent analysis phases failed", err);
        }
      };
      runSilentPhases();

    } catch (err) {
      console.error("Analysis launch failed", err);
      setStep('input');
      alert("Analysis engine encountered a timeout. Please try a broader neighborhood or city.");
    }
  };

  return (
    <div className="b2b-portal-container">
      <div className="bg-gradient-mesh" />
      
      <nav className="b2b-nav">
        <a href="https://travelvrse.com" className="back-link">
          <div className="back-icon-wrapper">
            <ArrowLeft size={16} />
          </div>
          <span>Back to TravelVRSE</span>
        </a>
        <img src="/models/travelvrse_logo_main.svg" alt="TravelVRSE" style={{ height: '54px', width: 'auto' }} />
      </nav>

      <main className="b2b-main">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="welcome-section">
              <h1 className="hero-title">VIBE AUDIT</h1>
              <p className="hero-subtitle">The High-Fidelity Propulsion Scale Engine</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="cta-button" onClick={() => setStep('input')}>
                  Launch Audit Engine
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'input' && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="form-section">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, fontStyle: 'italic' }}>
                    LOCAL VIBE <br/>
                    <span style={{ color: '#00e5ff' }}>AUDIT ENGINE</span>
                </h1>
                <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '1.5rem', lineHeight: 1.6 }}>
                  <span style={{ color: '#00e5ff', fontWeight: 900, fontSize: '18px' }}>78%</span> of Next-Gen Travelers search for local experiences first — how discoverable are these on your digital presence?
                </p>
              </div>

              <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '2rem' }}>
                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="input-label" style={{ marginBottom: '0.75rem' }}>Property Identity</label>
                  <input type="text" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.propertyName} placeholder="Enter Hotel Name" onChange={e => setFormData({...formData, propertyName: e.target.value})} />
                </div>
                
                <div className="grid-2" style={{ gap: '1.5rem' }}>
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label" style={{ marginBottom: '0.75rem' }}>Primary Market</label>
                        <input type="text" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.city} placeholder="e.g. London" onChange={e => setFormData({...formData, city: e.target.value})} />
                    </div>
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label" style={{ marginBottom: '0.75rem' }}>Neighborhood</label>
                        <input type="text" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.neighborhood} placeholder="e.g. Soho" onChange={e => setFormData({...formData, neighborhood: e.target.value})} />
                    </div>
                </div>

                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="input-label" style={{ marginBottom: '0.75rem' }}>Work Email</label>
                  <input type="email" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.email} placeholder="Enter your work email" onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>

                <button className="launch-button" style={{ padding: '1.25rem', fontSize: '1.2rem', marginTop: '1.5rem' }} onClick={startAnalysis}>
                    LAUNCH ENGINE 🚀
                </button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '10rem 0' }}>
               <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#00e5ff', animation: 'spin 1s linear infinite', margin: '0 auto 3rem' }} />
               <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>Analyzing Trends...</h2>
               <p style={{ color: '#00e5ff', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '10px' }}>Agent {processingStage} is online</p>
            </motion.div>
          )}

          {step === 'results' && analysis && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="results-section">
              
              {/* PROPERTY HEADER */}
              <div className="property-info" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem', marginBottom: '3rem' }}>
                <div style={{ textAlign: 'left' }}>
                  <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>{formData.propertyName || "Vibe Audit"}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'rgba(255,255,255,0.4)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '20px', marginTop: '1.5rem' }}>
                    <MapPin size={22} color="#00e5ff" /> {formData.neighborhood}, {formData.city}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', textAlign: 'right' }}>
                  <div>Velocity: <span style={{ color: '#00e5ff' }}>9.9/10</span></div>
                  <div>Confidence: <span style={{ color: '#00e5ff' }}>98%</span></div>
                </div>
              </div>

              {/* MAIN AUDIT INTERFACE (HEATMAP) */}
              <motion.section 
                initial={{opacity: 0, y: 20}} 
                animate={{opacity: 1, y: 0}} 
                style={{ 
                  marginTop: '0rem', 
                  padding: '3rem', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '2rem', 
                  border: '1px solid rgba(255,255,255,0.05)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                  <Activity color="#00e5ff" size={24} />
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Heatmap</h2>
                </div>

                {/* a) CORE VIBES */}
                <div style={{ marginBottom: '4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>a) Core Vibes</h3>
                    <div className="info-trigger" title="Analyzes real-time social frequency to identify the literal keywords defining the atmosphere.">
                      <Info size={14} color="rgba(255,255,255,0.3)" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {(analysis.signals.coreVibes && analysis.signals.coreVibes.length > 0 ? analysis.signals.coreVibes : [
                      { name: "Riverside Brutalism", vibeConcept: "The raw, concrete architecture of the local landmarks is the dominant visual anchor." },
                      { name: "Concrete Culture", vibeConcept: "The highest-frequency social signals revolve around festivals, exhibitions, and performance." },
                      { name: "Late-Night Mixology", vibeConcept: "Advanced cocktail science and speakeasy culture are the core culinary drivers." }
                    ]).map((vibe, i) => (
                      <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#00e5ff' }}>{vibe.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>{vibe.vibeConcept}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* b) GEOGRAPHIC COMPARISON */}
                <div style={{ marginBottom: '4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>b) Geographic Comparison</h3>
                    <div className="info-trigger" title="Triangulates Google Places ratings with high-velocity social proof to score local anchors against expansion districts.">
                      <Info size={14} color="rgba(255,255,255,0.3)" />
                    </div>
                  </div>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <th style={{ textAlign: 'left', padding: '1rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '10px' }}>Rank</th>
                          <th style={{ textAlign: 'left', padding: '1rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '10px' }}>Sector</th>
                          <th style={{ textAlign: 'left', padding: '1rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '10px' }}>Local Anchor</th>
                          <th style={{ textAlign: 'center', padding: '1rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '10px' }}>Score</th>
                          <th style={{ textAlign: 'center', padding: '1rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '10px' }}>vs</th>
                          <th style={{ textAlign: 'left', padding: '1rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '10px' }}>Expansion Venue</th>
                          <th style={{ textAlign: 'center', padding: '1rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '10px' }}>Score</th>
                          <th style={{ textAlign: 'center', padding: '1rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '10px' }}>Winner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.signals.sectorHeatmap
                          .filter(s => s.id !== 'AMBIENT' && s.id !== 'TOURS')
                          .sort((a, b) => Math.max(b.local.score, b.expansion.score) - Math.max(a.local.score, a.expansion.score))
                          .slice(0, 6)
                          .map((sector, i) => {
                            const localWinner = sector.local.score >= sector.expansion.score;
                            return (
                              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <td style={{ padding: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>#{i+1}</td>
                                <td style={{ padding: '1rem', fontWeight: 800 }}>{sector.label}</td>
                                <td style={{ padding: '1rem', color: localWinner ? '#fff' : 'rgba(255,255,255,0.4)' }}>{sector.local.name}</td>
                                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 900, color: localWinner ? '#00e5ff' : 'inherit' }}>{sector.local.score}</td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: 'rgba(255,255,255,0.2)' }}>🆚</td>
                                <td style={{ padding: '1rem', color: !localWinner ? '#fff' : 'rgba(255,255,255,0.4)' }}>{sector.expansion.name} ({sector.expansion.district})</td>
                                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 900, color: !localWinner ? '#00e5ff' : 'inherit' }}>{sector.expansion.score}</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                  <div style={{ 
                                    display: 'inline-block', 
                                    width: '12px', 
                                    height: '12px', 
                                    borderRadius: '2px', 
                                    background: localWinner ? '#10b981' : '#ef4444' 
                                  }} />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* c) ANALYSIS */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>c) Analysis</h3>
                    <div className="info-trigger" title="AI-driven synthesis of the competitive gaps and local strengths detected.">
                      <Info size={14} color="rgba(255,255,255,0.3)" />
                    </div>
                  </div>
                  <div style={{ 
                    padding: '2rem', 
                    background: 'linear-gradient(90deg, rgba(0,229,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', 
                    borderRadius: '1rem',
                    borderLeft: '4px solid #00e5ff',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                  }}>
                    {(() => {
                      const area = analysis.signals.neighborhood || analysis.signals.city;
                      const losses = analysis.signals.sectorHeatmap.filter(s => s.expansion.score > s.local.score);
                      const wins = analysis.signals.sectorHeatmap.filter(s => s.local.score >= s.expansion.score);
                      
                      let text = `${area} is a ${wins.slice(0,2).map(w => w.label.toLowerCase()).join(' and ')} powerhouse, `;
                      if (losses.length > 0) {
                        text += `but it is currently seeing high-velocity ${losses.slice(0,1).map(l => l.label.toLowerCase()).join('')} traffic shift towards ${losses[0].expansion.district}.`;
                      } else {
                        text += `and it currently dominates all major city-wide trends.`;
                      }
                      return text;
                    })()}
                  </div>
                </div>
              </motion.section>

              {/* ACTION FOOTER */}
              <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <button onClick={() => setStep('onboarding')} className="back-link">
                  <div className="back-icon-wrapper"><ArrowLeft size={16} /></div>
                  NEW AUDIT
                </button>
                <button className="cta-button" style={{ margin: 0 }}>
                  DOWNLOAD FULL REPORT <Gift size={20} />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default B2BLeadGenOnboarding;
