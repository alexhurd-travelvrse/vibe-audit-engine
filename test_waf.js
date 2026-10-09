import { chromium } from 'playwright';

async function testWaf() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  }).catch(() => chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  }));

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  console.log('[Test] Navigating to Booking.com...');
  await page.goto('https://www.booking.com/hotel/us/the-plymouth-miami-beach.html', { waitUntil: 'commit' });

  console.log('[Test] Waiting for challenge auto-solve and gallery elements...');
  try {
    await page.waitForSelector('img[src*="bstatic.com"]', { timeout: 15000 });
    console.log('[Test] Gallery images detected!');
  } catch (err) {
    console.log('[Test] Wait error:', err.message);
  }

  console.log('[Test] Final page title:', await page.title());
  console.log('[Test] Final URL:', page.url());

  const photos = await page.evaluate(() => {
    const list = [];
    const seen = new Set();
    document.querySelectorAll('img[src*="bstatic.com"]').forEach(el => {
      const src = el.src;
      if (src && src.includes('/images/hotel/')) {
        const highRes = src.replace(/\/max\d+x\d+\//, '/max1024x768/');
        const id = src.match(/\/(\d+)\.jpg/)?.[1] || highRes;
        if (!seen.has(id)) {
          seen.add(id);
          list.push({
            id,
            title: el.alt || 'Booking.com Photo',
            url: highRes
          });
        }
      }
    });
    return list;
  });

  console.log('[Test] Total photos extracted:', photos.length);
  if (photos.length > 0) {
    console.log('[Test] First 3 photos:', photos.slice(0, 3));
  }

  await browser.close();
}

testWaf();
