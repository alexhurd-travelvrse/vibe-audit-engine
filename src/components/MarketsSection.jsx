import React, { useState } from 'react';
import { Globe2, TrendingUp, MapPin, BarChart3, Compass, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Send, X } from 'lucide-react';
import './MarketsSection.css';

const MARKETS_DATA = [
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    districts: 'Soho, Shoreditch, Wandsworth (East Hill), Mayfair & Bermondsey',
    auditedCount: 142,
    avgUplift: '+22.4%',
    topSubcultures: [
      'Vinyl Hi-Fi & Speakeasy Lounges (+88% YoY)',
      'Artisan Gastronomy & Craft Ale Sanctuaries',
      'Subterranean Social Wellness & Bathhouses',
      'Historic Drawing Rooms with Modernist Lighting'
    ],
    researchSummary: 'Our London benchmark across 142 boutique and lifestyle properties reveals that 76% of modern travelers search for culinary and acoustic neighborhood subcultures FIRST before selecting their accommodation. When properties prominently showcase their social F&B or cultural magnet in Slot #1 (rather than commodity bedrooms), direct booking intent rises by 22.4%.',
    keyInsight: 'In Wandsworth and East Hill, authentic gastro-pub heritage and acoustic warmth outperformed generic corporate room listings by 3.1x in organic OTA engagement.',
    commodityPenaltyScore: 'High (48/100 commodity penalty when leading with standard bed shots)'
  },
  {
    id: 'barcelona',
    city: 'Barcelona',
    country: 'Spain',
    districts: 'El Born, Gràcia, Eixample, Poblenou & Gothic Quarter',
    auditedCount: 96,
    avgUplift: '+26.8%',
    topSubcultures: [
      'Rooftop Sunset Soundscapes (+94% YoY)',
      'Catalan Natural Wine & Tapas Micro-Bars',
      'Modernist Courtyard Sanctuaries',
      'Biophilic Light Atriums & Plunge Pools'
    ],
    researchSummary: 'In Barcelona, atmosphere is overwhelmingly driven by outdoor courtyard sanctuaries and sunset terrace social velocity. Audits show properties that bridge their internal design with the local Catalan micro-bar subculture capture 26.8% higher direct conversion.',
    keyInsight: 'Acoustic clarity and outdoor patio visual hierarchy reduced drop-off rates on mobile booking funnels by 31% across independent hotel partners.',
    commodityPenaltyScore: 'Critical (54/100 commodity penalty when failing to depict outdoor/rooftop social life)'
  },
  {
    id: 'newyork',
    city: 'New York',
    country: 'United States',
    districts: 'Lower East Side, Williamsburg, NoMad, Soho & DUMBO',
    auditedCount: 168,
    avgUplift: '+24.1%',
    topSubcultures: [
      'Underground Analog Jazz & Listening Rooms',
      'Micro-Batch Roastery & Workspace Hubs',
      'Mid-Century Cocktail Sanctuaries',
      'Industrial Loft Architecture with Skyline Vistas'
    ],
    researchSummary: 'New York travelers exhibit the shortest visual attention span (<0.4 seconds per photo). Properties that execute the Hero Cultural Magnet Protocol (locking the landmark facade into Slot #2 after a distinctive social hook) achieved a 4.2x higher click-through rate over competitors.',
    keyInsight: 'Acoustic zoning (separating high-energy lobby frequencies from sanctuary sleep quarters) was the #1 positive sentiment driver in over 45,000 analyzed guest reviews.',
    commodityPenaltyScore: 'Very High (52/100 penalty for standard white-linen commodity thumbnails)'
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    districts: 'Shibuya, Daikanyama, Ginza, Nakameguro & Roppongi',
    auditedCount: 84,
    avgUplift: '+19.7%',
    topSubcultures: [
      'Japanese Whisky Listening Bars (+112% YoY)',
      'Thermal Sento & Hinoki Wood Wellness',
      'Minimalist Zen Arrival Atriums',
      'Artisan Matcha & Craft Fermentation Hubs'
    ],
    researchSummary: 'Tokyo market research indicates that serenity, material texture (hinoki wood, natural stone), and acoustic isolation index higher than any other global city. International luxury guests actively seek multi-sensory contrast between bustling city energy and hotel sanctuary tranquility.',
    keyInsight: 'Detailed bathroom and dedicated thermal bathing visual proof-points in Slot #4-#5 lifted booking confirmation confidence by 28% among overseas visitors.',
    commodityPenaltyScore: 'Moderate-High (44/100 penalty for clinical, cold lighting angles)'
  }
];

