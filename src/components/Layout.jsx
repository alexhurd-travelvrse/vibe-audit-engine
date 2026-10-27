import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Layout.css';


const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <span className="nav-link nav-link-with-badge" style={{ cursor: 'default' }}>
                            <span className="nav-link-text">VIBE API</span>
                            <span className="nav-coming-soon">Coming Soon</span>
                        </span>
                        <span className="nav-link nav-link-with-badge" style={{ cursor: 'default' }}>
                            <span className="nav-link-text">VIBE INSIGHTS</span>
                            <span className="nav-coming-soon">Coming Soon</span>
                        </span>
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
