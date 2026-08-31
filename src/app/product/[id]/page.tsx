'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Marquee } from '@/components/Marquee';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { PRODUCTS, Product, ProductSize } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { 
  ShoppingBag, 
  Check, 
  Flame, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  ChevronDown, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Cpu, 
  Info,
  X,
  Share2
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const product = PRODUCTS.find((p) => p.id === productId);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [isAdded, setIsAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    specs: true,
    shipping: false,
    archive: false,
  });

  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-obsidian text-cyber-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-32 px-4">
          <h2 className="font-heading font-black text-3xl text-crimson mb-4">
            404 // ARTIFACT NOT FOUND
          </h2>
          <p className="font-mono text-sm text-cyber-muted mb-8">
            The requested garment telemetry does not exist in the active archive database.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-crimson hover:bg-crimson-glow text-white font-mono text-xs font-bold tracking-wider shadow-neon-crimson"
          >
            RETURN TO ARCHIVE CATALOG
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, selectedSize);
    openCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Cross-sell recommendations (excluding current product)
  const crossSellProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  // Stock calculations
  const maxDropBatch = 30;
  const stockPercentage = Math.round(((maxDropBatch - product.stockCount) / maxDropBatch) * 100);

  return (
    <div className="min-h-screen bg-obsidian text-cyber-white flex flex-col selection:bg-crimson selection:text-white">
      <Navbar />
      <Marquee />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-border/80 bg-charcoal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs font-mono text-cyber-muted">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-cyber-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
            <Link href="/shop" className="hover:text-cyber-white transition-colors">
              ARCHIVE
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
            <span className="text-cyber-white font-bold truncate max-w-[160px] sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-crimson transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'TELEMETRY COPIED' : 'SHARE'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Layout */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* 1. LEFT SIDE: VERTICAL GALLERY & HIGH-RES VIEWS */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[680px] scrollbar-none shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-24 md:w-24 md:h-32 border bg-charcoal overflow-hidden transition-all shrink-0 ${
                    selectedImageIdx === idx
                      ? 'border-crimson shadow-neon-crimson scale-[1.02]'
                      : 'border-border opacity-70 hover:opacity-100 hover:border-cyber-gray'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-1 right-1 font-mono text-[9px] px-1 bg-obsidian/90 text-cyber-muted">
                    0{idx + 1}
                  </div>
                </button>
              ))}
            </div>

            {/* Main High-Res Stage */}
            <div className="flex-1 relative aspect-[4/5] bg-charcoal border border-border overflow-hidden">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Grid / Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-40 pointer-events-none" />

              {/* Floating Specification Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-obsidian/90 backdrop-blur-md border border-border text-cyber-white">
                  {product.dropNumber} // SERIALIZED
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-obsidian/90 backdrop-blur-md border border-border text-gold">
                  {product.gsmWeight} GSM HEAVYWEIGHT
                </span>
              </div>

              {product.stockCount <= 8 && (
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-xs font-bold px-3 py-1 bg-crimson text-white shadow-neon-crimson flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 animate-pulse" />
                    LOW ALLOCATION: ONLY {product.stockCount} PIECES REMAINING
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* 2. RIGHT SIDE: STICKY GARMENT SPEC SHEET */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Header Titles */}
              <div className="border-b border-border/80 pb-5">
                <div className="flex items-center gap-2 font-mono text-xs text-crimson font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{product.japaneseTitle}</span>
                </div>
                <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-cyber-white mt-1 uppercase tracking-tight">
                  {product.name}
                </h1>
                
                {/* Price & MSRP Strike-through */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-mono text-2xl font-bold text-cyber-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="font-mono text-base text-cyber-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-800">
                    TAX INCLUDED // WORLDWIDE
                  </span>
                </div>
              </div>

              {/* Stock Level Bar */}
              <div className="p-3.5 bg-charcoal border border-border space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-cyber-light">
                    <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                    ALLOCATION RESERVE LEVEL
                  </span>
                  <span className="text-gold font-bold">{stockPercentage}% CLAIMED</span>
                </div>
                <div className="w-full bg-obsidian h-2 border border-border/60 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-crimson to-gold h-full transition-all duration-500 shadow-neon-crimson"
                    style={{ width: `${stockPercentage}%` }}
                  />
                </div>
                <p className="text-[10px] font-mono text-cyber-muted">
                  Strict batch of 30 units. No restocks once inventory is exhausted.
                </p>
              </div>

              {/* Description */}
              <p className="text-cyber-gray text-xs sm:text-sm leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Size Selector with Size Guide Modal Trigger */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-cyber-white font-bold">SELECT SIZE MATRIX:</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-crimson hover:text-crimson-glow flex items-center gap-1 text-[11px] underline underline-offset-4"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>FIT & SIZE GUIDE</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {(['S', 'M', 'L', 'XL'] as ProductSize[]).map((size) => {
                    const isAvailable = product.sizes.includes(size);
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-xs font-mono font-bold transition-all border ${
                          isSelected
                            ? 'bg-crimson border-crimson text-white shadow-neon-crimson'
                            : isAvailable
                            ? 'bg-charcoal border-border text-cyber-light hover:border-cyber-gray hover:text-white'
                            : 'bg-charcoal/30 border-border/30 text-cyber-muted/30 line-through cursor-not-allowed'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Bag CTA Button */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 px-6 font-mono text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-neon-crimson-lg ${
                    isAdded
                      ? 'bg-emerald-600 border border-emerald-500 text-white'
                      : 'bg-crimson hover:bg-crimson-glow text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>SECURED IN BAG [{selectedSize}]</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>ADD TO BAG [{selectedSize}] — {formatPrice(product.price)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-cyber-muted">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-gold" />
                    EXPRESS DISPATCH
                  </span>
                  <span>//</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-crimson" />
                    CRYPTO-AUTHENTICATED
                  </span>
                </div>
              </div>

              {/* 3. TECHNICAL ACCORDIONS */}
              <div className="border-t border-border pt-4 space-y-2">
                
                {/* Accordion 1: Fabric & Print Specs */}
                <div className="border border-border bg-charcoal/50">
                  <button
                    onClick={() => toggleAccordion('specs')}
                    className="w-full p-4 flex items-center justify-between font-mono text-xs font-bold text-cyber-white hover:text-crimson transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-gold" />
                      TEXTILE MATRIX & GARMENT SPECS
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordions.specs ? 'rotate-180 text-crimson' : 'text-cyber-muted'
                      }`}
                    />
                  </button>
                  {openAccordions.specs && (
                    <div className="p-4 pt-0 border-t border-border/40 font-mono text-xs text-cyber-gray space-y-2">
                      <ul className="space-y-1.5">
                        {product.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-crimson mt-0.5">◆</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 text-[11px] text-cyber-muted border-t border-border/30">
                        <strong>WASH CARE:</strong> Cold wash inside out. Hang dry only. Do not iron directly on 3D reflective prints.
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Shipping & Dispatch */}
                <div className="border border-border bg-charcoal/50">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full p-4 flex items-center justify-between font-mono text-xs font-bold text-cyber-white hover:text-crimson transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-crimson" />
                      WORLDWIDE SHIPPING TELEMETRY
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordions.shipping ? 'rotate-180 text-crimson' : 'text-cyber-muted'
                      }`}
                    />
                  </button>
                  {openAccordions.shipping && (
                    <div className="p-4 pt-0 border-t border-border/40 font-mono text-xs text-cyber-gray space-y-2">
                      <p>• Dispatched in custom matte vacuum-sealed anti-static tactical packaging.</p>
                      <p>• US & EU Orders: 2–4 Business Days via DHL Express.</p>
                      <p>• Asia & International: 3–5 Business Days with tracking telemetry.</p>
                      <p>• Orders over $120 qualify for complimentary priority express.</p>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Archive & Authentication Policy */}
                <div className="border border-border bg-charcoal/50">
                  <button
                    onClick={() => toggleAccordion('archive')}
                    className="w-full p-4 flex items-center justify-between font-mono text-xs font-bold text-cyber-white hover:text-crimson transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      ARCHIVE & AUTHENTICATION POLICY
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordions.archive ? 'rotate-180 text-crimson' : 'text-cyber-muted'
                      }`}
                    />
                  </button>
                  {openAccordions.archive && (
                    <div className="p-4 pt-0 border-t border-border/40 font-mono text-xs text-cyber-gray space-y-2">
                      <p>• Every garment includes a cryptographic NFC chip woven into the sleeve cuff.</p>
                      <p>• Scan with any smartphone to verify unique serial identity and drop provenance.</p>
                      <p>• 14-day return privilege if unwashed and cryptographic security tag remains intact.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4. "COMPLETE THE FIT" CROSS-SELL GRID */}
        <section className="mt-24 pt-16 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-crimson font-bold tracking-widest">
                RECOMMENDED TELEMETRY // 関連装備
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-cyber-white mt-1">
                COMPLETE THE FIT
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-mono text-xs text-cyber-muted hover:text-cyber-white flex items-center gap-1"
            >
              <span>EXPLORE ALL PIECES</span>
              <ChevronRight className="w-3.5 h-3.5 text-crimson" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {crossSellProducts.map((crossProduct) => (
              <ProductCard key={crossProduct.id} product={crossProduct} />
            ))}
          </div>
        </section>
      </main>

      {/* 5. FIT & SIZE GUIDE MODAL */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div 
            onClick={() => setSizeGuideOpen(false)}
            className="fixed inset-0 bg-obsidian/85 backdrop-blur-md"
          />
          <div className="relative w-full max-w-2xl bg-charcoal border border-border p-6 sm:p-8 shadow-2xl z-10">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-crimson" />
                <h3 className="font-heading font-bold text-base sm:text-lg text-cyber-white">
                  ZENJI SIZE & FIT TELEMETRY MATRIX
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="p-1 text-cyber-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-mono text-cyber-muted mt-3">
              All ZENJI garments feature an exaggerated Japanese streetwear boxy drop-shoulder cut. Order your true size for the intended relaxed drape, or size down for a standard tailored fit.
            </p>

            {/* Matrix Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-border">
                <thead className="bg-obsidian text-cyber-muted">
                  <tr>
                    <th className="p-3 border-b border-r border-border">SIZE</th>
                    <th className="p-3 border-b border-r border-border">CHEST (IN / CM)</th>
                    <th className="p-3 border-b border-r border-border">LENGTH (IN / CM)</th>
                    <th className="p-3 border-b border-border">SHOULDER (IN / CM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-cyber-light">
                  <tr className="hover:bg-obsidian/50">
                    <td className="p-3 font-bold text-crimson border-r border-border">S</td>
                    <td className="p-3 border-r border-border">46" / 117 cm</td>
                    <td className="p-3 border-r border-border">28" / 71 cm</td>
                    <td className="p-3">22" / 56 cm</td>
                  </tr>
                  <tr className="hover:bg-obsidian/50 bg-charcoal/30">
                    <td className="p-3 font-bold text-crimson border-r border-border">M</td>
                    <td className="p-3 border-r border-border">48" / 122 cm</td>
                    <td className="p-3 border-r border-border">29" / 74 cm</td>
                    <td className="p-3">23" / 58 cm</td>
                  </tr>
                  <tr className="hover:bg-obsidian/50">
                    <td className="p-3 font-bold text-crimson border-r border-border">L</td>
                    <td className="p-3 border-r border-border">50" / 127 cm</td>
                    <td className="p-3 border-r border-border">30" / 76 cm</td>
                    <td className="p-3">24" / 61 cm</td>
                  </tr>
                  <tr className="hover:bg-obsidian/50 bg-charcoal/30">
                    <td className="p-3 font-bold text-crimson border-r border-border">XL</td>
                    <td className="p-3 border-r border-border">52" / 132 cm</td>
                    <td className="p-3 border-r border-border">31" / 79 cm</td>
                    <td className="p-3">25" / 63 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="text-gold">COMPLIMENTARY SIZE EXCHANGE INCLUDED</span>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="px-4 py-2 bg-crimson text-white font-bold"
              >
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
