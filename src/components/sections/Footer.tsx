'use client';

import { colors } from '@/lib/design-tokens';
import Map from '@/components/Map';
import StarIcon from '@/components/icons/Star';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const footerLinks = [
  {
    title: 'Навигация',
    links: [
      { text: 'Главная', href: '#' },
      { text: 'Услуги', href: '#' },
      { text: 'Мастера', href: '#' },
      { text: 'Почему мы', href: '#' },
      { text: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Услуги',
    links: [
      { text: 'Стрижки', href: '#' },
      { text: 'Окрашивание', href: '#' },
      { text: 'Уход', href: '#' },
      { text: 'Ногти', href: '#' },
      { text: 'Косметология', href: '#' },
      { text: 'Макияж', href: '#' },
    ],
  },
  {
    title: 'Контакты',
    links: [
      { text: 'Ижевск, ул. имени 50-летия ВЛКСМ, 6', href: '#' },
      { text: '+7 (912) 019-33-62', href: 'tel:+79120193362' },
      { text: 'hello@katso.md', href: 'mailto:hello@katso.md' },
    ],
  },
  {
    title: 'Соцсети',
    links: [
      { text: 'Instagram', href: 'https://www.instagram.com/katso.studio' },
      { text: 'VK', href: 'https://vk.com/httpkatso.studio' },
      { text: 'Telegram', href: 'https://t.me/katso_studio' },
    ],
  },
];

const Footer = () => {
    const wordMarkRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!wordMarkRef.current || !containerRef.current) return;

        const el = wordMarkRef.current;
        const container = containerRef.current;

        const fitText = () => {
            const containerWidth = container.offsetWidth / 2;
            const currentFontSize = parseFloat(window.getComputedStyle(el).fontSize);
            const scale = containerWidth / el.scrollWidth;
            const newSize = currentFontSize * scale * 0.95; // 0.95 for a bit of margin
            gsap.set(el, { fontSize: newSize });
        }

        fitText();

        window.addEventListener('resize', fitText);
        return () => window.removeEventListener('resize', fitText);

    }, []);


  return (
    <footer
      id="footer"
      style={{ backgroundColor: colors.background }}
      data-cursor="dark"
    >
      <div className="relative">
        <div className="paper-texture"></div>
        <div className="grid-overlay"></div>
        <div ref={containerRef}>
          <div className="relative h-[clamp(300px,30vw,500px)] flex items-end overflow-hidden">
            {/* Left: Giant Wordmark */}
            <div className="absolute left-0 bottom-0 -translate-x-[15%] md:-translate-x-[10%] z-0">
              <h2 ref={wordMarkRef} className="font-display text-cream/10 leading-none select-none whitespace-nowrap">
                  KATSO
              </h2>
            </div>

            {/* Right: Map */}
            <div className="relative w-full md:w-1/2 lg:w-5/12 h-[clamp(240px,25vw,400px)] ml-auto rounded-md overflow-hidden z-10">
                <Map />
            </div>
          </div>
        </div>
        
        <div className="py-16 md:py-24 px-[clamp(1rem,3vw,5rem)]">
          {/* Four-column links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-28">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="font-lora text-nude mb-4 uppercase" style={{ fontSize: '1.2vw' }}>{column.title}</h4>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.text} className="mt-2">
                      <a href={link.href} className="font-lora text-cream hover:text-accent transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" data-cursor-hover="link" style={{ fontSize: '1.2vw' }}>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="border-b border-cream/10 my-16 md:my-24" />

          {/* Bottom CTA */}
          <a href="#" className="group block text-center py-8 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" data-cursor-hover="link">
              <span className="font-display text-cream uppercase group-hover:text-accent transition-colors duration-200" style={{ fontSize: '5vw' }}>
                  Записаться на ритуал
                  <span className="inline-block transition-transform duration-400 group-hover:translate-x-2 group-hover:-translate-y-2">&nbsp;↗</span>
              </span>
          </a>
        </div>
        
        <div className="pb-6 px-[clamp(1rem,3vw,5rem)]">
          <div className="border-t border-cream/10 pt-4 flex justify-between items-center text-nude font-lora" style={{ fontSize: '1.2vw' }}>
              <span>© {new Date().getFullYear()} KATSO Studio. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
