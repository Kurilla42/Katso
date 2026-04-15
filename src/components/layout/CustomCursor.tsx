'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design-tokens';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEligible, setIsEligible] = useState(false);
  const [cursorMode, setCursorMode] = useState('default');
  const [cursorTheme, setCursorTheme] = useState('dark');
  const [isVisible, setIsVisible] = useState(false);

  // GSAP quickTo for smooth movement
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    // 1. Feature detection
    const matchMedia = window.matchMedia('(pointer: fine)');
    const hasFinePointer = matchMedia.matches;
    const hasNoTouch = navigator.maxTouchPoints === 0;

    if (hasFinePointer && hasNoTouch) {
      setIsEligible(true);
    } else {
      return;
    }

    // Add class to hide native cursor
    document.documentElement.classList.add('custom-cursor-active');

    if (cursorRef.current) {
      xTo.current = gsap.quickTo(cursorRef.current, 'x', { duration: 0.15, ease: 'power2.out' });
      yTo.current = gsap.quickTo(cursorRef.current, 'y', { duration: 0.15, ease: 'power2.out' });
    }

    let lastElement: Element | null = null;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (xTo.current && yTo.current) {
        xTo.current(clientX);
        yTo.current(clientY);
      }
      
      if (!isVisible && clientX > 1 && clientY > 1) {
        setIsVisible(true);
      }

      // Throttle element checking
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const element = document.elementFromPoint(clientX, clientY);
        if (element === lastElement) return;
        lastElement = element;

        if (!element) return;

        // Check for hover state
        const hoverTarget = element.closest<HTMLElement>('[data-cursor-hover]');
        setCursorMode(hoverTarget?.dataset.cursorHover || 'default');
        
        // Check for theme
        const themeTarget = element.closest<HTMLElement>('[data-cursor]');
        setCursorTheme(themeTarget?.dataset.cursor || 'dark');
      });
    };
    
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.classList.remove('custom-cursor-active');
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isEligible) {
    return null;
  }

  const isHovered = cursorMode !== 'default';
  const themeColor = cursorTheme === 'dark' ? colors.cream : colors.walnut;

  return (
    <div
      ref={cursorRef}
      className={cn(
        'fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-[width,height] duration-400 ease-reveal flex items-center justify-center font-display',
        'rounded-full',
        isVisible ? 'opacity-100' : 'opacity-0',
        // Size & Style
        isHovered ? 'w-12 h-12 bg-transparent' : 'w-3 h-3',
      )}
      style={{
        backgroundColor: isHovered ? 'transparent' : themeColor,
        borderColor: isHovered ? colors.accent : themeColor,
        borderWidth: isHovered ? '2px' : '0px',
        color: isHovered ? colors.accent : themeColor,
      }}
    >
      <span className={cn(
          "transition-opacity duration-200 text-2xl",
          isHovered ? 'opacity-100' : 'opacity-0'
        )}>
          {cursorMode === 'link' && '↗'}
          {cursorMode === 'drag' && '←→'}
      </span>
    </div>
  );
};

export default CustomCursor;
