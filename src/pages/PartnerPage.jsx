import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

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
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Connection error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #050b14, #0a1628)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <Helmet>
                        <title>Hotel Partnership Program | Increase Direct Revenue | Travelvrse</title>
                        <meta name="description" content="Join Travelvrse as a hotel or cruise partner. Increase direct revenue, capture qualified guest data, and market your iconic experiences in 3D." />
                    </Helmet>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                         <div className="animate-fade-up">
                            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                Increase Direct <span className="text-gold">Hotel Revenue</span> with Experience Marketing
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
                                Travelvrse works with hotels, hostels, resorts, cruise operators, and landmark properties to promote their iconic experiences as a hook to capture qualified guest profiles.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <ShieldCheck className="text-gold" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Target Next-Gen On Mobile</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Millennials and GenZ will account for 70% of luxury hotel sales by 2029</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <TrendingUp className="text-cyan" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Increase Direct Revenue</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Capture high-intent guests before they look at OTAs</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Users className="text-gold" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Increase Upsell</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Build rich guest profiles via photorealistic challenges</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card animate-fade-up delay-1" style={{ padding: '3rem', borderRadius: '24px' }}>
                            {!submitted ? (
                                <>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <span style={{ 
                                            fontSize: '1rem', 
                                            background: '#ffffff', 
                                            color: '#050b14', 
                                            padding: '6px 20px', 
                                            borderRadius: '4px', 
                                            fontWeight: '900',
                                            textTransform: 'uppercase',
                                            letterSpacing: '4px',
                                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                                            border: '2px solid var(--color-gold)',
                                            display: 'inline-block'
                                        }}>BETA</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Become a partner</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Fill out the form below and we'll be in touch</p>
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                                <input type="text" name="firstName" placeholder="First Name" required className="form-input-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                                <input type="text" name="lastName" placeholder="Last Name" required className="form-input-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                            </div>
                                            <input type="email" name="email" placeholder="Work Email" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                            <input type="text" name="company" placeholder="Company Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                            <select name="propertyType" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }}>
                                                <option value="">Property Type</option>
                                                <option value="hotels">Hotels</option>
                                                <option value="hostels">Hostels</option>
                                                <option value="resorts">Resorts</option>
                                                <option value="cruise">Cruise Operator</option>
                                                <option value="landmark">Landmark</option>
                                            </select>
                                            <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: '10px', width: '100%', padding: '15px' }}>
                                                {loading ? 'Sending...' : 'Register Interest'} <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                                            </button>
                                        </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Thank You!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Your lead has been captured. Our partnership team will reach out within 24 hours.</p>
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
