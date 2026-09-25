import dotenv from 'dotenv';
dotenv.config();

// Let's import matchBestImageForSubject or test it directly
const poolLive = [
  { slot: 1, title: "a swimming pool in front of a building with palm trees at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/402289199.jpg" },
  { slot: 2, title: "a hotel room with a bed and a desk and a window at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175766798.jpg" },
  { slot: 3, title: "a bedroom with a bed and a bathroom with a sink at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175766765.jpg" },
  { slot: 4, title: "a large swimming pool with lounge chairs and umbrellas at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/402289228.jpg" },
  { slot: 5, title: "a restaurant with tables and chairs and lights at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175773716.jpg" },
  { slot: 6, title: "a living room with a couch and a table at The Plymouth South Beach in Miami Beach", imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175765147.jpg" }
];

const poolAmenity = [
  { title: "One Bedroom Terrace Suite | The Plymouth Hotel South Beach", imageUrl: "https://image-tc.galaxy.tf/wijpeg-9b35z5btd20vlqs8jqyphu9jj/obts-bath_wide.jpg", detectedCategory: 'BATHROOM' },
  { title: "Delicious Food & Beverages | The Plymouth", imageUrl: "https://image-tc.galaxy.tf/wijpeg-3x77bxo5mjro4bo7s7zp8fgex/imgi-39-file.jpg", detectedCategory: 'SOCIAL' },
  { title: "Contact and Location | The Plymouth", imageUrl: "https://image-tc.galaxy.tf/wijpeg-ce7bgthubkycaqgb3n6h794lk/img-1608.jpg", detectedCategory: 'EXTERIOR' }
];

// Let's test the 5 slots
const slots = [
  { slot: 1, category: "HERO_CULTURAL_MAGNET", photo_subject: "The Plymouth's Iconic Art Deco Pool with Lush Tropical Foliage and Sun Loungers" },
  { slot: 2, category: "EXTERIOR_LANDMARK", photo_subject: "The Plymouth South Beach Art Deco Facade and Entrance" },
  { slot: 3, category: "SIGNATURE_SUITE_BEDROOM", photo_subject: "Signature King Suite with Modern Art Deco Design and Natural Light" },
  { slot: 4, category: "SOCIAL_FB_ROOFTOP", photo_subject: "Blue Ribbon Sushi Bar & Grill Interior with Elegant Dining Setup and Bar" },
  { slot: 5, category: "SECONDARY_ROOM_BATHROOM", photo_subject: "Design Bathroom with Freestanding Soaking Tub and Marble Finishes" }
];

console.log('Testing slots...');
for (const s of slots) {
  console.log(`Slot ${s.slot}: ${s.category}`);
}
