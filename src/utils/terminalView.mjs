export function renderTerminalAudit(data) {
  const v = data.vibe_signature || {};
  const q = data.interactive_quiz_challenge || {};
  const o = data.ota_conversion_audit || {};
  const dna = v.acoustic_dna || {};
  const crowd = v.crowd_archetype || {};
  const qual = v.qualification_test || {};

  const barLength = 20;
  const energy = v.energy_score || 0;
  const filled = Math.round((energy / 100) * barLength);
  const meter = '█'.repeat(filled) + '░'.repeat(Math.max(0, barLength - filled));

  console.log('\n' + '═'.repeat(66));
  console.log(`  🌟 MASTER VIBE AUDIT: ${data.venue_name.toUpperCase()} (${data.location})`);
  console.log('═'.repeat(66));
  console.log(`⚡ Energy Score: [${meter}] ${energy}/100`);
  console.log(`💬 Headline: "${v.headline || 'N/A'}"`);
  console.log(`⏱️  Social Pacing: ${v.social_pacing || 'N/A'}`);
  console.log(`👥 Crowd: ${crowd.primary || 'N/A'} (Density: ${crowd.social_density || 'N/A'})`);
  console.log(`👔 Dress Code: ${crowd.dress_code || 'N/A'}`);

  console.log('\n─── 🎵 ACOUSTIC DNA & SOUNDSCAPE ───');
  console.log(`Genre:          ${dna.soundscape_genre || 'N/A'}`);
  console.log(`Anchor Artists: ${(dna.anchor_artists || []).join(', ') || 'N/A'}`);
  console.log(`Sound Texture:  ${dna.sound_texture || 'N/A'}`);
  console.log(`Spotify Target: ${dna.spotify_query || 'N/A'}`);

  console.log('\n─── 🔍 QUALIFICATION MATRIX ───');
  console.log(`💚 You will love if: ${qual.you_will_love_if || 'N/A'}`);
  console.log(`⛔ Skip if:          ${qual.skip_if || 'N/A'}`);

  console.log('\n─── 🎮 3D INTERACTIVE QUIZ (SCENE 2) ───');
  console.log(`Mission:  ${q.mission_title || 'N/A'} (${q.scene_name || 'Scene 2'})`);
  console.log(`Prompt:   ${q.challenge_prompt || 'N/A'}`);
  console.log(`Question: ${q.question || 'N/A'}`);
  if (q.options) {
    q.options.forEach(opt => {
      const mark = opt.id === q.correct_option_id ? '✓ (CORRECT)' : ' ';
      console.log(`  [${opt.id}] ${opt.text} ${mark}`);
    });
  }
  console.log(`📖 Lore Reveal: "${q.success_lore_reveal || 'N/A'}"`);
  console.log(`🎖️  Reward Badge: ${q.reward_badge || 'N/A'}`);

  console.log('\n─── 📈 OTA CONVERSION AUDIT (BOOKING.COM) ───');
  console.log(`Drop-off Flaw: ${o.current_drop_off_flaw || 'N/A'}`);
  console.log(`Diagnosis:     ${o.conversion_diagnosis || 'N/A'}`);
  console.log(`\n📸 Optimal 5-Photo Conversion Sequence:`);
  if (o.optimal_5_photo_sequence) {
    o.optimal_5_photo_sequence.forEach(slot => {
      console.log(`  [Slot ${slot.slot}] ${slot.photo_subject}`);
      console.log(`          ↳ Trigger: ${slot.psychological_conversion_trigger}`);
    });
  }

  console.log(`\n✍️  Anti-Commodity Copy Rewrite:`);
  console.log(`Headline: "${o.anti_commodity_copy_rewrite?.ota_headline || 'N/A'}"`);
  console.log(`\n${o.anti_commodity_copy_rewrite?.property_overview_150_words || 'N/A'}`);
  console.log('═'.repeat(66) + '\n');
}
