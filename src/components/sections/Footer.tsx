'use client';

import { colors } from '@/lib/design-tokens';
import Map from '@/components/Map';
import StarIcon from '@/components/icons/Star';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const footerLinks = [
  {
    title: 'Навигация',
    links: ['Главная', 'Услуги', 'Мастера', 'Почему мы', 'FAQ'],
  },
  {
    title: 'Услуги',
    links: ['Стрижки', 'Окрашивание', 'Уход', 'Ногти', 'Косметология', 'Макияж'],
  },
  {
    title: 'Контакты',
    links: ['Bulevardul Ștefan cel Mare și Sfînt 64', '+373 69 123 456', 'hello@katso.md'],
  },
  {
    title: 'Соцсети',
    links: ['Instagram', 'Facebook', 'Telegram'],
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
      className="dark-bg"
      style={{ backgroundColor: colors.backgroundDark }}
      data-cursor="dark"
    >
      <div className="relative">
        <div className="paper-texture"></div>
        <div className="grid-overlay"></div>
        <div className="container" ref={containerRef}>
          <div className="relative h-[clamp(300px,30vw,500px)] flex items-end overflow-hidden">
            {/* Left: Giant Wordmark */}
            <div className="absolute left-0 bottom-0 -translate-x-[15%] md:-translate-x-[10%] z-0">
              <h2 ref={wordMarkRef} className="font-display text-white/10 leading-none select-none whitespace-nowrap">
                  KATSO
              </h2>
            </div>

            {/* Right: Map */}
            <div className="relative w-full md:w-1/2 lg:w-5/12 h-[clamp(240px,25vw,400px)] ml-auto rounded-md overflow-hidden z-10">
                <Map />
            </div>
          </div>
        </div>
        
        <div className="container py-16 md:py-24">
          {/* Four-column links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="caption text-textLightMuted mb-4">{column.title}</h4>
                <ul>
                  {column.links.map((link) => (
                    <li key={link} className="mt-2">
                      <a href="#" className="text-body text-textLight hover:text-accent transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" data-cursor-hover="link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="border-b border-white/10 my-16 md:my-24" />

          {/* Bottom CTA */}
          <a href="#" className="group block text-center py-8 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" data-cursor-hover="link">
              <span className="font-display text-h1 text-textLight uppercase group-hover:text-accent transition-colors duration-200">
                  Записаться на ритуал
                  <span className="inline-block transition-transform duration-400 group-hover:translate-x-2 group-hover:-translate-y-2">&nbsp;↗</span>
              </span>
          </a>
        </div>
        
        {/* Bottom bar */}
        <div className="container pb-6">
          <div className="border-t border-white/10 pt-4 flex justify-between items-center text-sm text-textLightMuted">
              <span>© {new Date().getFullYear()} KATSO Studio. All rights reserved.</span>
              <div className="flex items-center gap-2">
                  <span>Made with</span>
                  <StarIcon className="w-3 h-3 text-accent" />
                  <span>by AI</span>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
