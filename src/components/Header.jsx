'use client';

export default function Header() {
  return (
    <header className="relative w-full z-10 flex items-center justify-between px-8 py-6 backdrop-blur-xs bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-black tracking-widest text-white font-mono">
          ZT<span className="text-slate-400">R</span>
        </span>
      </div>
      
      {/* Right side controls (Close indicator and Flag) */}
      <div className="flex items-center space-x-6">
        <button 
          type="button" 
          className="text-slate-300 hover:text-white font-mono text-sm tracking-widest flex items-center transition-colors"
        >
          00.00 <span className="mx-2 text-xs">✕</span>
        </button>
        <div className="flex items-center space-x-1 border border-white/20 bg-black/20 rounded px-2 py-1">
          <span className="text-xs font-bold tracking-wider uppercase text-slate-300">UK</span>
          <span className="text-sm">🇬🇧</span>
        </div>
      </div>
    </header>
  );
}