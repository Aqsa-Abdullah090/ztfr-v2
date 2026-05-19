'use client';

export default function Header({ onFlagClick, selectedRegion }) {
  return (
    <header className="relative w-full z-10 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center space-x-2">
       <img src="/assets/ZTFR-b.svg" alt="logo" className="h-[40px] w-auto" />
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center space-x-6">
       
        
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