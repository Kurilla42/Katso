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
        <div key={index} className="relative w-full aspect-[4/5] mb-[2vw]">
          <Image
            src={p.imageUrl}
            alt={p.description}
            fill
            sizes="21vw"
            className="object-cover"
            data-ai-hint={p.imageHint}
            priority={index < 4}
          />
        </div>
      ))}
    </div>
  );
};

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
        className="w-full flex justify-between items-center py-6 text-left gap-4 focus-visible:outline-none focus-visible:bg-black/5 rounded-sm"
        data-cursor-hover="link"
      >
        <span className="font-lora text-cream" style={{ lineHeight: 1.085, fontSize: '1.2vw' }}>{item.question}</span>
        <div className="relative w-4 h-4 flex-shrink-0 text-nude">
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
        <p className="pb-6 text-nude max-w-[min(640px,45vw)] font-lora" style={{ lineHeight: 1.085, fontSize: '1vw' }}>{item.answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('faq-gallery-'));
  const leftImages = galleryImages.slice(0, 4);
  const rightImages = galleryImages.slice(4, 8);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const triggerElement = sectionRef.current?.parentElement?.parentElement;
    if (!triggerElement || !leftColumnRef.current || !rightColumnRef.current) return;

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: 'top top',
                end: '+=100%',
                scrub: true,
                invalidateOnRefresh: true,
            }
        });

        // Set initial positions
        gsap.set(rightColumnRef.current, { yPercent: -50 });

        // Animate columns
        tl.to(leftColumnRef.current, { yPercent: -50, ease: 'none' }, 0);
        tl.to(rightColumnRef.current, { yPercent: 0, ease: 'none' }, 0);
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
      style={{ backgroundColor: '#2D2D2D' }}
      data-cursor="dark"
      className="h-full w-full overflow-y-auto"
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
      <div className="grid-overlay"></div>

      {/* Left Column: Image Gallery - Repositioned and Resized */}
      <div className="hidden lg:flex absolute top-0 left-0 h-full w-1/2 items-center pointer-events-none">
        <div
            className="relative flex justify-start gap-[5vw]"
            style={{ left: '5%' }}
        >
            <div className="w-[21vw] h-[80vh] overflow-hidden relative">
              <FaqGalleryColumn images={leftImages} innerRef={leftColumnRef} />
            </div>
            <div className="w-[21vw] h-[80vh] overflow-hidden relative mt-[10vh]">
              <FaqGalleryColumn images={rightImages} innerRef={rightColumnRef} reversed />
            </div>
        </div>
      </div>

      <div className="container py-16 md:py-40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Spacer to push content to the right */}
          <div className="hidden lg:block lg:col-span-6"></div>

          {/* Right Column: FAQ & Contact */}
          <div className="lg:col-start-7 lg:col-span-6">
            <h2 className="font-display uppercase text-cream leading-none" style={{ fontSize: '5vw' }}>
              FAQ
            </h2>
            <div className="mt-8 md:mt-12">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  item={item}
                  isOpen={activeIndex === index}
                  onClick={() => handleItemClick(index)}
                />
              ))}
            </div>
            
            <div className="mt-16">
              <p className="font-lora text-nude" style={{ fontSize: '1.2vw' }}>Не нашли ответ?</p>
              <a
                href="#"
                className="inline-block mt-2 font-medium text-accent group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                data-cursor-hover="link"
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
