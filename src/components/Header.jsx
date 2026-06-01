'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header({ onFlagClick, selectedRegion, isSidebarOpen }) {
  // Yeh local state animation sequence trigger karne ke liye hai
  const [startFlyUp, setStartFlyUp] = useState(false);

  // Agar sidebar parent se close ho jaye toh automatic state reset ho jaye
  useEffect(() => {
    if (!isSidebarOpen) {
      setStartFlyUp(false);
    }
  }, [isSidebarOpen]);

  const handleFlagClick = () => {
    if (startFlyUp || isSidebarOpen) return;
    setStartFlyUp(true); // Animation trigger karein
  };

  // Determine karein ki flag ko kab upar rehna hai aur kab niche aana hai
  const shouldBeUp = startFlyUp || isSidebarOpen;

  return (
    <header className="relative w-full z-10 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center space-x-2">
        <img src="/assets/ZTFR-b.svg" alt="logo" className="h-[40px] w-auto" />
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center space-x-6">
        {/* Clickable Flag Element */}
        <motion.div 
          onClick={handleFlagClick}
          className="flex items-center cursor-pointer"
          // Agar shouldBeUp true hai toh upar chala jaye, warna normal position (0) par smoothly niche aaye
          animate={shouldBeUp ? { y: -70, opacity: 0, scale: 0.8 } : { y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 1, 0.5, 1] // Custom swift cubic-bezier transition
          }} 
          onAnimationComplete={() => {
            // Sirf tab sidebar kholein jab flag upar ja raha ho aur sidebar abhi khula na ho
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