const fs = require('fs');
let code = fs.readFileSync('src/services/geminiService.mjs', 'utf8');

// 1. Add responseSchema: masterVibeSchema to createModelInstance
code = code.replace(
  `  const createModelInstance = (modelName) => genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    }
  });`,
  `  const createModelInstance = (modelName) => genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: masterVibeSchema,
      temperature: 0.2,
    }
  });`
);

// 2. Add systemPrompt to textOnlyParts
const oldTextOnly = `      const textOnlyParts = [
        { 
          text: \`\\n=== CURRENT LIVE BOOKING.COM PHOTOS METADATA ===\\n\` + 
            (livePhotos || []).slice(0, 20).map((p, i) => \`Live Photo #\${p.slot || (i + 1)}: "\${p.title || 'Hotel Photo'}" (URL: \${p.imageUrl})\`).join('\\n')
        },`;

const newTextOnly = `      const textOnlyParts = [
        { text: \`\${systemPrompt}\\n\\nCRITICAL OUTPUT FORMAT: Return a valid JSON object strictly matching this schema:\\n\${JSON.stringify(masterVibeSchema)}\` },
        { 
          text: \`\\n=== CURRENT LIVE BOOKING.COM PHOTOS METADATA ===\\n\` + 
            (livePhotos || []).slice(0, 20).map((p, i) => \`Live Photo #\${p.slot || (i + 1)}: "\${p.title || 'Hotel Photo'}" (URL: \${p.imageUrl})\`).join('\\n')
        },`;

if (code.includes(oldTextOnly)) {
  code = code.replace(oldTextOnly, newTextOnly);
}

// 3. Fallback merge safeguard if ota_conversion_audit is missing
const safeguardCheck = `    if (!parsedData.ota_conversion_audit) {
      console.warn('[Gemini] Response missing ota_conversion_audit, merging intelligent synthesizer...');
      const synth = synthesizeVibeAuditFromCorpus(hotelName, city, neighborhood, venueCorpus, livePhotos, amenityPhotos);
      parsedData.ota_conversion_audit = synth.ota_conversion_audit;
    }`;

if (!code.includes('safeguardCheck') && !code.includes('Response missing ota_conversion_audit')) {
  code = code.replace(
    'if (!parsedData.venue_name) parsedData.venue_name = hotelName;',
    'if (!parsedData.venue_name) parsedData.venue_name = hotelName;\n' + safeguardCheck
  );
}

// 4. Optimize timeoutMs to 15000 instead of 48000
code = code.replace(
  'const generateWithFallback = async (contentParts, timeoutMs = 48000) => {',
  'const generateWithFallback = async (contentParts, timeoutMs = 15000) => {'
);
code = code.replace(
  'const primaryTimeout = 48000;',
  'const primaryTimeout = 15000;'
);

fs.writeFileSync('src/services/geminiService.mjs', code, 'utf8');
console.log('Successfully patched src/services/geminiService.mjs');
