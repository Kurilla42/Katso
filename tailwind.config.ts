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
        textDark: '#0B0B0B',
        textDarkMuted: 'rgba(11,11,11,0.60)',
        gridOnLight: 'rgba(11,11,11,0.08)',
        gridOnDark: 'rgba(255,255,255,0.10)',
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
      },
    },
  },
  plugins: [],
};

export default config;
