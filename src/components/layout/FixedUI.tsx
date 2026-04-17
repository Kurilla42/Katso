'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './CustomCursor';
import { useLenis } from '@/context/LenisContext';
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
    { text: 'Главная', href: '#hero' },
    { text: 'Услуги', href: '#rituals' },
    { text: 'Мастера', href: '#masters' },
    { text: 'Почему мы', href: '#why-us' },
    { text: 'FAQ', href: '#faq' },
];

const FixedUI = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();


  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const menuElement = menuRef.current;
    if (!menuElement) return;

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const st = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      onToggle: self => {
        if (menuElement.dataset) {
            menuElement.dataset.heroVisible = String(self.isActive);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const scrollToTop = () => {
    if (pathname !== '/') {
        router.push('/');
    } else {
        lenis?.scrollTo(0, { duration: 2.5, ease: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (pathname !== '/') {
        router.push('/' + target);
    } else {
        lenis?.scrollTo(target, { duration: 2 });
    }
  };

  return (
    <>
      <CustomCursor />
      {/* Top-left logo mark */}
      <button
        onClick={scrollToTop}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 w-10 h-10 rounded-full border border-cream flex items-center justify-center bg-transparent cursor-pointer group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Scroll to top"
        data-cursor-hover="link"
      >
        <span className="block w-1.5 h-1.5 bg-accent rounded-full transition-transform duration-300 ease-in-out group-hover:scale-[3.5]"></span>
      </button>

      {/* Top-right menu placeholder */}
      <div
        ref={menuRef}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 hidden md:flex items-center gap-6"
      >
        <a href="https://t.me/katso_studio" target="_blank" rel="noopener noreferrer" className="caption text-nude hover:text-accent transition-colors" data-cursor-hover="link">
          ЗАПИСАТЬСЯ ОНЛАЙН
        </a>
        <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} data-cursor-hover="link" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                <span className="caption text-cream data-[hero-visible=true]:text-nude hover:text-accent transition-colors">
                    МЕНЮ
                </span>
            </button>

            {isMenuOpen && (
                <div 
                    className="absolute right-0 top-full mt-4 w-56 rounded-md border border-cream/10 shadow-lg py-2 z-20 overflow-hidden"
                    style={{
                        backgroundColor: 'rgba(42, 39, 34, 0.8)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                    }}
                >
                    <ul>
                        {navLinks.map((link) => (
                        <li key={link.text}>
                            <a
                            href={link.href}
                            onClick={(e) => handleNavLinkClick(e, link.href)}
                            className="block w-full text-left px-6 py-3 font-body text-cream hover:bg-cream/5 transition-colors duration-200"
                            >
                            {link.text}
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FixedUI;
