"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { countriesData } from "../../lib/countries_data";
import i18n from "@/components/primitives/I18n";
import { useTranslation } from "react-i18next";

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
        transition: { duration: 0.28, ease: "linear" },
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
      className={`flex-1 ${isDesktop ? "overflow-hidden" : "overflow-y-auto scrolling-touch"}`}
    >
      <motion.div animate={isDesktop ? controls : { y: 0 }} className="relative w-full space-y-[25px] lg:space-y-[30px] pb-[20px] lg:pb-[30px]">
        {children}
      </motion.div>
    </div>
  );
}

// ---------------- Main Sidebar Component ---------------- //
export default function CountryFlagsSidebar({ isOpen, onClose, activeRegionId = null, onSelectRegion, selectedRegion = null }) {
  const { t } = useTranslation();
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
    const localCode = String(region.country_code || "").trim().toLowerCase();
    const localName = String(region.country_name || "").trim().toLowerCase();
    const localFlagPath = String(region.country_flag || "").trim().toLowerCase();

    if (cleanActiveId && localId === cleanActiveId) return true;

    if (cleanActiveId) {
      if (cleanActiveId === "uk" && localCode === "gb") return true;
      if (localCode === "gb" && cleanActiveId === "gb") return true;
      if (localCode === cleanActiveId) return true;
    }

    if (cleanActiveName) {
      const isNameMatch = localName === cleanActiveName || localFlagPath.includes(cleanActiveName);
      if (isNameMatch) return true;
    }

    return false;
  };

  const orderedCountries = useMemo(() => {
    if (!cleanActiveId && !cleanActiveName) return countriesData;

    const activeItem = countriesData.find(item => isCountryMatch(item));
    if (!activeItem) return countriesData;

    const remainingItems = countriesData.filter(item => !isCountryMatch(item));
    return [activeItem, ...remainingItems];
  }, [cleanActiveId, cleanActiveName]);

  const handleItemSelection = (region, selectEnglish = false) => {
    const designatedLang = selectEnglish ? "en" : String(region.value || "en").toLowerCase();

    i18n.changeLanguage(designatedLang);
    localStorage.setItem("language", designatedLang);

    if (onSelectRegion) {
      onSelectRegion({
        ...region,
        chosenLanguage: designatedLang
      });
    }
    onClose();
  };

  const getLanguageStyles = (langValue) => {
    const upperLang = String(langValue || "").toUpperCase();

    if (upperLang === "PK" || upperLang === "AE") {
      return {
        fontSize: "17px",
        letterSpacing: "0px",
        fontStyle: "normal",
      };
    }
    if (["TH", "IN"].includes(upperLang)) {
      return {
        fontSize: "14px",
        letterSpacing: "0px",
        fontStyle: "normal",
      };
    }
    if (["CN", "KP", "JP"].includes(upperLang)) {
      return {
        fontSize: "12px",
        letterSpacing: "0px",
        fontStyle: "normal",
      };
    }
    return {
      fontSize: "12px",
      letterSpacing: "1.5px",
      fontStyle: "italic",
    };
  };

  const currentLang = String(i18n.language || "").toLowerCase();
  const isGlobalRTL = currentLang === "pk" || currentLang === "ae";

  const headerLanguageStyles = getLanguageStyles(currentLang);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-400 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <div 
        dir={isGlobalRTL ? "rtl" : "ltr"}
        className={`fixed inset-y-0 right-0 z-50 pl-[20px] lg:pl-[45px] pr-[20px] lg:pr-[45px] w-full lg:w-[480px] text-white flex flex-col transform transition-transform duration-400 ease-out shadow-2xl select-none ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        }}>

        <div className={`my-[10px] lg:my-[20px] space-y-[8px] lg:space-y-[10px] flex-shrink-0 ${isGlobalRTL ? "text-right" : "text-left"}`}>
          <h2 
           style={{
              fontSize: headerLanguageStyles.fontSize,
              letterSpacing: headerLanguageStyles.letterSpacing,
            }}
          className="text-[12px] tracking-[1px] uppercase font-arial not-italic">
            {t("countries.choose", "CHOOSE YOUR COUNTRY OR REGION")}
          </h2>
          <p 
            style={{
              fontSize: headerLanguageStyles.fontSize,
              letterSpacing: headerLanguageStyles.letterSpacing,
              fontStyle: headerLanguageStyles.fontStyle,
            }}
            className="uppercase font-arial transition-all duration-300"
          >
            {t("countries.language", "LANGUAGE")}
          </p>
        </div>

        <SmoothScrollRegions onScrollChange={setHideBottomIcon} isOpen={isOpen}>
          {orderedCountries.map((region) => {
            const isCountryActive = isCountryMatch(region);
            const isRowHovered = hoveredRow.id === region.id;
            
            const nativeLangValue = String(region.value || "").toLowerCase();

            const isNativeActive = isCountryActive && currentLang === nativeLangValue;
            const isEnglishActive = isCountryActive && currentLang === "en";

            const dynamicStyles = getLanguageStyles(region.value);

            return (
              <div
                key={region.id}
                dir="ltr"
                className="flex items-center flex-row space-x-[20px] lg:space-x-[58px] transition-opacity"
                onMouseLeave={() => setHoveredRow({ id: null, type: null })}
              >
                <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => handleItemSelection(region, false)}>
                  <img
                    src={isCountryActive && selectedRegion?.country_flag && !selectedRegion.country_flag.includes('dynamic') ? selectedRegion.country_flag : region.country_flag}
                    alt={`${region.country_name} flag`}
                    className="h-[30px] w-[30px] object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>

                <div
                  style={{
                    fontSize: dynamicStyles.fontSize,
                    letterSpacing: dynamicStyles.letterSpacing,
                    fontStyle: dynamicStyles.fontStyle,
                  }}
                  className="flex-1 grid grid-cols-3 gap-x-[20px] lg:gap-x-[120px] items-center font-arial text-white text-left"
                >
                  <span
                    className={`inline-block uppercase whitespace-nowrap not-italic transition-colors cursor-pointer text-left ${
                      isCountryActive ? "text-[#0098AA]" : (isRowHovered && hoveredRow.type === "primary" ? "text-[#0098AA]" : "text-white")
                    }`}
                    onMouseEnter={() => setHoveredRow({ id: region.id, type: "primary" })}
                    onClick={() => handleItemSelection(region, false)}
                  >
                    {region.country_name}
                  </span>

                  <span
                    className={`uppercase transition-colors cursor-pointer text-left ml-[10px] whitespace-nowrap ${
                      isNativeActive ? "text-[#0098AA]" : (isRowHovered && hoveredRow.type === "primary" ? "text-[#0098AA]" : "text-white")
                    }`}
                    onMouseEnter={() => setHoveredRow({ id: region.id, type: "primary" })}
                    onClick={() => handleItemSelection(region, false)}
                  >
                    {region.country_language}
                  </span>

                  {region.country_language_optional ? (
                    <span
                      style={{
                        fontSize: "12px",
                        letterSpacing: "1.5px",
                        fontStyle: "italic",
                      }}
                      className={`inline w-fit uppercase transition-colors cursor-pointer text-left ${
                        isEnglishActive ? "text-[#0098AA]" : (isRowHovered && hoveredRow.type === "optional" ? "text-[#0098AA]" : "text-white")
                      }`}
                      onMouseEnter={() => setHoveredRow({ id: region.id, type: "optional" })}
                      onClick={() => handleItemSelection(region, true)}
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