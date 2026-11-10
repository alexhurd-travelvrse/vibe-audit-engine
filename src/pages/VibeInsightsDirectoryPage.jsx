import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  MapPin,
  Building2,
  Compass,
  Search,
  Lock,
} from 'lucide-react';
import { LONDON_10_STUDY_META, LONDON_10_HOTELS } from '../data/london10StudyData';
import './VibeInsights.css';

/**
 * Clean Category -> Subcategory B2B Research Directory
 * Minimalist category headers + direct report rows.
 */
const B2B_SECTORS = [
  {
    id: 'ota-distribution',
    number: '01',
    categoryTitle: 'Online Travel & Distribution (OTAs)',
    icon: BarChart3,
    subcategories: [
      {
        id: 'london-boutique-ota-gap',
        subcategoryLabel: 'UK Lifestyle Hospitality • Benchmark Study',
        code: LONDON_10_STUDY_META.studyCode,
        date: 'Nov 2026',
        title: LONDON_10_STUDY_META.title,
        summary:
          'AtmosVibe benchmark of 10 flagship London lifestyle hotels across Physical Presence (92.5), Owned Digital — Own Property Vibe (88.4) vs. Local Destination Vibe (45.5), and Live Booking.com Top-5 Hero Images (56.5).',
        status: 'Published Report',
        statusType: 'published',
        href: '/vibe-insights/london-boutique-ota-gap',
        metaPills: [
          '92.5 Physical Vibe',
          '88.4 Own Vibe / 45.5 Local Vibe',
          '56.5 OTA Top-5 Score',
          'n = 10 London Hotels',
        ],
      },
    ],
  },
  {
    id: 'hotels-lodging',
    number: '02',
    categoryTitle: 'Hotels & Lodging',
    icon: Building2,
    subcategories: [
      {
        id: 'london-lifestyle-cohort-10',
        subcategoryLabel: 'London Lifestyle Hotel Cohort (10 Audited Properties)',
        code: 'AV-SIG-LON-01..10',
        date: 'Nov 2026',
        title: 'London Top 10 Lifestyle Icons — Claimable Property Audit Dossiers',
        summary:
          'Select any of the 10 audited London properties below to inspect its live 5-slot Booking.com gallery diagnosis or claim its full commercial replacement dossier:',
        status: '10 Dossiers Live',
        statusType: 'live',
        href: '/vibe-insights/london-boutique-ota-gap#london-10-scoreboard',
        metaPills: ['10 Claimable Hotel Reports', 'Extranet Re-Order Sheets'],
        quickLinks: LONDON_10_HOTELS.map((h) => ({
          label: h.name,
          score: h.mathVibeScore,
          ota: h.otaTop5Score,
          href: `/vibe-insights/london-boutique-ota-gap?hotel=${h.id}&claim=1`,
        })),
      },
    ],
  },
  {
    id: 'destinations-cities',
    number: '03',
    categoryTitle: 'City & Area Vibe Reports',
    icon: MapPin,
    subcategories: [],
  },
  {
    id: 'tours-cruises-attractions',
    number: '04',
    categoryTitle: 'Tours, Cruises & Attractions',
    icon: Compass,
    subcategories: [],
  },
];

