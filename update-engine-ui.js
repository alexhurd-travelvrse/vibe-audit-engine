import fs from 'fs';

let content = fs.readFileSync('src/B2BLeadGenOnboarding.jsx', 'utf8');

// Replace Geographic Vibe Gap header with Top 6 Vibe Categories
content = content.replace('Geographic Vibe Gap', 'Top 6 Vibe Categories');

// Find and slice out Spatial Expansion Insight safely
const searchStart = content.indexOf('Spatial Expansion Insight');
if (searchStart !== -1) {
    const blockStart = content.lastIndexOf('<h4', searchStart);
    
    // The structure is:
    // <h4 ...> Spatial Expansion Insight </h4>
    // <div ...>
    //   ...
    //   {ExtendedRadiusSearch?.isVibeHotterElsewhere && (
    //     <div ...>
    //       ...
    //     </div>
    //   )}
    // </div>
    
    // So we want to find the exact `)}` and then the `</div>` that closes the outer div.
    let closingBrace = content.indexOf(')}', searchStart);
    let outerDivClose = content.indexOf('</div>', closingBrace);
    
    // We add 6 to include the `</div>` itself.
    const textToRemove = content.substring(blockStart, outerDivClose + 6);
    content = content.replace(textToRemove, '');
}

// Append Section B and C
const replacementString = `
                    </div>
                  );
                })}

                {/* SECTION B: Your Vibe Audit */}
                <div style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Search color="#ec4899" size={24} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Vibe Audit</h2>
                  </div>
                  <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '1rem' }}>
                     <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>Pending Service Spec</h3>
                     <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Auditing the top sub-cultures against website and social presence.</p>
                  </div>
                </div>

                {/* SECTION C: Showcase Your Vibe */}
                <div style={{ marginTop: '5rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Star color="#B5942D" size={24} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Showcase Your Vibe</h2>
                  </div>
                  <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '1rem', marginBottom: '3rem' }}>
                     <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>Pending Service Spec</h3>
                     <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Travelvrse tour recommendations to be generated here.</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                     <button className="launch-button" style={{ maxWidth: '450px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', fontSize: '1.1rem' }} onClick={() => alert('Forwarding Brief...')}>
                       Forward Brief to Creator Marketplace <ExternalLink size={20} />
                     </button>
                  </div>
                </div>
`;

content = content.replace(/<\/div>\s*\);\s*}\)}\s*<\/motion\.section>/, replacementString + '\n              </motion.section>');

fs.writeFileSync('src/B2BLeadGenOnboarding.jsx', content);
console.log('UI Updated cleanly in vibe-audit-engine');
