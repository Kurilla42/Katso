'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { EASES } from '@/lib/animations';

const faqData = [
  {
    question: 'Как записаться на услугу?',
    answer:
      'Записаться можно через наш сайт, нажав кнопку "Записаться онлайн", по телефону или через личные сообщения в наших социальных сетях. Мы подберем для вас удобное время и мастера.',
  },
  {
    question: 'Нужно ли вносить предоплату?',
    answer:
      'Для подтверждения записи на комплексные услуги или к ведущим мастерам мы просим внести небольшую предоплату. Она будет вычтена из итоговой стоимости вашей услуги.',
  },
  {
    question: 'Что делать, если я опаздываю?',
    answer:
      'Пожалуйста, предупредите нас как можно скорее, если вы опаздываете. При опоздании более чем на 15 минут мы, возможно, не сможем оказать услугу в полном объеме или будем вынуждены перенести запись.',
  },
  {
    question: 'Могу ли я отменить или перенести запись?',
    answer:
      'Да, вы можете отменить или перенести запись не позднее, чем за 24 часа до назначенного времени. При более поздней отмене предоплата не возвращается.',
  },
  {
    question: 'Используете ли вы стерильные инструменты?',
    answer:
      'Безусловно. Мы уделяем огромное внимание безопасности. Все многоразовые инструменты проходят многоступенчатую стерилизацию в автоклаве, а одноразовые материалы вскрываются при вас.',
  },
  {
    question: 'Какую косметику вы используете в работе?',
    answer:
      'Мы работаем только на проверенной профессиональной косметике премиум-класса, такой как KEVIN.MURPHY, L\'Oréal Professionnel, Luxio и др. Вся продукция сертифицирована и гипоаллергенна.',
  },
];

// Reusable component for a single image in the gallery
const GalleryImage = ({ image, priority = false }: { image: (typeof PlaceHolderImages)[0], priority?: boolean }) => (
    <div className="relative w-[40vw] h-[50vw] lg:w-full lg:aspect-[4/5] lg:mb-[2vw] flex-shrink-0 lg:flex-shrink-1 lg:px-0">
      <Image
        src={image.imageUrl}
        alt={image.description}
        fill
        sizes="(max-width: 1023px) 40vw, 20vw"
        className="object-cover"
        data-ai-hint={image.imageHint}
        priority={priority}
      />
    </div>
  );

// Vertical column for desktop
const FaqGalleryColumn = ({
  images,
  innerRef,
  reversed,
}: {
  images: (typeof PlaceHolderImages);
  innerRef: React.RefObject<HTMLDivElement>;
  reversed?: boolean;
}) => {
  const displayImages = reversed ? [...images].reverse() : images;

  return (
    <div ref={innerRef}>
      {[...displayImages, ...displayImages].map((p, index) => (
        <GalleryImage key={index} image={p} priority={index < 4} />
      ))}
    </div>
  );
};

// Horizontal row for mobile
const FaqGalleryRow = ({
    images,
    innerRef
  }: {
    images: (typeof PlaceHolderImages);
    innerRef: React.RefObject<HTMLDivElement>;
  }) => {
      return (
          <div ref={innerRef} className="flex gap-2">
              {[...images, ...images].map((p, index) => (
                  <GalleryImage key={index} image={p} priority={index < 4} />
              ))}
          </div>
      )
  }

const AccordionItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: (typeof faqData)[0];
  isOpen: boolean;
  onClick: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(contentRef.current, {
      height: isOpen ? 'auto' : 0,
      duration: 0.4,
      ease: EASES.slide,
    });
  }, [isOpen]);

  return (
    <div className="border-b border-cream/20">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left gap-4 focus-visible:outline-none focus-visible:bg-black/5 rounded-sm pr-[clamp(1rem,3vw,5rem)]"
        data-cursor-hover="link"
      >
        <span className="font-lora text-cream text-[4.5vw] lg:text-[1.2vw]" style={{ lineHeight: 1.085 }}>{item.question}</span>
        <div className="relative w-4 h-4 flex-shrink-0 text-cream">
          <span className="absolute w-full h-px bg-current top-1/2 -translate-y-1/2"></span>
          <span
            className={cn(
              'absolute h-full w-px bg-current left-1/2 -translate-x-1/2 transition-transform duration-400 ease-slide',
              isOpen ? 'rotate-90' : 'rotate-0'
            )}
          ></span>
        </div>
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <p className="pb-6 text-cream font-lora pr-[clamp(1rem,3vw,5rem)] text-[4vw] lg:text-[1vw]" style={{ lineHeight: 1.085 }}>{item.answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Refs for desktop (vertical)
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  // Refs for mobile (horizontal)
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('faq-gallery-'));
  const leftImages = galleryImages.slice(0, 4); // Used for top row and left column
  const rightImages = galleryImages.slice(4, 8); // Used for bottom row and right column

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const triggerElement = sectionRef.current?.parentElement?.parentElement;
    if (!triggerElement) return;

    const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // --- Desktop Animation (Vertical Columns) ---
        mm.add("(min-width: 1024px)", () => {
            if (!leftColumnRef.current || !rightColumnRef.current) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: 'top top',
                    end: '+=100%',
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });
            gsap.set(rightColumnRef.current, { yPercent: -50 });
            tl.to(leftColumnRef.current, { yPercent: -50, ease: 'none' }, 0);
            tl.to(rightColumnRef.current, { yPercent: 0, ease: 'none' }, 0);
        });

        // --- Mobile Animation (Horizontal Rows) ---
        mm.add("(max-width: 1023px)", () => {
            const topRow = topRowRef.current;
            const bottomRow = bottomRowRef.current;
            if (!topRow || !bottomRow || !sectionRef.current) return;

            const animationTrigger = sectionRef.current;

            // Set initial position for bottom row for parallax effect
            gsap.set(bottomRow, { xPercent: -50 });

            gsap.to(topRow, {
                xPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: animationTrigger,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            gsap.to(bottomRow, {
                xPercent: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: animationTrigger,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });

    }, sectionRef);

    return () => ctx.revert();
  }, [leftImages, rightImages]);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{ backgroundColor: '#2D2D2D', overflowAnchor: 'none' }}
      data-cursor="dark"
      className="h-full w-full overflow-y-auto overscroll-behavior-contain"
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
      <div className="grid-overlay hidden lg:block"></div>
      <div className="absolute inset-y-0 left-[1px] w-px bg-grid hidden lg:block"></div>

      {/* Desktop-only: Left Column Image Gallery */}
      <div className="hidden lg:flex absolute top-0 left-0 h-full w-1/2 items-center pointer-events-none">
        <div
            className="relative flex justify-start gap-[5vw]"
            style={{ left: '5%' }}
        >
            <div className="w-[17.1vw] h-[80vh] overflow-hidden relative">
              <FaqGalleryColumn images={leftImages} innerRef={leftColumnRef} />
            </div>
            <div className="w-[17.1vw] h-[80vh] overflow-hidden relative mt-[10vh]">
              <FaqGalleryColumn images={rightImages} innerRef={rightColumnRef} reversed />
            </div>
        </div>
      </div>

      <div className="py-16 lg:py-40 relative lg:pl-[clamp(1rem,3vw,5rem)]">
        
        {/* Mobile-only: Horizontal Scrolling Gallery */}
        <div className="lg:hidden w-full overflow-hidden space-y-2 mb-8">
            <FaqGalleryRow images={leftImages} innerRef={topRowRef} />
            <FaqGalleryRow images={rightImages} innerRef={bottomRowRef} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start px-4 lg:px-0">
          
          {/* Spacer to push content to the right on desktop */}
          <div className="hidden lg:block lg:col-span-5"></div>

          {/* Right Column: FAQ & Contact */}
          <div className="lg:col-span-7">
            <div className="pr-[clamp(1rem,3vw,5rem)]">
              <h2 className="font-display uppercase text-cream leading-none text-[12vw] lg:text-[5vw]">
                FAQ
              </h2>
            </div>
            <div className="mt-8 lg:mt-12">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  item={item}
                  isOpen={activeIndex === index}
                  onClick={() => handleItemClick(index)}
                />
              ))}
            </div>
            
            <div className="mt-16 pr-[clamp(1rem,3vw,5rem)]">
              <p className="font-lora text-cream text-[4.5vw] lg:text-[1.2vw]">Не нашли ответ?</p>
              <a
                href="https://t.me/katso_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-lora text-cream group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nude focus-visible:ring-offset-4 focus-visible:ring-offset-surface text-[4.5vw] lg:text-[1.2vw]"
                data-cursor-hover="link"
                style={{ color: '#F0EBE3' }}
              >
                <span>Напишите нам</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&nbsp;&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
