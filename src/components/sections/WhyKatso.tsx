'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';
import { EASES } from '@/lib/animations';
import { cn } from '@/lib/utils';

type AnimatedCharactersProps = {
  text: string;
  className?: string;
  stagger?: number;
  duration?: number;
};

const AnimatedCharacters = forwardRef<HTMLDivElement, AnimatedCharactersProps>(({ 
  text, 
  className,
  stagger = 0.025,
  duration = 0.4
}, ref) => {
  const letters = text.split('');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = (ref as React.RefObject<HTMLDivElement>).current;
    if (!el) return;

    const letterSpans = el.querySelectorAll('.letter');
    
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: false,
          once: true,
        },
      });

      tl.to(letterSpans, {
        backgroundPositionX: '0%',
        ease: EASES.reveal,
        duration: duration,
        stagger: stagger,
      });
    });

    return () => mm.revert();
  }, [ref, duration, stagger]);

  return (
    <div className={className} ref={ref}>
      {letters.map((letter, i) => (
        <span
          key={i}
          className="letter inline-block"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 50%, transparent 50%)`,
            backgroundSize: '200% 100%',
            backgroundPositionX: '100%',
            color: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          {letter === ' ' ? ' ' : letter}
        </span>
      ))}
    </div>
  );
});
AnimatedCharacters.displayName = 'AnimatedCharacters';


const whyKatsoData = [
  {
    title: 'Экспертиза',
    description: 'Наши мастера — признанные профессионалы с многолетним опытом, постоянно совершенствующие свои навыки на международных семинарах и мастер-классах.',
    tagline: '(Искусство в деталях)',
    bgColor: colors.surface,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,5 L50,95" stroke="currentColor" strokeWidth="1" />
            <path d="M90,20 L10,80" stroke="currentColor" strokeWidth="1" />
            <path d="M10,20 L90,80" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Атмосфера',
    description: 'Мы создали пространство, где вы можете расслабиться, отвлечься от суеты и посвятить время себе. Каждая деталь интерьера продумана для вашего комфорта.',
    tagline: '(Ваше личное убежище)',
    bgColor: colors.walnut,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="1"/>
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: 'Качество',
    description: 'Мы работаем только с премиальными брендами и проверенными технологиями. Безопасность и здоровье наших клиентов — наш главный приоритет.',
    tagline: '(Бескомпромиссный стандарт)',
    bgColor: colors.surface,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="1"/>
            <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            <path d="M0 50H100" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
            <path d="M50 0V100" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
        </svg>
    ),
  },
];

const WhyKatso = () => {
    const headline1Ref = useRef<HTMLHeadingElement>(null);
    const headline2Ref = useRef<HTMLHeadingElement>(null);
    const headline3Ref = useRef<HTMLHeadingElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
          if (cardsContainerRef.current) {
              const cards = Array.from(cardsContainerRef.current.children);
              gsap.from(cards, {
                  y: 50,
                  opacity: 0,
                  duration: 0.7,
                  stagger: 0.2,
                  ease: EASES.slide,
                  scrollTrigger: {
                      trigger: cardsContainerRef.current,
                      start: 'top 80%',
                      once: true,
                  }
              });
          }
        });

        return () => mm.revert();
    }, []);

  return (
    <section
      id="why-us"
      className="py-16 md:py-40"
      data-cursor="dark"
    >
      <div className="relative">
        <div className="paper-texture"></div>
        <div className="grid-overlay"></div>
        <div className="container">
            <p className="caption">Почему мы</p>
            <h2 className="mt-4 font-display text-h1 text-cream uppercase">
              <AnimatedCharacters ref={headline1Ref} text="ПОЧЕМУ" />
              <AnimatedCharacters ref={headline2Ref} text="ВЫБИРАЮТ" />
              <AnimatedCharacters ref={headline3Ref} text="KATSO" className="text-cream" />
            </h2>
        </div>

        <div className="container mt-16 md:mt-24">
          <div ref={cardsContainerRef} className="flex flex-col gap-4 md:gap-6">
            {whyKatsoData.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                      'p-8 sm:p-12 md:p-16 rounded-md relative'
                  )}
                  style={{ backgroundColor: item.bgColor }}
                  data-cursor="dark"
                >
                  <div className="paper-texture"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 items-center">
                      <div className="text-cream">
                          <h3 className="font-display text-h2 uppercase">
                              {item.title}
                          </h3>
                          <p className="mt-4 text-body-lg max-w-[min(560px,45vw)] text-nude">
                              {item.description}
                          </p>
                      </div>
                      <div className="relative min-h-[160px] flex items-center justify-center md:justify-end">
                          <div className="w-32 h-32 md:w-[15vw] md:h-[15vw] max-w-[200px] max-h-[200px] flex-shrink-0">
                              <item.icon className="text-cream/30" />
                          </div>
                          <span className="absolute bottom-0 right-0 italic text-sm text-nude/70">
                              <span className="text-accent">(</span>{item.tagline.substring(1, item.tagline.length -1)}<span className="text-accent">)</span>
                          </span>
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKatso;
