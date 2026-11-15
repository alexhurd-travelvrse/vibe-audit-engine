import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { Shield, Cookie, CheckCircle2, XCircle, Sliders, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicyPage = () => {
  const [consentStatus, setConsentStatus] = useState('accepted');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('atmosvibe_cookie_consent');
    if (saved === 'rejected') {
      setConsentStatus('rejected');
    } else {
      setConsentStatus('accepted');
    }
  }, []);

  const updateConsent = (status) => {
    localStorage.setItem('atmosvibe_cookie_consent', status);
    setConsentStatus(status);
    if (status === 'rejected') {
      if (typeof window.__setVercelAnalyticsIgnore === 'function') {
        window.__setVercelAnalyticsIgnore(true);
      }
      setToastMessage('Non-essential analytics tracking disabled on this browser.');
    } else {
      if (typeof window.__setVercelAnalyticsIgnore === 'function') {
        window.__setVercelAnalyticsIgnore(false);
      }
      setToastMessage('Analytics cookies and performance telemetry enabled.');
    }
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <Layout>
      <Helmet>
        <title>Cookie Policy | AtmosVibe</title>
        <meta
          name="description"
          content="Learn about how AtmosVibe uses cookies, local storage, and anonymous telemetry across our B2B hospitality diagnostic and Vibe Signature platform."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section
        style={{
          background: 'linear-gradient(180deg, #050b14 0%, #0a1324 50%, #07090e 100%)',
          color: '#f8fafc',
          padding: '60px 20px 100px 20px',
          minHeight: '85vh',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          {/* Breadcrumb / Return */}
          <div style={{ marginBottom: '32px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#38bdf8',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={16} /> Return to Home
            </Link>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '48px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              <Cookie size={16} /> Compliance &amp; Privacy Transparency
            </div>
            <h1 style={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
              AtmosVibe Cookie Policy
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>
              Last updated: November 2026 &bull; Compliant with UK PECR, UK GDPR &amp; EU ePrivacy Directive
            </p>
          </div>

          {/* Interactive Consent Management Box */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '16px',
              padding: '24px 28px',
              marginBottom: '48px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Sliders size={22} color="#38bdf8" />
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Your Current Preference</h2>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              You have full control over non-essential performance tracking on this device. Essential storage required
              for security, audit session state, and demo access remains active.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => updateConsent('accepted')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: consentStatus === 'accepted' ? '#10b981' : 'rgba(255,255,255,0.06)',
                  color: consentStatus === 'accepted' ? '#042f1a' : '#cbd5e1',
                  border: consentStatus === 'accepted' ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.15)',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <CheckCircle2 size={16} /> Accept All (Recommended)
              </button>

              <button
                onClick={() => updateConsent('rejected')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: consentStatus === 'rejected' ? '#ef4444' : 'rgba(255,255,255,0.06)',
                  color: consentStatus === 'rejected' ? '#ffffff' : '#cbd5e1',
                  border: consentStatus === 'rejected' ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <XCircle size={16} /> Essential Only (Decline Analytics)
              </button>

              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                Status:{' '}
                <strong style={{ color: consentStatus === 'accepted' ? '#34d399' : '#f87171' }}>
                  {consentStatus === 'accepted' ? 'All Cookies Accepted' : 'Essential Only (Analytics Blocked)'}
                </strong>
              </span>
            </div>

            {toastMessage && (
              <div
                style={{
                  marginTop: '16px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                {toastMessage}
              </div>
            )}
          </div>

          {/* Section 1: Introduction */}
          <div style={{ marginBottom: '40px', lineHeight: 1.7, fontSize: '15px', color: '#cbd5e1' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              1. What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies are small data files placed on your browser or device when you visit a website. In addition to
              traditional HTTP cookies, modern web applications make use of browser storage technologies such as{' '}
              <strong style={{ color: '#f8fafc' }}>HTML5 LocalStorage</strong> and{' '}
              <strong style={{ color: '#f8fafc' }}>SessionStorage</strong> to store user preferences, state, and security
              tokens safely on your local device.
            </p>
            <p>
              The TravelVerse Ltd, trading as <strong style={{ color: '#f8fafc' }}>AtmosVibe</strong> and{' '}
              <strong style={{ color: '#f8fafc' }}>Travelvrse</strong> ("we", "our", or "us"), respects your privacy. We
              strictly minimise the data we store on your device and do not use invasive third-party cross-site
              advertising cookies.
            </p>
          </div>

          {/* Section 2: Categories */}
          <div style={{ marginBottom: '40px', lineHeight: 1.7, fontSize: '15px', color: '#cbd5e1' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              2. How AtmosVibe Uses Storage Technologies
            </h2>
            <p>We classify the storage mechanisms used on this site into the following categories:</p>

            <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Shield size={18} color="#34d399" />
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                    A. Strictly Necessary (Essential)
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
                  These storage elements are essential for the website to function securely and cannot be disabled in our
                  systems. For example, when unlocking a property audit dossier or accessing the Vibe API sandbox,
                  local storage maintains your unlocked state without transmitting personal credentials across third-party trackers.
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Cookie size={18} color="#38bdf8" />
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                    B. Performance &amp; Analytics (Non-Essential)
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
                  We utilise lightweight performance telemetry provided by <strong style={{ color: '#cbd5e1' }}>Vercel Analytics</strong> to
                  measure Core Web Vitals (speed, page load latency, layout stability) and aggregate page impressions. Vercel
                  Analytics does not sell your data, does not track you across external sites, and anonymises IP data. You can opt out
                  at any time using the toggle above or the banner.
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Sliders size={18} color="#a78bfa" />
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                    C. Audit &amp; Sandbox Session State (Client-Side)
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
                  When you run a property Vibe Snapshot or unlock the Vibe API demo, your session state is stored locally
                  in your browser's local storage so you do not have to re-submit forms during the same session.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Cookie Inventory Table */}
          <div style={{ marginBottom: '40px', lineHeight: 1.7, fontSize: '15px', color: '#cbd5e1' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              3. Inventory of Cookies and Local Storage
            </h2>

            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontSize: '13px',
                  background: 'rgba(15, 23, 42, 0.5)'
                }}
              >
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '14px 16px', color: '#f8fafc', fontWeight: 600 }}>Identifier</th>
                    <th style={{ padding: '14px 16px', color: '#f8fafc', fontWeight: 600 }}>Provider</th>
                    <th style={{ padding: '14px 16px', color: '#f8fafc', fontWeight: 600 }}>Category</th>
                    <th style={{ padding: '14px 16px', color: '#f8fafc', fontWeight: 600 }}>Purpose</th>
                    <th style={{ padding: '14px 16px', color: '#f8fafc', fontWeight: 600 }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#38bdf8' }}>atmosvibe_cookie_consent</td>
                    <td style={{ padding: '14px 16px' }}>AtmosVibe</td>
                    <td style={{ padding: '14px 16px' }}>Preferences</td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8' }}>Stores your acceptance or rejection of non-essential analytics cookies.</td>
                    <td style={{ padding: '14px 16px' }}>1 Year (LocalStorage)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#38bdf8' }}>atmosvibe_tc_vibe_api_unlocked</td>
                    <td style={{ padding: '14px 16px' }}>AtmosVibe</td>
                    <td style={{ padding: '14px 16px' }}>Strictly Necessary</td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8' }}>Remembers unlocked state on the live Vibe API demo sandbox.</td>
                    <td style={{ padding: '14px 16px' }}>Persistent (LocalStorage)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#38bdf8' }}>ignore_analytics</td>
                    <td style={{ padding: '14px 16px' }}>AtmosVibe</td>
                    <td style={{ padding: '14px 16px' }}>Preferences</td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8' }}>Allows developers and testers to permanently block self-traffic from telemetry.</td>
                    <td style={{ padding: '14px 16px' }}>10 Years (Cookie &amp; LocalStorage)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#38bdf8' }}>_vercel_insights</td>
                    <td style={{ padding: '14px 16px' }}>Vercel Inc.</td>
                    <td style={{ padding: '14px 16px' }}>Analytics</td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8' }}>Aggregated page metrics and Core Web Vitals telemetry. No cross-site profiling.</td>
                    <td style={{ padding: '14px 16px' }}>Per Session Beacon</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Managing Through Browsers */}
          <div style={{ marginBottom: '40px', lineHeight: 1.7, fontSize: '15px', color: '#cbd5e1' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              4. How to Manage Cookies in Your Browser
            </h2>
            <p>
              In addition to using our preference manager above, most web browsers allow you to control cookies through their
              settings. You can set your browser to notify you when you receive a cookie, or to reject cookies altogether.
            </p>
            <ul style={{ paddingLeft: '24px', display: 'grid', gap: '8px' }}>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#38bdf8', textDecoration: 'none' }}
                >
                  Manage cookies in Google Chrome &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#38bdf8', textDecoration: 'none' }}
                >
                  Manage cookies in Apple Safari &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#38bdf8', textDecoration: 'none' }}
                >
                  Manage cookies in Mozilla Firefox &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#38bdf8', textDecoration: 'none' }}
                >
                  Manage cookies in Microsoft Edge &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Section 5: Contact */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px',
              fontSize: '15px',
              color: '#94a3b8'
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
              5. Questions or Enquiries
            </h2>
            <p style={{ margin: '0 0 12px 0' }}>
              If you have any questions regarding this Cookie Policy or our data handling practices, please contact:
            </p>
            <p style={{ margin: 0, color: '#cbd5e1' }}>
              <strong style={{ color: '#f8fafc' }}>The TravelVerse Ltd (AtmosVibe Data Protection Lead: Alex Hurd)</strong><br />
              Email:{' '}
              <a href="mailto:alex@travelvrse.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>
                alex@travelvrse.com
              </a>
              <br />
              Related Policies:{' '}
              <Link
                to="/privacy"
                style={{ color: '#38bdf8', textDecoration: 'none', marginRight: '16px' }}
              >
                Privacy Policy &rarr;
              </Link>
              <Link
                to="/terms"
                style={{ color: '#38bdf8', textDecoration: 'none' }}
              >
                Terms &amp; Conditions &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
};

export default CookiePolicyPage;
