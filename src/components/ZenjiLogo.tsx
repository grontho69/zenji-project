'use client';

import React from 'react';
import Image from 'next/image';

interface ZenjiLogoProps {
  variant?: 'full' | 'icon' | 'combined';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  glow?: boolean;
}

export function ZenjiLogo({
  variant = 'combined',
  className = '',
  size = 'md',
  glow = false,
}: ZenjiLogoProps) {
  // Height & dimensions mapping
  const sizeMap = {
    sm: {
      icon: 'w-6 h-6',
      full: 'h-4 w-auto',
      text: 'text-xs',
    },
    md: {
      icon: 'w-8 h-8',
      full: 'h-6 w-auto',
      text: 'text-sm',
    },
    lg: {
      icon: 'w-10 h-10',
      full: 'h-8 w-auto',
      text: 'text-base',
    },
    xl: {
      icon: 'w-14 h-14',
      full: 'h-11 w-auto',
      text: 'text-xl',
    },
    hero: {
      icon: 'w-20 h-20 sm:w-28 sm:h-28',
      full: 'h-14 sm:h-20 w-auto',
      text: 'text-2xl',
    },
  };

  const currentSize = sizeMap[size];

  if (variant === 'icon') {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 ${currentSize.icon} ${
          glow ? 'drop-shadow-[0_0_12px_rgba(225,29,72,0.6)]' : ''
        } ${className}`}
      >
        <img
          src="/images/zenji-icon.png"
          alt="ZENJI ZJ Monogram Logo"
          className="w-full h-full object-contain filter invert contrast-150 transition-all duration-300 group-hover:brightness-125"
        />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div
        className={`relative flex items-center ${
          glow ? 'drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]' : ''
        } ${className}`}
      >
        <img
          src="/images/zenji-logo.png"
          alt="ZENJI Streetwear Wordmark"
          className={`${currentSize.full} object-contain filter invert contrast-150 transition-all duration-300 group-hover:brightness-125`}
        />
      </div>
    );
  }

  // Combined: ZJ Monogram + Full Wordmark
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      {/* ZJ Monogram Emblem in Cyber Box */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-charcoal border border-border group-hover:border-crimson group-hover:shadow-neon-crimson transition-all duration-300 flex items-center justify-center p-1 relative overflow-hidden shrink-0">
        <img
          src="/images/zenji-icon.png"
          alt="ZENJI ZJ Icon"
          className="w-full h-full object-contain filter invert contrast-150 group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-crimson" />
      </div>

      {/* Full Wordmark Logo */}
      <div className="flex flex-col">
        <img
          src="/images/zenji-logo.png"
          alt="ZENJI Wordmark"
          className="h-5 sm:h-6 w-auto object-contain filter invert contrast-150 group-hover:brightness-125 transition-all"
        />
        <span className="font-mono text-[8px] sm:text-[9px] tracking-cyber text-cyber-muted -mt-0.5 group-hover:text-crimson transition-colors">
          ゼンジ // ARCHIVE
        </span>
      </div>
    </div>
  );
}

export default ZenjiLogo;
