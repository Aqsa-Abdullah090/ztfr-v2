"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { countriesData } from "../../lib/countries_data";
import i18n from "@/components/primitives/I18n";
import { useTranslation } from "react-i18next"; // 🔥 Added translation hook

// ---------------- Smooth Scroll Wrapper ---------------- //
function SmoothScrollRegions({ children, onScrollChange, isOpen }) {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!isOpen || !isDesktop) {
      targetRef.current = 0;
      currentRef.current = 0;
      controls.set({ y: 0 });
    }
  }, [isOpen, isDesktop, controls]);

  useEffect(() => {
    if (!isDesktop) return;
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

    const handleTouchStart = (e) => { startY = e.touches[0].clientY; };
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
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    const animate = () => {
      const container = containerRef.current;
      if (!container || !container.firstElementChild) return;
      const contentHeight = container.firstElementChild.scrollHeight;
      const viewHeight = container.offsetHeight;
      const maxScroll = Math.max(0, contentHeight - viewHeight);

      targetRef.current = Math.min(Math.max(targetRef.current, 0), maxScroll);
      currentRef.current += (targetRef.current - currentRef.current) * 0.45;

      controls.start({
        y: -currentRef.current,
        transition: { duration: 0.01, ease: "linear" },
      });

      if (onScrollChange) {
        onScrollChange(currentRef.current >= maxScroll - 5);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [controls, onScrollChange, isDesktop]);

  return (
    <div
      ref={containerRef}
      onScroll={(e) => {
        if (isDesktop || !onScrollChange) return;
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        onScrollChange(scrollTop + clientHeight >= scrollHeight - 5);
      }}
      className={`flex-1 mt-[20px] lg:pt-[20px] ${isDesktop ? "overflow-hidden" : "overflow-y-auto scrolling-touch"}`}
    >
      <motion.div animate={isDesktop ? controls : { y: 0 }} className="relative w-full space-y-[25px] lg:space-y-[30px] pb-[30px] lg:pb-[60px]">
        {children}
      </motion.div>
    </div>
  );
}

// ---------------- Main Sidebar Component ---------------- //
export default function CountryFlagsSidebar({ isOpen, onClose, activeRegionId = null, onSelectRegion, selectedRegion = null }) {
  const { t } = useTranslation(); // 🔥 Initialized translation hook
  const [hideBottomIcon, setHideBottomIcon] = useState(false);
  const [hoveredRow, setHoveredRow] = useState({ id: null, type: null });

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const cleanActiveId = String(activeRegionId || "").trim().toLowerCase();
  const cleanActiveName = String(selectedRegion?.country_name || "").trim().toLowerCase();

  const isCountryMatch = (region) => {
    const localId = String(region.id || "").trim().toLowerCase();
    const localValueCode = String(region.value || "").trim().toLowerCase();
    const localName = String(region.country_name || "").trim().toLowerCase();
    const localFlagPath = String(region.country_flag || "").trim().toLowerCase();

    const isIdOrCodeMatch = localId === cleanActiveId || localValueCode === cleanActiveId;
    const isNameMatch = cleanActiveName && (localName === cleanActiveName || localFlagPath.includes(cleanActiveName));

    return isIdOrCodeMatch || isNameMatch;
  };

  const orderedCountries = useMemo(() => {
    if (!cleanActiveId && !cleanActiveName) return countriesData;

    const activeItem = countriesData.find(item => isCountryMatch(item));
    if (!activeItem) return countriesData;

    const remainingItems = countriesData.filter(item => !isCountryMatch(item));
    return [activeItem, ...remainingItems];
  }, [cleanActiveId, cleanActiveName]);

  // Dynamic localization execution handler
  const handleItemSelection = (region) => {
    const designatedLang = String(region.value || "en").toLowerCase();

    // Switch languages dynamically via instance sync
    i18n.changeLanguage(designatedLang);
    localStorage.setItem("language", designatedLang);

    if (onSelectRegion) onSelectRegion(region);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-400 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 right-0 z-50 pl-[20px] lg:pl-[45px] w-full lg:w-[480px] text-white flex flex-col transform transition-transform duration-400 ease-out shadow-2xl select-none ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        }}>

        <div className="pt-[30px] lg:pt-[45px] space-y-[10px] lg:space-y-[20px] flex-shrink-0">
          <h2 className="text-[12px] lg:text-[14px] tracking-[1px] uppercase font-arial">
            {t("countries.choose", "CHOOSE YOUR COUNTRY OR REGION")} {/* 🔥 Dynamic translation with English fallback */}
          </h2>
          <p className="text-[12px] lg:text-[14px] italic tracking-[1px] font-arial">
            {t("countries.language", "LANGUAGE")} {/* 🔥 Dynamic translation with English fallback */}
          </p>
        </div>

        <SmoothScrollRegions onScrollChange={setHideBottomIcon} isOpen={isOpen}>
          {orderedCountries.map((region) => {
            const isActive = isCountryMatch(region);
            const isRowHovered = hoveredRow.id === region.id;

            return (
              <div
                key={region.id}
                onClick={() => handleItemSelection(region)}
                className="flex items-center space-x-[20px] lg:space-x-[40px] transition-opacity"
                onMouseLeave={() => setHoveredRow({ id: null, type: null })}
              >
                <div className="flex items-center flex-shrink-0">
                  <img
                    src={isActive && selectedRegion?.country_flag && !selectedRegion.country_flag.includes('dynamic') ? selectedRegion.country_flag : region.country_flag}
                    alt={`${region.country_name} flag`}
                    className="h-[30px] w-[30px] object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>

                <div
                  className={`flex-1 grid grid-cols-3 gap-x-[20px] lg:gap-x-[50px] items-center text-[8.5px] lg:text-[12px] font-arial tracking-[1.5px] ${isActive ? "text-[#0098AA] font-bold" : "text-white"
                    }`}
                >
                  <span
                    className={`inline-block uppercase whitespace-nowrap transition-colors ${isActive || isRowHovered ? "text-[#0098AA]" : "text-white"
                      } cursor-pointer`}
                    onMouseEnter={() =>
                      setHoveredRow({ id: region.id, type: "primary" })
                    }
                  >
                    {region.country_name}
                  </span>

                  <span
                    className={`uppercase transition-colors  ml-[20px] ${isActive || (isRowHovered && hoveredRow.type === "primary") ? "text-[#0098AA]" : "text-white"
                      } cursor-pointer`}
                    onMouseEnter={() => setHoveredRow({ id: region.id, type: "primary" })}
                  >
                    {region.country_language}
                  </span>

                  {region.country_language_optional ? (
                    <span
                      className={`inline w-fit uppercase italic transition-colors cursor-pointer ${isActive || (isRowHovered && hoveredRow.type === "optional")
                          ? "text-[#0098AA]"
                          : "text-white"
                        }`}
                      onMouseEnter={() =>
                        setHoveredRow({ id: region.id, type: "optional" })
                      }
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