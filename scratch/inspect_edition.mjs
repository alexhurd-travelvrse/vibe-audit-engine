import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'en-US'
  });
  const page = await context.newPage();
  await page.goto('https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  const title = await page.title();
  const text = await page.evaluate(() => document.querySelector('h2.pp-header__title, h2')?.innerText);
  console.log('Title:', title);
  console.log('Heading:', text);
  await browser.close();
}
test();
