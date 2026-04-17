'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';
import Image from 'next/image';

const whyKatsoData = [
  {
    title: 'Мастерство через отбор',
    description: 'Не учим джуниоров на платных клиентах. Каждый мастер пришёл с минимум 3-летним стажем в своей дисциплине. Вы платите за руки, которые делали это уже тысячу раз и получают удовольствие от своего занятия',
    bgColor: '#2D2D2D',
  },
  {
    title: 'Программа лояльности',
    description: '3% от каждой услуги возвращается баллами. Этими баллами можно оплатить 20% любой следующей услуги\n-15% скидка в день рождения, действует 7 дней до/после\n-15% день студента каждый понедельник\n-10% комбо «ногти+ брови»',
    bgColor: '#8FA89A',
  },
  {
    title: 'Консультация часть услуги',
    description: 'Каждая услуга начинается с 10-минутного разбора: что вы хотите сегодня, что у вас было в прошлый раз, какой финальный образ. Это входит в цену и не продлевает время в кресле. Нам важно слышать вас',
    bgColor: '#2D2D2D',
  },
];


const WhyKatso = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>(sectionEl.querySelectorAll('.why-us-card'));
            const stickyContainer = sectionEl.querySelector<HTMLElement>('.why-us-sticky-container');
            if (!stickyContainer || cards.length === 0) return;
            
            gsap.set(sectionEl, { backgroundColor: colors.walnut });

            // Set transform origin for all cards to make rotation consistent on resize
            cards.forEach(card => gsap.set(card, { transformOrigin: 'bottom center' }));

            // Animate first card as section scrolls into view
            gsap.fromTo(cards[0], 
                { rotation: 4, yPercent: 20 }, 
                { 
                    rotation: 0, 
                    yPercent: 0, 
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );
            
            // Pin and stack the rest of the cards
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    pin: stickyContainer,
                    scrub: 1,
                    start: 'top top',
                    end: `+=${(cards.length - 1) * 100}%`,
                    invalidateOnRefresh: true,
                    onEnter: () => gsap.to(sectionEl, { backgroundColor: whyKatsoData[0].bgColor, duration: 0.4, ease: 'none' }),
                    onLeaveBack: () => gsap.to(sectionEl, { backgroundColor: colors.walnut, duration: 0.4, ease: 'none' }),
                }
            });

            // Animate subsequent cards sliding over and change background color
            cards.slice(1).forEach((card, i) => {
                const newColor = whyKatsoData[i + 1].bgColor;
                tl.fromTo(card, 
                    { yPercent: 105, rotation: 5 }, // Increased yPercent and rotation to ensure it's hidden
                    { yPercent: 0, rotation: 0, duration: 1, ease: 'power1.inOut' },
                    i // position in timeline: 0, 1, ...
                );
                // Animate background color at the same time
                tl.to(sectionEl, { backgroundColor: newColor, duration: 1, ease: 'power1.inOut' }, i);
            });

            return () => {
                ScrollTrigger.getAll().forEach(t => t.kill());
            }
        });
        
        return () => mm.revert();
    }, []);

    return (
        <section
            id="why-us"
            ref={sectionRef}
            className="md:h-[300vh]"
            data-cursor="dark"
            style={{ backgroundColor: colors.walnut }}
        >
            <div className="why-us-sticky-container h-auto md:h-screen md:sticky md:top-0 md:overflow-hidden">
                <div className="relative flex flex-col gap-4 py-16 md:py-0 md:gap-0 md:w-full md:h-full">
                    {whyKatsoData.map((item, index) => (
                        <div
                            key={index}
                            className="why-us-card p-8 sm:p-12 md:p-0 rounded-md md:rounded-none md:absolute md:inset-0 md:h-full md:flex md:items-center"
                            style={{ backgroundColor: item.bgColor }}
                        >
                             <div
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                style={{
                                    backgroundImage: 'url(https://i.ibb.co/zWNnhBMd/concrete-wall-2-1.png)',
                                    backgroundRepeat: 'repeat',
                                    opacity: 0.7,
                                    mixBlendMode: 'overlay',
                                }}
                            ></div>
                            <div className="paper-texture"></div>

                            {/* Decorative Line & Text */}
                            <div className={`absolute right-0 w-[60%] ${index === 1 ? 'bottom-[40%]' : 'top-[40%]'}`}>
                                {index !== 1 && (
                                    <p className="absolute bottom-full left-0 mb-2 font-lora" style={{fontSize: '1.2vw', color: colors.cream}}>
                                        наши работы
                                    </p>
                                )}
                                <div className="w-full h-px" style={{ backgroundColor: index === 1 ? '#2D2D2D' : colors.cream }}/>
                                {index === 1 && (
                                    <p className="absolute top-full left-0 mt-2 font-lora" style={{fontSize: '1.2vw', color: '#2D2D2D'}}>
                                        наши работы
                                    </p>
                                )}
                            </div>

                            {/* Content Wrapper */}
                            <div 
                                className="relative w-full h-full z-10 md:py-16"
                                style={{
                                    paddingLeft: 'clamp(24px, 4vw, 80px)',
                                    paddingRight: 'clamp(24px, 4vw, 80px)',
                                }}
                            >
                                <div className="absolute top-[10%] max-w-2xl">
                                    <div className="relative pl-4 md:pl-6">
                                        <div
                                            className="absolute top-0 left-0 h-full w-px"
                                            style={{ backgroundColor: index === 1 ? '#2D2D2D' : colors.cream }}
                                        ></div>
                                        <p
                                            className="font-lora whitespace-pre-line"
                                            style={{
                                                fontSize: '1.2vw',
                                                lineHeight: 1.085,
                                                color: index === 1 ? '#2D2D2D' : colors.cream,
                                            }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <h3 
                                    className="absolute bottom-[10%] font-display uppercase max-w-[50%]"
                                    style={{
                                        fontSize: '5vw',
                                        color: index === 1 ? '#2D2D2D' : colors.cream
                                    }}
                                >
                                    {item.title}
                                </h3>
                            </div>
                            {index === 0 && (
                                <>
                                <div className="absolute bottom-[10%] md:top-[42%] md:bottom-[2%] right-[16%] w-[54%] md:w-[42%] lg:w-[36%] flex items-stretch gap-2 z-20">
                                    <div className="relative flex-1 aspect-[9/16]">
                                        <Image
                                            src="https://i.ibb.co/5XKvgQWw/Am-KWo-80y-IRE0-Zv-Jank4y-ZPm-Xsn-JCL-p1-B7s-J-8-D9w3r-Qxzgol-Sxp-Th-N35vk-Yy-QXR-5sxd53-YGbs2u-CBI2-Qh.jpg"
                                            alt="Studio example 1"
                                            fill
                                            className="object-cover rounded-sm"
                                            sizes="15vw"
                                        />
                                    </div>
                                    <div className="relative flex-1 aspect-[9/16]">
                                        <video
                                            className="w-full h-full object-cover rounded-sm"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        >
                                            <source src="/video/Video-15.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="relative flex-1 aspect-[9/16]">
                                        <Image
                                            src="https://i.ibb.co/LzKt0WTV/F4-s35-Lzl9i-J7-ZJa-E161ac-Yt-RBz3cs-c0m7-BDy-NJBjo-Kf-JVp-Epz-Pg-T9f-O3-Cvknkb-Nr-XYx3-U-a-BD887o-Mlj1t.jpg"
                                            alt="Studio example 2"
                                            fill
                                            className="object-cover rounded-sm"
                                            sizes="15vw"
                                        />
                                    </div>
                                </div>
                                </>
                            )}
                            {index === 1 && (
                                <>
                                    <div className="absolute top-[10%] md:top-[2%] md:bottom-[42%] right-[16%] w-[54%] md:w-[42%] lg:w-[36%] flex items-stretch gap-2 z-20">
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <video
                                                className="w-full h-full object-cover rounded-sm"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            >
                                                <source src="/video/Video-16.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <Image
                                                src="https://i.ibb.co/cKjhxFRw/2026-04-16-20-21-13.png"
                                                alt="Studio example 5"
                                                fill
                                                className="object-cover rounded-sm"
                                                sizes="15vw"
                                            />
                                        </div>
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <Image
                                                src="https://i.ibb.co/zTX5qYP0/795de294-619b-4183-bc0e-0c4e3ea43753.jpg"
                                                alt="Studio example 6"
                                                fill
                                                className="object-cover rounded-sm"
                                                sizes="15vw"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {index === 2 && (
                                <>
                                <div className="absolute bottom-[10%] md:top-[42%] md:bottom-[2%] right-[16%] w-[54%] md:w-[42%] lg:w-[36%] flex items-stretch gap-2 z-20">
                                    <div className="relative flex-1 aspect-[9/16]">
                                        <Image
                                            src="https://i.ibb.co/Ps8WZV4p/3e6657d5-4dd8-4e65-8cb5-ea6922fcb896.jpg"
                                            alt="Studio example 3"
                                            fill
                                            className="object-cover rounded-sm"
                                            sizes="15vw"
                                        />
                                    </div>
                                    <div className="relative flex-1 aspect-[9/16]">
                                         <Image
                                            src="https://i.ibb.co/q30RbqX1/2026-04-16-22-06-13.png"
                                            alt="Studio example 4"
                                            fill
                                            className="object-cover rounded-sm"
                                            sizes="15vw"
                                        />
                                    </div>
                                    <div className="relative flex-1 aspect-[9/16]">
                                        <video
                                            className="w-full h-full object-cover rounded-sm"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        >
                                            <source src="/video/Video-17.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyKatso;