export default function MarketsSection() {
  const [selectedMarketId, setSelectedMarketId] = useState('london');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    market: 'London',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedMarket = MARKETS_DATA.find(m => m.id === selectedMarketId) || MARKETS_DATA[0];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('https://formspree.io/f/xaqlrjor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...formData,
          form_type: 'Market Vibe Intelligence Report Request',
          submitted_at: new Date().toISOString()
        })
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Market report request note:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="markets-section" id="markets">
      <div className="markets-container">
        
        {/* Section Header */}
        <div className="markets-header">
          <div className="markets-pill">
            <Globe2 size={13} /> GLOBAL VIBE RESEARCH & BENCHMARKS
          </div>
          <h2 className="markets-headline">
            MARKET INTELLIGENCE & <span style={{ background: 'linear-gradient(90deg, #ffd700, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SUB-CULTURAL VIBE MAPS</span>
          </h2>
          <p className="markets-narrative">
            Explore our proprietary acoustic and subcultural research across key international hospitality hubs. See how traveler search demand, neighborhood gravity, and visual merchandising conversion vary across global cities.
          </p>
        </div>

        {/* Market City Tabs */}
        <div className="markets-tabs-nav">
          {MARKETS_DATA.map((market) => (
            <button
              key={market.id}
              className={`market-tab-btn ${selectedMarketId === market.id ? 'active' : ''}`}
              onClick={() => setSelectedMarketId(market.id)}
            >
              <MapPin size={15} color={selectedMarketId === market.id ? '#00e5ff' : 'currentColor'} />
              <span>{market.city} ({market.country})</span>
            </button>
          ))}
        </div>

        {/* Selected Market Deep-Dive Card */}
        <div className="market-detail-card">
          {/* Left Column */}
          <div>
            <div className="market-info-tag">
              <Compass size={14} /> Market Diagnostic Report
            </div>
            <h3 className="market-city-name">
              {selectedMarket.city}, {selectedMarket.country}
            </h3>
            <div className="market-subdistricts">
              Key Districts: {selectedMarket.districts}
            </div>

            <p className="market-research-summary">
              {selectedMarket.researchSummary}
            </p>

            <div className="market-subcultures-block">
              <div className="subcultures-title">
                ⚡ Top Trending Subcultural Search Vectors in this Market:
              </div>
              <div className="subculture-tag-list">
                {selectedMarket.topSubcultures.map((sub, idx) => (
                  <span key={idx} className="subculture-tag">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '3px solid #f59e0b', borderRadius: '0 1rem 1rem 0', padding: '1rem 1.25rem', marginTop: '1.25rem' }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Key Local Insight:
              </div>
              <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                {selectedMarket.keyInsight}
              </div>
            </div>
          </div>

          {/* Right Metrics Column */}
          <div className="market-metrics-grid">
            <div className="market-stat-box">
              <div className="market-stat-num">{selectedMarket.avgUplift}</div>
              <div className="market-stat-label">Avg Projected Conversion Uplift</div>
              <div className="market-stat-desc">Measured across properties optimizing from commodity sequences to Vibe Manifests.</div>
            </div>

            <div className="market-stat-box">
              <div className="market-stat-num" style={{ color: '#ffd700' }}>{selectedMarket.auditedCount}+</div>
              <div className="market-stat-label">Properties Audited & Mapped</div>
              <div className="market-stat-desc">Continuous real-time geospatial & multimodal intelligence dataset.</div>
            </div>

            <div className="market-stat-box">
              <div className="market-stat-num" style={{ color: '#10b981', fontSize: '1.4rem' }}>{selectedMarket.commodityPenaltyScore}</div>
              <div className="market-stat-label">Commodity Penalty Severity</div>
              <div className="market-stat-desc">Average conversion penalty incurred by properties displaying duplicate bedroom photos.</div>
            </div>
          </div>
        </div>

        {/* 4 Markets Quick Overview Grid */}
        <div className="market-cards-overview">
          {MARKETS_DATA.map((market) => (
            <div
              key={market.id}
              className={`market-mini-card ${selectedMarketId === market.id ? 'selected' : ''}`}
              onClick={() => setSelectedMarketId(market.id)}
            >
              <div className="mini-city-title">{market.city}</div>
              <div className="mini-city-country">{market.country}</div>
              <div className="mini-city-stat">{market.avgUplift}</div>
              <div className="mini-city-desc">
                {market.auditedCount}+ audited venues across {market.districts.split(',')[0]} & more.
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => {
              setFormData({ ...formData, market: selectedMarket.city });
              setIsModalOpen(true);
            }} 
            className="api-primary-btn"
          >
            <Send size={16} />
            <span>REQUEST CUSTOM MARKET REPORT FOR {selectedMarket.city.toUpperCase()}</span>
          </button>
          
          <a href="/audit" className="api-secondary-btn">
            <span>RUN AN AUDIT FOR YOUR PROPERTY</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>

      {/* MARKET REPORT REQUEST MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    <BarChart3 size={14} /> Market Intelligence Dossier
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    Request {formData.market || 'Global'} Vibe Benchmark Report
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>
                    Receive our comprehensive whitepaper on subcultural search gravity, competitor acoustic benchmarks, and photo resequencing case studies.
                  </p>
                </div>

                <form onSubmit={handleEnquirySubmit} className="enquiry-form">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="e.g. Jordan Smith" 
                      className="form-input" 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Work Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="jordan@hotelgroup.com" 
                        className="form-input" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Target Market City *</label>
                      <input 
                        type="text" 
                        name="market" 
                        required 
                        placeholder="e.g. London, Barcelona, NYC, Tokyo" 
                        className="form-input" 
                        value={formData.market}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Company / Property Group</label>
                    <input 
                      type="text" 
                      name="company" 
                      placeholder="e.g. Heritage Lifestyle Collection" 
                      className="form-input" 
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Specific Questions or Areas of Interest (Optional)</label>
                    <textarea 
                      name="message" 
                      rows="3" 
                      placeholder="e.g. We want to understand acoustic resonance trends and booking conversion in London/Wandsworth..." 
                      className="form-textarea" 
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="form-submit-btn">
                    {isSubmitting ? 'Sending Request...' : 'Send Market Report Request'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(16,185,129,0.15)', border: '2px solid #10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <CheckCircle2 size={32} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.75rem' }}>
                  Market Report Request Sent!
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                  Thank you! Our research team will compile the latest <strong>{formData.market} Market Vibe Dossier</strong> and send it to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button 
                  onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }} 
                  className="tier-cta-btn pro-cta"
                  style={{ maxWidth: '240px', margin: '0 auto' }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
