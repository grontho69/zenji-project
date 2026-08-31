'use client';

import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Flame, Layers, Sparkles } from 'lucide-react';
import { Product, ProductSize } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const { addItem, openCart } = useCartStore();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, selectedSize);
    openCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-obsidian/90 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-charcoal border border-border overflow-hidden shadow-2xl z-10 my-8">
        
        {/* Top Spec Bar */}
        <div className="px-6 py-2.5 bg-obsidian border-b border-border flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-2 text-cyber-muted">
            <span className="text-crimson font-bold">ARTIFACT ID:</span>
            <span>{product.id.toUpperCase()}</span>
            <span>//</span>
            <span>{product.dropNumber}</span>
          </div>

          <button
            onClick={onClose}
            className="text-cyber-muted hover:text-white p-1"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Gallery */}
          <div className="p-6 bg-obsidian/40 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border">
            <div className="aspect-[4/5] relative w-full overflow-hidden bg-obsidian border border-border">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="font-mono text-[10px] px-2 py-0.5 bg-obsidian/90 border border-border text-gold">
                  {product.gsmWeight} GSM
                </span>
                {product.stockCount <= 5 && (
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-crimson text-white shadow-neon-crimson flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    ONLY {product.stockCount} LEFT
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 border overflow-hidden transition-all ${
                    activeImageIdx === idx
                      ? 'border-crimson shadow-neon-crimson scale-105'
                      : 'border-border opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Technical Specs & Add to Bag */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <p className="font-japanese text-xs text-crimson font-semibold tracking-wider">
                  {product.japaneseTitle}
                </p>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-cyber-white mt-1">
                  {product.name}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-mono text-xl font-bold text-cyber-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-cyber-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-border text-cyber-gray">
                    {product.fit}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-cyber-gray text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Garment Details & Specs */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <h4 className="font-mono text-[11px] font-bold text-cyber-white tracking-wider uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-gold" />
                  SPECIFICATIONS & TEXTILE MATRIX
                </h4>
                <ul className="space-y-1.5 text-[11px] font-mono text-cyber-gray">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-crimson mt-0.5">◆</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Pill Selection */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-cyber-muted">SELECT SIZE SPEC</span>
                  <span className="text-gold">FREE RESIZING RETURNS</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['S', 'M', 'L', 'XL'] as ProductSize[]).map((size) => {
                    const available = product.sizes.includes(size);
                    const selected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        disabled={!available}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-mono font-bold transition-all border ${
                          selected
                            ? 'bg-crimson border-crimson text-white shadow-neon-crimson'
                            : available
                            ? 'bg-obsidian border-border text-cyber-light hover:border-cyber-gray'
                            : 'opacity-30 border-border/30 line-through cursor-not-allowed'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-3 pt-4 border-t border-border">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-crimson hover:bg-crimson-glow text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-neon-crimson transition-all"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>SECURED IN BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG [{selectedSize}] — {formatPrice(product.price)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-cyber-muted">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-gold" />
                  AUTHENTIC DISPATCH
                </span>
                <span>//</span>
                <span>SHIPS WITHIN 24 HOURS</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductModal;
