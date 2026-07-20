"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Smartphone, ArrowRight } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
}

const servicesData: Service[] = [
  {
    icon: <Code size={24} />,
    title: "Full Stack Development",
    desc: "End-to-end engineering of responsive, fast-loading MERN web applications with role-based Dashboards and secure architectures.",
    features: ["React.js & Next.js client-side coding", "Node.js & Express.js server REST APIs", "MongoDB schema design & optimization", "Secure JWT token auth protocols"],
  },
  {
    icon: <Cpu size={24} />,
    title: "AI API Integration",
    desc: "Integrating intelligent machine learning pipelines, natural language parsing, and predictive models into standard web platforms.",
    features: ["Python-based data parsing workflows", "Flask & FastAPI microservice hosting", "NLP sentiment indicators & confidence scoring", "API-driven automation scripts"],
  },
  {
    icon: <Smartphone size={24} />,
    title: "Premium UI/UX Design",
    desc: "Designing luxury, responsive dark themes with rich hover transitions, custom magnetic cursor indicators, and smooth canvas effects.",
    features: ["Mobile-first fluid responsive layouts", "Glassmorphism styling and custom filters", "Framer Motion style micro-interactions", "Accessible semantic HTML structuring"],
  },
];

export default function Services() {
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

  return (
    <section id="services" className="relative py-24 bg-bg-secondary overflow-hidden">
      {/* Mesh background glow */}
      <div className="bg-mesh-orange bottom-1/3 -right-20 opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
            Specializations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            Services I Offer
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3" />
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-3xl glass-panel border-card-border hover:border-accent/25 glow-card transition-all duration-300 flex flex-col items-start text-left group h-full"
            >
              {/* Icon Container */}
              <div className="p-3.5 bg-accent/10 border border-accent/20 rounded-2xl text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-display text-text-primary group-hover:text-accent transition-colors duration-300 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Key Features List */}
              <ul className="space-y-2.5 mb-8 w-full">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-text-secondary flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Trigger */}
              <button suppressHydrationWarning
                onClick={handleScrollToContact}
                className="mt-auto text-xs font-bold font-display text-accent uppercase tracking-widest flex items-center gap-1.5 group/btn hover:opacity-80 transition-opacity"
              >
                <span>Get Started</span>
                <ArrowRight size={12} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
