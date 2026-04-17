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
    imageUrl: 'https://i.ibb.co/spH1Fjd7/Whisk-c3d7e1a30964faf9de94c4e89d9441feeg-removebg-preview-upscayl-2x-ultrasharp-4x.png',
  },
  {
    id: 'brows',
    title: 'БРОВИ И РЕСНИЦЫ',
    description:
      'Коррекция и окрашивание бровей и ресниц для создания выразительного взгляда, который подчеркнет вашу естественную красоту.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
    imageUrl: 'https://i.ibb.co/XZdQq3fJ/Whisk-27769cf02b3812bb0f246d211e75f64edr-removebg-preview-upscayl-2x-ultrasharp-4x.png',
  },
  {
    id: 'hair',
    title: 'СТРИЖКИ / УКЛАДКИ / УХОД ЗА ДЛИНОЙ',
    description:
      'От классических форм до смелых креативных решений, а также восстанавливающие уходы, которые вернут волосам силу и блеск.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/23NQVcnf/Whisk-2d20512359f9059bbcc4a221cef3c79fdr-removebg-preview-upscayl-2x-ultrasharp-4x.png',
  },
  {
    id: 'color',
    title: 'ОКРАШИВАНИЯ / ВЫПРЯМЛЕНИЕ',
    description:
      'Сложные техники окрашивания, безопасное выпрямление и процедуры для глубокого восстановления структуры волос.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
    imageUrl: 'https://i.ibb.co/6RJ64XBy/Whisk-a7c8acf8514669fb9bf493e47ff7ffc6dr-removebg-preview-upscayl-2x-ultrasharp-4x.png',
  },
  {
    id: 'keratin',
    title: 'КЕРАТИН / БОТОКС',
    description:
      'Профессиональная диагностика и индивидуальные программы лечения и ухода для решения проблем кожи головы и стимуляции роста волос.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/SwwdwCCk/Whisk-bba91139aa68284b2ff4dccad8136ab3dr-removebg-preview-upscayl-2x-ultrasharp-4x.png',
  },
  {
    id: 'scalp',
    title: 'УХОД ЗА КОЖЕЙ ГОЛОВЫ',
    description:
      'Дневной, вечерний или для особого случая. Наши визажисты создадут образ, который подчеркнет вашу уникальность.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
    imageUrl: 'https://i.ibb.co/5gY1NcSJ/Whisk-7135b2e72ee7bbbad5f48f302f0e6577dr-removebg-preview-upscayl-2x-ultrasharp-4x.png',
  },
  {
    id: 'makeup',
    title: 'МАКИЯЖ / ОБРАЗ НЕВЕСТЫ',
    description:
      'Создадим для вас неповторимый образ в самый важный день. Учтем все пожелания и детали, чтобы вы чувствовали себя неотразимой.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
    imageUrl: 'https://i.ibb.co/pjDSJnrJ/Whisk-e21bda035270e648ac1407efd0a90bd8dr-removebg-preview-upscayl-2x-ultrasharp-4x.png',
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

    return (
      <article className="ritual-card" style={style} ref={ref}>
        <div className="ritual-card-inner">
          <div className="ritual-card-content">
            <h3
              className="ritual-card-headline"
              style={{ color: textColor, letterSpacing: '-0.01em', left: '-2vw' }}
            >
              {headline}
            </h3>
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
              ПОДРОБНЕЕ<span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&nbsp;→</span>
            </Link>
          </div>

            <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={headline}
                  fill
                  className="object-contain object-center"
                  sizes="25vw"
                  priority={index < 2}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${bgColor} 0%, transparent 40%)`,
                  }}
                />
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
            isDesktop: "(min-width: 768px)",
            isReduced: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            const { isDesktop, isReduced } = context.conditions as { isDesktop: boolean; isReduced: boolean };
            if (!isDesktop || isReduced) return;
            
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
