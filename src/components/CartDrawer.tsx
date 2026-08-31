'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Check, 
  Sparkles,
  Lock,
  PackageCheck
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleteModal, setOrderCompleteModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const { items, isOpen, closeCart, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeCart]);

  if (!mounted) return null;

  const rawSubtotal = getCartTotal();
  const discountAmount = rawSubtotal * appliedDiscount;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);

  // Free shipping gamification calculation ($120 threshold)
  const freeShippingThreshold = 120;
  const isFreeShippingUnlocked = rawSubtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const shippingProgress = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoSuccess(false);

    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'ZENJI10') {
      setAppliedDiscount(0.10); // 10% off
      setPromoSuccess(true);
    } else {
      setPromoError('INVALID CIPHER PROTOCOL. TRY "ZENJI10"');
    }
  };

  const triggerConfetti = () => {
    // Cyberpunk themed confetti blast (crimson, gold, cyan, white)
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F59E0B', '#FAFAFA', '#10B981', '#FF2E63'],
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.4),
      spread: 60,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.3),
      spread: 100,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.3),
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    setTimeout(() => {
      const generatedOrder = `ZNJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsCheckingOut(false);
      setOrderCompleteModal(true);
      triggerConfetti();
    }, 1200);
  };

  const handleFinishOrder = () => {
    clearCart();
    setOrderCompleteModal(false);
    setAppliedDiscount(0);
    setPromoCode('');
    setPromoSuccess(false);
    closeCart();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeCart}
              className="fixed inset-0 bg-obsidian/80 backdrop-blur-md"
            />

            {/* Slide-Over Panel from Right */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="w-screen max-w-md bg-charcoal border-l border-border flex flex-col shadow-2xl pointer-events-auto relative"
              >
                {/* 1. Header with Live Count and Close Button */}
                <div className="p-4 sm:p-5 border-b border-border bg-obsidian flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-charcoal border border-crimson shadow-neon-crimson flex items-center justify-center">
                      <span className="font-japanese font-black text-sm text-cyber-white">禅</span>
                    </div>
                    <div>
                      <h2 className="font-heading font-black text-sm sm:text-base tracking-wider text-cyber-white flex items-center gap-2">
                        BAG TELEMETRY
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-border bg-charcoal text-cyber-gray">
                          {items.reduce((sum, item) => sum + item.quantity, 0)} ITEMS
                        </span>
                      </h2>
                      <p className="font-mono text-[10px] text-cyber-muted">
                        ZENJI ENCRYPTED CART // 買い物かご
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={closeCart}
                    className="p-2 text-cyber-gray hover:text-white border border-border hover:border-crimson bg-charcoal transition-all"
                    aria-label="Close cart drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Free Shipping Gamification Bar */}
                <div className="p-4 bg-obsidian/60 border-b border-border/80 text-xs font-mono">
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <div className="flex items-center gap-2 font-bold">
                      <Truck className={`w-4 h-4 ${isFreeShippingUnlocked ? 'text-emerald-400' : 'text-gold'}`} />
                      {isFreeShippingUnlocked ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          FREE EXPRESS WORLDWIDE SHIPPING UNLOCKED
                        </span>
                      ) : (
                        <span className="text-cyber-light">
                          Add <strong className="text-crimson font-bold">{formatPrice(remainingForFreeShipping)}</strong> more to unlock Free Worldwide Shipping.
                        </span>
                      )}
                    </div>
                    <span className="text-cyber-muted">{shippingProgress}%</span>
                  </div>

                  {/* Dynamic Progress Indicator */}
                  <div className="w-full bg-obsidian h-2 border border-border/50 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${shippingProgress}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className={`h-full ${
                        isFreeShippingUnlocked
                          ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                          : 'bg-gradient-to-r from-crimson to-gold shadow-neon-crimson'
                      }`}
                    />
                  </div>
                </div>

                {/* 3. Items List with Motion Stagger */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                      <div className="w-16 h-16 bg-obsidian border border-border flex items-center justify-center text-cyber-muted">
                        <ShoppingBag className="w-7 h-7" />
                      </div>
                      <h3 className="font-heading font-black text-cyber-white text-lg">
                        YOUR BAG IS EMPTY
                      </h3>
                      <p className="font-mono text-xs text-cyber-muted max-w-xs leading-relaxed">
                        No archive pieces added yet. Explore Drop 001 heavyweight garments before allocations close.
                      </p>
                      <button
                        onClick={closeCart}
                        className="mt-4 px-6 py-2.5 font-mono text-xs font-bold bg-crimson hover:bg-crimson-glow text-white shadow-neon-crimson transition-all"
                      >
                        EXPLORE THE DROP
                      </button>
                    </div>
                  ) : (
                    <AnimatePresence initial={false}>
                      {items.map(({ product, selectedSize, quantity }) => (
                        <motion.div
                          key={`${product.id}-${selectedSize}`}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                          className="p-3.5 bg-obsidian border border-border hover:border-border/80 flex gap-3.5 group transition-all"
                        >
                          {/* Thumbnail with GSM badge */}
                          <div className="w-20 h-24 bg-charcoal border border-border/60 shrink-0 overflow-hidden relative">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute top-1 left-1 font-mono text-[9px] font-bold px-1 bg-obsidian/90 text-gold border border-border/50">
                              {product.gsmWeight}G
                            </div>
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-heading font-bold text-xs sm:text-sm text-cyber-white line-clamp-1">
                                  {product.name}
                                </h4>
                                <button
                                  onClick={() => removeItem(product.id, selectedSize)}
                                  className="text-cyber-muted hover:text-crimson transition-colors p-1"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-mono text-[10px] px-1.5 py-0.2 bg-charcoal border border-border text-cyber-light">
                                  SIZE: <strong>{selectedSize}</strong>
                                </span>
                                <span className="font-mono text-[10px] text-cyber-muted">
                                  {formatPrice(product.price)} / ea
                                </span>
                              </div>
                            </div>

                            {/* Inline Quantity Controls and Total */}
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center border border-border bg-charcoal">
                                <button
                                  onClick={() => updateQuantity(product.id, selectedSize, -1)}
                                  className="px-2.5 py-1 text-cyber-muted hover:text-white transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs px-2 text-cyber-white font-bold min-w-[20px] text-center">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(product.id, selectedSize, 1)}
                                  className="px-2.5 py-1 text-cyber-muted hover:text-white transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-mono text-sm font-bold text-cyber-white">
                                {formatPrice(product.price * quantity)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* 4. Footer, Promo Code & Checkout Summary */}
                {items.length > 0 && (
                  <div className="p-4 sm:p-5 border-t border-border bg-obsidian space-y-3.5">
                    
                    {/* Promo Code Input */}
                    <form onSubmit={handleApplyPromo} className="space-y-1">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="PROMO CODE (USE 'ZENJI10')"
                            className="w-full pl-8 pr-3 py-2 bg-charcoal border border-border text-xs font-mono text-cyber-white placeholder-cyber-muted uppercase focus:outline-none focus:border-crimson transition-all"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3 py-2 bg-charcoal border border-border hover:border-gold font-mono text-xs font-bold text-cyber-white transition-all"
                        >
                          APPLY
                        </button>
                      </div>

                      {promoSuccess && (
                        <p className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          PROMO 'ZENJI10' APPLIED: 10% DISCOUNT GRANTED
                        </p>
                      )}
                      {promoError && (
                        <p className="font-mono text-[10px] text-crimson">
                          {promoError}
                        </p>
                      )}
                    </form>

                    {/* Breakdown Summary */}
                    <div className="space-y-1.5 font-mono text-xs pt-1 border-t border-border/60">
                      <div className="flex justify-between text-cyber-muted">
                        <span>SUBTOTAL</span>
                        <span className="text-cyber-white">{formatPrice(rawSubtotal)}</span>
                      </div>

                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>VIP CIPHER DISCOUNT (10%)</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-cyber-muted">
                        <span>ESTIMATED TAX & DUTIES</span>
                        <span className="text-cyber-white">$0.00 (PRE-PAID)</span>
                      </div>

                      <div className="flex justify-between text-cyber-muted">
                        <span>DISPATCH TELEMETRY</span>
                        <span className={isFreeShippingUnlocked ? 'text-emerald-400 font-bold' : 'text-cyber-white'}>
                          {isFreeShippingUnlocked ? 'FREE EXPRESS' : '$15.00'}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-border flex justify-between text-base font-bold text-cyber-white">
                        <span>TOTAL PAYLOAD</span>
                        <span className="text-crimson font-mono text-lg">
                          {formatPrice(subtotal + (isFreeShippingUnlocked ? 0 : 15))}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleProceedToCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-4 bg-crimson hover:bg-crimson-glow text-white font-mono text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center gap-2 shadow-neon-crimson-lg transition-all duration-300 group disabled:opacity-50"
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>ENCRYPTING TRANSACTION...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>PROCEED TO CHECKOUT — {formatPrice(subtotal + (isFreeShippingUnlocked ? 0 : 15))}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-cyber-muted">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                      <span>256-BIT ENCRYPTED QUANTUM GATEWAY</span>
                    </div>

                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Simulated Checkout Confirmation Modal with Confetti */}
      <AnimatePresence>
        {orderCompleteModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-obsidian/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-charcoal border border-crimson p-6 sm:p-8 shadow-neon-crimson z-10 space-y-6"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-obsidian border border-crimson rounded-full flex items-center justify-center shadow-neon-crimson">
                  <PackageCheck className="w-8 h-8 text-crimson animate-pulse" />
                </div>

                <span className="font-japanese text-xs text-gold font-bold tracking-widest block">
                  注文完了 // PROTOCOL COMPLETE
                </span>

                <h3 className="font-heading font-black text-2xl sm:text-3xl text-cyber-white tracking-tight">
                  DROP 001 ALLOCATION SECURED
                </h3>

                <p className="font-mono text-xs text-cyber-muted max-w-sm mx-auto">
                  Your transaction has been written to the Neo-Tokyo dispatch ledger.
                </p>
              </div>

              {/* Order Manifest */}
              <div className="p-4 bg-obsidian border border-border space-y-2 font-mono text-xs">
                <div className="flex justify-between text-cyber-muted">
                  <span>DISPATCH MANIFEST ID:</span>
                  <span className="text-crimson font-bold">{orderNumber}</span>
                </div>
                <div className="flex justify-between text-cyber-muted">
                  <span>TOTAL AMOUNT PAID:</span>
                  <span className="text-cyber-white font-bold">{formatPrice(subtotal + (isFreeShippingUnlocked ? 0 : 15))}</span>
                </div>
                <div className="flex justify-between text-cyber-muted">
                  <span>ESTIMATED DISPATCH:</span>
                  <span className="text-gold">WITHIN 24 HOURS</span>
                </div>
              </div>

              <button
                onClick={handleFinishOrder}
                className="w-full py-3.5 bg-crimson hover:bg-crimson-glow text-white font-mono text-xs font-bold tracking-wider shadow-neon-crimson transition-all"
              >
                RETURN TO ARCHIVE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CartDrawer;
