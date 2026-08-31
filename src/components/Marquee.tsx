'use client';

import React from 'react';

interface MarqueeProps {
  text?: string;
  speed?: 'normal' | 'fast' | 'slow';
  className?: string;
  reverse?: boolean;
}

export function Marquee({
  text = "ZENJI // DROP 001 IS LIVE ◆ HEAVYWEIGHT 460 GSM COTTON ◆ LIMITED ARCHIVE RELEASE ◆ FREE WORLDWIDE SHIPPING OVER $120",
  speed = "normal",
  className = "",
  reverse = false,
}: MarqueeProps) {
  const speedClass = {
    slow: 'duration-[40s]',
    normal: 'duration-[26s]',
    fast: 'duration-[16s]',
  }[speed];

  const items = Array.from({ length: 4 });

  return (
    <div
      className={`relative w-full overflow-hidden bg-obsidian border-y border-border py-2.5 flex items-center select-none group ${className}`}
      aria-label="Announcement marquee"
    >
      {/* Subtle edge fade gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-obsidian to-transparent" />

      {/* Marquee Track */}
      <div
        className={`flex w-fit shrink-0 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] ${speedClass} ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {items.map((_, idx) => (
          <div key={`marquee-1-${idx}`} className="flex items-center space-x-6 mx-4">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-cyber-light flex items-center gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              <span>ZENJI // <span className="text-crimson font-bold">DROP 001</span> IS LIVE</span>
              <span className="text-gold">◆</span>
              <span className="text-cyber-gray">HEAVYWEIGHT 460+ GSM COTTON</span>
              <span className="text-crimson">◆</span>
              <span className="text-cyber-light">LIMITED ARCHIVE RELEASE</span>
              <span className="text-gold">◆</span>
              <span className="text-cyber-gray">FREE WORLDWIDE SHIPPING OVER $120</span>
              <span className="text-crimson font-mono text-[10px] px-1.5 py-0.5 border border-crimson/40 bg-crimson/10 ml-2">
                ゼンジ・2026
              </span>
            </span>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={`flex w-fit shrink-0 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] ${speedClass} ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {items.map((_, idx) => (
          <div key={`marquee-2-${idx}`} className="flex items-center space-x-6 mx-4">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-cyber-light flex items-center gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              <span>ZENJI // <span className="text-crimson font-bold">DROP 001</span> IS LIVE</span>
              <span className="text-gold">◆</span>
              <span className="text-cyber-gray">HEAVYWEIGHT 460+ GSM COTTON</span>
              <span className="text-crimson">◆</span>
              <span className="text-cyber-light">LIMITED ARCHIVE RELEASE</span>
              <span className="text-gold">◆</span>
              <span className="text-cyber-gray">FREE WORLDWIDE SHIPPING OVER $120</span>
              <span className="text-crimson font-mono text-[10px] px-1.5 py-0.5 border border-crimson/40 bg-crimson/10 ml-2">
                ゼンジ・2026
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
