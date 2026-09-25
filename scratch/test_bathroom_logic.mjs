function isBathCandidate(title, url, detectedCategory) {
  const s = `${title || ''} ${url || ''}`.toLowerCase();
  
  // Must have explicit bathroom cues
  const hasBathCue = detectedCategory === 'BATHROOM' || 
    s.includes('bathroom') || 
    s.includes('clawfoot') || 
    s.includes('soaking tub') || 
    s.includes('bathtub') || 
    s.includes('walk-in shower') || 
    s.includes('rainfall shower') || 
    s.includes('bath_wide') || 
    s.includes('vanity');

  if (!hasBathCue) return false;

  // Reject if it's explicitly titled as just a bedroom with a bed
  if (s.includes('bedroom with a bed') || s.includes('view of bedroom') || s.includes('double room with private bath')) {
    return false;
  }

  return true;
}

console.log('Testing obts-bath_wide.jpg:', isBathCandidate('Deluxe King Suite Bathroom with Soaking Tub', 'https://image-tc.galaxy.tf/wijpeg-9b35z5btd20vlqs8jqyphu9jj/obts-bath_wide.jpg', 'BATHROOM'));
console.log('Testing Photo #3 (bedroom):', isBathCandidate('Double room with private bathroom', 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/175766765.jpg', 'ROOM'));
