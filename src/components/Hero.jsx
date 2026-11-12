import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <Helmet>
                <title>Turn Your Vibe &amp; Experiences into Bookings | AtmosVibe</title>
                <meta name="description" content="Turn Your Vibe &amp; Experiences into Bookings. Showcase your vibe, experiences and connection to your local destination across OTAs, web, social and AI search." />
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
                        Turn Your Vibe &amp; Experiences into Bookings
                    </h1>

                    <p className="hero-subheadline">
                        Showcase your vibe, experiences and connection to your local destination across OTAs, web, social and AI search
                    </p>
                </div>

                {/* Phased Entry Call to Action: Reveals smoothly after initial load */}
                <div className="hero-action-container hero-phased-entry">
                    <Link to="/audit" className="hero-search-btn" title="Run My Free Vibe Snapshot">
                        <span>Run My Free Vibe Snapshot</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            <div className="scroll-indicator">
                <div style={{ width: '4px', height: '60px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), transparent)', borderRadius: '4px' }}></div>
            </div>
        </section>
    );
};

export default Hero;
