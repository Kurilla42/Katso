'use client';

import React, { useLayoutEffect, useRef, forwardRef, CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASES } from '@/lib/animations';

const ritualsData = [
  {
    title: 'Стрижки',
    description:
      'От классических форм до смелых креативных решений. Наши мастера создадут идеальный образ, подчеркивающий вашу индивидуальность.',
    bgColor: '#8a9a6b',
    textColor: '#EDE8E0',
    numeralColor: 'rgba(237, 232, 224, 0.18)',
  },
  {
    title: 'Окрашивание',
    description:
      'Сложные техники, натуральные оттенки и яркие цвета. Мы используем только премиальные красители для здоровья ваших волос.',
    bgColor: '#EDE8E0',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
  },
  {
    title: 'Уход за волосами',
    description:
      'Глубокое восстановление, увлажнение и питание. SPA-ритуалы для волос, которые вернут им силу, блеск и шелковистость.',
    bgColor: '#8a9a6b',
    textColor: '#EDE8E0',
    numeralColor: 'rgba(237, 232, 224, 0.18)',
  },
  {
    title: 'Ногтевой сервис',
    description:
      'Идеальный маникюр и педикюр, от лечебного до дизайнерского. Безопасность, стерильность и внимание к деталям.',
    bgColor: '#EDE8E0',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
  },
  {
    title: 'Косметология',
    description:
      'Современные методики для сохранения молодости и красоты вашей кожи. Индивидуальные программы ухода от ведущих косметологов.',
    bgColor: '#8a9a6b',
    textColor: '#EDE8E0',
    numeralColor: 'rgba(237, 232, 224, 0.18)',
  },
  {
    title: 'Макияж и брови',
    description:
      'Дневной, вечерний или свадебный макияж. Коррекция и окрашивание бровей для создания выразительного взгляда.',
    bgColor: '#EDE8E0',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
  },
  {
    title: 'Массаж и SPA',
    description:
      'Расслабляющие и оздоровительные массажи, обертывания и другие SPA-программы для гармонии души и тела.',
    bgColor: '#8a9a6b',
    textColor: '#EDE8E0',
    numeralColor: 'rgba(237, 232, 224, 0.18)',
  },
];

interface RitualCardProps {
  index: number;
  totalCards: number;
  bgColor: string;
  textColor: string;
  numeralColor: string;
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
      textColor,
      numeralColor,
      numeral,
      headline,
      description,
      linkLabel,
      linkHref,
    },
    ref
  ) => {
    const style: CSSProperties = {
      backgroundColor: bgColor,
      top: `calc(${index} * var(--stack-peek))`,
      zIndex: index + 1,
    };

    return (
      <article className="ritual-card" style={style} ref={ref}>
        <div className="ritual-card-inner">
          <div className="ritual-card-content">
            <h3
              className="ritual-card-headline"
              style={{ color: textColor }}
            >
              {headline}
            </h3>
            <p
              className="ritual-card-description font-lora"
              style={{
                color: textColor,
                opacity: 0.65,
                fontSize: 'clamp(13px, 0.95vw, 16px)',
              }}
            >
              {description}
            </p>
            <a
              href={linkHref}
              className="ritual-card-link"
              style={{
                color: textColor,
                opacity: 0.95
              }}
              data-cursor-hover="link"
            >
              {linkLabel}
            </a>
          </div>

          <div
            className="ritual-card-numeral"
            style={{
              WebkitTextStroke: `2px ${numeralColor}`,
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
    const cardsRef = useRef<(HTMLElement | null)[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia(componentRef.current!);
        
        mm.add({
            isDesktop: "(min-width: 768px)",
            isReduced: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            const { isDesktop, isReduced } = context.conditions as { isDesktop: boolean; isReduced: boolean };
            if (!isDesktop || isReduced) return;
            
            const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
            if (!cards.length) return;

            // Animate content inside each card
            cards.forEach((card) => {
                const animatedItems = card.querySelectorAll('.ritual-card-headline, .ritual-card-description, .ritual-card-link');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            gsap.fromTo(animatedItems, 
                                { y: 40, opacity: 0 },
                                { y: 0, opacity: 1, ease: EASES.slide, stagger: 0.06, duration: 0.7 }
                            );
                            observer.unobserve(card);
                        }
                    });
                }, { threshold: 0.6 });
                observer.observe(card);
            });

            // Card recede animation (depth effect)
            const ritualsEl = componentRef.current;
            if (!ritualsEl) return;
            const stackPeek = parseInt(
              getComputedStyle(ritualsEl)
                .getPropertyValue('--stack-peek')
            );
            
            cards.forEach((card, index) => {
                if (index === cards.length - 1) return; // last card never recedes

                const nextCard = cards[index + 1];

                ScrollTrigger.create({
                    trigger: nextCard,
                    start: 'top bottom',
                    end: `top ${(index + 1) * stackPeek + 40}px`,
                    scrub: 0.6,
                    animation: gsap.to(card, {
                        scale: 0.97,
                        opacity: 0.75,
                        filter: 'blur(1.5px)',
                        ease: 'none',
                        overwrite: 'auto'
                    }),
                    invalidateOnRefresh: true
                });

                for (let stepIndex = 1; stepIndex < cards.length - index - 1; stepIndex++) {
                    const triggerCard = cards[index + 1 + stepIndex];
                    if (!triggerCard) break;

                    const stepBlur = Math.min(1.5 + stepIndex * 0.6, 4);
                    const stepScale = Math.max(0.97 - stepIndex * 0.012, 0.9);
                    const stepOpacity = Math.max(0.75 - stepIndex * 0.10, 0.35);

                    ScrollTrigger.create({
                        trigger: triggerCard,
                        start: 'top bottom',
                        end: `top ${(index + 1 + stepIndex) * stackPeek + 40}px`,
                        scrub: 0.6,
                        animation: gsap.to(card, {
                            scale: stepScale,
                            opacity: stepOpacity,
                            filter: `blur(${stepBlur}px)`,
                            ease: 'none',
                            overwrite: 'auto'
                        }),
                        invalidateOnRefresh: true
                    });
                }
            });
            
            document.fonts.ready.then(() => {
                ScrollTrigger.refresh();
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            id="rituals"
            ref={componentRef}
            data-cursor="dark"
            className="relative"
            style={{ backgroundColor: '#66686b' }}
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

            <div className="relative">
                <div
                    className="w-full mx-auto"
                    style={{
                        paddingLeft: 'clamp(24px, 4vw, 80px)',
                        paddingRight: 'clamp(24px, 4vw, 80px)',
                        paddingTop: 'clamp(64px, 10vh, 96px)',
                        paddingBottom: 'clamp(64px, 10vh, 96px)',
                    }}
                >
                    <h2 className="ritual-card-headline text-cream">
                        Ритуалы <br /> Красоты
                    </h2>
                </div>
            </div>

            <div className="rituals-stack relative md:p-0">
                {ritualsData.map((ritual, index) => (
                    <RitualCard
                        key={ritual.title}
                        index={index}
                        totalCards={ritualsData.length}
                        bgColor={ritual.bgColor}
                        textColor={ritual.textColor}
                        numeralColor={ritual.numeralColor}
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
