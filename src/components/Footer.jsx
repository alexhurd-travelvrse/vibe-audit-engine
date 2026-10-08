import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section" id="footer" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div className="container">
                {/* Bottom Bar: Copyright and Hidden Link */}
                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} AtmosVibe. All rights reserved</p>
                    <div className="footer-links">
                        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                        <span className="footer-divider">|</span>
                        <Link to="/terms" className="footer-link">Terms &amp; Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
