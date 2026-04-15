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
    bgColor: colors.chocolate,
    theme: 'dark',
  },
  {
    title: 'Окрашивание',
    description: 'Сложные техники, натуральные оттенки и яркие цвета. Мы используем только премиальные красители для здоровья ваших волос.',
    bgColor: colors.darkgreen,
    theme: 'dark',
  },
  {
    title: 'Уход за волосами',
    description: 'Глубокое восстановление, увлажнение и питание. SPA-ритуалы для волос, которые вернут им силу, блеск и шелковистость.',
    bgColor: colors.dustyblue,
    theme: 'dark',
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
    bgColor: colors.burgundyLt,
    theme: 'dark',
  },
  {
    title: 'Макияж и брови',
    description: 'Дневной, вечерний или свадебный макияж. Коррекция и окрашивание бровей для создания выразительного взгляда.',
    bgColor: colors.wine,
    theme: 'dark',
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

    return (
        <div
            ref={ref}
            className={cn(
                'ritual-card group rounded-md overflow-hidden relative',
                isDark ? 'dark-bg' : 'light-bg'
            )}
            style={{ 
                backgroundColor: ritual.bgColor,
                top: `calc(${index} * var(--stack-peek))`,
                zIndex: index + 1,
            }}
            data-cursor={ritual.theme}
        >
            <div className="paper-texture"></div>
            <div className="grid-overlay"></div>
            
            <div 
              className="card-numeral absolute right-[clamp(1rem,3vw,5rem)] top-0 h-full flex items-center pointer-events-none"
              style={{
                fontSize: 'clamp(160px, 20vw, 360px)',
                lineHeight: 0.8,
                color: 'transparent',
                WebkitTextStroke: isDark ? '2px rgba(255, 255, 255, 0.18)' : '2px rgba(0, 0, 0, 0.1)',
                stroke: isDark ? '2px rgba(255, 255, 255, 0.18)' : '2px rgba(0, 0, 0, 0.1)',
              } as React.CSSProperties}
            >
              <span className="font-display">0{index + 1}</span>
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 md:p-12">
                <div 
                  className="card-top-band"
                  style={{ minHeight: 'var(--stack-peek)' }}
                >
                    <h3 className={`font-display text-card-headline uppercase animate-item ${textColor}`}>
                        {ritual.title}
                    </h3>
                </div>
                <div className="card-body">
                    <p className={`animate-item text-body max-w-[480px] mt-6`} style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(28, 26, 21, 0.7)', lineHeight: 1.55 }}>
                        {ritual.description}
                    </p>
                    <a href="#" className={`inline-flex items-center gap-2 mt-8 animate-item font-display uppercase tracking-[0.08em] underline underline-offset-[6px] decoration-2 rounded-sm focus-visible:outline-none ${isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-textDark'}`} style={{ color: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(28, 26, 21, 0.95)', fontSize: 'clamp(14px, 1.1vw, 20px)'}} data-cursor-hover="link">
                        Подробнее
                        <span className="text-xl relative -top-0.5">→</span>
                    </a>
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
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
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
            <div ref={stackRef} className="rituals-stack relative bg-graphite md:p-0">
                {ritualsData.map((ritual, index) => (
                    <RitualCard
                        key={ritual.title}
                        ritual={ritual}
                        index={index}
                        ref={(el) => {
                            if (el && cardsRef.current[index] === undefined) {
                              cardsRef.current[index] = el;
                            }
                          }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Rituals;
