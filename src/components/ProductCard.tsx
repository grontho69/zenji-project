'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Flame, Check, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { Product, ProductSize } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { TiltCard } from './TiltCard';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [isAdded, setIsAdded] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;

    addItem(product, selectedSize);
    openCart();

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const isLowStock = product.stockCount > 0 && product.stockCount <= 6;

  return (
    <TiltCard maxTilt={6} className="h-full">
      <div className="group relative flex flex-col h-full bg-charcoal border border-border hover:border-crimson/80 hover:shadow-neon-crimson transition-all duration-300 overflow-hidden">
        
        {/* Top Image Stage with Dual-Image Flip */}
        <div 
          className="relative aspect-[4/5] w-full overflow-hidden bg-obsidian cursor-pointer"
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
          {/* Main & Alternate Images */}
          <div className="relative w-full h-full">
            <img
              src={primaryImage}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                imageHovered ? 'opacity-0 scale-105 filter blur-[1px]' : 'opacity-100 scale-100'
              }`}
              loading="lazy"
            />
            <img
              src={secondaryImage}
              alt={`${product.name} alternate angle`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                imageHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              loading="lazy"
            />
          </div>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Top Badges: Sale 15% OFF, Drop Edition, GSM */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <div className="flex flex-wrap items-center gap-1.5">
              {product.isOnSale && (
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-crimson text-white shadow-neon-crimson flex items-center gap-1 animate-pulse">
                  SALE 15% OFF
                </span>
              )}
              {product.isNewRelease && !product.isOnSale && (
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-crimson text-white shadow-neon-crimson flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  NEW DROP
                </span>
              )}
            </div>

            <span className="font-mono text-[10px] font-semibold px-2 py-0.5 bg-obsidian/90 backdrop-blur-md border border-border text-gold">
              {product.gsmWeight} GSM
            </span>
          </div>

          {/* Low Stock Warning Indicator */}
          {isLowStock && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-crimson/90 text-white backdrop-blur-md flex items-center gap-1 border border-crimson shadow-neon-crimson">
                <Flame className="w-3 h-3 animate-pulse" />
                ONLY {product.stockCount} LEFT
              </span>
            </div>
          )}

          {/* Hover Quick Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-obsidian/40 backdrop-blur-[2px] p-4 pointer-events-none">
            {onQuickView && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="pointer-events-auto px-3 py-2 bg-obsidian/90 hover:bg-crimson border border-border hover:border-crimson text-cyber-white font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-neon-crimson transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>QUICK VIEW</span>
              </button>
            )}

            <Link
              href={`/product/${product.id}`}
              className="pointer-events-auto px-3 py-2 bg-crimson hover:bg-crimson-glow text-white font-mono text-[11px] font-bold flex items-center gap-1 shadow-neon-crimson transition-all"
            >
              <span>DETAILS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-charcoal">
          <div>
            {/* Japanese Accent */}
            <p className="font-japanese text-[11px] text-cyber-muted font-medium tracking-wide">
              {product.japaneseTitle}
            </p>

            {/* Product Name */}
            <Link 
              href={`/product/${product.id}`}
              className="font-heading font-bold text-sm sm:text-base text-cyber-white tracking-wide hover:text-crimson transition-colors line-clamp-1 mt-0.5 block uppercase"
            >
              {product.name}
            </Link>

            {/* Fit & Silhouette */}
            <p className="font-mono text-[11px] text-cyber-gray mt-1">
              {product.fit}
            </p>
          </div>

          {/* Price & Discount Display */}
          <div className="flex items-baseline justify-between pt-1 border-t border-border/50">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base sm:text-lg font-bold text-cyber-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="font-mono text-xs text-cyber-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] text-gold uppercase">
              NO RESTOCKS
            </span>
          </div>

          {/* Size Pills */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyber-muted">
              <span>SIZE</span>
              <span className="text-cyber-gray">FIT: OVERSIZED</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {(['S', 'M', 'L', 'XL'] as ProductSize[]).map((size) => {
                const isAvailable = product.sizes.includes(size);
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!isAvailable || !product.inStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={`py-1.5 text-xs font-mono font-bold transition-all border ${
                      isSelected
                        ? 'bg-crimson border-crimson text-white shadow-neon-crimson'
                        : isAvailable
                        ? 'bg-obsidian border-border text-cyber-light hover:border-cyber-gray hover:text-white'
                        : 'bg-obsidian/40 border-border/30 text-cyber-muted/40 cursor-not-allowed line-through'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instant Add Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-wider transition-all duration-200 border ${
              !product.inStock
                ? 'bg-border text-cyber-muted border-border cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-obsidian border-border hover:border-crimson hover:bg-crimson hover:text-white text-cyber-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>ADDED TO BAG</span>
              </>
            ) : !product.inStock ? (
              <span>OUT OF STOCK</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO BAG [{selectedSize}]</span>
              </>
            )}
          </button>
        </div>
      </div>
    </TiltCard>
  );
}

export default ProductCard;
