import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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
        <footer className="footer-section" id="team">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
                    {/* Right: Partner Form - Now Centered */}
                    <div className="glass-card animate-fade-up" style={{ padding: '3rem', borderRadius: '24px', background: 'rgba(255,255,255,0.03)', maxWidth: '600px', width: '100%' }}>
                        {!submitted ? (
                            <>
                                <div style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
                                    <span style={{ 
                                        fontSize: '0.9rem', 
                                        background: '#ffffff', 
                                        color: '#050b14', 
                                        padding: '4px 15px', 
                                        borderRadius: '4px', 
                                        fontWeight: '900',
                                        textTransform: 'uppercase',
                                        letterSpacing: '3px',
                                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                                        border: '2px solid var(--color-gold)',
                                        display: 'inline-block'
                                    }}>BETA</span>
                                </div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '0.8rem', color: 'white', textAlign: 'center' }}>Become a partner</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontSize: '1rem', textAlign: 'center' }}>Ready to increase your direct revenue? Fill out the form below and we'll be in touch.</p>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <input type="text" name="firstName" placeholder="First Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        <input type="text" name="lastName" placeholder="Last Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
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
                                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '10px', width: '100%', padding: '15px' }}>
                                        {loading ? 'Sending...' : 'Register Interest'} <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                                <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.8rem' }}>Thank You!</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>We've received your request and will contact you shortly.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar: Copyright and Hidden Link */}
                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} Travelvrse. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="https://usgrant.travelvrse.com/privacy" target="_blank" rel="noopener noreferrer" className="footer-link">Privacy Policy</a>
                        <span className="footer-divider">|</span>
                        <a href="https://usgrant.travelvrse.com/terms" target="_blank" rel="noopener noreferrer" className="footer-link">Terms & Conditions</a>
                        <span className="footer-divider">|</span>
                        {/* The Hidden Creator Link */}
                        <Link to="/creator-portal" className="stealth-link" title="Creator Portal">
                            Creators
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
