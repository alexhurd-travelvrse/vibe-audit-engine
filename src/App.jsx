import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import VibeDimensionsSection from './components/VibeDimensionsSection';
import HookTeaserSection from './components/HookTeaserSection';
import BlogJournal from './components/BlogJournal';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import BarcelonaPage from './pages/BarcelonaPage';
import PartnerPage from './pages/PartnerPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import VibeApiDemoPage from './pages/VibeApiDemoPage';
import WtmMobileDeckPage from './pages/WtmMobileDeckPage';
import VibeInsightsPage from './pages/VibeInsightsPage';
import VibeInsightsDirectoryPage from './pages/VibeInsightsDirectoryPage';
import B2BLeadGenOnboarding from './B2BLeadGenOnboarding';
import './B2BLeadGenOnboarding.css';

// ScrollToTop component ensures we start at the top when navigating between pages
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const OwnerModeBanner = () => {
  const location = useLocation();
  const [showModal, setShowModal] = React.useState(false);
  const [isBlocked, setIsBlocked] = React.useState(true);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (
      params.get('ignore_analytics') === 'true' ||
      params.get('me') === 'true' ||
      params.get('notrack') === 'true'
    ) {
      if (typeof window.__setVercelAnalyticsIgnore === 'function') {
        window.__setVercelAnalyticsIgnore(true);
      } else {
        localStorage.setItem('ignore_analytics', 'true');
        document.cookie = 'ignore_analytics=true; path=/; max-age=315360000; SameSite=Lax';
      }
      setIsBlocked(true);
      setShowModal(true);
    } else if (params.get('ignore_analytics') === 'false') {
      if (typeof window.__setVercelAnalyticsIgnore === 'function') {
        window.__setVercelAnalyticsIgnore(false);
      } else {
        localStorage.removeItem('ignore_analytics');
        document.cookie = 'ignore_analytics=; path=/; max-age=0; SameSite=Lax';
      }
      setIsBlocked(false);
      setShowModal(true);
    }
  }, [location.search]);

  if (!showModal) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: 'rgba(7, 9, 14, 0.88)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '520px', width: '100%', background: 'rgba(15, 23, 42, 0.98)', border: `1px solid ${isBlocked ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`, borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.7)', color: '#f8fafc' }}>
        <div style={{ fontSize: '42px', marginBottom: '12px' }}>{isBlocked ? '🛡️' : '📡'}</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px', color: '#f8fafc' }}>
          {isBlocked ? 'Owner Mode Active: Your Traffic Is Blocked' : 'Analytics Tracking Re-Enabled'}
        </h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
          {isBlocked
            ? 'This browser is now permanently excluded from Vercel Analytics across both root and www domains (via 10-year root-domain cookie + localStorage + network beacon interceptor).'
            : 'This browser will now be counted in Vercel Analytics like a standard visitor.'}
        </p>
        <button
          onClick={() => setShowModal(false)}
          style={{ padding: '10px 24px', borderRadius: '8px', background: '#10b981', color: '#052e16', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '14px' }}
        >
          Got It, Continue →
        </button>
      </div>
    </div>
  );
};

const shouldDropAnalyticsEvent = () => {
  if (typeof window === 'undefined') return false;
  if (typeof window.__shouldBlockVercelAnalytics === 'function') {
    return window.__shouldBlockVercelAnalytics();
  }
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('ignore_analytics') === 'true' || urlParams.get('me') === 'true') {
    localStorage.setItem('ignore_analytics', 'true');
  } else if (urlParams.get('ignore_analytics') === 'false') {
    localStorage.removeItem('ignore_analytics');
  }
  if (
    localStorage.getItem('ignore_analytics') === 'true' ||
    document.cookie.includes('ignore_analytics=true')
  ) {
    return true;
  }
  const ua = navigator.userAgent || '';
  if (
    navigator.webdriver === true ||
    /HeadlessChrome|PhantomJS|Playwright|Puppeteer|Slurp|bingbot|AhrefsBot|SemrushBot|Bytespider|GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|YandexBot|Baiduspider|DotBot|MJ12bot|Prerender|vercel-screenshot|Lighthouse|PageSpeed/i.test(ua)
  ) {
    return true;
  }
  if (
    ua.includes('Linux x86_64') &&
    ((window.outerWidth === 0 && window.outerHeight === 0) || !navigator.languages || navigator.languages.length === 0)
  ) {
    return true;
  }
  return false;
};

