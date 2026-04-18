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
  const h2TextRef = useRef<HTMLHeadingElement>(null);
  const pTextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scaleTargetEl = scaleTargetRef.current;
    const tEl = tRef.current;
    const sectionEl = sectionRef.current;
    const pinContainerEl = pinContainerRef.current;
    if (!scaleTargetEl || !tEl || !sectionEl || !pinContainerEl) return;

    let ctx: gsap.Context;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.floating-image').forEach((el, i) => {
          gsap.to(el, {
            yPercent: i % 2 === 0 ? -5 : 5,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2
          });
        });

        const mm = gsap.matchMedia();

        const createZoomTimeline = () => {
          const setOrigin = () => {
              if (!tEl || !scaleTargetEl) return;
              const tRect = tEl.getBoundingClientRect();
              const scaleTargetRect = scaleTargetEl.getBoundingClientRect();
              const originXText = (tRect.left - scaleTargetRect.left) + (tRect.width / 2);
              const originYText = (tRect.top - scaleTargetRect.top) + (tRect.height / 2);
              gsap.set(scaleTargetEl, { transformOrigin: `${originXText}px ${originYText}px` });
          }
          
          setOrigin(); 

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              pin: pinContainerEl,
              invalidateOnRefresh: true,
              onRefresh: setOrigin,
            },
          });
          
          tl.to(scaleTargetEl, { scale: 400, ease: 'power2.in' });
        };
        
        mm.add("(min-width: 768px)", () => {
          if (h2TextRef.current && pTextRef.current) {
            gsap.set(h2TextRef.current, { y: '-7.2vw' });
            gsap.set(pTextRef.current, { y: '7.2vw' });
          }
          createZoomTimeline();
        });

        mm.add("(max-width: 767px)", () => {
          createZoomTimeline();
        });

      }, sectionRef);
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
          {/* Images */}
          <div ref={contentWrapperRef} className="absolute inset-0 w-full h-full">
            <div className="floating-image absolute w-[29.5vw] md:w-[12.3vw] aspect-[1/1.2] bottom-[10%] left-1/2 md:left-[8%] transform -translate-x-1/2 md:translate-x-0 -rotate-[7deg]">
                <Image src="https://i.ibb.co/8D9VnyxZ/790b8980-17ce-4517-9d41-bd3a5008a7ef.jpg" alt="Woman with beautiful hair" fill className="object-cover rounded-md" quality={100} />
            </div>
            <div className="floating-image absolute w-[42.5vw] md:w-[17.7vw] aspect-[1.2/1] top-[8%] right-[10%] transform rotate-[6deg]">
                <Image src="https://i.ibb.co/v6xqgN14/440cc9b2-04fe-40e8-83e7-84d0e84b820f.jpg" alt="Beauty salon details" fill className="object-contain rounded-md" quality={100} />
            </div>
            <div className="floating-image absolute w-[27.6vw] md:w-[11.5vw] aspect-[1/1.2] top-[5%] left-[5%] md:left-[38%]">
                <Image src="https://i.ibb.co/pvCXs1fm/5a0c5da2-c0e2-4de6-be9f-3390f376e3e1.jpg" alt="Woman getting a beauty treatment" fill className="object-cover rounded-md" quality={100} />
            </div>
          </div>
          
          {/* Text content */}
          <div className="w-full h-full flex items-center justify-center">
            <div
                className="relative z-10 w-full text-cream 
                           flex flex-col gap-y-8 items-center text-center
                           md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-8"
                style={{ paddingLeft: 'clamp(24px, 4vw, 80px)', paddingRight: 'clamp(24px, 4vw, 80px)' }}
            >
                <h2
                    ref={h2TextRef}
                    className="text-[5vw] md:text-[3vw] md:text-right leading-none font-display uppercase whitespace-pre-line"
                >
                    {'Задача\n'}<span style={{color: '#8FA89A'}}>KA<span ref={tRef}>T</span>SO:</span>
                </h2>
                
                <div className="text-center">
                    <p
                        className="text-[5vw] md:text-[3vw] whitespace-pre-line font-display tracking-display uppercase"
                        style={{ lineHeight: 1.2 }}
                    >
                        {'Раскрыть твою уникальность\nи познакомить с новым «я»'}
                    </p>
                </div>

                <p
                    ref={pTextRef}
                    className="text-[4vw] md:text-[1.2vw] font-lora md:text-right whitespace-pre-line text-nude"
                    style={{ lineHeight: 1.085 }}
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
