
import React from 'react';

interface HomeScreenProps {
  onStart: () => void;
  highScore: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, highScore }) => {
  return (
    <div className="relative flex flex-col h-screen max-w-md w-full px-8 pt-20 pb-12 items-center justify-between mx-auto overflow-hidden">
      {/* Decorative Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>

      <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(19,182,236,0.4)]">
            <span className="material-symbols-outlined text-primary text-6xl animate-flicker">sensors</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-secondary px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-widest">v2.0.77</div>
        </div>
        
        <h1 className="text-6xl font-black tracking-tighter text-white mb-2 italic">
          NUM<span className="text-primary neon-text">PUZZLE</span>
        </h1>
        <div className="h-1 w-24 bg-primary/50 rounded-full mb-2"></div>
        <p className="text-primary/60 font-mono uppercase tracking-[0.4em] text-[10px]">Neural Interface Active</p>
      </div>

      <div className="w-full space-y-4">
        {/* High Score Panel */}
        <div className="bg-background-surface/80 backdrop-blur-md border-l-4 border-primary p-6 rounded-r-2xl flex items-center gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 shrink-0">
            <span className="material-symbols-outlined text-primary">military_tech</span>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase text-primary/50 mb-1">Top Score Recalibrated</p>
            <p className="text-3xl font-black text-white tabular-nums tracking-tight">{highScore.toLocaleString()}</p>
          </div>
        </div>

        {/* Start Button */}
        <button 
          onClick={onStart}
          className="w-full group relative h-20 bg-primary overflow-hidden rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(19,182,236,0.3)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite] pointer-events-none"></div>
          <div className="relative flex items-center justify-center gap-4 text-background-dark">
            <span className="material-symbols-outlined font-bold text-3xl">terminal</span>
            <span className="text-2xl font-black uppercase tracking-widest">Initialize Scan</span>
          </div>
        </button>
      </div>

      {/* Footer System Status */}
      <div className="w-full flex justify-between border-t border-white/5 pt-8 font-mono text-[9px] text-white/20 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          <span>System Online</span>
        </div>
        <span>CRC: 0xF72A</span>
        <span>Local Node: 8080</span>
      </div>
    </div>
  );
};

export default HomeScreen;
