import { CheckCircle2, ArrowRight, Camera, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
    return (
        <section className="section-padding how-it-works-section" id="how-it-works">
            <div className="container">
                <div className="responsive-grid-reversed">
                    
                    {/* Visual Left - Expanded Image Stack */}
                    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Image 1: Creator */}
                        <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                            <img src="/assets/hola_grab.png" alt="Creator" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Smartphone size={14} className="text-gold" />
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>Created using Mobile</span>
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {/* Image 2: Sea Containers */}
                            <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                <img src="/models/seacontainers.png" alt="Sea Containers" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-cyan-neon)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Camera size={14} className="text-cyan" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white' }}>Created using Action Camera</span>
                                </div>
                            </div>
                            
                            {/* Image 3: Beach */}
                            <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                <img src="/models/beach.png" alt="Beach" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Zap size={14} className="text-gold" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white' }}>Built from existing 2D photos</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Right */}
                    <div className="animate-fade-up delay-1">
                        <h2 className="section-title" style={{ fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Implementation is <span className="text-gold">friction free</span>
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '40px', marginTop: '30px' }}>
                            {/* Step 1 */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(181, 148, 45, 0.1)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(181, 148, 45, 0.3)', flexShrink: 0 }}>
                                    <Zap size={20} className="text-gold" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Complete a 1 min Vibe Audit</h3>
                                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                                        Match your existing onsite experiences against local trends
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(0, 229, 255, 0.3)', flexShrink: 0 }}>
                                    <CheckCircle2 size={20} className="text-cyan" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Agree creator brief</h3>
                                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                                        We use search/social media data to dynamically recommend the top 5 trending onsite and local experiences
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(181, 148, 45, 0.1)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(181, 148, 45, 0.3)', flexShrink: 0 }}>
                                    <Smartphone size={20} className="text-gold" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Local creators build</h3>
                                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                                        Scanning your property with a mobile phone / action camera and our creator tools
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(0, 229, 255, 0.3)', flexShrink: 0 }}>
                                    <Camera size={20} className="text-cyan" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Market on social media using influencers</h3>
                                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                                        Connect with influencers in our marketplace and/or set up your own internal influencers
                                    </p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(181, 148, 45, 0.1)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(181, 148, 45, 0.3)', flexShrink: 0 }}>
                                    <ArrowRight size={20} className="text-gold" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Drive direct conversion</h3>
                                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                                        Target travellers with offers from your CRM system
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link to="/audit" className="btn btn-primary" style={{ padding: '15px 35px' }}>
                            Audit My Vibe <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
