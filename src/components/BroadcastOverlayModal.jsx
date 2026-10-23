import React from 'react';
import { Tv, Sparkles, X, QrCode, Radio, Activity } from 'lucide-react';
import { MATCH_INFO } from '../data/mockMatchData';

export default function BroadcastOverlayModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0e14] border border-white/20 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-[#12161f] px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className="w-4 h-4 text-[#00F0FF]" />
            <span className="font-bold text-white text-sm">
              Mediapro Live Broadcast Engine • Real-Time Lower-Third Keyer
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Broadcast Preview Area (Simulating Live TV Feed) */}
        <div className="relative aspect-video bg-gradient-to-b from-[#0a1824] to-[#04080e] overflow-hidden flex flex-col justify-between p-6">
          {/* Top TV Channel Bug */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
              <span className="text-white font-black text-sm tracking-wider font-display">LALIGA</span>
              <span className="text-[#FF4B44] font-bold text-xs">TV</span>
              <span className="text-gray-400 text-xs">| LIVE 4K HDR</span>
            </div>

            <div className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-right">
              <div className="text-[10px] text-gray-400 font-mono">CONCURRENT SECOND-SCREEN FANS</div>
              <div className="text-xs font-mono font-bold text-emerald-400">1,842,910 Synced Devices</div>
            </div>
          </div>

          {/* Center Simulated Pitch Action Note */}
          <div className="text-center">
            <div className="inline-block bg-black/40 backdrop-blur border border-white/10 px-4 py-1.5 rounded-full text-xs text-gray-300">
              [LIVE 4K BROADCAST STREAM • 74:18" • REAL MADRID 2 - 1 FC BARCELONA]
            </div>
          </div>

          {/* The Synchronized Lower-Third Graphic (What Broadcaster Generates from PULSE) */}
          <div className="bg-[#0e131d]/95 border border-[#FF4B44]/50 rounded-xl p-4 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left: Graphic Branding & Live Question */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FF4B44] flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-lg">
                  PULSE
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#FF4B44] tracking-wider flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#FF4B44] animate-ping"></span>
                      LALIGA PULSE GLOBAL FAN CONSENSUS
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">| 15s VOTE</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    74' Bellingham Free-Kick: 64% Predict Direct Strike to Top-Right Corner
                  </div>
                </div>
              </div>

              {/* Right: Live Split & QR Scan */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 font-mono">CROWD ACCURACY</div>
                  <div className="text-xs font-mono font-bold text-[#00F0FF]">Top Peña: Tokyo 🇯🇵</div>
                </div>

                <div className="flex items-center gap-2 bg-black/60 border border-white/15 px-2.5 py-1.5 rounded-lg">
                  <QrCode className="w-6 h-6 text-white" />
                  <div className="text-[9px] text-gray-300 leading-tight">
                    Scan to<br/><strong className="text-[#FF4B44]">Join Pulse</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Explanation */}
        <div className="bg-[#12161f] p-4 text-xs text-gray-300 flex items-center justify-between">
          <p className="text-gray-400 text-xs">
            Mediapro TV commentators receive automated prompt insights via the PULSE Broadcaster API to enrich on-air match narratives.
          </p>
          <button
            onClick={onClose}
            className="btn-primary text-xs py-1.5 px-4"
          >
            Return to Fan Arena
          </button>
        </div>
      </div>
    </div>
  );
}
