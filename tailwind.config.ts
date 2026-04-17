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
        grid: 'rgba(240, 235, 227, 0.08)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Geologica', 'sans-serif'],
        furore: ['Furore', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      fontSize: {
        xs: '0.75vw',
        sm: '0.8vw',
        caption: ['0.9vw', { lineHeight: '1.5', letterSpacing: '0.12em' }],
        body: '1vw',
        lg: '1.1vw',
        'body-lg': '1.2vw',
        h3: ['3.5vw', { lineHeight: '1.2' }],
        h2: ['6.5vw', { lineHeight: '1.1' }],
        h1: ['10vw', { lineHeight: '1.0' }],
        hero: ['13vw', { lineHeight: '0.9' }],
      },
      letterSpacing: {
        display: '-0.01em',
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
