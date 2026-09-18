import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import Layout from '../components/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem 8rem' }}>
        
        {/* Back Link */}
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#00e5ff', 
            textDecoration: 'none', 
            fontSize: '14px', 
            fontWeight: 700, 
            marginBottom: '2rem' 
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="glass-card" style={{ padding: '3rem 2.5rem', borderRadius: '1.75rem', background: 'rgba(18, 18, 18, 0.85)', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(0, 229, 255, 0.3)' }}>
              <FileText size={24} color="#00e5ff" />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>Terms & Conditions</h1>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>The TravelVerse Ltd • Last updated: July 2024</span>
            </div>
          </div>

          <div style={{ color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.7, fontSize: '15px' }}>
            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>1. Agreement to Terms</h3>
            <p>
              The TravelVerse Ltd (the “Company”, “Us”, or “We”) provides web-based and interactive applications, including the <strong>Travelvrse</strong> and <strong>AtmosVibe</strong> conversion & diagnostic platforms (collectively, the “Services”). As a user (“You” or “Your”) of our website and services, this Terms of Service and End User Agreement (“Agreement”) governs your access to and use of our platform.
            </p>
            <p>
              By accessing or using our services, website, or Vibe Audit engine, you agree to be legally bound by this Agreement. If you do not agree, please discontinue use of the platform immediately.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>2. Eligibility & Acceptable Use</h3>
            <p>
              You represent and warrant that you have full legal capacity to enter into this Agreement. You agree to use the platform solely for legitimate hospitality discovery, visual merchandising intelligence, and experiential gaming purposes in compliance with all applicable laws.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>3. Proprietary Rights & Intellectual Property</h3>
            <p>
              All proprietary algorithms, 3D interactive environments, acoustic DNA scoring frameworks, visual merchandising sequences, and software powering Travelvrse and AtmosVibe are the exclusive intellectual property of The TravelVerse Ltd. You may not reverse-engineer, decompile, scrape, or redistribute any portion of our platform without prior written authorization.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>4. Partner Offers & Third-Party Content</h3>
            <p>
              Certain features may connect you with third-party hotel partners, booking engines, or reward sponsors. Third-party terms and redemption policies are set directly by the respective property or provider. The TravelVerse Ltd does not warrant or guarantee third-party fulfillment beyond platform delivery.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>5. Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, The TravelVerse Ltd shall not be liable for any indirect, incidental, punitive, or consequential damages arising out of your access to or inability to access the services.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>6. Contact Information</h3>
            <p>
              For legal inquiries or notices regarding these terms, please contact:
            </p>
            <p>
              <strong>The TravelVerse Ltd</strong><br />
              WeWork C/O Travel Curious Ltd, 3 Waterhouse Square<br />
              138 - 142 Holborn, London, United Kingdom, EC1N 2SW<br />
              Email: <strong>alex@travelvrse.com</strong>
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}
