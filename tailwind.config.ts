import type { Config } from 'tailwindcss';
import { colors } from './src/lib/design-tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1600px',
      },
    },
    extend: {
      colors: {
        ...colors,
        textLight: 'rgba(255,255,255,0.88)',
        textLightMuted: 'rgba(255,255,255,0.60)',
        textDark: colors.warmcharcoal,
        textDarkMuted: 'rgba(28, 26, 21, 0.60)',
        gridOnLight: 'rgba(28, 26, 21, 0.08)',
        gridOnDark: 'rgba(255,255,255,0.10)',
        backgroundDark: colors.warmcharcoal,
      },
      fontFamily: {
        display: ['Anton', 'Oswald', 'sans-serif'],
        body: ['Inter Tight', 'sans-serif'],
      },
      fontSize: {
        caption: ['12px', { lineHeight: '1.5', letterSpacing: '0.12em' }],
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
        'reveal': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'slide': 'cubic-bezier(0.7, 0, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
