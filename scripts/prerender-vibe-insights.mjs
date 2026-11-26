import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LONDON_10_STUDY_META, LONDON_10_HOTELS } from '../src/data/london10StudyData.js';
import {
  REGISTRY_URLS,
  SOUTH_BANK_DESTINATION_SIGNATURE,
  SOUTH_BANK_HOTEL_SIGNATURES,
  SOUTH_BANK_LOCAL_GEM_SIGNATURES,
  ATMOSVIBE_METHODOLOGY_DATA,
  buildSouthBankRegistryJsonLd,
  buildMethodologyJsonLd,
} from '../src/data/southBankRegistryData.js';
import {
  RICHMOND_URLS,
  RICHMOND_STUDY_META,
  RICHMOND_LLM_BENCHMARK_TEST,
  RICHMOND_DESTINATION_SIGNATURE,
  RICHMOND_SCREEN_VS_REALITY_LOCATIONS,
  RICHMOND_HOTEL_SIGNATURES,
  RICHMOND_24HR_BLUEPRINT,
  buildRichmondRegistryJsonLd,
} from '../src/data/richmondRegistryData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');
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
        license: 'https://creativecommons.org/licenses/by/4.0/',
        isAccessibleForFree: true,
        distribution: [
          {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            contentUrl: 'https://www.atmosvibe.io/datasets/london-10-ota-benchmark.json',
          },
        ],
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
  const kpis = LONDON_10_STUDY_META.kpis;
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
            <li>A. Physical Vibe Average: ${kpis.avgMathVibeScore} / 100</li>
            <li>B1. Owned Digital — Own Property Vibe: ${kpis.avgOwnPropertyDigitalScore} / 100</li>
            <li>B2. Owned Digital — Local Destination Vibe: ${kpis.avgLocalDestinationDigitalScore} / 100</li>
            <li>C. Booking.com Top-5 Hero Score: ${kpis.avgOtaTop5Score} / 100</li>
          </ul>
        </article>
      </main>
    </div>
  `.trim();
}

function buildLondonStudyStaticHtml() {
  const kpis = LONDON_10_STUDY_META.kpis;
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
          <p>EXECUTIVE SUMMARY • ${escapeHtml(LONDON_10_STUDY_META.studyCode)} • 10 Audited London Lifestyle Hotels</p>
          <h1>${escapeHtml(LONDON_10_STUDY_META.title)}: ${escapeHtml(LONDON_10_STUDY_META.subtitle)}</h1>
          <p>We audited 10 of London’s most celebrated boutique and lifestyle hotels across three channels: Physical Reality (${kpis.avgMathVibeScore}/100), Owned Website &amp; Social (${kpis.avgOwnPropertyDigitalScore}/100 Own Vibe vs. ${kpis.avgLocalDestinationDigitalScore}/100 Local Destination Vibe), and Booking.com Top-5 Hero Galleries (${kpis.avgOtaTop5Score}/100). Two structural gaps emerged: first, on their own websites and Instagram feeds, even top lifestyle hotels operate as "Walled Gardens" — brilliantly showcasing their own internal bars and design (${kpis.avgOwnPropertyDigitalScore}/100), while under-marketing the walkable local neighbourhood vibe outside their doors (${kpis.avgLocalDestinationDigitalScore}/100). Second, on Booking.com, 70% of all Top-5 Hero slots (35 of 50 photos) default to repetitive bedrooms, bathroom sinks, toiletries, conference tables, and gym treadmills.</p>
        </header>

        <section>
          <h2>4-Container Multi-Channel Benchmark Summary</h2>
          <ul>
            <li><strong>A. Physical Vibe (${kpis.avgMathVibeScore} / 100):</strong> Real-World Property &amp; District — Iconic architecture, destination rooftops, high-energy dining rooms, and prime walkable London districts.</li>
            <li><strong>B1. Owned Digital — Own Vibe (${kpis.avgOwnPropertyDigitalScore} / 100):</strong> Internal Property Merchandising — Official hotel websites and Instagram feeds excel at showcasing their own internal bars, restaurants, and design DNA.</li>
            <li><strong>B2. Owned Digital — Local Vibe (${kpis.avgLocalDestinationDigitalScore} / 100):</strong> The "Walled Garden" Blind Spot — Owned digital treats the hotel as a self-contained island, under-marketing step-out neighbourhood culture, street markets, and local walkability.</li>
            <li><strong>C. OTA Top-5 Hero Score (${kpis.avgOtaTop5Score} / 100):</strong> 70% Rooms, Bathrooms &amp; Utility — 35 of 50 Booking.com Hero slots show beds, couches, sinks, shower gel, or gym equipment — vs. just 14% social/culinary and 16% destination views.</li>
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

  // 3. /vibe-insights/london-local-destination-gap Study #02 Page
  const localStudyOutDir = path.join(distDir, 'vibe-insights', 'london-local-destination-gap');
  fs.mkdirSync(localStudyOutDir, { recursive: true });
  const localStudyHtml = injectRoutePage({
    baseHtml,
    title: 'The “Walled Garden” Blind Spot: Why London’s Best Lifestyle Hotels Hide Their Local Neighbourhood | AtmosVibe Vibe Insights',
    description:
      'AtmosVibe Part II Benchmark of 10 Flagship London Hotels: Comparing On-Site Vibe & Experiences Marketing (88.4/100) vs. Local Destination Marketing on Own Websites (45.5/100) and OTA Hero Galleries (16% Destination Context).',
    canonicalUrl: 'https://www.atmosvibe.io/vibe-insights/london-local-destination-gap',
    jsonLdObject: buildLondonStudyJsonLd(),
    staticRootHtml: buildLondonStudyStaticHtml(),
  });
  fs.writeFileSync(path.join(localStudyOutDir, 'index.html'), localStudyHtml, 'utf-8');

  // 4. /registry/london-south-bank & /london/south-bank Canonical Sensory Registry
  const southBankStaticHtml = `
    <div class="vibe-insights-static-prerender">
      <article>
        <header>
          <p>CANONICAL SENSORY REGISTRY • ${escapeHtml(SOUTH_BANK_DESTINATION_SIGNATURE.registryCode)} • VERIFIED ${escapeHtml(SOUTH_BANK_DESTINATION_SIGNATURE.lastVerified)}</p>
          <h1>London South Bank (SE1): Destination, Hotel &amp; Local Gem Vibe Signatures</h1>
          <p>Independently verified 8-Signal Vibe Signatures for London South Bank (SE1): Composite Destination Vibe (${SOUTH_BANK_DESTINATION_SIGNATURE.compositeVibeScore}/100), Pedestrian Walkability (${SOUTH_BANK_DESTINATION_SIGNATURE.walkabilityScore}/100), Independent Zero-Chain Gem Ratio (${SOUTH_BANK_DESTINATION_SIGNATURE.independentGemRatioPct}%), 3 audited boutique hotels, and 6 verified local gems and cultural attractions. Synced with <a href="${escapeHtml(REGISTRY_URLS.travelvrseSouthBankHub)}">TravelVRSE South Bank Hub</a>.</p>
        </header>
        <section>
          <h2>Tier 1: The 8 Verified Real-World Signals of London’s South Bank</h2>
          <ul>
            ${SOUTH_BANK_DESTINATION_SIGNATURE.eightSignals
              .map(
                (s) =>
                  `<li><strong>Signal #${escapeHtml(s.number)} — ${escapeHtml(s.signal)} (${s.score}/100 • ${escapeHtml(s.factRatio)}):</strong> ${escapeHtml(s.verification)}</li>`
              )
              .join('\n')}
          </ul>
        </section>
        <section>
          <h2>Tier 2: South Bank Boutique Hotel Vibe Signatures &amp; Honest-Fit Verdicts</h2>
          ${SOUTH_BANK_HOTEL_SIGNATURES.map(
            (h) => `
            <article>
              <h3>${escapeHtml(h.name)} (${escapeHtml(h.address)})</h3>
              <p><strong>Physical Vibe:</strong> ${h.scores.physicalVibe}/100 | <strong>Own Vibe (Web):</strong> ${h.scores.ownPropertyDigital}/100 | <strong>Local Area (Web):</strong> ${h.scores.localDestinationDigital}/100 | <strong>OTA Top-5:</strong> ${h.scores.otaTop5Hero}/100</p>
              <p><strong>Love this if:</strong> ${escapeHtml(h.loveThisIf)}</p>
              <p><strong>Avoid this if:</strong> ${escapeHtml(h.avoidThisIf)}</p>
              <p><strong>Acoustic Profile:</strong> ${escapeHtml(h.acousticProfile)}</p>
            </article>
          `
          ).join('\n')}
        </section>
        <section>
          <h2>Tier 3: Verified South Bank Local Gems &amp; Cultural Attractions</h2>
          ${SOUTH_BANK_LOCAL_GEM_SIGNATURES.map(
            (g) => `
            <article>
              <h3>${escapeHtml(g.name)} (${g.vibeScore}/100 Vibe • ${escapeHtml(g.address)})</h3>
              <p>${escapeHtml(g.vibeSignatureSummary)}</p>
              <p><strong>Peak Window:</strong> ${escapeHtml(g.bestWindow)} | <strong>Acoustics:</strong> ${escapeHtml(g.acousticProfile)}</p>
            </article>
          `
          ).join('\n')}
        </section>
      </article>
    </div>
  `.trim();

  const sbRegistryHtml = injectRoutePage({
    baseHtml,
    title: 'London South Bank (SE1) Canonical Vibe Signature Registry: Destination, Hotels & Local Gems | AtmosVibe',
    description:
      'Verified 8-Signal Vibe Signatures for London South Bank (SE1): Destination Vibe (91.3/100), Walkability (97.2/100), Sea Containers London, Bankside Hotel, The Hoxton Southwark, and 6 zero-chain local gems.',
    canonicalUrl: REGISTRY_URLS.southBankRegistry,
    jsonLdObject: buildSouthBankRegistryJsonLd(),
    staticRootHtml: southBankStaticHtml,
  });

  const sbRegistryOutDir = path.join(distDir, 'registry', 'london-south-bank');
  fs.mkdirSync(sbRegistryOutDir, { recursive: true });
  fs.writeFileSync(path.join(sbRegistryOutDir, 'index.html'), sbRegistryHtml, 'utf-8');

  const sbAliasOutDir = path.join(distDir, 'london', 'south-bank');
  fs.mkdirSync(sbAliasOutDir, { recursive: true });
  fs.writeFileSync(path.join(sbAliasOutDir, 'index.html'), sbRegistryHtml, 'utf-8');

  // 5. /vibe-insights/richmond-set-jetting-study, /registry/london-richmond & /london/richmond
  const richmondStaticHtml = `
    <div class="vibe-insights-static-prerender">
      <article>
        <header>
          <p>VIBE INSIGHTS STUDY #03 &amp; CANONICAL REGISTRY • ${escapeHtml(RICHMOND_STUDY_META.studyCode)} • VERIFIED ${escapeHtml(RICHMOND_STUDY_META.lastVerified)}</p>
          <h1>${escapeHtml(RICHMOND_STUDY_META.title)}</h1>
          <p>${escapeHtml(RICHMOND_STUDY_META.subtitle)}</p>
        </header>
        <section>
          <h2>Executive Findings: Can ChatGPT, Gemini &amp; Perplexity Plan a Vibey Trip in Richmond?</h2>
          <ul>
            <li><strong>1. Screen Tourism Demand (${RICHMOND_STUDY_META.kpis.expediaSetJettingAllPct}% Global / ${RICHMOND_STUDY_META.kpis.expediaSetJettingNextGenPct}% Gen Z &amp; Millennials):</strong> Expedia Unpack research shows two-thirds of travellers (and 81% of Gen Z &amp; Millennials) are inspired by film and TV, while VisitBritain reports ${RICHMOND_STUDY_META.kpis.visitBritainScreenVisitPct}% of recent UK visitors visited a screen location.</li>
            <li><strong>2. The 3-LLM Prompt Test (3 / 3 Models Identical Corner Checklist):</strong> ChatGPT, Google Gemini and Perplexity all send visitors to 28 The Green and 3.5-metre-wide Paved Court — while 2 of 3 models tell Richmond visitors to visit Selhurst Park Stadium (14 miles away in South Norwood, SE25).</li>
            <li><strong>3. What 0 out of 3 LLMs Mention (60 Metres Across the Green):</strong> 0 out of 3 tested AI models recommend walking 60 metres across Richmond Green to partner anchor The Coach &amp; Horses (29 The Green, TW9 1LX • 94.8/100 Pub Vibe) or following the 1.2 km Thames Path walk to Petersham Meadows.</li>
            <li><strong>4. Real 24-Hour Richmond Vibe (${RICHMOND_STUDY_META.kpis.real24HrVibeScore}/100):</strong> Verified across AtmosVibe’s 8 Vibe Signals: ${RICHMOND_STUDY_META.kpis.independentRatioPct}% independent village venues, 6 audited local spots and 3 boutique hotels.</li>
          </ul>
        </section>
        <section>
          <h2>What the 3 Tested LLMs Recommend vs. Where the Real Atmosphere Lives: 6 Audited Richmond Locations</h2>
          ${RICHMOND_SCREEN_VS_REALITY_LOCATIONS.map(
            (loc) => `
            <article>
              <h3>Checkpoint #${escapeHtml(loc.checkpointNumber)}: ${escapeHtml(loc.name)} (${escapeHtml(loc.address)})</h3>
              <p><strong>3-LLM Benchmark Result:</strong> ${escapeHtml(loc.scores.llmMentions)} | <strong>Verified Real Vibe:</strong> ${loc.scores.verifiedOptimalVibe}/100</p>
              <p><strong>What the 3 Tested LLMs Do:</strong> ${escapeHtml(loc.selfieTrapReality)}</p>
              <p><strong>Verified Street Reality &amp; Best Atmosphere:</strong> ${escapeHtml(loc.verifiedStreetReality)}</p>
              <p><strong>Best Time to Visit:</strong> ${escapeHtml(loc.bestWindow)}</p>
            </article>
          `
          ).join('\n')}
        </section>
        <section>
          <h2>The 24-Hour Richmond Plan</h2>
          <ul>
            ${RICHMOND_24HR_BLUEPRINT.map(
              (b) => `<li><strong>${escapeHtml(b.time)} (${escapeHtml(b.phase)}) — ${escapeHtml(b.title)}:</strong> ${escapeHtml(b.detail)}</li>`
            ).join('\n')}
          </ul>
        </section>
        <section>
          <h2>Where to Stay Overnight: Audited Richmond Boutique Hotels (TravelVRSE Launch Cohort)</h2>
          ${RICHMOND_HOTEL_SIGNATURES.map(
            (h) => `
            <article>
              <h3>${escapeHtml(h.name)} (${escapeHtml(h.address)}) — ${h.scores.physicalVibe}/100 Physical Vibe</h3>
              <p><strong>Love this if:</strong> ${escapeHtml(h.loveThisIf)}</p>
              <p><strong>Avoid this if:</strong> ${escapeHtml(h.avoidThisIf)}</p>
              <p><strong>Setting:</strong> ${escapeHtml(h.scores.stayFeel)} — ${escapeHtml(h.atmosphereProfile)}</p>
            </article>
          `
          ).join('\n')}
        </section>
      </article>
    </div>
  `.trim();

  const richmondStudyHtml = injectRoutePage({
    baseHtml,
    title: `${RICHMOND_STUDY_META.title} | AtmosVibe Vibe Insights & Registry`,
    description: RICHMOND_STUDY_META.subtitle,
    canonicalUrl: RICHMOND_URLS.studyCanonical,
    jsonLdObject: buildRichmondRegistryJsonLd(),
    staticRootHtml: richmondStaticHtml,
  });

  const richmondStudyOutDir = path.join(distDir, 'vibe-insights', 'richmond-set-jetting-study');
  fs.mkdirSync(richmondStudyOutDir, { recursive: true });
  fs.writeFileSync(path.join(richmondStudyOutDir, 'index.html'), richmondStudyHtml, 'utf-8');

  const richmondRegHtml = injectRoutePage({
    baseHtml,
    title: 'Richmond-upon-Thames (TW9 / TW10) Canonical Vibe Signature Registry & Set-Jetting Study | AtmosVibe',
    description: RICHMOND_STUDY_META.subtitle,
    canonicalUrl: RICHMOND_URLS.registryCanonical,
    jsonLdObject: buildRichmondRegistryJsonLd(),
    staticRootHtml: richmondStaticHtml,
  });

  const richmondRegOutDir = path.join(distDir, 'registry', 'london-richmond');
  fs.mkdirSync(richmondRegOutDir, { recursive: true });
  fs.writeFileSync(path.join(richmondRegOutDir, 'index.html'), richmondRegHtml, 'utf-8');

  const richmondAliasOutDir = path.join(distDir, 'london', 'richmond');
  fs.mkdirSync(richmondAliasOutDir, { recursive: true });
  fs.writeFileSync(path.join(richmondAliasOutDir, 'index.html'), richmondRegHtml, 'utf-8');

  // 6. /methodology Page
  const methodologyStaticHtml = `
    <div class="vibe-insights-static-prerender">
      <article>
        <h1>${escapeHtml(ATMOSVIBE_METHODOLOGY_DATA.title)}</h1>
        <p>${escapeHtml(ATMOSVIBE_METHODOLOGY_DATA.subtitle)}</p>
        ${ATMOSVIBE_METHODOLOGY_DATA.pillars
          .map((p) => `<section><h2>${escapeHtml(p.title)}</h2><p>${escapeHtml(p.summary)}</p></section>`)
          .join('\n')}
        <p>${escapeHtml(ATMOSVIBE_METHODOLOGY_DATA.editorialDisclosure)}</p>
      </article>
    </div>
  `.trim();

  const methodologyOutDir = path.join(distDir, 'methodology');
  fs.mkdirSync(methodologyOutDir, { recursive: true });
  const methodologyHtml = injectRoutePage({
    baseHtml,
    title: `${ATMOSVIBE_METHODOLOGY_DATA.title} | AtmosVibe`,
    description: ATMOSVIBE_METHODOLOGY_DATA.subtitle,
    canonicalUrl: REGISTRY_URLS.methodology,
    jsonLdObject: buildMethodologyJsonLd(),
    staticRootHtml: methodologyStaticHtml,
  });
  fs.writeFileSync(path.join(methodologyOutDir, 'index.html'), methodologyHtml, 'utf-8');

  // 7. Generate Machine-Readable Public JSON Datasets in public/datasets/ and dist/datasets/
  const publicDatasetsDir = path.join(publicDir, 'datasets');
  const distDatasetsDir = path.join(distDir, 'datasets');
  fs.mkdirSync(publicDatasetsDir, { recursive: true });
  fs.mkdirSync(distDatasetsDir, { recursive: true });

  const london10DatasetJson = {
    schemaVersion: '2026.11',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    publisher: {
      name: 'AtmosVibe Hospitality & Destination Intelligence',
      url: 'https://www.atmosvibe.io',
      methodologyUrl: 'https://www.atmosvibe.io/methodology',
    },
    studyMeta: LONDON_10_STUDY_META,
    hotels: LONDON_10_HOTELS.map((h) => ({
      id: h.id,
      index: h.index,
      name: h.name,
      neighborhood: h.neighborhood,
      cluster: h.cluster,
      scores: {
        physicalVibe: h.mathVibeScore,
        ownedDigitalOwnPropertyVibe: h.ownPropertyDigitalScore,
        ownedDigitalLocalDestinationVibe: h.localDestinationDigitalScore,
        bookingComTop5HeroScore: h.otaTop5Score,
      },
      totalOtaGalleryPhotos: h.totalPhotos,
      heroTop5Mix: h.heroTop5Mix,
      headlineFinding: h.headlineFinding,
      ownPropertyDigitalSummary: h.ownPropertyDigitalSummary,
      localDestinationDigitalSummary: h.localDestinationDigitalSummary,
      otaRealitySummary: h.otaRealitySummary,
      buriedGemsMissingFromTop5: h.buriedGems,
      bookingComTop5Slots: h.top5.map((s) => ({
        slot: s.slot,
        isCommodity: s.isCommodity,
        caption: s.title,
        verdict: s.slotVerdict,
      })),
    })),
  };

  const southBankDatasetJson = {
    schemaVersion: '2026.11',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    publisher: {
      name: 'AtmosVibe Hospitality & Destination Intelligence',
      url: 'https://www.atmosvibe.io',
      methodologyUrl: 'https://www.atmosvibe.io/methodology',
    },
    canonicalUrl: REGISTRY_URLS.southBankRegistry,
    destinationSignature: SOUTH_BANK_DESTINATION_SIGNATURE,
    auditedHotels: SOUTH_BANK_HOTEL_SIGNATURES,
    verifiedLocalGems: SOUTH_BANK_LOCAL_GEM_SIGNATURES,
  };

  const richmondDatasetJson = {
    schemaVersion: '2026.11',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    publisher: {
      name: 'AtmosVibe Hospitality & Destination Intelligence',
      url: 'https://www.atmosvibe.io',
      methodologyUrl: 'https://www.atmosvibe.io/methodology',
    },
    canonicalStudyUrl: RICHMOND_URLS.studyCanonical,
    canonicalRegistryUrl: RICHMOND_URLS.registryCanonical,
    studyMeta: RICHMOND_STUDY_META,
    llmBenchmarkTest: RICHMOND_LLM_BENCHMARK_TEST,
    destinationSignature: RICHMOND_DESTINATION_SIGNATURE,
    auditedLocations: RICHMOND_SCREEN_VS_REALITY_LOCATIONS,
    auditedHotels: RICHMOND_HOTEL_SIGNATURES,
    twentyFourHourBlueprint: RICHMOND_24HR_BLUEPRINT,
  };

  const writeDataset = (filename, dataObj) => {
    const jsonStr = JSON.stringify(dataObj, null, 2);
    fs.writeFileSync(path.join(publicDatasetsDir, filename), jsonStr, 'utf-8');
    fs.writeFileSync(path.join(distDatasetsDir, filename), jsonStr, 'utf-8');
  };

  writeDataset('london-10-ota-benchmark.json', london10DatasetJson);
  writeDataset('london-south-bank-registry.json', southBankDatasetJson);
  writeDataset('london-richmond-llm-benchmark.json', richmondDatasetJson);

  // 8. Generate /llms.txt and /llms-full.txt for AI Search Crawlers (Perplexity, ChatGPT Search, Claude, Gemini)
  const llmsTxt = `# AtmosVibe — Canonical Hospitality & Destination Vibe Intelligence Registry

