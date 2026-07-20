"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Mail, Phone, MapPin } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import GithubIcon from "@/components/GithubIcon";

export default function ResumePreview() {
  const handleDownload = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <section id="resume-preview" className="relative py-24 bg-bg-secondary overflow-hidden">
      {/* Mesh Glow */}
      <div className="bg-mesh-orange top-1/4 -right-10 opacity-20" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-20 text-center">

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
            Curriculum Vitae
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            Resume Preview
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3 mb-4" />
          <p className="text-text-secondary text-sm">
            Review my professional credentials online or download a printer-friendly copy.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-10">
          <button suppressHydrationWarning
            onClick={handleDownload}
            className="px-6 py-3.5 rounded-full font-bold font-display text-xs uppercase tracking-wider bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow text-white transition-all duration-300 flex items-center space-x-2"
          >
            <Download size={14} />
            <span>Download Resume PDF</span>
          </button>
        </div>

        {/* Paper Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full glass-panel border-card-border/80 rounded-3xl p-6 sm:p-12 text-left shadow-premium relative max-w-4xl mx-auto"
        >
          {/* Subtle watermark background lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 rounded-3xl" />

          {/* Paper Content */}
          <div className="relative z-10 flex flex-col space-y-8 font-sans">

            {/* Header: Name & Contact */}
            <div className="border-b border-card-border pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary font-display">
                  LOGESH RAJA S
                </h3>
                <p className="text-accent text-sm font-bold font-display tracking-widest uppercase mt-1">
                  Full-Stack Developer (MERN)
                </p>
              </div>
              <div className="flex flex-col space-y-1.5 text-xs text-text-secondary font-medium md:items-end">
                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-accent" /> Aruppukottai, Tamil Nadu</span>
                <span className="flex items-center gap-1.5"><Phone size={12} className="text-accent" /> +91 96003 20520</span>
                <span className="flex items-center gap-1.5"><Mail size={12} className="text-accent" /> logeshraja006@gmail.com</span>
                <div className="flex items-center gap-3 pt-1">
                  <a href="https://linkedin.com/in/logesh-raja-s-b9b159310" target="_blank" rel="noopener noreferrer" className="hover:text-accent flex items-center gap-1"><LinkedInIcon size={11} /> linkedin</a>
                  <a href="https://github.com/logeshraja-06" target="_blank" rel="noopener noreferrer" className="hover:text-accent flex items-center gap-1"><GithubIcon size={11} /> github</a>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="flex flex-col space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-display">
                Professional Summary
              </h4>
              <p className="text-text-primary/90 text-xs sm:text-sm leading-relaxed">
                Motivated and detail-oriented Computer Science Engineering student with hands-on experience in MERN stack development. Proficient in Java, JavaScript, React.js, Node.js, Express.js, and MongoDB. Developed real-world projects including an AI Fake News Detection System and a Contact Management System. Strong problem-solving, teamwork, and communication skills with a passion for building scalable web applications. Seeking an entry-level Front-End or Full-Stack Developer role to contribute and grow in the IT industry.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-display">
                Technical Skills
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm text-text-primary/95">
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-text-secondary">Languages:</span>
                  <span>JavaScript, Java, Python</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-text-secondary">Frontend:</span>
                  <span>React.js, Next.js, HTML5, CSS3, Bootstrap, Tailwind CSS</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-text-secondary">Backend:</span>
                  <span>Node.js, Express.js, RESTful API Design, JWT Authentication</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-text-secondary">Database & Cloud:</span>
                  <span>MongoDB Atlas, Mongoose, MySQL, SQL Server, Oracle Cloud (OCI)</span>
                </div>
                <div className="flex flex-col space-y-1 sm:col-span-2">
                  <span className="font-semibold text-text-secondary">Tools & Practices:</span>
                  <span>Git, GitHub, Version Control, API Integration, Axios, Postman, Responsive UI/UX, DSA (LeetCode)</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-display">
                Experience
              </h4>
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <div className="flex justify-between items-start font-bold">
                    <span className="text-text-primary">Intern — Team Infosoft</span>
                    <span className="text-accent text-[11px] font-medium font-display">Feb 2025 – Present | Tirunelveli</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 mt-2 space-y-1 text-text-secondary">
                    <li>Engineered full-stack features across the MERN stack — building React.js UI components and Node.js/Express.js REST APIs for live web applications.</li>
                    <li>Collaborated with the development team on version control (Git/GitHub) workflows and code reviews for feature integration.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start font-bold">
                    <span className="text-text-primary">Intern — Postulates Info Tech Private Limited</span>
                    <span className="text-accent text-[11px] font-medium font-display">Jul 2025 | Thoothukudi</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 mt-2 space-y-1 text-text-secondary">
                    <li>Applied cloud computing fundamentals across all 3 service models (IaaS, PaaS, SaaS), covering virtualization and deployment models.</li>
                    <li>Analyzed cloud infrastructure, networking, and security concepts through hands-on exposure to cloud storage systems.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-display">
                Projects
              </h4>
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <div className="flex justify-between items-start font-bold">
                    <span className="text-text-primary">Campus Resource Booking Platform</span>
                    <span className="text-accent text-[11px] font-medium font-display">2025</span>
                  </div>
                  <div className="text-[11px] font-semibold text-text-secondary mt-0.5">
                    Tech Stack: React.js, Node.js, Express.js, MongoDB, JWT Authentication, Bootstrap/CSS
                  </div>
                  <ul className="list-disc list-outside pl-4 mt-2 space-y-1 text-text-secondary">
                    <li>Architected role-based dashboards for 3 user roles (Student, Faculty, Admin) with secure JWT-based authentication.</li>
                    <li>Engineered a resource search and booking system covering 3+ resource types with real-time conflict validation.</li>
                    <li>Automated full CRUD operations for resource management, including booking history and status tracking.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start font-bold">
                    <span className="text-text-primary">Contact Management System</span>
                    <span className="text-accent text-[11px] font-medium font-display">2025</span>
                  </div>
                  <div className="text-[11px] font-semibold text-text-secondary mt-0.5">
                    Tech Stack: React.js, Node.js, Express.js, MongoDB Atlas, Mongoose, REST API, Axios, CSS/Bootstrap
                  </div>
                  <ul className="list-disc list-outside pl-4 mt-2 space-y-1 text-text-secondary">
                    <li>Engineered RESTful APIs handling core contact fields via Axios for seamless client-server communication.</li>
                    <li>Deployed the application on Vercel with MongoDB Atlas and Mongoose for cloud-based data storage and schema modeling.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Grid: Education & Certs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-card-border/40">
              <div className="flex flex-col space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-display">
                  Education
                </h4>
                <div className="text-xs sm:text-sm">
                  <div className="font-bold text-text-primary">AAA College of Engineering and Technology</div>
                  <div className="text-text-secondary">B.E. Computer Science Engineering</div>
                  <div className="text-accent text-[11px] font-medium font-display mt-0.5">Aug 2023 – Present</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-display">
                  Certifications
                </h4>
                <ul className="text-xs sm:text-sm list-disc list-outside pl-4 space-y-1 text-text-secondary">
                  <li>Oracle Cloud Infrastructure 2025 Certified Multicloud Architect Professional (Aug 2025)</li>
                  <li>Data Analytics with Python — NPTEL, 12-Week Course (Apr 2025)</li>
                  <li>MongoDB Certified Developer — Credly (Aug 2025)</li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
