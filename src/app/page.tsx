import Hero from '@/components/sections/Hero';
import BrandMarquee from '@/components/sections/BrandMarquee';
import SocialProof from '@/components/sections/SocialProof';
import Rituals from '@/components/sections/Rituals';
import NewMe from '@/components/sections/NewMe';
import WhyKatso from '@/components/sections/WhyKatso';
import Masters from '@/components/sections/Masters';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandMarquee />
      <SocialProof />
      <Rituals />
      <NewMe />
      <WhyKatso />
      <Masters />
      <Faq />
      <Footer />
    </main>
  );
}
