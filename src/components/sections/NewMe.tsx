'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NewMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const yaRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const textEl = textRef.current;
    const yaEl = yaRef.current;
    const sectionEl = sectionRef.current;
    if (!textEl || !yaEl || !sectionEl) return;

    // Use a timeout to ensure fonts are loaded and dimensions are correct
    const timer = setTimeout(() => {
      let ctx = gsap.context(() => {
        // This timeline will be controlled by the scroll position
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: '+=200%', // Animation plays out over a scroll distance of 2x viewport height
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        const yaRect = yaEl.getBoundingClientRect();
        const textRect = textEl.getBoundingClientRect();
        
        // Calculate the x offset needed to center the 'я' character.
        const xShift = -((yaRect.left + yaRect.width / 2) - (textRect.left + textRect.width / 2));
        
        // Animation starts after 80% of the scroll duration.
        // We create a "dead zone" for the first 80% of the scroll.
        tl.to(textEl, {
            x: xShift,
            scale: 35, // A large value to ensure text fills the screen
            ease: 'power1.in',
          }, '+=0.8'); // Start animation at the 80% mark of the timeline duration.

      }, sectionEl);

      return () => {
        if (ctx.revert) {
          ctx.revert();
        }
      };
    }, 200); // Delay for rendering

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} id="new-me" className="relative bg-background" data-cursor="dark">
      <div className="h-screen w-full flex items-center justify-center overflow-hidden">
        <h2 ref={textRef} className="font-display text-hero text-cream uppercase whitespace-nowrap">
          Познакомся с новым «<span ref={yaRef}>я</span>»
        </h2>
      </div>
    </section>
  );
};

export default NewMe;
