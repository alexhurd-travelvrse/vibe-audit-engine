const fs = require('fs');
let code = fs.readFileSync('src/components/BookingOtaAuditCard.jsx', 'utf8');

// 1. Add photographicGaps variable
if (!code.includes('const photographicGaps =')) {
  code = code.replace(
    'const copyRewrite = otaData.anti_commodity_copy_rewrite || {};',
    'const copyRewrite = otaData.anti_commodity_copy_rewrite || {};\n  const photographicGaps = otaData.photographic_gap_analysis || [];'
  );
}

// 2. Insert Photographic Gap section before Anti-Commodity Copy Rewrite
const gapSection = `
      {/* SECTION: Photographic Gap Analysis (Creative Commissioning Scope) */}
      {photographicGaps && photographicGaps.length > 0 && (
        <div style={{
          marginBottom: '2.5rem',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)',
          borderRadius: '1.25rem',
          padding: '1.75rem',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Camera size={13} /> Visual Portfolio Gap Scope • Creative Commissioning
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '4px 0 0 0' }}>
                High-Conversion Visual Assets Missing from Official Channels
              </h4>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', maxWidth: '380px', lineHeight: 1.4 }}>
              Beyond reordering existing photography, these missing shots capture high-value unmet guest search demand to lift direct ADR.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {photographicGaps.map((gap, gIdx) => (
              <div 
                key={gIdx}
                style={{
                  background: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
                    <span style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#fbbf24',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.05em'
                    }}>
                      {gap.category ? gap.category.replace(/_/g, ' ') : 'VISUAL GAP'}
                    </span>
                    {gap.projected_adr_impact && (
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#34d399',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {gap.projected_adr_impact}
                      </span>
                    )}
                  </div>

                  <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                    {gap.missing_shot_title}
                  </h5>

                  <p style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                    {gap.why_needed}
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '11px',
                  color: '#00e5ff',
                  lineHeight: 1.4
                }}>
                  <strong style={{ color: '#00e5ff', fontSize: '10px', textTransform: 'uppercase', display: 'block', marginBottom: '2px', letterSpacing: '0.05em' }}>
                    🎬 Framing & Photometrics:
                  </strong>
                  {gap.recommended_framing_and_lighting}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
`;

if (!code.includes('Visual Portfolio Gap Scope • Creative Commissioning')) {
  code = code.replace(
    '{/* Anti-Commodity Copy Rewrite (PRO / LOGGED-IN ONLY) */}',
    gapSection.trim() + '\n\n      {/* Anti-Commodity Copy Rewrite (PRO / LOGGED-IN ONLY) */}'
  );
}

fs.writeFileSync('src/components/BookingOtaAuditCard.jsx', code, 'utf8');
console.log('Successfully updated BookingOtaAuditCard.jsx');
