import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Building2, Mail, AlertCircle, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { validateWorkEmail, isLocalhostEnvironment } from '../utils/workEmailValidator';
import './Hero.css';

const Hero = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [otaUrl, setOtaUrl] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [inputError, setInputError] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const inputRef = useRef(null);
    const emailInputRef = useRef(null);
    const navigate = useNavigate();

    const isLocal = isLocalhostEnvironment();

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (honeypot) {
            console.warn('[Bot Detector] Honeypot triggered.');
            return;
        }

        const trimmedUrl = otaUrl.trim();
        if (!trimmedUrl) {
            setInputError('Please enter your Hotel Name or Booking.com URL');
            return;
        }
        setInputError('');

        const validation = validateWorkEmail(workEmail, { allowEmpty: isLocal });
        if (!validation.isValid) {
            setEmailError(validation.error);
            return;
        }
        setEmailError('');

        const params = new URLSearchParams();
        params.set('bookingUrl', trimmedUrl);
        if (workEmail.trim()) {
            params.set('email', workEmail.trim());
        }
        navigate(`/audit?${params.toString()}`);
    };

    const handleQuickTry = (sample) => {
        setOtaUrl(sample);
        setInputError('');
        setEmailError('');
        setIsExpanded(true);
        setTimeout(() => {
            if (emailInputRef.current) {
                emailInputRef.current.focus();
            }
        }, 50);
    };

    return (
        <section className="hero-section">
            <Helmet>
                <title>Turn Atmosphere into Bookings | Optimise Your Hotel OTA Photos | AtmosVibe</title>
                <meta name="description" content="Turn Atmosphere into Bookings. Start by Optimising Your OTA Photos. Next-Gen travelers don’t book features—they book a vibe. AtmosVibe creates your unique Vibe Signature unlocking content that makes you stand out across all channels." />
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
                        <span>ATMOSVIBE - AI READY VIBE SIGNATURES FOR HOTELS &amp; TRAVEL BRANDS</span>
                    </div>

                    <h1 className="hero-headline">
                        Turn Atmosphere into Bookings
                    </h1>

                    <p className="hero-subheadline">
                        Next-Gen travelers don’t book features—they book a vibe. AtmosVibe creates your unique Vibe Signature unlocking content that makes you stand out across all channels
                    </p>

                    <div className="hero-action-kicker">
                        <span className="kicker-gradient">Start by Optimising Your OTA Photos</span>
                    </div>
                </div>

                {/* The Action Box (Sequenced 2-Step Progressive Disclosure with Morphing Glass Capsule) */}
                {/* The Action Box (Morphing Glass Capsule -> Full Search Box with Email & Terms) */}
                <div className={`hero-action-box ${isExpanded ? 'is-expanded' : 'is-capsule'} animate-fade-up`}>
                    {!isExpanded ? (
                        <div 
                            className="hero-capsule-trigger"
                            onClick={() => setIsExpanded(true)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setIsExpanded(true);
                                }
                            }}
                        >
                            <div className="capsule-trigger-left">
                                <Building2 className="capsule-trigger-icon" size={18} />
                                <span className="capsule-trigger-text">Enter Hotel Name or Booking.com URL</span>
                            </div>
                            <div className="capsule-trigger-cta">
                                <span>Get Started</span>
                                <ArrowRight size={15} />
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="action-box-form animate-fade-in">
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

                            {/* Header row with Title & Close button */}
                            <div className="action-box-header">
                                <div className="action-box-header-title">
                                    <Sparkles size={14} className="text-cyan" />
                                    <span>Optimise Your Hotel OTA Photos</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setIsExpanded(false); setInputError(''); setEmailError(''); }}
                                    className="action-box-close-btn"
                                    title="Close search"
                                    aria-label="Close search"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Field 1: Hotel Name or Booking.com URL */}
                            <div className="action-field-block">
                                <div className={`action-input-wrapper ${inputError ? 'action-input-error' : ''}`}>
                                    <Building2 className="action-input-icon" size={19} />
                                    <input 
                                        ref={inputRef}
                                        type="text"
                                        className="action-input-field"
                                        placeholder="Hotel Name or Booking.com URL"
                                        value={otaUrl}
                                        onChange={(e) => {
                                            setOtaUrl(e.target.value);
                                            if (inputError) setInputError('');
                                        }}
                                    />
                                </div>
                                {inputError && (
                                    <div className="action-box-error-badge animate-fade-in">
                                        <AlertCircle size={16} />
                                        <span>{inputError}</span>
                                    </div>
                                )}
                            </div>

                            {/* Field 2: Corporate Work Email */}
                            <div className="action-field-block">
                                <div className={`action-input-wrapper ${emailError ? 'action-input-error' : ''}`}>
                                    <Mail className="action-input-icon" size={19} />
                                    <input 
                                        ref={emailInputRef}
                                        type="email"
                                        className="action-input-field"
                                        placeholder={isLocal ? "Corporate Work Email (Optional in Local Dev)" : "Corporate Work Email (name@hotel.com)"}
                                        value={workEmail}
                                        onChange={(e) => {
                                            setWorkEmail(e.target.value);
                                            if (emailError) setEmailError('');
                                        }}
                                    />
                                </div>
                                {emailError && (
                                    <div className="action-box-error-badge animate-fade-in">
                                        <AlertCircle size={16} />
                                        <span>{emailError}</span>
                                    </div>
                                )}
                            </div>

                            {/* Submit CTA */}
                            <button type="submit" className="action-submit-btn">
                                <span>Reorder Photos &amp; Unlock Vibe Signature</span>
                                <ArrowRight size={18} />
                            </button>

                            {/* Micro-Consent Disclaimer */}
                            <div className="hero-micro-consent">
                                <p>
                                    🔒 By clicking <strong>Reorder Photos &amp; Unlock Vibe Signature</strong>, you agree to our{' '}
                                    <Link to="/terms">Terms &amp; Conditions</Link>{' '}
                                    and acknowledge our{' '}
                                    <Link to="/privacy">Privacy Policy</Link>
                                </p>
                            </div>

                            {/* Instant Previews inside the expanded box */}
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
                        </form>
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
