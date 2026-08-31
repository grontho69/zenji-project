'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Zap, Globe, Terminal, Flame } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 600);
  };

  return (
    <footer id="archive" className="w-full bg-obsidian border-t border-border mt-20 relative overflow-hidden">
      {/* Subtle background cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      {/* Top Banner: Drop 002 Teaser & Live Countdown */}
      <div className="border-b border-border bg-charcoal/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-crimson animate-pulse" />
            <div>
              <p className="font-mono text-xs text-cyber-muted tracking-wider">UPCOMING ARCHIVE DISPATCH</p>
              <h4 className="font-heading font-bold text-sm sm:text-base text-cyber-white tracking-wide flex items-center gap-2">
                DROP 002 // CYBERNETIC SHADOWS
                <span className="text-[10px] font-mono px-2 py-0.5 border border-gold/40 text-gold bg-gold/10">
                  FALL 2026
                </span>
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 bg-obsidian border border-border px-3 py-2 text-cyber-light">
              <Flame className="w-3.5 h-3.5 text-crimson" />
              <span>STOCK ALLOCATION: <strong className="text-crimson">78% ALLOCATED</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-obsidian border border-border px-3 py-2 text-cyber-gray">
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>GLOBAL TAXES INCLUDED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-charcoal border border-crimson flex items-center justify-center shadow-neon-crimson">
                <span className="font-japanese font-black text-xl text-cyber-white">禅</span>
              </div>
              <span className="font-heading font-black tracking-widest text-2xl text-cyber-white">
                ZENJI <span className="text-crimson">//</span> ゼンジ
              </span>
            </div>

            <p className="text-cyber-gray text-xs sm:text-sm leading-relaxed max-w-md font-sans">
              High-specification dystopian streetwear synthesized at the intersection of Tokyo cyberpunk subcultures, heavyweight organic textiles, and military-grade hardware ergonomics.
            </p>

            <div className="pt-2 font-mono text-[11px] text-cyber-muted space-y-1">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-crimson" />
                <span>SPEC: 460–520 GSM CUSTOM TERRY & RIPSTOP</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>AUTHENTICITY GUARANTEED VIA NFC CRYPTO TAG</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-mono text-xs font-bold text-cyber-white tracking-widest uppercase border-b border-border/60 pb-2">
              ARCHIVE // コレクション
            </h5>
            <ul className="space-y-2 text-xs font-mono text-cyber-gray">
              <li><a href="#catalog" className="hover:text-crimson transition-colors">DROP 001 CATALOG</a></li>
              <li><a href="#catalog" className="hover:text-crimson transition-colors">HEAVYWEIGHT HOODIES</a></li>
              <li><a href="#catalog" className="hover:text-crimson transition-colors">BOXY 320 GSM TEES</a></li>
              <li><a href="#catalog" className="hover:text-crimson transition-colors">TACTICAL CARGOS</a></li>
              <li><a href="#catalog" className="hover:text-crimson transition-colors">JACQUARD KNITWEAR</a></li>
            </ul>
          </div>

          {/* Customer Care / Specs */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-mono text-xs font-bold text-cyber-white tracking-widest uppercase border-b border-border/60 pb-2">
              DISPATCH // ガイド
            </h5>
            <ul className="space-y-2 text-xs font-mono text-cyber-gray">
              <li><span className="hover:text-cyber-white cursor-pointer transition-colors">SIZE SPEC MATRIX</span></li>
              <li><span className="hover:text-cyber-white cursor-pointer transition-colors">GARMENT CARE LAB</span></li>
              <li><span className="hover:text-cyber-white cursor-pointer transition-colors">WORLDWIDE SHIPPING</span></li>
              <li><span className="hover:text-cyber-white cursor-pointer transition-colors">AUTHENTICATION HUB</span></li>
              <li><span className="hover:text-cyber-white cursor-pointer transition-colors">RETURNS & EXCHANGES</span></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <h5 className="font-mono text-xs font-bold text-cyber-white tracking-widest uppercase">
                NEURAL PROTOCOL // 受信登録
              </h5>
              <p className="text-cyber-gray text-xs mt-1">
                Subscribe for private drop keys, password-protected warehouse clearances, and GSM spec breakdowns.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3 bg-charcoal border border-crimson/80 flex items-center gap-3 text-cyber-white">
                <div className="w-6 h-6 rounded-full bg-crimson/20 border border-crimson flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-crimson" />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-crimson">ACCESS KEY DISPATCHED</p>
                  <p className="font-mono text-[10px] text-cyber-muted">Check your inbox for VIP Drop access.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@domain.com"
                    className="w-full bg-charcoal border border-border px-3.5 py-2.5 text-xs font-mono text-cyber-white placeholder-cyber-muted focus:outline-none focus:border-crimson transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 p-2 bg-crimson hover:bg-crimson-glow text-white transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyber-muted">
                  <Zap className="w-3 h-3 text-gold" />
                  <span>Zero spam. Direct encrypted drops only.</span>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Japanese Legal */}
        <div className="mt-14 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-cyber-muted">
          <div>
            © 2026 ZENJI APPAREL RESEARCH CORP. // 全著作権所有 // TOKYO, JP
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-cyber-light cursor-pointer transition-colors">TERMS OF TELEMETRY</span>
            <span className="hover:text-cyber-light cursor-pointer transition-colors">PRIVACY MATRIX</span>
            <span className="text-crimson font-bold">SECURE PROTOCOL 256-BIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
