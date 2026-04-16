'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const NewMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scaleTargetRef = useRef<HTMLDivElement>(null);
  const tRef = useRef<HTMLSpanElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scaleTargetEl = scaleTargetRef.current;
    const tEl = tRef.current;
    const sectionEl = sectionRef.current;
    const pinContainerEl = pinContainerRef.current;
    if (!scaleTargetEl || !tEl || !sectionEl || !pinContainerEl) return;

    let ctx: gsap.Context;

    // A small delay to ensure all elements are rendered and have their dimensions.
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
            
            // The letter 'T' is now the reference for scaling
            const tRect = tEl.getBoundingClientRect();
            
            const scaleTargetRect = scaleTargetEl.getBoundingClientRect();
            const originXText = (tRect.left - scaleTargetRect.left) + (tRect.width / 2);
            const originYText = (tRect.top - scaleTargetRect.top) + (tRect.height / 2);
            gsap.set(scaleTargetEl, { transformOrigin: `${originXText}px ${originYText}px` });

            tl.to(
              scaleTargetEl,
              {
                scale: 200,
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
      className="relative h-[400vh]"
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
        <div
            ref={scaleTargetRef}
            className="relative z-10 w-full text-cream grid grid-cols-[1fr_auto_1fr] gap-x-8 items-center"
            style={{
                paddingLeft: 'clamp(24px, 4vw, 80px)',
                paddingRight: 'clamp(24px, 4vw, 80px)',
            }}
        >
            <h2
                style={{ fontSize: '3vw', transform: 'translateY(-7.2vw)' }}
                className="text-right leading-none font-display uppercase whitespace-pre-line"
            >
                {'Задача\nKA'}<span ref={tRef}>T</span>SO:
            </h2>
            
            <div>
                <p
                    className="whitespace-pre-line font-display uppercase"
                    style={{ fontSize: '3vw', lineHeight: 1.2 }}
                >
                    {'Раскрыть твою уникальность\nи познакомить с новым «я»'}
                </p>
            </div>

            <p
                className="font-lora text-right whitespace-pre-line"
                style={{
                    fontSize: '1.2vw',
                    lineHeight: 1.085,
                    color: '#8a9a6b',
                    transform: 'translateY(7.2vw)',
                }}
            >
                {'Другой взгляд на себя, \nдругое мировоззрение и \nотношения с окружающим миром'}
            </p>
        </div>
      </div>
    </section>
  );
};

export default NewMe;
