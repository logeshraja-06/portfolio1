"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled down for border/blur effect
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Intersection Observer for scroll spy
      const sections = navLinks.map((link) => link.href.substring(1));
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the middle of the viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offset = 80; // height of navbar
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
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-panel py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="text-2xl font-bold font-display text-text-primary tracking-wide hover:opacity-80 transition-opacity"
        >
          Portfolio<span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <div className="flex items-center space-x-6 lg:space-x-8 mr-4 lg:mr-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative font-medium text-sm transition-colors py-2 tracking-wide font-display ${
                    isActive
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Theme Toggle & CTA Buttons */}
          <div className="flex items-center space-x-4 border-l border-card-border pl-6">
            <button suppressHydrationWarning
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full hover:bg-accent/10 text-text-secondary hover:text-accent transition-all duration-300"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white hover:shadow-glow transform hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex items-center space-x-3 md:hidden">
          <button suppressHydrationWarning
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button suppressHydrationWarning
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-text-secondary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Glassmorphism Overlay) */}
      <div
        className={`fixed inset-x-0 top-[60px] p-6 glass-panel border-t border-card-border transition-all duration-300 ease-in-out md:hidden z-30 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-base font-semibold font-display tracking-wide py-2 border-b border-card-border/40 transition-colors ${
                  isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="w-full py-3 text-center text-sm font-bold rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white shadow-md hover:shadow-glow transition-all duration-300 uppercase tracking-wider mt-2"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
