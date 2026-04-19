'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLenis } from '@/context/LenisContext';
import { colors } from '@/lib/design-tokens';
import StarIcon from '@/components/icons/Star';

const MarqueeItem = () => (
  <div className="flex items-center shrink-0">
    <span className="mx-8 text-h2 font-display uppercase text-cream">
      KATSO
    </span>
    <StarIcon className="w-8 h-8 lg:w-12 lg:h-12 text-accent" />
  </div>
);

const BrandMarquee = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!wrapperRef.current) return;

    const content = wrapperRef.current.querySelector<HTMLDivElement>('.marquee-content');
    if (!content) return;

    // Ensure content is wide enough for a seamless loop
    const contentWidth = content.offsetWidth;
    const duration = contentWidth / 80; // Speed: 80px/sec

    animation.current = gsap.to(wrapperRef.current, {
      x: -contentWidth,
      ease: 'none',
      duration: duration,
      repeat: -1,
    });

    return () => {
      animation.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!lenis || !animation.current) return;

    const onScroll = (e: { velocity: number }) => {
      const velocity = Math.abs(e.velocity);
      let newTimeScale = 1 + velocity / 300;
      newTimeScale = gsap.utils.clamp(0.5, 2.5, newTimeScale);

      gsap.to(animation.current!, {
        timeScale: newTimeScale,
        duration: 0.2,
        ease: 'power1.out',
      });
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
      if (animation.current) {
        gsap.to(animation.current, { timeScale: 1, duration: 0.2 });
      }
    };
  }, [lenis]);

  const marqueeItems = Array(15).fill(0).map((_, i) => <MarqueeItem key={i} />);

  return (
    <section
      id="brand-marquee"
      className="overflow-hidden"
      style={{ backgroundColor: colors.walnut }}
      data-cursor="dark"
    >
      <div className="py-8 lg:py-4">
        <div ref={wrapperRef} className="flex">
          <div className="marquee-content flex shrink-0">
            {marqueeItems}
          </div>
          <div className="marquee-content flex shrink-0" aria-hidden="true">
            {marqueeItems}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
