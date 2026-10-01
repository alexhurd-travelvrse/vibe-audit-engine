import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, TrendingUp, Users, ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';

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
            <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #050b14, #0a1628)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <Helmet>
                        <title>Hotel Partnership Program | Travelvrse &amp; AtmosVibe VIBE API</title>
                        <meta name="description" content="Join Travelvrse as a hotel or travel partner. Increase direct revenue, capture qualified guest data, and market your iconic experiences in 3D spatial metaverse." />
                    </Helmet>

                    {/* Case Study Context Banner */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(245, 158, 11, 0.05) 100%)',
                        border: '1px solid rgba(0, 229, 255, 0.25)',
                        borderRadius: '20px',
                        padding: '1.25rem 1.75rem',
                        marginBottom: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <img src="/models/travelvrse_logo_main.svg" alt="Travelvrse" style={{ height: '24px', width: 'auto' }} />
                            <div>
                                <span style={{ fontSize: '11px', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                                    OFFICIAL PARTNER CASE STUDY
                                </span>
                                <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 700 }}>
                                    How Travelvrse Powers 3D Spatial Travel Discovery with the AtmosVibe VIBE API
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#00e5ff' }}>+34%</div>
                                <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 700 }}>Direct Intent</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffd700' }}>2.8x</div>
                                <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 700 }}>Session Time</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>&lt;120ms</div>
                                <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 700 }}>Data Sync</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'flex-start' }}>
                        <div className="animate-fade-up">
                            <h1 style={{ fontSize: '3.2rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                Put Vibe at the Front of Your Business with <span className="text-gold">Experience Marketing</span>
                            </h1>
                            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.75)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
                                Travelvrse partners with hotels, hostels, resorts, cruise operators, and landmark properties to promote their authentic atmospheric experiences in interactive 3D spatial cities and capture qualified direct guest profiles
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '2.5rem' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <ShieldCheck className="text-gold" size={24} style={{ flexShrink: 0, marginTop: '3px' }} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Target Next-Gen On Mobile</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Millennials and GenZ will account for 70% of luxury hotel sales by 2029</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <TrendingUp className="text-cyan" size={24} style={{ flexShrink: 0, marginTop: '3px' }} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Increase Direct Revenue</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Capture high-intent guests before they bounce to commoditized OTAs</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Users className="text-gold" size={24} style={{ flexShrink: 0, marginTop: '3px' }} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Acoustic DNA &amp; Vibe Radar</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Broadcast verified soundscapes and 5-photo visual magnet order directly to 3D travelers</p>
                                    </div>
                                </div>
                            </div>

                            {/* 3D Spatial Preview Thumbnail */}
                            <div style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid rgba(0, 229, 255, 0.3)',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
                            }}>
                                <img 
                                    src="/models/Screenshothomepage.png" 
                                    alt="Travelvrse 3D Spatial Platform" 
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </div>
                        </div>

                        <div className="glass-card animate-fade-up delay-1" style={{ padding: '3rem', borderRadius: '24px', background: 'rgba(10, 22, 40, 0.85)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
                            {!submitted ? (
                                <>
                                    <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ 
                                            fontSize: '0.85rem', 
                                            background: '#ffffff', 
                                            color: '#050b14', 
                                            padding: '4px 14px', 
                                            borderRadius: '4px', 
                                            fontWeight: '900',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
                                            border: '2px solid var(--color-gold)',
                                            display: 'inline-block'
                                        }}>PARTNERSHIP PROGRAM</span>
                                    </div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#ffffff', fontWeight: 900 }}>Become a partner</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                                        Register your interest below and our partner onboarding team will be in touch within 24 hours
                                    </p>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                            <input type="text" name="firstName" placeholder="First Name" required className="form-input-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                            <input type="text" name="lastName" placeholder="Last Name" required className="form-input-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        </div>
                                        <input type="email" name="email" placeholder="Work Email" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        <input type="text" name="company" placeholder="Property / Company Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        <select name="propertyType" required style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 16px', borderRadius: '8px', color: 'white' }}>
                                            <option value="">Property / Partner Type</option>
                                            <option value="hotels">Boutique &amp; Luxury Hotels</option>
                                            <option value="hostels">Design Hostels</option>
                                            <option value="resorts">Resorts &amp; Retreats</option>
                                            <option value="ota">OTA / Booking Platform</option>
                                            <option value="concierge">Travel Concierge / Agency</option>
                                            <option value="cruise">Cruise Operator</option>
                                            <option value="landmark">Cultural Landmark</option>
                                        </select>
                                        <button className="btn btn-primary" type="submit" disabled={loading} style={{ 
                                            marginTop: '10px', 
                                            width: '100%', 
                                            padding: '16px',
                                            background: 'linear-gradient(135deg, #ffd700 0%, #ffb300 100%)',
                                            color: '#050b14',
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            border: 'none',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px'
                                        }}>
                                            <Sparkles size={18} />
                                            {loading ? 'Submitting Application...' : 'Register Interest & Become a Partner'}
                                            <ArrowRight size={18} />
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                        <CheckCircle2 size={36} color="#10b981" />
                                    </div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff', fontWeight: 900 }}>Application Received</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto' }}>
                                        Thank you for registering your interest. Our partnership team will review your property profile and reach out within 24 hours
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
