import fs from 'fs';

let content = fs.readFileSync('src/B2BLeadGenOnboarding.jsx', 'utf8');

// Replace the floating )}
content = content.replace(/                          \r?\n                            \)}\r?\n                          <\/div>/, '');

fs.writeFileSync('src/B2BLeadGenOnboarding.jsx', content);
console.log('Fixed dangling brace');
