'use client';

import React from 'react';
import CustomCursor from './CustomCursor';

const FixedUI = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />
      {/* Top-left logo mark */}
      <button
        onClick={scrollToTop}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 w-10 h-10 rounded-full border-2 border-textDark flex items-center justify-center bg-transparent cursor-pointer group transition-colors hover:bg-textDark/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-textDark focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Scroll to top"
        data-cursor-hover="link"
      >
        <span className="block w-1.5 h-1.5 bg-textDark rounded-full"></span>
      </button>

      {/* Right edge tag */}
      <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50 bg-background text-textDark rounded-full px-2 py-4 flex flex-col items-center justify-center shadow-lg">
        <span className="font-display text-lg leading-none">K.</span>
        <span
          className="font-body text-xs uppercase mt-2 tracking-widest"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          STUDIO
        </span>
      </div>

      {/* Top-right menu placeholder */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 hidden md:block" data-cursor-hover="link">
        <span className="caption text-textDark">МЕНЮ</span>
      </div>
    </>
  );
};

export default FixedUI;
