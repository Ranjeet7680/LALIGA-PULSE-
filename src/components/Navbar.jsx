import React from 'react';
import { Radio, Zap, Shield, Wallet, BarChart3, Tv, Award, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, viewMode, setViewMode, userPulseBalance }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0c10]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#FF4B44] flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-lg shadow-[#FF4B44]/40">
              LL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white tracking-wide text-base font-display">LALIGA</span>
                <span className="bg-white/10 text-[#00F0FF] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-widest">PULSE™</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">BEYOND THE MATCH • DUBAI FINTECH SUMMIT</p>
            </div>
          </div>

          {/* Mediacoach Live Telemetry Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-gray-300 font-mono text-[11px]">Mediacoach TRACAB® 25fps</span>
            <span className="text-emerald-400 font-mono text-[10px]">142ms</span>
          </div>

          {/* User Pulse Balance (Mobile view) */}
          <div className="flex md:hidden items-center gap-1.5 bg-[#FF4B44]/15 border border-[#FF4B44]/30 px-3 py-1 rounded-lg">
            <Zap className="w-3.5 h-3.5 text-[#FF4B44]" />
            <span className="text-xs font-bold text-white">{userPulseBalance}</span>
            <span className="text-[10px] text-gray-400 font-mono">PULSE</span>
          </div>
        </div>

        {/* View Mode Switcher (Judge / Broadcaster / Second Screen switcher) */}
        <div className="flex items-center gap-1 bg-[#12161f] border border-white/10 p-1 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('fan')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'fan' ? 'bg-[#FF4B44] text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Fan Arena</span>
          </button>
          <button
            onClick={() => setViewMode('broadcast')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'broadcast' ? 'bg-[#00F0FF] text-black shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>TV Overlay</span>
          </button>
          <button
            onClick={() => setViewMode('pitch')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'pitch' ? 'bg-amber-400 text-black shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Summit Deck</span>
          </button>
        </div>

        {/* Desktop Balance & Tier */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#161B26] border border-white/10 px-3 py-1.5 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black text-xs font-bold">
              👑
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-medium">STATUS</div>
              <div className="text-xs font-bold text-white">Capitán de Peña</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#FF4B44]/15 border border-[#FF4B44]/30 px-3.5 py-1.5 rounded-xl">
            <Zap className="w-4 h-4 text-[#FF4B44] animate-pulse" />
            <div>
              <div className="text-[10px] text-gray-400 font-mono">WALLET BALANCE</div>
              <div className="text-xs font-black text-white tracking-wide">
                {userPulseBalance} <span className="text-[#FF4B44] font-normal">$PULSE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
