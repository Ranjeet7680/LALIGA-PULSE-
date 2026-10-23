import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MatchHeader from './components/MatchHeader';
import LiveTactixDuel from './components/LiveTactixDuel';
import PenaClanWars from './components/PenaClanWars';
import BeyondStatsLive from './components/BeyondStatsLive';
import PulseFintechWallet from './components/PulseFintechWallet';
import BroadcastOverlayModal from './components/BroadcastOverlayModal';
import DubaiPitchModal from './components/DubaiPitchModal';
import { FAN_PROFILE, MATCH_INFO } from './data/mockMatchData';
import { Zap, Shield, Activity, Wallet, Tv, Award, Radio } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('duels');
  const [viewMode, setViewMode] = useState('fan'); // 'fan' | 'broadcast' | 'pitch'
  const [userPulseBalance, setUserPulseBalance] = useState(FAN_PROFILE.pulseBalance);
  const [userPena, setUserPena] = useState(FAN_PROFILE.selectedPena);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Match clock simulation (74:18 -> 74:19...)
  const [matchSeconds, setMatchSeconds] = useState(MATCH_INFO.second);
  const [matchMinutes, setMatchMinutes] = useState(MATCH_INFO.minute);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setMatchSeconds((prevSec) => {
        if (prevSec >= 59) {
          setMatchMinutes((prevMin) => prevMin + 1);
          return 0;
        }
        return prevSec + 1;
      });
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const formattedTime = `${matchMinutes}:${matchSeconds < 10 ? '0' : ''}${matchSeconds}"`;

  // Reward points handler
  const handleRewardClaimed = (points) => {
    setUserPulseBalance((prev) => prev + points);
  };

  const handleSpendPoints = (cost) => {
    setUserPulseBalance((prev) => Math.max(0, prev - cost));
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col font-sans selection:bg-[#FF4B44] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        userPulseBalance={userPulseBalance}
      />

      {/* Matchday Header Scoreboard */}
      <MatchHeader matchTime={formattedTime} />

      {/* Navigation Tabs Bar */}
      <div className="bg-[#10141d] border-b border-white/10 sticky top-[61px] z-40 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2">
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'duels', label: '1. In-Match Tactix', icon: Zap, badge: 'LIVE 15s' },
              { id: 'penas', label: '2. Peña Clan Wars', icon: Shield, badge: 'RANK #3' },
              { id: 'stats', label: '3. Beyond Stats 2.0', icon: Activity, badge: 'AZURE ML' },
              { id: 'wallet', label: '4. FinTech Wallet', icon: Wallet, badge: 'PERKS' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FF4B44] text-white shadow-lg shadow-[#FF4B44]/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick CTA to Dubai FinTech Summit Blueprint */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setViewMode('pitch')}
              className="bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Dubai FinTech Summit Executive Blueprint</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Primary Focus Tab: 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {activeTab === 'duels' && (
              <LiveTactixDuel
                onRewardClaimed={handleRewardClaimed}
                currentChallengeIndex={currentChallengeIndex}
                setCurrentChallengeIndex={setCurrentChallengeIndex}
              />
            )}

            {activeTab === 'penas' && (
              <PenaClanWars userPena={userPena} onPenaSwitch={setUserPena} />
            )}

            {activeTab === 'stats' && <BeyondStatsLive />}

            {activeTab === 'wallet' && (
              <PulseFintechWallet
                userPulseBalance={userPulseBalance}
                onSpendPoints={handleSpendPoints}
              />
            )}
          </div>

          {/* Right Column (Sidecar Intelligence & Ecosystem View: 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* If currently on duels tab, show the Peña Leaderboard beside it */}
            {activeTab !== 'penas' && (
              <div className="h-[480px]">
                <PenaClanWars userPena={userPena} onPenaSwitch={setUserPena} />
              </div>
            )}

            {/* If on duels tab, also show Beyond Stats mini panel */}
            {activeTab !== 'stats' && activeTab !== 'wallet' && (
              <div>
                <BeyondStatsLive />
              </div>
            )}

            {/* If on stats tab, show Duels beside it */}
            {activeTab === 'stats' && (
              <div>
                <LiveTactixDuel
                  onRewardClaimed={handleRewardClaimed}
                  currentChallengeIndex={currentChallengeIndex}
                  setCurrentChallengeIndex={setCurrentChallengeIndex}
                />
              </div>
            )}

            {/* If on wallet tab, show Clan Wars beside it */}
            {activeTab === 'wallet' && (
              <div>
                <BeyondStatsLive />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b0e14] border-t border-white/10 py-6 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-display">LALIGA PULSE™</span>
            <span>•</span>
            <span>Beyond The Match Challenge</span>
            <span>•</span>
            <span className="text-amber-400">Dubai FinTech Summit Showcase</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span>Powered by Mediacoach TRACAB®</span>
            <span>•</span>
            <span>Microsoft Azure Beyond Stats</span>
            <span>•</span>
            <span>Sportian Digital Core</span>
          </div>
        </div>
      </footer>

      {/* Broadcaster Overlay Modal */}
      {viewMode === 'broadcast' && (
        <BroadcastOverlayModal onClose={() => setViewMode('fan')} />
      )}

      {/* Dubai FinTech Pitch Deck Modal */}
      {viewMode === 'pitch' && (
        <DubaiPitchModal onClose={() => setViewMode('fan')} />
      )}
    </div>
  );
}
