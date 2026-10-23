import React from 'react';
import { MATCH_INFO } from '../data/mockMatchData';
import { Activity, ShieldCheck, MapPin, Users } from 'lucide-react';

export default function MatchHeader({ matchTime, opticalFps }) {
  return (
    <div className="bg-gradient-to-r from-[#121620] via-[#161c29] to-[#121620] border-b border-white/10 px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left: Competition & Venue Info */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-[#FF4B44] animate-ping"></span>
            <span className="font-bold text-white tracking-wider uppercase text-[11px]">LIVE MATCHDAY</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>Santiago Bernabéu (81,044)</span>
          </div>
          <span className="hidden md:inline">•</span>
          <div className="hidden md:flex items-center gap-1 text-[#00F0FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRACAB Optical Ingest</span>
          </div>
        </div>

        {/* Center: Live Scoreboard */}
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {/* Home Team */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-bold text-sm sm:text-base text-white tracking-tight">Real Madrid</div>
              <div className="text-[11px] text-gray-400 font-mono">xG: {MATCH_INFO.homeTeam.xG} • 53% Poss</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-white text-black font-black flex items-center justify-center text-xs shadow-md border-2 border-white">
              RMA
            </div>
          </div>

          {/* Score & Live Clock */}
          <div className="flex flex-col items-center justify-center px-4 py-1.5 bg-black/60 border border-white/10 rounded-xl min-w-[110px]">
            <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-wider flex items-center gap-2">
              <span>{MATCH_INFO.homeTeam.score}</span>
              <span className="text-[#FF4B44]">:</span>
              <span>{MATCH_INFO.awayTeam.score}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#FF4B44]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF4B44] animate-pulse"></span>
              <span>{matchTime}</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#004D98] text-white font-black flex items-center justify-center text-xs shadow-md border-2 border-[#A50044]">
              FCB
            </div>
            <div className="text-left">
              <div className="font-bold text-sm sm:text-base text-white tracking-tight">FC Barcelona</div>
              <div className="text-[11px] text-gray-400 font-mono">xG: {MATCH_INFO.awayTeam.xG} • 47% Poss</div>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Telemetry stats */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
          <div className="bg-black/30 border border-white/5 px-3 py-1.5 rounded-lg text-right">
            <div className="text-[10px] text-gray-400 uppercase">Optical Tracking</div>
            <div className="text-[#00F0FF] font-bold">25 FPS Real-Time</div>
          </div>
          <div className="bg-black/30 border border-white/5 px-3 py-1.5 rounded-lg text-right">
            <div className="text-[10px] text-gray-400 uppercase">Global Active Fans</div>
            <div className="text-white font-bold">1,842,910</div>
          </div>
        </div>
      </div>
    </div>
  );
}
