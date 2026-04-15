'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';
import { EASES } from '@/lib/animations';

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
            className="ritual-card h-svh w-full flex-shrink-0 snap-start md:sticky relative top-0"
            style={{ backgroundColor: ritual.bgColor, zIndex: index }}
            data-cursor={ritual.theme}
        >
            <div className={`${isDark ? 'dark-bg' : 'light-bg'} w-full h-full relative p-8 sm:p-12 md:p-16 flex flex-col justify-center`}>
                <div className="paper-texture"></div>
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
                        <button className={`mt-8 caption animate-item ${textColor} rounded-sm focus-visible:outline-none focus-visible:ring-2 ${isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-textDark'}`} data-cursor-hover="link">
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
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const cards = cardsRef.current.filter(c => c !== null) as HTMLDivElement[];

        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            cards.forEach((card) => {
                const animatedItems = card.querySelectorAll('.animate-item');
                gsap.from(animatedItems, {
                    y: 40,
                    opacity: 0,
                    ease: EASES.slide,
                    stagger: 0.06,
                    duration: 0.7,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            mm.revert();
        };
    }, []);

    return (
        <section id="rituals">
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
            <div id="rituals-stack" className="md:h-auto h-svh overflow-y-auto snap-y snap-mandatory no-scrollbar md:overflow-visible md:snap-none motion-reduce:snap-none motion-reduce:overflow-visible">
                {ritualsData.map((ritual, index) => (
                    <RitualCard
                        key={index}
                        ritual={ritual}
                        index={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Rituals;
