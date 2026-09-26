async function testApi() {
  const payload = {
    hotelName: 'The Miami Beach EDITION',
    city: 'Miami Beach',
    neighborhood: 'South Beach',
    fresh: true,
    bookingUrl: 'https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html',
    strategySlots: [
      { slot: 1, category: 'HERO_CULTURAL_MAGNET', photo_subject: 'The Basement Club & Lounge', why_it_converts: 'South Beach #1 nightlife' },
      { slot: 2, category: 'EXTERIOR_LANDMARK', photo_subject: 'Iconic Oceanfront Facade', why_it_converts: 'Anchors prime location' },
      { slot: 3, category: 'SIGNATURE_SUITE_BEDROOM', photo_subject: 'Luxury Ocean View Suite', why_it_converts: 'Sanctuary comfort' },
      { slot: 4, category: 'OUTDOOR_SOCIAL_POOL', photo_subject: 'Resort Pool & Private Cabana Deck', why_it_converts: 'Quintessential Miami pool' },
      { slot: 5, category: 'SECONDARY_ROOM_BATHROOM', photo_subject: 'Design Marble Bathroom', why_it_converts: '5-star hygiene finish' }
    ],
    strategicShifts: [
      "Shift 1: Elevate 'The Basement' club & lounge to Slot #1 as a HERO CULTURAL MAGNET, directly addressing South Beach's #1 search demand for vibrant, unique nightlife experiences.",
      "Shift 2: Re-sequence the iconic oceanfront facade to Slot #2, immediately grounding the property's prime location and architectural grandeur after the initial cultural hook.",
      "Shift 3: Introduce a stunning resort pool shot in Slot #4 to showcase the quintessential Miami Beach luxury lifestyle, complementing the nightlife magnet without thematic duplication.",
      "Shift 4: Ensure Slot #5 features a luxurious design bathroom, confirming the high-end finish and hygiene standards expected by discerning travelers."
    ]
  };

  console.log('Sending request to http://localhost:3002/api/resolve-audit-photos...');
  const res = await fetch('http://localhost:3002/api/resolve-audit-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log('Server response code:', res.status);
  console.log('Slots resolved:', data.optimal_5_photo_sequence?.length);
  data.optimal_5_photo_sequence.forEach(s => {
    console.log(`Slot ${s.slot} [${s.category}]: ${s.photo_subject}`);
    console.log(`  Photo: ${s.photo_url}`);
    console.log(`  Action: ${s.action} | ${s.action_label}`);
  });
}

testApi().catch(console.error);
