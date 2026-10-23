import React, { useState } from 'react';
import { GLOBAL_PENAS, LIVE_CHAT_STREAM } from '../data/mockMatchData';
import { Shield, Users, MessageSquare, Flame, Trophy, Send, Heart } from 'lucide-react';

export default function PenaClanWars({ userPena, onPenaSwitch }) {
  const [chatMessages, setChatMessages] = useState(LIVE_CHAT_STREAM);
  const [newChatText, setNewChatText] = useState('');
  const [reactionCount, setReactionCount] = useState(1420);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: "Zaid_DXB (You)",
      pena: userPena,
      text: newChatText,
      time: "74:22"
    };

    setChatMessages([newMsg, ...chatMessages]);
    setNewChatText('');
  };

  const handleReaction = () => {
    setReactionCount(prev => prev + 1);
  };

  return (
    <div className="glass-panel p-5 sm:p-6 border border-white/10 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#FF4B44]" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Global Peña Clan Wars
            </h2>
            <p className="text-[11px] text-gray-400">
              Co-op Supporter Clubs • Real-Time Matchday Standings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#FF4B44]/15 border border-[#FF4B44]/30 px-2.5 py-1 rounded-md text-xs font-bold text-[#FF4B44]">
          <Flame className="w-3.5 h-3.5 text-[#FF4B44] animate-pulse" />
          <span>ELCLÁSICO SQUAD BATTLE</span>
        </div>
      </div>

      {/* User's Represented Peña */}
      <div className="bg-gradient-to-r from-[#1b2230] to-[#141822] p-3.5 rounded-xl border border-white/10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-300 text-sm">
            🇦🇪
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-mono">YOUR ACTIVE SQUAD</div>
            <div className="text-xs sm:text-sm font-bold text-white">{userPena}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400 font-mono">LIVE RANK</div>
          <div className="text-xs sm:text-sm font-black text-amber-400 font-mono flex items-center gap-1 justify-end">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>#3 Worldwide</span>
          </div>
        </div>
      </div>

      {/* Live Peña Standings Table */}
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-2 flex items-center justify-between">
          <span>Supporter Club Leaderboard</span>
          <span className="text-[10px] text-[#00F0FF]">LIVE AGGREGATE XP</span>
        </div>

        <div className="space-y-2">
          {GLOBAL_PENAS.map((pena) => {
            const isUserPena = pena.name === userPena;
            return (
              <div
                key={pena.id}
                onClick={() => onPenaSwitch(pena.name)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  isUserPena
                    ? 'bg-[#FF4B44]/10 border-[#FF4B44]/40 shadow-sm'
                    : 'bg-black/20 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                    pena.rank === 1 ? 'bg-amber-400 text-black' :
                    pena.rank === 2 ? 'bg-slate-300 text-black' :
                    pena.rank === 3 ? 'bg-amber-700 text-white' : 'bg-white/10 text-gray-400'
                  }`}>
                    {pena.rank}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{pena.name}</span>
                      {isUserPena && <span className="text-[9px] bg-[#FF4B44] text-white px-1.5 py-0.2 rounded font-mono">YOU</span>}
                    </div>
                    <div className="text-[10px] text-gray-400">{pena.location} • {pena.liveActive} active</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-black text-white">{pena.totalPoints.toLocaleString()} pts</div>
                  <div className="text-[9px] text-emerald-400 font-mono">+1,250 this min</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Banter / Squad Reactions Chat */}
      <div className="flex-1 flex flex-col justify-end bg-black/40 rounded-xl p-3 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
            <span>Peña Live Wave</span>
          </div>

          <button
            onClick={handleReaction}
            className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded-md text-pink-400 transition-all active:scale-95"
          >
            <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
            <span>{reactionCount}</span>
          </button>
        </div>

        {/* Chat Feed */}
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1 mb-2">
          {chatMessages.slice(0, 4).map((msg) => (
            <div key={msg.id} className="text-xs bg-white/[0.03] p-1.5 rounded-md border border-white/5">
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-0.5">
                <span className="font-bold text-cyan-300">{msg.user}</span>
                <span className="text-gray-500">{msg.time}</span>
              </div>
              <p className="text-gray-200 text-[11px]">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendChat} className="flex items-center gap-1.5">
          <input
            type="text"
            value={newChatText}
            onChange={(e) => setNewChatText(e.target.value)}
            placeholder="Send cheer to your Peña..."
            className="flex-1 bg-[#12161f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4B44]"
          />
          <button
            type="submit"
            className="bg-[#FF4B44] text-white p-1.5 rounded-lg hover:bg-[#e02821] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
