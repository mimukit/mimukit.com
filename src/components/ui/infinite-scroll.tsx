'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface InfiniteScrollProps {
  className?: string;
  duration?: number;
  direction?: 'normal' | 'reverse';
  containerColor?: string;
  showFade?: boolean;
  children: React.ReactNode;
  pauseOnHover?: boolean;
}

export function InfiniteScroll({
  className,
  duration = 15000,
  direction = 'normal',
  containerColor = '#ffffff',
  showFade = true,
  children,
  pauseOnHover = true,
}: InfiniteScrollProps) {
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateWidth = () => {
      const width = content.offsetWidth;
      setContentWidth(width);
      if (scrollerRef.current) {
        scrollerRef.current.style.setProperty('--scroll-distance', direction === 'normal' ? `-${width}px` : '0');
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [children, direction]);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.style.setProperty('--scroll-duration', `${duration}ms`);
    }
  }, [duration]);

  const handleMouseEnter = () => {
    if (!pauseOnHover) return;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover) return;
    setIsPaused(false);
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 flex-col gap-4 overflow-hidden py-3 sm:gap-2 sm:py-2',
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex overflow-hidden">
        <div
          ref={scrollerRef}
          className={cn('flex shrink-0 infinite-scroll-track', isPaused && 'paused')}
          style={{
            '--scroll-distance': direction === 'normal' ? `-${contentWidth}px` : '0',
          } as React.CSSProperties}
        >
          <div ref={contentRef} className="flex shrink-0">
            {children}
          </div>
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0">{children}</div>
        </div>
      </div>
      {showFade && (
        <div
          className="from-background to-background pointer-events-none absolute inset-0 bg-linear-to-r via-transparent sm:bg-gradient-to-r"
          style={{ '--container-color': containerColor } as React.CSSProperties}
        />
      )}
    </div>
  );
}