import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('No Gemini API key found in environment.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function getDesignFeedback() {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const prompt = `
You are a Principal Product Designer and Design Systems Architect who has designed interfaces for high-end luxury B2B SaaS and hospitality platforms (such as Stripe, Linear, Airbnb Luxe, Vercel, and Aman Resorts).
The brand is AtmosVibe, a high-converting B2B hospitality intelligence platform where luxury hotel GMs, commercial directors, and asset managers optimize their OTA photos, dwell times, and Vibe Signatures.

Here is the current container styling and design implementation across the AtmosVibe Home Page:

---
1. HERO ACTION BOX (The primary entry point container):
- Container: background: rgba(10, 25, 47, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 18px; box-shadow: 0 16px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.15); padding: 1.6rem 1.75rem.
- Input box: background: rgba(5, 11, 20, 0.85); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 12px;
- Submit button: background: linear-gradient(135deg, #00e5ff 0%, #00b0ff 100%); color: #050b14; font-weight: 800; border-radius: 12px;
- Sample chips: background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 20px; font-size: 0.8rem.

---
2. VIBE SIGNATURES / WHAT GETS UNLOCKED (2-Tier Comparison Cards):
- 2-tier grid with two large cards:
  - Free Tier Card: border-radius: 24px; padding: 2.25rem 2rem; background: radial-gradient(circle at 10% 10%, rgba(0, 229, 255, 0.05) 0%, rgba(10, 25, 47, 0.6) 100%); border: 1px solid rgba(0, 229, 255, 0.25);
  - Pro Tier Card: border-radius: 24px; padding: 2.25rem 2rem; background: radial-gradient(circle at 10% 10%, rgba(255, 215, 0, 0.08) 0%, rgba(10, 25, 47, 0.8) 100%); border: 1px solid rgba(255, 215, 0, 0.35); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.1);
  - Inside: Tree structure nodes with cyan and gold circular icon nodes connected by vertical connector lines.

---
3. PROBLEM & PROOF SECTION:
- Stat cards: 3 cards showing 74%, 80%, etc. background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px;
- Proof box: background: rgba(239, 68, 68, 0.03); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 24px; padding: 2.5rem;
- OTA Trap card inside: background: rgba(10, 15, 28, 0.95); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 18px;

---
4. HOW IT WORKS (3-Step Flow):
- 3 Step cards in grid: background: rgba(10, 25, 47, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 2.25rem 1.75rem.

---
5. COMPARISON / MAGNET OVERRIDE (Side-by-side columns):
- Loser Column: background: rgba(239, 68, 68, 0.02); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 24px;
- Winner Column (The AtmosVibe Reorder): background: radial-gradient(circle at 50% 0%, rgba(0, 229, 255, 0.08) 0%, rgba(10, 25, 47, 0.9) 70%); border: 1px solid rgba(0, 229, 255, 0.35); border-radius: 24px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 229, 255, 0.15);
- Slots inside: 5 slots with photo thumbnails, badges, and copy.

---
6. MID-PAGE CTA CARD:
- Focal card: background: radial-gradient(circle at 50% 0%, rgba(0, 229, 255, 0.12) 0%, rgba(10, 25, 47, 0.85) 60%, rgba(5, 11, 20, 0.95) 100%); border: 1px solid rgba(0, 229, 255, 0.35); box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(0, 229, 255, 0.15); border-radius: 28px; padding: 3.5rem 2rem.

---
7. GLOBAL BENCHMARKS & MARKETS:
- Cards: background: rgba(10, 25, 47, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 2rem;

---
8. PARTNER REGISTRATION FORM (Footer):
- Glass card: background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 3rem;

==================================================
TASK:
Provide a rigorous, high-level design critique and constructive design feedback aimed at making these containers look as institutional, high-end, and professional as possible.

Specifically cover:
1. THE EXECUTIVE IMPRESSION: How do the current containers read to a Luxury Hotel Executive or Commercial Director? (e.g. Does the heavy cyan/navy saturation look like Web3 / cyberpunk / gaming rather than quiet luxury & high-finance hospitality intelligence?)
2. THE 4 BIGGEST "AMATEUR TELLS" in the Current Container System:
   - High-saturation colored borders (raw 1px solid rgba(0,229,255,0.35))
   - Loud outer neon glow shadows (box-shadow: 0 0 35px rgba(0,229,255,0.15))
   - Overly blue/navy background fills (#0a192f) instead of neutral deep obsidian / slate (#0b0f17 / #080c14)
   - Inconsistent border radiuses (18px vs 20px vs 24px vs 28px) and lack of subtle top-edge specular highlights (inset 0 1px 0 rgba(255,255,255,0.1))
3. THE "QUIET LUXURY / LINEAR / STRIPE" SPECIFICATION:
   - Exactly how container surfaces, borders, inner highlights, and ambient drop shadows should be structured.
4. CONCRETE CONTAINER-BY-CONTAINER RECOMMENDATIONS:
   - For the Hero Action Box
   - For the Vibe Signatures 2-Tier Cards
   - For the Stat / Proof Cards
   - For the Side-by-Side Comparison Columns
   - For the Mid-Page CTA & Form
5. A QUICK-WIN CSS PALETTE / TOKENS that could be applied immediately to unify and elevate all containers.
`;

  const res = await model.generateContent(prompt);
  console.log(res.response.text());
}

getDesignFeedback().catch(console.error);
