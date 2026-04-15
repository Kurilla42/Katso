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
    name: 'Екатерина Ларина',
    role: 'Арт-директор, стилист',
    imageId: 'master-larina',
  },
  {
    name: 'Александр Вольф',
    role: 'Ведущий барбер',
    imageId: 'master-wolf',
  },
  {
    name: 'Марина Соколова',
    role: 'Мастер маникюра и педикюра',
    imageId: 'master-sokolova',
  },
  {
    name: 'Ольга Белова',
    role: 'Косметолог-эстетист',
    imageId: 'master-belova',
  },
  {
    name: 'Дмитрий Новиков',
    role: 'Массажист, SPA-терапевт',
    imageId: 'master-novikov',
  },
];

const MasterRow = React.forwardRef<
  HTMLButtonElement,
  {
    master: (typeof mastersData)[0];
    isHovered: boolean;
    isActive: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
  }
>(({ master, isHovered, isActive, onMouseEnter, onClick }, ref) => (
  <button
    ref={ref}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
    className={cn(
      'w-full text-left border-b transition-colors duration-200 focus-visible:outline-none',
      isHovered ? 'border-textDark bg-textLight' : 'border-white/20 bg-transparent',
      isHovered ? 'focus-visible:ring-2 focus-visible:ring-textDark ring-offset-2 ring-offset-textLight' : 'focus-visible:ring-2 focus-visible:ring-white'
    )}
    data-hovered={isHovered}
    data-cursor-hover="link"
    data-cursor={isHovered ? 'light' : 'dark'}
  >
    <div className="container py-6 flex justify-between items-center">
      <div
        className={cn(
          'flex flex-col md:flex-row md:items-baseline md:gap-6 transition-colors duration-200',
          isHovered ? 'text-textDark' : 'text-textLight'
        )}
      >
        <h3 className="font-display text-h3 uppercase">
          {master.name}
        </h3>
        <p className={cn('text-body-lg', isHovered ? 'text-textDarkMuted' : 'text-textLightMuted')}>
          {master.role}
        </p>
      </div>
      <div className={cn('transition-transform duration-400 ease-slide md:hidden', isActive ? 'rotate-45' : 'rotate-0')}>
        <svg className={cn('w-4 h-4', isHovered ? 'text-textDark' : 'text-textLight')} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeImageUrl, setActiveImageUrl] = useState('');
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
          const yTo = gsap.quickTo(imageEl, "yPercent", { duration: 0.4, ease: EASES.slide });
          
          let initialImageY: number | null = null;
          
          const handleMouseEnter = (index: number) => {
            if (initialImageY === null && imageEl.offsetParent) {
              initialImageY = imageEl.getBoundingClientRect().top;
            }
            const item = itemsRef.current[index];
            if (!item) return;

            const master = mastersData[index];
            const placeholder = PlaceHolderImages.find(p => p.id === master.imageId);
            if (placeholder) setActiveImageUrl(placeholder.imageUrl);

            const itemRect = item.getBoundingClientRect();
            const yOffset = initialImageY !== null ? itemRect.top - initialImageY + (itemRect.height - imageEl.offsetHeight) / 2 : 0;
            
            yTo(yOffset * 100 / window.innerHeight); // as % of viewport height
            setHoveredIndex(index);
          };

          const handleListMouseEnter = () => {
            gsap.to(imageEl, { autoAlpha: 1, duration: 0.2 });
            xTo(0);
          };

          const handleListMouseLeave = () => {
            xTo(100);
            gsap.to(imageEl, { autoAlpha: 0, duration: 0.2, delay: 0.2 });
            setHoveredIndex(null);
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
              // Cleanup to prevent memory leaks, checking if item exists
              item?.removeEventListener('mouseenter', () => handleMouseEnter(index));
            });
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
      className="dark-bg relative"
      style={{ backgroundColor: colors.backgroundDark }}
      data-cursor="dark"
    >
      <div className="paper-texture"></div>
      <div className="grid-overlay"></div>
      <div className="container py-16 md:py-40 relative">
        <p className="caption text-textLightMuted">Команда</p>
        <h2 className="font-display text-h1 text-textLight uppercase mt-2">
            Наши <br /> Мастера
        </h2>
      </div>

      <div className="masters-list">
        {mastersData.map((master, index) => {
          const placeholder = PlaceHolderImages.find(p => p.id === master.imageId);
          return (
            <div key={master.name} className="relative">
              <MasterRow
                ref={el => itemsRef.current[index] = el}
                master={master}
                isHovered={hoveredIndex === index}
                isActive={activeIndex === index}
                onMouseEnter={() => {}} 
                onClick={() => onRowClick(index)}
              />
              <div
                ref={el => accordionContentsRef.current[index] = el}
                className="h-0 overflow-hidden md:hidden"
              >
                <div className="p-4 bg-textLight">
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
        className="hidden md:block fixed top-1/2 right-[5vw] w-[clamp(280px,24vw,420px)] aspect-[4/5] z-20 pointer-events-none"
        style={{ transform: 'translateY(-50%)' }}
      >
        <div className="relative w-full h-full rounded-sm overflow-hidden">
          {activeImageUrl && (
            <Image
              key={activeImageUrl} // Force re-render on src change for transition
              src={activeImageUrl}
              alt="Photo of a master"
              fill
              sizes="24vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Masters;
