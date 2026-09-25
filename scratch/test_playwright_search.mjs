import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'en-US'
  });
  const page = await context.newPage();
  const query = 'The Plymouth South Beach Miami';
  console.log('Navigating to booking search for:', query);
  await page.goto(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(query)}&lang=en-us`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  const links = await page.$$eval('a[data-testid="title-link"], a[href*="/hotel/"]', els => {
    return els.map(el => ({
      href: el.href,
      title: el.innerText.trim()
    })).filter(x => x.href.includes('/hotel/'));
  });

  console.log('Found results via Playwright Booking search:', links.length);
  for (const l of links.slice(0, 5)) {
    console.log('-', l.title, '=>', l.href.split('?')[0]);
  }
  await browser.close();
}
test();
