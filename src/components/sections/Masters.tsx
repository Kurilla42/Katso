'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design-tokens';
import { EASES } from '@/lib/animations';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mastersData = [
  {
    name: 'Софья Треллер',
    role: 'Главная Мамка, легенда, очень важная',
    imageId: 'master-treller',
  },
  {
    name: 'Мария Хохотушкина',
    role: 'Отвечает за бровки и смешнявки',
    imageId: 'master-frolova',
  },
  {
    name: 'Оксана Приятнова',
    role: 'Причесочки и няшности',
    imageId: 'master-priyatnova',
  },
  {
    name: 'Полина Новенькая',
    role: 'Ноготочки, не рисует «лепешки» (!?)',
    imageId: 'master-novenkaya',
  },
  {
    name: 'Антон Виллович',
    role: 'Просто хорош собой',
    imageId: 'master-kolesnikov',
    animationImages: [
        'https://i.ibb.co/B2F0BZpz/c02953e2-b03f-4043-acfc-63c694317304.jpg',
        'https://i.ibb.co/FbfJ8CH1/75889612-c09e-48cd-a4ff-585846bbc6a4.jpg',
        'https://i.ibb.co/9k7MTmMg/3c84985f-1065-4f58-8779-d69efd6e6712.jpg',
    ]
  },
];

const MasterRow = React.forwardRef<
  HTMLButtonElement,
  {
    master: (typeof mastersData)[0];
    isActive: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
  }
>(({ master, isActive, onMouseEnter, onClick }, ref) => (
  <button
    ref={ref}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
    className={cn(
      'w-full text-left border-b transition-colors duration-300 focus-visible:outline-none group',
      'border-cream/20 bg-transparent',
      'hover:bg-cream',
      'focus-visible:ring-2 focus-visible:ring-cream ring-offset-2 ring-offset-walnut'
    )}
    data-cursor-hover="link"
  >
    <div
      className="w-full mx-auto py-6 flex justify-between items-center"
      style={{
        paddingLeft: 'clamp(24px, 4vw, 80px)',
        paddingRight: 'clamp(24px, 4vw, 80px)',
      }}
    >
      <div
        className={cn(
          'flex flex-col md:flex-row md:items-baseline md:gap-6'
        )}
      >
        <h3 className="font-display text-h3 uppercase text-cream group-hover:text-background transition-colors duration-300">
          {master.name}
        </h3>
        <p className={cn('font-lora text-nude group-hover:text-background transition-colors duration-300')} style={{ fontSize: '1.2vw' }}>
          {master.role}
        </p>
      </div>
      <div className={cn('transition-transform duration-400 ease-slide md:hidden text-cream group-hover:text-background', isActive ? 'rotate-45' : 'rotate-0')}>
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0V16" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 8L0 8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  </button>
));
MasterRow.displayName = 'MasterRow';

