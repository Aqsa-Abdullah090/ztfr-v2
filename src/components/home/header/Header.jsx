'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header({ onFlagClick, selectedRegion, isSidebarOpen }) {
  const [startFlyUp, setStartFlyUp] = useState(false);

  useEffect(() => {
    if (!isSidebarOpen) {
      setStartFlyUp(false);
    }
  }, [isSidebarOpen]);

  const handleFlagClick = () => {
    if (startFlyUp || isSidebarOpen) return;
    setStartFlyUp(true); 
  };

  const shouldBeUp = startFlyUp || isSidebarOpen;

  // Multi-type asset verification (Image files vs Emoji Strings)
  const isImageSrc = 
    selectedRegion?.country_flag && 
    (typeof selectedRegion.country_flag === 'string') &&
    (selectedRegion.country_flag.startsWith('http') || 
     selectedRegion.country_flag.startsWith('/') || 
     selectedRegion.country_flag.includes('//') ||
     selectedRegion.country_flag.endsWith('.png') ||
     selectedRegion.country_flag.endsWith('.svg'));

  return (
    <header className="relative w-full z-10 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center space-x-2">
        <img src="/assets/ZTFR-b.svg" alt="logo" className="h-[40px] w-auto" />
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center space-x-6">
        <motion.div 
          onClick={handleFlagClick}
          className="flex items-center cursor-pointer min-w-[40px] justify-center"
          animate={shouldBeUp ? { y: -70 } : { y: 0 }}
          transition={{ 
            duration: 1,
            delay: shouldBeUp ? 0 : 0.6 
          }} 
          onAnimationComplete={() => {
            if (startFlyUp && !isSidebarOpen) {
              onFlagClick();
            }
          }}
        >
          {selectedRegion?.country_flag ? (
            // CASE 1: Validation Passed (Flag load hogaya)
            isImageSrc ? (
              <img 
                src={selectedRegion.country_flag} 
                alt={selectedRegion?.country_name || "flag"} 
                className="w-[40px] h-auto object-contain rounded-sm shadow-sm"
                onError={(e) => {
                  console.warn("Flag image failed loading, cleaning image wrapper attribute node.");
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <span className="text-2xl select-none">
                {selectedRegion.country_flag}
              </span>
            )
          ) : (
            // CASE 2: Waiting/API Loading State -> Dummy Globe Indicator
            <div className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-7 h-7 text-white animate-pulse"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
}