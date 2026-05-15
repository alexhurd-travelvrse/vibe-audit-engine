import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeLocalSignals } from './src/personaEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function freezeAudit(city, neighborhood) {
  console.log(`[Freeze Tool] Auditing ${city}: ${neighborhood} for the Vault...`);
  
  // 1. Run the high-fidelity audit
  const result = await scrapeLocalSignals(city, neighborhood);
  
  // 2. Load the current vault
  const vaultPath = path.join(__dirname, 'src', 'engine', 'auditVault.json');
  let vault = {};
  if (fs.existsSync(vaultPath)) {
    vault = JSON.parse(fs.readFileSync(vaultPath, 'utf8'));
  }
  
  // 3. Add to vault (using the neighborhood or city as key)
  const key = neighborhood || city;
  vault[key] = {
    ...result,
    sentiment: "Frozen High-Fidelity Audit",
    timestamp: new Date().toISOString()
  };
  
  // 4. Save the vault
  fs.writeFileSync(vaultPath, JSON.stringify(vault, null, 2));
  
  console.log(`\n[SUCCESS] Scorecard for ${key} has been FROZEN into the Audit Vault.`);
  console.log(`Path: ${vaultPath}`);
  console.log(`You can now deploy this to the site for 100% parity.`);
}

// Get args from command line
const [city, neighborhood] = process.argv.slice(2);

if (!city) {
  console.log("Usage: node freeze-audit.js <City> [Neighborhood]");
  process.exit(1);
}

freezeAudit(city, neighborhood);
