import { chromium } from 'playwright';

async function checkBookingGalleryDetails() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.booking.com/hotel/us/the-palms-south-beach.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  const galleryInfo = await page.evaluate(() => {
    const list = [];
    const seen = new Set();

    // 1. Check all images with alt tags
    document.querySelectorAll('img[src*="bstatic.com"]').forEach(img => {
      const src = img.src || '';
      const alt = img.alt || '';
      const photoId = src.match(/\/(\d+)\.jpg/)?.[1];
      if (photoId && !seen.has(photoId)) {
        seen.add(photoId);
        list.push({
          id: photoId,
          alt: alt,
          url: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/${photoId}.jpg`
        });
      }
    });

    // 2. Check script tags for any JSON objects containing photo metadata
    const scripts = document.querySelectorAll('script');
    for (const s of scripts) {
      const txt = s.textContent || '';
      if (txt.includes('bstatic.com/xdata/images/hotel/')) {
        const matches = txt.matchAll(/https?:\/\/[a-z0-9.]*bstatic\.com\/xdata\/images\/hotel\/[a-zA-Z0-9_/.]*(\d+)\.jpg[^\s"']*/g);
        for (const m of matches) {
          const photoId = m[1];
          if (photoId && !seen.has(photoId)) {
            seen.add(photoId);
            list.push({
              id: photoId,
              alt: 'Booking.com Gallery Photo',
              url: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/${photoId}.jpg`
            });
          }
        }
      }
    }

    return list;
  });

  console.log(`Found ${galleryInfo.length} total verified hotel photos from Booking.com!`);
  console.log('\nSample Photos:');
  galleryInfo.slice(0, 30).forEach((p, i) => {
    console.log(`[${i+1}] ID: ${p.id} | Alt: "${p.alt}" | URL: ${p.url}`);
  });

  await browser.close();
}

checkBookingGalleryDetails().catch(console.error);
