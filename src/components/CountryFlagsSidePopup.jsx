"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { countriesData } from "../../lib/countries_data";

// ---------------- Smooth Scroll Wrapper ---------------- //
function SmoothScrollRegions({ children, onScrollChange, isOpen }) {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      targetRef.current = 0;
      currentRef.current = 0;
      controls.set({ y: 0 });
    }
  }, [isOpen, controls]);

  useEffect(() => {
    let startY = 0;

    const handleWheel = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const contentHeight = container.firstElementChild?.scrollHeight || 0;
      const viewHeight = container.offsetHeight;
      
      if (contentHeight > viewHeight) {
        e.preventDefault();
        targetRef.current += e.deltaY;
      }
    };

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const contentHeight = container.firstElementChild?.scrollHeight || 0;
      const viewHeight = container.offsetHeight;

      if (contentHeight > viewHeight) {
        e.preventDefault();
        const currentY = e.touches[0].clientY;
        const deltaY = startY - currentY;
        startY = currentY;
        targetRef.current += deltaY * 1.2;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;
      if (!container || !container.firstElementChild) return;

      const contentHeight = container.firstElementChild.scrollHeight;
      const viewHeight = container.offsetHeight;
      const maxScroll = Math.max(0, contentHeight - viewHeight);

      targetRef.current = Math.min(Math.max(targetRef.current, 0), maxScroll);
      currentRef.current += (targetRef.current - currentRef.current) * 0.08;

      controls.start({
        y: -currentRef.current,
        transition: { duration: 0.3, ease: "linear" },
      });

      if (onScrollChange) {
        const isAtBottom = currentRef.current >= maxScroll - 5;
        onScrollChange(isAtBottom);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [controls, onScrollChange]);

  return (
    <div ref={containerRef} className="flex-1 overflow-hidden mt-[20px] lg:pt-[20px]">
      <motion.div
        animate={controls}
        className="relative w-full will-change-transform space-y-[25px] lg:space-y-[30px] pb-[30px] lg:pb-[60px]"
        style={{ y: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ---------------- Main Component ---------------- //
export default function CountryFlagsSidePopup({ isOpen, onClose, activeRegionId = 1, onSelectRegion }) {
  const [hideBottomIcon, setHideBottomIcon] = useState(false);
  
  // Hovered state track karne ke liye state (e.g., { regionId: 1, type: 'primary' | 'optional' })
  const [hoveredRow, setHoveredRow] = useState({ id: null, type: null });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto bg-black/40" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 pl-[20px] lg:pl-[55px] w-full lg:w-[540px] bg-black/20 backdrop-blur-sm text-white flex flex-col transform transition-transform duration-300 ease-out shadow-2xl select-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-[30px] lg:pt-[45px] space-y-[10px] lg:space-y-[20px] flex-shrink-0">
          <h2 className="text-[12px] lg:text-[14px] tracking-[1px] uppercase font-arial">
            CHOOSE YOUR COUNTRY OR REGION
          </h2>
          <p className="text-[12px] lg:text-[14px] italic tracking-[1px] font-arial">
            LANGUAGE
          </p>
        </div>

        <SmoothScrollRegions onScrollChange={setHideBottomIcon} isOpen={isOpen}>
          {countriesData.map((region) => {
            const isActive = region.id === activeRegionId;
            const isRowHovered = hoveredRow.id === region.id;

            return (
              <div
                key={region.id}
                onClick={() => {
                  if (onSelectRegion) onSelectRegion(region);
                  onClose();
                }}
                className={`flex items-center cursor-pointer space-x-[20px] lg:space-x-[40px] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
                // Pure row se mouse leave hote hi state reset
                onMouseLeave={() => setHoveredRow({ id: null, type: null })}
              >
                {/* Flag Container */}
                <div className="flex items-center flex-shrink-0">
                  <img
                    src={region.country_flag}
                    alt={`${region.country_name} flag`}
                    className={`w-[30px] lg:w-[40px] h-auto object-contain transition-transform ${
                      isActive ? "scale-110" : ""
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Grid Layout Container */}
                <div
                  className={`flex-1 grid grid-cols-3 gap-x-[3px] lg:gap-x-[10px] items-center text-[8.5px] lg:text-[12px] font-arial tracking-[1.5px] ${
                    isActive ? "text-cyan-400 font-bold" : "text-white"
                  }`}
                >
                  {/* Column 1: Country Name */}
                  <span 
                    className={`uppercase transition-colors ${
                      isActive 
                        ? "text-cyan-400" 
                        : isRowHovered 
                          ? "text-cyan-400" 
                          : "text-white"
                    }`}
                    onMouseEnter={() => setHoveredRow({ id: region.id, type: "primary" })}
                  >
                    {region.country_name}
                  </span>

                  {/* Column 2: Primary Language */}
                  <span 
                    className={`uppercase italic transition-colors ${
                      isActive 
                        ? "text-cyan-400" 
                        : (isRowHovered && hoveredRow.type === "primary") 
                          ? "text-cyan-400" 
                          : "text-white"
                    }`}
                    onMouseEnter={() => setHoveredRow({ id: region.id, type: "primary" })}
                  >
                    {region.country_language}
                  </span>

                  {/* Column 3: Optional Secondary Language */}
                  {region.country_language_optional ? (
                    <span 
                      className={`uppercase italic transition-colors ${
                        isActive 
                          ? "text-cyan-400" 
                          : (isRowHovered && hoveredRow.type === "optional") 
                            ? "text-cyan-400" 
                            : "text-white"
                      }`}
                      onMouseEnter={() => setHoveredRow({ id: region.id, type: "optional" })}
                    >
                      {region.country_language_optional}
                    </span>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            );
          })}
        </SmoothScrollRegions>

        {isOpen && !hideBottomIcon && <div className="c02136 cursor-default" />}
      </div>
    </>
  );
}