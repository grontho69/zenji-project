'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Flame, Shield, Sparkles, Sword } from 'lucide-react';
import { TextReveal } from './TextReveal';

export function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax translation for floating graphics
  const kanjiY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section 
      id="our-story" 
      ref={sectionRef} 
      className="w-full py-24 sm:py-36 bg-obsidian relative border-b border-border overflow-hidden"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      {/* Floating Background Kanji Accent */}
      <motion.div
        style={{ y: kanjiY }}
        className="absolute right-0 top-1/4 text-[25vw] font-japanese font-black text-charcoal/40 select-none pointer-events-none -z-0 leading-none"
        aria-hidden="true"
      >
        武士
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Lore & Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Japanese badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal border border-crimson/60 shadow-neon-crimson">
              <Sword className="w-3.5 h-3.5 text-crimson" />
              <span className="font-mono text-xs font-bold text-cyber-white tracking-widest uppercase">
                ORIGIN PROTOCOL // 武士道精神
              </span>
            </div>

            {/* Main Headline with Text Reveal */}
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-cyber-white tracking-tight leading-[1.08] uppercase">
              <TextReveal text="BORN FROM THE" type="words" /> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson via-rose-500 to-gold text-glow-crimson">
                <TextReveal text="WARRIOR SPIRIT." type="words" delay={0.2} />
              </span>
            </h2>

            {/* Core Manifesto Paragraphs */}
            <div className="space-y-4 text-cyber-gray font-sans text-sm sm:text-base leading-relaxed max-w-2xl">
              <p className="text-cyber-white font-medium text-base sm:text-lg">
                ZENJI began with one belief: <strong className="text-crimson">what you wear should tell a story.</strong>
              </p>
              
              <p>
                Inspired by samurai discipline, anime art, and modern street culture, we create premium streetwear for those who choose their own path.
              </p>

              <p>
                Every ZENJI piece combines Japanese-inspired artwork, powerful symbolism, and oversized silhouettes to express courage, creativity, and individuality.
              </p>

              {/* Tagline for the community */}
              <div className="p-4 bg-charcoal/80 border-l-2 border-crimson my-4 font-mono text-xs sm:text-sm text-cyber-light space-y-1">
                <p className="text-gold font-bold">FOR THE DREAMERS. FIGHTERS. CREATORS. OUTSIDERS.</p>
                <p className="text-cyber-muted text-xs">Wear the Arc. Anime-inspired streetwear for gamers and otaku. Every drop limited. No restocks. Ever.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-crimson hover:bg-crimson-glow text-white font-mono text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2.5 shadow-neon-crimson-lg transition-all duration-300 group"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="/#lookbook"
                className="px-6 py-4 bg-charcoal border border-border hover:border-cyber-white text-cyber-white font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
              >
                <span>VIEW LOOKBOOK</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Visual Stage with Parallax Depth */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/5] bg-charcoal border border-border overflow-hidden shadow-2xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85"
                alt="ZENJI Warrior Spirit Model"
                className="w-full h-full object-cover object-center filter contrast-125 saturate-75 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Spec Box Overlay */}
              <div className="absolute top-4 right-4 bg-obsidian/90 border border-border p-3 backdrop-blur-md font-mono text-[11px] space-y-1">
                <span className="text-crimson font-bold block">ZENJI RESEARCH LAB</span>
                <span className="text-cyber-muted block">TOKYO // AUSTRALIA</span>
                <span className="text-gold font-bold">100% HEAVY COTTON</span>
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-obsidian/90 border border-border p-3.5 backdrop-blur-md flex items-center justify-between font-mono text-xs">
                <span className="text-cyber-white font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  WEAR YOUR STORY
                </span>
                <span className="text-crimson font-bold">NO RESTOCKS</span>
              </div>
            </motion.div>

            {/* Corner Decorative Tech Brackets */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-crimson pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}

export default StorySection;
