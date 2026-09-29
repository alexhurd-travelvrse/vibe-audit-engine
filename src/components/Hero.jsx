import React, { useState } from 'react';
import { ArrowRight, Sparkles, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';

const Hero = () => {
    const [otaUrl, setOtaUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = otaUrl.trim();
        if (trimmed) {
            navigate(`/audit?bookingUrl=${encodeURIComponent(trimmed)}`);
        } else {
            navigate('/audit');
        }
    };

    const handleQuickTry = (sample) => {
        navigate(`/audit?bookingUrl=${encodeURIComponent(sample)}`);
    };

    return (
        <section className="hero-section">
            <Helmet>
                <title>Atmosvibe | Vibe Conversion for Hotels &amp; Travel Brands</title>
                <meta name="description" content="Turn Atmosphere into Bookings. Start by fixing your photo sequence. Atmosvibe audits your visual and atmospheric signature." />
            </Helmet>
            <div className="hero-bg-container">
                <video 
                    src="/models/atmosvibe2.mp4" 
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
                    <div className="hero-eyebrow-badge">
                        <Sparkles size={14} className="text-cyan" />
                        <span>ATMOSVIBE // VIBE CONVERSION FOR HOTELS &amp; TRAVEL BRANDS</span>
                    </div>

                    <h1 className="hero-headline">
                        Turn Atmosphere into Bookings.<br />
                        <span className="hero-headline-gradient">Start by fixing your photo sequence.</span>
                    </h1>

                    <p className="hero-subheadline">
                        Next-gen travelers don’t book features—they book a feeling. Atmosvibe audits your property’s visual and atmospheric signature, instantly re-ordering your photos to hook high-intent guests and stop OTA scroll fatigue.
                    </p>
                </div>

                {/* The Action Box (Frictionless Input) */}
                <div className="hero-action-box animate-fade-up">
                    <form onSubmit={handleSubmit} className="action-box-form">
                        <div className="action-input-wrapper">
                            <Camera className="action-input-icon" size={20} />
                            <input 
                                type="text"
                                className="action-input-field"
                                placeholder="Paste Booking.com or OTA listing URL..."
                                value={otaUrl}
                                onChange={(e) => setOtaUrl(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="action-submit-btn">
                            <span>Re-Sequence My Photos &amp; Preview Vibe Score</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="action-box-microcopy">
                        <span className="micro-highlight">Free instant audit</span>
                        <span className="micro-dot">•</span>
                        <span>For Hotels, Hostels, Resorts &amp; Tour Operators</span>
                        <span className="micro-dot">•</span>
                        <span>No sign-up required to preview</span>
                    </div>

                    <div className="action-box-samples">
                        <span className="samples-label">Instant Previews:</span>
                        <button type="button" onClick={() => handleQuickTry('https://www.booking.com/hotel/gb/sea-containers-london.html')} className="sample-chip">
                            Sea Containers London
                        </button>
                        <button type="button" onClick={() => handleQuickTry('https://www.booking.com/hotel/us/the-plymouth-miami-beach.html')} className="sample-chip">
                            The Plymouth Miami Beach
                        </button>
                        <button type="button" onClick={() => handleQuickTry('https://www.booking.com/hotel/us/twoninezeroone-collinsave.html')} className="sample-chip">
                            The Miami Beach EDITION
                        </button>
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
