'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, ChevronDown, Sparkles } from 'lucide-react';
import { ZenjiLogo } from './ZenjiLogo';

interface HeroScrollProps {
  onShopClick?: () => void;
}

export function HeroScroll({ onShopClick }: HeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress inside the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 1. Background Media Dynamics: scale down from 1.15x -> 0.92x and darken
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.15, 0.92]);
  const backgroundDarken = useTransform(scrollYProgress, [0, 0.8], [0.35, 0.9]);
  const backgroundBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(10px)']);

  // 2. Large Background Kanji "禅時" translating horizontally across screen
  const kanjiX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const kanjiOpacity = useTransform(scrollYProgress, [0, 0.7], [0.18, 0.02]);

  // 3. Foreground Hero Text Parallax: slow downward drift & progressive fade-out
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const foregroundOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const foregroundScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full">
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-b border-border bg-obsidian">
        
        {/* Background Parallax Media Container */}
        <motion.div
          style={{
            scale: backgroundScale,
            filter: backgroundBlur,
          }}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none origin-center"
        >
          <img
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2000&q=85"
            alt="Neo Tokyo Cyberpunk Streetscape"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.3] saturate-50"
          />

          {/* Overlays */}
          <div className="absolute inset-0 cyber-grid-bg opacity-35" />
          <div className="absolute inset-0 bg-radial-crimson opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-transparent to-obsidian/90" />
        </motion.div>

        {/* Dynamic Darken Overlay */}
        <motion.div
          style={{ opacity: backgroundDarken }}
          className="absolute inset-0 z-[1] bg-obsidian pointer-events-none"
        />

        {/* Giant Background Kanji Typography ("禅時") */}
        <motion.div
          style={{
            x: kanjiX,
            opacity: kanjiOpacity,
          }}
          className="absolute z-[2] select-none pointer-events-none whitespace-nowrap top-1/2 -translate-y-1/2 left-0 text-[35vw] font-japanese font-black leading-none text-cyber-white tracking-tighter"
          aria-hidden="true"
        >
          禅時
        </motion.div>

        {/* Foreground Content with Parallax */}
        <motion.div
          style={{
            y: foregroundY,
            opacity: foregroundOpacity,
            scale: foregroundScale,
          }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center py-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-charcoal/90 border border-crimson/80 backdrop-blur-md shadow-neon-crimson mb-6 animate-pulse-glow">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-cyber-white">
              DROP 001 // BORN FROM THE WARRIOR SPIRIT
            </span>
            <span className="text-gold font-mono text-xs">◆ NO RESTOCKS</span>
          </div>

          {/* Official ZENJI Monogram + Big Wordmark Logo */}
          <div className="my-2 flex flex-col items-center">
            <ZenjiLogo variant="full" size="hero" glow={true} className="mb-4" />
          </div>

          {/* Tagline */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-cyber-white uppercase max-w-5xl leading-[1.05]">
            WEAR YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson via-rose-500 to-gold text-glow-crimson">STORY</span>
          </h1>

          {/* Japanese Subtitle */}
          <p className="font-japanese font-medium text-xs sm:text-sm md:text-base text-cyber-muted mt-4 tracking-[0.25em]">
            アニメ・ストリートウェア // 極厚320–520GSM プレミアムコットン
          </p>

          <p className="mt-4 max-w-2xl text-xs sm:text-sm md:text-base text-cyber-gray font-sans leading-relaxed">
            Limited anime streetwear from Australia & Tokyo. Japanese-inspired heavyweight graphic tees, hoodies, and samurai discipline. No restocks. Ever.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onShopClick}
              className="w-full sm:w-auto px-8 py-4 bg-crimson hover:bg-crimson-glow text-white font-mono text-xs md:text-sm font-bold tracking-wider flex items-center justify-center gap-2.5 shadow-neon-crimson-lg transition-all duration-300 group"
            >
              <span>SHOP THE DROP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-charcoal/80 hover:bg-charcoal border border-border hover:border-cyber-gray text-cyber-white font-mono text-xs md:text-sm font-bold tracking-wider flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-300"
            >
              <Cpu className="w-4 h-4 text-gold" />
              <span>EXPLORE COLLECTION</span>
            </Link>
          </div>

          {/* Telemetry Stats Bar */}
          <div className="mt-12 pt-6 border-t border-border/60 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3 bg-charcoal/50 border border-border/50 backdrop-blur-sm">
              <span className="font-mono text-[9px] text-cyber-muted block">FABRIC DENSITY</span>
              <span className="font-mono text-sm sm:text-base font-bold text-gold">320 – 520 GSM</span>
            </div>
            <div className="p-3 bg-charcoal/50 border border-border/50 backdrop-blur-sm">
              <span className="font-mono text-[9px] text-cyber-muted block">RESTOCK POLICY</span>
              <span className="font-mono text-sm sm:text-base font-bold text-cyber-white">NO RESTOCKS. EVER.</span>
            </div>
            <div className="p-3 bg-charcoal/50 border border-border/50 backdrop-blur-sm">
              <span className="font-mono text-[9px] text-cyber-muted block">ARTWORK ORIGIN</span>
              <span className="font-mono text-sm sm:text-base font-bold text-crimson">WARRIOR SPIRIT</span>
            </div>
            <div className="p-3 bg-charcoal/50 border border-border/50 backdrop-blur-sm">
              <span className="font-mono text-[9px] text-cyber-muted block">DISPATCH STATUS</span>
              <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">WORLDWIDE EXPRESS</span>
            </div>
          </div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: foregroundOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-cyber-muted pointer-events-none"
        >
          <span className="font-mono text-[10px] tracking-cyber uppercase mb-1 text-crimson">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-crimson" />
        </motion.div>

      </div>
    </section>
  );
}

export default HeroScroll;
