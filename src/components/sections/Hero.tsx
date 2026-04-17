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
  const svgRef = useRef<SVGSVGElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context;

    // We must wait for the webfont to be loaded before initializing GSAP
    // to prevent positioning bugs.
    document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
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

            // Parallax effect for the video
            tl.to(
                videoRef.current,
                {
                    yPercent: 10,
                    ease: 'none',
                },
                0
            );

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
            },
            {
                opacity: 1,
                ease: 'power1.out',
                duration: 3,
            },
            3.5
            );
        });
        
        mm.add("(max-width: 767px)", () => {
            // Mobile fallback: Show final content immediately, no complex animation.
            gsap.set(contentRef.current, { opacity: 1, y: 0 });
            gsap.set(maskedTextRef.current, { 'font-size': 0, opacity: 0 }); // Hide masked text
        });

        }, sectionRef);
    });

    return () => {
        if (ctx) {
            ctx.revert();
        }
    };
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
        <div className="paper-texture"></div>
        
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none">
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
           <div className="relative h-full w-full overflow-hidden">
             <video ref={videoRef} className="absolute top-[-10%] left-0 w-full h-[120%] object-cover" autoPlay loop muted playsInline poster="https://i.ibb.co/cKjhxFRw/2026-04-16-20-21-13.png">
               <source src="/video/Hero-video.mp4" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-black/20"></div>
           </div>
        </div>

        <div ref={contentRef} className="absolute inset-0 z-10 opacity-0 flex items-end justify-center">
             <div className="text-center" style={{ paddingBottom: '5vh' }}>
                <h1 className="font-display leading-none" style={{ fontSize: '6vw', color: '#F0EBE3' }}>
                    Красота, которую видно
                </h1>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
