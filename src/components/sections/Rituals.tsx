'use client';

import React, { useLayoutEffect, useRef, forwardRef, CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASES } from '@/lib/animations';
import Image from 'next/image';

const ritualsData = [
  {
    title: 'МАНИКЮР И НАРАЩИВАНИЕ НОГТЕЙ',
    description:
      'Идеальный маникюр и педикюр, от лечебного до дизайнерского. Безопасность, стерильность и внимание к деталям.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
  },
  {
    title: 'БРОВИ И РЕСНИЦЫ',
    description:
      'Коррекция и окрашивание бровей и ресниц для создания выразительного взгляда, который подчеркнет вашу естественную красоту.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
  },
  {
    title: 'СТРИЖКИ / УКЛАДКИ / УХОД ЗА ДЛИНОЙ',
    description:
      'От классических форм до смелых креативных решений, а также восстанавливающие уходы, которые вернут волосам силу и блеск.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
  },
  {
    title: 'ОКРАШИВАНИЯ / ВЫПРЯМЛЕНИЕ',
    description:
      'Сложные техники окрашивания, безопасное выпрямление и процедуры для глубокого восстановления структуры волос.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
  },
  {
    title: 'КЕРАТИН / БОТОКС',
    description:
      'Профессиональная диагностика и индивидуальные программы лечения и ухода для решения проблем кожи головы и стимуляции роста волос.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
  },
  {
    title: 'УХОД ЗА КОЖЕЙ ГОЛОВЫ',
    description:
      'Дневной, вечерний или для особого случая. Наши визажисты создадут образ, который подчеркнет вашу уникальность.',
    bgColor: '#F0EBE3',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(45, 45, 45, 0.18)',
  },
  {
    title: 'МАКИЯЖ / ОБРАЗ НЕВЕСТЫ',
    description:
      'Создадим для вас неповторимый образ в самый важный день. Учтем все пожелания и детали, чтобы вы чувствовали себя неотразимой.',
    bgColor: '#8FA89A',
    textColor: '#2D2D2D',
    numeralColor: 'rgba(240, 235, 227, 0.18)',
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
            <a
              href={linkHref}
              className="ritual-card-link"
              style={{
                color: textColor,
                opacity: 0.95,
              }}
              data-cursor-hover="link"
            >
              {linkLabel}
            </a>
          </div>

          {index === 0 ? (
            <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="https://i.ibb.co/27zQ4Nvz/Whisk-c3d7e1a30964faf9de94c4e89d9441feeg-removebg-preview.png"
                  alt="Manicure tool"
                  fill
                  className="object-contain object-center"
                  sizes="25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${bgColor} 0%, transparent 40%)`,
                  }}
                />
              </div>
            </div>
          ) : index === 1 ? (
            <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="https://i.ibb.co/RkVTLCPR/Whisk-27769cf02b3812bb0f246d211e75f64edr-removebg-preview.png"
                  alt="Eyebrow and lash tool"
                  fill
                  className="object-contain object-center"
                  sizes="25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${bgColor} 0%, transparent 40%)`,
                  }}
                />
              </div>
            </div>
          ) : index === 2 ? (
            <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
                <div className="relative w-full h-full">
                    <Image
                    src="https://i.ibb.co/tMTK5Dfg/Whisk-805bb058bc86e48be73448b52e080bdbdr-removebg-preview-1.png"
                    alt="Hairdressing tool"
                    fill
                    className="object-contain object-center"
                    sizes="25vw"
                    />
                    <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, ${bgColor} 0%, transparent 40%)`,
                    }}
                    />
                </div>
            </div>
          ) : index === 3 ? (
            <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
                <div className="relative w-full h-full">
                    <Image
                    src="https://i.ibb.co/vvVPy5SZ/Whisk-a7c8acf8514669fb9bf493e47ff7ffc6dr-removebg-preview.png"
                    alt="Hair coloring tool"
                    fill
                    className="object-contain object-center"
                    sizes="25vw"
                    />
                    <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, ${bgColor} 0%, transparent 40%)`,
                    }}
                    />
                </div>
            </div>
          ) : index === 4 ? (
            <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
                <div className="relative w-full h-full">
                    <Image
                    src="https://i.ibb.co/5x4hx901/Whisk-bba91139aa68284b2ff4dccad8136ab3dr-removebg-preview.png"
                    alt="Keratin treatment tool"
                    fill
                    className="object-contain object-center"
                    sizes="25vw"
                    />
                    <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, ${bgColor} 0%, transparent 40%)`,
                    }}
                    />
                </div>
            </div>
          ) : index === 5 ? (
            <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
                <div className="relative w-full h-full">
                    <Image
                    src="https://i.ibb.co/7dGfSpM0/Whisk-1e8ba549e98a6f0b8974891a067a5d37dr-removebg-preview.png"
                    alt="Scalp care tool"
                    fill
                    className="object-contain object-center"
                    sizes="25vw"
                    />
                    <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, ${bgColor} 0%, transparent 40%)`,
                    }}
                    />
                </div>
            </div>
          ) : index === 6 ? (
            <div className="absolute top-0 right-0 bottom-0 w-[25vw] pointer-events-none">
                <div className="relative w-full h-full">
                    <Image
                    src="https://i.ibb.co/6cshktBn/Whisk-e21bda035270e648ac1407efd0a90bd8dr-removebg-preview.png"
                    alt="Makeup tool"
                    fill
                    className="object-contain object-center"
                    sizes="25vw"
                    />
                    <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, ${bgColor} 0%, transparent 40%)`,
                    }}
                    />
                </div>
            </div>
          ) : (
            <div
              className="ritual-card-numeral"
              style={{
                WebkitTextStroke: `2px ${numeralColor}`,
              }}
            >
              {numeral}
            </div>
          )}
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

            <div className="rituals-stack relative px-[clamp(1rem,3vw,5rem)]">
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
                        linkLabel="цены"
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
