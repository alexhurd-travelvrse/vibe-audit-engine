import React from 'react';
import { Link } from 'react-router-dom';
import { MEETING_LIVE_LINKS } from '../data/cannedConferenceDemos';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section" id="footer" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div className="container">
                {/* Temporary Live Meeting Links Bar */}
                {MEETING_LIVE_LINKS.length > 0 && (
                    <div style={{
                        marginBottom: '1.25rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                    }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                            ⚡ Live Meeting Audits:
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {MEETING_LIVE_LINKS.map((item) => (
                                <Link
                                    key={item.slug}
                                    to={item.href}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '5px 12px',
                                        borderRadius: '999px',
                                        background: 'rgba(0, 229, 255, 0.08)',
                                        border: '1px solid rgba(0, 229, 255, 0.25)',
                                        color: '#00e5ff',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        textDecoration: 'none'
                                    }}
                                >
                                    <span>{item.label}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: 500 }}>({item.location})</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Bar: Copyright and Hidden Link */}
                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} AtmosVibe. All rights reserved</p>
                    <div className="footer-links">
                        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                        <span className="footer-divider" aria-hidden="true">|</span>
                        <Link to="/terms" className="footer-link">Terms &amp; Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
