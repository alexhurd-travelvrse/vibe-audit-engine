import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LONDON_10_STUDY_META, LONDON_10_HOTELS } from '../src/data/london10StudyData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const baseIndexPath = path.join(distDir, 'index.html');

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildDirectoryJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.atmosvibe.io/vibe-insights/#collection',
    name: 'AtmosVibe Vibe Insights Research Directory',
    url: 'https://www.atmosvibe.io/vibe-insights',
    description:
      'Original multi-channel hospitality benchmarks auditing Physical Vibe, Owned Digital (Own Property vs. Local Destination Vibe), and OTA Top-5 Hero galleries across Hotels, Cruise Ships, and Tours.',
    publisher: {
      '@type': 'Organization',
      name: 'AtmosVibe',
      url: 'https://www.atmosvibe.io',
    },
    hasPart: [
      {
        '@type': 'ScholarlyArticle',
        headline: `${LONDON_10_STUDY_META.title} — ${LONDON_10_STUDY_META.subtitle}`,
        url: 'https://www.atmosvibe.io/vibe-insights/london-boutique-ota-gap',
        datePublished: LONDON_10_STUDY_META.publishDate,
      },
    ],
  };
}

function buildLondonStudyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ScholarlyArticle',
        '@id': 'https://www.atmosvibe.io/vibe-insights/london-boutique-ota-gap/#article',
        headline: `${LONDON_10_STUDY_META.title}: ${LONDON_10_STUDY_META.subtitle}`,
        datePublished: LONDON_10_STUDY_META.publishDate,
        author: {
          '@type': 'Person',
          name: 'Alex Hurd',
          jobTitle: 'Founder & CEO',
          url: 'https://www.linkedin.com/in/alexhurd/',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AtmosVibe',
          url: 'https://www.atmosvibe.io',
        },
        description:
          'Multi-channel benchmark of 10 flagship London lifestyle hotels across Physical Vibe (92.5/100), Owned Digital Own Property Vibe (88.4/100), Owned Digital Local Destination Vibe (45.5/100), and Booking.com Top-5 Hero galleries (56.5/100, with 70% utility/bedroom clutter).',
        about: LONDON_10_HOTELS.map((h) => ({
          '@type': 'Hotel',
          name: h.name,
          address: {
            '@type': 'PostalAddress',
            addressLocality: h.neighborhood,
            addressRegion: 'London',
            addressCountry: 'GB',
          },
        })),
      },
      {
        '@type': 'Dataset',
        '@id': 'https://www.atmosvibe.io/vibe-insights/london-boutique-ota-gap/#dataset',
        name: 'London 10 Boutique & Lifestyle Hotel Multi-Channel Vibe Benchmark (AV-INSIGHTS-2026-LON10)',
        description:
          'Empirical dataset measuring Physical Vibe (92.5 avg), Owned Digital Own Property Vibe (88.4 avg), Owned Digital Local Destination Vibe (45.5 avg), and Booking.com Top-5 Hero Mix (56.5 avg; 70% rooms/bathrooms/utility vs. 14% social/culinary and 16% destination) across 10 London lifestyle hotels (463 total OTA photos).',
        url: 'https://www.atmosvibe.io/vibe-insights/london-boutique-ota-gap',
        creator: {
          '@type': 'Organization',
          name: 'AtmosVibe',
          url: 'https://www.atmosvibe.io',
        },
        variableMeasured: [
          'A. Physical Vibe Score (0-100)',
          'B1. Owned Digital — Own Property Vibe Score (0-100)',
          'B2. Owned Digital — Local Destination Vibe Score (0-100)',
          'C. Booking.com Top-5 Hero Score (0-100)',
          'Top-5 Hero Content Mix (Social/Culinary vs. Destination vs. Room/Bath Utility)',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.atmosvibe.io/vibe-insights/london-boutique-ota-gap/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why do top London lifestyle hotels lose their vibe on Booking.com?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Across 10 flagship London lifestyle hotels (92.5/100 Physical Vibe), 70% of Booking.com Top-5 Hero slots (35 of 50 photos) default to repetitive bedrooms, bathroom sinks, toiletries, conference tables, and gym treadmills — while only 14% show social/culinary spaces and 16% show destination views.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the "Walled Garden" blind spot in hotel owned digital and social marketing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'While London’s top lifestyle hotels score 88.4/100 at marketing their own internal bars, rooftops, and design on their websites and Instagram, they average just 45.5/100 at marketing their walkable local neighbourhood destination vibe — treating the hotel as a self-contained island.',
            },
          },
        ],
      },
    ],
  };
}

