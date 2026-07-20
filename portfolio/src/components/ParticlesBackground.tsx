"use client";

import React, { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Create initial particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
    const createParticle = (isInitial = false) => {
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : canvas.height + 10,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.5 + 0.1), // Drift upwards
        opacity: isInitial ? Math.random() * 0.5 + 0.1 : 0,
        fadeSpeed: Math.random() * 0.01 + 0.002,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Check if dark mode is active
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "249, 115, 22" : "15, 23, 42"; // Orange vs Dark slate

      particles.forEach((p, idx) => {
        // Apply gentle mouse influence
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= dx * force * 0.02;
          p.y -= dy * force * 0.02;
        }

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Fade-in/out logic
        if (p.opacity < 0.6 && p.y > 0) {
          p.opacity += p.fadeSpeed;
        }

        // Reset particle if it drifts off top or sides
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle(false);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.min(p.opacity, 0.6)})`;
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distanceX = p.x - p2.x;
          const distanceY = p.y - p2.y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (distance < 100) {
            const lineOpacity = (100 - distance) / 100 * 0.05;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
