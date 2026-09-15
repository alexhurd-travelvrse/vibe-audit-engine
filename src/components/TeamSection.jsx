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
        role: "Co-Founder CEO",
        image: "/models/Alex_Hurd.jpg",
        linkedin: "https://www.linkedin.com/in/alexhurd/",
        background: "Ex Play2Pay, Shazam, Infospace",
        advisor: false
    },
    {
        name: "Lee Probert",
        role: "CTO",
        image: "/models/lee Probert.png",
        linkedin: "https://www.linkedin.com/in/leeprobert/",
        advisor: false
    },
    {
        name: "Julian Houchin",
        role: "Chairman",
        image: "/models/Julianphoto.jpg",
        linkedin: "https://www.linkedin.com/in/julianhouchin/",
        background: "Ex GLC Resorts and IO Resorts",
        advisor: false
    },
    {
        name: "Lindsay Kotas",
        role: "VP Operations Insignia Event Services",
        image: "/models/LindsayKotas.jpg",
        linkedin: "https://www.linkedin.com/in/lindsay-kotas/",
        advisor: true
    },
    {
        name: "Amir Azulay",
        role: "CEO Travel Curious",
        image: "/models/Amir Azulay.png",
        linkedin: "https://www.linkedin.com/in/amirazulay/",
        advisor: true
    },
    {
        name: "Alex Grant",
        role: "Head of Hotel Solutions Travel Curious",
        image: "/models/Alex Grant.png",
        linkedin: "https://www.linkedin.com/in/grantalex/",
        advisor: true
    },
    {
        name: "Tristan Gadsby",
        role: "CEO Alliants",
        image: "/models/tristan.jpg",
        linkedin: "https://www.linkedin.com/in/tristangadsby/",
        advisor: true
    }
];

const TeamSection = () => {
    return (
        <section className="section-padding team-section" id="team">
            <div className="container">
                <div className="section-header text-center animate-fade-up">
                    <h2 className="team-title">
                        Our <span className="text-cyan">Team</span>
                    </h2>
                    <p className="subtitle mx-auto max-w-3xl">
                        Experts in Rewarded Engagement, Next-Gen Discovery, Travel Experiences and Hotel Operations
                    </p>
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
                                <div className="member-advisor-tag">
                                    {/* Spacer to align with cards that have backgrounds */}
                                </div>
                                <div className="member-background">
                                    {member.background ? (
                                        <p>{member.background}</p>
                                    ) : member.advisor ? (
                                        <p style={{ color: 'rgba(5, 229, 255, 0.8)', fontWeight: '800' }}>BOARD ADVISOR</p>
                                    ) : (
                                        <p style={{ opacity: 0.1 }}>—</p>
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
