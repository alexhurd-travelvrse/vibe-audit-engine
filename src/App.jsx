import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Hero from './components/Hero';
import VibeDimensionsSection from './components/VibeDimensionsSection';
import HookTeaserSection from './components/HookTeaserSection';
import DataApiSection from './components/DataApiSection';
import MarketsSection from './components/MarketsSection';
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

import { useAuthGate, AuthModals } from './components/GatedSectionAuth';

// ScrollToTop component ensures we start at the top when navigating between pages
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const B2BHome = () => {
  const { isUnlocked } = useAuthGate();
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpenRegister = () => setIsRegisterOpen(true);
    const handleOpenLogin = () => setIsLoginOpen(true);
    window.addEventListener('atmosvibe-open-register', handleOpenRegister);
    window.addEventListener('atmosvibe-open-login', handleOpenLogin);
    return () => {
      window.removeEventListener('atmosvibe-open-register', handleOpenRegister);
      window.removeEventListener('atmosvibe-open-login', handleOpenLogin);
    };
  }, []);

  return (
    <Layout>
      {/* 1. Hero Section (The Photo Wedge Hook & Frictionless Input) */}
      <Hero />

      {/* 2. Vibe Signatures: The 5 Sensory Dimensions & Gateway Blueprint */}
      <VibeDimensionsSection />

      {/* 3. The 2-Step Conversion Engine: OTA Photos + Multi-Channel */}
      <HookTeaserSection />

      {/* 3. Enterprise Vibe API & Vibe Insights (BEHIND LOGIN) */}
      {isUnlocked && (
        <>
          <DataApiSection />
          <MarketsSection />
        </>
      )}
      
      {/* 4. Footer */}
      <Footer />

      <AuthModals
        isRegisterOpen={isRegisterOpen}
        isLoginOpen={isLoginOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(false);
        }}
        onSuccess={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(false);
        }}
      />
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
    </HelmetProvider>
  );
};

export default App;
