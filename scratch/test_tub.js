const SERPER_API_KEY = 'a23fd96c5cb1aace5f985e1d32f27492c241b349';

async function testTub() {
  const imgRes = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `site:theplymouth.com (bathroom OR tub OR shower OR bath)`, num: 10 })
  });
  const imgData = await imgRes.json();
  console.log('theplymouth.com bathroom images:');
  for (const img of imgData.images || []) {
    console.log(img.title, '->', img.imageUrl, 'link:', img.link);
  }
}

testTub();
