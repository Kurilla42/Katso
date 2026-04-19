'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masters from './Masters';
import Faq from './Faq';

const MastersAndFaq = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const faqWrapperRef = useRef<HTMLDivElement>(null); // Ref for the FAQ wrapper div

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const sectionEl = sectionRef.current;
        const faqWrapperEl = faqWrapperRef.current;

        if (!sectionEl || !faqWrapperEl) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
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

            mm.add("(max-width: 767px)", () => {
                // Mobile animation: slide from bottom
                gsap.set(faqWrapperEl, { yPercent: 100, pointerEvents: 'none' });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: 'top top',
                        end: '+=100%',
                        scrub: true,
                        pin: true,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            // Only allow interaction when the animation is fully complete
                            if (self.progress === 1) {
                                gsap.set(faqWrapperEl, { pointerEvents: 'auto' });
                            } else {
                                gsap.set(faqWrapperEl, { pointerEvents: 'none' });
                            }
                        },
                        // Ensure it's non-interactive when scrolling back up
                        onLeaveBack: () => {
                            gsap.set(faqWrapperEl, { pointerEvents: 'none' });
                        },
                    },
                });

                tl.to(faqWrapperEl, {
                    yPercent: 0,
                    ease: 'none',
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative h-screen overflow-hidden">
            {/* Base layer: Masters section, always interactive. */}
            <div className="absolute inset-0 w-full h-full" style={{ transform: 'translateZ(0)' }}>
                <Masters />
            </div>
            {/* Overlay layer: FAQ section that slides in. */}
            <div ref={faqWrapperRef} className="absolute inset-0 w-full h-full">
                <Faq />
            </div>
        </div>
    );
};

export default MastersAndFaq;
