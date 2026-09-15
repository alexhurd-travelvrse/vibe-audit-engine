import React from 'react';
import { Search, Sparkles, Timer } from 'lucide-react';
import './AiSection.css';

const AiSection = () => {
    return (
        <section className="section-padding ai-section" id="ai">
            <div className="container">

                <div className="section-header animate-fade-up">
                    <h1 className="problem-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textAlign: 'left' }}>
                        Go OTA-Free <span className="text-cyan">Own Your Digital Space</span>
                    </h1>
                    <h2 className="subtitle" style={{ color: 'var(--color-gold-champagne)', textAlign: 'left', marginTop: '1rem', textTransform: 'none', letterSpacing: 'normal', fontWeight: 'bold' }}>
                        Rewarded Experiences Assets & Spatial SEO
                    </h2>
                    <h3 className="subtitle" style={{ color: 'var(--color-text-muted)', textAlign: 'left', marginTop: '0.5rem', fontSize: '1.2rem', textTransform: 'none', letterSpacing: 'normal' }}>
                        B2B Training & Internal Creator Tools
                    </h3>
                </div>

                <div className="ai-layout">
                    <div className="ai-copy">
                        <div className="ai-features">
                            <div className="ai-feature animate-fade-up delay-2">
                                <div className="ai-icon bg-cyan-glow">
                                    <Search size={24} className="text-cyan" />
                                </div>
                                <div>
                                    <h4>Own the Search (Spatial SEO)</h4>
                                    <p>While OTAs scrape and reuse your static 2D photos, we transform your existing photography into unique 3D spatial assets. By hosting these experiences on your domain, you claim the Spatial SEO credit—ensuring your property ranks first when Next-Gen travellers search for their next destination.</p>
                                </div>
                            </div>

                            <div className="ai-feature animate-fade-up delay-3">
                                <div className="ai-icon bg-gold-glow">
                                    <Sparkles size={24} className="text-gold" />
                                </div>
                                <div>
                                    <h4>Empower Your Teams</h4>
                                    <p>Transform your concierge into a digital guide. Use your 3D assets as a high-fidelity B2B Training Tool for global travel agencies, giving them a "walkthrough" understanding of your property that no brochure can match.</p>
                                </div>
                            </div>

                            <div className="ai-feature animate-fade-up delay-4">
                                <div className="ai-icon bg-navy-glow">
                                    <Timer size={24} className="text-cyan" />
                                </div>
                                <div>
                                    <h4>Next-Gen Performance</h4>
                                    <p>Creators drive the traffic, but your 3D environment captures the lead. Engage guests on their favorite channels and pull them directly into a world you own, building a Guest Profile that bypasses the OTA middleman entirely.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Abstract Visual */}
                    <div className="ai-visual animate-fade-up delay-2">
                        <div className="cyber-circle inner"></div>
                        <div className="cyber-circle middle"></div>
                        <div className="cyber-circle outer"></div>

                        <div className="cyber-badge">
                            <span className="text-gradient font-bold text-2xl">2026</span>
                            <span className="text-xs uppercase tracking-wider text-muted mt-1">Ready</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AiSection;
