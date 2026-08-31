'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Flame, Sparkles, Layers, Cpu, Compass } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { formatPrice } from '@/lib/utils';

interface LookbookScrollProps {
  onQuickView?: (product: Product) => void;
}

export function LookbookScroll({ onQuickView }: LookbookScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the 300vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Translate lookbook track horizontally from 0% to -65%
  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-65%']);
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Curated lookbook editorial collection from our products dataset
  const lookbookItems = [
    {
      product: PRODUCTS[0], // NEO-TOKYO CYBER HOODIE
      specimenCode: 'SPEC_ZEN-HD01',
      edition: 'RUN_001',
      modelTag: 'SUBJECT: NEO-RONIN 01',
      editorialImage: PRODUCTS[0].images[0],
      location: 'SECTOR 4 // SHIBUYA OVERPASS',
    },
    {
      product: PRODUCTS[1], // KAIJU UNIT-01 BOXY HEAVY TEE
      specimenCode: 'SPEC_ZEN-TS01',
      edition: 'RUN_002',
      modelTag: 'SUBJECT: BIOMECH UNIT',
      editorialImage: PRODUCTS[1].images[0],
      location: 'SECTOR 9 // INDUSTRIAL CORE',
    },
    {
      product: PRODUCTS[2], // SHINOBI-OPS CARGO PANTS
      specimenCode: 'SPEC_ZEN-CG01',
      edition: 'RUN_003',
      modelTag: 'SUBJECT: COVERT INFILTRATOR',
      editorialImage: PRODUCTS[2].images[0],
      location: 'SECTOR 11 // SUBTERRANEAN DEPOT',
    },
    {
      product: PRODUCTS[3], // MECHA-SYNTH JACQUARD KNIT SWEATER
      specimenCode: 'SPEC_ZEN-SW01',
      edition: 'RUN_004',
      modelTag: 'SUBJECT: NEURAL ARCHITECT',
      editorialImage: PRODUCTS[3].images[0],
      location: 'SECTOR 2 // AKIHABARA GRID',
    },
    {
      product: PRODUCTS[4], // GHOST PROTOCOL HOODIE
      specimenCode: 'SPEC_ZEN-HD02',
      edition: 'RUN_005',
      modelTag: 'SUBJECT: ROGUE SYNTH',
      editorialImage: PRODUCTS[4].images[0],
      location: 'SECTOR 7 // MATRIX OUTPOST',
    },
    {
      product: PRODUCTS[5], // NEURAL WIRE ACID-WASH TEE
      specimenCode: 'SPEC_ZEN-TS02',
      edition: 'RUN_006',
      modelTag: 'SUBJECT: WIRE WEAVER',
      editorialImage: PRODUCTS[5].images[0],
      location: 'SECTOR 1 // ROOFTOP RELAY',
    },
  ];

  return (
    <section 
      id="lookbook" 
      ref={targetRef} 
      className="relative h-[300vh] bg-obsidian border-b border-border"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 md:py-12 bg-obsidian">
        
        {/* Background Cyber Grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

        {/* Section Header Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              <span>EDITORIAL ARCHIVE // 視覚的記録</span>
              <span className="text-gold font-bold">◆ PINNED LOOKBOOK</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-cyber-white tracking-tight mt-1 uppercase">
              DROP 001 LOOKBOOK
            </h2>
          </div>

          {/* Horizontal Scroll Guidance & Progress Bar */}
          <div className="flex flex-col items-start sm:items-end gap-1.5 font-mono text-xs text-cyber-muted">
            <span className="flex items-center gap-2 text-cyber-gray">
              <Compass className="w-3.5 h-3.5 text-crimson" />
              SCROLL DOWN TO DRIFT HORIZONTALLY
            </span>
            <div className="w-48 sm:w-64 h-1.5 bg-charcoal border border-border overflow-hidden">
              <motion.div
                style={{ width: progressBar }}
                className="h-full bg-crimson shadow-neon-crimson"
              />
            </div>
          </div>
        </div>

        {/* Pinned Horizontal Scrolling Track */}
        <div className="relative z-10 w-full overflow-hidden py-4 my-auto">
          <motion.div 
            style={{ x }} 
            className="flex gap-6 sm:gap-8 px-4 sm:px-8 w-max items-center"
          >
            {lookbookItems.map((item, index) => {
              const { product } = item;
              return (
                <div
                  key={item.specimenCode}
                  className="relative w-[300px] sm:w-[380px] md:w-[440px] aspect-[3/4.4] sm:aspect-[3/4.2] bg-charcoal border border-border hover:border-crimson hover:shadow-neon-crimson transition-all duration-300 flex flex-col justify-between overflow-hidden group shrink-0"
                >
                  {/* Top Spec Bar */}
                  <div className="p-3.5 bg-obsidian/90 border-b border-border flex items-center justify-between font-mono text-[11px] z-10">
                    <span className="text-crimson font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                      {item.specimenCode}
                    </span>
                    <span className="text-gold font-semibold">
                      {product.gsmWeight} GSM
                    </span>
                  </div>

                  {/* Editorial Imagery with Zoom on Hover */}
                  <div className="relative flex-1 w-full overflow-hidden bg-obsidian">
                    <img
                      src={item.editorialImage}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-80" />

                    {/* Location Badge */}
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="font-mono text-[9px] px-2 py-0.5 bg-obsidian/90 border border-border text-cyber-gray">
                        {item.location}
                      </span>
                    </div>

                    {/* Model Tag */}
                    <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                      <span className="font-mono text-[10px] text-cyber-muted block">
                        {item.modelTag}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Spec Details & CTA */}
                  <div className="p-4 sm:p-5 bg-charcoal border-t border-border flex flex-col justify-between space-y-3 z-10">
                    <div>
                      <p className="font-japanese text-xs text-cyber-muted font-medium">
                        {product.japaneseTitle}
                      </p>
                      <h3 className="font-heading font-black text-base sm:text-lg text-cyber-white tracking-wide uppercase line-clamp-1 mt-0.5">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs font-mono mt-1">
                        <span className="text-cyber-gray">{product.fit}</span>
                        <span className="text-cyber-white font-bold">{formatPrice(product.price)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onQuickView && onQuickView(product)}
                        className="py-2 px-3 bg-obsidian border border-border hover:border-crimson hover:text-crimson font-mono text-[11px] font-bold text-cyber-white flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Cpu className="w-3 h-3 text-gold" />
                        <span>VIEW SPEC</span>
                      </button>

                      <Link
                        href={`/product/${product.id}`}
                        className="py-2 px-3 bg-crimson hover:bg-crimson-glow text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1 shadow-neon-crimson transition-all"
                      >
                        <span>DISPATCH</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer Guidance Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-cyber-muted pt-2 border-t border-border/40">
          <span>ZENJI EDITORIAL TELEMETRY // 6 ARTIFACTS LOADED</span>
          <span className="text-gold hidden sm:inline">ALL GARMENTS MILLED IN LIMITED CAPACITY</span>
        </div>

      </div>
    </section>
  );
}

export default LookbookScroll;
