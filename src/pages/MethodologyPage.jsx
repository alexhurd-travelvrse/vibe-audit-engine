import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  REGISTRY_URLS,
  ATMOSVIBE_METHODOLOGY_DATA,
  SOUTH_BANK_DESTINATION_SIGNATURE,
  buildMethodologyJsonLd,
} from '../data/southBankRegistryData';
import './VibeInsights.css';

export default function MethodologyPage() {
  const jsonLd = useMemo(() => buildMethodologyJsonLd(), []);

  return (
    <div className="vi-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="vi-container" style={{ paddingTop: '2.25rem', paddingBottom: '3.5rem' }}>
        <div
          className="vi-eyebrow-row"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Link to="/vibe-insights" className="vi-back-link">
              ← Vibe Insights Directory
            </Link>
            <Link
              to="/registry/london-south-bank"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#00e5ff',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                background: 'rgba(0, 229, 255, 0.08)',
              }}
            >
              Inspect London South Bank (SE1) Canonical Registry →
            </Link>
          </div>
        </div>

        <section className="vi-section" style={{ paddingTop: 0 }}>
          <div className="vi-category-block" style={{ padding: '2.5rem' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#00e5ff',
                marginBottom: '0.6rem',
              }}
            >
              ATMOSVIBE VERIFICATION PROTOCOL • {ATMOSVIBE_METHODOLOGY_DATA.code} • UPDATED{' '}
              {ATMOSVIBE_METHODOLOGY_DATA.lastUpdated}
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.65rem, 2.8vw, 2.3rem)',
                fontWeight: 900,
                color: '#ffffff',
                margin: '0 0 1rem',
                lineHeight: 1.22,
              }}
            >
              {ATMOSVIBE_METHODOLOGY_DATA.title}
            </h1>

            <p style={{ fontSize: '0.96rem', color: '#cbd5e1', lineHeight: 1.72, margin: '0 0 2rem', maxWidth: '900px' }}>
              {ATMOSVIBE_METHODOLOGY_DATA.subtitle}
            </p>

            <div style={{ display: 'grid', gap: '1.15rem' }}>
              {ATMOSVIBE_METHODOLOGY_DATA.pillars.map((pillar) => (
                <div key={pillar.id} className="vi-diag-panel" style={{ padding: '1.35rem 1.5rem' }}>
                  <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem' }}>
                    {pillar.title}
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                    {pillar.summary}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '1.75rem',
                padding: '1.35rem 1.5rem',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.07)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: '6px' }}>
                Editorial Independence &amp; UK CMA / DMCC Act Compliance
              </div>
              <p style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                {ATMOSVIBE_METHODOLOGY_DATA.editorialDisclosure}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
