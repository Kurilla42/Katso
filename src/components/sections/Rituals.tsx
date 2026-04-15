'use client';

import React, { useLayoutEffect, useRef, forwardRef, CSSProperties } from 'react';
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
    bgColor: colors.burgundyLt,
    theme: 'dark',
  },
  {
    title: 'Макияж и брови',
    description: 'Дневной, вечерний или свадебный макияж. Коррекция и окрашивание бровей для создания выразительного взгляда.',
    bgColor: colors.wine,
    theme: 'light',
  },
  {
    title: 'Массаж и SPA',
    description: 'Расслабляющие и оздоровительные массажи, обертывания и другие SPA-программы для гармонии души и тела.',
    bgColor: colors.graphite,
    theme: 'dark',
  },
];

interface RitualCardProps {
  index: number;
  totalCards: number;
  bgColor: string;
  textColor?: 'light' | 'dark';
  numeral: string;
  headline: string;
  description: string;
  linkLabel: string;
  linkHref: string;
}

const RitualCard = forwardRef<HTMLElement, RitualCardProps>(
  (
    {
      index,
      totalCards,
      bgColor,
      textColor = 'light',
      numeral,
      headline,
      description,
      linkLabel,
      linkHref,
    },
    ref
  ) => {
    const isLight = textColor === 'light';

    const style: CSSProperties = {
      backgroundColor: bgColor,
      top: `calc(${index} * var(--stack-peek))`,
      zIndex: index + 1,
    };

    return (
      <article className="ritual-card" style={style} ref={ref}>
        <div className="paper-texture" />
        <div className="grid-overlay" />

        <div className="ritual-card-inner">
          <div className="ritual-card-content">
            <h3
              className="ritual-card-headline"
              style={{ color: isLight ? '#FFFFFF' : '#0B0B0B' }}
            >
              {headline}
            </h3>
            <p
              className="ritual-card-description"
              style={{
                color: isLight
                  ? 'rgba(255,255,255,0.65)'
                  : 'rgba(11,11,11,0.65)',
              }}
            >
              {description}
            </p>
            <a
              href={linkHref}
              className="ritual-card-link"
              style={{
                color: isLight
                  ? 'rgba(255,255,255,0.95)'
                  : 'rgba(11,11,11,0.95)',
              }}
              data-cursor-hover="link"
            >
              {linkLabel}
            </a>
          </div>

          <div
            className="ritual-card-numeral"
            style={{
              WebkitTextStroke: `2px ${
                isLight ? 'rgba(255,255,255,0.18)' : 'rgba(11,11,11,0.18)'
              }`,
            }}
          >
            {numeral}
          </div>
        </div>
      </article>
    );
  }
);
RitualCard.displayName = 'RitualCard';

const Rituals = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLElement | null)[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia(componentRef.current!);
        
        mm.add({
            isDesktop: "(min-width: 768px)",
            isReduced: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            const { isDesktop, isReduced } = context.conditions as { isDesktop: boolean; isReduced: boolean };
            const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
            if (!cards.length) return;

            // Animate content inside each card
            cards.forEach((card) => {
                const animatedItems = card.querySelectorAll('.ritual-card-headline, .ritual-card-description, .ritual-card-link');
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
                    if (index < 3) return; // first three render at final y, no slide-in
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
                className="light-bg"
                style={{ backgroundColor: colors.background }}
                data-cursor="light"
            >
                <div className="relative">
                  <div className="paper-texture"></div>
                  <div className="container py-16 md:py-24">
                      <p className="caption text-textDarkMuted">Процедуры</p>
                      <h2 className="font-display text-h1 text-textDark uppercase mt-2">
                          Ритуалы <br /> Красоты
                      </h2>
                  </div>
                </div>
            </div>
            <div ref={stackRef} className="rituals-stack relative bg-background md:p-0">
                {ritualsData.map((ritual, index) => (
                    <RitualCard
                        key={ritual.title}
                        index={index}
                        totalCards={ritualsData.length}
                        bgColor={ritual.bgColor}
                        textColor={ritual.theme}
                        numeral={`0${index + 1}`}
                        headline={ritual.title}
                        description={ritual.description}
                        linkLabel="Подробнее →"
                        linkHref="#"
                        ref={(el: HTMLElement | null) => {
                            if (el) {
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
