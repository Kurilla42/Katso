import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroller } from '@/components/SmoothScroller';
import FixedUI from '@/components/layout/FixedUI';

export const metadata: Metadata = {
  title: 'KATSO Studio',
  description: 'Студия красоты в Кишинёве, Молдова.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Geologica:wght@300&family=Lora:wght@400&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://i.ibb.co/s9tP31PR/katso-fav.jpg" sizes="any" />
      </head>
      <body className="font-body">
        <SmoothScroller>
          <FixedUI />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
