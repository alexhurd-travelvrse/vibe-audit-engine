import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Database, Globe, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '6rem 1.5rem 8rem' }}>
        <Helmet>
          <title>Privacy Policy | AtmosVibe</title>
          <meta name="description" content="Privacy Policy and Data Protection Information under UK GDPR for AtmosVibe B2B hospitality intelligence" />
        </Helmet>

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

        <div className="glass-card" style={{ padding: '3.5rem 2.5rem', borderRadius: '1.75rem', background: 'rgba(10, 22, 40, 0.9)', border: '1px solid rgba(0, 229, 255, 0.25)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(0, 229, 255, 0.12)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(0, 229, 255, 0.35)' }}>
              <Shield size={26} color="#00e5ff" />
            </div>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>Privacy Policy</h1>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                The TravelVerse Ltd trading as AtmosVibe / Travelvrse • Last updated: October 2026
              </span>
            </div>
          </div>

          <div style={{ color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.75, fontSize: '15px' }}>
            <h3 style={{ color: '#00e5ff', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: 800 }}>1. Introduction &amp; Legal Framework</h3>
            <p>
              The TravelVerse Ltd, trading as <strong>AtmosVibe</strong> and <strong>Travelvrse</strong> (“We”, “Us”, or “Our”), respects your privacy and is committed to protecting business representative and user data. This Privacy Policy sets out how we collect, process, and safeguard information across our website, B2B diagnostic engines, partner portal, and APIs.
            </p>
            <p>
              We process personal and commercial data strictly in accordance with the <strong>UK General Data Protection Regulation (UK GDPR)</strong>, the <strong>Data Protection Act 2018</strong>, and the EU GDPR where applicable.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.25rem', marginTop: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>2. Data Controller Details</h3>
            <p>
              The designated Data Controller responsible for your information is:
            </p>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.25rem 1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem' }}>
              <strong>The TravelVerse Ltd</strong><br />
              WeWork C/O Travel Curious Ltd, 3 Waterhouse Square<br />
              138 - 142 Holborn, London, EC1N 2SW, United Kingdom<br />
              Data Protection Lead: <strong>Alex Hurd</strong><br />
              Email: <strong>alex@travelvrse.com</strong>
            </div>

            <h3 style={{ color: '#00e5ff', fontSize: '1.25rem', marginTop: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>3. Legal Bases for Data Processing (UK GDPR Article 6)</h3>
            <p>
              We process business contact information and hotel property identifiers under the following lawful bases:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Performance of a Contract (Article 6(1)(b)):</strong> To deliver requested property audit diagnostics, synthesize customized Vibe Signatures, provide photo resequencing blueprints, and administer beta partner agreements.
              </li>
              <li>
                <strong>Legitimate Interests (Article 6(1)(f)):</strong> To conduct B2B communications with verified hotel management, analyze aggregate market trends, benchmark competitive sets, and improve our proprietary visual scoring algorithms.
              </li>
              <li>
                <strong>Consent (Article 6(1)(a)):</strong> Where explicitly provided, such as opting into our industry newsletter or specific partnership briefings. Consent may be withdrawn at any time.
              </li>
            </ul>

            <h3 style={{ color: '#00e5ff', fontSize: '1.25rem', marginTop: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>4. Processing of Public Hospitality Data</h3>
            <p>
              AtmosVibe gathers and indexes publicly accessible commercial information, including property names, publicly listed OTA image galleries, public review keywords, and neighbourhood amenity landmarks from publicly accessible web sources.
            </p>
            <p>
              This data is processed solely to generate comparative visual merchandising intelligence and does not involve the surveillance or profiling of individual private consumers.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.25rem', marginTop: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>5. Third-Party Sub-Processors &amp; Enterprise Cloud Infrastructure</h3>
            <p>
              To deliver automated hospitality diagnostics and data synthesis, we engage trusted enterprise sub-processors under strict confidentiality and security agreements:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Cloud &amp; Computing Infrastructure:</strong> Secure cloud providers hosting our backend services and encrypted databases.
              </li>
              <li>
                <strong>Search &amp; Web Diagnostic APIs:</strong> Specialized indexing services (e.g. Serper, Apify) to verify live property URLs and neighbourhood search demand.
              </li>
              <li>
                <strong>Enterprise Machine Learning Systems:</strong> Secure cloud API processing for semantic keyword analysis and copy generation. We do not sell corporate client data or use private hotel submissions to train public foundation models.
              </li>
              <li>
                <strong>Contact &amp; Form Routing:</strong> Formspree for encrypted routing of partner applications and access enquiries.
              </li>
            </ul>

            <h3 style={{ color: '#00e5ff', fontSize: '1.25rem', marginTop: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>6. International Data Transfers</h3>
            <p>
              Where data is transferred outside the UK or European Economic Area (EEA), we ensure appropriate safeguards are in place, including UK International Data Transfer Agreements (IDTA) or EU Standard Contractual Clauses (SCCs), ensuring an equivalent standard of protection.
            </p>

            <h3 style={{ color: '#00e5ff', fontSize: '1.25rem', marginTop: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>7. Your Rights Under UK GDPR</h3>
            <p>
              As a data subject, you hold legal rights regarding your personal information, including:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>The right to access personal data we hold about you</li>
              <li>The right to request rectification of inaccurate information</li>
              <li>The right to request erasure of your data (“right to be forgotten”)</li>
              <li>The right to restrict or object to the processing of your data</li>
              <li>The right to lodge a complaint with the UK Information Commissioner's Office (ICO)</li>
            </ul>

            <h3 style={{ color: '#00e5ff', fontSize: '1.25rem', marginTop: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>8. Contact Us</h3>
            <p>
              To exercise any of your data protection rights or enquire about our processing practices, please contact us at <strong>alex@travelvrse.com</strong>.
            </p>
          </div>
        </div>

      </div>
    </Layout>
  );
}
