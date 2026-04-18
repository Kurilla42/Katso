'use client';

import React, { useLayoutEffect, useRef, forwardRef, CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASES } from '@/lib/animations';
import Image from 'next/image';
import Link from 'next/link';

const ritualsData = [
  {
    id: 'manicure',
    title: 'МАНИКЮР И НАРАЩИВАНИЕ НОГТЕЙ',
    description:
      'Идеальный маникюр и педикюр, от лечебного до дизайнерского. Безопасность, стерильность и внимание к деталям.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/tpVftN6p/Image-5.png',
  },
  {
    id: 'brows',
    title: 'БРОВИ И РЕСНИЦЫ',
    description:
      'Коррекция и окрашивание бровей и ресниц для создания выразительного взгляда, который подчеркнет вашу естественную красоту.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
    imageUrl: 'https://i.ibb.co/cSx8YPZn/Image-2.png',
  },
  {
    id: 'hair',
    title: 'СТРИЖКИ / УКЛАДКИ / УХОД ЗА ДЛИНОЙ',
    description:
      'От классических форм до смелых креативных решений, а также восстанавливающие уходы, которые вернут волосам силу и блеск.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/5hd4Jyj2/Image-6.png',
  },
  {
    id: 'color',
    title: 'ОКРАШИВАНИЯ / ВЫПРЯМЛЕНИЕ',
    description:
      'Сложные техники окрашивания, безопасное выпрямление и процедуры для глубокого восстановления структуры волос.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
    imageUrl: 'https://i.ibb.co/TDpZg3MN/Image.png',
  },
  {
    id: 'keratin',
    title: 'КЕРАТИН / БОТОКС',
    description:
      'Профессиональная диагностика и индивидуальные программы лечения и ухода для решения проблем кожи головы и стимуляции роста волос.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/rKNpKH4h/Image.png',
  },
  {
    id: 'scalp',
    title: 'УХОД ЗА КОЖЕЙ ГОЛОВЫ',
    description:
      'Дневной, вечерний или для особого случая. Наши визажисты создадут образ, который подчеркнет вашу уникальность.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
    imageUrl: 'https://i.ibb.co/GQSbDRBD/Image-3.png',
  },
  {
    id: 'makeup',
    title: 'МАКИЯЖ / ОБРАЗ НЕВЕСТЫ',
    description:
      'Создадим для вас неповторимый образ в самый важный день. Учтем все пожелания и детали, чтобы вы чувствовали себя неотразимой.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/4ZFJFKMx/Image-1.png',
  },
];

interface RitualCardProps {
  index: number;
  totalCards: number;
  bgColor: string;
  textColor: string;
  numeralColor: string;
  headline: string;
  description: string;
  imageUrl: string;
  linkHref: string;
}

const RitualCard = forwardRef<HTMLElement, RitualCardProps>(
  (
    {
      index,
      bgColor,
      textColor,
      headline,
      description,
      imageUrl,
      linkHref,
    },
    ref
  ) => {
    const style: CSSProperties = {
      backgroundColor: bgColor,
      color: textColor,
    };
    const cursorTheme = bgColor === '#F0EBE3' ? 'light' : 'dark';

    return (
      <article className="ritual-card" style={style} ref={ref} data-cursor={cursorTheme}>
        <div className="flex h-full w-full">
            {/* Left Content Area (Mobile) */}
            <div className="w-1/2 flex flex-col justify-between p-4 md:hidden">
                <h3
                    className="font-display uppercase text-3xl/[1.1]"
                    style={{ color: textColor, letterSpacing: '-0.01em' }}
                >
                    {headline}
                </h3>
                <Link
                    href={linkHref}
                    className="font-display text-base uppercase underline underline-offset-4"
                    style={{ color: textColor }}
                    data-cursor-hover="link"
                >
                    ЦЕНЫ<span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&nbsp;→</span>
                </Link>
            </div>

            {/* Right Image Area (Mobile) */}
            <div className="relative w-1/2 md:hidden">
                <Image
                  src={imageUrl}
                  alt={headline}
                  fill
                  className="object-cover object-top"
                  sizes="50vw"
                  priority={index < 2}
                />
            </div>

            {/* Desktop Layout (hidden on mobile) */}
            <div className="hidden md:block w-full h-full relative">
                <div className="ritual-card-inner">
                    <div className="ritual-card-content">
                        <h3
                            className="ritual-card-headline"
                            style={{ color: textColor, letterSpacing: '-0.01em', left: '-2vw' }}
                        >
                            {headline}
                        </h3>
                    </div>
                </div>
                <div
                    className="absolute bottom-[clamp(20px,2.5vw,40px)] text-right"
                    style={{
                        maxWidth: '30vw',
                        right: 'calc(25vw + 5vw)',
                    }}
                >
                    <p
                        className="ritual-card-description font-lora"
                        style={{
                            color: textColor,
                            opacity: 0.65,
                            lineHeight: 1.085,
                        }}
                    >
                        {description}
                    </p>
                    <Link
                        href={linkHref}
                        className="ritual-card-link group"
                        style={{
                            color: textColor,
                            opacity: 0.95,
                        }}
                        data-cursor-hover="link"
                    >
                        ЦЕНЫ<span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&nbsp;→</span>
                    </Link>
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
                    <div className="relative w-full h-full">
                        <Image
                            src={imageUrl}
                            alt={headline}
                            fill
                            className="object-cover object-top"
                            sizes="25vw"
                            priority={index < 2}
                        />
                    </div>
                </div>
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
            isReduced: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            const { isReduced } = context.conditions as { isReduced: boolean };
            if (isReduced) return;
            
            const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
            if (cards.length < 1) return;

            const ritualsEl = componentRef.current;
            if (!ritualsEl) return;
            
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

            // Card disappear animation
            cards.forEach((card, index) => {
                // Don't animate the last card away
                if (index === cards.length - 1) return;
                
                gsap.to(card, {
                    scale: 0.9,
                    yPercent: -100,
                    filter: 'blur(8px)',
                    ease: 'power1.in',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 30%',
                        end: 'top top',
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    },
                });
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
            style={{ backgroundColor: '#2D2D2D' }}
        >
            <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    backgroundImage: 'url(https://i.ibb.co/zWNnhBMd/concrete-wall-2-1.png)',
                    backgroundRepeat: 'repeat',
                    opacity: 0.7,
                    mixBlendMode: 'overlay',
                }}
            ></div>
            <div className="paper-texture"></div>

            <div className="relative">
                <div
                    className="w-full mx-auto"
                    style={{
                        paddingLeft: '5%',
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

            <div className="rituals-stack relative px-[clamp(1rem,3vw,5rem)]">
                {ritualsData.map((ritual, index) => (
                    <RitualCard
                        key={ritual.title}
                        index={index}
                        totalCards={ritualsData.length}
                        bgColor={ritual.bgColor}
                        textColor={ritual.textColor}
                        numeralColor={ritual.numeralColor}
                        headline={ritual.title}
                        description={ritual.description}
                        linkHref={`/services#${ritual.id}`}
                        imageUrl={ritual.imageUrl}
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
