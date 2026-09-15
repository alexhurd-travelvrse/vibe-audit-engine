import React from 'react';
import { Globe, Code2, MousePointerClick } from 'lucide-react';
import './TechSpecs.css';

const TechSpecsSection = () => {
    return (
        <section className="section-padding tech-section" id="tech">
            <div className="container">

                <div className="section-header animate-fade-up">
                    <h2>
                        Frictionless <span className="text-cyan">Integration</span>
                    </h2>
                    <p className="subtitle">
                        Use our self-serve tools to manage creators, rewarded discovery, and first-party intent data.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <a href="#marketplace" className="btn btn-outline" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
                            Become A Creator
                        </a>
                    </div>
                </div>

                <div className="tools-creative animate-fade-up delay-2">
                    
                    {/* Tool 1: Campaign Manager */}
                    <div className="tool-box glass-card">
                        <div className="tool-label">Campaign Manager</div>
                        <div className="tool-media">
                            <div className="tool-screenshot" style={{ backgroundImage: 'url(/models/ceratortools.png)' }}>
                                <div className="screenshot-overlay"></div>
                            </div>
                        </div>
                        <p className="tool-description">
                            Approve creators, campaigns and experiences intent schemas from our dashboard.
                        </p>
                    </div>

                    <div className="tool-connector">
                        <div className="connector-dot"></div>
                    </div>

                    {/* Tool 2: Creator Tools */}
                    <div className="tool-box glass-card">
                        <div className="tool-label">Creator Tools</div>
                        <div className="tool-media">
                            <div className="tool-screenshot" style={{ backgroundImage: 'url(/models/creator_mobile_scan.png)' }}>
                                <div className="screenshot-overlay"></div>
                            </div>
                        </div>
                        <p className="tool-description">
                            Creators scan property on mobile or upload existing 2D photos. Use our tools to gamify and publish in minutes.
                        </p>
                    </div>

                    <div className="tool-connector">
                        <div className="connector-dot"></div>
                    </div>

                    {/* Tool 3: API Data Hand-off */}
                    <div className="tool-box glass-card">
                        <div className="tool-label">API Data Hand-off</div>
                        <div className="tool-media">
                            <div className="api-json-visual glass-card">
                                <pre className="json-header">GET /api/v1/intent/8829-X</pre>
                                <div className="json-body">
                                    <span className="j-key">"segment":</span> <span className="j-val">"WellnessVoyager"</span>,
                                    <span className="j-key">"intent":</span> <span className="j-val">0.98</span>,
                                    <span className="j-key">"hand-off":</span> <span className="j-val">"Amadeus_API"</span>
                                </div>
                            </div>
                        </div>
                        <p className="tool-description">
                            Seamless, lightweight JSON hand-off to all major booking engines including Amadeus, Sabre, and Traveltek.
                        </p>
                    </div>

                </div>

            </div>
            <div className="section-bridge animate-fade-up delay-4">
                <div className="bridge-line"></div>
            </div>
        </section>
    );
};

export default TechSpecsSection;
