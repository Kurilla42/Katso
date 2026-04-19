'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ isLoaded }: { isLoaded: boolean }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const lineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      // Animate fill then fade out
      gsap.to(fillRef.current, {
        width: '100%',
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(preloaderRef.current, {
            autoAlpha: 0, // Fades out and sets visibility: hidden
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });
    }
  }, [isLoaded]);

  // Dynamic angle calculation for the line.
  useEffect(() => {
    const lineContainer = lineContainerRef.current;
    if (!lineContainer) return;

    const setAngle = () => {
      const angle = Math.atan(window.innerHeight / window.innerWidth) * (180 / Math.PI);
      gsap.set(lineContainer, { rotation: angle });
    };

    setAngle();
    window.addEventListener('resize', setAngle);
    return () => window.removeEventListener('resize', setAngle);
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-[#2D2D2D]"
    >
      {/* Background textures */}
      <div className="concrete-texture"></div>
      <div className="paper-texture absolute inset-0 w-full h-full pointer-events-none"></div>

      {/* Progress line */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          ref={lineContainerRef}
          className="w-[150vmax] h-px bg-white"
        >
          <div ref={fillRef} className="w-0 h-full bg-[#2A5C56]"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
