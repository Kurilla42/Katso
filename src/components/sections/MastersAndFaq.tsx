'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masters from './Masters';
import Faq from './Faq';

const MastersAndFaq = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const faqWrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const sectionEl = sectionRef.current;
        const faqWrapperEl = faqWrapperRef.current;

        if (!sectionEl || !faqWrapperEl) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                // Desktop animation: slide from right
                gsap.set(faqWrapperEl, { xPercent: 100, pointerEvents: 'none' });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: 'top top',
                        end: '+=100%',
                        scrub: true,
                        pin: true,
                        invalidateOnRefresh: true,
                        onEnter: () => gsap.set(faqWrapperEl, { pointerEvents: 'auto' }),
                        onLeaveBack: () => gsap.set(faqWrapperEl, { pointerEvents: 'none' }),
                    },
                });

                tl.to(faqWrapperEl, {
                    xPercent: 0,
                    ease: 'none',
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="lg:relative lg:h-screen lg:overflow-hidden">
            {/* Base layer: Masters section, always interactive. */}
            <div className="lg:absolute lg:inset-0 lg:w-full lg:h-full" style={{ transform: 'translateZ(0)' }}>
                <Masters />
            </div>
            {/* Overlay layer: FAQ section that slides in. */}
            <div ref={faqWrapperRef} className="lg:absolute lg:inset-0 lg:w-full lg:h-full">
                <Faq />
            </div>
        </div>
    );
};

export default MastersAndFaq;
