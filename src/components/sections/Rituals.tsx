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
    mobileTitle: 'МАНИКЮР И НАРАЩИВАНИЕ',
    description:
      'Идеальный маникюр и педикюр, от лечебного до дизайнерского. Безопасность, стерильность и внимание к деталям.',
    bgColor: '#9EB89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/tpVftN6p/Image-5.png',
  },
  {
    id: 'brows',
    title: 'БРОВИ И РЕСНИЦЫ',
    mobileTitle: 'БРОВИ И РЕСНИЦЫ',
    description:
      'Коррекция и окрашивание бровей и ресниц для создания выразительного взгляда, который подчеркнет вашу естественную красоту.',
    bgColor: '#9EB89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/cSx8YPZn/Image-2.png',
  },
  {
    id: 'hair',
    title: 'СТРИЖКИ / УКЛАДКИ / УХОД ЗА ДЛИНОЙ',
    mobileTitle: 'СТРИЖКИ и УКЛАДКИ',
    description:
      'От классических форм до смелых креативных решений, а также восстанавливающие уходы, которые вернут волосам силу и блеск.',
    bgColor: '#9EB89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/5hd4Jyj2/Image-6.png',
  },
  {
    id: 'color',
    title: 'ОКРАШИВАНИЯ / ВЫПРЯМЛЕНИЕ',
    mobileTitle: 'ОКРАШИВАНИЯ ВЫПРЯМЛЕНИЕ',
    description:
      'Сложные техники окрашивания, безопасное выпрямление и процедуры для глубокого восстановления структуры волос.',
    bgColor: '#9EB89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/TDpZg3MN/Image.png',
  },
  {
    id: 'keratin',
    title: 'КЕРАТИН / БОТОКС',
    mobileTitle: 'КЕРАТИН И БОТОКС',
    description:
      'Профессиональная диагностика и индивидуальные программы лечения и ухода для решения проблем кожи головы и стимуляции роста волос.',
    bgColor: '#9EB89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/rKNpKH4h/Image.png',
  },
  {
    id: 'scalp',
    title: 'УХОД ЗА КОЖЕЙ ГОЛОВЫ',
    mobileTitle: 'УХОД ЗА КОЖЕЙ',
    description:
      'Дневной, вечерний или для особого случая. Наши визажисты создадут образ, который подчеркнет вашу уникальность.',
    bgColor: '#9EB89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/GQSbDRBD/Image-3.png',
  },
  {
    id: 'makeup',
    title: 'МАКИЯЖ / ОБРАЗ НЕВЕСТЫ',
    mobileTitle: 'МАКИЯЖ',
    description:
      'Создадим для вас неповторимый образ в самый важный день. Учтем все пожелания и детали, чтобы вы чувствовали себя неотразимой.',
    bgColor: '#9EB89A',
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
  mobileHeadline: string;
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
      mobileHeadline,
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
        <div className="flex h-full w-full relative">
            {/* Left Content Area (Mobile) */}
            <div className="w-1/2 flex flex-col justify-between p-4 md:hidden">
                <h3
                    className="font-display uppercase"
                    style={{ color: textColor, letterSpacing: '-0.01em', fontSize: '5vw', lineHeight: 1.1 }}
                >
                    {mobileHeadline}
                </h3>
                <Link
                    href={linkHref}
                    className="font-display uppercase underline underline-offset-4"
                    style={{ color: textColor, fontSize: '3vw' }}
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
        
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            
            const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
            if (cards.length < 1) return;
    
            // Apply animation to all cards.
            cards.forEach((card) => {
                gsap.to(card, {
                    scale: 0.9,
                    filter: 'blur(8px)',
                    yPercent: -100,
                    opacity: 0.8,
                    ease: 'none',
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
                    <h2 className="ritual-card-headline text-cream text-[10vw] md:text-[5vw]">
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
                        mobileHeadline={ritual.mobileTitle || ritual.title}
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
