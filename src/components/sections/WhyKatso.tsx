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
    description: '3% от каждой услуги возвращается баллами. 20% любой следующей услуги можно оплатить баллами.\n-15% скидка в день рождения, действует 7 дней до/после\n-15% день студента кажды понедльник\n-10% комбо «ногти+ брови»',
    bgColor: '#66686b',
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
            
            gsap.set(sectionEl, { backgroundColor: colors.cream });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    pin: stickyContainer,
                    scrub: 1,
                    start: 'top top',
                    end: `+=${(cards.length) * 100}%`,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const time = self.progress * (cards.length);
                        
                        if (time < 1) {
                            gsap.to(sectionEl, { backgroundColor: colors.cream, duration: 0.3, ease: 'none' });
                        } else {
                            const cardIndex = Math.floor(time - 1);
                            if (cardIndex < whyKatsoData.length) {
                                const currentCardData = whyKatsoData[cardIndex];
                                if (currentCardData) {
                                  gsap.to(sectionEl, { backgroundColor: currentCardData.bgColor, duration: 0.3, ease: 'none' });
                                }
                            }
                        }
                    },
                }
            });

            tl.fromTo(cards[0], { rotation: 4, yPercent: 20 }, { rotation: 0, yPercent: 0, duration: 1, ease: 'none' });
            
            cards.slice(1).forEach((card, i) => {
                tl.fromTo(card, 
                    { yPercent: 101, rotation: 4 }, 
                    { yPercent: 0, rotation: 0, duration: 1, ease: 'none' },
                    i + 1
                );
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
            className="md:h-[400vh]"
            data-cursor="dark"
            style={{ backgroundColor: colors.cream }}
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
                                    opacity: 0.4,
                                    mixBlendMode: 'overlay',
                                }}
                            ></div>
                            <div className="paper-texture"></div>

                            {/* Decorative Line */}
                            <div
                                className={`absolute right-0 w-[60%] h-px ${index === 1 ? 'bottom-[40%]' : 'top-[40%]'}`}
                                style={{ backgroundColor: '#EDE8E0' }}
                            />

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
                                        <div className="absolute top-0 left-0 h-full w-px bg-cream"></div>
                                        <p
                                            className="font-lora text-body-lg text-nude whitespace-pre-line"
                                            style={{ lineHeight: 1.085 }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <h3 
                                    className="absolute bottom-[10%] font-display uppercase text-cream max-w-[50%]"
                                    style={{ fontSize: '5vw' }}
                                >
                                    {item.title}
                                </h3>
                            </div>
                            {index === 0 && (
                                <>
                                <div className="absolute top-[8%] right-0 w-[42vw] h-[85vh] max-w-[600px] pointer-events-none scale-120">
                                    <Image
                                        src="https://i.ibb.co/B5zD30Jx/isolated-pampas-grass-plume2.png"
                                        alt="Pampas grass decoration"
                                        fill
                                        style={{ objectFit: 'contain', objectPosition: 'top right' }}
                                    />
                                </div>
                                
                                <div className="absolute bottom-[10%] right-[10%] w-[54%] md:w-[42%] lg:w-[36%] flex items-stretch gap-2 z-20 scale-[1.42]">
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
                                            <source src="/video/video-1.mp4" type="video/mp4" />
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
                                    <div className="absolute top-[10%] right-[10%] w-[54%] md:w-[42%] lg:w-[36%] flex items-stretch gap-2 z-20 scale-[1.42]">
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <video
                                                className="w-full h-full object-cover rounded-sm"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            >
                                                <source src="/video/video-2.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <Image
                                                src="https://i.ibb.co/C4zZNhv/xo-Yh-Ad-Fk-Aomwez-MVy-SE8sv-OEM2mn0-Huh4rc8-S2-VIYNwh-Vs-QAo-ZP-3-AET4g-Lf9h-BSVt8cic-Zeco-O40v-Q2ku-KX.jpg"
                                                alt="Studio example 5"
                                                fill
                                                className="object-cover rounded-sm"
                                                sizes="15vw"
                                            />
                                        </div>
                                        <div className="relative flex-1 aspect-[9/16]">
                                            <Image
                                                src="https://i.ibb.co/prbQTwGN/0i-Xf-i-PYg4-Je-IHQv-MNs-CKAKPega-Ed7-Mg-L2-Ns-Hq-Jw-AFvq-VNwa-Niy9x-MTjd-Zjgr7-Ofb-DF8-T-1k-QAX-s7-HF7-Uef.jpg"
                                                alt="Studio example 6"
                                                fill
                                                className="object-cover rounded-sm"
                                                sizes="15vw"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-[5%] w-[35vw] h-[45vh] z-0 pointer-events-none">
                                        <Image
                                            src="https://i.ibb.co/Y71XvhtZ/Pngtree-pampas-grass-isolated-on-a-21120510.png"
                                            alt="Pampas grass decoration"
                                            fill
                                            style={{ objectFit: 'contain', objectPosition: 'bottom right' }}
                                        />
                                    </div>
                                </>
                            )}
                            {index === 2 && (
                                <>
                                <div className="absolute bottom-[10%] right-[10%] w-[54%] md:w-[42%] lg:w-[36%] flex items-stretch gap-2 z-20 scale-[1.42]">
                                    <div className="relative flex-1 aspect-[9/16]">
                                        <Image
                                            src="https://i.ibb.co/W4SrSLNw/2026-04-16-20-21-01.png"
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
                                            <source src="/video/video-3.mp4" type="video/mp4" />
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
