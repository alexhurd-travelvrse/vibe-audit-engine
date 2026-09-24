import { chromium } from 'playwright';

async function inspectBookingPhotos() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.booking.com/hotel/us/the-palms-south-beach.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);

  const galleryData = await page.evaluate(() => {
    const results = {
      windowKeys: Object.keys(window).filter(k => k.toLowerCase().includes('photo') || k.toLowerCase().includes('hotel') || k.toLowerCase().includes('booking')),
      domImages: [],
      scriptMatches: []
    };

    // Check window variables
    if (window.booking && window.booking.env) {
      results.envKeys = Object.keys(window.booking.env);
      if (window.booking.env.b_hotel_photos) {
        results.hotelPhotos = window.booking.env.b_hotel_photos;
      }
    }

    // Extract all hotel photo urls from scripts
    const scripts = document.querySelectorAll('script');
    for (const s of scripts) {
      const txt = s.textContent || '';
      if (txt.includes('large_url') || txt.includes('photo_url') || txt.includes('bstatic.com/xdata/images/hotel/max1024x768/')) {
        const matches = txt.matchAll(/https?:\/\/[a-z0-9.]*bstatic\.com\/xdata\/images\/hotel\/[a-zA-Z0-9_/.]*(\d+)\.jpg[^\s"']*/g);
        for (const m of matches) {
          results.scriptMatches.push(m[0].replace(/\\u002F/g, '/'));
        }
      }
    }

    // Also extract all alt tags and src from images
    document.querySelectorAll('img[src*="bstatic.com"]').forEach(img => {
      results.domImages.push({
        alt: img.alt,
        src: img.src
      });
    });

    return results;
  });

  console.log('Env Keys:', galleryData.envKeys);
  console.log('DOM Images Count:', galleryData.domImages.length);
  console.log('Script Matches Count:', galleryData.scriptMatches.length);
  console.log('\nSample DOM Images with Alt:');
  galleryData.domImages.slice(0, 15).forEach((img, i) => console.log(`[${i+1}] "${img.alt}" -> ${img.src}`));

  // Unique photos from scripts
  const uniquePhotos = [...new Set(galleryData.scriptMatches.map(u => u.replace(/\/max\d+x\d+\//, '/max1024x768/')))];
  console.log('\nUnique High-Res Photo Count from Booking.com:', uniquePhotos.length);
  uniquePhotos.slice(0, 15).forEach((u, i) => console.log(`Photo #${i+1}: ${u}`));

  await browser.close();
}

inspectBookingPhotos().catch(console.error);
