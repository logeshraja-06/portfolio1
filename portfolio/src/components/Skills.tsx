"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Server, Database, Cloud, Wrench, Cpu } from "lucide-react";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "ai";
  percentage: number;
  color: string; // Tailwind class for text/bg colors
}

const skillsData: SkillItem[] = [
  // Frontend
  { name: "React.js", category: "frontend", percentage: 90, color: "from-blue-400 to-cyan-500" },
  { name: "Next.js", category: "frontend", percentage: 85, color: "from-slate-200 to-zinc-400" },
  { name: "JavaScript", category: "frontend", percentage: 90, color: "from-yellow-400 to-amber-500" },
  { name: "Tailwind CSS", category: "frontend", percentage: 92, color: "from-cyan-400 to-teal-500" },
  { name: "HTML5/CSS3", category: "frontend", percentage: 95, color: "from-orange-400 to-red-500" },
  { name: "Bootstrap", category: "frontend", percentage: 80, color: "from-violet-400 to-purple-500" },

  // Backend
  { name: "Node.js", category: "backend", percentage: 85, color: "from-green-400 to-emerald-500" },
  { name: "Express.js", category: "backend", percentage: 85, color: "from-gray-400 to-zinc-600" },
  { name: "RESTful API Design", category: "backend", percentage: 90, color: "from-sky-400 to-blue-500" },
  { name: "JWT Auth", category: "backend", percentage: 88, color: "from-pink-400 to-rose-500" },

  // Database & Cloud
  { name: "MongoDB & Mongoose", category: "database", percentage: 88, color: "from-green-500 to-emerald-600" },
  { name: "MySQL / SQL Server", category: "database", percentage: 80, color: "from-blue-500 to-indigo-600" },
  { name: "Oracle Cloud (OCI)", category: "database", percentage: 78, color: "from-orange-500 to-red-600" },

  // AI
  { name: "Python", category: "ai", percentage: 82, color: "from-yellow-500 to-blue-500" },
  { name: "Data Analytics", category: "ai", percentage: 80, color: "from-emerald-400 to-teal-500" },

  // Tools & Practices
  { name: "Git & GitHub", category: "tools", percentage: 90, color: "from-red-400 to-orange-500" },
  { name: "Axios & Postman", category: "tools", percentage: 88, color: "from-orange-400 to-amber-500" },
  { name: "Responsive UI/UX", category: "tools", percentage: 92, color: "from-fuchsia-400 to-pink-500" },
  { name: "DSA (LeetCode)", category: "tools", percentage: 75, color: "from-purple-400 to-indigo-500" },
];

const categories = [
  { id: "all", name: "All Skills", icon: null },
  { id: "frontend", name: "Frontend", icon: <Code size={14} /> },
  { id: "backend", name: "Backend", icon: <Server size={14} /> },
  { id: "database", name: "DB & Cloud", icon: <Database size={14} /> },
  { id: "ai", name: "AI & Python", icon: <Cpu size={14} /> },
  { id: "tools", name: "Tools", icon: <Wrench size={14} /> },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="relative py-24 bg-bg-primary overflow-hidden">
      {/* Mesh background glow */}
      <div className="bg-mesh-orange top-1/3 right-0 opacity-30" />
      <div className="bg-mesh-yellow bottom-1/3 left-0 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            My Skills
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3 mb-4" />
          <p className="text-text-secondary text-sm">
            Technologies and tools I work with to create amazing web experiences, cloud deployments, and AI integrations.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button suppressHydrationWarning
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold font-display tracking-wider uppercase transition-all duration-300 flex items-center space-x-2 border ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-accent to-accent-secondary border-transparent text-white shadow-glow"
                  : "bg-card-bg border-card-border hover:border-accent/40 text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="p-6 rounded-2xl glass-panel border-card-border hover:border-accent/30 hover:shadow-premium glow-card group transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm sm:text-base font-display text-text-primary group-hover:text-accent transition-colors duration-300">
                  {skill.name}
                </span>
                <span className="text-xs font-bold text-accent font-display">
                  {skill.percentage}%
                </span>
              </div>
              
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden border border-card-border/50">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-wider text-text-secondary/60 mt-3.5 block">
                Proficiency
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
