'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';

const whyKatsoData = [
  {
    title: 'Экспертиза',
    description: 'Наши мастера — признанные профессионалы с многолетним опытом, постоянно совершенствующие свои навыки на международных семинарах и мастер-классах.',
    tagline: '(Искусство в деталях)',
    bgColor: '#2D2D2D',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,5 L50,95" stroke="currentColor" strokeWidth="1" />
            <path d="M90,20 L10,80" stroke="currentColor" strokeWidth="1" />
            <path d="M10,20 L90,80" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Атмосфера',
    description: 'Мы создали пространство, где вы можете расслабиться, отвлечься от суеты и посвятить время себе. Каждая деталь интерьера продумана для вашего комфорта.',
    tagline: '(Ваше личное убежище)',
    bgColor: '#66686b',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="1"/>
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: 'Качество',
    description: 'Мы работаем только с премиальными брендами и проверенными технологиями. Безопасность и здоровье наших клиентов — наш главный приоритет.',
    tagline: '(Бескомпромиссный стандарт)',
    bgColor: '#2D2D2D',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="1"/>
            <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            <path d="M0 50H100" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
            <path d="M50 0V100" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
        </svg>
    ),
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
            if (!stickyContainer || cards.length < 2) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    pin: stickyContainer,
                    scrub: 1,
                    start: 'top top',
                    end: `+=${(cards.length - 1) * 100}%`,
                    invalidateOnRefresh: true,
                }
            });

            tl.fromTo(cards[0], { rotation: 4 }, { rotation: 0, ease: 'none' });
            
            cards.slice(1).forEach((card, i) => {
                const startTime = i;
                tl.fromTo(card, 
                    { yPercent: 101, rotation: 4 }, 
                    { yPercent: 0, rotation: 0, ease: 'none' },
                    startTime
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
            className="md:h-[300vh]"
            style={{ backgroundColor: '#2D2D2D' }}
            data-cursor="dark"
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
                                    backgroundImage: 'url(https://i.ibb.co/fzk39XBR/wall-4-light.png)',
                                    backgroundRepeat: 'repeat',
                                    opacity: 0.2,
                                    mixBlendMode: 'overlay',
                                }}
                            ></div>
                            <div className="paper-texture"></div>
                            {/* Content Wrapper */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 items-center max-w-6xl w-full z-10">
                                <div className="text-cream text-center md:text-left">
                                    <h3 className="font-display text-h2 uppercase">
                                        {item.title}
                                    </h3>
                                    <p className="mt-4 text-body-lg max-w-lg mx-auto md:mx-0 text-nude">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="relative min-h-[160px] flex items-center justify-center">
                                    <div className="w-32 h-32 md:w-[15vw] md:h-[15vw] max-w-[200px] max-h-[200px] flex-shrink-0">
                                        <item.icon className="text-cream/30" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 italic text-sm text-nude/70">
                                        <span className="text-accent">(</span>{item.tagline.substring(1, item.tagline.length -1)}<span className="text-accent">)</span>
                                    </span>
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
