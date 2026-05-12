import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Send, Star, MapPin, TrendingUp, Search, Globe, Zap, CheckCircle2, BarChart3, ExternalLink, Gift, RefreshCw, Activity } from 'lucide-react';
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
    city: '',
    neighborhood: '',
    sweeteners: ['cocktails', 'wellness', 'local-craft'],
    reward: 'SPECIAL GUEST REWARD'
  });
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('trends');

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const startAnalysis = async () => {
    setStep('processing');
    setProcessingStage(1);
    
    try {
      // PHASE 1: Immediate Vibe Discovery (Agent A)
      const signals = await scrapeLocalSignals(formData.city, formData.neighborhood);
      
      // We have Phase 1, so show the results screen immediately!
      setAnalysis({ signals, auditResults: null, challenge: null });
      setStep('results');
      setActiveTab('trends');

      // PHASE 2: Silent Reach Analysis (Agent B) in background
      // No need to await here if we want to update the UI as it finishes
      const runSilentPhases = async () => {
        try {
          const auditResults = await auditDiscoverability(formData.propertyUrl, signals.topExperiences, formData.sweeteners);
          setAnalysis(prev => ({ ...prev, auditResults }));

          // PHASE 3: Virtual Roadmap (Agent C)
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

  const downloadManifest = () => {
    const manifest = {
      client_metadata: {
        hotel_name: formData.propertyName,
        property_url: formData.propertyUrl,
        destination: formData.city,
        branding: { primary_color: "#00F2FF", reward_label: formData.reward }
      },
      challenge_configuration: analysis.challenge,
      generated_at: new Date().toISOString(),
      creator: "TravelVRSE Scale Engine v4.0"
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manifest_${formData.propertyName.toLowerCase().replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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


              <div className="property-info" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem', marginBottom: '3rem' }}>
                <div style={{ textAlign: 'left' }}>
                  <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>{formData.propertyName}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'rgba(255,255,255,0.4)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '20px', marginTop: '1.5rem' }}>
                    <MapPin size={22} color="#00e5ff" /> {formData.neighborhood}, {formData.city}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '5rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => setActiveTab('trends')} 
                  style={{ background: 'transparent', border: 'none', color: activeTab === 'trends' ? '#00e5ff' : 'rgba(255,255,255,0.4)', paddingBottom: '1rem', borderBottom: activeTab === 'trends' ? '2px solid #00e5ff' : '2px solid transparent', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s' }}>
                  1. Market Trends
                </button>
                <button 
                  onClick={() => setActiveTab('reach')} 
                  style={{ background: 'transparent', border: 'none', color: activeTab === 'reach' ? '#ec4899' : 'rgba(255,255,255,0.4)', paddingBottom: '1rem', borderBottom: activeTab === 'reach' ? '2px solid #ec4899' : '2px solid transparent', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s' }}>
                  2. Your Reach
                </button>
                <button 
                  onClick={() => setActiveTab('roadmap')} 
                  style={{ background: 'transparent', border: 'none', color: activeTab === 'roadmap' ? '#B5942D' : 'rgba(255,255,255,0.4)', paddingBottom: '1rem', borderBottom: activeTab === 'roadmap' ? '2px solid #B5942D' : '2px solid transparent', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s' }}>
                  3. Virtual Roadmap
                </button>
              </div>

              {activeTab === 'trends' && (
                <motion.section initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ width: '50px', height: '50px', borderRadius: '1rem', background: 'rgba(0,229,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,229,255,0.2)' }}>
                      <TrendingUp color="#00e5ff" size={24} />
                   </div>
                    <div style={{ textAlign: 'left' }}>
                       <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', marginBottom: '0.5rem' }}>Trending Experiences</h2>
                       <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.3em' }}>High-Demand Market Signals</p>
                    </div>
                </div>
                
                <div className="signals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  {analysis?.signals?.topExperiences?.map((expObj, i) => (
                    <div key={i} className="signal-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                       <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', background: 'rgba(0,229,255,0.1)', borderBottomLeftRadius: '1rem', fontSize: '14px', fontWeight: 900, color: '#00e5ff' }}>
                          {expObj.score}%
                       </div>
                       
                        <div style={{ textAlign: 'left' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                             <span style={{ fontSize: '11px', fontWeight: 900, color: '#B5942D', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
                                {typeof expObj.category === 'string' ? expObj.category : expObj.category?.label || "Urban Exploration"}
                             </span>
                             <div style={{ textAlign: 'right' }}>
                               <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Source</div>
                               <div style={{ fontSize: '11px', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase' }}>{expObj.source}</div>
                             </div>
                           </div>
                           <h4 className="signal-name" style={{ fontSize: '1.25rem', fontWeight: 900, margin: '0.5rem 0', lineHeight: 1.2, color: '#fff' }}>
                              {expObj.name}
                           </h4>
                           <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: '0.5rem 0' }}>
                              {expObj.vibeConcept}
                           </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginTop: 'auto', background: 'rgba(0,229,255,0.05)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(0,229,255,0.1)' }}>
                          <Activity size={14} color="#00e5ff" />
                          <span style={{ fontSize: '11px', fontWeight: 800, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                             {expObj.demandLabel}
                          </span>
                        </div>
                    </div>
                  ))}
                </div>

                {/* VIBE DUEL HEATMAP */}
                <motion.section initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} style={{ marginTop: '4rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <BarChart3 color="#00e5ff" size={24} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vibe Heatmap: Local vs. City Velocity</h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {analysis?.signals?.sectorHeatmap?.map((sector, i) => {
                      const localWinner = sector.local.score >= sector.expansion.score;
                      return (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                          <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>
                            {sector.label}
                          </div>
                          
                          {/* LOCAL BAR */}
                          <div style={{ position: 'relative' }}>
                            <div style={{ height: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(sector.local.score / 120) * 100}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                style={{ 
                                  height: '100%', 
                                  background: localWinner ? '#10b981' : '#334155',
                                  boxShadow: localWinner ? '0 0 15px rgba(16,185,129,0.4)' : 'none'
                                }} 
                              />
                            </div>
                            <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', fontSize: '10px', fontWeight: 900, color: localWinner ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                              LOCAL: {sector.local.name} ({sector.local.score})
                            </div>
                          </div>

                          {/* EXPANSION BAR */}
                          <div style={{ position: 'relative' }}>
                            <div style={{ height: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(sector.expansion.score / 120) * 100}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                style={{ 
                                  height: '100%', 
                                  background: !localWinner ? '#10b981' : '#334155',
                                  boxShadow: !localWinner ? '0 0 15px rgba(16,185,129,0.4)' : 'none'
                                }} 
                              />
                            </div>
                            <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', fontSize: '10px', fontWeight: 900, color: !localWinner ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                              {sector.expansion.district.toUpperCase()}: {sector.expansion.name} ({sector.expansion.score})
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.section>
                </motion.section>
              )}

              {/* Discoverability / Bookability Header with Integrated Score */}
              {activeTab === 'reach' && (
                <motion.section initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} style={{ marginBottom: '6rem', width: '100%' }}>
                  {!analysis.auditResults ? (
                    <div style={{ padding: '5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px dashed rgba(236,72,153,0.3)' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(236,72,153,0.1)', borderTopColor: '#ec4899', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }} />
                       <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#ec4899' }}>Scanning Supply...</h3>
                       <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '1rem' }}>Agent B is auditing your digital footprint against {analysis.signals.topExperiences.length} identified trends</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                          <div style={{ width: '50px', height: '50px', borderRadius: '1rem', background: 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(236,72,153,0.2)' }}>
                              <Search color="#ec4899" size={24} />
                          </div>
                          <div style={{ textAlign: 'left' }}>
                              <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic' }}>YOUR REACH</h2>
                              <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Digital Supply vs Market Demand</p>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '0.5rem' }}>OVERALL SCORE</p>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                              <span style={{ fontSize: '4rem', fontWeight: 900, background: 'linear-gradient(to bottom, #00e5ff, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                                  {Math.round(analysis.auditResults.reduce((acc, r) => acc + r.score, 0) / analysis.auditResults.length)}%
                              </span>
                              <span style={{ color: '#00e5ff', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}>Grade: ALPHA-1</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {analysis?.auditResults?.map((result, i) => (
                          <div key={i} style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ textAlign: 'left' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', color: result.status === 'Strategic Gap' ? '#ec4899' : '#00e5ff', margin: 0 }}>{result.name}</h4>
                                <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Source: {analysis.signals.topExperiences.find(e => e.name === result.name)?.source}</span>
                              </div>
                              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginTop: '1rem', maxWidth: '700px', lineHeight: 1.4 }}>{result.evidence}</p>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                              <div style={{ textAlign: 'center' }}>
                                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Web</p>
                                  <p style={{ fontSize: '2.25rem', fontWeight: 900, color: result.score > 50 ? '#00e5ff' : '#ec4899' }}>{result.score}%</p>
                              </div>
                              <div style={{ textAlign: 'center' }}>
                                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Social</p>
                                  <p style={{ fontSize: '2.25rem', fontWeight: 900, color: result.socialScore > 50 ? '#00e5ff' : '#ec4899' }}>{result.socialScore}%</p>
                              </div>
                              
                              <div style={{ 
                                  marginLeft: '1.5rem', 
                                  padding: '1.5rem', 
                                  borderRadius: '1.5rem', 
                                  background: result.status === 'Digital Match' ? 'rgba(16,185,129,0.1)' : 'rgba(236,72,153,0.1)', 
                                  border: `2px solid ${result.status === 'Digital Match' ? '#10b981' : '#ec4899'}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '120px',
                                  height: '120px'
                              }}>
                                  {result.status === 'Digital Match' ? (
                                      <div style={{ textAlign: 'center' }}>
                                          <CheckCircle2 color="#10b981" size={48} />
                                          <p style={{ fontSize: '9px', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', marginTop: '0.5rem' }}>MATCH</p>
                                      </div>
                                  ) : (
                                      <div style={{ textAlign: 'center' }}>
                                          <Zap color="#ec4899" size={48} />
                                          <p style={{ fontSize: '9px', fontWeight: 900, color: '#ec4899', textTransform: 'uppercase', marginTop: '0.5rem' }}>GAP</p>
                                      </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.section>
              )}

              {/* Propulsion Roadmap */}
              {activeTab === 'roadmap' && (
                <motion.section initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} style={{ marginBottom: '8rem', width: '100%' }}>
                  {!analysis.challenge ? (
                    <div style={{ padding: '5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px dashed rgba(181, 148, 45, 0.3)' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(181, 148, 45, 0.1)', borderTopColor: '#B5942D', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }} />
                       <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#B5942D' }}>Synthesizing Roadmap...</h3>
                       <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '1rem' }}>Agent C is generating your proprietary Propulsion Quest</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '1rem', background: 'rgba(112,0,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(112,0,255,0.2)' }}>
                            <Zap color="#7000ff" size={24} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', marginBottom: '0.5rem' }}>YOUR VIRTUAL EXPERIENCES ROADMAP</h2>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Whitelabel Challenge Strategy</p>
                        </div>
                      </div>

                      <div style={{ marginBottom: '3rem', padding: '2.5rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '1.5rem', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#B5942D', marginBottom: '1.5rem' }}>Recommended Rewards Structure</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                          <div>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Core Conversion Offer</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>{analysis.challenge.rewardsStructure?.primary || analysis.challenge.coreReward}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Unlockable Collectibles</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {analysis.challenge.rewardsStructure?.collectibles?.map((c, i) => (
                                  <span key={i} style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '12px', fontWeight: 700 }}>{c}</span>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '3rem', padding: '2.5rem', background: 'rgba(0, 229, 255, 0.05)', borderRadius: '1.5rem', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#00e5ff', marginBottom: '1.5rem' }}>Visual Cornerstone (From Digital Presence)</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.6 }}>We will use existing positive assets from your digital presence as the cornerstone of this immersive experience: <strong style={{color: '#fff'}}>{analysis.challenge.suggestedVisuals?.join(', ')}</strong></p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
                        {analysis?.challenge?.activities?.map((exp, i) => (
                          <div key={i} style={{ padding: '2rem', background: 'rgba(255,255,255,0.04)', borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '2rem', opacity: 0.15 }}>
                              <Gift size={48} color="#7000ff" />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem', color: '#7000ff' }}>{exp.type}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                              <div>
                                <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Strategic Objective</p>
                                <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.5 }}>{exp.action}</p>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <div>
                                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Associated Trend</p>
                                  <p style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>{exp.trend}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Reward Segment</p>
                                  <p style={{ fontSize: '14px', fontWeight: 900, color: '#00e5ff' }}>{exp.reward}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                        <button className="launch-button" style={{ maxWidth: '600px', display: 'flex', alignItems: 'center', gap: '1rem' }} onClick={() => alert("Brief sent to Creator Marketplace!")}>
                          Save Brief & Send to Creator Marketplace <ExternalLink size={24} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.section>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <footer style={{
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        marginTop: '4rem',
        padding: '2rem 3rem',
        maxWidth: '1400px',
        margin: '4rem auto 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{ color: '#8892B0', fontSize: '13px', fontWeight: 500 }}>
          © {new Date().getFullYear()} Travelvrse. All rights reserved. <span style={{ color: '#00e5ff', marginLeft: '1rem', fontWeight: 900 }}>v5.1 - REGIONAL-BRIDGE</span>
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="https://usgrant.travelvrse.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#8892B0', fontSize: '13px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.3s ease' }}
            onMouseEnter={e => e.target.style.color = '#00e5ff'}
            onMouseLeave={e => e.target.style.color = '#8892B0'}>
            Privacy Policy
          </a>
          <span style={{ color: 'rgba(212, 175, 55, 0.4)' }}>|</span>
          <a href="https://usgrant.travelvrse.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#8892B0', fontSize: '13px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.3s ease' }}
            onMouseEnter={e => e.target.style.color = '#00e5ff'}
            onMouseLeave={e => e.target.style.color = '#8892B0'}>
            Terms &amp; Conditions
          </a>
        </div>
      </footer>
    </div>
  );
};

export default B2BLeadGenOnboarding;
