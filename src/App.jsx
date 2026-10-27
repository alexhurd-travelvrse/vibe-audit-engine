import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import VibeDimensionsSection from './components/VibeDimensionsSection';
import HookTeaserSection from './components/HookTeaserSection';
import Footer from './components/Footer';
import MarketplacePage from './pages/MarketplacePage';
import BarcelonaPage from './pages/BarcelonaPage';
import PartnerPage from './pages/PartnerPage';
import CreatorPage from './pages/CreatorPage';
import CreatorPortal from './pages/CreatorPortal';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
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

const B2BHome = () => {
  return (
    <Layout>
      {/* 1. Hero Section (The Photo Wedge Hook & Frictionless Input) */}
      <Hero />

      {/* 2. Vibe Signatures: The 8 Real-World Signals */}
      <VibeDimensionsSection />

      {/* 3. The 2-Step Conversion Engine: OTA Photos + Multi-Channel */}
      <HookTeaserSection />
      
      {/* 4. Footer */}
      <Footer />
    </Layout>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<B2BHome />} />
          <Route path="/audit" element={<B2BLeadGenOnboarding initialStep="input" />} />
          <Route path="/vibe-audit" element={<B2BLeadGenOnboarding initialStep="input" />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/barcelona" element={<BarcelonaPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/creator" element={<CreatorPage />} />
          <Route path="/creator-portal" element={<CreatorPortal />} />
        </Routes>
      </Router>
      <Analytics
        beforeSend={(event) => {
          if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('ignore_analytics') === 'true') {
              localStorage.setItem('ignore_analytics', 'true');
            } else if (urlParams.get('ignore_analytics') === 'false') {
              localStorage.removeItem('ignore_analytics');
            }
            if (localStorage.getItem('ignore_analytics') === 'true') {
              return null; // Exclude event from tracking
            }
          }
          return event;
        }}
      />
    </HelmetProvider>
  );
};

export default App;
