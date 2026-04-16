# KATSO Studio

This is a Next.js project for KATSO Studio, built with Firebase Studio.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Final Polish Checklist & Next Steps

Here are the items you need to update to finalize your site content.

### Content & Configuration

- [ ] **Contact Information**: The footer contains placeholder contact details.
  - Edit `src/components/sections/Footer.tsx` and update the `footerLinks` array with your actual phone number and email address.

- [ ] **Online Booking Link**: The main "Записаться на ритуал" link is a placeholder.
  - In `src/components/sections/Footer.tsx`, change the `href="#"` on the main CTA to your online booking URL (e.g., YClients, etc.).

### Image Placeholders

The following images are placeholders from `https://picsum.photos`. You should replace them with your own professional photos. The paths to update are in `src/lib/placeholder-images.json`.

- `master-larina`: Photo of master Ekaterina Larina
  - File: `https://picsum.photos/seed/larina/400/500`
- `master-wolf`: Photo of master Alexander Wolf
  - File: `https://picsum.photos/seed/wolf/400/500`
- `master-sokolova`: Photo of master Marina Sokolova
  - File: `https://picsum.photos/seed/sokolova/400/500`
- `master-belova`: Photo of master Olga Belova
  - File: `https://picsum.photos/seed/belova/400/500`
- `master-novikov`: Photo of master Dmitry Novikov
  - File: `https://picsum.photos/seed/novikov/400/500`
- `faq-image-1`: Abstract photo for FAQ section
  - File: `https://picsum.photos/seed/faq1/500/600`
- `faq-image-2`: Second abstract photo for FAQ section
  - File: `https://picsum.photos/seed/faq2/500/600`

### Team Information

- [ ] **Masters' Names and Roles**: The "Masters" section uses placeholder names.
  - Edit `src/components/sections/Masters.tsx` and update the `mastersData` array with the real names and roles of your team members.
