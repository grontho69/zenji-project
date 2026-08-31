'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Terminal, Radio } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface NavbarProps {
  onCategorySelect?: (categoryId: string) => void;
}

export function Navbar({ onCategorySelect }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { toggleCart, getItemCount } = useCartStore();
  const itemCount = mounted ? getItemCount() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: 'SHOP ALL', href: '#catalog', categoryId: 'all', badge: '06' },
    { label: 'DROP 001', href: '#drop-001', categoryId: 'all', badge: 'LIVE' },
    { label: 'HOODIES', href: '#catalog', categoryId: 'hoodies' },
    { label: 'HEAVY TEES', href: '#catalog', categoryId: 'tees' },
    { label: 'ABOUT ARCHIVE', href: '#archive' },
  ];

  const handleNavClick = (categoryId?: string) => {
    if (categoryId && onCategorySelect) {
      onCategorySelect(categoryId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-obsidian/85 backdrop-blur-md transition-all">
      {/* Top micro-bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 text-[11px] font-mono text-cyber-muted border-b border-border/40 bg-charcoal/40">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-crimson" />
          <span>ZENJI SYSTEM V2.6 // CYBERPUNK ARCHIVE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyber-gray">LOCATION: NEO-TOKYO // GLOBAL</span>
          <span className="text-gold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            SERVER SECURE
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Left: Kanji Brand Badge + Bold Logo */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/" className="group flex items-center gap-3">
            {/* Kanji Emblem */}
            <div className="w-9 h-9 md:w-11 md:h-11 bg-charcoal border border-border group-hover:border-crimson group-hover:shadow-neon-crimson transition-all duration-300 flex items-center justify-center relative overflow-hidden">
              <span className="font-japanese font-black text-lg md:text-xl text-cyber-white group-hover:text-crimson transition-colors">
                禅
              </span>
              <div className="absolute top-0 right-0 w-2 h-2 bg-crimson/80" />
            </div>

            {/* Brand Wordmark */}
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-widest text-xl md:text-2xl text-cyber-white group-hover:text-crimson transition-colors">
                ZENJI
              </span>
              <span className="font-mono text-[9px] tracking-cyber text-cyber-muted -mt-1 group-hover:text-cyber-gray">
                ゼンジ // ARCHIVE
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleNavClick(link.categoryId)}
              className="relative px-3 py-2 text-xs lg:text-sm font-mono tracking-wider text-cyber-gray hover:text-cyber-white hover:bg-charcoal/80 border border-transparent hover:border-border transition-all duration-200 group"
            >
              <span className="flex items-center gap-1.5">
                {link.label}
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 border ${
                      link.badge === 'LIVE'
                        ? 'border-crimson/50 text-crimson bg-crimson/10'
                        : 'border-border text-cyber-muted'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </span>
            </a>
          ))}
        </nav>

        {/* Right: Drop Status Indicator + Bag Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Drop Active Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-charcoal/80 border border-border">
            <Radio className="w-3.5 h-3.5 text-crimson animate-pulse" />
            <span className="font-mono text-[11px] tracking-wider text-cyber-gray">
              DROP <span className="text-crimson font-bold">001</span> ACTIVE
            </span>
          </div>

          {/* Interactive Bag Trigger with Live Counter */}
          <button
            onClick={toggleCart}
            aria-label="Open shopping bag"
            className="relative flex items-center gap-2 px-3.5 py-2 bg-charcoal border border-border hover:border-crimson hover:shadow-neon-crimson text-cyber-white transition-all duration-300 group"
          >
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 group-hover:text-crimson transition-colors" />
            <span className="font-mono text-xs font-semibold tracking-wider hidden sm:inline">
              BAG
            </span>

            {/* Live Badge Counter */}
            <span
              className={`min-w-[20px] h-5 px-1.5 flex items-center justify-center font-mono text-[11px] font-bold rounded-none transition-all ${
                itemCount > 0
                  ? 'bg-crimson text-white shadow-neon-crimson scale-100'
                  : 'bg-border text-cyber-muted scale-90'
              }`}
            >
              {itemCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-cyber-gray hover:text-cyber-white bg-charcoal border border-border focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-obsidian/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/50 text-[11px] font-mono text-cyber-muted">
            <span>NAVIGATION // メニュー</span>
            <span className="text-crimson">DROP 001 LIVE</span>
          </div>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.categoryId)}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-mono text-cyber-light hover:bg-charcoal hover:text-crimson border border-transparent hover:border-border transition-all"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 border border-crimson/50 text-crimson bg-crimson/10">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-border/50 flex items-center justify-between font-mono text-xs text-cyber-muted">
            <span>WORLDWIDE EXPRESS DISPATCH</span>
            <span className="text-gold">100% AUTHENTIC</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
