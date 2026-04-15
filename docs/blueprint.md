# **App Name**: KATSO Studio

## Core Features:

- Responsive Layout and Fixed UI: Implementation of a mobile-first responsive design, adapting seamlessly to various screen sizes. Includes always-visible elements like the circular logo mark (scroll-to-top), and the unique vertical 'K. STUDIO' pill-shaped tag.
- Advanced Scroll Experience: Integration of Lenis for smooth scrolling combined with GSAP 3 and the ScrollTrigger plugin to orchestrate complex scroll-linked animations and interactions across the page.
- Dynamic Marquee Sections: Creation of infinite-looping, scrolling marquees for branding ('KATSO') and social proof, featuring custom star dividers and interactive speed adjustments tied to scroll velocity, with hover effects.
- Sticky Stacking Service Display ('Rituals'): The core 'Rituals' section will implement a unique sticky-stacking mechanic for desktop, allowing full-viewport service cards to reveal their content with entrance animations. On mobile, this adapts to a scroll-snap behavior.
- Content-Driven Micro-Interactions: Includes sophisticated text animations such as hero section mask-reveals, the 'Why Us' section's character-staggered text fills, 'Masters' section hover-activated thumbnail reveals and mobile accordion functionality, and a dynamic 'FAQ' accordion with height animations.
- Integrated Design System Utilities: Development and application of a global utility system featuring a subtle 'paper-texture' overlay for visual richness and an 8-column 'grid-overlay' with '+' markers for precise visual guidance.
- Mapbox GL JS Integration: Displaying the studio's location within the footer using Mapbox GL JS, complete with a custom map pin, disabled scroll-zoom, and a graceful static fallback for when the Mapbox token is unavailable.

## Style Guidelines:

- Primary color: A rich, muted gold (#996B1F), evoking luxury and warmth, chosen to stand out elegantly against darker backgrounds.
- Background color: A deep, subtle warm charcoal (#1C1A15), providing a sophisticated foundation for the dark theme.
- Accent color: A vibrant coral-peach (#EC7E67), intended for sparse use to draw attention to key interactive elements and provide a lively contrast.
- The design will also incorporate a diverse, section-specific color palette as provided in the design system, featuring deep, earthy tones such as chocolate (#5A2E1B), darkgreen (#0E1410), and burgundy (#6B2B3A) for different service 'Rituals' cards, alongside lighter tones like offwhite (#E8DFD2) and bonefaq (#F2EFEA) for contrasting sections.
- Headlines will utilize 'Anton' (sans-serif, weight 400) for a heavy condensed display style, with 'Oswald' (sans-serif, weight 700) as a fallback, ensuring Cyrillic support. Body text will use 'Inter Tight' (sans-serif, weights 400 and 500), also supporting Cyrillic, with a specified leading of 1.5. Caption text will be 12px 'Inter Tight', uppercase, with increased letter-spacing.
- Custom SVG iconography will be used throughout, including a four-pointed star for marquee dividers and '+' markers at grid intersections. No generic or pre-built icon libraries will be employed.
- A mobile-first design approach is paramount, scaling up from a 390px viewport. The content will be constrained by a max-width of 1600px, with horizontal padding using a responsive clamp function. Sections will feature dynamic vertical padding, and an 8-column visual grid system with SVG '+' markers will be consistently applied to maintain a structured yet flexible layout.
- Extensive use of GSAP 3 with ScrollTrigger and Lenis will power smooth scrolling and detailed interactions. Animations include dynamic content reveals (e.g., hero text mask-reveals, count animations), continuous marquee scrolls with timeScale variations, intricate entrance animations for service cards, hover effects, and height-animated accordion elements.