"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track active hover tags
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button" ||
        target.closest('[data-hover="true"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Spring animation logic for the outer circle trail
  useEffect(() => {
    const updateTrail = () => {
      // Calculate spring effect
      const dx = position.x - trailRef.current.x;
      const dy = position.y - trailRef.current.y;
      
      // Interpolate position (0.15 is speed factor)
      trailRef.current.x += dx * 0.15;
      trailRef.current.y += dy * 0.15;
      
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      requestRef.current = requestAnimationFrame(updateTrail);
    };

    requestRef.current = requestAnimationFrame(updateTrail);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hidden lg:block"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          backgroundColor: isHovering ? "rgba(249, 115, 22, 0.1)" : "transparent",
          boxShadow: isHovering ? "0 0 15px rgba(249, 115, 22, 0.3)" : "none",
        }}
      />
      {/* Center Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 hidden lg:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 0.5 : 1})`,
          backgroundColor: isHovering ? "rgba(250, 204, 21, 1)" : "rgba(249, 115, 22, 1)",
        }}
      />
    </>
  );
}
