import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  BarChart3,
  AlertTriangle,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import {
  LONDON_10_HOTELS,
  VIBE_INSIGHTS_BRIEFS,
} from '../data/london10StudyData';

/**
 * VibeInsightsSection — Homepage Research Hub Showcase
 * Highlights the Flagship London 10-Hotel Vibe vs. OTA Study and clickable hotel dossiers.
 */
export default function VibeInsightsSection() {
  const previewHotels = LONDON_10_HOTELS.slice(0, 4);

  return (
    <section
      id="vibe-insights-preview"
      className="py-16 px-6 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden"
    >
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Vibe Insights Research Hub • Study AV-RES-2026-LON10
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Extraordinary Hotels.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-teal-300">
                Invisible Vibes on Booking.com.
              </span>
            </h2>
            <p className="text-slate-300 text-base max-w-3xl mt-2 leading-relaxed">
              Our flagship 10-hotel London study proves that icons like{' '}
              <span className="text-white font-semibold">The Ned</span>,{' '}
              <span className="text-white font-semibold">The London EDITION</span>,{' '}
              <span className="text-white font-semibold">Sea Containers</span>, and{' '}
              <span className="text-white font-semibold">The Hoxton Southwark</span> average{' '}
              <span className="text-emerald-400 font-bold">92.5/100</span> on our 4-Part
              Mathematical Vibe Score — yet drop to{' '}
              <span className="text-rose-400 font-bold">56.5/100</span> in their live Booking.com
              Top-5 galleries. Click any hotel to inspect or claim its full report.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/vibe-insights/london-boutique-ota-gap"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition"
            >
              <BarChart3 className="w-4 h-4" />
              Open Full 10-Hotel Study
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Clickable 4-Hotel Quick Teaser Strip (Links directly to claimable hotel dossier) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {previewHotels.map((hotel) => (
            <Link
              key={hotel.id}
              to={`/vibe-insights/london-boutique-ota-gap?hotel=${hotel.id}&claim=1`}
              className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative h-36 overflow-hidden bg-slate-950">
                  <img
                    src={hotel.localSlot1Hero}
                    alt={`${hotel.name} Booking.com Slot 1`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/85 border border-slate-700 text-[10px] font-bold text-slate-200">
                    {hotel.neighborhood}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[10px] font-extrabold">
                    {hotel.vibeGap} pts on OTA
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{hotel.name}</span>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="grid grid-cols-2 gap-2 mb-2.5">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-2.5 py-1.5">
                      <div className="text-[10px] text-emerald-300 uppercase font-semibold">
                        Real-World Vibe
                      </div>
                      <div className="text-base font-black text-emerald-400">
                        {hotel.mathVibeScore}
                        <span className="text-[10px] font-normal text-slate-400">/100</span>
                      </div>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg px-2.5 py-1.5">
                      <div className="text-[10px] text-rose-300 uppercase font-semibold">
                        OTA Top-5 Score
                      </div>
                      <div className="text-base font-black text-rose-400">
                        {hotel.otaTop5Score}
                        <span className="text-[10px] font-normal text-slate-400">/100</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-300/90 font-medium line-clamp-2">
                    <AlertTriangle className="w-3 h-3 inline mr-1 -mt-0.5" />
                    {hotel.otaDiagnosticTag}
                  </p>
                </div>
              </div>

              <div className="px-3.5 py-2.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-teal-300 group-hover:text-amber-300 transition">
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Claim Detailed Report
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Vibe Insights Research Brief Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VIBE_INSIGHTS_BRIEFS.map((article) => (
            <div
              key={article.id}
              className="bg-slate-900/75 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/90 border border-amber-500/40 text-amber-300 text-[10px] font-bold tracking-wider uppercase">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <span>{article.pubDate}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <Link
                  to={article.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  Read Research Brief
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  GEO Indexed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
