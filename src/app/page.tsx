'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Marquee } from '@/components/Marquee';
import { HeroScroll } from '@/components/HeroScroll';
import { StorySection } from '@/components/StorySection';
import { LookbookScroll } from '@/components/LookbookScroll';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { Footer } from '@/components/Footer';
import { PRODUCTS, CATEGORIES, Product } from '@/data/products';
import { Flame, Layers, Disc, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { TextReveal } from '@/components/TextReveal';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleScrollToLookbook = () => {
    const el = document.getElementById('lookbook');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-cyber-white flex flex-col selection:bg-crimson selection:text-white">
      {/* 1. Sticky Cyberpunk Navbar */}
      <Navbar onCategorySelect={(cat) => setSelectedCategory(cat)} />

      {/* 2. Infinite Continuous Marquee Ticker */}
      <Marquee text="WEAR YOUR STORY ◆ LIMITED ANIME STREETWEAR ◆ NO RESTOCKS. EVER. ◆ FREE WORLDWIDE SHIPPING OVER $120 ◆ 320–520 GSM HEAVY COTTON" />

      {/* 3. Parallax Inertia Hero Section */}
      <HeroScroll onShopClick={handleScrollToCatalog} />

      {/* 4. Brand Origin & Story Section ("BORN FROM THE WARRIOR SPIRIT") */}
      <StorySection />

      {/* 5. Pinned Horizontal Scrolling Editorial Lookbook */}
      <LookbookScroll onQuickView={(p) => setActiveQuickViewProduct(p)} />

      {/* 6. Streetwear Spec & Quality Showcase */}
      <section id="specs" className="w-full py-20 bg-charcoal/40 border-b border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-border/60 gap-4">
            <div>
              <span className="font-mono text-xs text-crimson font-bold tracking-widest flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                TECHNICAL SPECIFICATIONS // 技術基準
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-cyber-white mt-1 uppercase">
                <TextReveal text="ENGINEERED FOR HEAVYWEIGHT LONGEVITY" type="words" />
              </h2>
            </div>
            <span className="font-mono text-xs text-cyber-muted">
              NO RESTOCKS ◆ ZERO SHRINKAGE ◆ 100% COMBED COTTON
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-8 bg-obsidian border border-border hover:border-crimson/60 hover:shadow-neon-crimson transition-all duration-300 group">
              <div className="w-12 h-12 bg-charcoal border border-border group-hover:border-crimson flex items-center justify-center mb-6 transition-colors">
                <Flame className="w-6 h-6 text-crimson" />
              </div>
              <span className="font-mono text-xs text-gold font-bold">CUSTOM-MILLED FABRICS</span>
              <h3 className="font-heading font-bold text-xl text-cyber-white mt-1.5">
                320–520 GSM Heavyweights
              </h3>
              <p className="text-cyber-gray text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                Substantial structural drape with tight 1.25" crew collars. Spun from 100% organic long-staple combed cotton with vintage stone wash nuances.
              </p>
            </div>

            <div className="p-8 bg-obsidian border border-border hover:border-gold/60 hover:shadow-neon-gold transition-all duration-300 group">
              <div className="w-12 h-12 bg-charcoal border border-border group-hover:border-gold flex items-center justify-center mb-6 transition-colors">
                <Disc className="w-6 h-6 text-gold" />
              </div>
              <span className="font-mono text-xs text-crimson font-bold">ARCHIVE INTEGRITY</span>
              <h3 className="font-heading font-bold text-xl text-cyber-white mt-1.5">
                No Restocks. Ever.
              </h3>
              <p className="text-cyber-gray text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                Every release is strictly capped. Finished with serialized woven tags. Once an archive drop sells out, it enters permanent vault status.
              </p>
            </div>

            <div className="p-8 bg-obsidian border border-border hover:border-cyber-white/60 hover:shadow-neon-white transition-all duration-300 group">
              <div className="w-12 h-12 bg-charcoal border border-border group-hover:border-cyber-white flex items-center justify-center mb-6 transition-colors">
                <Zap className="w-6 h-6 text-cyber-white" />
              </div>
              <span className="font-mono text-xs text-cyber-gray font-bold">ANIME LORE & ART</span>
              <h3 className="font-heading font-bold text-xl text-cyber-white mt-1.5">
                Warrior Spirit Aesthetics
              </h3>
              <p className="text-cyber-gray text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                Multi-layer breathable discharge screenprints, traditional Sumi-e calligraphy, and subtle reflective ciphers for otakus, gamers, and street rebels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Product Catalog Section */}
      <section id="catalog" className="w-full py-20 bg-obsidian relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-border gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted">
                <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                <span>DROP 001 ARCHIVE // 最新ドロップ</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-cyber-white mt-1 uppercase tracking-tight">
                <TextReveal text="THE COLLECTION" type="words" />
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-mono font-bold tracking-wider transition-all border ${
                      isActive
                        ? 'bg-crimson border-crimson text-white shadow-neon-crimson'
                        : 'bg-charcoal border-border text-cyber-gray hover:text-cyber-white hover:border-cyber-muted'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mb-8 text-xs font-mono text-cyber-muted">
            <span>
              SHOWING <strong className="text-cyber-white">{filteredProducts.length}</strong> LIMITED PIECES
            </span>
            <Link
              href="/shop"
              className="text-gold hover:text-white flex items-center gap-1 font-bold"
            >
              <span>VIEW FULL SHOP REPOSITORY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3D Tilt Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setActiveQuickViewProduct(p)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 8. Quick View Telemetry Modal */}
      <ProductModal
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
      />

      {/* 9. Editorial Footer */}
      <Footer />
    </div>
  );
}
