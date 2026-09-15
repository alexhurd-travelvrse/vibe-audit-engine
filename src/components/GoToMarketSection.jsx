import { Compass, BellRing, MapPin, ChevronRight, ArrowRight, Trophy, Share2, Target, TrendingUp, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GoToMarketSection.css';

const JourneyLifecycle = () => {
    return (
        <div className="glass-card" style={{ padding: '2rem 1.75rem', marginTop: '30px', background: 'rgba(17, 34, 64, 0.6)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '24px', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px', color: 'var(--color-gold)', marginBottom: '25px', textTransform: 'uppercase', textAlign: 'center' }}>
                SUPPORTED GUEST JOURNEYS
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-cyan-neon)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
                        <Compass size={22} />
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'white' }}>Pre-Booking</div>
                </div>

                <div style={{ color: 'rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                    <ChevronRight size={18} />
                </div>

                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(255, 215, 0, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-gold)', border: '1px solid rgba(255, 215, 0, 0.25)' }}>
                        <BellRing size={22} />
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'white' }}>Pre-Stay</div>
                </div>

                <div style={{ color: 'rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                    <ChevronRight size={18} />
                </div>

                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-cyan-neon)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
                        <MapPin size={22} />
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'white' }}>During Stay</div>
                </div>
            </div>
        </div>
    );
};

const GoToMarketSection = () => {
    return (
        <section className="section-padding go-to-market-section" id="go-to-market">
            <div className="container">
                <div className="responsive-grid">
                    
                    {/* Text Left */}
                    <div className="animate-fade-up">
                        <h2 className="section-title" style={{ fontWeight: '800', marginBottom: '1.5rem' }}>
                            Go To <span className="text-cyan">Market</span>
                        </h2>
                        
                        <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', lineHeight: '1.6', marginBottom: '20px' }}>
                            Our Vibe Challenges are configurable for different guest journeys and to be set up and promoted by external or internal creators
                        </p>

                        <JourneyLifecycle />

                        <Link to="/audit" className="btn btn-outline" style={{ marginTop: '30px', padding: '12px 25px', borderColor: 'var(--color-cyan-neon)', color: 'var(--color-cyan-neon)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center' }}>
                            Audit My Vibe <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                    {/* Visual Right - Vertical Steps */}
                    <div className="animate-fade-up delay-1">
                        <div style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 24px',
                            background: 'rgba(181, 148, 45, 0.1)',
                            border: '1px solid var(--color-gold)',
                            borderRadius: '100px',
                            marginBottom: '28px',
                            fontSize: '0.9rem',
                            fontWeight: '900',
                            color: 'var(--color-gold)',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            boxShadow: '0 0 20px rgba(181, 148, 45, 0.1)'
                        }}>
                            <Target size={18} />
                            Pre-Booking Example
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {/* Step 1: Goal */}
                            <div className="glass-card journey-step-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
                                <div className="step-icon-wrapper" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                                    <Target size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontWeight: '900', letterSpacing: '2px', marginBottom: '4px', textTransform: 'uppercase' }}>MY GOAL</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1rem', lineHeight: '1.25' }}>Promote spa to target local wellness vibe</div>
                                </div>
                            </div>
 
                            <div className="step-connector-line" style={{ background: 'var(--color-gold)' }}></div>

                            {/* Step 2: Challenge */}
                            <div className="glass-card journey-step-card" style={{ background: 'rgba(255,215,0,0.03)', border: '1.5px solid rgba(255,215,0,0.25)' }}>
                                <div className="step-icon-wrapper" style={{ background: 'rgba(255,215,0,0.1)', color: 'var(--color-gold)' }}>
                                    <Trophy size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: '900', letterSpacing: '2px', marginBottom: '4px', textTransform: 'uppercase' }}>The CHALLENGE</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1rem', lineHeight: '1.25' }}>Try 5 Experiences for $5 Off Treatment</div>
                                </div>
                            </div>

                            <div className="step-connector-line" style={{ background: 'var(--color-cyan-neon)' }}></div>

                            {/* Step 3: Channel */}
                            <div className="glass-card journey-step-card" style={{ background: 'rgba(0, 229, 255, 0.03)', border: '1.5px solid rgba(0, 229, 255, 0.25)' }}>
                                <div className="step-icon-wrapper" style={{ background: 'rgba(0, 229, 255, 0.1)', color: 'var(--color-cyan-neon)' }}>
                                    <Share2 size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-cyan-neon)', fontWeight: '900', letterSpacing: '2px', marginBottom: '4px', textTransform: 'uppercase' }}>THE CHANNEL</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1rem', lineHeight: '1.25' }}>Local wellness focused creator</div>
                                </div>
                            </div>

                            <div className="step-connector-line" style={{ background: 'var(--color-gold)' }}></div>

                            {/* Step 4: Data */}
                            <div className="glass-card journey-step-card" style={{ background: 'rgba(181, 148, 45, 0.03)', border: '1.5px solid rgba(181, 148, 45, 0.25)' }}>
                                <div className="step-icon-wrapper" style={{ background: 'rgba(181, 148, 45, 0.1)', color: 'var(--color-gold)' }}>
                                    <Database size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: '900', letterSpacing: '2px', marginBottom: '4px', textTransform: 'uppercase' }}>THE DATA</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1rem', lineHeight: '1.25' }}>Wellness focused travellers</div>
                                </div>
                            </div>

                            <div className="step-connector-line" style={{ background: 'var(--color-cyan-neon)' }}></div>

                            {/* Step 5: ROI */}
                            <div className="glass-card journey-step-card" style={{ background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(212, 175, 55, 0.08) 100%)', border: '1.5px solid var(--color-cyan-neon)', boxShadow: '0 0 20px rgba(0, 229, 255, 0.15)' }}>
                                <div className="step-icon-wrapper" style={{ background: 'var(--color-cyan-neon)', color: '#050b14', boxShadow: '0 0 15px var(--color-cyan-neon)' }}>
                                    <TrendingUp size={24} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-cyan-neon)', fontWeight: '900', letterSpacing: '2px', marginBottom: '4px', textTransform: 'uppercase' }}>THE ROI</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1rem', lineHeight: '1.25' }}>Combined Room and Spa package</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GoToMarketSection;

