"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Cloud, Database, Cpu } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  url: string;
}

const certsData: Certification[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Multicloud Architect Professional",
    issuer: "Oracle",
    date: "Aug 2025",
    icon: <Cloud className="text-orange-500" size={22} />,
    url: "https://oracle.com",
  },
  {
    title: "Data Analytics with Python (12-Week Course)",
    issuer: "NPTEL",
    date: "Jan 2025 – Apr 2025",
    icon: <Cpu className="text-yellow-500" size={22} />,
    url: "https://nptel.ac.in",
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "Credly",
    date: "Aug 2025",
    icon: <Database className="text-emerald-500" size={22} />,
    url: "https://credly.com",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 bg-bg-primary overflow-hidden">
      {/* Mesh glow */}
      <div className="bg-mesh-orange top-1/4 left-10 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            Certifications
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certssGrid(certsData)}
        </div>

      </div>
    </section>
  );
}

function certssGrid(certs: Certification[]) {
  return certs.map((cert, index) => (
    <motion.div
      key={cert.title}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-2xl glass-panel border-card-border hover:border-accent/20 glow-card transition-all duration-300 flex flex-col justify-between text-left group"
    >
      <div>
        {/* Top bar with icon and date badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-accent/5 border border-accent/15 rounded-xl group-hover:bg-accent/10 transition-colors duration-300">
            {cert.icon}
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold font-display uppercase tracking-wider bg-bg-secondary text-text-secondary border border-card-border">
            {cert.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold font-display text-text-primary group-hover:text-accent transition-colors duration-300 leading-snug mb-2">
          {cert.title}
        </h3>

        {/* Issuer */}
        <span className="text-xs font-semibold text-text-secondary">
          Issued by: {cert.issuer}
        </span>
      </div>

      {/* Button link */}
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-[10px] font-bold tracking-widest font-display uppercase text-text-secondary hover:text-accent flex items-center gap-1.5 transition-colors duration-200"
      >
        <Award size={12} />
        <span>View Credential</span>
      </a>
    </motion.div>
  ));
}
