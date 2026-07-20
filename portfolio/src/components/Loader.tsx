"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500); // Wait for transition out
          return 100;
        }
        // Accelerate near the end
        const diff = prev > 80 ? Math.random() * 8 + 3 : Math.random() * 12 + 6;
        return Math.min(Math.round(prev + diff), 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-[#070a13] z-50 flex flex-col items-center justify-center pointer-events-none select-none text-left"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px]" />

          <div className="relative flex flex-col items-center max-w-xs w-full px-8">
            {/* Header Text */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold font-display text-white tracking-widest uppercase text-center mb-6"
            >
              Logesh Raja<span className="text-accent">.</span>
            </motion.h1>

            {/* Glowing progress line */}
            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full shadow-glow"
              />
            </div>

            {/* Percentage counter */}
            <div className="flex justify-between items-center w-full">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/60">
                Initialising
              </span>
              <span className="text-sm font-bold font-display text-accent">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
