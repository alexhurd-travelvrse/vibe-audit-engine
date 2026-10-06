import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./.cache/vibe_audits/sea_containers_london___london___south_bank___https___www_booking_com__1497e90521.json', 'utf8'));
const ota = data.ota_conversion_audit || {};
console.log('Hotel:', data.venue_name);
console.log('\n--- SLOTS 1-5 ---');
(ota.optimal_5_photo_sequence || []).forEach((p, i) => {
  console.log('Slot #' + (p.slot || i+1) + ': [' + p.category + '] ' + p.photo_subject + ' | was Slot #' + p.current_slot + ' | url: ' + (p.photo_url || p.current_photo?.imageUrl));
  console.log('   Why:', p.why);
  console.log('   Action:', p.action, '| Label:', p.action_label);
});

console.log('\n--- LIVE PHOTOS 30-40 ---');
if (ota.live_photos) {
  ota.live_photos.forEach((lp, idx) => {
    if (idx >= 30 && idx <= 40) {
      console.log('Live #' + (idx + 1) + ' (index ' + idx + '):', lp.title, '| url:', lp.imageUrl);
    }
  });
}

console.log('\n--- ALL LIVE PHOTOS WITH "SPA" OR "WELLNESS" ---');
if (ota.live_photos) {
  ota.live_photos.forEach((lp, idx) => {
    const t = (lp.title || '') + ' ' + (lp.category || '') + ' ' + (lp.imageUrl || '');
    if (/spa|wellness|treatment|massage|steam|sauna|bath/i.test(t)) {
      console.log('Live #' + (idx + 1) + ':', lp.title, '| url:', lp.imageUrl);
    }
  });
}
