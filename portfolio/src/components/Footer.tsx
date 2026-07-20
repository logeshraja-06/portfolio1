"use client";

import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import GithubIcon from "@/components/GithubIcon";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative bg-bg-secondary border-t border-card-border/60 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 z-20 relative">
        
        {/* Left Side Info */}
        <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
          <a
            href="#home"
            className="text-xl font-bold font-display text-text-primary tracking-wide"
          >
            Portfolio<span className="text-accent">.</span>
          </a>
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Logesh Raja S. All rights reserved.
          </p>
          <p className="text-[10px] text-text-secondary/60">
            Crafted with React, Tailwind CSS, & Framer Motion
          </p>
        </div>

        {/* Center Navigation links */}
        <div className="flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-text-secondary font-display">
          <a href="#about" onClick={(e) => handleLinkClick(e, "#about")} className="hover:text-accent transition-colors">About</a>
          <a href="#projects" onClick={(e) => handleLinkClick(e, "#projects")} className="hover:text-accent transition-colors">Projects</a>
          <a href="#skills" onClick={(e) => handleLinkClick(e, "#skills")} className="hover:text-accent transition-colors">Skills</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")} className="hover:text-accent transition-colors">Contact</a>
        </div>

        {/* Right Side Socials & Scroll to Top */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/logeshraja-06"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 text-text-secondary hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://linkedin.com/in/logesh-raja-s-b9b159310"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 text-text-secondary hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href="mailto:logeshraja006@gmail.com"
              className="p-2 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 text-text-secondary hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          <button suppressHydrationWarning
            onClick={handleScrollToTop}
            className="p-2.5 rounded-xl bg-accent text-white hover:bg-accent-secondary hover:shadow-glow transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} className="transform group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
