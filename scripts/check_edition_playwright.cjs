const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to twoninezeroone-collinsave.en-gb.html...');
  await page.goto('https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('Final URL:', page.url());
  const title = await page.title();
  console.log('Page Title:', title);

  const result = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.innerText);
    let match = null;
    for (const s of scripts) {
      const m = s.match(/b_hotel_id:\s*'(\d+)'/) || s.match(/"hotel_id":\s*"?(\d+)"?/);
      if (m) { match = m[1]; break; }
    }
    return {
      b_hotel_id: window.booking?.env?.b_hotel_id,
      dataHotelId: document.querySelector('[data-hotel-id]')?.getAttribute('data-hotel-id'),
      inputHotelId: document.querySelector('input[name="hotel_id"]')?.value,
      scriptMatch: match
    };
  });
  console.log('Extracted Hotel ID info:', JSON.stringify(result, null, 2));

  await browser.close();
})();
