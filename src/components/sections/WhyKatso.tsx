'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';

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
    title: 'Консультация как часть услуги',
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
                            className="why-us-card p-8 sm:p-12 md:p-16 rounded-md md:rounded-none md:absolute md:inset-0 md:h-full md:flex md:items-center md:justify-center"
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
                            {/* Content Wrapper */}
                            <div className="relative max-w-6xl w-full h-full z-10">
                                <p 
                                    className="absolute top-[10%] font-lora text-body-lg max-w-2xl text-nude whitespace-pre-line"
                                    style={{ lineHeight: 1.085 }}
                                >
                                    {item.description}
                                </p>
                                <h3 className="absolute bottom-[10%] font-display text-h2 uppercase text-cream">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyKatso;