const Masters = () => {
  const component = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const accordionContentsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [isAnimatingMaster, setIsAnimatingMaster] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
          isDesktop: `(min-width: 768px)`,
          isMobile: `(max-width: 767px)`
      }, (context) => {
        const { isDesktop } = context.conditions!;

        if (isDesktop) {
          const imageEl = imageWrapperRef.current!;
          gsap.set(imageEl, { xPercent: 100, autoAlpha: 0 });

          const xTo = gsap.quickTo(imageEl, "xPercent", { duration: 0.4, ease: EASES.slide });
          
          const handleMouseEnter = (index: number) => {
            const master = mastersData[index];
            
            if (timelineRef.current) {
              timelineRef.current.kill();
              timelineRef.current = null;
            }

            if (master.animationImages) {
              setIsAnimatingMaster(true);
              setActiveImages(master.animationImages);

              setTimeout(() => {
                if (!imageWrapperRef.current) return;
                const animatedElements = imageWrapperRef.current.querySelectorAll('.animated-image-instance');
                if (animatedElements.length < 3) return;

                gsap.set(animatedElements, { y: '100%' });
                gsap.set(animatedElements[0], { y: '0%' });

                timelineRef.current = gsap.timeline({ delay: 1 })
                  .to(animatedElements[1], { y: '0%', duration: 0.5, ease: EASES.slide })
                  .to(animatedElements[2], { y: '0%', duration: 0.5, ease: EASES.slide }, '+=0.5');
              }, 50);
            } else {
              setIsAnimatingMaster(false);
              const placeholder = PlaceHolderImages.find(p => p.id === master.imageId);
              setActiveImages(placeholder ? [placeholder.imageUrl] : []);
            }
          };

          const handleListMouseEnter = () => {
            gsap.to(imageEl, { autoAlpha: 1, duration: 0.2 });
            xTo(0);
          };

          const handleListMouseLeave = () => {
            xTo(100);
            gsap.to(imageEl, { autoAlpha: 0, duration: 0.2, delay: 0.2 });
            if (timelineRef.current) {
              timelineRef.current.kill();
              timelineRef.current = null;
            }
          };

          const listEl = component.current!.querySelector('.masters-list');
          listEl?.addEventListener('mouseenter', handleListMouseEnter);
          listEl?.addEventListener('mouseleave', handleListMouseLeave);

          itemsRef.current.forEach((item, index) => {
            item?.addEventListener('mouseenter', () => handleMouseEnter(index));
          });

          return () => {
            listEl?.removeEventListener('mouseenter', handleListMouseEnter);
            listEl?.removeEventListener('mouseleave', handleListMouseLeave);
            itemsRef.current.forEach((item, index) => {
              item?.removeEventListener('mouseenter', () => handleMouseEnter(index));
            });
            if (timelineRef.current) timelineRef.current.kill();
          }
        }
      });
    }, component);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    accordionContentsRef.current.forEach((content, index) => {
      gsap.to(content, {
        height: activeIndex === index ? 'auto' : 0,
        duration: 0.4,
        ease: EASES.slide,
        overwrite: true
      });
    });
  }, [activeIndex]);

  const onRowClick = (index: number) => {
    if (window.innerWidth < 768) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <section
      id="masters"
      ref={component}
      className="relative h-full overflow-y-auto"
      style={{ backgroundColor: '#2D2D2D' }}
      data-cursor="dark"
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
      <div className="grid-overlay"></div>
      <div 
        className="w-full mx-auto py-16 md:py-40 relative"
        style={{
            paddingLeft: 'clamp(24px, 4vw, 80px)',
            paddingRight: 'clamp(24px, 4vw, 80px)',
        }}
      >
        <p className="caption">Команда</p>
      </div>

      <div className="masters-list">
        {mastersData.map((master, index) => {
          const placeholder = PlaceHolderImages.find(p => p.id === master.imageId);
          return (
            <div key={master.name} className="relative">
              <MasterRow
                ref={el => itemsRef.current[index] = el}
                master={master}
                isActive={activeIndex === index}
                onMouseEnter={() => {}} 
                onClick={() => onRowClick(index)}
              />
              <div
                ref={el => accordionContentsRef.current[index] = el}
                className="h-0 overflow-hidden md:hidden bg-cream"
              >
                <div className="p-4">
                  {placeholder && (
                    <div className="relative aspect-[4/5] w-full">
                       <Image
                          src={placeholder.imageUrl}
                          alt={placeholder.description}
                          fill
                          sizes="(max-width: 767px) 100vw, 0vw"
                          className="object-cover rounded-sm"
                          data-ai-hint={placeholder.imageHint}
                       />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div
        ref={imageWrapperRef}
        className="hidden md:block fixed top-1/2 right-[25vw] w-[clamp(280px,24vw,420px)] aspect-[4/5] z-20 pointer-events-none"
        style={{ transform: 'translateY(-50%)' }}
      >
        <div className="relative w-full h-full rounded-sm overflow-hidden">
        {isAnimatingMaster ? (
            activeImages.map((src, index) => (
                <div
                    key={src}
                    className="animated-image-instance absolute inset-0 w-full h-full"
                    style={{ zIndex: index + 1 }}
                >
                    <Image
                        src={src}
                        alt="Photo of a master"
                        fill
                        sizes="24vw"
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))
        ) : (
            activeImages.length > 0 && (
                <Image
                    key={activeImages[0]}
                    src={activeImages[0]}
                    alt="Photo of a master"
                    fill
                    sizes="24vw"
                    className="object-cover"
                />
            )
        )}
        </div>
      </div>
    </section>
  );
};

export default Masters;