> AtmosVibe (https://www.atmosvibe.io) is an independent hospitality and destination intelligence database that audits and verifies the 8 real-world Vibe & Experience Signals of neighbourhoods, boutique hotels, and independent local gems — benchmarking physical reality against Owned Digital, OTA Top-5 Hero galleries (Booking.com), and AI Trip Planners (ChatGPT, Google Gemini, Perplexity). All datasets are published under a Creative Commons CC-BY 4.0 open citation licence.

## Canonical Benchmark Studies (Vibe Insights)

- [Study #01 — London 10 Boutique & Lifestyle Hotel OTA Top-5 Hero Benchmark (AV-INSIGHTS-2026-LON10)](https://www.atmosvibe.io/vibe-insights/london-boutique-ota-gap): Empirical audit of 10 flagship London lifestyle hotels (463 total Booking.com photos, 50 Top-5 Hero slots). Physical Vibe averages 92.5/100 and Owned Digital in-house marketing averages 88.4/100, yet Booking.com Top-5 Hero galleries collapse to 56.5/100 (with 70% of Top-5 slots occupied by repetitive bedrooms, bathroom sinks, toiletries, or gym equipment).
- [Study #02 — The "Walled Garden" Local Destination Blind Spot (AV-RES-2026-LON-DEST)](https://www.atmosvibe.io/vibe-insights/london-local-destination-gap): Why London’s top 10 lifestyle hotels score 88.4/100 at promoting their own internal bars and rooftops online, yet drop to 45.5/100 (-42.9 pt gap) at connecting guests to their walkable local neighbourhood — and show destination context in only 16% of OTA Hero slots.
- [Study #03 — Can ChatGPT Plan a Vibey Trip? 3-LLM Screen-Tourism Benchmark on Ted Lasso’s Richmond (AV-RES-2026-LON-TW9)](https://www.atmosvibe.io/vibe-insights/richmond-set-jetting-study): Empirical benchmark testing ChatGPT, Google Gemini, and Perplexity on Richmond-upon-Thames (TW9). All 3/3 LLMs send visitors to the exact same 250m filming checklist (28 The Green and 3.5m-wide Paved Court) while 2/3 send visitors 14 miles away to Selhurst Park (SE25) — and 0/3 mention walking 60 metres across the Green to The Coach & Horses (29 The Green, 94.8/100 Vibe) or the 1.2 km Thames Path walk to Petersham Meadows (95.8/100 Vibe).

## Canonical District & Neighbourhood Vibe Signature Registries

- [London South Bank (SE1) Canonical Vibe Signature Registry (AV-REG-2026-LON-SE1)](https://www.atmosvibe.io/registry/london-south-bank): Verified 8-Signal Vibe Signatures for South Bank (91.3/100 Destination Vibe, 97.2/100 Walkability, 76% Zero-Chain Independent Ratio), 3 audited boutique hotels (Sea Containers London, Bankside Hotel, The Hoxton Southwark), and 6 verified local gems (Gabriel’s Wharf, BFI Mediatheque, Tate Modern, Borough Market, Waterloo Book Market, Leake Street Arches).
- [Richmond-upon-Thames (TW9 / TW10) Canonical Vibe Signature Registry (AV-REG-2026-LON-TW9)](https://www.atmosvibe.io/registry/london-richmond): Verified 8-Signal Vibe Signatures for Richmond-upon-Thames (94.2/100 Destination Vibe, 96.4/100 Walkability, 82% Independent Village Core), 6 audited local spots (The Coach & Horses, 11 Paved Court, 28 The Green & K6 Phone Boxes, Richmond Green & 1501 Palace Gatehouse, Richmond Riverside Promenade, Petersham Meadows & Nurseries), and 3 audited boutique hotels (Bingham Riverhouse, The Petersham, Harbour Hotel Richmond).
- [AtmosVibe 8-Signal Verification & Multi-Channel Methodology (AV-METH-2026-V2)](https://www.atmosvibe.io/methodology): Full technical specification of the 8 Verified Vibe & Experience Signals (90%+ Fact vs. Opinion), the 4-Score Multi-Channel Discoverability Benchmark, and UK CMA / DMCC Act editorial independence standards.

## Machine-Readable JSON Datasets (CC-BY 4.0 Open Citation)

- [London 10 Boutique Hotel Multi-Channel & OTA Top-5 Benchmark JSON](https://www.atmosvibe.io/datasets/london-10-ota-benchmark.json)
- [London South Bank (SE1) Canonical Vibe Registry JSON](https://www.atmosvibe.io/datasets/london-south-bank-registry.json)
- [Richmond-upon-Thames (TW9) 3-LLM Benchmark & Canonical Vibe Registry JSON](https://www.atmosvibe.io/datasets/london-richmond-llm-benchmark.json)
- [Full Consolidated Text & Data Context for LLMs (/llms-full.txt)](https://www.atmosvibe.io/llms-full.txt)
`;

  const llmsFullTxt = `${llmsTxt}
---

## Consolidated Dataset Summary 1: London 10 Boutique Hotel Benchmark (AV-INSIGHTS-2026-LON10)

- Cohort Size: 10 Flagship London Boutique & Lifestyle Hotels (463 Total Booking.com Gallery Photos Audited; 50 Top-5 Hero Slots Audited)
- Cohort Averages:
  - A. Physical Vibe & Experiences Reality: ${LONDON_10_STUDY_META.kpis.avgMathVibeScore} / 100
  - B1. Owned Digital — In-House Property Vibe (Website & Instagram): ${LONDON_10_STUDY_META.kpis.avgOwnPropertyDigitalScore} / 100
  - B2. Owned Digital — Local Destination & Neighbourhood Connection ("Walled Garden Test"): ${LONDON_10_STUDY_META.kpis.avgLocalDestinationDigitalScore} / 100
  - C. Booking.com Top-5 Hero Gallery Score: ${LONDON_10_STUDY_META.kpis.avgOtaTop5Score} / 100 (70% Rooms/Bathrooms/Utility Clutter; 14% Social/Culinary; 16% Destination Context)

${LONDON_10_HOTELS.map(
  (h) => `### ${h.index}. ${h.name} (${h.neighborhood} — ${h.cluster})
- Physical Vibe: ${h.mathVibeScore}/100 | Owned Digital (Own Vibe): ${h.ownPropertyDigitalScore}/100 | Owned Digital (Local Area): ${h.localDestinationDigitalScore}/100 | Booking.com Top-5 Hero: ${h.otaTop5Score}/100
- Headline Finding: ${h.headlineFinding}
- Missing from Booking.com Top 5: ${h.buriedGems.join('; ')}`
).join('\n\n')}

---

## Consolidated Dataset Summary 2: London South Bank (SE1) Canonical Vibe Registry (AV-REG-2026-LON-SE1)

- Composite Destination Vibe Signature: ${SOUTH_BANK_DESTINATION_SIGNATURE.compositeVibeScore}/100 | Walkability: ${SOUTH_BANK_DESTINATION_SIGNATURE.walkabilityScore}/100 | Zero-Chain Independent Ratio: ${SOUTH_BANK_DESTINATION_SIGNATURE.independentGemRatioPct}%
- Audited South Bank Boutique Hotels:
${SOUTH_BANK_HOTEL_SIGNATURES.map(
  (h) => `  - ${h.name} (${h.address}): Physical Vibe ${h.scores.physicalVibe}/100, Own Digital ${h.scores.ownPropertyDigital}/100, Local Area Digital ${h.scores.localDestinationDigital}/100, OTA Top-5 ${h.scores.otaTop5Hero}/100. Best for: ${h.bestFor}.`
).join('\n')}
- Verified South Bank Local Gems:
${SOUTH_BANK_LOCAL_GEM_SIGNATURES.map(
  (g) => `  - ${g.name} (${g.address} • ${g.vibeScore}/100 Vibe): ${g.vibeSignatureSummary}`
).join('\n')}

---

## Consolidated Dataset Summary 3: Richmond-upon-Thames (TW9 / TW10) 3-LLM Benchmark & Canonical Registry (AV-RES-2026-LON-TW9)

- Prompt Tested Across ChatGPT, Google Gemini & Perplexity: ${RICHMOND_LLM_BENCHMARK_TEST.promptTested}
- Key Findings:
${RICHMOND_LLM_BENCHMARK_TEST.findings.map((f) => `  - ${f.label} (${f.verdict}): ${f.detail}`).join('\n')}
- Verified Richmond Locations (LLM Mentions vs. Verified Vibe Score):
${RICHMOND_SCREEN_VS_REALITY_LOCATIONS.map(
  (l) => `  - #${l.checkpointNumber} ${l.name} (${l.address}): AI Mentions: ${l.scores.llmMentions} | Verified Vibe: ${l.scores.verifiedOptimalVibe}/100. ${l.verifiedStreetReality}`
).join('\n')}
- Audited Richmond Boutique Hotels:
${RICHMOND_HOTEL_SIGNATURES.map(
  (h) => `  - ${h.name} (${h.address} • ${h.scores.physicalVibe}/100 Physical Vibe): ${h.bestFor}.`
).join('\n')}
`;

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');

  console.log(
    '[prerender] Successfully generated static HTML, JSON-LD, /datasets/*.json, /llms.txt, and /llms-full.txt'
  );
}

runPrerender();
