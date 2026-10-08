import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, Sparkles, Key, Lock } from 'lucide-react';
import { useAuthGate } from './GatedSectionAuth';
import './Layout.css';


const Layout = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isUnlocked, lock } = useAuthGate();

    const handleGatedNavClick = (e, targetHash) => {
        setIsMenuOpen(false);
        if (!isUnlocked) {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('atmosvibe-open-login'));
        }
    };

    return (
        <>
            <header className="main-header">
                <div className="container header-content">
                    <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img
                            src="/models/Atmosvibe6.svg"
                            alt="AtmosVibe"
                            className="nav-logo"
                            style={{ height: '56px', width: 'auto', display: 'block' }}
                        />
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
                        <a href="/#vibe-signatures" className="nav-link" onClick={() => setIsMenuOpen(false)}>VIBE SIGNATURES</a>
                        <a 
                            href={isUnlocked ? "/#vibe-api" : "#"} 
                            className="nav-link nav-link-badge-col" 
                            onClick={(e) => handleGatedNavClick(e, '#vibe-api')}
                        >
                            <span className="nav-link-text">VIBE API</span>
                            <span className="nav-coming-soon">Coming Soon</span>
                        </a>
                        <a 
                            href={isUnlocked ? "/#markets" : "#"} 
                            className="nav-link nav-link-badge-col" 
                            onClick={(e) => handleGatedNavClick(e, '#markets')}
                        >
                            <span className="nav-link-text">VIBE INSIGHTS</span>
                            <span className="nav-coming-soon">Coming Soon</span>
                        </a>
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