function buildDirectoryStaticHtml() {
  return `
    <div class="vibe-insights-static-prerender">
      <header>
        <h1>AtmosVibe Vibe Insights Research Directory</h1>
        <p>Original data studies auditing Physical Vibe, Owned Digital &amp; Social (Own Property vs. Local Destination), and OTA Top-5 Hero galleries across Hotels, Cruise Ships, and Tours.</p>
      </header>
      <main>
        <article>
          <h2><a href="/vibe-insights/london-boutique-ota-gap">Study #01: ${escapeHtml(LONDON_10_STUDY_META.title)} — ${escapeHtml(LONDON_10_STUDY_META.subtitle)}</a></h2>
          <p>Why London’s most atmospheric hotels excel at marketing their own internal bars and design online (88.4/100), yet under-sell their walkable local neighbourhood vibe (45.5/100) and surrender 70% of their Booking.com Top-5 Hero slots to repetitive bedrooms, sinks, and utility shots (56.5/100).</p>
          <ul>
            <li>A. Physical Vibe Average: ${LONDON_10_STUDY_META.avgMathVibeScore} / 100</li>
            <li>B1. Owned Digital — Own Property Vibe: ${LONDON_10_STUDY_META.avgOwnPropertyDigitalScore} / 100</li>
            <li>B2. Owned Digital — Local Destination Vibe: ${LONDON_10_STUDY_META.avgLocalDestinationDigitalScore} / 100</li>
            <li>C. Booking.com Top-5 Hero Score: ${LONDON_10_STUDY_META.avgOtaTop5Score} / 100</li>
          </ul>
        </article>
      </main>
    </div>
  `.trim();
}

