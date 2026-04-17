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
  const contentWrapperRef = useRef<HTMLDivElement>(null);

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
        // Floating animation for images
        gsap.utils.toArray<HTMLElement>('.floating-image').forEach((el, i) => {
          gsap.to(el, {
            yPercent: i % 2 === 0 ? -5 : 5, // move up or down by 5% of its height
            duration: 3 + Math.random() * 2, // random duration for variety
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2 // random delay to de-sync them
          });
        });

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const setOrigin = () => {
                if (!tEl || !scaleTargetEl) return;
                // The letter 'T' is now the reference for scaling
                const tRect = tEl.getBoundingClientRect();
                const scaleTargetRect = scaleTargetEl.getBoundingClientRect();
                const originXText = (tRect.left - scaleTargetRect.left) + (tRect.width / 2);
                const originYText = (tRect.top - scaleTargetRect.top) + (tRect.height / 2);
                gsap.set(scaleTargetEl, { transformOrigin: `${originXText}px ${originYText}px` });
            }
            
            setOrigin(); // Set it once initially

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pin: pinContainerEl,
                invalidateOnRefresh: true,
                onRefresh: setOrigin, // And recalculate on every refresh (like window resize)
              },
            });
            
            tl.to(
              scaleTargetEl,
              {
                scale: 400,
                ease: 'power2.in',
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
      style={{ backgroundColor: '#2D2D2D' }}
      data-cursor="dark"
    >
      <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: 'url(https://i.ibb.co/zWNnhBMd/concrete-wall-2-1.png)',
            backgroundRepeat: 'repeat',
            opacity: 0.7,
            mixBlendMode: 'overlay',
          }}></div>
      <div ref={pinContainerRef} className="h-screen w-full overflow-hidden md:sticky md:top-0 relative">
        <div
            ref={scaleTargetRef}
            className="relative w-full h-full"
        >
          {/* Images are positioned relative to this container */}
          <div ref={contentWrapperRef} className="absolute inset-0 w-full h-full">
            {/* Image 1 */}
            <div className="floating-image absolute w-[12.3vw] aspect-[1/1.2] bottom-[10%] left-[8%] transform -rotate-[7deg]">
                <Image
                    src="https://i.ibb.co/8D9VnyxZ/790b8980-17ce-4517-9d41-bd3a5008a7ef.jpg"
                    alt="Woman with beautiful hair"
                    fill
                    className="object-cover rounded-md"
                    quality={100}
                />
            </div>

            {/* Image 2 */}
            <div className="floating-image absolute w-[17.7vw] aspect-[1.2/1] top-[8%] right-[10%] transform rotate-[6deg]">
                <Image
                    src="https://i.ibb.co/v6xqgN14/440cc9b2-04fe-40e8-83e7-84d0e84b820f.jpg"
                    alt="Beauty salon details"
                    fill
                    className="object-contain rounded-md"
                    quality={100}
                />
            </div>

            {/* Image 3 */}
            <div className="floating-image absolute w-[11.5vw] aspect-[1/1.2] top-[5%] left-[38%]">
                <Image
                    src="https://i.ibb.co/pvCXs1fm/5a0c5da2-c0e2-4de6-be9f-3390f376e3e1.jpg"
                    alt="Woman getting a beauty treatment"
                    fill
                    className="object-cover rounded-md"
                    quality={100}
                />
            </div>
          </div>
          
          {/* Text content is centered */}
          <div className="w-full h-full flex items-center justify-center">
            <div
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
                    {'Задача\n'}<span style={{color: '#8FA89A'}}>KA<span ref={tRef}>T</span>SO:</span>
                </h2>
                
                <div className="text-center">
                    <p
                        className="whitespace-pre-line font-display tracking-display uppercase"
                        style={{ fontSize: '3vw', lineHeight: 1.2 }}
                    >
                        {'Раскрыть твою уникальность\nи познакомить с новым «я»'}
                    </p>
                </div>

                <p
                    className="font-lora text-right whitespace-pre-line text-nude"
                    style={{
                        fontSize: '1.2vw',
                        lineHeight: 1.085,
                        transform: 'translateY(7.2vw)',
                    }}
                >
                    {'Другой взгляд на себя, \nдругое мировоззрение и \nотношения с окружающим миром'}
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMe;
