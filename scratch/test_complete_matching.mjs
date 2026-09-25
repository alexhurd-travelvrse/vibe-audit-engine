import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// Test photos from live Plymouth scrape
const liveBookingPhotos = [
  { slot: 1, title: "a swimming pool in front of a building with palm trees at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/402289199.jpg" },
  { slot: 2, title: "a hotel room with a bed and a desk and a window at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175766798.jpg" },
  { slot: 3, title: "a bedroom with a bed and a bathroom with a sink at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175766765.jpg" },
  { slot: 4, title: "a large swimming pool with lounge chairs and umbrellas at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/402289228.jpg" },
  { slot: 5, title: "a restaurant with tables and chairs and lights at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175773716.jpg" },
  { slot: 6, title: "a living room with a couch and a table at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175765147.jpg" }
];

const amenityPhotos = [
  { title: "One Bedroom Terrace Suite | The Plymouth Hotel South Beach", imageUrl: "https://image-tc.galaxy.tf/wijpeg-9b35z5btd20vlqs8jqyphu9jj/obts-bath_wide.jpg", detectedCategory: 'BATHROOM' },
  { title: "Delicious Food & Beverages | The Plymouth", imageUrl: "https://image-tc.galaxy.tf/wijpeg-3x77bxo5mjro4bo7s7zp8fgex/imgi-39-file.jpg", detectedCategory: 'SOCIAL' },
  { title: "Contact and Location | The Plymouth", imageUrl: "https://image-tc.galaxy.tf/wijpeg-ce7bgthubkycaqgb3n6h794lk/img-1608.jpg", detectedCategory: 'EXTERIOR' }
];

function isBathroomPhoto(p) {
  const u = (p.imageUrl || '').toLowerCase();
  const t = (p.title || '').toLowerCase();
  
  // High confidence URL cue
  if (u.includes('bath') || u.includes('tub') || u.includes('shower') || u.includes('vanity')) {
    return true;
  }
  
  // Title cue
  const hasBathTitle = t.includes('bathroom') || t.includes('soaking tub') || t.includes('clawfoot') || t.includes('freestanding tub') || t.includes('walk-in shower');
  const isBedroomWithBed = t.includes('bedroom with a bed') || t.includes('room with a bed') || t.includes('double room with private bath');
  
  if (hasBathTitle && !isBedroomWithBed) return true;
  if (p.detectedCategory === 'BATHROOM' && !isBedroomWithBed) return true;
  return false;
}

console.log('Testing liveBookingPhotos[2] (Bedroom with bath):', isBathroomPhoto(liveBookingPhotos[2])); // should be false
console.log('Testing obts-bath_wide.jpg (Terrace Suite):', isBathroomPhoto(amenityPhotos[0])); // should be true