const IgnoreAnalyticsPage = () => {
  const [isBlocked, setIsBlocked] = React.useState(true);

  React.useEffect(() => {
    if (typeof window.__setVercelAnalyticsIgnore === 'function') {
      window.__setVercelAnalyticsIgnore(true);
    } else {
      localStorage.setItem('ignore_analytics', 'true');
      document.cookie = 'ignore_analytics=true; path=/; max-age=315360000; SameSite=Lax';
    }
    setIsBlocked(true);
  }, []);

  const toggleBlock = (enable) => {
    if (typeof window.__setVercelAnalyticsIgnore === 'function') {
      window.__setVercelAnalyticsIgnore(enable);
    } else if (enable) {
      localStorage.setItem('ignore_analytics', 'true');
      document.cookie = 'ignore_analytics=true; path=/; max-age=315360000; SameSite=Lax';
    } else {
      localStorage.removeItem('ignore_analytics');
      document.cookie = 'ignore_analytics=; path=/; max-age=0; SameSite=Lax';
    }
    setIsBlocked(enable);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#07090e', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '520px', width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: `1px solid ${isBlocked ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`, borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        <div style={{ fontSize: '42px', marginBottom: '12px' }}>{isBlocked ? '🛡️' : '📡'}</div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>
          {isBlocked ? 'Owner Mode Active: Your Traffic Is Blocked' : 'Analytics Tracking Re-Enabled'}
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
          {isBlocked
            ? 'This browser is now permanently excluded from Vercel Analytics across both root and www domains (via 10-year root-domain cookie + localStorage + network beacon interceptor).'
            : 'This browser will now be counted in Vercel Analytics like a standard visitor.'}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/" style={{ padding: '10px 20px', borderRadius: '8px', background: '#10b981', color: '#052e16', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
            Return to Homepage →
          </a>
          <button
            onClick={() => toggleBlock(!isBlocked)}
            style={{ padding: '10px 18px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', cursor: 'pointer', fontSize: '13px' }}
          >
            {isBlocked ? 'Re-enable tracking on this device' : 'Block my traffic again'}
          </button>
        </div>
      </div>
    </div>
  );
};

const B2BHome = () => {
  return (
    <Layout>
      {/* 1. Hero Section (The Photo Wedge Hook & Frictionless Input) */}
      <Hero />

      {/* 2. Vibe Signatures: The 8 Real-World Signals */}
      <VibeDimensionsSection />

      {/* 3. The 2-Step Conversion Engine: OTA Photos + Multi-Channel */}
      <HookTeaserSection />

      {/* 4. Research & Substack Journal */}
      <BlogJournal />

      {/* 5. Team Section */}
      <TeamSection />
      
      {/* 6. Footer */}
      <Footer />
    </Layout>
  );
};

const VibeInsightsDirectoryRoutePage = () => (
  <Layout>
    <VibeInsightsDirectoryPage />
    <Footer />
  </Layout>
);

const VibeInsightsRoutePage = () => (
  <Layout>
    <VibeInsightsPage />
    <Footer />
  </Layout>
);

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <OwnerModeBanner />
        <Routes>
          <Route path="/" element={<B2BHome />} />
          <Route path="/vibe-insights" element={<VibeInsightsDirectoryRoutePage />} />
          <Route path="/vibe-insights/:slug" element={<VibeInsightsRoutePage />} />
          <Route path="/research/:slug" element={<VibeInsightsRoutePage />} />
          <Route path="/ignore-me" element={<IgnoreAnalyticsPage />} />
          <Route path="/notrack" element={<IgnoreAnalyticsPage />} />
          <Route path="/audit" element={<B2BLeadGenOnboarding initialStep="input" />} />
          <Route path="/vibe-audit" element={<B2BLeadGenOnboarding initialStep="input" />} />
          <Route path="/vibe-api" element={<VibeApiDemoPage />} />
          <Route path="/vibe-api/travel-curious" element={<VibeApiDemoPage />} />
          <Route path="/wtm" element={<WtmMobileDeckPage />} />
          <Route path="/pocket" element={<WtmMobileDeckPage />} />
          <Route path="/tui-zora" element={<WtmMobileDeckPage defaultDemo="tui-zora" />} />
          <Route path="/tui" element={<WtmMobileDeckPage defaultDemo="tui-zora" />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/barcelona" element={<BarcelonaPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/marketplace" element={<Navigate to="/" replace />} />
          <Route path="/creator" element={<Navigate to="/" replace />} />
          <Route path="/creator-portal" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Analytics
        beforeSend={(event) => {
          if (shouldDropAnalyticsEvent()) {
            return null;
          }
          return event;
        }}
      />
    </HelmetProvider>
  );
};

export default App;
