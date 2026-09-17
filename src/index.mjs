import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { fetchVenueCorpus } from './services/serperService.mjs';
import { runStructuredVibeAudit } from './services/geminiService.mjs';
import { renderTerminalAudit } from './utils/terminalView.mjs';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse CLI Arguments
function parseArgs() {
  const args = process.argv.slice(2);
  let hotel = 'Sea Containers London';
  let city = 'London';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--hotel' && args[i + 1]) {
      hotel = args[i + 1];
      i++;
    } else if (args[i] === '--city' && args[i + 1]) {
      city = args[i + 1];
      i++;
    }
  }

  return { hotel, city };
}

async function main() {
  const { hotel, city } = parseArgs();

  console.log(`\n======================================================`);
  console.log(`🚀 STARTING VIBE AUDIT`);
  console.log(`🏨 Target: "${hotel}" | 📍 Location: "${city}"`);
  console.log(`======================================================\n`);

  try {
    // 1. Fetch live intelligence via Serper
    const { rawCorpus } = await fetchVenueCorpus(hotel, city);

    if (!rawCorpus || rawCorpus.trim().length === 0) {
      throw new Error(`Could not gather enough search intelligence for ${hotel}, ${city}. Check search query or Serper API key.`);
    }

    // 2. Execute Structured Gemini Ingestion
    const auditResult = await runStructuredVibeAudit(hotel, city, rawCorpus);

    // 3. Save JSON output to ./output/
    const outputDir = path.resolve(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const safeVenueId = auditResult.venue_id || hotel.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const outputPath = path.join(outputDir, `vibe_audit_${safeVenueId}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(auditResult, null, 2), 'utf-8');
    console.log(`💾 Live Master Vibe Audit saved to: ${outputPath}`);

    // 4. Render Terminal View
    renderTerminalAudit(auditResult);

  } catch (error) {
    console.error(`\n❌ [Vibe Audit] Execution failed:`, error.message);
    process.exit(1);
  }
}

main();
