"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { countriesData } from "../../lib/countries_data";

// ---------------- Smooth Scroll Wrapper ---------------- //
function SmoothScrollRegions({ children, onScrollChange, isOpen }) {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const targetRef = useRef(0); // target scroll value
  const currentRef = useRef(0); // current scroll position
  const rafRef = useRef(null);

  // Jab popup close ho toh scroll target reset karne ke liye
  useEffect(() => {
    if (!isOpen) {
      targetRef.current = 0;
      currentRef.current = 0;
      controls.set({ y: 0 });
    }
  }, [isOpen, controls]);

  // Wheel and Touch listeners
  useEffect(() => {
    let startY = 0;

    const handleWheel = (e) => {
      // Check if wrapper actually needs scrolling (content larger than container)
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
        const deltaY = startY - currentY; // positive when swiping up
        startY = currentY;
        targetRef.current += deltaY * 1.2; // scale factor
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

  // Smooth animation loop with clamping
  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;
      if (!container || !container.firstElementChild) return;

      const contentHeight = container.firstElementChild.scrollHeight;
      const viewHeight = container.offsetHeight;
      const maxScroll = Math.max(0, contentHeight - viewHeight);

      // clamp scroll range
      targetRef.current = Math.min(Math.max(targetRef.current, 0), maxScroll);

      // smooth interpolation
      currentRef.current += (targetRef.current - currentRef.current) * 0.08;

      controls.start({
        y: -currentRef.current,
        transition: { duration: 0.3, ease: "linear" },
      });

      // detect scroll position for bottom fade/icon indicator
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
    <div ref={containerRef} className="flex-1 overflow-hidden mt-[20px] pt-[25px]">
      <motion.div
        animate={controls}
        className="relative w-full will-change-transform space-y-[30px] pb-[60px]"
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

  // Escape key overlay handler
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
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto bg-black/40" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 pl-[55px] w-[540px] bg-black/20 backdrop-blur-sm text-white flex flex-col transform transition-transform duration-300 ease-out shadow-2xl select-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="pt-[45px] space-y-1 flex-shrink-0">
          <h2 className="text-[10px] xl:text-[14px] tracking-[1px] uppercase font-arial">
            CHOOSE YOUR COUNTRY OR REGION
          </h2>
          <p className="text-[10px] italic tracking-[1px] font-arial opacity-80">
            LANGUAGE
          </p>
        </div>

        {/* Smooth Scroll Wrapper applied here */}
        <SmoothScrollRegions onScrollChange={setHideBottomIcon} isOpen={isOpen}>
          {countriesData.map((region) => {
            const isActive = region.id === activeRegionId;

            return (
              <div
                key={region.id}
                onClick={() => {
                  if (onSelectRegion) onSelectRegion(region);
                  onClose();
                }}
                className={`flex items-center cursor-pointer space-x-[40px] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
              >
                {/* Left Column Flag Container */}
                <div className="flex items-center flex-shrink-0">
                  <img
                    src={region.country_flag}
                    alt={`${region.country_name} flag`}
                    className={`w-[40px] h-auto object-contain transition-transform ${
                      isActive ? "scale-110" : ""
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Right Column Grid Layout Container */}
                <div
                  className={`flex-1 grid grid-cols-3 gap-x-[10px] items-center text-[12px] font-arial tracking-[1.5px] ${
                    isActive ? "text-cyan-400 font-bold" : "text-white hover:text-cyan-400"
                  }`}
                >
                  {/* Column 1: Country Name */}
                  <span className="uppercase">{region.country_name}</span>

                  {/* Column 2: Primary Language */}
                  <span className="uppercase italic">{region.country_language}</span>

                  {/* Column 3: Optional Secondary Language */}
                  {region.country_language_optional ? (
                    <span className="uppercase italic">{region.country_language_optional}</span>
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