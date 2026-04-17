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
  const topLeftTextRef = useRef<HTMLHeadingElement>(null);
  const bottomRightTextRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context;

    document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            const topLeftEl = topLeftTextRef.current;
            const bottomRightEl = bottomRightTextRef.current;
            const pinEl = pinRef.current;

            if (pinEl && topLeftEl && bottomRightEl) {
                const fitText = () => {
                    const containerWidth = pinEl.offsetWidth;
                    
                    const currentFontSizeTL = parseFloat(window.getComputedStyle(topLeftEl).fontSize) || 16;
                    const scaleTL = (containerWidth * 0.45) / topLeftEl.scrollWidth;
                    gsap.set(topLeftEl, { fontSize: currentFontSizeTL * scaleTL });

                    const currentFontSizeBR = parseFloat(window.getComputedStyle(bottomRightEl).fontSize) || 16;
                    const scaleBR = (containerWidth * 0.7) / bottomRightEl.scrollWidth;
                    gsap.set(bottomRightEl, { fontSize: currentFontSizeBR * scaleBR });
                };

                fitText();
                window.addEventListener('resize', fitText);
                
                mm.add('all', () => {
                    return () => window.removeEventListener('resize', fitText)
                });
            }

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

                tl.to(
                maskedTextRef.current,
                {
                    attr: { 'font-size': '80vw', 'letter-spacing': '5vw' },
                    ease: 'power1.in',
                    duration: 4,
                },
                0
                );

                tl.to(
                maskRectRef.current,
                {
                    attr: { fill: 'white' },
                    ease: 'power1.inOut',
                    duration: 3,
                },
                3
                );

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

                tl.to(
                  [topLeftEl, bottomRightEl],
                  {
                    opacity: 1,
                    ease: 'power1.out',
                    duration: 3,
                  },
                  3.5
                );
            });
            
            mm.add("(max-width: 767px)", () => {
                gsap.set(contentRef.current, { opacity: 1, y: 0 });
                gsap.set(maskedTextRef.current, { 'font-size': 0, opacity: 0 });
                gsap.set([topLeftEl, bottomRightEl], { opacity: 1 });
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
    <section ref={sectionRef} id="hero" className="relative md:h-[350vh]">
      <div ref={pinRef} className="h-screen w-full md:sticky top-0 overflow-hidden" style={{ backgroundColor: '#2D2D2D' }}>
        
        <h2 ref={topLeftTextRef} className="absolute top-0 left-0 font-anton text-cream/10 leading-none select-none whitespace-nowrap z-20 opacity-0 p-4">Красота</h2>
        <h2 ref={bottomRightTextRef} className="absolute bottom-0 right-0 font-anton text-cream/10 leading-none select-none whitespace-nowrap z-20 opacity-0 p-4">которую видно</h2>
        
        {/* Main background textures */}
        <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
                backgroundImage: 'url(https://i.ibb.co/zWNnhBMd/concrete-wall-2-1.png)',
                backgroundRepeat: 'repeat',
                opacity: 0.7,
                mixBlendMode: 'overlay',
            }}
        ></div>
        <div className="paper-texture absolute inset-0 w-full h-full pointer-events-none"></div>

        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
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
             <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline poster="https://i.ibb.co/cKjhxFRw/2026-04-16-20-21-13.png">
               <source src="/video/Hero-video.mp4" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-black/20"></div>
           </div>
        </div>

        {/* Gradient Overlay */}
        <div
            className="absolute inset-x-0 top-0 bottom-[-2px] w-full z-[5] pointer-events-none"
            style={{
            maskImage: 'linear-gradient(to top, black 15%, transparent 30%)',
            WebkitMaskImage: 'linear-gradient(to top, black 15%, transparent 30%)',
            }}
        >
            <div className="relative w-full h-full" style={{ backgroundColor: '#2D2D2D' }}>
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: 'url(https://i.ibb.co/zWNnhBMd/concrete-wall-2-1.png)',
                        backgroundRepeat: 'repeat',
                        opacity: 0.7,
                        mixBlendMode: 'overlay',
                    }}>
                </div>
                <div className="paper-texture"></div>
            </div>
        </div>

        <div ref={contentRef} className="absolute inset-0 z-20 opacity-0 flex items-end justify-center">
             <div className="text-center" style={{ paddingBottom: '5vh' }}>
                <h1 className="font-display leading-none italic" style={{ fontSize: '7vw', color: '#F0EBE3' }}>
                    Красота, которую видно
                </h1>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
