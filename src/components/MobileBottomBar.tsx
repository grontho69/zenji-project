'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, ShoppingBag, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export function MobileBottomBar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { toggleCart, getItemCount } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;

  const navItems = [
    {
      label: 'HOME',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'ARCHIVE',
      href: '/shop',
      icon: Compass,
      isActive: pathname === '/shop',
    },
  ];

  return (
    <nav 
      aria-label="Mobile navigation bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-obsidian/92 backdrop-blur-xl border-t border-border/80 px-4 py-2 pb-safe"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Navigation links */}
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-colors relative ${
                item.isActive ? 'text-crimson font-bold' : 'text-cyber-gray hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="font-mono text-[10px] tracking-wider">{item.label}</span>
              {item.isActive && (
                <span className="absolute -bottom-1 w-6 h-0.5 bg-crimson shadow-neon-crimson" />
              )}
            </Link>
          );
        })}

        {/* Drop 001 shortcut */}
        <Link
          href="/#catalog"
          className="flex flex-col items-center justify-center py-1 px-3 text-gold hover:text-white transition-colors"
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="font-mono text-[10px] tracking-wider">DROP 001</span>
        </Link>

        {/* Interactive Bag Trigger */}
        <button
          type="button"
          onClick={toggleCart}
          aria-label="Open Cart Bag"
          className="flex flex-col items-center justify-center py-1 px-3 text-cyber-white hover:text-crimson transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 flex items-center justify-center font-mono text-[10px] font-bold bg-crimson text-white rounded-none shadow-neon-crimson animate-pulse">
                {itemCount}
              </span>
            )}
          </div>
          <span className="font-mono text-[10px] tracking-wider">BAG</span>
        </button>
      </div>
    </nav>
  );
}

export default MobileBottomBar;
