import React, { useState } from 'react';
import { ArrowRight, Sparkles, Building2, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';

const Hero = () => {
    const [otaUrl, setOtaUrl] = useState('');
    const [inputError, setInputError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedUrl = otaUrl.trim();
        if (trimmedUrl) {
            navigate(`/audit?bookingUrl=${encodeURIComponent(trimmedUrl)}`);
        } else {
            navigate('/audit');
        }
    };

    return (
        <section className="hero-section">
            <Helmet>
                <title>Turn Atmosphere into Bookings | Optimise Your Hotel OTA Photos | AtmosVibe</title>
                <meta name="description" content="Turn Atmosphere into Bookings. Start by Optimising Your OTA Photos. Next-Gen travelers book local vibe. AtmosVibe matches what makes you unique with local demand. Showcasing you as the gateway to your neighbourhood" />
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
                    <Link to="/partner" className="beta-badge-premium" style={{ textDecoration: 'none', cursor: 'pointer' }} title="Join the AtmosVibe 3-Month Free Beta Cohort">
                        BETA
                    </Link>

                    <div className="hero-eyebrow-badge">
                        <Sparkles size={14} className="text-cyan" />
                        <span>ATMOSVIBE - AI READY VIBE SIGNATURES FOR HOTELS &amp; TRAVEL BRANDS</span>
                    </div>

                    <h1 className="hero-headline">
                        Turn Atmosphere into Bookings
                    </h1>

                    <p className="hero-subheadline">
                        Next-Gen travelers book local vibe. AtmosVibe matches what makes you unique with local demand. Showcasing you as the gateway to your neighbourhood
                    </p>
                </div>

                {/* Phased Entry Search Box: Reveals smoothly a couple of seconds after initial load */}
                <div className="hero-action-container hero-phased-entry">
                    <form onSubmit={handleSubmit} className="hero-search-box">
                        <div className="hero-search-input-wrap">
                            <Building2 className="hero-search-icon" size={20} />
                            <input 
                                type="text"
                                className="hero-search-input"
                                placeholder="Enter Hotel Name or Booking.com URL"
                                value={otaUrl}
                                onChange={(e) => {
                                    setOtaUrl(e.target.value);
                                    if (inputError) setInputError('');
                                }}
                            />
                        </div>
                        <button type="submit" className="hero-search-btn" title="Start by Optimising Your OTA Photos">
                            <span>Start by Optimising Your OTA Photos</span>
                            <ArrowRight size={17} />
                        </button>
                    </form>

                    {inputError && (
                        <div className="hero-search-error animate-fade-in">
                            <AlertCircle size={15} />
                            <span>{inputError}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="scroll-indicator">
                <div style={{ width: '4px', height: '60px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), transparent)', borderRadius: '4px' }}></div>
            </div>
        </section>
    );
};

export default Hero;
