"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    quote: "Logesh's ability to architect clean full-stack features is outstanding. During his internship, he engineered complex React UI modules and Express APIs that greatly optimized our main live admin panels.",
    name: "S. Raghavan",
    role: "Senior Full-Stack Engineer",
    company: "Team Infosoft",
    rating: 5,
  },
  {
    quote: "A highly analytical and dedicated developer. Logesh did a fantastic job researching cloud deployment structures and security controls. He is exceptionally proactive at troubleshooting infrastructure issues.",
    name: "K. Preethi",
    role: "Project Manager & Cloud Architect",
    company: "Postulates Info Tech",
    rating: 5,
  },
  {
    quote: "Logesh demonstrated impressive software engineering skills by building an AI-driven Fake News Verification tool. He successfully merged complex Python NLP libraries with React frontend components.",
    name: "Dr. A. Baskar",
    role: "Professor & Academic Supervisor",
    company: "AAA College of Engineering",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 bg-bg-secondary overflow-hidden">
      {/* Glow mesh */}
      <div className="bg-mesh-orange bottom-1/4 left-1/3 opacity-20" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-20 text-center">
        
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
            Recommendations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            Testimonials
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3" />
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[300px] sm:min-h-[260px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-8 sm:p-10 rounded-3xl glass-panel border-card-border glow-card relative w-full"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-10 p-3 rounded-2xl bg-gradient-to-r from-accent to-accent-secondary text-white shadow-glow">
                <Quote size={20} />
              </div>

              {/* Rating stars */}
              <div className="flex justify-center space-x-1 mb-6 mt-2">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-accent-secondary fill-accent-secondary" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-text-primary text-sm sm:text-base md:text-lg italic font-medium leading-relaxed mb-6 px-4">
                "{current.quote}"
              </p>

              {/* Author details */}
              <div className="flex flex-col items-center">
                <span className="text-sm sm:text-base font-extrabold font-display text-accent tracking-wide">
                  {current.name}
                </span>
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mt-1">
                  {current.role} &middot; <span className="text-text-primary/70">{current.company}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button suppressHydrationWarning
            onClick={handlePrev}
            className="p-3.5 rounded-2xl glass-panel border-card-border hover:border-accent/40 text-text-secondary hover:text-accent shadow-premium hover:scale-105 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Slide Indicator Dots */}
          <div className="flex space-x-2">
            {testimonialsData.map((_, i) => (
              <button suppressHydrationWarning
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-6 bg-accent" : "bg-card-border/80 hover:bg-accent/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button suppressHydrationWarning
            onClick={handleNext}
            className="p-3.5 rounded-2xl glass-panel border-card-border hover:border-accent/40 text-text-secondary hover:text-accent shadow-premium hover:scale-105 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
