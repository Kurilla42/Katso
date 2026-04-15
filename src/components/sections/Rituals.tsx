'use client';

import React, { useLayoutEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';
import { EASES } from '@/lib/animations';
import { cn } from '@/lib/utils';

const ritualsData = [
  {
    title: 'Стрижки',
    description: 'От классических форм до смелых креативных решений. Наши мастера создадут идеальный образ, подчеркивающий вашу индивидуальность.',
    bgColor: colors.offwhite,
    theme: 'light',
  },
  {
    title: 'Окрашивание',
    description: 'Сложные техники, натуральные оттенки и яркие цвета. Мы используем только премиальные красители для здоровья ваших волос.',
    bgColor: colors.chocolate,
    theme: 'dark',
  },
  {
    title: 'Уход за волосами',
    description: 'Глубокое восстановление, увлажнение и питание. SPA-ритуалы для волос, которые вернут им силу, блеск и шелковистость.',
    bgColor: colors.bonefaq,
    theme: 'light',
  },
  {
    title: 'Ногтевой сервис',
    description: 'Идеальный маникюр и педикюр, от лечебного до дизайнерского. Безопасность, стерильность и внимание к деталям.',
    bgColor: colors.burgundy,
    theme: 'dark',
  },
  {
    title: 'Косметология',
    description: 'Современные методики для сохранения молодости и красоты вашей кожи. Индивидуальные программы ухода от ведущих косметологов.',
    bgColor: colors.dustyblue,
    theme: 'dark',
  },
  {
    title: 'Макияж и брови',
    description: 'Дневной, вечерний или свадебный макияж. Коррекция и окрашивание бровей для создания выразительного взгляда.',
    bgColor: colors.offwhite,
    theme: 'light',
  },
  {
    title: 'Массаж и SPA',
    description: 'Расслабляющие и оздоровительные массажи, обертывания и другие SPA-программы для гармонии души и тела.',
    bgColor: colors.graphite,
    theme: 'dark',
  },
];

const RitualCard = forwardRef<HTMLDivElement, { ritual: (typeof ritualsData)[0], index: number }>(({ ritual, index }, ref) => {
    const isDark = ritual.theme === 'dark';
    const textColor = isDark ? 'text-textLight' : 'text-textDark';
    const mutedTextColor = isDark ? 'text-textLightMuted' : 'text-textDarkMuted';
    const bigNumberColor = isDark ? 'text-white/10' : 'text-black/5';

    return (
        <div
            ref={ref}
            className="ritual-card group"
            style={{ 
                backgroundColor: ritual.bgColor,
                pointerEvents: 'none'
            }}
            data-cursor={ritual.theme}
        >
            <div className={cn(
                isDark ? 'dark-bg' : 'light-bg', 
                "w-full h-full relative p-8 sm:p-12 md:p-16 flex flex-col justify-center"
            )}>
                <div className={cn(
                    "paper-texture",
                    "transition-opacity duration-400",
                    isDark ? "group-hover:opacity-[0.2]" : "group-hover:opacity-[0.2]"
                )}></div>
                <div className={cn(
                    "absolute top-1/2 -translate-y-1/2 right-0 -mr-16 md:mr-0 text-center select-none pointer-events-none",
                    "transition-colors duration-400",
                     bigNumberColor,
                    isDark ? "group-hover:text-white/20" : "group-hover:text-black/15"
                )}>
                    <span className="font-display leading-none text-[20rem] md:text-[28rem] lg:text-[36rem]">
                        0{index + 1}
                    </span>
                </div>

                <div className="grid grid-cols-12 gap-x-4 h-full items-center">
                    <div className="col-span-11 md:col-span-6 lg:col-span-5 z-10">
                        <h3 className={`font-display text-5xl sm:text-7xl md:text-8xl uppercase animate-item ${textColor}`}>
                            {ritual.title}
                        </h3>
                        <p className={`mt-6 text-base md:text-lg max-w-md animate-item ${mutedTextColor}`}>
                            {ritual.description}
                        </p>
                        <button className={`mt-8 caption animate-item ${textColor} rounded-sm focus-visible:outline-none focus-visible:ring-2 ${isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-textDark'}`}>
                            Подробнее &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
RitualCard.displayName = 'RitualCard';


const Rituals = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = cardsRef.current.filter(c => c !== null) as HTMLDivElement[];
        if (!cards.length) return;

        const mm = gsap.matchMedia(componentRef.current!);

        mm.add({
            isDesktop: `(min-width: 768px)`,
            isMobile: `(max-width: 767px)`,
            isReduced: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            const { isDesktop, isReduced } = context.conditions!;
            const pinContainer = pinContainerRef.current!;

            if (isDesktop && !isReduced) {
                // --- DESKTOP "chkstepan" ANIMATION ---

                pinContainer.classList.add('h-svh', 'relative', 'overflow-hidden');
                pinContainer.firstElementChild?.classList.add('relative', 'w-full', 'h-full', 'flex', 'items-center', 'justify-center');

                cards.forEach(card => {
                    card.classList.add('absolute', 'top-1/2', 'left-1/2', 'w-[min(1400px,92vw)]', 'h-[480px]', 'rounded-md', 'overflow-hidden', 'will-change-[transform,opacity,filter]');
                });
                
                const animateCardContentIn = (card: HTMLDivElement) => {
                    const animatedItems = card.querySelectorAll('.animate-item');
                    gsap.fromTo(animatedItems, { y: 20, opacity: 0 }, {
                        y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out',
                    });
                };

                gsap.set(cards, { y: window.innerHeight, opacity: 0, scale: 1, filter: 'blur(0px)', transform: 'translate(-50%, -50%)' });
                gsap.set(cards[0], { y: 0, opacity: 1, pointerEvents: 'auto' });
                cards[0].setAttribute('data-cursor-hover', 'link');
                
                animateCardContentIn(cards[0]);

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinContainer,
                        pin: true,
                        scrub: 1,
                        start: 'top top',
                        end: `+=${cards.length * window.innerHeight * 0.8}`,
                        onUpdate: () => {
                            cards.forEach((card) => {
                                const cardOpacity = gsap.getProperty(card, 'opacity') as number;
                                if (cardOpacity > 0.95) {
                                    if (card.style.pointerEvents !== 'auto') {
                                        card.style.pointerEvents = 'auto';
                                        card.setAttribute('data-cursor-hover', 'link');
                                    }
                                } else {
                                     if (card.style.pointerEvents !== 'none') {
                                        card.style.pointerEvents = 'none';
                                        card.removeAttribute('data-cursor-hover');
                                     }
                                }
                            });
                        }
                    },
                });

                cards.forEach((card, i) => {
                    if (i === cards.length - 1) return;

                    const label = `card-${i}`;
                    tl.addLabel(label);

                    tl.to(card, { y: -120, scale: 0.92, opacity: 0.5, filter: 'blur(2px)', duration: 1, ease: 'power2.inOut' }, label);
                    tl.to(cards[i + 1], { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.inOut', onStart: () => animateCardContentIn(cards[i+1]) }, label);
                    
                    for (let j = 0; j < i; j++) {
                        const recededCard = cards[j];
                        const distance = i - j;
                        tl.to(recededCard, {
                            y: -120 - (distance * 16),
                            scale: Math.max(0.82, 0.92 - (distance * 0.015)),
                            opacity: Math.max(0.15, 0.5 - (distance * 0.08)),
                            filter: `blur(${Math.min(4, 2 + (distance * 0.5))}px)`,
                            duration: 1, ease: 'power2.inOut'
                        }, label);
                    }
                });

            } else {
                // --- MOBILE & REDUCED MOTION FALLBACK ---
                pinContainer.style.height = 'auto';
                pinContainer.style.overflow = 'visible';
                if(pinContainer.firstElementChild) (pinContainer.firstElementChild as HTMLElement).style.display = 'block';

                cards.forEach(card => {
                    Object.assign(card.style, {
                        position: 'relative', transform: 'none', top: 'auto', left: 'auto',
                        width: '100%', height: '480px', marginBottom: '16px', borderRadius: '0.375rem',
                        opacity: '1', filter: 'blur(0px)', willChange: 'auto', pointerEvents: 'auto'
                    });
                    card.removeAttribute('data-cursor-hover');
                });

                if (!isReduced) {
                    cards.forEach((card) => {
                        const animatedItems = card.querySelectorAll('.animate-item');
                        gsap.from(animatedItems, {
                            y: 40, opacity: 0, ease: EASES.slide, stagger: 0.06, duration: 0.7,
                            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
                        });
                    });
                }
            }
        });

        return () => mm.revert();
    }, []);

    return (
        <section id="rituals" ref={componentRef}>
            <div
                className="dark-bg"
                style={{ backgroundColor: colors.graphite }}
                data-cursor="dark"
            >
                <div className="relative">
                  <div className="paper-texture"></div>
                  <div className="container py-16 md:py-24">
                      <p className="caption text-textLightMuted">Процедуры</p>
                      <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-textLight uppercase mt-2">
                          Ритуалы <br /> Красоты
                      </h2>
                  </div>
                </div>
            </div>
            <div ref={pinContainerRef} className="rituals-pin-container">
                <div className="rituals-stack">
                    {ritualsData.map((ritual, index) => (
                        <RitualCard
                            key={index}
                            ritual={ritual}
                            index={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rituals;
