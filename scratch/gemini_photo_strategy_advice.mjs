import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('No Gemini API key found.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const prompt = `
You are the Chief Product Officer, Hospitality CRO Director, and AI Systems Architect for AtmosVibe (an AI hospitality intelligence platform for hotel General Managers, Asset Managers, and Commercial Directors).

THE SITUATION:
A hotel GM / user just tested "The Taj Mahal Palace, Mumbai" (one of the world's most famous heritage luxury hotels).
Here is the user's direct feedback:
"ok so just tried out the taj in mumbai and the photos do not match the strategy nor do the photos match the individual write-ups. I think we are at the point where we have to decide whether to use the non-booking.com photos. Please get Geminis advice"

WHAT ACTUALLY HAPPENED IN THE DATA:
1. Strategy mismatch:
   - The strategy shift said: "Elevate the hotel's true historic facade to Slot #1 to eliminate location anxiety near Gateway of India."
   - But Slot #1 was assigned a photo scraped from the official website (cdn.sanity.io): "Modern and minimalist reception area with white counter", and the writeup bizarrely said: "Elevating the hotel's signature design-led lobby and spiral book sculpture to Slot #1..." (referencing 25hours Copenhagen!).
   - Slot #2 was assigned an exterior clock tower photo from Booking.com, but the writeup said: "By promoting this elegant dining room to Slot #2, we immediately showcase the hotel's vibrant social and culinary offerings...".
   - Slot #4 assigned a TripAdvisor salon photo, but writeup talked about "design-forward lobby and social living spaces".
2. The fundamental architectural dilemma:
   AtmosVibe currently tries to scrape:
   - Live Booking.com gallery photos (the 40-100 photos the hotel already has uploaded on Booking.com).
   - PLUS TripAdvisor management photos via Apify.
   - PLUS Official hotel website photos via Playwright.
   Then it tries to "swap in" external photos into the Booking.com 5-photo sequence.

WE NEED YOUR STRATEGIC ADVICE ON:
1. THE CORE PRODUCT DECISION: SHOULD ATMOSVIBE USE NON-BOOKING.COM PHOTOS OR STRICTLY REORDER EXISTING BOOKING.COM PHOTOS?
   - Compare the two product paradigms:
     * Paradigm A (Pure OTA Reorder / Extranet Native): Reorder ONLY the photos currently live on the hotel's Booking.com listing.
       (Value prop: "Log into your Booking.com Extranet, drag Photo #14 to Slot #1 in 30 seconds, get +15% conversion this weekend").
     * Paradigm B (Hybrid Swap-in): Suggesting photos from TripAdvisor or official website.
       (What are the fatal flaws? Copyright, resolution, GM doesn't have the high-res file on hand, mismatch with Extranet inventory, scraping latency/failures).
     * Paradigm C (Strict 5-Photo Reorder + "Missing Shot Gap Analysis"): 
       The 5 reordered slots come 100% from existing Booking.com photos. If a crucial shot is missing from their OTA (e.g. no luxury bathroom or no evening exterior), the system flags it as an "Actionable Photo Gap" to shoot or upload.

2. WHY THE WRITE-UPS DID NOT MATCH THE PHOTOS:
   - Root cause in the AI pipeline (decoupling of Strategy Generation vs Photo Matching vs Few-Shot Hallucinations).
   - How to architect the pipeline so that Gemini NEVER produces a write-up about a "dining room" when the photo is a "clock tower", or mentions "spiral book sculpture" for an Indian palace hotel.

3. CONCRETE RECOMMENDATION:
   What should we tell the user, and what exact architectural change should we make?
`;

async function run() {
    try {
        console.log('Querying Gemini for Photo Strategy Advice...');
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        fs.writeFileSync('scratch/gemini_photo_advice.md', text, 'utf-8');
        console.log('Saved to scratch/gemini_photo_advice.md');
    } catch (err) {
        console.error('Error querying Gemini:', err);
    }
}

run();
