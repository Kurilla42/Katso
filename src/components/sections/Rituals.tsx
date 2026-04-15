'use client';

import { useEffect, useRef } from 'react';
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

const RitualCard = ({ ritual, index }: { ritual: (typeof ritualsData)[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let st: ScrollTrigger;

        if (contentRef.current && cardRef.current) {
            const animatedItems = contentRef.current.querySelectorAll('.animate-item');
            gsap.set(animatedItems, { y: 50, opacity: 0 });

            st = ScrollTrigger.create({
                trigger: cardRef.current,
                start: 'top 60%',
                end: 'bottom top',
                onEnter: () => {
                    gsap.to(animatedItems, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                    });
                },
                onLeaveBack: () => {
                     gsap.to(animatedItems, {
                        y: 50,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: 'power2.in',
                    });
                }
            });
        }
        return () => {
            if (st) st.kill();
        };
    }, []);

    const isDark = ritual.theme === 'dark';
    const textColor = isDark ? 'text-textLight' : 'text-textDark';
    const mutedTextColor = isDark ? 'text-textLightMuted' : 'text-textDarkMuted';
    const bigNumberColor = isDark ? 'text-white/10' : 'text-black/5';

    return (
        <div
            ref={cardRef}
            className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden"
            style={{ backgroundColor: ritual.bgColor }}
        >
            <div className={`${isDark ? 'dark-bg' : 'light-bg'} w-full`}>
                <div className="container relative">
                     <div className={`absolute top-1/2 -translate-y-1/2 right-0 -mr-16 md:mr-0 text-center select-none pointer-events-none ${bigNumberColor}`}>
                        <span className="font-display leading-none text-[20rem] md:text-[28rem] lg:text-[36rem]">
                            0{index + 1}
                        </span>
                    </div>

                    <div className="grid grid-cols-12 gap-x-4">
                        <div ref={contentRef} className="col-span-11 md:col-span-6 lg:col-span-5 py-20 z-10">
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
        </div>
    );
};


const Rituals = () => {
  return (
    <section id="rituals">
      <div
        className="dark-bg"
        style={{ backgroundColor: colors.graphite }}
      >
        <div className="container py-16 md:py-24">
            <p className="caption text-textLightMuted">Процедуры</p>
            <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-textLight uppercase mt-2">
                Ритуалы <br/> Красоты
            </h2>
        </div>
      </div>
      <div className="relative">
        {ritualsData.map((ritual, index) => (
          <RitualCard key={index} ritual={ritual} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Rituals;
