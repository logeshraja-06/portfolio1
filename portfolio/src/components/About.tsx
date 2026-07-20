"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, ArrowUpRight } from "lucide-react";

export default function About() {
  const handleScrollToExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("experience");
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

  const stats = [
    {
      id: "edu",
      icon: <GraduationCap className="text-accent" size={20} />,
      value: "B.E. CSE",
      label: "Education",
      desc: "AAA College of Eng. & Tech.",
    },
    {
      id: "exp",
      icon: <Briefcase className="text-accent" size={20} />,
      value: "2 Internships",
      label: "Experience",
      desc: "MERN Stack / Cloud",
    },
    {
      id: "certs",
      icon: <Award className="text-accent" size={20} />,
      value: "3 Certifications",
      label: "Credentials",
      desc: "Oracle Cloud, MongoDB",
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-bg-secondary overflow-hidden">
      {/* Glow Meshes */}
      <div className="bg-mesh-orange bottom-1/4 -left-40 opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Star Illustration (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center overflow-visible">
              {/* Outer Pulsing Star Shape background */}
              <div className="absolute inset-0 bg-accent/5 rounded-full filter blur-2xl animate-pulse" />

              {/* Main Star Illustration */}
              <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/about_illustration.png"
                  alt="About Star Illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 300px, 380px"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: About Details (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col space-y-7 items-start text-left"
          >
            <div>
              <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
                Who I Am
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
                About Me
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full mt-3" />
            </div>

            {/* Profile Intro Text */}
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              I am a motivated and detail-oriented Computer Science Engineering student with hands-on experience in MERN stack development. Proficient in Java, JavaScript, React.js, Node.js, Express.js, and MongoDB. I love building real-world software, integrating AI APIs, and analyzing cloud infrastructures.
            </p>

            {/* Career Objective */}
            <div className="p-4.5 rounded-2xl glass-panel border-accent/15 bg-accent/5 relative overflow-hidden">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Career Objective</h4>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                Seeking an entry-level Front-End or Full-Stack Developer role to contribute and grow in the IT industry. Eager to bring strong problem-solving skills, MERN expertise, and cloud architectural understanding to create high-performance, responsive solutions.
              </p>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full pt-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 rounded-2xl glass-panel border-card-border glow-card flex flex-col items-start space-y-2"
                >
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                    {stat.icon}
                  </div>
                  <span className="text-sm font-bold font-display text-text-primary pt-1">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold font-display uppercase tracking-widest text-accent">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-text-secondary leading-snug">
                    {stat.desc}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Learn More / Scroll Button */}
            <button suppressHydrationWarning
              onClick={handleScrollToExperience}
              className="px-6 py-3.5 rounded-full font-bold font-display text-xs uppercase tracking-wider bg-card-bg border border-card-border hover:border-accent text-text-primary hover:shadow-premium transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
            >
              <span>View Experience Timeline</span>
              <ArrowUpRight size={14} className="text-accent" />
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
