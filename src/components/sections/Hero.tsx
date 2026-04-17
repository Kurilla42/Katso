'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const maskedTextRef = useRef<SVGTextElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const maskRectRef = useRef<SVGRectElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=250%',
            scrub: 1,
            pin: pinRef.current,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: Animate the text mask to expand
        tl.to(
          maskedTextRef.current,
          {
            attr: { 'font-size': '80vw', 'letter-spacing': '5vw' },
            ease: 'power1.in',
            duration: 4,
          },
          0
        );

        // Phase 2: Reveal the video by making the mask's rect white
        tl.to(
          maskRectRef.current,
          {
            attr: { fill: 'white' },
            ease: 'power1.inOut',
            duration: 3,
          },
          3
        );

        // Phase 2: Fade in the content on top
        tl.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            duration: 3,
          },
          3.5
        );
        
        // Refresh ScrollTrigger after fonts are loaded to prevent positioning jumps
        document.fonts.ready.then(() => {
            ScrollTrigger.refresh();
        });
      });
      
      mm.add("(max-width: 767px)", () => {
        // Mobile fallback: Show final content immediately, no complex animation.
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        gsap.set(maskedTextRef.current, { 'font-size': 0, opacity: 0 }); // Hide masked text
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative md:h-[350vh]" style={{ backgroundColor: '#2D2D2D' }}>
      <div ref={pinRef} className="h-screen w-full md:sticky top-0 overflow-hidden">
        
        <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
                backgroundImage: 'url(https://i.ibb.co/zWNnhBMd/concrete-wall-2-1.png)',
                backgroundRepeat: 'repeat',
                opacity: 0.7,
                mixBlendMode: 'overlay',
            }}>
        </div>
        
        <svg className="absolute w-0 h-0">
          <defs>
            <mask id="hero-mask">
              <rect ref={maskRectRef} width="100%" height="100%" fill="black" />
              <text ref={maskedTextRef} x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="25vw" fontFamily="Playfair Display" fontWeight="700">
                KATSO
              </text>
            </mask>
          </defs>
        </svg>

        <div className="h-full w-full" style={{ mask: 'url(#hero-mask)', WebkitMask: 'url(#hero-mask)' }}>
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline poster="https://i.ibb.co/cKjhxFRw/2026-04-16-20-21-13.png">
            <source src="/video/Hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div ref={contentRef} className="absolute inset-0 z-10 opacity-0 flex items-center justify-center">
            <div className="text-center text-cream max-w-3xl mx-auto px-4">
                <h1 className="font-display leading-none" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                    Красота, которую видно
                </h1>
                <p className="font-lora text-nude mt-4" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}>
                    Премиум-салон в центре Ижевска. Kérastase · Olaplex · La Biosthétique · мастера с обучением в Лондоне и Париже
                </p>
                <div className="flex justify-center gap-4 mt-8">
                    <a href="#" className="bg-accent text-background font-display uppercase tracking-display py-3 px-6 rounded-sm transition-transform hover:scale-105" data-cursor-hover="link">
                        Записаться онлайн
                    </a>
                    <a href="#" className="border border-nude text-nude font-display uppercase tracking-display py-3 px-6 rounded-sm transition-transform hover:scale-105" data-cursor-hover="link">
                        Смотреть работы
                    </a>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
