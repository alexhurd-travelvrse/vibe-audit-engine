import { chromium } from 'playwright';

async function inspectBookingPayload(url) {
  console.log(`Inspecting ${url}...`);
  const browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    locale: 'en-US'
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(e => console.warn('Nav warning:', e.message));
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const getInspection = async () => {
    return await page.evaluate(() => {
      const results = {
        currentUrl: window.location.href,
        hasBookingEnv: !!window.booking?.env,
        bookingEnvKeys: window.booking?.env ? Object.keys(window.booking.env) : [],
        hasBPhotos: !!window.b_photos,
        bPhotosCount: Array.isArray(window.b_photos) ? window.b_photos.length : 0,
        bPhotosSample: Array.isArray(window.b_photos) ? window.b_photos.slice(0, 3) : null,
        domRoomPhotosCount: 0,
        domPropertyPhotosCount: 0,
        scriptMatches: []
      };

      const scripts = document.querySelectorAll('script');
      for (const s of scripts) {
        const txt = s.textContent || '';
        if (txt.includes('b_photos') || txt.includes('hotelPhotos') || txt.includes('property_photos') || txt.includes('"photos":')) {
          results.scriptMatches.push({
            len: txt.length,
            preview: txt.substring(0, 300)
          });
        }
      }

      const propGallery = document.querySelectorAll('[data-testid="property-gallery"] img, [data-preview-image-layout-gallery-grid-item] img, .bh-photo-grid-item img');
      results.domPropertyPhotosCount = propGallery.length;

      const roomGallery = document.querySelectorAll('[data-room-id] img, .roomstable img, [data-block-id] img');
      results.domRoomPhotosCount = roomGallery.length;

      return results;
    });
  };

  let payloadInspection = null;
  try {
    payloadInspection = await getInspection();
  } catch (e) {
    await page.waitForTimeout(3000);
    payloadInspection = await getInspection();
  }

  console.log('Inspection Results:', JSON.stringify(payloadInspection, null, 2));
  await browser.close();
}

inspectBookingPayload('https://www.booking.com/hotel/dk/25hours-indre-by.html?lang=en-us');
