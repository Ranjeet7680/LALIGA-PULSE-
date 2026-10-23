import React, { useState, useEffect } from 'react';
import { TACTICAL_EVENTS } from '../data/mockMatchData';
import { Timer, Zap, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

export default function LiveTactixDuel({ onRewardClaimed, currentChallengeIndex, setCurrentChallengeIndex }) {
  const currentEvent = TACTICAL_EVENTS[currentChallengeIndex];
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(currentEvent.durationSeconds);
  const [isResolved, setIsResolved] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Timer countdown
  useEffect(() => {
    if (isResolved) return;

    if (timeLeft <= 0) {
      resolveEvent();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isResolved]);

  // Handle option selection
  const handleSelect = (optionId) => {
    if (hasSubmitted || isResolved) return;
    setSelectedOption(optionId);
  };

  // Submit decision
  const handleSubmitDecision = () => {
    if (!selectedOption || hasSubmitted) return;
    setHasSubmitted(true);
  };

  // Resolve event via optical tracking
  const resolveEvent = () => {
    setIsResolved(true);
    const correctOption = currentEvent.options.find(o => o.correct);
    const userWon = selectedOption === correctOption.id;
    setIsSuccess(userWon);

    if (userWon) {
      setEarnedPoints(currentEvent.pointsReward);
      onRewardClaimed(currentEvent.pointsReward);
    } else {
      // Small participation reward
      setEarnedPoints(25);
      onRewardClaimed(25);
    }
  };

  // Change challenge for Demo Day testing
  const switchChallenge = (index) => {
    setCurrentChallengeIndex(index);
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsResolved(false);
    setIsSuccess(false);
    setEarnedPoints(0);
    setTimeLeft(TACTICAL_EVENTS[index].durationSeconds);
  };

  const progressPercent = (timeLeft / currentEvent.durationSeconds) * 100;

  return (
    <div className="glass-panel p-5 sm:p-6 border border-white/10 relative overflow-hidden">
      {/* Background glow when active */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF4B44]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="badge-live">
            <span className="pulse-dot"></span>
            IN-MATCH TACTIX DUEL
          </span>
          <span className="text-xs font-mono font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded">
            {currentEvent.minute}
          </span>
        </div>

        {/* Sponsor Banner */}
        <div className="text-[10px] tracking-wider uppercase font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-md flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#00F0FF]" />
          <span>{currentEvent.sponsor}</span>
        </div>
      </div>

      {/* Title & Context */}
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-1.5 flex items-center gap-2">
          <span>{currentEvent.title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {currentEvent.context}
        </p>
      </div>

      {/* Countdown Timer Bar */}
      <div className="mb-6 bg-black/40 p-3 rounded-xl border border-white/5">
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-1.5 text-gray-300 font-medium">
            <Timer className={`w-4 h-4 ${timeLeft <= 5 ? 'text-[#FF4B44] animate-bounce' : 'text-gray-400'}`} />
            <span>Tactical Decision Window</span>
          </div>
          <div className="font-mono font-black text-sm">
            <span className={timeLeft <= 5 ? 'text-[#FF4B44]' : 'text-[#00F0FF]'}>
              {timeLeft > 0 ? `${timeLeft}s` : 'RESOLVING VIA OPTICAL DATA...'}
            </span>
          </div>
        </div>

        {/* Animated Bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              timeLeft <= 5 ? 'bg-[#FF4B44]' : 'bg-gradient-to-r from-[#00F0FF] to-[#FF4B44]'
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="mb-4">
        <div className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">
          Live Question for Global Fans:
        </div>
        <div className="text-base font-bold text-white bg-[#161B26] p-3.5 rounded-xl border border-white/10">
          {currentEvent.question}
        </div>
      </div>

      {/* Selectable Options */}
      <div className="space-y-3 mb-5">
        {currentEvent.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.correct;
          let borderClass = 'border-white/10 hover:border-white/20 bg-[#12161f]';

          if (isResolved) {
            if (isCorrect) {
              borderClass = 'border-emerald-500 bg-emerald-950/30 text-emerald-200';
            } else if (isSelected && !isCorrect) {
              borderClass = 'border-[#FF4B44] bg-[#FF4B44]/15 text-red-200';
            }
          } else if (isSelected) {
            borderClass = 'border-[#FF4B44] bg-[#FF4B44]/10 shadow-lg shadow-[#FF4B44]/20';
          }

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${borderClass}`}
            >
              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-[#FF4B44] text-white' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {option.id}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">{option.text}</span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold">{option.odds}</span>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-gray-300">{option.crowdVote}%</span>
                    <div className="text-[9px] text-gray-500">CROWD</div>
                  </div>
                </div>
              </div>

              {/* Progress bar showing crowd vote proportion */}
              <div
                className="absolute left-0 bottom-0 top-0 bg-white/[0.03] pointer-events-none"
                style={{ width: `${option.crowdVote}%` }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Action / Result Button */}
      {!isResolved ? (
        <button
          onClick={handleSubmitDecision}
          disabled={!selectedOption || hasSubmitted}
          className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
            hasSubmitted
              ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 cursor-default'
              : selectedOption
              ? 'btn-primary'
              : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
          }`}
        >
          {hasSubmitted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>DECISION LOCKED IN • WAITING FOR TELEMETRY SETTLEMENT</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>LOCK IN TACTICAL PREDICTION (+{currentEvent.pointsReward} $PULSE)</span>
            </>
          )}
        </button>
      ) : (
        /* Resolved State Box */
        <div
          className={`p-4 rounded-xl border ${
            isSuccess
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
              : 'bg-amber-950/40 border-amber-500/50 text-amber-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>TACTICAL PREDICTION VERIFIED! +{earnedPoints} $PULSE</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>TACTICAL MISS (+{earnedPoints} PARTICIPATION XP)</span>
                </>
              )}
            </div>
            <span className="text-[10px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded text-gray-300">
              TRACAB 25FPS VERIFIED
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {currentEvent.opticalOutcomeExplanation}
          </p>
        </div>
      )}

      {/* Demo Day Switcher Controls (For judges & live showcase) */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
          <span>Demo Day Event Triggers:</span>
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {TACTICAL_EVENTS.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => switchChallenge(idx)}
              className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all ${
                currentChallengeIndex === idx
                  ? 'bg-[#FF4B44] text-white font-bold'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {ev.minute} {ev.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
