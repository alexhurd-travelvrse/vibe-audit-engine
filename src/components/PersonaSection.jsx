const journeyPhases = [
    {
        id: 'pre-booking',
        phase: 'Pre-Booking',
        experience: 'Local challenges led by creators or concierges.',
        dna: 'Identifies the Explorer vs. the Relaxer.',
        revenue: 'Direct Revenue bypassing OTA commissions.',
        image: '/assets/property_home_preview.png'
    },
    {
        id: 'pre-arrival',
        phase: 'Pre-Arrival',
        experience: 'Guests play to "unlock" rewards like Cabana Upgrades.',
        dna: 'Maps intent for Spa, Dining, and Bars.',
        revenue: 'Guaranteed Upsells before check-in.',
        image: '/models/cabana.png'
    },
    {
        id: 'post-arrival',
        phase: 'Post-Arrival',
        experience: 'On-property quests to find "Secret Bars" or hidden spots.',
        dna: 'Tracks real-time behavioral truth.',
        revenue: 'Increased Ancillary Spend & loyalty.',
        image: '/assets/spa_grab.png'
    }
];

const ResultsSection = () => {
    return (
        <section className="section-padding results-section" id="results">
            <div className="container">

                <div className="section-header text-center animate-fade-up">
                    <h2 className="text-gradient">
                        From Vibe to Value: <span className="text-gold">The DNA-Driven Journey</span>
                    </h2>
                    <p className="subtitle mx-auto max-w-4xl">
                        We bridge the Experience Gap across the entire guest lifecycle, turning photorealistic play into high-margin revenue.
                    </p>
                </div>

                <div className="journey-grid mt-12">
                    <div className="journey-header-row glass-card hide-mobile">
                        <div className="header-cell">Phase</div>
                        <div className="header-cell">The Experience</div>
                        <div className="header-cell">Travel DNA Captured</div>
                        <div className="header-cell">Revenue Outcome</div>
                    </div>

                    {journeyPhases.map((phase, index) => (
                        <div key={phase.id} className={`journey-row glass-card animate-fade-up delay-${index + 1}`}>
                            <div className="journey-cell phase-cell">
                                <div className="phase-indicator text-cyan">Phase 0{index + 1}</div>
                                <h3>{phase.phase}</h3>
                                <div className="mini-creative" style={{ backgroundImage: `url(${phase.image})` }}></div>
                            </div>
                            <div className="journey-cell experience-cell">
                                <span className="mobile-label text-gold">The Experience</span>
                                <p>{phase.experience}</p>
                            </div>
                            <div className="journey-cell dna-cell">
                                <span className="mobile-label text-cyan">Travel DNA Captured</span>
                                <p>{phase.dna}</p>
                            </div>
                            <div className="journey-cell revenue-cell">
                                <span className="mobile-label text-gold">Revenue Outcome</span>
                                <div className="revenue-pill">{phase.revenue}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="results-cta mt-16 text-center animate-fade-up delay-4">
                    <div className="glass-card footer-pitch py-8 px-12 inline-block">
                        <h3 className="text-gold mb-4">Stop selling a stay Start curating a journey</h3>
                        <p className="opacity-80">Hyper-personalisation at every touchpoint, from discovery to departure.</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ResultsSection;
