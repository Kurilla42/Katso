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
            // Initially, the FAQ wrapper is off-screen and not interactive.
            gsap.set(faqWrapperEl, { xPercent: 100, pointerEvents: 'none' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top top',
                    end: '+=100%',
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true,
                    // Use callbacks to manage interactivity precisely.
                    // When the scroll enters the trigger area, make the FAQ section clickable.
                    onEnter: () => gsap.set(faqWrapperEl, { pointerEvents: 'auto' }),
                    // When scrolling back up and leaving the trigger, disable clicks again.
                    onLeaveBack: () => gsap.set(faqWrapperEl, { pointerEvents: 'none' }),
                },
            });

            // The animation itself remains the same.
            tl.to(faqWrapperEl, {
                xPercent: 0,
                ease: 'none',
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
