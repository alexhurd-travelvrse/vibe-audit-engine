import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <Helmet>
                <title>Turn Your Unique Experience into Bookings | AtmosVibe</title>
                <meta name="description" content="Turn Your Unique Experience into Bookings. Match travellers' dreams about your destination with your verified reality" />
            </Helmet>

            <div className="hero-bg-container">
                <video 
                    src="/models/camera_moving.mp4" 
                    className="hero-video"
                    autoPlay 
                    muted 
                    playsInline 
                    loop 
                />
                <div className="hero-overlay" />
            </div>

            <div className="container hero-content">
                <div className="hero-header-group animate-fade-up">
                    <Link to="/partner" className="hero-executive-badge" title="Explore the AtmosVibe Beta Partner Cohort">
                        <span className="badge-status-dot"></span>
                        <span className="badge-tag">AI READY</span>
                        <span className="badge-divider"></span>
                        <span className="badge-text">VIBE SIGNATURES FOR HOTELS, CRUISES &amp; TOURS</span>
                        <span className="badge-beta-pill">BETA</span>
                    </Link>

                    <h1 className="hero-headline">
                        Turn Your Unique Experience into Bookings
                    </h1>

                    <p className="hero-subheadline">
                        Match travellers' dreams about your destination with your verified reality
                    </p>
                </div>

                {/* Phased Entry Call to Action: Reveals smoothly after initial load */}
                <div className="hero-action-container hero-phased-entry">
                    <Link to="/audit" className="hero-search-btn" title="Run My Free Vibe Snapshot">
                        <span>Run My Free Vibe Snapshot</span>
                        <ArrowRight size={18} />
                    </Link>

                    {/* 1-Tap Canned Conference Demo: Sea Containers London (Zero Latency, No Email Gate) */}
                    <div className="hero-instant-demo-bar">
                        <span className="hero-demo-label">
                            <Sparkles size={12} style={{ color: '#ffd700', flexShrink: 0 }} />
                            <span>Instant Live Demo:</span>
                        </span>
                        <div className="hero-demo-pills">
                            <Link to="/audit?demo=sea-containers-london" className="hero-demo-pill hero-demo-pill-bcn" title="Open Instant Pre-Audited Demo: Sea Containers London">
                                <span>⚡ Sea Containers London (South Bank)</span>
                                <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div style={{ width: '4px', height: '60px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), transparent)', borderRadius: '4px' }}></div>
            </div>
        </section>
    );
};

export default Hero;
