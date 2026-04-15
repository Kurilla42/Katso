'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { colors } from '@/lib/design-tokens';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

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

const FaqImage = ({ imageId, className }: { imageId: string; className?: string }) => {
  const placeholder = PlaceHolderImages.find((p) => p.id === imageId);
  if (!placeholder) return null;

  return (
    <div className={cn('relative group', className)}>
      <Image
        src={placeholder.imageUrl}
        alt={placeholder.description}
        width={500}
        height={600}
        className="w-full h-full object-cover filter grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0"
        data-ai-hint={placeholder.imageHint}
      />
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-black/30" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-black/30" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-black/30" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-black/30" />
    </div>
  );
};


const AccordionItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: typeof faqData[0];
  isOpen: boolean;
  onClick: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(contentRef.current, {
      height: isOpen ? 'auto' : 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, [isOpen]);

  return (
    <div className="border-b border-textDark/20">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left gap-4"
        data-cursor-hover="link"
      >
        <span className="text-lg md:text-xl font-medium">{item.question}</span>
        <div className="relative w-4 h-4 flex-shrink-0">
          <span className="absolute w-full h-px bg-textDark top-1/2 -translate-y-1/2"></span>
          <span
            className={cn(
              'absolute h-full w-px bg-textDark left-1/2 -translate-x-1/2 transition-transform duration-500 ease-in-out',
              isOpen ? 'rotate-90' : 'rotate-0'
            )}
          ></span>
        </div>
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <p className="pb-6 text-textDarkMuted max-w-2xl">{item.answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="light-bg"
      style={{ backgroundColor: colors.bonefaq }}
      data-cursor="light"
    >
        <div className="paper-texture"></div>
        <div className="grid-overlay"></div>
      <div className="container py-16 md:py-40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Left Column: Images */}
          <div className="hidden lg:block lg:col-span-3 space-y-12 self-center">
             <FaqImage imageId="faq-image-1" className="aspect-[4/5] w-full max-w-[300px] mx-auto" />
             <FaqImage imageId="faq-image-2" className="aspect-[4/5] w-full max-w-[300px] mx-auto" />
          </div>

          {/* Center Column: FAQ */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-8xl md:text-[160px] lg:text-[200px] uppercase text-textDark leading-none">
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
          </div>

          {/* Right Column: Contact */}
          <div className="lg:col-span-3 lg:pt-12">
              <div className="sticky top-24 text-right">
                <p className="caption text-textDarkMuted">
                    Не нашли ответ?
                </p>
                <a href="#" className="inline-block mt-2 font-medium text-textDark group" data-cursor-hover="link">
                    <span>Связаться с нами</span>
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
