"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface TimelineItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  details: string[];
}

const experienceData: TimelineItem[] = [
  {
    title: "Full-Stack Developer Intern",
    company: "Team Infosoft",
    location: "Tirunelveli, Tamil Nadu",
    duration: "Feb 2025 – Present",
    details: [
      "Engineered full-stack features across the MERN stack, designing responsive UI components in React.js and writing secure REST APIs in Node.js/Express.js.",
      "Collaborated with the development team on version control (Git/GitHub) workflows, performing testing and code reviews for feature integrations."
    ],
  },
  {
    title: "Cloud Infrastructure Intern",
    company: "Postulates Info Tech Private Limited",
    location: "Thoothukudi, Tamil Nadu",
    duration: "Jul 2025",
    details: [
      "Applied cloud computing fundamentals across all 3 service models (IaaS, PaaS, SaaS), exploring virtualization and server deployment structures.",
      "Analyzed cloud infrastructure, networking protocols, and cloud security configurations through hands-on practice with cloud storage systems."
    ],
  },
];

const educationData: TimelineItem[] = [
  {
    title: "B.E. Computer Science Engineering",
    company: "AAA College of Engineering and Technology",
    location: "Aruppukottai, Tamil Nadu",
    duration: "Aug 2023 – Present",
    details: [
      "Core coursework in Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, and Cloud Architectures.",
      "Active participant in technical symposiums and developer clubs, maintaining a strong focus on full-stack development and AI applications."
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 bg-bg-primary overflow-hidden">
      {/* Decorative Glow */}
      <div className="bg-mesh-orange top-1/2 left-1/4 opacity-25" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
            My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            Experience & Education
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Work Experience (6 cols) */}
          <div className="lg:col-span-7 text-left">
            <div className="flex items-center space-x-3 mb-10">
              <div className="p-3 bg-accent/10 border border-accent/25 rounded-2xl text-accent">
                <Briefcase size={22} />
              </div>
              <h3 className="text-2xl font-bold font-display text-text-primary">
                Work Experience
              </h3>
            </div>

            <div className="relative border-l-2 border-card-border/80 pl-6 sm:pl-8 space-y-12">
              {experienceData.map((item, index) => (
                <motion.div
                  key={item.company + index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent group-hover:bg-accent transition-colors duration-300 shadow-glow" />

                  {/* Experience Card */}
                  <div className="p-6 rounded-2xl glass-panel border-card-border hover:border-accent/25 glow-card transition-all duration-300">
                    <span className="text-[10px] font-bold tracking-widest font-display text-accent uppercase mb-2 flex items-center gap-1.5">
                      <Calendar size={12} /> {item.duration}
                    </span>
                    <h4 className="text-lg font-bold font-display text-text-primary group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-text-secondary font-medium">
                      <span className="font-semibold text-text-primary/95">{item.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} /> {item.location}</span>
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="text-text-secondary text-xs sm:text-sm leading-relaxed flex items-start space-x-2.5">
                          <CheckCircle2 size={13} className="text-accent mt-1 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Education (5 cols) */}
          <div className="lg:col-span-5 text-left">
            <div className="flex items-center space-x-3 mb-10">
              <div className="p-3 bg-accent/10 border border-accent/25 rounded-2xl text-accent">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-2xl font-bold font-display text-text-primary">
                Education
              </h3>
            </div>

            <div className="relative border-l-2 border-card-border/80 pl-6 sm:pl-8 space-y-12">
              {educationData.map((item, index) => (
                <motion.div
                  key={item.company + index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent group-hover:bg-accent transition-colors duration-300 shadow-glow" />

                  {/* Education Card */}
                  <div className="p-6 rounded-2xl glass-panel border-card-border hover:border-accent/25 glow-card transition-all duration-300">
                    <span className="text-[10px] font-bold tracking-widest font-display text-accent uppercase mb-2 flex items-center gap-1.5">
                      <Calendar size={12} /> {item.duration}
                    </span>
                    <h4 className="text-lg font-bold font-display text-text-primary group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-text-secondary font-medium">
                      <span className="font-semibold text-text-primary/95">{item.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} /> {item.location}</span>
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="text-text-secondary text-xs sm:text-sm leading-relaxed flex items-start space-x-2.5">
                          <CheckCircle2 size={13} className="text-accent mt-1 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Languages Subcard (under education since it's personal skill/academic details) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 p-6 rounded-2xl glass-panel border-card-border/70 text-left"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Languages Spoken</h4>
              <div className="flex gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-card-bg border border-card-border text-xs font-semibold text-text-primary">
                  Tamil (Native)
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-card-bg border border-card-border text-xs font-semibold text-text-primary">
                  English (Professional)
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
