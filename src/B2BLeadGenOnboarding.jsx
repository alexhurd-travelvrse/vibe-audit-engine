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
    instagramUrl: '',
    city: 'Copenhagen',
    neighborhood: 'Indre By',
    sweeteners: ['cocktails', 'wellness', 'local-craft'],
    reward: 'SPECIAL GUEST REWARD'
  });
  const [analysis, setAnalysis] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(1);

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
      setCurrentPhase(1);

    } catch (err) {
      console.error("Analysis launch failed", err);
      setStep('input');
      alert("Analysis engine encountered a timeout. Please try a broader neighborhood or city.");
    }
  };

  const runPhase2 = async () => {
    setCurrentPhase(2);
    try {
      const auditResults = await auditDiscoverability(formData.propertyName, formData.city, analysis.signals.categories, formData.propertyUrl, formData.instagramUrl);
      setAnalysis(prev => ({ ...prev, auditResults }));
      const challenge = generatePropulsionQuest(auditResults, formData.propertyName, formData.reward);
      setAnalysis(prev => ({ ...prev, challenge }));
    } catch (err) {
      console.error("Phase 2 analysis failed", err);
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
                        <label className="input-label" style={{ marginBottom: '0.75rem' }}>Website URL</label>
                        <input type="url" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.propertyUrl} placeholder="https://..." onChange={e => setFormData({...formData, propertyUrl: e.target.value})} />
                    </div>
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label" style={{ marginBottom: '0.75rem' }}>Instagram URL</label>
                        <input type="url" className="form-input" style={{ fontSize: '1.1rem', padding: '1rem 1.5rem' }} value={formData.instagramUrl} placeholder="https://instagram.com/..." onChange={e => setFormData({...formData, instagramUrl: e.target.value})} />
                    </div>
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
              </div>

              {/* FLIPPED FUNNEL AUDIT INTERFACE */}
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
                  <Globe color="#00e5ff" size={24} />
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Top 6 Vibe Categories</h2>
                </div>

                {Object.entries(analysis.signals.categories || {}).map(([categoryName, data], index) => {
                  const { Top3Vibes, TopLocalVenue, ExtendedRadiusSearch, syntheticIntent } = data;
                  
                  return (
                    <div key={categoryName} style={{ marginBottom: '5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '2px' }}>
                        {categoryName}
                      </h3>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                        {/* LEFT COLUMN: VIBES & INTENT */}
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                            Top Subcultures (Gemini AI)
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                            {Top3Vibes?.map((vibe, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: i === 0 ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: i === 0 ? '#00e5ff' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: i === 0 ? '#000' : '#fff' }}>
                                  {vibe.rank}
                                </div>
                                <div>
                                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: i === 0 ? '#00e5ff' : '#fff' }}>{vibe.vibeName}</div>
                                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Trend: {vibe.growthTrend}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {syntheticIntent?.frequentHumanQueries && (
                             <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                                  Agentic Search Telemetry
                                </h4>
                                <div style={{ padding: '1.5rem', background: 'rgba(0, 229, 255, 0.05)', borderLeft: '4px solid #00e5ff', borderRadius: '0 1rem 1rem 0' }}>
                                  <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                                    "{Array.isArray(syntheticIntent.frequentHumanQueries) ? syntheticIntent.frequentHumanQueries[0] : syntheticIntent.frequentHumanQueries}"
                                  </p>
                                </div>
                             </div>
                          )}
                        </div>

                        {/* RIGHT COLUMN: HYPER-LOCAL VENUE & EXTENDED RADIUS */}
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                            Hyper-Local Reality Check
                          </h4>
                          
                          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Top {analysis.signals.neighborhood} Venue</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>{TopLocalVenue?.name}</div>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                <Star size={16} color="#FFD700" /> {TopLocalVenue?.googlePlacesScore} ({TopLocalVenue?.reviewCount} reviews)
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                <MapPin size={16} color="#00e5ff" /> {TopLocalVenue?.distanceFromHotelKm}km away
                              </div>
                            </div>
                          </div>

                          {/* HYPE SCORECARD */}
                          <div style={{ padding: '1.5rem', background: 'rgba(138, 43, 226, 0.05)', borderRadius: '1rem', border: '1px solid rgba(138, 43, 226, 0.3)', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#b28dff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Validation Layer</div>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Social (TikTok/IG)</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: TopLocalVenue?.socialVelocity === 'Viral High Velocity' ? '#FF3E6C' : '#00e5ff' }}>
                                  {TopLocalVenue?.socialVelocity || 'N/A'}
                                </div>
                              </div>
                              <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }}></div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Editorial (TimeOut/etc)</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: TopLocalVenue?.editorialMentions > 0 ? '#10b981' : '#fff' }}>
                                  {TopLocalVenue?.editorialMentions || 0} Mentions
                                </div>
                              </div>
                            </div>
                          </div>



                        </div>
                      </div>
                    
                    </div>
                  );
                })}

                {/* SECTION A.5: Launch Phase 2 Button */}
                {currentPhase === 1 && (
                    <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>
                       <button className="launch-button" style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }} onClick={runPhase2}>
                           Launch Phase 2: Deep Digital Audit <ChevronRight size={24} />
                       </button>
                    </div>
                )}

                {/* SECTION B: Your Vibe Audit */}
                {currentPhase >= 2 && (
                <div style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Search color="#ec4899" size={24} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Vibe Audit</h2>
                  </div>
                  
                  {!analysis.auditResults ? (
                     <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#ec4899', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>Agent B is hunting...</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Scanning {formData.propertyName}'s website and Instagram footprint against local trends.</p>
                     </div>
                  ) : (
                     <div>
                        {/* Summary Scorecard */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                           <div style={{ padding: '2rem', background: 'rgba(236, 72, 153, 0.05)', borderRadius: '1rem', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                              <div style={{ fontSize: '0.8rem', color: '#ec4899', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Onsite Vibe Score</div>
                              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff' }}>{analysis.auditResults.avgOnsiteScore}%</div>
                              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Does your website offer the vibe?</div>
                           </div>
                           <div style={{ padding: '2rem', background: 'rgba(0, 229, 255, 0.05)', borderRadius: '1rem', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
                              <div style={{ fontSize: '0.8rem', color: '#00e5ff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Gateway Score</div>
                              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff' }}>{analysis.auditResults.avgLocalGatewayScore}%</div>
                              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Do you promote the top local venues?</div>
                           </div>
                           <div style={{ padding: '2rem', background: 'rgba(138, 43, 226, 0.05)', borderRadius: '1rem', border: '1px solid rgba(138, 43, 226, 0.2)' }}>
                              <div style={{ fontSize: '0.8rem', color: '#b28dff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Instagram Social Score</div>
                              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff' }}>{analysis.auditResults.avgSocialScore}%</div>
                              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Are you posting about these vibes?</div>
                           </div>
                        </div>
                        
                        {/* Per-Category Diagnostics */}
                        {Object.entries(analysis.auditResults.categoryAudits || {}).map(([catName, audit]) => (
                           <div key={catName} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', marginBottom: '1rem', borderLeft: (audit.onsiteMark === 'Pass' || audit.gatewayMark === 'Pass' || audit.socialMark === 'Pass') ? '4px solid #10b981' : '4px solid #ef4444' }}>
                              <div style={{ marginBottom: '1.5rem' }}>
                                 <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>{catName}: {audit.vibeName}</h4>
                              </div>
                              
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                                 {/* Onsite Scorecard */}
                                 <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(236, 72, 153, 0.1)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                       <span style={{ fontSize: '0.8rem', color: '#ec4899', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Onsite Check</span>
                                       <span style={{ fontSize: '0.9rem', fontWeight: 900, color: audit.onsiteMark === 'Pass' ? '#10b981' : '#ef4444' }}>{audit.onsiteMark}</span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.25rem' }}>
                                       Keywords Match: <strong>{audit.keywordsMatchCount}</strong>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                       {audit.foundKeywords && audit.foundKeywords.length > 0 ? 
                                          `Identified: ${audit.foundKeywords.join(', ')}` : 
                                          'No keywords identified'}
                                    </div>
                                 </div>

                                 {/* Gateway Scorecard */}
                                 <div style={{ padding: '1rem', background: 'rgba(0, 229, 255, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(0, 229, 255, 0.1)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                       <span style={{ fontSize: '0.8rem', color: '#00e5ff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Gateway Check</span>
                                       <span style={{ fontSize: '0.9rem', fontWeight: 900, color: audit.gatewayMark === 'Pass' ? '#10b981' : '#ef4444' }}>{audit.gatewayMark}</span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.25rem' }}>
                                       Target Venue:
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                       {audit.topVenueName || 'No venue provided'}
                                    </div>
                                 </div>

                                 {/* Instagram Scorecard */}
                                 <div style={{ padding: '1rem', background: 'rgba(138, 43, 226, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(138, 43, 226, 0.1)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                       <span style={{ fontSize: '0.8rem', color: '#b28dff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px' }}>Instagram Check</span>
                                       <span style={{ fontSize: '0.9rem', fontWeight: 900, color: audit.socialMark === 'Pass' ? '#10b981' : '#ef4444' }}>{audit.socialMark}</span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.25rem' }}>
                                       Keywords Match: <strong>{audit.socialMatchCount}</strong>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                       {audit.foundSocialKeywords && audit.foundSocialKeywords.length > 0 ? 
                                          `Identified: ${audit.foundSocialKeywords.join(', ')}` : 
                                          'No keywords identified'}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
                  
                  {/* Launch Phase 3 Button */}
                  {analysis.auditResults && currentPhase === 2 && (
                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                       <button className="launch-button" style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'linear-gradient(45deg, #B5942D, #FFD700)' }} onClick={() => setCurrentPhase(3)}>
                           Reveal Phase 3: TravelVRSE Strategy <ChevronRight size={24} />
                       </button>
                    </div>
                  )}

                </div>
                )}

                {/* SECTION C: Showcase Your Vibe */}
                {currentPhase >= 3 && (
                <div style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Star color="#B5942D" size={24} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Showcase Your Vibe</h2>
                  </div>
                  
                  {!analysis.auditResults ? (
                     <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '1rem', marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>Awaiting Audit Telemetry...</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>The Creator Brief will be generated once Agent B finishes the Vibe Gap analysis.</p>
                     </div>
                  ) : (
                     <div style={{ marginBottom: '3rem' }}>
                        <div style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(181, 148, 45, 0.1) 0%, rgba(181, 148, 45, 0.02) 100%)', borderRadius: '1rem', border: '1px solid rgba(181, 148, 45, 0.3)', marginBottom: '2rem' }}>
                           <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#B5942D', textTransform: 'uppercase', marginBottom: '1rem' }}>The Solution: TravelVRSE Vibe Campaign</h3>
                           <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                              Based on the gap analysis, we recommend launching a highly-visual TikTok & IG Reels campaign focusing heavily on <strong>{Object.values(analysis.auditResults.categoryAudits || {})[0]?.vibeName || 'Local Culture'}</strong>. 
                           </p>
                           <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem' }}>
                              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>AI Generated Storyboard</div>
                              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                                 <li style={{ marginBottom: '0.5rem' }}>🎬 <strong>Stop 1:</strong> Pre-game at {formData.propertyName} (Showcase onsite alignment)</li>
                                 <li style={{ marginBottom: '0.5rem' }}>🎬 <strong>Stop 2:</strong> Vibe check at {Object.values(analysis.auditResults.categoryAudits || {})[0]?.topVenueName || 'the top local spot'} (Claiming the local gateway)</li>
                                 <li>🎬 <strong>Stop 3:</strong> Call to action linking back to direct booking.</li>
                              </ul>
                           </div>
                        </div>
                        
                        <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}>
                           <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>14 Local Creators</div>
                           <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>in our marketplace match this exact demographic.</div>
                        </div>
                     </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                     <button className="launch-button" style={{ maxWidth: '450px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', fontSize: '1.1rem' }} onClick={() => alert('Forwarding Brief...')}>
                       Forward Brief to Creator Marketplace <ExternalLink size={20} />
                     </button>
                  </div>
                </div>
                )}

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
