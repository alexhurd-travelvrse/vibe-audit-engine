import { chromium } from 'playwright';

async function inspectApolloCache(url) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
  const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', locale: 'en-US' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const runEval = async () => {
    return await page.evaluate(() => {
      const scripts = document.querySelectorAll('script');
      let apolloScript = null;
      for (const s of scripts) {
        if (s.textContent && s.textContent.includes('ROOT_QUERY') && s.textContent.includes('bstatic.com')) {
          apolloScript = s.textContent;
          break;
        }
      }
      if (!apolloScript) return { found: false };

      try {
        const data = JSON.parse(apolloScript);
        const keys = Object.keys(data);
        const photoKeys = keys.filter(k => k.toLowerCase().includes('photo') || k.toLowerCase().includes('image') || k.toLowerCase().includes('gallery'));
        const roomKeys = keys.filter(k => k.toLowerCase().includes('room'));
        
        // Look for objects with url / photo
        const samplePhotos = [];
        for (const k of keys) {
          const item = data[k];
          if (item && (item.__typename === 'HotelPhoto' || item.__typename === 'PropertyPhoto' || item.__typename === 'RoomPhoto' || item.photoId || item.max1024x768Url || (item.url && item.url.includes('bstatic.com')))) {
            samplePhotos.push({ key: k, typename: item.__typename, item });
            if (samplePhotos.length >= 10) break;
          }
        }

        return {
          found: true,
          totalKeys: keys.length,
          photoKeys: photoKeys.slice(0, 10),
          roomKeys: roomKeys.slice(0, 10),
          samplePhotos
        };
      } catch (e) {
        return { found: true, error: e.message };
      }
    });
  };

  let apolloAnalysis = null;
  try {
    apolloAnalysis = await runEval();
  } catch (e) {
    await page.waitForTimeout(3000);
    apolloAnalysis = await runEval();
  }

  console.log('Apollo Analysis:', JSON.stringify(apolloAnalysis, null, 2));
  await browser.close();
}

inspectApolloCache('https://www.booking.com/hotel/dk/25hours-indre-by.html?lang=en-us');
