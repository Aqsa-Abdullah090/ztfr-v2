'use client';

export default function Header({ onFlagClick, selectedRegion }) {
  return (
    <header className="relative w-full z-10 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-black tracking-widest text-white font-mono">
          ZT<span className="text-slate-400">R</span>
        </span>
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center space-x-6">
        <button 
          type="button" 
          className="text-slate-300 hover:text-white font-mono text-sm tracking-widest flex items-center transition-colors"
        >
          00.00 <span className="mx-2 text-xs">✕</span>
        </button>
        
        {/* Clickable Flag Element (Now Dynamic!) */}
        <div 
          onClick={onFlagClick}
          className="flex items-center cursor-pointer "
        >
          {/* Check mapping: Agar data array me country_flag image URL hai to image show karein */}
          {selectedRegion?.country_flag?.startsWith('http') || selectedRegion?.country_flag?.startsWith('/') ? (
            <img 
              src={selectedRegion.country_flag} 
              alt="flag" 
              className="w-[40px] h-auto object-contain"
            />
          ) : (
            <span className="text-sm">{selectedRegion?.country_flag || '🇬🇧'}</span>
          )}
        </div>
      </div>
    </header>
  );
}