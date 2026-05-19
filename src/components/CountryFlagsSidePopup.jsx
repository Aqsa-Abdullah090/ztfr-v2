'use client';
import React, { useEffect, useState, useRef } from 'react';
import { countriesData } from '../../lib/countries_data'; 

export default function CountryFlagsSidePopup({ isOpen, onClose, activeRegionId = 1 }) {
  const scrollContainerRef = useRef(null);
  const [hideBottomIcon, setHideBottomIcon] = useState(false);

  // 1. Core listener handling sidebar closing events via Escape key
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

  // 2. Dynamic Scroll Calculation Logic to hide indicator at the bottom element threshold
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Calculate current position relative to total height and threshold tolerance padding
    const isAtBottom = 
      container.scrollHeight - container.scrollTop <= container.clientHeight + 6; // Slight padding tolerance bump
    
    setHideBottomIcon(isAtBottom);
  };

  // 3. Trigger recalculation checks instantly when the drawer expands or options scale
  useEffect(() => {
    if (isOpen) {
      // Small macro-task timeout allows the DOM thread to finalize structural layout maps
      setTimeout(() => {
        handleScroll();
      }, 100); // Bumped slightly to guarantee DOM layout calculations are finalized
    }
  }, [isOpen, countriesData]);

  return (
    <>
      {/* Backdrop overlay layout layer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
       
        aria-hidden="true"
      />

      {/* Slide-over panel structural container */}
      {/* Added 'relative' to establish a solid anchoring base for your absolute indicators */}
      <div
        className={`fixed inset-y-0 right-0 z-50 pl-[55px] w-[480px] bg-[#000]/50 backdrop-blur-[4px] text-white flex flex-col transform transition-transform duration-300 ease-out shadow-2xl select-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="pt-[45px] space-y-1 flex-shrink-0">
          <h2 className="text-[10px] xl:text-[14px] tracking-[1px] font-sans uppercase">
            CHOOSE YOUR COUNTRY OR REGION
          </h2>
          <p className="text-[10px] italic tracking-[1px] font-sans text-slate-400">
            LANGUAGE
          </p>
        </div>

        {/* Scrollable Regions Stack */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          id="note-input" /* Webkit targets this identifier to clear visual track aesthetics */
          className="flex-1 overflow-y-auto space-y-[30px] pt-[45px] pb-[60px] font-sans"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {countriesData.map((region) => {
            const isActive = region.id === activeRegionId;

            return (
              <div
                key={region.id}
                onClick={() => {
                  console.log(`Region swapped to: ${region.country_name} (${region.value})`);
                  onClose();
                }}
                className="flex items-center cursor-pointer space-x-[30px] opacity-85 hover:opacity-100 transition-opacity"
              >
                {/* Left Column Flag Container */}
                <div className="flex items-center flex-shrink-0">
                  <img 
                    src={region.country_flag} 
                    alt={`${region.country_name} flag`}
                    className="w-[40px] h-auto object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Right Column Grid Layout Container */}
                <div className="flex-1 grid grid-cols-3 gap-x-[10px] items-center text-[10px] tracking-[1px]">
                  
                  {/* Column 1: Country Name */}
                  <span className={`uppercase transition-colors font-medium ${
                    isActive ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {region.country_name}
                  </span>

                  {/* Column 2: Primary Language */}
                  <span className={`uppercase ${isActive ? 'text-cyan-400' : 'text-white'}`}>
                    {region.country_language}
                  </span>

                  {/* Column 3: Optional Secondary Language */}
                  {region.country_language_optional ? (
                    <span className="uppercase text-white">
                      {region.country_language_optional}
                    </span>
                  ) : (
                    <span />
                  )}

                </div>
              </div>
            );
          })}
        </div>

       {isOpen && !hideBottomIcon && (
          /* Removed the nested helper wrappers that were breaking transform calculations. 
             The element now renders directly relative to the sidebar container frame bounds. */
          <div className="c02136 cursor-default" />
        )}
      </div>
    </>
  );
}