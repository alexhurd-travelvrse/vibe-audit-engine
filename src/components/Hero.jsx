import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <Helmet>
                <title>Travelvrse | Vibe Conversion Engine for Hotels, Hostels & Resorts</title>
                <meta name="description" content="Discover the world's first Vibe Conversion Engine. Drive direct revenue for hotels, hostels, and resorts via immersive 3D discovery." />
            </Helmet>
            <div className="hero-bg-container">
                <video 
                    src="/models/Generic_Luxury_Travel_Video_Creation.mp4" 
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
                    <div className="beta-badge-premium">BETA</div>
                    <h1 className="hero-title" style={{ color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)' }}>
                        VIBE CONVERSION ENGINE
                    </h1>
                    <h2 className="hero-strategy">
                        FOR HOTELS, HOSTELS AND RESORTS
                    </h2>
                </div>

                <p className="hero-subtitle">
                    <span className="progressive-item" style={{ animationDelay: '0.8s' }}>Turn Atmosphere into Bookings</span>
                </p>

                <div className="hero-cta-group animate-fade-up" style={{ animationDelay: '3.4s', justifyContent: 'center' }}>
                    <Link 
                        to="/audit" 
                        className="btn btn-primary" 
                        style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Play size={20} style={{ marginRight: '8px' }} />
                        Improve My Booking.com listing
                    </Link>
                </div>
            </div>

            <div className="scroll-indicator">
                <div style={{ width: '4px', height: '60px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), transparent)', borderRadius: '4px' }}></div>
            </div>
        </section>
    );
};

export default Hero;
