import React, { useEffect } from 'react';
import PasswordGate from '../components/PasswordGate';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const BarcelonaPage = () => {
    useEffect(() => {
        // Log access for analytics
        const authorized = sessionStorage.getItem('travelvrse_authorized');
        if (authorized === 'true') {
            console.log('User authorized for Barcelona experience');
        }
    }, []);

    return (
        <PasswordGate>
            <div style={{ 
                background: 'var(--color-navy-deep)', 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '40px'
            }}>
                <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                <Helmet>
                    <title>Barcelona City Explore | 3D Rewarded Experience | Travelvrse</title>
                    <meta name="description" content="Explore Barcelona in immersive 3D. Join the Rewarded Experience challenge and discover iconic Catalonia from your browser." />
                </Helmet>
                <h4 className="text-cyan animate-fade-up">DESTINATION</h4>
                <h1 className="hero-title animate-fade-up delay-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginTop: '10px' }}>
                    Barcelona City Explore
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '30px' }}>
                    Access authorized. Entering the Barcelona experience...
                </p>
                <div className="loader" style={{ 
                    border: '4px solid rgba(0, 229, 255, 0.1)',
                    borderTop: '4px solid var(--color-cyan)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <button 
                    onClick={() => window.location.href = '/'}
                    className="btn btn-primary"
                    style={{ marginTop: '40px' }}
                >
                    BACK TO MARKETPLACE
                </button>
                </div>
            </div>
        </PasswordGate>
    );
};

export default BarcelonaPage;