export default function VibeInsightsDirectoryPage() {
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSectors = useMemo(() => {
    const base =
      selectedSector === 'all'
        ? B2B_SECTORS
        : B2B_SECTORS.filter((s) => s.id === selectedSector);

    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();

    return base.filter(
      (sec) =>
        sec.categoryTitle.toLowerCase().includes(q) ||
        sec.subcategories.some(
          (sub) =>
            sub.title.toLowerCase().includes(q) ||
            sub.summary.toLowerCase().includes(q) ||
            sub.subcategoryLabel.toLowerCase().includes(q) ||
            (sub.quickLinks &&
              sub.quickLinks.some((ql) => ql.label.toLowerCase().includes(q)))
        )
    );
  }, [selectedSector, searchQuery]);

  return (
    <div className="vi-page">
      <div className="vi-container" style={{ paddingTop: '2.5rem' }}>
        <div className="vi-directory-layout" style={{ paddingTop: 0 }}>
          {/* Left Sticky Category Spine */}
          <aside className="vi-sidebar">
            <div className="vi-sidebar-heading">Vibe Insights Directory</div>

            <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
              <Search
                size={13}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports or hotels..."
                className="vi-input"
                style={{ paddingLeft: '32px', minHeight: '36px', fontSize: '0.74rem' }}
              />
            </div>

            <div className="vi-nav-list">
              <button
                type="button"
                onClick={() => setSelectedSector('all')}
                className={`vi-nav-btn ${selectedSector === 'all' ? 'active' : ''}`}
              >
                <span>
                  <span className="vi-nav-num">ALL</span>
                  All Categories
                </span>
                <span className="vi-nav-count">04</span>
              </button>

              {B2B_SECTORS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSelectedSector(sec.id)}
                  className={`vi-nav-btn ${selectedSector === sec.id ? 'active' : ''}`}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span className="vi-nav-num">{sec.number}</span>
                    {sec.categoryTitle}
                  </span>
                  <span className="vi-nav-count">
                    {sec.subcategories.length > 0 ? sec.subcategories.length : 'Soon'}
                  </span>
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.95rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 215, 0, 0.06)',
                border: '1px solid rgba(255, 215, 0, 0.25)',
              }}
            >
              <div
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#ffd700',
                  marginBottom: '4px',
                }}
              >
                SUBSTACK BRIEFING
              </div>
              <p
                style={{
                  fontSize: '11.5px',
                  color: '#cbd5e1',
                  lineHeight: 1.5,
                  margin: '0 0 0.65rem',
                }}
              >
                Get new city &amp; hotel Vibe Signature benchmarks delivered by email.
              </p>
              <a
                href={LONDON_10_STUDY_META.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#00e5ff',
                  textDecoration: 'none',
                }}
              >
                <span>Subscribe on Substack</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </aside>

          {/* Right Column: Clean Category Header -> Report Rows */}
          <div className="vi-category-feed">
            {filteredSectors.map((sector) => {
              const IconComponent = sector.icon;
              return (
                <section key={sector.id} className="vi-category-block">
                  {/* Single-Line Minimal Category Bar */}
                  <div
                    className="vi-category-header"
                    style={{
                      padding: '1.15rem 1.75rem',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="vi-category-kicker" style={{ marginBottom: 0, fontSize: '0.8rem' }}>
                      <IconComponent size={15} />
                      <span>{sector.categoryTitle}</span>
                    </div>
                  </div>

                  {/* Subcategories / Reports inside this Category */}
                  {sector.subcategories.length > 0 ? (
                    <div className="vi-subcategory-list">
                      {sector.subcategories.map((sub) => (
                        <div key={sub.id} className="vi-subcategory-item">
                          <Link to={sub.href} className="vi-sub-link">
                            <div className="vi-sub-top-bar">
                              <div className="vi-sub-breadcrumb">
                                <span>{sub.subcategoryLabel}</span>
                                <span className="vi-sub-code">
                                  • {sub.code} • {sub.date}
                                </span>
                              </div>

                              <span
                                className={`vi-status-pill ${
                                  sub.statusType === 'published'
                                    ? 'vi-status-pill--published'
                                    : 'vi-status-pill--live'
                                }`}
                              >
                                {sub.status}
                              </span>
                            </div>

                            <div className="vi-sub-title-row">
                              <h3 className="vi-sub-title">{sub.title}</h3>
                              <ArrowUpRight
                                size={18}
                                style={{ color: '#00e5ff', flexShrink: 0, marginTop: '2px' }}
                              />
                            </div>

                            <p className="vi-sub-summary">{sub.summary}</p>

                            <div className="vi-sub-pills-row">
                              <div className="vi-sub-pills">
                                {sub.metaPills.map((pill, i) => (
                                  <span key={i} className="vi-data-pill">
                                    {pill}
                                  </span>
                                ))}
                              </div>
                              <span className="vi-open-report-cta">
                                <span>Open Report</span>
                                <ArrowRight size={13} />
                              </span>
                            </div>
                          </Link>

                          {/* Clickable Hotel Dossier Chips inside Category 02 */}
                          {sub.quickLinks && (
                            <div className="vi-quick-links-grid">
                              {sub.quickLinks.map((ql) => (
                                <Link
                                  key={ql.label}
                                  to={ql.href}
                                  className="vi-hotel-chip"
                                  title={`Claim ${ql.label} Report (Real Vibe ${ql.score} vs OTA ${ql.ota})`}
                                >
                                  <Lock size={11} style={{ color: '#ffd700' }} />
                                  <span>{ql.label}</span>
                                  <span className="vi-hotel-chip-score">{ql.score}</span>
                                  <span style={{ color: '#64748b', fontSize: '10px' }}>
                                    / OTA {ql.ota}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '1.15rem 1.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        color: 'rgba(230, 241, 255, 0.55)',
                        fontSize: '0.84rem',
                      }}
                    >
                      <span>
                        No reports published in this category yet — initial releases scheduled for Q4 2026.
                      </span>
                      <span className="vi-status-pill vi-status-pill--pipeline">
                        Forthcoming Category
                      </span>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
