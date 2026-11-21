import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 740 } });

const southwarkImgs = [
  { label: '9. Southbank Thames Stroll (Hoxton Southwark)', url: 'https://thehoxton.com/wp-content/uploads/sites/5/2020/03/southbank_optimized_300.jpg' },
  { label: '10. Borough Market (Hoxton Southwark)', url: 'https://thehoxton.com/wp-content/uploads/sites/5/2020/03/borough_market_10.27.09_optimized_300.jpg' },
  { label: '11. Maltby Street Market (Hoxton Southwark)', url: 'https://thehoxton.com/wp-content/uploads/sites/5/2020/03/5.jpg' },
  { label: '12. Leake Street Arches (Hoxton Southwark)', url: 'https://thehoxton.com/wp-content/uploads/sites/5/2020/03/Graffiti-Tunnel.jpg' },
  { label: '13. Tower Bridge Walk (Hoxton Southwark)', url: 'https://thehoxton.com/wp-content/uploads/sites/5/2020/03/tower_bridge_10.27.09_optimized_300.jpg' },
  { label: '14. Shakespeare’s Globe (Hoxton Southwark)', url: 'https://thehoxton.com/wp-content/uploads/sites/5/2020/03/the_globe_optimized_300.jpg' },
  { label: '15. Elliot’s Borough Market (Hoxton Southwark)', url: 'https://thehoxton.com/wp-content/uploads/sites/5/2020/03/Elliots.jpg' },
  { label: '16. Seabird 14th-Fl Rooftop (Hoxton Southwark)', url: 'https://thehoxton.com/wp-content/uploads/sites/5/2019/12/Seabird_southwark.jpg' },
];

const html = `<!DOCTYPE html>
<html>
<body style="background:#060d1b;color:#fff;font-family:sans-serif;padding:24px;display:grid;grid-template-columns:repeat(4, 1fr);gap:16px;">
  ${southwarkImgs
    .map(
      (x) => `
    <div style="background:#0f1b31;padding:10px;border-radius:12px;border:1px solid #1e293b;">
      <img src="${x.url}" style="width:100%;height:260px;object-fit:cover;border-radius:8px;" />
      <div style="margin-top:8px;font-weight:700;font-size:13.5px;">${x.label}</div>
    </div>
  `
    )
    .join('')}
</body>
</html>`;

await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({
  path: 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b/hoxton-southwark-neighbourhood-options.png',
});
await browser.close();
