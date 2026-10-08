import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, TrendingUp, Users, ArrowRight, Sparkles, CheckCircle2, Camera, Music, Compass, Send, Hotel, Award } from 'lucide-react';

const PartnerPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        
        try {
            const response = await fetch("https://formspree.io/f/xaqlrjor", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("Something went wrong. Please try again");
            }
        } catch (error) {
            alert("Connection error. Please try again later");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className="section-padding" style={{ background: 'radial-gradient(ellipse at top, #0a1b33 0%, #050b14 70%)', minHeight: '85vh', padding: '6rem 0 5rem' }}>
                <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <Helmet>
                        <title>Beta Hotel Partner Program | AtmosVibe</title>
                        <meta name="description" content="AtmosVibe is in beta and looking for 5 partner hotels to help co-develop our experience marketing platform at no cost for 3 months" />
                    </Helmet>

                    {/* Top Beta Status Ribbon */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(255, 215, 0, 0.12) 100%)',
                        border: '1px solid rgba(0, 229, 255, 0.35)',
                        borderRadius: '50px',
                        padding: '6px 20px',
                        marginBottom: '2rem'
                    }}>
                        <Sparkles size={14} color="#00e5ff" />
                        <span style={{ fontSize: '11.5px', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                            EXCLUSIVE BETA COHORT • 5 HOTEL PARTNER SLOTS
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '50px', alignItems: 'flex-start' }}>
                        {/* Left Column: Context, Value Proposition & Beta Offering */}
                        <div className="animate-fade-up">
                            <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.25rem', lineHeight: '1.15', color: '#ffffff', letterSpacing: '-0.5px' }}>
                                Co-Develop the Future of Hotel Experience Marketing with <span className="text-gold-gradient">AtmosVibe</span>
                            </h1>

                            <div style={{
                                background: 'rgba(255, 215, 0, 0.08)',
                                borderLeft: '4px solid #ffd700',
                                padding: '1.25rem 1.5rem',
                                borderRadius: '0 16px 16px 0',
                                marginBottom: '2.5rem'
                            }}>
                                <p style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
                                    AtmosVibe is currently in beta and we are looking for 5 hotels to help develop the service at no cost for 3 months
                                </p>
                            </div>

                            <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                                Next-Gen travelers book local experiences before a hotel room. We use your Vibe Signature to position your property as the natural gateway to your neighbourhood, turning overlooked atmospheric spaces into high-converting visual assets across direct and OTA channels.
                            </p>

                            {/* What You Receive At Zero Cost */}
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: '#00e5ff', letterSpacing: '1px', marginBottom: '1.25rem' }}>
                                What Selected Beta Partners Receive (100% Free for 3 Months)
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '3rem' }}>
                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 229, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Camera size={20} color="#00e5ff" />
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 4px 0' }}>
                                            Full 5-Photo Visual Resequencing &amp; Gap Scope
                                        </h4>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                                            Complete photo audit for Booking.com and direct channels, plus full architectural framing and photometric specs for high-impact missing assets
                                        </p>
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 215, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Music size={20} color="#ffd700" />
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 4px 0' }}>
                                            Bespoke Vibe Signature &amp; Acoustic DNA Synthesis
                                        </h4>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                                            Proprietary atmospheric profiling mapped to local search demand and integrated with curated acoustic soundscapes
                                        </p>
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Compass size={20} color="#10b981" />
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 4px 0' }}>
                                            Local Gateway Storytelling &amp; Copy Blueprint
                                        </h4>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                                            High-converting copy rewrites and neighbourhood venue alignment to capture authentic lifestyle traveler demand
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* What We Ask */}
                            <div style={{ padding: '1.5rem', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd700', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    <Award size={16} /> Beta Partner Commitment
                                </div>
                                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>
                                    In exchange for 3 months of complimentary access and custom creative direction, we ask for a brief 20-minute bi-weekly feedback session to test recommendations and help us refine the AtmosVibe platform.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Formspree Partner Form */}
                        <div className="glass-card animate-fade-up delay-1" style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(10, 22, 40, 0.9)', border: '1px solid rgba(0, 229, 255, 0.3)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 229, 255, 0.1)' }}>
                            {!submitted ? (
                                <>
                                    <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ 
                                            fontSize: '0.75rem', 
                                            background: '#ffd700', 
                                            color: '#050b14', 
                                            padding: '4px 12px', 
                                            borderRadius: '50px', 
                                            fontWeight: '900',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            FREE 3-MONTH BETA
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '1.9rem', marginBottom: '0.4rem', color: '#ffffff', fontWeight: 900, letterSpacing: '-0.3px' }}>
                                        Apply for Beta Partnership
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '1.75rem', fontSize: '0.92rem', lineHeight: 1.5 }}>
                                        Tell us about your property. We are selecting 5 boutique and lifestyle hotels for the initial cohort
                                    </p>

                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>First Name</label>
                                                <input type="text" name="firstName" placeholder="First Name" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '11px 14px', borderRadius: '10px', color: 'white', fontSize: '14px' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Last Name</label>
                                                <input type="text" name="lastName" placeholder="Last Name" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '11px 14px', borderRadius: '10px', color: 'white', fontSize: '14px' }} />
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Work Email</label>
                                            <input type="email" name="email" placeholder="name@hotel.com" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '11px 14px', borderRadius: '10px', color: 'white', fontSize: '14px' }} />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Hotel / Property Name</label>
                                            <input type="text" name="propertyName" placeholder="e.g. Sea Containers London" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '11px 14px', borderRadius: '10px', color: 'white', fontSize: '14px' }} />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>City &amp; Neighbourhood</label>
                                                <input type="text" name="location" placeholder="e.g. Southwark, London" required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '11px 14px', borderRadius: '10px', color: 'white', fontSize: '14px' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Property Type</label>
                                                <select name="propertyType" required style={{ width: '100%', background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', padding: '11px 14px', borderRadius: '10px', color: 'white', fontSize: '14px' }}>
                                                    <option value="Boutique Hotel">Boutique Hotel</option>
                                                    <option value="Luxury Hotel">Luxury Hotel</option>
                                                    <option value="Design Hostel">Design Hostel</option>
                                                    <option value="Resort / Retreat">Resort / Retreat</option>
                                                    <option value="Independent Property">Independent Property</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Website or Booking.com URL</label>
                                            <input type="text" name="websiteUrl" placeholder="https://..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '11px 14px', borderRadius: '10px', color: 'white', fontSize: '14px' }} />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Note / Why Your Property is a Good Fit</label>
                                            <textarea name="message" rows="3" placeholder="Tell us about your property's character and target guests" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '11px 14px', borderRadius: '10px', color: 'white', fontSize: '14px', resize: 'vertical' }}></textarea>
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={loading} 
                                            style={{ 
                                                marginTop: '6px', 
                                                width: '100%', 
                                                padding: '14px',
                                                background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                                                color: '#050b14',
                                                fontWeight: 900,
                                                fontSize: '1rem',
                                                border: 'none',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                boxShadow: '0 8px 25px rgba(0, 229, 255, 0.3)'
                                            }}
                                        >
                                            <Sparkles size={18} />
                                            {loading ? 'Submitting Application...' : 'Apply for Free 3-Month Beta Cohort'}
                                            <ArrowRight size={18} />
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                                    <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                        <CheckCircle2 size={38} color="#10b981" />
                                    </div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff', fontWeight: 900 }}>
                                        Beta Application Received
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto' }}>
                                        Thank you for applying. We are reviewing properties for our 5-hotel beta cohort and will reach out directly within 24 hours
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Layout>
    );
};

export default PartnerPage;
