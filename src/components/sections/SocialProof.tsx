'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { colors } from '@/lib/design-tokens';

const socialProofs = [
  "Лучшие мастера в городе",
  "Невероятная атмосфера и сервис",
  "Результат превзошел все ожидания",
  "Настоящие профессионалы своего дела",
  "Качество услуг на высшем уровне",
  "Мои волосы никогда не выглядели лучше",
  "Идеальный маникюр, который держится вечно",
];

const Separator = () => (
  <div className="w-2 h-2 bg-accent rounded-full mx-8" />
);

const MarqueeItem = ({ text }: { text: string }) => (
  <div className="flex items-center shrink-0">
    <span className="font-body text-body-lg text-cream whitespace-nowrap">
      {text}
    </span>
    <Separator />
  </div>
);

const SocialProof = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const marqueeContainer = wrapperRef.current.parentElement as HTMLElement;
    const content = wrapperRef.current.querySelector<HTMLDivElement>('.marquee-content');
    
    if (!content || !marqueeContainer) return;

    const contentWidth = content.offsetWidth;
    const duration = contentWidth / 60; // Speed: 60px/sec

    animation.current = gsap.to(wrapperRef.current, {
      x: -contentWidth,
      ease: 'none',
      duration: duration,
      repeat: -1,
    });

    const handleMouseEnter = () => {
      gsap.to(animation.current, { timeScale: 0.25, duration: 0.5, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(animation.current, { timeScale: 1, duration: 0.5, ease: 'power2.out' });
    };

    if (!isTouchDevice) {
      marqueeContainer.addEventListener('mouseenter', handleMouseEnter);
      marqueeContainer.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      animation.current?.kill();
      if (!isTouchDevice) {
        marqueeContainer.removeEventListener('mouseenter', handleMouseEnter);
        marqueeContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isTouchDevice]);

  const marqueeItems = socialProofs.map((text, i) => <MarqueeItem key={i} text={text} />);

  return (
    <section
      id="social-proof"
      className="overflow-hidden"
      style={{ backgroundColor: colors.surface }}
      data-cursor="dark"
    >
      <div className="py-6 md:py-8">
        <div ref={wrapperRef} className="flex">
          <div className="marquee-content flex shrink-0 items-center">
            {marqueeItems}
          </div>
          <div className="marquee-content flex shrink-0 items-center" aria-hidden="true">
            {marqueeItems}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
