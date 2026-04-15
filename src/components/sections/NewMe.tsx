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

        const textRect = textEl.getBoundingClientRect();
        const yaRect = yaEl.getBoundingClientRect();

        // Calculate the position of the 'я' character's center relative to the text element's top-left corner.
        // We'll use this as the transform-origin.
        const originX = (yaRect.left + yaRect.width / 2) - textRect.left;
        const originY = (yaRect.top + yaRect.height / 2) - textRect.top;
        
        // Set the transform origin on the text element
        gsap.set(textEl, { transformOrigin: `${originX}px ${originY}px` });

        // Add the scaling animation to the timeline.
        // It starts at 80% of the way through the scroll animation (position '0.8').
        tl.to(
          textEl,
          {
            scale: 50, // A large value to ensure text fills the screen
            ease: 'power1.in',
          },
          0.8
        );
      }, sectionEl);

      return () => {
        if (ctx.revert) {
          ctx.revert();
        }
      };
    }, 200); // Delay for rendering and layout calculation

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} id="new-me" className="relative bg-background" data-cursor="dark">
      <div className="h-screen w-full flex items-center justify-center overflow-hidden">
        <h2 ref={textRef} className="flex items-center justify-center gap-x-8 md:gap-x-12 font-display text-h2 text-cream uppercase">
          <div className="text-right">
            <div className="block">Раскрой свою</div>
            <div className="block">уникальность</div>
          </div>
          <div className="text-accent text-[1em] leading-none self-center">+</div>
          <div className="text-left">
            <div className="block">познакомься</div>
            <div className="block">с новым «<span ref={yaRef}>я</span>»</div>
          </div>
        </h2>
      </div>
    </section>
  );
};

export default NewMe;
