'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { colors } from '@/lib/design-tokens';
import { EASES } from '@/lib/animations';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { PlusMarker } from '@/components/ui/PlusMarker';

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
        className="w-full h-full object-cover filter grayscale transition-all duration-400 ease-in-out group-hover:grayscale-0"
        data-ai-hint={placeholder.imageHint}
      />
      <PlusMarker className="top-2 left-2" colorClassName="text-cream/30" />
      <PlusMarker className="top-2 right-2" colorClassName="text-cream/30" />
      <PlusMarker className="bottom-2 left-2" colorClassName="text-cream/30" />
      <PlusMarker className="bottom-2 right-2" colorClassName="text-cream/30" />
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
        <span className="text-body-lg font-medium text-cream">{item.question}</span>
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
        <p className="pb-6 text-nude max-w-[min(640px,45vw)]">{item.answer}</p>
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
      style={{ backgroundColor: colors.surface }}
      data-cursor="dark"
      className="h-full w-full overflow-y-auto"
    >
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: 'url(https://i.ibb.co/fzk39XBR/wall-4-light.png)',
            backgroundRepeat: 'repeat',
            opacity: 0.2,
            mixBlendMode: 'overlay',
          }}
        ></div>
        <div className="paper-texture"></div>
        <div className="grid-overlay"></div>
      <div className="container py-16 md:py-40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          
          {/* Left Column: Images */}
          <div className="hidden lg:block lg:col-span-5">
             <div className="relative w-full h-full min-h-[650px]">
                <div className="absolute top-0 left-0 w-8/12">
                    <FaqImage imageId="faq-image-1" className="aspect-[4/5] w-full" />
                </div>
                <div className="absolute top-48 right-0 w-8/12">
                    <FaqImage imageId="faq-image-2" className="aspect-[4/5] w-full" />
                </div>
             </div>
          </div>

          {/* Right Column: FAQ & Contact */}
          <div className="lg:col-start-7 lg:col-span-6">
            <h2 className="font-display text-hero uppercase text-cream leading-none">
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
                <p className="caption text-nude">
                    Не нашли ответ?
                </p>
                <a href="#" className="inline-block mt-2 font-medium text-accent group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface" data-cursor-hover="link">
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
