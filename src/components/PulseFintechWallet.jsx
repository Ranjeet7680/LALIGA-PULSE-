import React, { useState } from 'react';
import { FAN_PROFILE, REWARD_MARKETPLACE } from '../data/mockMatchData';
import { Wallet, Zap, Gift, Award, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export default function PulseFintechWallet({ userPulseBalance, onSpendPoints }) {
  const [redeemedIds, setRedeemedIds] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleRedeem = (reward) => {
    if (userPulseBalance < reward.cost) {
      alert(`Insufficient Pulse Credits. You need ${reward.cost} $PULSE for this perk.`);
      return;
    }

    onSpendPoints(reward.cost);
    setRedeemedIds([...redeemedIds, reward.id]);
    setSuccessMsg(`Successfully redeemed: ${reward.title}! Check your LALIGA digital wallet.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="glass-panel p-5 sm:p-6 border border-white/10 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Pulse FinTech Loyalty Wallet
            </h2>
            <p className="text-[11px] text-gray-400">
              Zero-Speculation Fan Capital Network • Dubai FinTech Showcase
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-400/30 font-mono px-2 py-0.5 rounded flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>NON-SPECULATIVE UTILITY</span>
        </span>
      </div>

      {/* Balance & Fan Status Card */}
      <div className="bg-gradient-to-br from-[#1e2536] via-[#161a26] to-[#0f121a] p-4 rounded-xl border border-white/10 mb-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] text-gray-400 font-mono">AVAILABLE PULSE BALANCE</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#FF4B44] animate-pulse" />
              <span>{userPulseBalance}</span>
              <span className="text-sm font-normal text-[#FF4B44]">$PULSE</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
              TIER 3 FAN
            </span>
            <div className="text-xs font-bold text-white mt-1">Capitán de Peña</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
          <div>
            <div className="text-[10px] text-gray-400">Tactical Accuracy</div>
            <div className="text-xs font-bold text-emerald-400 font-mono">78.4%</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400">Match Streak</div>
            <div className="text-xs font-bold text-cyan-400 font-mono">14 Matches</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400">Global Rank</div>
            <div className="text-xs font-bold text-amber-400 font-mono">Top 2%</div>
          </div>
        </div>
      </div>

      {/* Success alert message */}
      {successMsg && (
        <div className="mb-3 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Reward Marketplace */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-2.5 flex items-center justify-between">
          <span>Official LALIGA Perks & Sponsor Marketplace</span>
          <span className="text-[10px] text-gray-500 font-normal">INSTANT REDEEM</span>
        </div>

        <div className="space-y-2.5">
          {REWARD_MARKETPLACE.map((item) => {
            const isRedeemed = redeemedIds.includes(item.id);
            const canAfford = userPulseBalance >= item.cost;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-all ${
                  isRedeemed
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-[#141824] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="font-bold text-xs sm:text-sm text-white">{item.title}</div>
                  <div className="text-xs font-mono font-black text-amber-300 flex items-center gap-1 flex-shrink-0">
                    <Zap className="w-3 h-3 text-[#FF4B44]" />
                    <span>{item.cost} $PULSE</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed mb-2.5">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                  <span className="text-cyan-400 font-medium">{item.partner}</span>

                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={isRedeemed || !canAfford}
                    className={`px-3 py-1 rounded-md font-bold transition-all text-xs ${
                      isRedeemed
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                        : canAfford
                        ? 'bg-[#FF4B44] text-white hover:bg-[#e02821] shadow-sm'
                        : 'bg-white/5 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isRedeemed ? 'Redeemed ✓' : canAfford ? 'Redeem Perk' : 'Need More $PULSE'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
