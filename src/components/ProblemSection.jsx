import React, { useState, useRef, useEffect } from 'react';
import { Target, TrendingUp, EyeOff, Waves, Hotel, Utensils, Wine, Zap, Camera, ArrowRight, X, Play, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProblemSection.css';

const verticals = [
    { icon: <Waves size={16} />, label: 'LUXURY SPAS' },
    { icon: <Hotel size={16} />, label: 'PRIVATE CABANAS' },
    { icon: <Utensils size={16} />, label: 'SIGNATURE DINING' },
    { icon: <Wine size={16} />, label: 'ROOFTOP BARS' },
    { icon: <Zap size={16} />, label: 'BEACH CLUBS' },
    { icon: <Camera size={16} />, label: 'EXCURSIONS' }
];

const ProblemSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.pause();
                } else if (entry.isIntersecting && videoRef.current) {
                    videoRef.current.play().catch(() => {});
                }
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <section className="section-padding" id="solution" style={{ background: '#050b14' }}>
            <div className="container">
                <div className="problem-grid">
                    
                    {/* Visual Column (Left on Desktop, Bottom on Mobile) */}
                    <div className="animate-fade-up visual-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div 
                            className="glass-card" 
                            style={{ 
                                padding: '0', 
                                overflow: 'hidden', 
                                borderRadius: '32px', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                cursor: 'pointer',
                                position: 'relative',
                                containerType: 'inline-size'
                            }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <video 
                                ref={videoRef}
                                src="/models/travelvrsehomepagevideovr2.mp4" 
                                style={{ width: '100%', height: 'auto', display: 'block', opacity: 1 }}
                                muted
                                autoPlay
                                playsInline
                                loop={false}
                                onEnded={(e) => {
                                    e.target.currentTime = 0;
                                    e.target.pause();
                                }}
                                preload="metadata"
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                background: 'linear-gradient(to top, rgba(5,11,20,0.8), transparent 60%)',
                                padding: '60px 20px 20px',
                                textAlign: 'center',
                                transition: 'all 0.4s ease',
                            }}>
                                <h3 className="video-overlay-title" style={{ 
                                    color: 'white', 
                                    fontWeight: '800', 
                                    marginBottom: '20px',
                                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                    maxWidth: '90%',
                                    fontSize: 'clamp(1rem, 5cqi, 2rem)'
                                }}>
                                    78% of Next-Gen travellers research experiences <span className="text-cyan">before they ever look at a room</span>
                                </h3>

                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    background: 'rgba(0, 229, 255, 0.25)',
                                    backdropFilter: 'blur(15px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '3px solid var(--color-cyan-neon)',
                                    boxShadow: '0 0 30px rgba(0, 229, 255, 0.4)',
                                    marginTop: '10px',
                                    transition: 'transform 0.3s ease'
                                }}>
                                    <Play className="text-cyan" size={30} fill="currentColor" style={{ marginLeft: '4px' }} />
                                </div>
                            </div>
                        </div>

                        {/* Works for Every Touchpoint Panel */}
                        <div className="glass-card" style={{ 
                            padding: '1.5rem', 
                            background: 'linear-gradient(135deg, rgba(5, 11, 20, 0.8) 0%, rgba(0, 229, 255, 0.05) 100%)', 
                            border: '1px solid rgba(0, 229, 255, 0.2)', 
                            borderRadius: '24px',
                            boxShadow: 'inset 0 0 30px rgba(0, 229, 255, 0.05)'
                        }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', color: 'var(--color-cyan-neon)', marginBottom: '15px', textTransform: 'uppercase' }}>
                                Works for Every Touchpoint
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
                                {verticals.map((v, i) => (
                                    <div key={i} style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '8px', 
                                        fontSize: '0.7rem', 
                                        color: 'rgba(255,255,255,0.9)', 
                                        padding: '8px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        <span style={{ color: i % 2 === 0 ? 'var(--color-cyan-neon)' : 'var(--color-gold)' }}>{v.icon}</span>
                                        {v.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link to="/audit" className="btn btn-primary" style={{ marginTop: '30px', padding: '15px 40px', display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}>
                            Audit My Vibe
                        </Link>
                    </div>


                    {/* Text Column (Right on Desktop, Top on Mobile) */}
                    <div className="animate-fade-up delay-1 marketplace-header text-col" style={{ paddingTop: '0' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontWeight: '800', marginBottom: '15px', lineHeight: '1.1' }}>
                                Vibe Conversion <br className="mobile-break" /> <span className="text-gold">Engine</span>
                            </h2>
                            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-gold)', letterSpacing: '1px', lineHeight: '1.5' }}>
                                Travelvrse Vibe Challenges capture travellers in the inspiration stage before they look at OTAs. We pair your experiences with real-time local vibes. Seamlessly capturing guest intent
                            </div>
                            <div style={{ color: 'var(--color-gold)', marginTop: '20px', marginBottom: '20px' }}>
                                <ChevronDown size={24} className="animate-bounce" />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
                            {/* Vertical Path Line */}
                            <div className="path-line" style={{ 
                                position: 'absolute', 
                                left: '24px', 
                                top: '-10px', 
                                bottom: '40px', 
                                width: '2px', 
                                background: 'linear-gradient(to bottom, var(--color-gold), var(--color-cyan-neon))',
                                opacity: 0.3
                            }}></div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--color-cyan-neon)', width: '45px', lineHeight: '1', background: '#050b14' }}>01</div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Engage</h4>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>Travellers explore top 5 local vibes—showcasing your amenities and tours alongside hidden gems</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--color-gold)', width: '45px', lineHeight: '1', background: '#050b14' }}>02</div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Preferences</h4>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>Guests earn digital rewards and a personalised itinerary while you seamlessly capture intent-based preferences</p>
                                </div>
                            </div>
                             <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--color-cyan-neon)', width: '45px', lineHeight: '1', background: '#050b14' }}>03</div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Convert</h4>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>Traveller details, dates, and intent preferences stream directly to your CRM for direct revenue offers</p>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

            {/* Video Modal Overlay */}
            {isModalOpen && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(5, 11, 20, 0.95)', 
                        backdropFilter: 'blur(20px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px'
                    }}
                    onClick={() => setIsModalOpen(false)}
                >
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                        style={{ 
                            position: 'absolute', 
                            top: '40px', 
                            right: '40px', 
                            background: 'rgba(255,255,255,0.1)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer',
                            zIndex: 10000
                        }}
                    >
                        <X size={24} />
                    </button>
                    
                    <div 
                        style={{ 
                            width: '100%', 
                            maxWidth: '1200px', 
                            borderRadius: '32px', 
                            overflow: 'hidden',
                            boxShadow: '0 0 100px rgba(0, 229, 255, 0.2)',
                            border: '1px solid rgba(0, 229, 255, 0.3)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video 
                            src="/models/travelvrsehomepagevideovr2.mp4" 
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                            controls
                            autoPlay
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProblemSection;

