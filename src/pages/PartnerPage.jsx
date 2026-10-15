import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, TrendingUp, Users, ArrowRight, Sparkles, CheckCircle2, Camera, Compass, Send, Hotel, Award, Search, MapPin } from 'lucide-react';

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
                        <meta name="description" content="AtmosVibe is in beta and looking for innovative hospitality groups" />
                    </Helmet>

                    {/* Top Beta Status Ribbon */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(10, 18, 30, 0.72)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        borderRadius: '999px',
                        padding: '6px 18px 6px 12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                        marginBottom: '2rem'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.85)', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FFD700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            EXCLUSIVE BETA COHORT
                        </span>
                        <span style={{ width: '1px', height: '12px', background: 'rgba(255, 255, 255, 0.18)', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgba(240, 246, 255, 0.92)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            5 HOTEL PARTNER SLOTS
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '50px', alignItems: 'flex-start' }}>
                        {/* Left Column: Context, Value Proposition & Beta Offering */}
                        <div className="animate-fade-up">
                            <h1 style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.1rem)', fontWeight: 900, marginBottom: '1.25rem', lineHeight: '1.15', color: '#ffffff', letterSpacing: '-0.02em' }}>
                                Co-Develop the Future of Hotel <span style={{ color: '#00e5ff', background: 'linear-gradient(135deg, #e6f9ff 10%, #00e5ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Experience Marketing</span>
                            </h1>

                            <div style={{
                                background: 'linear-gradient(135deg, rgba(14, 25, 45, 0.7) 0%, rgba(8, 14, 26, 0.85) 100%)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: '1px solid rgba(0, 229, 255, 0.25)',
                                borderLeft: '4px solid #00e5ff',
                                padding: '1.25rem 1.5rem',
                                borderRadius: '0 14px 14px 0',
                                marginBottom: '2rem',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                            }}>
                                <p style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
                                    AtmosVibe is in beta and looking for innovative hospitality groups
                                </p>
                            </div>

                            <p style={{ fontSize: '1.02rem', color: 'rgba(230, 241, 255, 0.78)', lineHeight: 1.65, marginBottom: '2.25rem' }}>
                                Next-Gen travelers research local atmosphere and experiences before a hotel room. We use your Vibe Signature to position your property as the natural gateway to your neighbourhood, turning overlooked atmospheric spaces into high-converting visual assets across direct and OTA channels.
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#00e5ff', letterSpacing: '0.1em', margin: 0 }}>
                                    What Beta Partners Receive
                                </h3>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(230, 241, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    5-Part Deliverables Suite
                                </span>
                            </div>

                            {/* 5 Deliverables Architectural Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '2rem' }}>
                                {/* 01 Bespoke Vibe Signature */}
                                <div style={{ background: 'rgba(14, 22, 38, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffd700', fontFamily: 'monospace', letterSpacing: '0.06em' }}>01 // SIGNATURE</span>
                                        <Sparkles size={16} color="#ffd700" />
                                    </div>
                                    <h4 style={{ color: '#ffffff', fontSize: '0.96rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                                        Bespoke Vibe Signature
                                    </h4>
                                    <p style={{ color: 'rgba(230, 241, 255, 0.65)', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                                        Proprietary atmospheric profiling mapped to local search demand and integrated with curated acoustic soundscapes
                                    </p>
                                </div>

                                {/* 02 Full Photo Re-ordering */}
                                <div style={{ background: 'rgba(14, 22, 38, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.06em' }}>02 // VISUALS</span>
                                        <Camera size={16} color="#00e5ff" />
                                    </div>
                                    <h4 style={{ color: '#ffffff', fontSize: '0.96rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                                        Full Photo Re-ordering
                                    </h4>
                                    <p style={{ color: 'rgba(230, 241, 255, 0.65)', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                                        Complete photo audit for Booking.com and direct channels, plus specs for high-impact missing assets
                                    </p>
                                </div>

                                {/* 03 Local Gateway Copy Guidelines */}
                                <div style={{ background: 'rgba(14, 22, 38, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', fontFamily: 'monospace', letterSpacing: '0.06em' }}>03 // COPY</span>
                                        <Compass size={16} color="#10b981" />
                                    </div>
                                    <h4 style={{ color: '#ffffff', fontSize: '0.96rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                                        Local Gateway Copy Guidelines
                                    </h4>
                                    <p style={{ color: 'rgba(230, 241, 255, 0.65)', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                                        High-converting copy guidelines and neighbourhood venue alignment to capture authentic lifestyle traveler demand
                                    </p>
                                </div>

                                {/* 04 AI Search Copy */}
                                <div style={{ background: 'rgba(14, 22, 38, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00e5ff', fontFamily: 'monospace', letterSpacing: '0.06em' }}>04 // AI GEO</span>
                                        <Search size={16} color="#00e5ff" />
                                    </div>
                                    <h4 style={{ color: '#ffffff', fontSize: '0.96rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                                        AI Search Copy
                                    </h4>
                                    <p style={{ color: 'rgba(230, 241, 255, 0.65)', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                                        Semantic entity tags and structured copy engineered to win high-intent recommendations across AI travel search engines
                                    </p>
                                </div>

                                {/* 05 Local Vibe Intelligence */}
                                <div style={{ gridColumn: 'span 2', background: 'rgba(14, 22, 38, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'monospace', letterSpacing: '0.06em' }}>05 // INTELLIGENCE</span>
                                        <MapPin size={16} color="#38bdf8" />
                                    </div>
                                    <h4 style={{ color: '#ffffff', fontSize: '0.96rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                                        Local Vibe Intelligence
                                    </h4>
                                    <p style={{ color: 'rgba(230, 241, 255, 0.65)', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                                        Hyperlocal cultural trends, micro-venue dynamics, and atmospheric data to position your property as the local authority
                                    </p>
                                </div>
                            </div>

                            {/* Beta Partner Commitment */}
                            <div style={{
                                padding: '1.25rem 1.5rem',
                                background: 'rgba(10, 18, 32, 0.75)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                borderRadius: '14px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                                marginBottom: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd700', fontWeight: 800, fontSize: '0.82rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    <Award size={15} /> Beta Partner Commitment
                                </div>
                                <p style={{ color: 'rgba(230, 241, 255, 0.75)', fontSize: '0.88rem', margin: 0, lineHeight: 1.55 }}>
                                    In exchange for 3 months of access and custom creative direction, we ask for a brief 20-minute bi-weekly feedback session to test recommendations and help us refine the AtmosVibe platform.
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
                                            3-MONTH BETA COHORT
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
                                            {loading ? 'Submitting Application...' : 'Apply for 3-Month Beta Cohort'}
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
