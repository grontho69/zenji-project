'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high-end fluid latency
  const springConfig = { damping: 24, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only render on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [data-cursor], [role="button"]');
      if (interactive) {
        setIsHovered(true);
        const customLabel = interactive.getAttribute('data-cursor');
        if (customLabel) setCursorText(customLabel);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* 1. Main Center Laser Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`w-2 h-2 rounded-full bg-crimson shadow-neon-crimson transition-transform duration-100 ${
          isClicking ? 'scale-50 bg-gold' : isHovered ? 'scale-150 bg-white' : 'scale-100'
        }`}
      />

      {/* 2. Smooth Floating Reticle Ring / Crosshair */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`relative flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-14 h-14 border border-crimson/80 bg-crimson/10 shadow-neon-crimson'
            : isClicking
            ? 'w-6 h-6 border border-gold/90'
            : 'w-9 h-9 border border-border/80'
        }`}
      >
        {/* Cyber Crosshair Corner Brackets */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-crimson" />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-crimson" />
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-crimson" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-crimson" />

        {/* Dynamic Label if present */}
        {cursorText && (
          <span className="font-mono text-[8px] font-bold text-white tracking-widest uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}

export default CustomCursor;
