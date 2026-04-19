'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';
import Image from 'next/image';

const whyKatsoData = [
  {
    title: 'Мастерство\nчерез отбор',
    description: 'Не учим джуниоров на платных клиентах. Каждый мастер пришёл с минимум 3-летним стажем в своей дисциплине. Вы платите за руки, которые делали это уже тысячу раз и получают удовольствие от своего занятия',
    bgColor: '#2D2D2D',
  },
  {
    title: 'Программа\nлояльности',
    description: '3% от каждой услуги возвращается баллами. Этими баллами можно оплатить 20% любой следующей услуги\n-15% скидка в день рождения, действует 7 дней до/после\n-15% день студента каждый понедельник\n-10% комбо «ногти+ брови»',
    bgColor: '#2A5C56',
  },
  {
    title: 'Консультация\nчасть услуги',
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

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(sectionEl.querySelectorAll('.why-us-card'));
            const stickyContainer = sectionEl.querySelector<HTMLElement>('.why-us-sticky-container');
            const videos = gsap.utils.toArray<HTMLVideoElement>(sectionEl.querySelectorAll('.why-us-video'));
            if (!stickyContainer || cards.length === 0) return;
            
            gsap.set(sectionEl, { backgroundColor: colors.walnut });

            cards.forEach(card => gsap.set(card, { transformOrigin: 'bottom center' }));

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
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    pin: stickyContainer,
                    scrub: 1,
                    start: 'top top',
                    end: `+=${(cards.length - 1) * 100}%`,
                    invalidateOnRefresh: true,
                    onToggle: self => {
                        videos.forEach(v => {
                            if (self.isActive) {
                                v.play().catch(() => {});
                            } else {
                                v.pause();
                            }
                        });
                    },
                    onEnter: () => {
                        gsap.to(sectionEl, { backgroundColor: whyKatsoData[0].bgColor, duration: 0.4, ease: 'none' });
                    },
                    onLeaveBack: () => {
                        gsap.to(sectionEl, { backgroundColor: colors.walnut, duration: 0.4, ease: 'none' });
                    },
                }
            });

            cards.slice(1).forEach((card, i) => {
                const newColor = whyKatsoData[i + 1].bgColor;
                
                tl.fromTo(card, 
                    { yPercent: 105, rotation: 5 },
                    { 
                        yPercent: 0, 
                        rotation: 0, 
                        duration: 1, 
                        ease: 'power1.inOut',
                    },
                    i 
                );
                tl.to(sectionEl, { backgroundColor: newColor, duration: 1, ease: 'power1.inOut' }, i);
            });
        }, sectionRef);
        
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="why-us"
            ref={sectionRef}
            className="h-[300vh]"
            data-cursor="dark"
            style={{ backgroundColor: colors.walnut }}
        >
            <div className="why-us-sticky-container h-screen sticky top-0 overflow-hidden">
                <div className="relative w-full h-full">
                    {whyKatsoData.map((item, index) => (
                        <div
                            key={index}
                            className="why-us-card absolute inset-0 h-full"
                            style={{ backgroundColor: item.bgColor }}
                        >
                            {/* --- Background Textures (common for both) --- */}
                            <div className="concrete-texture"></div>
                            <div className="paper-texture"></div>

                            {/* --- DESKTOP LAYOUT (hidden on mobile) --- */}
                            <div className="hidden lg:block relative h-full">
                                <div className={`absolute right-0 w-[60%] ${index === 1 ? 'bottom-[40%]' : 'top-[40%]'}`}>
                                    {index !== 1 && (
                                        <p className="absolute bottom-full left-0 mb-2 font-lora" style={{fontSize: 'clamp(12px, 3vw, 16px)', color: colors.cream}}>
                                            наши работы
                                        </p>
                                    )}
                                    <div className="w-full h-px" style={{ backgroundColor: index === 1 ? colors.cream : colors.cream }}/>
                                    {index === 1 && (
                                        <p className="absolute top-full left-0 mt-2 font-lora" style={{fontSize: 'clamp(12px, 3vw, 16px)', color: colors.cream}}>
                                            наши работы
                                        </p>
                                    )}
                                </div>
                                <div 
                                    className="relative w-full h-full z-10 py-16"
                                    style={{
                                        paddingLeft: 'clamp(24px, 4vw, 80px)',
                                        paddingRight: 'clamp(24px, 4vw, 80px)',
                                    }}
                                >
                                    <div className="absolute top-[10%] max-w-2xl">
                                        <div className="relative pl-4 lg:pl-6">
                                            <div
                                                className="absolute top-0 left-0 h-full w-px"
                                                style={{ backgroundColor: index === 1 ? colors.cream : colors.cream }}
                                            ></div>
                                            <p
                                                className="font-lora whitespace-pre-line"
                                                style={{
                                                    fontSize: 'clamp(14px, 4vw, 18px)',
                                                    lineHeight: 1.085,
                                                    color: index === 1 ? colors.cream : colors.cream,
                                                }}
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <h3 
                                        className="absolute bottom-[10%] font-display uppercase max-w-[50%]"
                                        style={{
                                            fontSize: 'clamp(32px, 10vw, 70px)',
                                            color: index === 1 ? colors.cream : colors.cream,
                                            whiteSpace: 'pre-line'
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                </div>
                                {index === 0 && (
                                    <div className="absolute bottom-[10%] right-[5%] w-[80%] sm:w-[54%] lg:top-[42%] lg:bottom-[2%] lg:right-[16%] lg:w-[36%] flex items-stretch gap-2 z-20">
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <Image
                                                src="https://i.ibb.co/5XKvgQWw/Am-KWo-80y-IRE0-Zv-Jank4y-ZPm-Xsn-JCL-p1-B7s-J-8-D9w3r-Qxzgol-Sxp-Th-N35vk-Yy-QXR-5sxd53-YGbs2u-CBI2-Qh.jpg"
                                                alt="Studio example 1"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1023px) 30vw, 15vw"
                                            />
                                        </div>
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <video
                                                className="w-full h-full object-cover why-us-video"
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
                                                className="object-cover"
                                                sizes="(max-width: 1023px) 30vw, 15vw"
                                            />
                                        </div>
                                    </div>
                                )}
                                {index === 1 && (
                                    <div className="absolute top-[10%] right-[5%] w-[80%] sm:w-[54%] lg:top-[2%] lg:bottom-[42%] lg:right-[16%] lg:w-[36%] flex items-stretch gap-2 z-20">
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <video
                                                className="w-full h-full object-cover why-us-video"
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
                                                className="object-cover"
                                                sizes="(max-width: 1023px) 30vw, 15vw"
                                            />
                                        </div>
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <Image
                                                src="https://i.ibb.co/PGN67QtT/0i-Xf-i-PYg4-Je-IHQv-MNs-CKAKPega-Ed7-Mg-L2-Ns-Hq-Jw-AFvq-VNwa-Niy9x-MTjd-Zjgr7-Ofb-DF8-T-1k-QAX-s7-HF7-Uef.jpg"
                                                alt="Studio example 6"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1023px) 30vw, 15vw"
                                            />
                                        </div>
                                    </div>
                                )}
                                {index === 2 && (
                                    <div className="absolute bottom-[10%] right-[5%] w-[80%] sm:w-[54%] lg:top-[42%] lg:bottom-[2%] lg:right-[16%] lg:w-[36%] flex items-stretch gap-2 z-20">
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <Image
                                                src="https://i.ibb.co/Ps8WZV4p/3e6657d5-4dd8-4e65-8cb5-ea6922fcb896.jpg"
                                                alt="Studio example 3"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1023px) 30vw, 15vw"
                                            />
                                        </div>
                                        <div className="relative flex-1 aspect-[9/16]">
                                             <Image
                                                src="https://i.ibb.co/q30RbqX1/2026-04-16-22-06-13.png"
                                                alt="Studio example 4"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1023px) 30vw, 15vw"
                                            />
                                        </div>
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <video
                                                className="w-full h-full object-cover why-us-video"
                                                loop
                                                muted
                                                playsInline
                                            >
                                                <source src="/video/Video-17.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* --- MOBILE LAYOUT (hidden on desktop) --- */}
                            <div className="block lg:hidden relative h-full w-full flex flex-col justify-between py-6">
                                <div className="px-6">
                                    <div className="relative pl-4">
                                        <div className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: index === 1 ? colors.cream : colors.cream }}></div>
                                        <p className="font-lora whitespace-pre-line" style={{ fontSize: '4.5vw', lineHeight: 1.3, color: index === 1 ? colors.cream : colors.cream }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="px-6">
                                        <h3 className="font-display uppercase" style={{ fontSize: '10vw', color: index === 1 ? colors.cream : colors.cream, lineHeight: 1, whiteSpace: 'pre-line' }}>
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="w-full mt-8">
                                        <p className="font-lora mb-2 px-6" style={{ fontSize: '3.5vw', color: colors.cream }}>
                                            наши работы
                                        </p>
                                        <div className="w-full h-px" style={{ backgroundColor: index === 1 ? colors.cream : colors.cream }} />
                                    </div>
                                    <div className="w-[94%] mx-auto mt-4">
                                        {index === 0 && (
                                            <div className="flex items-stretch gap-2 z-20">
                                                <div className="relative flex-1 aspect-[9/16]">
                                                    <Image
                                                        src="https://i.ibb.co/5XKvgQWw/Am-KWo-80y-IRE0-Zv-Jank4y-ZPm-Xsn-JCL-p1-B7s-J-8-D9w3r-Qxzgol-Sxp-Th-N35vk-Yy-QXR-5sxd53-YGbs2u-CBI2-Qh.jpg"
                                                        alt="Studio example 1"
                                                        fill
                                                        className="object-cover"
                                                        sizes="30vw"
                                                    />
                                                </div>
                                                <div className="relative flex-1 aspect-[9/16]">
                                                    <video
                                                        className="w-full h-full object-cover why-us-video"
                                                        loop
                                                        muted
                                                        playsInline
                                                    >
                                                        <source src="/video/Video-15-mobile.mp4" type="video/mp4" />
                                                    </video>
                                                </div>
                                                <div className="relative flex-1 aspect-[9/16]">
                                                    <Image
                                                        src="https://i.ibb.co/LzKt0WTV/F4-s35-Lzl9i-J7-ZJa-E161ac-Yt-RBz3cs-c0m7-BDy-NJBjo-Kf-JVp-Epz-Pg-T9f-O3-Cvknkb-Nr-XYx3-U-a-BD887o-Mlj1t.jpg"
                                                        alt="Studio example 2"
                                                        fill
                                                        className="object-cover"
                                                        sizes="30vw"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {index === 1 && (
                                            <div className="flex items-stretch gap-2 z-20">
                                                <div className="relative flex-1 aspect-[9/16]">
                                                    <video
                                                        className="w-full h-full object-cover why-us-video"
                                                        loop
                                                        muted
                                                        playsInline
                                                    >
                                                        <source src="/video/Video-16-mobile.mp4" type="video/mp4" />
                                                    </video>
                                                </div>
                                                <div className="relative flex-1 aspect-[9/16]">
                                                    <Image
                                                        src="https://i.ibb.co/cKjhxFRw/2026-04-16-20-21-13.png"
                                                        alt="Studio example 5"
                                                        fill
                                                        className="object-cover"
                                                        sizes="30vw"
                                                    />
                                                </div>
                                                <div className="relative flex-1 aspect-[9/16]">
                                                    <Image
                                                        src="https://i.ibb.co/PGN67QtT/0i-Xf-i-PYg4-Je-IHQv-MNs-CKAKPega-Ed7-Mg-L2-Ns-Hq-Jw-AFvq-VNwa-Niy9x-MTjd-Zjgr7-Ofb-DF8-T-1k-QAX-s7-HF7-Uef.jpg"
                                                        alt="Studio example 6"
                                                        fill
                                                        className="object-cover"
                                                        sizes="30vw"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {index === 2 && (
                                            <div className="flex items-stretch gap-2 z-20">
                                                <div className="relative flex-1 aspect-[9/16]">
                                                    <Image
                                                        src="https://i.ibb.co/Ps8WZV4p/3e6657d5-4dd8-4e65-8cb5-ea6922fcb896.jpg"
                                                        alt="Studio example 3"
                                                        fill
                                                        className="object-cover"
                                                        sizes="30vw"
                                                    />
                                                </div>
                                                <div className="relative flex-1 aspect-[9/16]">
                                                     <Image
                                                        src="https://i.ibb.co/q30RbqX1/2026-04-16-22-06-13.png"
                                                        alt="Studio example 4"
                                                        fill
                                                        className="object-cover"
                                                        sizes="30vw"
                                                    />
                                                </div>
                                                <div className="relative flex-1 aspect-[9/16]">
                                                    <video
                                                        className="w-full h-full object-cover why-us-video"
                                                        loop
                                                        muted
                                                        playsInline
                                                    >
                                                        <source src="/video/Video-17-mobile.mp4" type="video/mp4" />
                                                    </video>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyKatso;
