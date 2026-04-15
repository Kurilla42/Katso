'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';

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
            className="ritual-card"
            style={{ backgroundColor: ritual.bgColor, willChange: 'transform, opacity, filter' }}
        >
            <div className={`${isDark ? 'dark-bg' : 'light-bg'} w-full h-full relative p-8 sm:p-12 md:p-16 flex flex-col justify-center`}>
                <div className={`absolute top-1/2 -translate-y-1/2 right-0 -mr-16 md:mr-0 text-center select-none pointer-events-none ${bigNumberColor}`}>
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
                        <button className={`mt-8 caption animate-item ${textColor}`}>
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
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const playContentAnimation = (card: HTMLDivElement | null) => {
        if (!card) return;
        const animatedItems = card.querySelectorAll('.animate-item');
        gsap.fromTo(animatedItems,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out',
            }
        );
    };

    const resetContentAnimation = (card: HTMLDivElement | null) => {
        if (!card) return;
        const animatedItems = card.querySelectorAll('.animate-item');
        gsap.set(animatedItems, { opacity: 0, y: 20 });
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: `(min-width: 768px) and (prefers-reduced-motion: no-preference)`,
            isMobile: `(max-width: 767px), (prefers-reduced-motion: reduce)`
        }, (context) => {
            const { isDesktop } = context.conditions!;
            const cards = cardsRef.current.filter(c => c !== null) as HTMLDivElement[];

            if (isDesktop) {
                if (!pinContainerRef.current || !stackRef.current || cards.length === 0) return;

                document.fonts.ready.then(() => {
                    ScrollTrigger.refresh();
                });
                
                gsap.set(pinContainerRef.current, { height: '100svh', overflow: 'hidden', position: 'relative' });
                gsap.set(stackRef.current, { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' });
                cards.forEach(card => {
                    gsap.set(card, {
                        position: 'absolute', top: '50%', left: '50%', xPercent: -50, yPercent: -50,
                        width: 'min(1400px, 92vw)', height: '480px', borderRadius: '4px', marginBottom: '0',
                    });
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinContainerRef.current,
                        pin: true,
                        scrub: 1,
                        start: 'top top',
                        end: `+=${cards.length * window.innerHeight * 0.8}`,
                    },
                });

                cards.forEach((card, index) => {
                    resetContentAnimation(card);
                    if (index === 0) {
                        gsap.set(card, { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', pointerEvents: 'auto' });
                        tl.add(() => playContentAnimation(card));
                    } else {
                        gsap.set(card, { y: window.innerHeight, scale: 1, opacity: 0, filter: 'blur(0px)', pointerEvents: 'none' });
                    }
                });

                cards.forEach((_, i) => {
                    if (i === cards.length - 1) return;

                    const currentCard = cards[i];
                    const nextCard = cards[i + 1];
                    const label = `step-${i}`;
                    
                    tl.addLabel(label);

                    tl.to(currentCard, {
                        y: -120, scale: 0.92, opacity: 0.5, filter: 'blur(2px)',
                        duration: 1, ease: 'power2.inOut'
                    }, label)
                    .set(currentCard, { pointerEvents: 'none' });

                    tl.to(nextCard, {
                        y: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
                        duration: 1, ease: 'power2.inOut'
                    }, label)
                    .set(nextCard, { pointerEvents: 'auto' })
                    .add(() => playContentAnimation(nextCard), label)
                    .add(() => resetContentAnimation(currentCard), label);
                    
                    for (let j = 0; j < i; j++) {
                        const recededCard = cards[j];
                        const depth = i - j;
                        
                        const newY = -120 - (depth * 16);
                        const newScale = Math.max(0.82, 0.92 - (depth * 0.015));
                        const newOpacity = Math.max(0.15, 0.5 - (depth * 0.08));
                        const newBlur = Math.min(4, 2 + (depth * 0.5));

                        tl.to(recededCard, {
                            y: newY, scale: newScale, opacity: newOpacity, filter: `blur(${newBlur}px)`,
                            duration: 1, ease: 'power2.inOut'
                        }, label);
                    }
                });
            } else { // Mobile or reduced motion
                if (pinContainerRef.current) gsap.set(pinContainerRef.current, { height: 'auto', overflow: 'visible' });
                if (stackRef.current) gsap.set(stackRef.current, { display: 'block', height: 'auto' });

                cards.forEach(card => {
                    gsap.set(card, {
                        position: 'relative', xPercent: 0, yPercent: 0, top: 'auto', left: 'auto',
                        transform: 'none', width: '100%', height: '480px', borderRadius: '4px',
                        opacity: 1, filter: 'blur(0px)', scale: 1, pointerEvents: 'auto', marginBottom: '16px',
                    });

                    const animatedItems = card.querySelectorAll('.animate-item');
                    gsap.set(animatedItems, { y: 20, opacity: 0 });

                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 80%',
                        onEnter: () => gsap.to(animatedItems, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }),
                        onLeaveBack: () => gsap.to(animatedItems, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.in' }),
                    });
                });
            }
        });

        return () => {
            mm.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section id="rituals">
            <div
                className="dark-bg"
                style={{ backgroundColor: colors.graphite }}
            >
                <div className="container py-16 md:py-24">
                    <p className="caption text-textLightMuted">Процедуры</p>
                    <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-textLight uppercase mt-2">
                        Ритуалы <br /> Красоты
                    </h2>
                </div>
            </div>
            <div ref={pinContainerRef}>
                <div ref={stackRef}>
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
