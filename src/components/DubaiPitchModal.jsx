import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, Zap, DollarSign, Cpu, ChevronRight, X, TrendingUp } from 'lucide-react';

export default function DubaiPitchModal({ onClose }) {
  const [activeSection, setActiveSection] = useState('summary');

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e121a] border border-amber-400/40 rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-950/40 via-[#161c28] to-[#0e121a] p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black text-lg shadow-lg shadow-amber-400/20">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  LALIGA PULSE™ — EXECUTIVE BLUEPRINT
                </h2>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded border border-amber-400/30">
                  DUBAI FINTECH SUMMIT
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Beyond The Match Challenge • Pitch Submission & Execution Plan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-2 bg-[#121620] border-b border-white/10 text-xs">
          {[
            { id: 'summary', label: '1. Concept Summary', icon: Zap },
            { id: 'integration', label: '2. Integration Plan', icon: Cpu },
            { id: 'scope', label: '3. Prototype Scope', icon: CheckCircle2 },
            { id: 'metrics', label: '4. FinTech & Metrics', icon: DollarSign },
            { id: 'risk', label: '5. Risk & Compliance', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 text-xs sm:text-sm text-gray-300 leading-relaxed space-y-6">
          {activeSection === 'summary' && (
            <div className="space-y-4">
              <div className="bg-[#141926] p-4 rounded-xl border border-white/10">
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  What is LALIGA PULSE and How Does It Work?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  <strong>LALIGA PULSE™</strong> is a real-time, synchronized fan participation layer and closed-loop loyalty network integrated natively into LALIGA's digital ecosystem. Powered directly by <strong>Sportian's Mediacoach 25fps optical tracking</strong> and <strong>Microsoft Azure Beyond Stats</strong>, PULSE turns passive 90-minute TV consumption into an active, cooperative stadium-wide arena.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                  <h4 className="font-bold text-white text-xs mb-1 text-[#FF4B44]">1. In-Match Micro-Tactix (15s Windows)</h4>
                  <p className="text-[11px] text-gray-400">
                    Real-time triggers linked to critical match moments (free kicks, counter-attacks, pressing duels) with sub-3-second settlement verified by Mediacoach optical telemetry.
                  </p>
                </div>
                <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                  <h4 className="font-bold text-white text-xs mb-1 text-cyan-400">2. Structured Community (Global Peñas)</h4>
                  <p className="text-[11px] text-gray-400">
                    Supporter clubs compete in live "Clan Wars" (Peña Tokyo vs. Peña Cairo vs. Peña Dubai), pooling collective tactical XP and earning club reputation badges.
                  </p>
                </div>
                <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                  <h4 className="font-bold text-white text-xs mb-1 text-amber-400">3. Beyond Stats 2.0 Amplification</h4>
                  <p className="text-[11px] text-gray-400">
                    Proprietary fan metrics: Momentum Shift Index (MSI™), Pressure Cooker Index, and Crowd Tactical IQ (CTIQ™), fostering debate and tactical literacy.
                  </p>
                </div>
                <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                  <h4 className="font-bold text-white text-xs mb-1 text-emerald-400">4. Dubai FinTech Loyalty Loop</h4>
                  <p className="text-[11px] text-gray-400">
                    Non-speculative, zero-cash-out loyalty currency ($PULSE) redeemable for authentic club kits, LALIGA+ passes, and sponsor partner perks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integration' && (
            <div className="space-y-4">
              <div className="bg-[#141926] p-4 rounded-xl border border-white/10">
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Ecosystem Integration Architecture
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  LALIGA PULSE is not a standalone app that requires new downloads. It integrates seamlessly as a modular SDK across LALIGA’s existing digital pillars.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="font-bold text-white text-xs">● Sportian / Mediacoach & Azure Beyond Stats:</span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Direct low-latency ingestion via Apache Kafka / Azure Event Hubs streaming 150,000 spatial coordinate points/min to trigger challenges within 500ms of game states.
                  </p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="font-bold text-white text-xs">● LALIGA Official App & LALIGA Fantasy:</span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Modular React Native SDK embedded in the official app. Completing in-match tactical challenges awards bonus booster cards and XP inside <em>LALIGA Fantasy</em>.
                  </p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="font-bold text-white text-xs">● Mediapro Broadcast & LALIGA+ OTT:</span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    HLS timed metadata (ID3 tags) and localized audio watermarks adaptively calibrate prompt timing, preventing spoilers across varying broadcast latency feeds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'scope' && (
            <div className="space-y-4">
              <div className="bg-[#141926] p-4 rounded-xl border border-white/10">
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Prototype Scope: Demo Day vs. Production Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  What we demonstrate live on stage at the Dubai FinTech Summit versus the Phase 2 production roadmap.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
                  <h4 className="font-bold text-emerald-300 text-xs mb-2">LIVE PROTOTYPE AT DEMO DAY:</h4>
                  <ul className="space-y-1.5 text-[11px] text-gray-300">
                    <li>✓ Interactive responsive web application running simulated ElClásico match clock.</li>
                    <li>✓ Live 15s tactical duels with countdown timer and automated optical resolution.</li>
                    <li>✓ Peña Clan Wars leaderboard (Tokyo, Cairo, Dubai, Bogotá) and live chat wave.</li>
                    <li>✓ Beyond Stats 2.0 Momentum Shift Index (MSI™) and interactive 2D pitch map.</li>
                    <li>✓ FinTech loyalty wallet with instant perks redemption.</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl">
                  <h4 className="font-bold text-amber-300 text-xs mb-2">PHASE 2 / PRODUCTION ROADMAP:</h4>
                  <ul className="space-y-1.5 text-[11px] text-gray-400">
                    <li>⏳ Physical BLE beacon deployments across all 20 Primera División stadiums.</li>
                    <li>⏳ Broadcaster Vizrt/Ross Video live SDI keying plugins for Mediapro.</li>
                    <li>⏳ Card-linked partner offers with regional UAE/MENA digital banks.</li>
                    <li>⏳ Multilingual voice chant sync rooms during live matches.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'metrics' && (
            <div className="space-y-4">
              <div className="bg-[#141926] p-4 rounded-xl border border-white/10">
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  Success Metrics & Economic Sustainability (Dubai FinTech Bridge)
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Bridging sports-tech and fintech through recurring engagement and measurable monetization.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-400">Concurrent Time</div>
                  <div className="text-lg font-black text-white font-mono">68 Mins</div>
                  <div className="text-[9px] text-emerald-400">+277% vs baseline</div>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-400">D30 Retention</div>
                  <div className="text-lg font-black text-white font-mono">54%</div>
                  <div className="text-[9px] text-emerald-400">+145% uplift</div>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-400">DAU/MAU Ratio</div>
                  <div className="text-lg font-black text-white font-mono">36%</div>
                  <div className="text-[9px] text-emerald-400">3x market average</div>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-400">Viral K-Factor</div>
                  <div className="text-lg font-black text-white font-mono">1.6</div>
                  <div className="text-[9px] text-emerald-400">Self-sustaining</div>
                </div>
              </div>

              <div className="p-3.5 bg-black/30 rounded-xl border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">FinTech Monetization Loop:</h4>
                <p className="text-[11px] text-gray-300">
                  <strong>Sponsored Tactical Decision Windows:</strong> Brands (EA SPORTS, Puma, Microsoft Azure, FinTech banking sponsors) sponsor high-attention 15s moments. <strong>Card-linked loyalty perks:</strong> Fans convert engagement sweat-equity into authentic discounts with brand partners.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'risk' && (
            <div className="space-y-4">
              <div className="bg-[#141926] p-4 rounded-xl border border-white/10">
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Risk Mitigation & Regulatory Safeguards
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Proactive regulatory, technological, and brand safety compliance.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="font-bold text-amber-300">1. Regulatory / Non-Gambling Compliance:</span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    100% Free-to-play, skill-based structure. No real-money wagering and zero cash withdrawals. Complies strictly with DGOJ (Spain), UAE SCA/CBUAE regulations, and US state guidelines without requiring gaming licenses.
                  </p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="font-bold text-cyan-300">2. Broadcast Latency Mitigation:</span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Adaptive sync engine uses audio watermarks and HLS timed metadata to dynamically calibrate challenge prompts to the user's specific broadcast delay (whether watching satellite, cable, or OTT).
                  </p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="font-bold text-emerald-300">3. GDPR, UAE PDPL & CCPA Data Privacy:</span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Pseudonymous user profiles linked to LALIGA SSO. Zero continuous location telemetry stored; geofencing is validated on-device.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#121620] p-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            LALIGA Beyond The Match Challenge • USD 10,000 Winner Blueprint
          </span>
          <button
            onClick={onClose}
            className="btn-primary text-xs py-2 px-5"
          >
            Explore Live Fan Prototype
          </button>
        </div>
      </div>
    </div>
  );
}
