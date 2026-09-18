import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Layout from '../components/Layout';

export default function PrivacyPolicyPage() {
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
              <Shield size={24} color="#00e5ff" />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>Privacy Policy</h1>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>The TravelVerse Ltd • Last updated: July 2024</span>
            </div>
          </div>

          <div style={{ color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.7, fontSize: '15px' }}>
            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>1. Introduction</h3>
            <p>
              The TravelVerse Ltd (“We”, “Us”, or “Our”) is firmly committed to protecting and respecting your privacy, including any information you share with us or other users. This Privacy Policy describes our information gathering, use, and sharing practices for this website (<strong>www.travelvrse.com</strong>, “Our Site”) as well as mobile device applications (“Apps”) that operate using The TravelVerse Ltd services and related services of our business affiliates.
            </p>
            <p>
              Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it. You can withdraw your consent at any time by contacting us at The TravelVerse Ltd at: <em>WeWork C/O Travel Curious Ltd, 3 Waterhouse Square, 138 - 142 Holborn, London, United Kingdom, EC1N 2SW</em>.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>2. Who Is Collecting Your Data?</h3>
            <p>
              For the purposes of the Data Protection Act 1998 (the “Act”) and the EU General Data Protection Regulation 2016 (GDPR), all data collection is conducted by the data controller, namely:
            </p>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
              <strong>The TravelVerse Ltd</strong><br />
              WeWork C/O Travel Curious Ltd, 3 Waterhouse Square<br />
              138 - 142 Holborn, London, EC1N 2SW, United Kingdom<br />
              Data Protection Officer: <strong>Alex Hurd</strong>
            </div>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>3. What Information Is Covered?</h3>
            <p>
              This Privacy Policy covers all ‘personal data’ (PII) that you may provide and we may collect when you use our website, Vibe Audit diagnostic engine, and associated immersive applications. As per GDPR, personal data is data that can be used to identify individual data subjects directly or indirectly.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>4. What Information Do We Collect?</h3>
            <p>
              <strong>Information Related to Our Services:</strong> When you use our applications and Vibe Audit engine, we collect relevant business information provided by you (such as your work email, hotel group, and property domain) to deliver the requested property diagnostic reports and direct revenue analysis.
            </p>
            <p>
              <strong>Personalizing Content & Server Logs:</strong> Our Site automatically receives and records information on our server logs from your browser, including your IP address, browser type, device information, and interaction metrics. We use this information to tailor your diagnostic reports, fulfill service requests, and optimize platform performance.
            </p>
            <p>
              <strong>Aggregate & Analytics Information:</strong> We may collect anonymous aggregate information about user sessions, features accessed, and general interaction trends to continuously improve our hospitality intelligence algorithms.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>5. How We Protect Your Data</h3>
            <p>
              We implement industry-standard administrative, technical, and physical security measures to protect your personal data against unauthorized access, destruction, loss, or alteration.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.75rem' }}>6. Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection Officer at:
            </p>
            <p>
              <strong>Email:</strong> alex@travelvrse.com<br />
              <strong>Address:</strong> The TravelVerse Ltd, WeWork C/O Travel Curious Ltd, 3 Waterhouse Square, 138 - 142 Holborn, London, EC1N 2SW
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}
