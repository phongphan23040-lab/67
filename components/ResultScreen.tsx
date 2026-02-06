
import React from 'react';
import { GameState, GameStatus } from '../types';

interface ResultScreenProps {
  state: GameState;
  onRestart: () => void;
  onHome: () => void;
  highScore: number;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ state, onRestart, onHome, highScore }) => {
  const isWin = state.status === GameStatus.WON;
  
  const timeTaken = state.startTime && state.endTime 
    ? Math.floor((state.endTime - state.startTime) / 1000) 
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const finalScore = isWin ? Math.max(0, 10000 - (state.attempts * 250)) : 0;
  const isNewRecord = finalScore > 0 && finalScore >= highScore;

  return (
    <div className="relative flex flex-col h-screen max-w-md w-full px-6 pt-12 items-center overflow-hidden">
      {/* Background Decor */}
      <div className={`absolute top-0 inset-x-0 h-1/2 opacity-30 blur-[100px] pointer-events-none transition-colors ${isWin ? 'bg-primary/20' : 'bg-red-500/20'}`}></div>

      <header className="relative z-10 w-full flex items-center justify-between mb-8">
        <button onClick={onHome} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/40">Level Result</h2>
        <div className="w-10"></div>
      </header>

      <div className="flex flex-col items-center flex-1 w-full relative z-10">
        <h1 className="text-5xl font-bold tracking-tight text-white mb-10 text-center leading-tight">
          {isWin ? (
            <>LEVEL <span className="text-primary italic">CLEAR!</span></>
          ) : (
            <>OUT OF <span className="text-red-500 italic">LUCK!</span></>
          )}
        </h1>

        {/* Mascot / Icon */}
        <div className="relative mb-12 flex justify-center w-full">
           <div className={`relative w-64 h-64 rounded-3xl backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl transition-all ${isWin ? 'bg-primary/10' : 'bg-white/5'}`}>
              <div className="flex flex-col items-center">
                  <div className={`relative w-32 h-32 rounded-[40%] flex items-center justify-center border-4 shadow-lg mb-4 transition-colors ${
                    isWin ? 'bg-primary/40 border-primary' : 'bg-red-500/20 border-red-500'
                  }`}>
                    {isWin ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-4">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                        <div className="w-10 h-3 border-b-2 border-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                         <div className="flex gap-4">
                          <div className="w-2.5 h-2.5 bg-white/60 rounded-full"></div>
                          <div className="w-2.5 h-2.5 bg-white/60 rounded-full"></div>
                        </div>
                        <div className="w-10 h-3 border-t-2 border-white/60 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                    {isWin ? "Fantastic Job!" : "Better luck next time"}
                  </p>
              </div>

              {/* Star Decor for Wins */}
              {isWin && (
                <>
                  <div className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center bg-yellow-400 rounded-xl rotate-[-15deg] shadow-lg shadow-yellow-400/30">
                    <span className="material-symbols-outlined text-background-dark text-3xl">star</span>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center bg-yellow-400 rounded-xl shadow-lg shadow-yellow-400/40">
                    <span className="material-symbols-outlined text-background-dark text-4xl">star</span>
                  </div>
                   <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center bg-yellow-400 rounded-xl rotate-[15deg] shadow-lg shadow-yellow-400/30">
                    <span className="material-symbols-outlined text-background-dark text-3xl">star</span>
                  </div>
                  {isNewRecord && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-background-dark shadow-xl animate-bounce">
                      New Record
                    </div>
                  )}
                </>
              )}

              {!isWin && (
                <div className="absolute inset-0 bg-red-500/5 flex items-center justify-center">
                  <span className="text-8xl font-black text-white/5 pointer-events-none">{state.targetNumber}</span>
                </div>
              )}
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
             <p className="text-[10px] font-bold uppercase text-white/30 tracking-widest mb-1">Time Taken</p>
             <p className="text-2xl font-bold text-white">{formatTime(timeTaken)}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
             <p className="text-[10px] font-bold uppercase text-white/30 tracking-widest mb-1">Attempts</p>
             <p className="text-2xl font-bold text-white">{state.attempts}</p>
          </div>
        </div>

        <div className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm flex items-center justify-between mb-10">
           <div>
             <p className="text-[10px] font-bold uppercase text-white/30 tracking-widest mb-1">Total Score</p>
             <p className="text-3xl font-bold text-white tabular-nums">{finalScore.toLocaleString()}</p>
           </div>
           {isWin && (
             <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">trending_up</span>
                <span className="font-bold text-lg">+{finalScore.toLocaleString()}</span>
             </div>
           )}
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-4">
           <button 
            onClick={onRestart}
            className="w-full h-16 rounded-2xl bg-primary text-background-dark flex items-center justify-center gap-3 shadow-[0_6px_0_#0a8db8] active:translate-y-1 active:shadow-none transition-all"
           >
              <span className="material-symbols-outlined font-bold">refresh</span>
              <span className="text-xl font-bold uppercase tracking-wider">Try Again</span>
           </button>
           
           <button 
            onClick={onHome}
            className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-white/70 hover:bg-white/10 transition-colors"
           >
              <span className="material-symbols-outlined">home</span>
              <span className="text-lg font-semibold uppercase tracking-widest">Home Menu</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
