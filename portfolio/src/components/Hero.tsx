"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Send, Award, Cpu, Code2 } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import GithubIcon from "@/components/GithubIcon";

export default function Hero() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("contact");
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

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Logesh_Raja_S_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Decorative Glow Meshes */}
      <div className="bg-mesh-orange top-1/4 -left-32 opacity-70" />
      <div className="bg-mesh-yellow bottom-1/4 -right-20 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-20">
        {/* Left Side Content (6 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left order-2 lg:order-1">
          {/* Social Icons Bar (Instagram-like styling with modern neon hover) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3.5 mb-2"
          >
            <a
              href="https://github.com/logeshraja-06"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-card-bg border border-card-border hover:border-accent/40 text-text-secondary hover:text-accent shadow-premium hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/logesh-raja-s-b9b159310"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-card-bg border border-card-border hover:border-accent/40 text-text-secondary hover:text-accent shadow-premium hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
            <a
              href="mailto:logeshraja006@gmail.com"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-card-bg border border-card-border hover:border-accent/40 text-text-secondary hover:text-accent shadow-premium hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </motion.div>

          {/* Hello Greeting */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest bg-accent/10 border border-accent/20 text-accent">
              Welcome to my space
            </span>
          </motion.div>

          {/* Main Name Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.1] tracking-tight text-text-primary"
          >
            Hi, I'm <span className="text-gradient">Logesh Raja S</span>
          </motion.h1>

          {/* Role Sub-heading */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl font-bold font-display text-text-secondary tracking-wide"
          >
            Full Stack Developer <span className="text-accent">|</span> AI Developer <span className="text-accent">|</span> UI/UX Designer
          </motion.h2>

          {/* Professional Introduction Summary */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl text-text-secondary text-sm sm:text-base leading-relaxed"
          >
            Motivated and detail-oriented Computer Science Engineering student with hands-on experience in MERN stack development. Proficient in Java, JavaScript, React.js, Node.js, Express.js, and MongoDB, seeking to build high-performance scalable web applications and AI-integrated experiences.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 w-full sm:w-auto pt-2"
          >
            <button suppressHydrationWarning
              onClick={handleDownloadResume}
              className="px-8 py-3.5 rounded-full font-bold font-display text-xs uppercase tracking-wider bg-gradient-to-r from-accent to-accent-secondary text-white shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Award size={14} />
              <span>Download CV</span>
            </button>
            <button suppressHydrationWarning
              onClick={handleScrollToContact}
              className="px-8 py-3.5 rounded-full font-bold font-display text-xs uppercase tracking-wider border border-card-border hover:border-accent hover:bg-accent/5 text-text-primary hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Send size={14} />
              <span>Contact Me</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side Avatar (5 cols on lg) */}
        <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
          {/* Main Avatar Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-3xl overflow-visible glass-panel p-2 flex items-center justify-center border-accent/20 glow-card"
          >
            {/* Background glowing sphere/circle */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/5 blur-xl -z-10" />

            {/* Main Profile Image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-bg-secondary flex items-center justify-center">
              <Image
                src="/hero_avatar.png"
                alt="Logesh Raja S Avatar"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 280px, 350px"
              />
            </div>

            {/* Floating Badge 1 - MERN */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-5 -left-5 px-4 py-2 rounded-2xl glass-panel flex items-center space-x-2 border-accent/20 shadow-premium"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-text-primary flex items-center gap-1">
                <Code2 size={10} className="text-accent" /> MERN Stack
              </span>
            </motion.div>

            {/* Floating Badge 2 - AI Integration */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-12 -right-6 px-4 py-2 rounded-2xl glass-panel flex items-center space-x-2 border-cyan-500/20 shadow-premium"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-text-primary flex items-center gap-1">
                <Cpu size={10} className="text-cyan-500" /> AI Developer
              </span>
            </motion.div>

            {/* Floating Badge 3 - Speech Greeting */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.2 }}
              className="absolute -top-4 -right-4 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white text-[10px] font-extrabold tracking-widest shadow-premium uppercase"
            >
              Hi there! 👋
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
