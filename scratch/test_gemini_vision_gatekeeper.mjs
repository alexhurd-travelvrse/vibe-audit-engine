import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error('No GEMINI_API_KEY found');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Helper to download image base64 with 3s timeout
async function downloadImage(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) return null;
    return {
      inlineData: {
        data: buf.toString('base64'),
        mimeType: 'image/jpeg'
      }
    };
  } catch (e) {
    return null;
  }
}

async function testVisionGatekeeper() {
  console.log('Testing Batched Gemini Multimodal Gatekeeper for 25hours Copenhagen...');

  // The actual live photos from 25hours Copenhagen (top 8)
  const candidatePhotos = [
    { id: 1, title: 'a lobby with a green couch and a sculpture', url: 'https://cf.bstatic.com/xdata/images/hotel/max500/914625284.jpg?k=c4595822e088e04a3cebd0924ae887b82212e0cdd77e7573b08a067770892d36&o=' },
    { id: 2, title: 'a bedroom with a large bed and a large window', url: 'https://cf.bstatic.com/xdata/images/hotel/max500/914625330.jpg?k=d06043d9cae69a872ea42f4336b3b9736c4fb09180fac047609052dc20269592&o=' },
    { id: 3, title: 'a bath tub in a bathroom with a window', url: 'https://cf.bstatic.com/xdata/images/hotel/max500/914625350.jpg?k=df467ed12d38824ac8d9a32974fa1cf290e8a6355470b3f03e535a7215d43d42&o=' },
    { id: 4, title: 'a restaurant with tables and chairs in a building', url: 'https://cf.bstatic.com/xdata/images/hotel/max500/914625368.jpg?k=a995e8455cb14f8386b10c9e4ba0e30f6be5f4b48a0168f05beab1b80737195d&o=' },
    { id: 5, title: 'a hotel room with a bed and a television', url: 'https://cf.bstatic.com/xdata/images/hotel/max500/914625305.jpg?k=a247ab7dcc0274190cc027d064f61ef9f6a0e20b05836e2646158f65d91689e7&o=' },
    { id: 6, title: 'a row of benches in a courtyard next to a building', url: 'https://cf.bstatic.com/xdata/images/hotel/max500/753111968.jpg?k=39ea06bd931d3f74678d1b4a7c5ac8002a9e9681c2b07cdab665909f1153b6f9&o=' },
    { id: 7, title: 'a conference room with tables and chairs in a building', url: 'https://cf.bstatic.com/xdata/images/hotel/max500/916853043.jpg?k=9e0560b029452e6d7be9d0b21e24cffeeae0d377ed79fde51700dd1129fd9a3e&o=' },
    { id: 8, title: 'another restaurant shot deep gallery', url: 'https://cf.bstatic.com/xdata/images/hotel/max500/914625292.jpg?k=3f8ce495cce3d5432c0b7c6f28240ffe63da67e077d1a7174668e5c5783852dc&o=&hp=1' }
  ];

  const t0 = Date.now();
  const downloaded = await Promise.all(candidatePhotos.map(c => downloadImage(c.url)));
  console.log(`Downloaded ${downloaded.filter(Boolean).length}/${candidatePhotos.length} images in ${Date.now() - t0}ms`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          classifications: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                candidate_id: { type: 'INTEGER' },
                primary_category: { type: 'STRING' },
                is_exterior: { type: 'BOOLEAN' },
                is_dining_or_bar: { type: 'BOOLEAN' },
                has_bed: { type: 'BOOLEAN' },
                has_bath: { type: 'BOOLEAN' },
                has_window_light: { type: 'BOOLEAN' },
                is_tight_food_macro: { type: 'BOOLEAN' },
                best_fit_slot: { type: 'STRING' },
                brief_visual_description: { type: 'STRING' }
              },
              required: ['candidate_id', 'primary_category', 'is_exterior', 'is_dining_or_bar', 'has_bed', 'has_bath', 'has_window_light', 'is_tight_food_macro', 'best_fit_slot', 'brief_visual_description']
            }
          }
        },
        required: ['classifications']
      },
      temperature: 0.1
    }
  });

  const promptParts = [
    {
      text: `You are an expert hospitality visual gatekeeper.
Analyze each of the following ${candidatePhotos.length} hotel images and classify their true architectural and spatial nature based purely on VISUAL CONTENT.

For each image, output an object with:
- candidate_id (1-indexed matching image number)
- primary_category: one of ["EXTERIOR_FACADE", "COURTYARD_OUTDOOR", "ROOFTOP_SKYLINE", "POOL_DECK", "RESTAURANT_DINING", "BAR_LOUNGE", "LOBBY_SOCIAL", "BEDROOM", "BATHROOM", "MEETING_CONFERENCE", "TIGHT_FOOD_MACRO", "GENERIC_OTHER"]
- is_exterior: boolean (true ONLY if outdoors showing street, building facade, courtyard, or open sky)
- is_dining_or_bar: boolean (true if restaurant, bar, cocktail lounge, dining room)
- has_bed: boolean (true if sleeping bed is present)
- has_bath: boolean (true if bathroom, tub, or shower is present)
- has_window_light: boolean (true if natural daylight/window is visible)
- is_tight_food_macro: boolean (true if camera is focused closely on food plates rather than the room)
- best_fit_slot: one of ["SLOT_1_HERO_MAGNET", "SLOT_2_EXTERIOR", "SLOT_3_SUITE_BEDROOM", "SLOT_4_DINING_SOCIAL", "SLOT_5_BATHROOM", "DISQUALIFIED"]
- brief_visual_description: string (e.g. "Indoor glass atrium dining room with tables and greenery")

CRITICAL RULES:
- An indoor dining room or restaurant with tables and chairs is NEVER an exterior, even if inside a historic building.
- A street facade, courtyard, or outdoor building elevation IS an exterior.
- A meeting room with a long boardroom table is MEETING_CONFERENCE, NOT a restaurant.

Return JSON:
{
  "classifications": [ ... ]
}`
    }
  ];

  downloaded.forEach((img, idx) => {
    promptParts.push({ text: `\n[IMAGE #${candidatePhotos[idx].id} - Original Alt: "${candidatePhotos[idx].title}"]:` });
    if (img) {
      promptParts.push(img);
    }
  });

  const t1 = Date.now();
  const result = await model.generateContent(promptParts);
  const duration = Date.now() - t1;

  console.log(`\nGemini Vision Classification completed in ${duration}ms!`);
  const parsed = JSON.parse(result.response.text());
  console.log('\n=== VISUAL CLASSIFICATIONS ===');
  parsed.classifications.forEach(c => {
    console.log(`\nImage #${c.candidate_id}: [${c.primary_category}] -> ${c.best_fit_slot}`);
    console.log(`  is_exterior: ${c.is_exterior} | is_dining_or_bar: ${c.is_dining_or_bar}`);
    console.log(`  has_bed: ${c.has_bed} | has_bath: ${c.has_bath} | window: ${c.has_window_light}`);
    console.log(`  Description: "${c.brief_visual_description}"`);
  });
}

testVisionGatekeeper();
