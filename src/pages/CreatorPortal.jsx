import React from 'react';
import { Target, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CreatorPortal.css';

const CreatorPortal = () => {
    return (
        <div className="creator-portal min-h-screen">

            {/* Navbar Minimalist */}
            <nav className="portal-nav container">
                <Link to="/" className="portal-logo text-gradient font-bold">TRAVELVRSE</Link>
                <span className="portal-tag text-gold text-sm">Creator Network</span>
            </nav>

            <section className="portal-hero section-padding">
                <div className="container text-center">
                    <h1 className="animate-fade-up">
                        Monetize your <span className="text-cyan">Influence</span>.
                    </h1>
                    <p className="subtitle mx-auto max-w-2xl animate-fade-up delay-1">
                        Stop sending empty top-of-funnel traffic. Use Travelvrse 3D challenges to qualify your leads and earn significantly higher affiliate commissions.
                    </p>
                </div>
            </section>

            <section className="portal-features container section-padding">
                <div className="feature-grid">

                    <div className="glass-card feature-card animate-fade-up delay-1">
                        <Target size={36} className="text-cyan mb-4" />
                        <h3>1. Deep Qualification</h3>
                        <p>Instead of generic link tracking, our platform tracks how they interact with the luxury 3D resort splat. We score their intent so you deliver validated leads to the brand.</p>
                    </div>

                    <div className="glass-card feature-card animate-fade-up delay-2">
                        <TrendingUp size={36} className="text-gold mb-4" />
                        <h3>2. Skyrocket Engagement</h3>
                        <p>Your audience loves a challenge. Hiding rewards (like a 10% discount or free spa session) inside a photorealistic environment gamifies the booking process.</p>
                    </div>

                    <div className="glass-card feature-card animate-fade-up delay-3">
                        <DollarSign size={36} className="text-cyan mb-4" />
                        <h3>3. Higher Commissions</h3>
                        <p>Because Travelvrse leads have an average dwell time of 15+ minutes and verified intent, partner resorts pay up to 40% higher commission rates for bookings that originate from your custom challenge links.</p>
                    </div>

                </div>
            </section>

            <section className="portal-cta section-padding text-center">
                <div className="container">
                    <div className="glass-card max-w-2xl mx-auto py-12 px-6">
                        <h2 className="mb-6">Apply to the Creator Network</h2>
                        <p className="text-muted mb-8 text-lg">
                            We selectively partner with travel creators who have highly engaged audiences seeking luxury, wellness, or unique cultural experiences.
                        </p>
                        <a href="mailto:creators@travelvrse.com" className="btn btn-primary px-8">Submit Your Media Kit</a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CreatorPortal;
