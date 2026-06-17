"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Partner() {
  const [isOpen, setIsOpen] = useState(false);

  // Desktop Hover Handlers
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="flex items-center cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Initial View */}
      <AnimatePresence mode="wait">
          <motion.div
            key="initial-view"
            className="absolute right-0 flex flex-col items-center justify-center gap-[20px] px-[10px] pointer-events-none md:pointer-events-auto"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="/assets/image/Porsche Crest.svg"
              alt="Porsche Crest"
              className="h-auto w-[30px] object-contain"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            <motion.p
              className="text-white text-[12px] tracking-[0.2em] [writing-mode:vertical-lr]"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
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
            className="absolute right-0 h-[300px] w-[300px] lg:w-[480px] max-w-full backdrop-blur-[30px] bg-white/5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="p-[24px] flex flex-col w-full items-center justify-between h-full relative">
              <img
                src="/assets/image/Porsche Crest.svg"
                alt="Porsche Crest"
                className="h-[40px] lg:h-[80px] w-auto max-w-[120px] lg:max-w-[170px] self-start"
              />

              <h1 className="text-[12px] lg:text-[16px] tracking-[4px] text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                VISIT PARTNER
              </h1>

              <img
                src="/assets/image/Porsche W.svg"
                alt="logo"
                className="w-[120px] lg:w-[160px] h-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}