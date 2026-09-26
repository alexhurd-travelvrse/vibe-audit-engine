const http = require('http');

async function testAudit(hotelName, city, neighborhood, bookingUrl) {
  console.log(`\n========================================`);
  console.log(`TESTING AUDIT: ${hotelName} (${city}, ${neighborhood})`);
  console.log(`========================================`);

  const payload = JSON.stringify({
    hotelName,
    city,
    neighborhood,
    bookingUrl
  });

  const req = http.request('http://localhost:3002/api/master-vibe-audit?phase=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    },
    timeout: 60000
  }, (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      try {
        const data = JSON.parse(raw);
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Venue: ${data.venue_name}`);
        const ota = data.ota_conversion_audit;
        if (!ota) {
          console.error('ERROR: No ota_conversion_audit returned!');
          return;
        }

        console.log(`Photos Status: ${ota.photos_status}`);
        console.log(`Key Strategic Shifts:`);
        (ota.key_strategic_shifts || []).forEach((shift, i) => console.log(`  [${i+1}] ${shift}`));

        console.log(`\nOptimal 5-Photo Sequence:`);
        (ota.optimal_5_photo_sequence || []).forEach(slot => {
          console.log(`  Slot #${slot.slot} [${slot.category}] - Action: ${slot.action_label || slot.action}`);
          console.log(`    Subject: ${slot.photo_subject}`);
          console.log(`    Photo URL: ${slot.photo_url ? slot.photo_url.substring(0, 80) + '...' : 'NULL'}`);
          console.log(`    Why: ${slot.why_it_converts?.substring(0, 90) || slot.upgrade_rationale?.substring(0, 90)}...`);
        });

        console.log(`\nPhotographic Gap Analysis (Creative Commissioning Scope):`);
        (ota.photographic_gap_analysis || []).forEach((gap, i) => {
          console.log(`  Gap #${i+1}: ${gap.missing_shot_title} [${gap.category}] (Impact: ${gap.projected_adr_impact || 'N/A'})`);
          console.log(`    Why: ${gap.why_needed}`);
          console.log(`    Framing: ${gap.recommended_framing_and_lighting}`);
        });

      } catch (err) {
        console.error('Failed to parse response JSON:', err.message, raw.substring(0, 300));
      }
    });
  });

  req.on('error', (e) => {
    console.error('Request error:', e.message);
  });

  req.write(payload);
  req.end();
}

const editionUrl = "https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html";
testAudit("The Miami Beach EDITION", "Miami Beach", "South Beach", editionUrl);
