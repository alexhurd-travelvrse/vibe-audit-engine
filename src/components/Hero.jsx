import React, { useState } from 'react';
import { ArrowRight, Sparkles, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';

const Hero = () => {
    const [otaUrl, setOtaUrl] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (honeypot) {
            console.warn('[Bot Detector] Honeypot triggered.');
            return;
        }
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
                <title>AtmosVibe | Vibe Signatures &amp; Visual Intelligence for Hotels</title>
                <meta name="description" content="Turn Atmosphere into Bookings. Start by Optimising Your OTA Photos. Next-gen travelers don’t book features—they book a vibe. AtmosVibe creates your unique Vibe Signature unlocking content that makes you stand out across all channels." />
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
                        <span>ATMOSVIBE // VIBE SIGNATURES FOR HOTELS &amp; TRAVEL BRANDS</span>
                    </div>

                    <h1 className="hero-headline">
                        <span className="hero-headline-primary">Turn Atmosphere into Bookings</span>
                        <span className="hero-headline-gradient">Start by Optimising Your OTA Photos</span>
                    </h1>

                    <p className="hero-subheadline">
                        Next-gen travelers don’t book features—they book a vibe. AtmosVibe creates your unique Vibe Signature unlocking content that makes you stand out across all channels
                    </p>
                </div>

                {/* The Action Box (Frictionless Input) */}
                <div className="hero-action-box animate-fade-up">
                    <form onSubmit={handleSubmit} className="action-box-form">
                        {/* Hidden Honeypot Field for Bot Defense */}
                        <input 
                            type="text" 
                            name="b2b_website_hp" 
                            value={honeypot} 
                            onChange={(e) => setHoneypot(e.target.value)} 
                            style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} 
                            tabIndex={-1} 
                            autoComplete="off" 
                        />
                        <div className="action-input-wrapper">
                            <Camera className="action-input-icon" size={20} />
                            <input 
                                type="text"
                                className="action-input-field"
                                placeholder="Enter Booking.com URL or client Id"
                                value={otaUrl}
                                onChange={(e) => setOtaUrl(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="action-submit-btn">
                            <span>Reorder Photos &amp; Unlock Vibe Signature</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="action-box-samples">
                        <span className="samples-label">Instant Previews:</span>
                        <button type="button" onClick={() => handleQuickTry('https://www.booking.com/hotel/gb/sea-containers-london.html')} className="sample-chip">
                            Sea Containers London
                        </button>
                        <button type="button" onClick={() => handleQuickTry('https://www.booking.com/hotel/us/the-plymouth-miami-beach.html')} className="sample-chip">
                            The Plymouth Miami Beach
                        </button>
                        <button type="button" onClick={() => handleQuickTry('https://www.booking.com/hotel/dk/25hours-indre-by.html')} className="sample-chip">
                            25hours Hotel Copenhagen
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
