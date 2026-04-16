'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const NewMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scaleTargetRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scaleTargetEl = scaleTargetRef.current;
    const logoEl = logoRef.current;
    const sectionEl = sectionRef.current;
    const pinContainerEl = pinContainerRef.current;
    if (!scaleTargetEl || !logoEl || !sectionEl || !pinContainerEl) return;

    // Use a timeout to ensure fonts are loaded and dimensions are correct
    const timer = setTimeout(() => {
      let ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pin: pinContainerEl,
                invalidateOnRefresh: true,
              },
            });

            const scaleTargetRect = scaleTargetEl.getBoundingClientRect();
            const logoRect = logoEl.getBoundingClientRect();

            // Calculate the position of the logo's center relative to the scaling element's top-left corner.
            const originX = (logoRect.left + logoRect.width / 2) - scaleTargetRect.left;
            const originY = (logoRect.top + logoRect.height / 2) - scaleTargetRect.top;
            
            gsap.set(scaleTargetEl, { transformOrigin: `${originX}px ${originY}px` });

            // Add the scaling animation to the timeline.
            // It starts immediately.
            tl.to(
              scaleTargetEl,
              {
                scale: 50, // A large value to ensure text fills the screen
                ease: 'power1.in',
              }
            );
        });
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
    <section
      ref={sectionRef}
      id="new-me"
      className="relative md:h-[300vh]"
      style={{ backgroundColor: '#66686b' }}
      data-cursor="dark"
    >
      <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: 'url(https://i.ibb.co/zWNnhBMd/concrete-wall-2-1.png)',
            backgroundRepeat: 'repeat',
            opacity: 0.4,
            mixBlendMode: 'overlay',
          }}></div>
      <div ref={pinContainerRef} className="h-screen w-full flex items-center justify-center overflow-hidden md:sticky md:top-0 relative">
        <div ref={scaleTargetRef} className="relative z-10 w-full max-w-5xl mx-auto px-4 text-cream">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }} className="leading-none font-display uppercase">
                Задача KA<span ref={logoRef}>T</span>SO:
            </h2>
            <p 
                className="text-center mt-12 whitespace-pre-line font-display uppercase"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1.2 }}
            >
                {'Раскрыть вашу уникальность и \nпознакомить с вашим новым «я»'}
            </p>
        </div>
        
        <div className="absolute bottom-0 right-0 w-[40vw] h-[80vh] max-w-[500px] z-0 pointer-events-none">
             <Image
                src="https://i.ibb.co/Y71XvhtZ/Pngtree-pampas-grass-isolated-on-a-21120510.png"
                alt="Pampas grass decoration"
                fill
                style={{ objectFit: 'contain', objectPosition: 'bottom right' }}
            />
        </div>

      </div>
    </section>
  );
};

export default NewMe;
