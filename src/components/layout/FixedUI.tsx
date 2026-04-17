'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './CustomCursor';

const FixedUI = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const menuElement = menuRef.current;
    if (!menuElement) return;

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const st = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      onToggle: self => {
        if (menuElement.dataset) {
            menuElement.dataset.heroVisible = String(self.isActive);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />
      {/* Top-left logo mark */}
      <button
        onClick={scrollToTop}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 w-10 h-10 rounded-full border border-cream flex items-center justify-center bg-transparent cursor-pointer group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Scroll to top"
        data-cursor-hover="link"
      >
        <span className="block w-1.5 h-1.5 bg-accent rounded-full transition-transform duration-300 ease-in-out group-hover:scale-[3.5]"></span>
      </button>

      {/* Top-right menu placeholder */}
      <div
        ref={menuRef}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 hidden md:flex items-center gap-6"
      >
        <a href="#" className="caption text-nude hover:text-accent transition-colors" data-cursor-hover="link">
          ЗАПИСАТЬСЯ ОНЛАЙН
        </a>
        <div data-cursor-hover="link">
          <span className="caption text-cream data-[hero-visible=true]:text-nude hover:text-accent transition-colors">
            МЕНЮ
          </span>
        </div>
      </div>
    </>
  );
};

export default FixedUI;
