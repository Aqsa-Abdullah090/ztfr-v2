"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Partner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the device is a touch/mobile screen
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkDevice(); // Initial check
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Desktop Hover Handlers
  const handleMouseEnter = () => {
    if (!isMobile) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsOpen(false);
  };

  // Mobile Click/Tap Handler
  const handleClick = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className="relative flex items-center h-[300px] w-[480px] max-w-full overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Initial View */}
      <AnimatePresence mode="wait">
        <motion.div
          key="initial-view"
          className="absolute right-52 lg:right-0 flex flex-col items-center justify-center gap-[20px] px-[10px]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <motion.img
            src="/assets/image/Porsche Crest.svg"
            alt="Porsche Crest"
            className="h-auto w-[30px] object-contain"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />

          {/* Vertical Text */}
          <motion.p
            className="text-white text-[12px] tracking-[0.2em] [writing-mode:vertical-lr]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.3, // Reduced for snappier feedback
            }}
          >
            VISIT PARTNER
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Hover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="hover-panel"
            className="absolute right-0 h-[300px] w-[480px] max-w-full backdrop-blur-[30px] bg-white/5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <div className="p-[24px] flex flex-col w-full items-center justify-between h-full relative">
              <img
                src="/assets/image/Porsche Crest.svg"
                alt="Porsche Crest"
                className="h-[80px] w-auto max-w-[170px] self-start"
              />

              <h1 className="text-[16px] tracking-[4px] text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                VISIT PARTNER
              </h1>

              <img
                src="/assets/image/Porsche W.svg"
                alt=""
                className="w-[160px]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}