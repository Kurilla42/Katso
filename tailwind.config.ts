import type { Config } from 'tailwindcss';
import { colors } from './src/lib/design-tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        textPrimary: colors.cream,
        textSecondary: colors.nude,
        grid: 'rgba(237, 232, 224, 0.08)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Geologica', 'sans-serif'],
        furore: ['Furore', 'sans-serif'],
      },
      fontSize: {
        caption: ['clamp(0.6875rem, 0.75vw, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0.12em' }], // 11px -> 14px
        body: ['clamp(0.875rem, 0.95vw, 1.125rem)', { lineHeight: '1.5' }], // 14px -> 18px
        'body-lg': ['clamp(1rem, 1.1vw, 1.375rem)', { lineHeight: '1.5' }], // 16px -> 22px
        'card-headline': ['clamp(36px, 5.5vw, 112px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.5rem, 3.5vw, 4.5rem)', { lineHeight: '1.2' }], // 24px -> 72px
        h2: ['clamp(2.25rem, 6.5vw, 8.75rem)', { lineHeight: '1.1' }], // 36px -> 140px
        h1: ['clamp(3rem, 10vw, 15rem)', { lineHeight: '1.0' }], // 48px -> 240px
        hero: ['clamp(3.5rem, 13vw, 20rem)', { lineHeight: '0.9' }], // 56px -> 320px
      },
      letterSpacing: {
        display: '-0.02em',
        'display-lg': '-0.03em',
      },
      lineHeight: {
        display: '0.9',
        'display-lg': '0.85',
        body: '1.5',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
        slide: 'cubic-bezier(0.7, 0, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
