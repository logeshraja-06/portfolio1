"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import ParticlesBackground from "@/components/ParticlesBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Services from "@/components/Services";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import ResumePreview from "@/components/ResumePreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { ArrowUp } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize Dark Mode Class on Document
  useEffect(() => {
    const isDark = localStorage.getItem("theme") !== "light";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Scroll Progress and Scroll-to-Top Button Tracking
  useEffect(() => {
    const handleScroll = () => {
      // Progress calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Show/Hide back to top
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Entry animation loader */}
      <Loader />

      {/* Interactive custom cursor for desktop */}
      <CustomCursor />

      {/* Interactive background particles canvas */}
      <ParticlesBackground />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent to-accent-secondary z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar with theme controller */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Page Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <ExperienceTimeline />
        <Services />
        <Certifications />
        <Testimonials />
        <ResumePreview />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll to Top button */}
      <button suppressHydrationWarning
        onClick={handleScrollToTop}
        className={`fixed bottom-6 right-6 p-3.5 rounded-2xl glass-panel border-card-border hover:border-accent text-accent shadow-premium z-30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
