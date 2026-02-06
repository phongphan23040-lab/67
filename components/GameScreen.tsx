
import React, { useState, useRef, useEffect } from 'react';
import { GameState } from '../types';
import { GAME_CONFIG } from '../constants';

interface GameScreenProps {
  state: GameState;
  onGuess: (guess: number) => void;
  onQuit: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ state, onGuess, onQuit }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [state.attempts]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const val = parseInt(inputValue, 10);
    onGuess(val);
    setInputValue('');
  };

  const progress = (state.attempts / GAME_CONFIG.MAX_ATTEMPTS) * 100;

  return (
    <div className="relative flex flex-col h-screen max-w-md w-full px-6 pt-12 pb-10 mx-auto overflow-hidden">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
        <div 
          className="h-full bg-primary shadow-[0_0_15px_rgba(19,182,236,1)] transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="flex items-center justify-between mb-12">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">Neural Load</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-white leading-none">{state.attempts}</span>
            <span className="text-xs font-bold text-white/20 mb-1">/ {GAME_CONFIG.MAX_ATTEMPTS}</span>
          </div>
        </div>
        
        <button 
          onClick={onQuit}
          className="group h-10 px-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">power_settings_new</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Abort</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Feedback Terminal */}
        <div className="mb-10 min-h-[100px] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl"></div>
          <div key={state.attempts} className="relative w-full py-6 px-8 rounded-2xl bg-background-surface border border-white/5 shadow-2xl animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[8px] font-mono text-primary/40 uppercase tracking-widest">AI Feedback Loop</span>
            </div>
            <p className="text-xl font-bold text-white leading-tight italic">
              {state.feedback || "Identify the encoded value within 1-100."}
            </p>
          </div>
        </div>

        {/* Interaction Zone */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl group-focus-within:bg-primary/40 transition-all"></div>
            <div className="relative w-48 h-48 bg-background-dark border-2 border-white/10 rounded-[3rem] flex flex-col items-center justify-center focus-within:border-primary transition-colors neon-border">
              <input
                ref={inputRef}
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="?"
                className="w-full bg-transparent text-8xl font-black text-center text-primary placeholder:text-white/5 focus:outline-none focus:ring-0"
              />
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] mt-2">Data Bit</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={!inputValue}
            className={`w-full h-16 rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
              inputValue 
              ? 'bg-primary text-background-dark shadow-[0_0_40px_rgba(19,182,236,0.3)]' 
              : 'bg-white/5 text-white/10 cursor-not-allowed grayscale'
            }`}
          >
            <span className="material-symbols-outlined">analytics</span>
            <span>Execute Decode</span>
          </button>
        </form>
      </main>

      {/* Log Feed */}
      <footer className="mt-12 h-32 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
          <span className="material-symbols-outlined text-xs text-primary">database</span>
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">Log Stack Trace</span>
        </div>
        <div className="flex flex-wrap gap-2 overflow-y-auto pr-2">
          {state.history.map((num, i) => (
            <div 
              key={`${num}-${i}`}
              className={`px-4 py-2 rounded-lg font-mono text-sm border transition-all animate-in zoom-in ${
                i === 0 ? 'bg-primary/20 border-primary text-primary neon-border' : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              #{state.history.length - i}: {num}
            </div>
          ))}
          {state.history.length === 0 && (
            <div className="w-full text-center py-6 text-[10px] font-mono text-white/10 uppercase tracking-widest italic">
              Awaiting data input...
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default GameScreen;
