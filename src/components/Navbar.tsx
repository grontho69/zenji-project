'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Terminal, Radio } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { ZenjiLogo } from '@/components/ZenjiLogo';

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
    { label: 'SHOP ALL', href: '#catalog', categoryId: 'all', badge: '08' },
    { label: 'DROP 001', href: '#drop-001', categoryId: 'all', badge: 'LIVE' },
    { label: 'TEES', href: '#catalog', categoryId: 'tees' },
    { label: 'HOODIES', href: '#catalog', categoryId: 'hoodies' },
    { label: 'LOOKBOOK', href: '#lookbook' },
    { label: 'OUR STORY', href: '#our-story' },
  ];

  const handleNavClick = (categoryId?: string) => {
    if (categoryId && onCategorySelect) {
      onCategorySelect(categoryId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-obsidian/85 backdrop-blur-md transition-all">
      {/* Top telemetry micro-bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 text-[11px] font-mono text-cyber-muted border-b border-border/40 bg-charcoal/40">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-crimson" />
          <span>ZENJI ARCHIVE SYSTEM // TOKYO & AUSTRALIA</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyber-gray">LOCATION: NEO-TOKYO // GLOBAL</span>
          <span className="text-gold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            NO RESTOCKS. EVER.
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* Left: Official ZENJI Logo Branding */}
        <div className="flex items-center">
          <Link href="/" className="group flex items-center">
            <ZenjiLogo variant="combined" />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleNavClick(link.categoryId)}
              className="relative px-3 py-2 text-xs lg:text-sm font-mono tracking-wider text-cyber-gray hover:text-cyber-white hover:bg-charcoal/80 border border-transparent hover:border-border transition-all duration-200"
            >
              <span className="flex items-center gap-1.5">
                {link.label}
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 border ${
                      link.badge === 'LIVE'
                        ? 'border-crimson/50 text-crimson bg-crimson/10 shadow-neon-crimson'
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
        </div>
      )}
    </header>
  );
}

export default Navbar;