function buildLondonStudyStaticHtml() {
  const hotelsHtml = LONDON_10_HOTELS.map(
    (h) => `
      <article id="hotel-${escapeHtml(h.id)}">
        <h3>#${h.index}. ${escapeHtml(h.name)} (${escapeHtml(h.neighborhood)} — ${escapeHtml(h.cluster)})</h3>
        <p><strong>Headline Finding:</strong> ${escapeHtml(h.headlineFinding)}</p>
        <ul>
          <li><strong>A. Physical Vibe Score:</strong> ${h.mathVibeScore} / 100</li>
          <li><strong>B1. Owned Digital — Own Property Vibe:</strong> ${h.ownPropertyDigitalScore} / 100</li>
          <li><strong>B2. Owned Digital — Local Destination Vibe:</strong> ${h.localDestinationDigitalScore} / 100</li>
          <li><strong>C. Booking.com Top-5 Hero Score:</strong> ${h.otaTop5Score} / 100 (${escapeHtml(h.heroTop5Mix.summary)})</li>
          <li><strong>Total Audited OTA Gallery Photos:</strong> ${h.totalPhotos}</li>
        </ul>
        <h4>Owned Digital &amp; Social: Own Vibe vs. Local Destination</h4>
        <p><strong>Own Property Marketing (${h.ownPropertyDigitalScore}/100):</strong> ${escapeHtml(h.ownPropertyDigitalSummary)}</p>
        <p><strong>Local Destination Marketing (${h.localDestinationDigitalScore}/100):</strong> ${escapeHtml(h.localDestinationDigitalSummary)}</p>
        <h4>OTA Top-5 Diagnosis &amp; Buried Icons</h4>
        <p>${escapeHtml(h.otaRealitySummary)}</p>
        <p><strong>Missing from Booking.com Top 5:</strong> ${h.buriedGems.map(escapeHtml).join(' • ')}</p>
        <h4>Live Booking.com Top-5 Hero Slots</h4>
        <ol>
          ${h.top5
            .map(
              (s) =>
                `<li>Slot #${s.slot} (${s.isCommodity ? 'Utility / Duplicate' : 'Vibe Hero'}): ${escapeHtml(s.slotVerdict)} — OTA AI Caption: “${escapeHtml(s.title)}”</li>`
            )
            .join('\n          ')}
        </ol>
      </article>
    `
  ).join('\n');

  return `
    <div class="vibe-insights-static-prerender">
      <article>
        <header>
          <p>EXECUTIVE SUMMARY • ${escapeHtml(LONDON_10_STUDY_META.studyCode)} • ${escapeHtml(LONDON_10_STUDY_META.sampleSize)}</p>
          <h1>${escapeHtml(LONDON_10_STUDY_META.title)}: ${escapeHtml(LONDON_10_STUDY_META.subtitle)}</h1>
          <p>We audited 10 of London’s most celebrated boutique and lifestyle hotels across three channels: Physical Reality (${LONDON_10_STUDY_META.avgMathVibeScore}/100), Owned Website &amp; Social (${LONDON_10_STUDY_META.avgOwnPropertyDigitalScore}/100 Own Vibe vs. ${LONDON_10_STUDY_META.avgLocalDestinationDigitalScore}/100 Local Destination Vibe), and Booking.com Top-5 Hero Galleries (${LONDON_10_STUDY_META.avgOtaTop5Score}/100). Two structural gaps emerged: first, on their own websites and Instagram feeds, even top lifestyle hotels operate as "Walled Gardens" — brilliantly showcasing their own internal bars and design (${LONDON_10_STUDY_META.avgOwnPropertyDigitalScore}/100), while under-marketing the walkable local neighbourhood vibe outside their doors (${LONDON_10_STUDY_META.avgLocalDestinationDigitalScore}/100). Second, on Booking.com, 70% of all Top-5 Hero slots (35 of 50 photos) default to repetitive bedrooms, bathroom sinks, toiletries, conference tables, and gym treadmills.</p>
        </header>

        <section>
          <h2>4-Container Multi-Channel Benchmark Summary</h2>
          <ul>
            <li><strong>A. Physical Vibe (${LONDON_10_STUDY_META.avgMathVibeScore} / 100):</strong> Real-World Property &amp; District — Iconic architecture, destination rooftops, high-energy dining rooms, and prime walkable London districts.</li>
            <li><strong>B1. Owned Digital — Own Vibe (${LONDON_10_STUDY_META.avgOwnPropertyDigitalScore} / 100):</strong> Internal Property Merchandising — Official hotel websites and Instagram feeds excel at showcasing their own internal bars, restaurants, and design DNA.</li>
            <li><strong>B2. Owned Digital — Local Vibe (${LONDON_10_STUDY_META.avgLocalDestinationDigitalScore} / 100):</strong> The "Walled Garden" Blind Spot — Owned digital treats the hotel as a self-contained island, under-marketing step-out neighbourhood culture, street markets, and local walkability.</li>
            <li><strong>C. OTA Top-5 Hero Score (${LONDON_10_STUDY_META.avgOtaTop5Score} / 100):</strong> 70% Rooms, Bathrooms &amp; Utility — 35 of 50 Booking.com Hero slots show beds, couches, sinks, shower gel, or gym equipment — vs. just 14% social/culinary and 16% destination views.</li>
          </ul>
        </section>

        <section>
          <h2>Property-by-Property Multi-Channel Vibe Scorecard (10 London Hotels)</h2>
          ${hotelsHtml}
        </section>

        <section>
          <h2>Research Methodology &amp; Industry Context</h2>
          <p>To measure how London’s flagship lifestyle hotels match up to modern vibe-led booking behaviour across South Bank, Shoreditch, Fitzrovia, Marylebone, King’s Cross, and the City, each property was scored out of 100 across four dimensions. (Industry context: Expedia Group’s Unpack research documented a +1,090% YoY surge in guest reviews citing “vibe,” with 90%+ of travellers weighting property vibe when booking.)</p>
          <p><strong>Next in This Series:</strong> Having established how London’s top 10 lifestyle icons perform, our follow-up study will examine mainstream 4-star and upper-upscale hotels across these same London neighbourhoods — testing how properties without an iconic onsite rooftop or destination restaurant market their local neighbourhood vibe.</p>
        </section>
      </article>
    </div>
  `.trim();
}

function injectRoutePage({
  baseHtml,
  title,
  description,
  canonicalUrl,
  jsonLdObject,
  staticRootHtml,
}) {
  let html = baseHtml;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"\s*\/>/i,
    `<meta name="twitter:url" content="${escapeHtml(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );

  const jsonLdScript = `\n    <!-- Route-Specific Pre-Rendered JSON-LD -->\n    <script type="application/ld+json">\n${JSON.stringify(
    jsonLdObject,
    null,
    2
  )}\n    </script>\n  </head>`;
  html = html.replace(/<\/head>/i, jsonLdScript);

  html = html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${staticRootHtml}</div>`
  );

  return html;
}

function runPrerender() {
  if (!fs.existsSync(baseIndexPath)) {
    console.error(`[prerender] Missing ${baseIndexPath}. Run "vite build" first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseIndexPath, 'utf-8');

  // 1. /vibe-insights Directory Page
  const directoryOutDir = path.join(distDir, 'vibe-insights');
  fs.mkdirSync(directoryOutDir, { recursive: true });
  const directoryHtml = injectRoutePage({
    baseHtml,
    title: 'Vibe Insights Research Directory | Multi-Channel Hospitality Studies | AtmosVibe',
    description:
      'Original hospitality benchmark studies auditing Physical Vibe, Owned Digital (Own Property vs. Local Destination Vibe), and OTA Top-5 Hero galleries across Hotels, Cruises, and Tours.',
    canonicalUrl: 'https://www.atmosvibe.io/vibe-insights',
    jsonLdObject: buildDirectoryJsonLd(),
    staticRootHtml: buildDirectoryStaticHtml(),
  });
  fs.writeFileSync(path.join(directoryOutDir, 'index.html'), directoryHtml, 'utf-8');

  // 2. /vibe-insights/london-boutique-ota-gap Study #01 Page
  const studyOutDir = path.join(distDir, 'vibe-insights', 'london-boutique-ota-gap');
  fs.mkdirSync(studyOutDir, { recursive: true });
  const studyHtml = injectRoutePage({
    baseHtml,
    title: `${LONDON_10_STUDY_META.title}: ${LONDON_10_STUDY_META.subtitle} | AtmosVibe Vibe Insights`,
    description:
      'Multi-channel audit of 10 flagship London lifestyle hotels: 92.5 Physical Vibe, 88.4 Own Property Digital Vibe, 45.5 Local Destination Digital Vibe ("Walled Garden" Gap), and 56.5 Booking.com Top-5 Hero Score (70% utility clutter).',
    canonicalUrl: 'https://www.atmosvibe.io/vibe-insights/london-boutique-ota-gap',
    jsonLdObject: buildLondonStudyJsonLd(),
    staticRootHtml: buildLondonStudyStaticHtml(),
  });
  fs.writeFileSync(path.join(studyOutDir, 'index.html'), studyHtml, 'utf-8');

  console.log(
    '[prerender] Successfully generated static HTML + JSON-LD for /vibe-insights and /vibe-insights/london-boutique-ota-gap'
  );
}

runPrerender();
