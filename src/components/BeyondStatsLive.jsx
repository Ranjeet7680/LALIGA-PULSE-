import React, { useState, useEffect } from 'react';
import { Activity, Cpu, ArrowUpRight, ShieldAlert, Sparkles, Eye } from 'lucide-react';

export default function BeyondStatsLive() {
  const [momentumRealMadrid, setMomentumRealMadrid] = useState(68);
  const [pressureIndex, setPressureIndex] = useState(74);
  const [ballPosition, setBallPosition] = useState({ x: 68, y: 42 });

  // Simulate subtle real-time fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setMomentumRealMadrid(prev => Math.min(85, Math.max(45, prev + (Math.random() * 6 - 3))));
      setPressureIndex(prev => Math.min(95, Math.max(50, prev + (Math.random() * 8 - 4))));
      setBallPosition(prev => ({
        x: Math.min(85, Math.max(30, prev.x + (Math.random() * 4 - 2))),
        y: Math.min(80, Math.max(20, prev.y + (Math.random() * 4 - 2)))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-5 sm:p-6 border border-white/10 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#00F0FF]" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Beyond Stats 2.0 (Mediacoach)
            </h2>
            <p className="text-[11px] text-gray-400">
              Proprietary Live Tactical Telemetry & Explanatory AI
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-mono px-2 py-0.5 rounded">
          AZURE ML ENGINE
        </span>
      </div>

      {/* Metric 1: Momentum Shift Index (MSI) */}
      <div className="mb-4 bg-black/40 p-3.5 rounded-xl border border-white/5">
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Activity className="w-4 h-4 text-[#FF4B44]" />
            <span>Momentum Shift Index (MSI™)</span>
          </div>
          <span className="text-emerald-400 font-mono font-bold">
            RMA Surge (+{Math.round(momentumRealMadrid)}%)
          </span>
        </div>

        {/* Dual-colored momentum bar */}
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden flex">
          <div
            className="bg-gradient-to-r from-red-500 to-[#FF4B44] transition-all duration-700"
            style={{ width: `${momentumRealMadrid}%` }}
          ></div>
          <div
            className="bg-[#004D98] transition-all duration-700"
            style={{ width: `${100 - momentumRealMadrid}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
          <span>Real Madrid Dominance</span>
          <span>FC Barcelona Counter-Threat</span>
        </div>
      </div>

      {/* Metric 2: Pressure Cooker Rating */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#141824] p-3 rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-gray-400 font-medium">Pressure Cooker</span>
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400 font-mono">
            {Math.round(pressureIndex)}%
          </div>
          <div className="text-[10px] text-gray-400">High-intensity press in Zone 14</div>
        </div>

        <div className="bg-[#141824] p-3 rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-gray-400 font-medium">Crowd Tactical IQ</span>
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-black text-[#00F0FF] font-mono">
            86.4
          </div>
          <div className="text-[10px] text-gray-400">Fan consensus vs. outcome</div>
        </div>
      </div>

      {/* Live 2D Pitch Optical Simulation */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-1.5 uppercase">
          <span>Live Optical Spatial Tracking</span>
          <span className="text-[10px] font-mono text-emerald-400">● 22 PLAYERS LIVE</span>
        </div>

        <div className="pitch-bg h-36 w-full relative border border-emerald-900/50 flex items-center justify-center">
          {/* Pitch lines */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/20"></div>
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/20"></div>
          <div className="w-16 h-16 rounded-full border border-white/20"></div>

          {/* Goal boxes */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-8 border-r border-y border-white/20"></div>
          <div className="absolute right-0 top-1/4 bottom-1/4 w-8 border-l border-y border-white/20"></div>

          {/* Real Madrid Simulated Players (White dots) */}
          <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-sm" style={{ left: '35%', top: '40%' }}></div>
          <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-sm" style={{ left: '45%', top: '65%' }}></div>
          <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-sm" style={{ left: '60%', top: '35%' }}></div>
          <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-sm" style={{ left: '64%', top: '55%' }}></div>
          <div className="absolute w-3 h-3 bg-red-400 rounded-full animate-ping" style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%` }}></div>

          {/* Barcelona Simulated Players (Blue dots) */}
          <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full shadow-sm" style={{ left: '55%', top: '48%' }}></div>
          <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full shadow-sm" style={{ left: '72%', top: '30%' }}></div>
          <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full shadow-sm" style={{ left: '78%', top: '60%' }}></div>
          <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full shadow-sm" style={{ left: '88%', top: '50%' }}></div>

          {/* Ball Marker */}
          <div
            className="absolute w-2.5 h-2.5 bg-amber-300 rounded-full shadow-md shadow-amber-300/80 transition-all duration-700 z-10"
            style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%` }}
          ></div>

          {/* Overlay Tag */}
          <div className="absolute bottom-1 right-2 text-[9px] font-mono text-white/50 bg-black/60 px-1.5 py-0.5 rounded">
            TRACAB 25 FPS SPATIAL MESH
          </div>
        </div>
      </div>

      {/* Explanatory Narrative Insight */}
      <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 text-xs text-gray-300 mt-auto">
        <div className="flex items-center gap-1.5 text-[#00F0FF] font-bold text-[11px] mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Explanatory Narrative:</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Madrid has shifted their offensive focus 68% towards the left half-space following Mendy’s overlap, drawing Koundé out of defensive structure.
        </p>
      </div>
    </div>
  );
}
