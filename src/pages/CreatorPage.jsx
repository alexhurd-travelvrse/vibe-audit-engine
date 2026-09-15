import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Camera, Zap, Wallet, ArrowRight } from 'lucide-react';

const Instagram = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Youtube = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const CreatorPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        
        try {
            const response = await fetch("https://formspree.io/f/mgopgyyy", {
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
            <section className="section-padding" style={{ background: 'linear-gradient(to top, #050b14, #0a1628)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <Helmet>
                        <title>Travel Creator Marketplace | Monetize 3D Content | Travelvrse</title>
                        <meta name="description" content="Join the world's first Rewarded Experience Marketplace for travel influencers. Turn 3D property scans into interactive challenges and earn rewards." />
                    </Helmet>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div className="animate-fade-up">
                            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                Travel Creator Marketplace: <span className="text-cyan">Earn with 3D Challenges</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '600px' }}>
                                Join the world's first Rewarded Experiences Marketplace. Turn your travel content into interactive, photorealistic challenges and earn rewards from top hotels and cruise lines.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Camera className="text-cyan" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>Creative Freedom</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Use our tools to gamify property scans and publish to social media</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Wallet className="text-gold" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>Earn Rewards</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Get paid for engagement and direct leads generated through your challenges</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Zap className="text-cyan" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>Early Access</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Be the first to create for iconic global properties</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card animate-fade-up delay-1" style={{ padding: '3rem', borderRadius: '24px' }}>
                            {!submitted ? (
                                <>
                                    <div className="beta-badge-premium">BETA</div>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Creator Sign-up</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Connect your platforms and join the BETA program</p>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <input type="text" name="name" placeholder="Full Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        <input type="email" name="email" placeholder="Email Address" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                            <div style={{ position: 'relative' }}>
                                                <Instagram size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                                                <input type="text" name="instagram" placeholder="Instagram" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px 12px 35px', borderRadius: '8px', color: 'white' }} />
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <Youtube size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                                                <input type="text" name="tiktok_youtube" placeholder="TikTok/Youtube" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px 12px 35px', borderRadius: '8px', color: 'white' }} />
                                            </div>
                                        </div>

                                        <select name="propertyType" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }}>
                                            <option value="">Property Type</option>
                                            <option value="hotels">Hotels</option>
                                            <option value="hostels">Hostels</option>
                                            <option value="resorts">Resorts</option>
                                            <option value="cruise">Cruise Operator</option>
                                            <option value="landmark">Landmark</option>
                                        </select>

                                        <button className="btn btn-outline" type="submit" disabled={loading} style={{ border: '1px solid var(--color-cyan-neon)', color: 'var(--color-cyan-neon)', marginTop: '10px', width: '100%', padding: '15px' }}>
                                            {loading ? 'Joining...' : 'Join Marketplace'} <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Application Sent!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>We're reviewing applications for our BETA creator cohort. We'll be in touch soon!</p>
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

export default CreatorPage;
