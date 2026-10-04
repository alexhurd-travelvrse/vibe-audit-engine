import React, { useState } from 'react';
import { ArrowRight, Sparkles, Building2, Mail, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { validateWorkEmail, isLocalhostEnvironment } from '../utils/workEmailValidator';
import './Hero.css';

const getPropertyDisplayTitle = (input) => {
    if (!input) return '';
    const trimmed = input.trim();
    if (trimmed.includes('sea-containers')) return 'Sea Containers London';
    if (trimmed.includes('plymouth')) return 'The Plymouth Miami Beach';
    if (trimmed.includes('25hours')) return '25hours Hotel Copenhagen';
    const match = trimmed.match(/booking\.com\/hotel\/([a-z]{2})\/([a-zA-Z0-9-_]+)/i);
    if (match) {
        const slug = match[2];
        const title = slug
            .replace(/-/g, ' ')
            .replace(/\b(the|hotel|resort|spa|suites|and|&)\b/gi, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\b\w/g, c => c.toUpperCase());
        return title || slug;
    }
    const cleanId = trimmed.replace(/[^\d]/g, '');
    if (cleanId && cleanId.length >= 5) {
        return `Booking.com Property #${cleanId}`;
    }
    return trimmed;
};

const Hero = () => {
    const [step, setStep] = useState(1);
    const [otaUrl, setOtaUrl] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [inputError, setInputError] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const navigate = useNavigate();

    const isLocal = isLocalhostEnvironment();

    const handleProceedToStep2 = (e) => {
        if (e) e.preventDefault();
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
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (honeypot) {
            console.warn('[Bot Detector] Honeypot triggered.');
            return;
        }

        const trimmedUrl = otaUrl.trim();
        if (!trimmedUrl) {
            setStep(1);
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
        setStep(2);
    };

    return (
        <section className="hero-section">
            <Helmet>
                <title>Turn Atmosphere into Bookings | Optimise Your Hotel OTA Photos | AtmosVibe</title>
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
                        <span>ATMOSVIBE - AI READY VIBE SIGNATURES FOR HOTELS &amp; TRAVEL BRANDS</span>
                    </div>

                    <h1 className="hero-headline">
                        <span className="hero-headline-primary">Turn Atmosphere into Bookings</span>
                    </h1>

                    <p className="hero-subheadline">
                        Next-gen travelers don’t book features—they book a vibe. AtmosVibe creates your unique Vibe Signature unlocking content that makes you stand out across all channels
                    </p>

                    <div className="hero-action-kicker">
                        <span className="kicker-gradient">Start by Optimising Your OTA Photos</span>
                    </div>
                </div>

                {/* The Action Box (Sequenced 2-Step Progressive Disclosure) */}
                <div className="hero-action-box animate-fade-up">
                    {step === 1 ? (
                        <form onSubmit={handleProceedToStep2} className="action-box-form">
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

                            <div className="action-step1-container">
                                <div className={`action-input-wrapper ${inputError ? 'action-input-error' : ''}`}>
                                    <Building2 className="action-input-icon" size={19} />
                                    <input 
                                        type="text"
                                        className="action-input-field"
                                        placeholder="Hotel Name or Booking.com URL"
                                        value={otaUrl}
                                        onChange={(e) => {
                                            setOtaUrl(e.target.value);
                                            if (inputError) setInputError('');
                                        }}
                                        autoFocus
                                    />
                                </div>

                                <button type="submit" className="action-submit-btn action-step1-btn">
                                    <span>Get Started</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Error Message Alert */}
                            {inputError && (
                                <div className="action-box-error-badge animate-fade-in">
                                    <AlertCircle size={16} />
                                    <span>{inputError}</span>
                                </div>
                            )}
                        </form>
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

                            {/* Step 2 Verified Property Confirmation Pill */}
                            <div className="step2-property-pill">
                                <div className="property-pill-left">
                                    <div className="property-pill-status">
                                        <span className="pill-status-dot"></span>
                                        <span className="pill-status-label">Property Selected</span>
                                    </div>
                                    <div className="property-pill-title">
                                        <Building2 size={14} className="text-cyan" />
                                        <span>{getPropertyDisplayTitle(otaUrl)}</span>
                                    </div>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => { setStep(1); setInputError(''); setEmailError(''); }} 
                                    className="property-pill-change-btn"
                                    title="Change property URL"
                                >
                                    Change
                                </button>
                            </div>

                            {/* Step 2 Work Email Input & Final CTA */}
                            <div className="action-step2-input-group">
                                <div className={`action-input-wrapper ${emailError ? 'action-input-error' : ''}`}>
                                    <Mail className="action-input-icon" size={19} />
                                    <input 
                                        type="email"
                                        className="action-input-field"
                                        placeholder={isLocal ? "Corporate Work Email (Optional in Local Dev)" : "Corporate Work Email (name@hotel.com)"}
                                        value={workEmail}
                                        onChange={(e) => {
                                            setWorkEmail(e.target.value);
                                            if (emailError) setEmailError('');
                                        }}
                                        autoFocus
                                    />
                                </div>

                                {emailError && (
                                    <div className="action-box-error-badge animate-fade-in">
                                        <AlertCircle size={16} />
                                        <span>{emailError}</span>
                                    </div>
                                )}

                                <button type="submit" className="action-submit-btn">
                                    <span>Reorder Photos &amp; Unlock Vibe Signature</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Micro-Consent Disclaimer */}
                            <div className="hero-micro-consent">
                                <p>
                                    🔒 By clicking <strong>Reorder Photos &amp; Unlock Vibe Signature</strong>, you agree to our{' '}
                                    <Link to="/terms">Terms &amp; Conditions</Link>{' '}
                                    and acknowledge our{' '}
                                    <Link to="/privacy">Privacy Policy</Link>
                                </p>
                            </div>
                        </form>
                    )}

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
