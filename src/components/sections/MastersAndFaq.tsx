'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masters from './Masters';
import Faq from './Faq';

const MastersAndFaq = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const faqSection = sectionRef.current?.querySelector<HTMLElement>('#faq');
        if (!sectionRef.current || !faqSection) return;

        const ctx = gsap.context(() => {
            gsap.set(faqSection, { xPercent: 100 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=100%', 
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(faqSection, {
                xPercent: 0,
                ease: 'none',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative h-screen overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <Masters />
            </div>
            <div className="absolute inset-0 w-full h-full">
                <Faq />
            </div>
        </div>
    );
};

export default MastersAndFaq;
