const http = require('http');
const fs = require('fs');

const hotels = [
  {
    name: "The Miami Beach EDITION",
    city: "Miami Beach",
    neighborhood: "South Beach",
    bookingUrl: "https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html"
  },
  {
    name: "Sea Containers London",
    city: "London",
    neighborhood: "South Bank",
    bookingUrl: null
  },
  {
    name: "The Plymouth South Beach",
    city: "Miami Beach",
    neighborhood: "South Beach",
    bookingUrl: null
  },
  {
    name: "SLS South Beach",
    city: "Miami Beach",
    neighborhood: "South Beach",
    bookingUrl: null
  },
  {
    name: "1 Hotel South Beach",
    city: "Miami Beach",
    neighborhood: "South Beach",
    bookingUrl: null
  }
];

function fetchAudit(hotel) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      hotelName: hotel.name,
      city: hotel.city,
      neighborhood: hotel.neighborhood,
      bookingUrl: hotel.bookingUrl
    });

    const req = http.request('http://localhost:3002/api/master-vibe-audit?phase=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 90000
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          resolve(data);
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('=== STARTING 5-HOTEL COMPARATIVE AUDIT & GAP ANALYSIS ===\n');
  const results = [];

  for (const h of hotels) {
    console.log(`Auditing: ${h.name}...`);
    try {
      const data = await fetchAudit(h);
      results.push({
        hotel: h,
        data: data
      });
      console.log(`✓ Completed: ${h.name}`);
    } catch (err) {
      console.error(`✗ Failed ${h.name}:`, err.message);
    }
  }

  fs.writeFileSync('scripts/5_hotels_results.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('\nAll 5 audits completed and saved to scripts/5_hotels_results.json!');
}

run();
