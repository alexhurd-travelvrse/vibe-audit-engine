import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    locale: 'en-US',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  await context.addCookies([
    { name: 'lang', value: 'en-us', domain: '.booking.com', path: '/' },
    { name: 'bkng_language', value: 'en', domain: '.booking.com', path: '/' }
  ]);
  const page = await context.newPage();
  const url = 'https://www.booking.com/hotel/us/twoninezeroone-collinsave.html?lang=en-us';
  console.log('Navigating to', url);
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('Status:', resp.status());
  console.log('Current URL:', page.url());
  console.log('Page Title:', await page.title());
  
  const imgs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(i => i.src).filter(s => s.includes('bstatic'));
  });
  console.log('Images found:', imgs.length, imgs.slice(0, 5));
  
  await browser.close();
}

test();
