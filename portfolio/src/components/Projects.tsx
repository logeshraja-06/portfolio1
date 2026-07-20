"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

interface Project {
  title: string;
  desc: string;
  image: string;
  tags: string[];
  codeUrl: string;
  demoUrl: string;
  year: string;
}

const projectsData: Project[] = [
  {
    title: "Campus Resource Booking Platform",
    desc: "Full-stack web application for managing and booking campus resources (labs, seminar halls, classrooms) with role-based access for students, faculty, and administrators.",
    image: "/project_booking.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Bootstrap"],
    codeUrl: "https://github.com/logeshraja-06",
    demoUrl: "#contact", // Redirects to contact
    year: "2025",
  },
  {
    title: "Contact Management System",
    desc: "Full-stack contact management system enabling users to securely manage personal and professional contacts with complete CRUD functionality and live search.",
    image: "/project_contacts.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "Mongoose", "Axios"],
    codeUrl: "https://github.com/logeshraja-06",
    demoUrl: "https://contact-management-system-eight-smoky.vercel.app",
    year: "2025",
  },
  {
    title: "AI Fake News Detection System",
    desc: "AI-driven web application to verify news article trust metrics. Architected NLP sentiment parsing pipelines, integrated trained ML classifiers, and visualized credibility score indicators.",
    image: "/project_fakenews.png",
    tags: ["React.js", "Python", "Flask", "NLP", "Scikit-Learn", "Tailwind CSS"],
    codeUrl: "https://github.com/logeshraja-06",
    demoUrl: "#contact", // Redirects to contact
    year: "2025",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-bg-secondary overflow-hidden">
      {/* Mesh Glow */}
      <div className="bg-mesh-orange top-1/4 -right-20 opacity-30" />
      <div className="bg-mesh-yellow bottom-1/4 -left-20 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
            My Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            My Projects
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3 mb-4" />
          <p className="text-text-secondary text-sm">
            A showcase of my recent full-stack applications, developer tools, and AI-integrated systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-3xl overflow-hidden glass-panel border-card-border hover:border-accent/30 hover:shadow-premium glow-card transition-all duration-500 flex flex-col h-full"
            >
              {/* Project Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-bg-secondary border-b border-card-border/40">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold font-display uppercase tracking-wider rounded-full bg-accent/95 text-white shadow-md">
                  {project.year}
                </div>
              </div>

              {/* Project Info (Flex grow to align buttons at bottom) */}
              <div className="p-6 flex flex-col flex-grow text-left">
                {/* Tags List */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-bold font-display uppercase tracking-wide rounded-md bg-accent/5 border border-accent/10 text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-display text-text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                  {project.desc}
                </p>

                {/* Card Action Buttons (Directly matching the style in reference) */}
                <div className="grid grid-cols-2 gap-4 mt-auto pt-2 border-t border-card-border/20">
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl font-bold font-display text-[10px] sm:text-xs uppercase tracking-wider border border-card-border hover:border-accent hover:bg-accent/5 text-text-primary transition-all duration-300 flex items-center justify-center space-x-1.5"
                  >
                    <GithubIcon size={12} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demoUrl}
                    target={project.demoUrl.startsWith("#") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl font-bold font-display text-[10px] sm:text-xs uppercase tracking-wider bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow text-white transition-all duration-300 flex items-center justify-center space-x-1.5"
                  >
                    <ExternalLink size={12} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
