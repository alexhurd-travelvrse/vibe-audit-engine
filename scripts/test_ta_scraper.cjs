const { chromium } = require('playwright');

async function testTripAdvisorScraper() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const url = 'https://www.tripadvisor.com/LocationPhotos-g34439-d7143309-The_Miami_Beach_EDITION-Miami_Beach_Florida.html';
  console.log('Navigating to:', url);

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);

    const title = await page.title();
    console.log('Page Title:', title);

    // Check for "From Management" tab or button
    const buttons = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button, a, div[role="tab"]'))
        .map(el => el.textContent.trim())
        .filter(t => t.toLowerCase().includes('management') || t.toLowerCase().includes('official'));
    });
    console.log('Found Management tabs/buttons:', buttons);

    // Extract all image URLs on page
    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(img => ({
          src: img.src,
          alt: img.alt
        }))
        .filter(img => img.src && (img.src.includes('photo-o') || img.src.includes('photo-s') || img.src.includes('photo-l') || img.src.includes('photo-w')));
    });

    console.log('Extracted TripAdvisor Photos:', images.length);
    images.slice(0, 8).forEach((img, i) => console.log(`${i+1}. [${img.alt}] -> ${img.src}`));

  } catch (err) {
    console.error('Error scraping TripAdvisor:', err.message);
  } finally {
    await browser.close();
  }
}

testTripAdvisorScraper();
