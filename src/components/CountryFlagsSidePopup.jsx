'use client';

import React, { useEffect } from 'react';

// Mock list matching the data schema from your layout screenshot
const REGIONS_DATA = [
  { id: 'uk', flag: '🇬🇧', country: 'UNITED KINGDOM', languages: ['ENGLISH'], active: true },
  { id: 'us', flag: '🇺🇸', country: 'UNITED STATES', languages: ['ENGLISH'] },
  { id: 'ca', flag: '🇨🇦', country: 'CANADA', languages: ['ENGLISH', 'FRANÇAIS'] },
  { id: 'au', flag: '🇦🇺', country: 'AUSTRALIA', languages: ['ENGLISH'] },
  { id: 'it', flag: '🇮🇹', country: 'ITALIA', languages: ['ITALIANO'] },
  { id: 'de', flag: '🇩🇪', country: 'DEUTSCHLAND', languages: ['DEUTSCH'] },
  { id: 'fr', flag: '🇫🇷', country: 'FRANCE', languages: ['FRANÇAIS'] },
  { id: 'es', flag: '🇪🇸', country: 'ESPAÑA', languages: ['ESPAÑOL'] },
  { id: 'pt', flag: '🇵🇹', country: 'PORTUGAL', languages: ['PORTUGUÊS'] },
  { id: 'nl', flag: '🇳🇱', country: 'NEDERLAND', languages: ['NEDERLANDS'] },
  { id: 'no', flag: '🇳🇴', country: 'NORGE', languages: ['NORSK'] },
  { id: 'dk', flag: '🇩🇰', country: 'DANMARK', languages: ['DANSE'] },
  { id: 'se', flag: '🇸🇪', country: 'SVERIGE', languages: ['SVENSKA'] },
  { id: 'pl', flag: '🇵🇱', country: 'POLSKA', languages: ['POLSKI'] },
];

export default function CountryFlagsSidePopup({ isOpen, onClose }) {
  
  // Handle escape key bindings and global scrolling locking states
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay layout layer */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel structural container */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs md:max-w-sm bg-[#18181b]/95 border-l border-white/5 text-white flex flex-col transform transition-transform duration-300 ease-out shadow-2xl select-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="px-6 pt-10 pb-4 space-y-1">
          <h2 className="text-[11px] font-bold tracking-[0.18em] text-slate-200 font-sans uppercase">
            CHOOSE YOUR COUNTRY OR REGION
          </h2>
          <p className="text-[10px] italic font-medium tracking-widest text-slate-400 font-serif">
            LANGUAGE
          </p>
        </div>

        {/* Scrollable Regions Stack */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 custom-scrollbar pb-12">
          {REGIONS_DATA.map((region) => (
            <div
              key={region.id}
              onClick={() => {
                // Interactive handler for selection updates
                console.log(`Region swapped to: ${region.country}`);
                onClose();
              }}
              className="flex items-center justify-between group cursor-pointer py-1.5 transition-all duration-200 hover:opacity-100 opacity-80"
            >
              {/* Left Column Flag and Label Data Block */}
              <div className="flex items-center space-x-4">
                {/* Clean, scaled emoji rendering container */}
                <span className="text-2xl filter drop-shadow-sm leading-none" role="img" aria-label={region.country}>
                  {region.flag}
                </span>
                
                <span className={`text-[10px] font-bold tracking-[0.15em] font-sans uppercase transition-colors ${
                  region.active ? 'text-cyan-400' : 'text-slate-300 group-hover:text-white'
                }`}>
                  {region.country}
                </span>
              </div>

              {/* Right Column Available Languages Metadata List */}
              <div className="flex items-center space-x-2 text-right pl-4">
                {region.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className={`text-[9px] font-bold tracking-widest uppercase font-mono ${
                      region.active && idx === 0 ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Absolute Floating Bottom Right Window Close Indicator */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors text-xs font-mono p-2 focus:outline-none"
          aria-label="Close region selector"
        >
          ✕
        </button>
      </div>
    </>
  );
}