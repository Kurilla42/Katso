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
            className={cn(
                'ritual-card group rounded-md overflow-hidden',
                isDark ? 'dark-bg' : 'light-bg'
            )}
            style={{ 
                top: `calc(${index} * var(--stack-peek))`,
                zIndex: index + 1,
            }}
            data-cursor={ritual.theme}
        >
            <div className={cn(
                "paper-texture transition-opacity duration-400",
                isDark ? "group-hover:opacity-[0.2]" : "group-hover:opacity-[0.2]"
            )}></div>
            <div className="absolute inset-0 p-8 sm:p-12 md:p-16">
                <div className={cn(
                    "absolute top-1/2 -translate-y-1/2 right-0 text-center select-none pointer-events-none text-[clamp(180px,28vw,540px)]",
                    "transition-colors duration-400",
                     bigNumberColor,
                    isDark ? "group-hover:text-white/20" : "group-hover:text-black/15"
                )}>
                    <span className="font-display leading-none">
                        0{index + 1}
                    </span>
                </div>
                <div className="grid grid-cols-12 gap-x-4 h-full items-center">
                    <div className="col-span-11 md:col-span-6 lg:col-span-5 z-10">
                        <h3 className={`font-display text-h1 uppercase animate-item ${textColor}`}>
                            {ritual.title}
                        </h3>
                        <p className={`mt-6 text-body-lg animate-item ${mutedTextColor} max-w-[min(560px,45vw)]`}>
                            {ritual.description}
                        </p>
                        <button className={`mt-8 animate-item ${textColor} rounded-sm focus-visible:outline-none focus-visible:ring-2 ${isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-textDark'}`} data-cursor-hover="link">
                            <span className='caption'>Подробнее &rarr;</span>
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
    const stackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!stackRef.current) return;
        const cards = Array.from(stackRef.current.children) as HTMLDivElement[];
        if (!cards.length) return;

        const mm = gsap.matchMedia(componentRef.current!);
        
        mm.add({
            isDesktop: "(min-width: 768px)",
            isReduced: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            const { isDesktop, isReduced } = context.conditions!;

            // Animate content inside each card
            cards.forEach((card) => {
                const animatedItems = card.querySelectorAll('.animate-item');
                gsap.from(animatedItems, {
                    y: 40, opacity: 0, ease: EASES.slide, stagger: 0.06, duration: 0.7,
                    scrollTrigger: { 
                        trigger: card, 
                        start: 'top 80%', 
                        toggleActions: 'play none none reverse' 
                    },
                });
            });

            if (isDesktop && !isReduced) {
                // Card slide-up entrance animation
                cards.forEach((card, index) => {
                    if (index < 3) return;
                    gsap.fromTo(card,
                      { y: 60 },
                      {
                        y: 0,
                        scrollTrigger: {
                          trigger: card,
                          start: 'top 100%',
                          end: 'top 70%',
                          scrub: 0.4
                        }
                      }
                    );
                });

                // Card recede animation (depth effect)
                cards.forEach((card, cardIndex) => {
                    if (cardIndex === cards.length - 1) return;

                    const cardsThatTrigger = cards.slice(cardIndex + 1);

                    cardsThatTrigger.forEach((triggerCard, stepIndex) => {
                        const scale = Math.max(0.88, 1 - 0.025 * (stepIndex + 1));
                        const opacity = Math.max(0.30, 0.85 - stepIndex * 0.12);
                        const blur = Math.min(5, 1.2 + stepIndex * 0.5); 

                        ScrollTrigger.create({
                            trigger: triggerCard,
                            start: 'top 90%',
                            end: 'top 30%',
                            scrub: 0.6,
                            animation: gsap.to(card, {
                                scale: scale,
                                opacity: opacity,
                                filter: `blur(${blur}px)`,
                                ease: 'none',
                                overwrite: 'auto'
                            })
                        });
                    });
                });
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
                      <h2 className="font-display text-h1 text-textLight uppercase mt-2">
                          Ритуалы <br /> Красоты
                      </h2>
                  </div>
                </div>
            </div>
            <div ref={stackRef} className="rituals-stack relative bg-graphite p-4 md:p-8">
                {ritualsData.map((ritual, index) => (
                    <RitualCard
                        key={ritual.title}
                        ritual={ritual}
                        index={index}
                        ref={(el) => {
                            if (el && (cardsRef.current as any)[index] === undefined) {
                              (cardsRef.current as any)[index] = el;
                            }
                          }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Rituals;
