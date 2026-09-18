import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Hero from './components/Hero';
import VibeAuditSearchSection from './components/VibeAuditSearchSection';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import GoToMarketSection from './components/GoToMarketSection';
import BlogJournal from './components/BlogJournal';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import RevenueSection from './components/RevenueSection';
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
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. Vibe Conversion Engine (ProblemSection) */}
      <ProblemSection />
      
      {/* 4. Increase Direct Revenue */}
      <RevenueSection />
      
      {/* 5. Friction Free Implementation */}
      <HowItWorksSection />
      
      {/* 6. Go To Market */}
      <GoToMarketSection />
      
      {/* 7. Journal */}
      <BlogJournal />
      
      {/* 8. Team */}
      <TeamSection />
      
      {/* 9. Footer */}
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
    </HelmetProvider>
  );
};

export default App;
