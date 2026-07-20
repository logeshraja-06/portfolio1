"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerToast = (type: "success" | "error", message: string) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    setShowToast(false);

    // Basic Validation
    const name = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    if (!name || name.length < 2) {
      const errMsg = "Please enter your name.";
      setErrorMessage(errMsg);
      setSubmitStatus("error");
      triggerToast("error", errMsg);
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      const errMsg = "Please enter a valid email address.";
      setErrorMessage(errMsg);
      setSubmitStatus("error");
      triggerToast("error", errMsg);
      setIsSubmitting(false);
      return;
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      const errMsg = "Subject must be at least 3 characters.";
      setErrorMessage(errMsg);
      setSubmitStatus("error");
      triggerToast("error", errMsg);
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      const errMsg = "Message must be at least 10 characters.";
      setErrorMessage(errMsg);
      setSubmitStatus("error");
      triggerToast("error", errMsg);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      console.log("Payload:", {
        name,
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        }),
      });

      // Handle non-JSON HTML error responses safely (e.g. 404, 500)
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error(`Server returned a non-JSON response (Status: ${response.status})`);
      }

      if (response.ok && data.success) {
        setSubmitStatus("success");
        triggerToast("success", "Message sent successfully.");
        
        // Shoot premium confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f97316", "#facc15", "#ffffff"],
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        const errMsg = data.error || "Failed to send message. Please try again.";
        setErrorMessage(errMsg);
        setSubmitStatus("error");
        triggerToast("error", errMsg);
      }
    } catch (err) {
      console.error("Submission error:", err);
      const errMsg = "Network error. Please check your connection and try again.";
      setErrorMessage(errMsg);
      setSubmitStatus("error");
      triggerToast("error", errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="text-accent" size={18} />,
      label: "Email",
      value: "logeshraja006@gmail.com",
      href: "mailto:logeshraja006@gmail.com",
    },
    {
      icon: <Phone className="text-accent" size={18} />,
      label: "Phone",
      value: "+91 96003 20520",
      href: "tel:+919600320520",
    },
    {
      icon: <MapPin className="text-accent" size={18} />,
      label: "Location",
      value: "Aruppukottai, Tamil Nadu",
      href: "https://google.com/maps",
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-bg-primary overflow-hidden">
      {/* Mesh Glow */}
      <div className="bg-mesh-orange bottom-1/4 -right-10 opacity-30" />
      <div className="bg-mesh-yellow top-1/4 -left-10 opacity-25" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold font-display uppercase tracking-widest text-accent mb-2 block">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-primary">
            Let's Collaborate
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Image & Contact Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-8 order-2 lg:order-1">
            
            {/* 3D Phone Character Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden glass-panel border-card-border p-4 flex items-center justify-center border-accent/15"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-bg-secondary flex items-center justify-center">
                <Image
                  src="/contact_illustration.png"
                  alt="Contact Phone Illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </motion.div>

            {/* Contact Details List */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-5 rounded-2xl glass-panel border-card-border hover:border-accent/35 hover:shadow-premium glow-card flex items-center space-x-4 text-left transition-all duration-300 group"
                >
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold font-display uppercase tracking-widest text-text-secondary">
                      {info.label}
                    </span>
                    <span className="text-sm font-semibold text-text-primary mt-1 break-all group-hover:text-accent transition-colors duration-200">
                      {info.value}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Chat Buttons (WhatsApp / LinkedIn) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 pt-2"
            >
              <a
                href="https://wa.me/919600320520"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-2xl font-bold font-display text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 hover:shadow-glow text-white text-center transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageSquare size={14} />
                <span>WhatsApp Me</span>
              </a>
              <a
                href="https://linkedin.com/in/logesh-raja-s-b9b159310"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-2xl font-bold font-display text-xs uppercase tracking-wider bg-card-bg border border-card-border hover:border-accent hover:bg-accent/5 text-text-primary text-center transition-all duration-300 flex items-center justify-center space-x-2"
              >
              <LinkedInIcon size={14} className="text-accent" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Sleek Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl glass-panel border-card-border flex flex-col space-y-5 text-left border-accent/10 shadow-premium"
            >
              <h3 className="text-xl font-bold font-display text-text-primary mb-2">
                Send a Message
              </h3>

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="firstName" className="text-[10px] font-bold font-display uppercase tracking-widest text-text-secondary">
                    First Name
                  </label>
                  <input suppressHydrationWarning
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl bg-bg-secondary border border-card-border focus:border-accent text-sm text-text-primary outline-none transition-colors duration-200"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="lastName" className="text-[10px] font-bold font-display uppercase tracking-widest text-text-secondary">
                    Last Name
                  </label>
                  <input suppressHydrationWarning
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl bg-bg-secondary border border-card-border focus:border-accent text-sm text-text-primary outline-none transition-colors duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email & Subject Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-[10px] font-bold font-display uppercase tracking-widest text-text-secondary">
                    Email Address
                  </label>
                  <input suppressHydrationWarning
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl bg-bg-secondary border border-card-border focus:border-accent text-sm text-text-primary outline-none transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="subject" className="text-[10px] font-bold font-display uppercase tracking-widest text-text-secondary">
                    Subject
                  </label>
                  <input suppressHydrationWarning
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl bg-bg-secondary border border-card-border focus:border-accent text-sm text-text-primary outline-none transition-colors duration-200"
                    placeholder="Project Inquiry / Job Opportunity"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold font-display uppercase tracking-widest text-text-secondary">
                  Your Message
                </label>
                <textarea suppressHydrationWarning
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="px-4 py-3 rounded-xl bg-bg-secondary border border-card-border focus:border-accent text-sm text-text-primary outline-none resize-none transition-colors duration-200"
                  placeholder="Hey, let's talk about..."
                />
              </div>

              {/* Status Alert */}
              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold leading-relaxed">
                  Thank you! Your message was submitted successfully. A confirmation email has been sent to your inbox.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold leading-relaxed">
                  {errorMessage || "Something went wrong. Please check your fields and try again."}
                </div>
              )}

              {/* Submit Button */}
              <button suppressHydrationWarning
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 rounded-2xl font-bold font-display text-xs uppercase tracking-wider bg-gradient-to-r from-accent to-accent-secondary text-white shadow-premium hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-70 disabled:-translate-y-0 disabled:shadow-none transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2 justify-center">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Floating Toast Notification */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl glass-panel border shadow-2xl flex items-center space-x-3 max-w-sm ${
                  toastType === "success" 
                    ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-400" 
                    : "border-red-500/30 bg-red-950/20 text-red-400"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${toastType === "success" ? "bg-emerald-500 animate-pulse" : "bg-red-500 animate-pulse"}`} />
                <span className="text-xs font-semibold">{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
