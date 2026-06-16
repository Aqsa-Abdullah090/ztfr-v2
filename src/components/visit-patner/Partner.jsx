"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Partner() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center h-[300px] w-[480px] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Initial View */}
      <AnimatePresence>
        {/* {!isHovered && ( */}
          <motion.div
            className="absolute right-0 flex flex-col items-center justify-center gap-[20px] px-[10px] "
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
              className="text-white text-[15px] font-arial tracking-[0.2em] [writing-mode:vertical-lr]"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 1,
              }}
            >
              VISIT PARTNER
            </motion.p>
          </motion.div>
         {/* )} */}
      </AnimatePresence>

      {/* Hover Panel */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute right-0 transition-opacity duration-400 ease-in-out   h-[300px] w-[480px] backdrop-blur-[30px] bg-white/5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.6,
              delay: 0.3
            }}
          >
            <div className="p-[24px] flex flex-col w-full items-center justify-between h-full">
              <img
                src="/assets/image/Porsche Crest.svg"
                alt="Porsche Crest"
                className="h-[80px] w-auto max-w-[170px] self-start"
              />

              <h1 className="text-[14px] tracking-[4px] text-white">
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