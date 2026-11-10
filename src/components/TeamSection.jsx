import React from 'react';
import './TeamSection.css';

const Linkedin = ({ size = 18, strokeWidth = 2, className = '', style = {} }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    style={style}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const team = [
    {
        name: "Alex Hurd",
        role: "Founder & CEO",
        image: "/models/Alex_Hurd.jpg",
        linkedin: "https://www.linkedin.com/in/alexhurd/",
        background: "Ex Shazam, Cortexica, InfoSpace, Cinergy"
    }
];

const skills = [
    'Search Engines',
    'Digital Signatures',
    'Business Intelligence'
];

const TeamSection = () => {
    return (
        <section className="section-padding team-section" id="team">
            <div className="container">
                <div className="section-header text-center animate-fade-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="hero-executive-badge" style={{ marginBottom: '1.25rem' }}>
                        <span className="badge-status-dot"></span>
                        <span className="badge-tag">OPERATORS</span>
                        <span className="badge-divider"></span>
                        <span className="badge-text">LEADERSHIP</span>
                    </div>

                    <h2 className="team-title" style={{ 
                        fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
                        fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
                        fontWeight: '800', 
                        letterSpacing: '-0.02em',
                        lineHeight: '1.15',
                        marginBottom: '1rem', 
                        color: '#ffffff' 
                    }}>
                        Our <span className="text-cyan">Team</span>
                    </h2>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        maxWidth: '850px',
                        margin: '1.25rem auto 0 auto'
                    }}>
                        {skills.map((skill, i) => (
                            <span 
                                key={i}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '7px 18px',
                                    background: 'rgba(10, 18, 30, 0.72)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '999px',
                                    fontSize: '0.86rem',
                                    fontWeight: '600',
                                    color: 'rgba(240, 246, 255, 0.92)',
                                    letterSpacing: '0.02em',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)'
                                }}
                            >
                                <span style={{ 
                                    width: '6px', 
                                    height: '6px', 
                                    borderRadius: '50%', 
                                    background: i % 2 === 0 ? 'var(--color-cyan-neon, #00e5ff)' : 'var(--color-gold, #ffd700)',
                                    boxShadow: i % 2 === 0 ? '0 0 8px rgba(0, 229, 255, 0.7)' : '0 0 8px rgba(255, 215, 0, 0.7)'
                                }}></span>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="team-grid">
                    {team.map((member, index) => (
                        <div key={index} className="team-card glass-card animate-fade-up" style={{ 
                            animationDelay: `${index * 0.1}s`
                        }}>
                            {member.linkedin && (
                                <a 
                                    href={member.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="linkedin-link"
                                    aria-label={`${member.name} LinkedIn`}
                                >
                                    <Linkedin size={18} strokeWidth={2.5} />
                                </a>
                            )}
                            <div className="member-image-wrapper">
                                <img src={member.image} alt={member.name} className="member-image" />
                            </div>
                            <div className="member-info">
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role text-gold">
                                    {member.role}
                                </p>
                                <div className="member-background">
                                    {member.background ? (
                                        <p>{member.background}</p>
                                    ) : (
                                        <p style={{ opacity: 0.2 }}>—</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
