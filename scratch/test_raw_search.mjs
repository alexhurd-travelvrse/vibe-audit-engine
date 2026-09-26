import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'en-US'
  });
  const page = await context.newPage();
  const query = 'Edition Miami Beach';
  console.log('Navigating to Booking search for:', query);
  await page.goto(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(query)}&lang=en-us`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  const results = await page.$$eval('a[data-testid="title-link"], a[href*="/hotel/"]', els => {
    return els.map(el => ({
      href: el.href,
      title: el.innerText.trim()
    })).filter(x => x.href.includes('/hotel/'));
  });

  console.log('Results count:', results.length);
  for (const r of results.slice(0, 10)) {
    console.log(`- "${r.title.replace(/\n/g, ' ')}" => ${r.href.split('?')[0]}`);
  }
  await browser.close();
}
test();
