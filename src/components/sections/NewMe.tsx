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
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scaleTargetEl = scaleTargetRef.current;
    const logoEl = logoRef.current;
    const sectionEl = sectionRef.current;
    const pinContainerEl = pinContainerRef.current;
    const imageContainerEl = imageContainerRef.current;
    if (!scaleTargetEl || !logoEl || !sectionEl || !pinContainerEl || !imageContainerEl) return;

    let ctx: gsap.Context;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
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

            // Calculate origins for both elements relative to the logo's center
            const logoRect = logoEl.getBoundingClientRect();
            
            // For the text container
            const scaleTargetRect = scaleTargetEl.getBoundingClientRect();
            const originXText = (logoRect.left - scaleTargetRect.left) + (logoRect.width / 2);
            const originYText = (logoRect.top - scaleTargetRect.top) + (logoRect.height / 2);
            gsap.set(scaleTargetEl, { transformOrigin: `${originXText}px ${originYText}px` });

            // For the image container
            const imageContainerRect = imageContainerEl.getBoundingClientRect();
            const originXImage = (logoRect.left - imageContainerRect.left) + (logoRect.width / 2);
            const originYImage = (logoRect.top - imageContainerRect.top) + (logoRect.height / 2);
            gsap.set(imageContainerEl, { transformOrigin: `${originXImage}px ${originYImage}px` });

            tl.to(
              [scaleTargetEl, imageContainerEl],
              {
                scale: 80,
                ease: 'power1.in',
              }
            );
        });
      }, sectionEl);
    }, 200);

    return () => {
      clearTimeout(timer);
      if (ctx) {
        ctx.revert();
      }
    };
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
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }} className="text-left leading-none font-display uppercase">
                Задача KA<span ref={logoRef}>T</span>SO:
            </h2>
            <p 
                className="text-center mt-12 whitespace-pre-line font-display uppercase"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1.2 }}
            >
                {'Раскрыть вашу уникальность и \nпознакомить с вашим новым «я»'}
            </p>
        </div>
        
        <div ref={imageContainerRef} className="absolute bottom-0 right-0 w-[40vw] h-[80vh] max-w-[500px] z-0 pointer-events-none">
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
