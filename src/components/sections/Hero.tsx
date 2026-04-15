'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/design-tokens';
import StarIcon from '@/components/icons/Star';

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Live time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);

    // Headline reveal animation
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.line-inner');
      gsap.fromTo(
        lines,
        { y: '100%' },
        {
          y: '0%',
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.2,
        }
      );
    }

    // Counters animation
    if (countersRef.current) {
      const counters = countersRef.current.querySelectorAll('.counter-value');
      gsap.from(counters, {
        textContent: 0,
        duration: 1.6,
        ease: 'power2.out',
        snap: { textContent: 1 },
        stagger: 0.12,
        scrollTrigger: {
          trigger: countersRef.current,
          start: 'top 80%',
        },
      });
    }

    // Metadata fade in
    if (metadataRef.current) {
      gsap.fromTo(
        metadataRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.5 }
      );
    }

    // Scroll indicator pulse
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        opacity: 0.7,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut',
      });
    }

    return () => {
      clearInterval(timerId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const stats = [
    { value: 1000, label: 'Довольных клиентов', suffix: '+' },
    { value: 5, label: 'Лет безупречной работы', suffix: '' },
    { value: 20, label: 'Профильных наград', suffix: '+' },
  ];

  return (
    <section
      id="hero"
      className="dark-bg relative"
      style={{ backgroundColor: colors.graphite }}
      data-cursor="dark"
    >
      <div className="grid-overlay"></div>
      <div className="min-h-screen flex flex-col justify-between">
        <div className="container pt-32 sm:pt-40">
          <h1
            ref={headlineRef}
            className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[160px] xl:text-[200px] text-textLight uppercase"
          >
            <div className="overflow-hidden">
              <span className="line-inner block">Создаём</span>
            </div>
            <div className="overflow-hidden">
              <span className="line-inner block">ритуалы</span>
            </div>
            <div className="overflow-hidden">
              <span className="line-inner block text-orange">красоты</span>
            </div>
          </h1>
        </div>

        <div className="container pb-8 z-10">
          <div
            ref={metadataRef}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8"
          >
            <div ref={countersRef} className="flex flex-wrap gap-8 sm:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-baseline gap-2">
                  <span className="counter-value font-display text-4xl sm:text-5xl text-textLight">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="font-display text-4xl sm:text-5xl text-orange">
                      {stat.suffix}
                    </span>
                  )}
                  <span className="caption text-textLightMuted max-w-[100px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-textLightMuted flex-shrink-0">
              <StarIcon className="w-5 h-5 opacity-50" />
              <div className="caption flex gap-4">
                <span>КИШИНЁВ, МОЛДОВА</span>
                <span>{currentTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="caption text-textLightMuted">SCROLL</span>
          <div className="w-px h-10 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
