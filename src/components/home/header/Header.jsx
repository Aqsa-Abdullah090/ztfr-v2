"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  const flagProp = selectedRegion?.country_flag;

  // ایموجی فلیگ چیکر سیکیورٹی گارڈ
  const isEmoji =
    flagProp &&
    typeof flagProp === "string" &&
    !flagProp.includes("/") &&
    !flagProp.startsWith("http") &&
    flagProp.length <= 4;

  return (
    <header className="relative w-full z-10 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center space-x-2">
        <img src="/assets/ZTFR-b.svg" alt="logo" className="h-[40px] w-auto" />
      </div>

      <div className="flex items-center space-x-6">
        <motion.div
          onClick={handleFlagClick}
          className="flex items-center cursor-pointer justify-center"
          animate={shouldBeUp ? { y: -70 } : { y: 0 }}
          transition={{
            duration: 1,
            delay: shouldBeUp ? 0 : 0.6,
          }}
          onAnimationComplete={() => {
            if (startFlyUp && !isSidebarOpen) {
              onFlagClick();
            }
          }}
        >
          {flagProp ? (
            !isEmoji ? (
              <img
                src={flagProp}
                alt={selectedRegion?.country_name || "flag"}
                className="h-[30px] w-[30px] object-cover rounded-lg"
                onError={(e) => {
                  console.warn("Flag image failed loading, hiding rendering fallback node.");
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="h-[30px] w-auto flex items-center justify-center text-3xl leading-[30px] select-none">
                {flagProp}
              </div>
            )
          ) : (
            <div className="h-[40px] w-[40px] flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-white animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
}