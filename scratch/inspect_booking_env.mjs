import { chromium } from 'playwright';

async function inspectBookingEnv(url) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
  const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', locale: 'en-US' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const envData = await page.evaluate(() => {
    const env = window.booking?.env || {};
    return {
      b_gallery_has_photo_tags: env.b_gallery_has_photo_tags,
      b_photo_pid: env.b_photo_pid,
      b_blocks_per_room_id: env.b_blocks_per_room_id,
      b_room_groups: env.b_room_groups,
      b_hotel_blocks: env.b_hotel_blocks ? Object.keys(env.b_hotel_blocks).slice(0, 5) : null,
      hotel_photos: window.booking?.hotel_photos || null,
      photos: window.photos || null,
      hotel_gallery: window.hotel_gallery || null
    };
  });

  console.log('Env Data:', JSON.stringify(envData, null, 2));
  await browser.close();
}

inspectBookingEnv('https://www.booking.com/hotel/dk/25hours-indre-by.html?lang=en-us');
