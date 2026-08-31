'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'chars';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  type = 'words',
}: TextRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  if (type === 'chars') {
    const chars = text.split('');
    return (
      <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
        {chars.map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + index * 0.02,
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  }

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            initial={{ y: '110%', opacity: 0, rotate: 2 }}
            animate={isInView ? { y: '0%', opacity: 1, rotate: 0 } : { y: '110%', opacity: 0, rotate: 2 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + index * 0.05,
            }}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default TextReveal;
