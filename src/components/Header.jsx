'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header({ onFlagClick, selectedRegion, isSidebarOpen }) {
  // Local state trigger handle karne ke liye
  const [startFlyUp, setStartFlyUp] = useState(false);

  // Jab parent se completely sidebar close ho, tabhi state reset ho
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

  return (
    <header className="relative w-full z-10 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center space-x-2">
        <img src="/assets/ZTFR-b.svg" alt="logo" className="h-[40px] w-auto" />
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center space-x-6">
        <motion.div 
          onClick={handleFlagClick}
          className="flex items-center cursor-pointer"
          animate={shouldBeUp ? { y: -70 } : { y: 0 }}
          // Dynamic transition configuration
          transition={{ 
            duration: 1,
            // AGAR flag upar ja raha hai toh delay: 0, 
            // AGAR niche aa raha hai (sidebar close ho chuka hai) toh 0.6 seconds ka delay
            delay: shouldBeUp ? 0 : 0.6 
          }} 
          onAnimationComplete={() => {
            if (startFlyUp && !isSidebarOpen) {
              onFlagClick();
            }
          }}
        >
          {selectedRegion?.country_flag?.startsWith('http') || selectedRegion?.country_flag?.startsWith('/') ? (
            <img 
              src={selectedRegion.country_flag} 
              alt="flag" 
              className="w-[40px] h-auto object-contain"
            />
          ) : (
            <span className="text-sm">{selectedRegion?.country_flag || '🇬🇧'}</span>
          )}
        </motion.div>
      </div>
    </header>
  );
}