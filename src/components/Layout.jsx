import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Layout.css';


const Layout = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="main-header">
                <div className="container header-content">
                    <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                        <img
                            src="/models/Atmosvibe6.svg"
                            alt="AtmosVibe"
                            className="nav-logo"
                            style={{ height: '56px', width: 'auto', display: 'block' }}
                        />
                        <span style={{
                            fontSize: '0.65rem',
                            fontWeight: '900',
                            letterSpacing: '1.5px',
                            color: '#050b14',
                            background: '#ffffff',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: '1.5px solid var(--color-gold, #ffd700)',
                            boxShadow: '0 0 12px rgba(255, 215, 0, 0.35)',
                            textTransform: 'uppercase',
                            lineHeight: 1
                        }}>BETA</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        className="mobile-menu-btn" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>

                    <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                        <Link to="/audit" className="nav-link nav-highlight-btn" onClick={() => setIsMenuOpen(false)}>
                            FREE VIBE SIGNATURE PREVIEW
                        </Link>
                        <a href="/#solution" className="nav-link" onClick={() => setIsMenuOpen(false)}>VIBE CONVERSION</a>
                        <a href="/#data-api" className="nav-link" onClick={() => setIsMenuOpen(false)}>DATA API</a>
                        <a href="/#markets" className="nav-link" onClick={() => setIsMenuOpen(false)}>INSIGHTS</a>
                        <a href="/#journal" className="nav-link" onClick={() => setIsMenuOpen(false)}>JOURNAL</a>
                        <a href="/#team" className="nav-link" onClick={() => setIsMenuOpen(false)}>VIBE PROJECTS</a>
                    </nav>
                </div>
            </header>

            <main className="main-content" style={{ marginTop: '80px' }}>
                {children}
            </main>
        </>
    );
};

export default Layout;
