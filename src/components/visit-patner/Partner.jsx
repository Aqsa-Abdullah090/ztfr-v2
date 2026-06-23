"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

export default function Partner() {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Redux se video data aur current playing index nikalna (Same as PreAdvertContent)
  const bgData = useSelector((state) => state?.bg?.data || []);
  const dynamicVideos = bgData.filter((item) => item?.type === "video");
  const { indexForVideo } = useSelector((state) => state.meta);

  // Current active video object
  const activeVideo = dynamicVideos?.[indexForVideo] || null;

  // Desktop Hover Handlers
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // LOGO 1 
  const logo1Src =
    activeVideo?.premiumLogo1Version === "blackandwhite"
      ? activeVideo?.premiumLogo1White
      : activeVideo?.premiumLogo1Black || activeVideo?.advertiser_logo;

  // LOGO 2 
  const logo2Text = activeVideo?.premiumLogoText;
  const logo2Src = activeVideo?.premiumLogo1Black || activeVideo?.advertiser_logo; 

  // click functionality
  const partnerUrl =
  activeVideo?.premium_destination_url ||
  activeVideo?.advertiser_link;

const handlePartnerClick = () => {
  if (partnerUrl) {
    window.open(partnerUrl, "_blank", "noopener,noreferrer");
  }
};

  return (
    <div
      className="flex items-center cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePartnerClick}
    >
      {/* Initial View */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="initial-view"
            className="absolute right-0 flex flex-col items-center justify-center gap-[12px] lg:gap-[20px] px-[10px] pointer-events-none md:pointer-events-auto"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dynamic Logo 1 (Initial View) */}
            {logo1Src && (
              <motion.img
                src={logo1Src}
                alt="Partner Crest"
                className="h-auto w-[25px] lg:w-[30px] object-contain"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              />
            )}

            <motion.p
              className="text-white text-[10px] lg:text-[12px] tracking-[0.2em] [writing-mode:vertical-lr]"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            >
              VISIT PARTNER
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="hover-panel"
            className="absolute right-0 h-[300px] w-[300px] lg:w-[480px] max-w-full backdrop-blur-[30px] bg-white/5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="p-[24px] flex flex-col w-full items-center justify-between h-full relative">
              
              {/* Dynamic Logo 1 (Top Left in Panel) */}
              {logo1Src && (
                <img
                  src={logo1Src}
                  alt="Partner Crest"
                  className="h-[40px] lg:h-[80px] w-auto max-w-[120px] lg:max-w-[170px] self-start object-contain"
                />
              )}

              <h1 className="text-[12px] lg:text-[16px] tracking-[4px] text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                VISIT PARTNER
              </h1>

              {/* Dynamic Logo 2 handling: Text dynamic check or SVG Image */}
              {logo2Text ? (
                <span className="text-white text-[10px] lg:text-[12px] text-center font-bold tracking-[2px] uppercase">
                  {logo2Text}
                </span>
              ) : (
                logo2Src && (
                  <img
                    src={logo2Src}
                    alt="logo"
                    className="w-[120px] lg:w-[160px] h-auto object-contain"
                  />
                )
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}