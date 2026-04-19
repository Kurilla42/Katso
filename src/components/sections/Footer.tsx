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
      { text: 'Главная', href: '#hero' },
      { text: 'Услуги', href: '#rituals' },
      { text: 'Мастера', href: '#masters' },
      { text: 'Почему мы', href: '#why-us' },
      { text: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Услуги',
    links: [
      { text: 'Стрижки', href: '/services#hair' },
      { text: 'Окрашивание', href: '/services#color' },
      { text: 'Уход', href: '/services#scalp' },
      { text: 'Ногти', href: '/services#manicure' },
      { text: 'Брови', href: '/services#brows' },
      { text: 'Макияж', href: '/services#makeup' },
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
      { text: 'Whatsapp', href: 'https://wa.me/79120193362' },
    ],
  },
];

const Footer = () => {
    const wordMarkRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mapWrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            if (!wordMarkRef.current || !containerRef.current || !mapWrapperRef.current) return;

            const el = wordMarkRef.current;
            const container = containerRef.current;
            const mapWrapper = mapWrapperRef.current;

            const fitTextAndMap = () => {
                const containerWidth = container.offsetWidth / 2;
                const currentFontSize = parseFloat(window.getComputedStyle(el).fontSize);
                if (el.scrollWidth === 0) return;
                const scale = containerWidth / el.scrollWidth;
                const newSize = currentFontSize * scale * 0.95; // 0.95 for a bit of margin
                gsap.set(el, { fontSize: newSize });

                const textHeight = el.getBoundingClientRect().height;
                if (textHeight > 0) {
                    gsap.set(mapWrapper, { height: textHeight });
                }
            }

            const timer = setTimeout(() => {
                fitTextAndMap();
                window.addEventListener('resize', fitTextAndMap);
            }, 150);


            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', fitTextAndMap);
            }
        });

    }, []);


  return (
    <footer
      id="footer"
      style={{ backgroundColor: '#2D2D2D' }}
      data-cursor="dark"
    >
      <div className="relative">
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
        <div className="grid-overlay hidden lg:block"></div>
        
        {/* Desktop-only Wordmark and Map */}
        <div ref={containerRef} className="hidden lg:block">
          <div className="relative h-[clamp(200px,25vw,380px)] flex items-end overflow-hidden px-[clamp(1rem,3vw,5rem)]">
            <div className="absolute left-0 bottom-0 z-0 pl-[clamp(1rem,3vw,5rem)]">
              <h2 ref={wordMarkRef} className="font-display text-cream/10 leading-none select-none whitespace-nowrap">
                  KATSO
              </h2>
            </div>
            <div ref={mapWrapperRef} className="relative w-full lg:w-1/2 lg:w-5/12 ml-auto rounded-md overflow-hidden z-10">
                <Map />
            </div>
          </div>
        </div>

        {/* Mobile-only Wordmark */}
        <div className="lg:hidden text-center overflow-hidden px-[clamp(1rem,3vw,5rem)] pt-16">
            <h2 className="font-display text-cream/10 leading-none select-none" style={{fontSize: '28vw'}}>
                KATSO
            </h2>
        </div>
        
        <div className="py-16 lg:py-24 px-[clamp(1rem,3vw,5rem)]">
          {/* Four-column links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-x-28">
            {footerLinks.map((column, index) => {
              const orderClasses = [
                'order-3 lg:order-1', // Навигация
                'order-4 lg:order-2', // Услуги
                'order-1 lg:order-3', // Контакты
                'order-2 lg:order-4', // Соцсети
              ];

              return (
                <div key={column.title} className={orderClasses[index]}>
                  <h4 className="font-lora text-cream mb-4 uppercase text-[4vw] lg:text-[1.2vw]">
                    {column.title}
                  </h4>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.text} className="mt-2">
                        <a href={link.href} className="font-lora text-cream hover:text-accent transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-[4vw] lg:text-[1.2vw]" data-cursor-hover="link">
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Separator */}
          <div className="border-b border-cream/10 my-16 lg:my-24" />

          {/* Bottom CTA */}
          <a href="https://wa.me/79120193362" target="_blank" rel="noopener noreferrer" className="group block text-center py-8 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" data-cursor-hover="link">
              <span className="font-display tracking-display text-cream uppercase group-hover:text-accent transition-colors duration-200 text-[7vw] lg:text-[2.45vw]">
                  Записаться на ритуал
                  <span className="hidden lg:inline-block transition-transform duration-400 group-hover:translate-x-2 group-hover:-translate-y-2">&nbsp;↗</span>
              </span>
          </a>

          {/* Mobile-only Map */}
          <div className="lg:hidden relative w-full h-[20vh] rounded-md overflow-hidden z-10 mt-16">
            <Map />
          </div>
        </div>
        
        <div className="pb-6 px-[clamp(1rem,3vw,5rem)]">
          <div className="border-t border-cream/10 pt-4 flex justify-between items-center text-nude font-lora text-[3.5vw] lg:text-[1.2vw]">
              <span>© {new Date().getFullYear()} KATSO Studio. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
