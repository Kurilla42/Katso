import Hero from '@/components/sections/Hero';
import BrandMarquee from '@/components/sections/BrandMarquee';
import SocialProof from '@/components/sections/SocialProof';
import Rituals from '@/components/sections/Rituals';
import NewMe from '@/components/sections/NewMe';
import WhyKatso from '@/components/sections/WhyKatso';
import MastersAndFaq from '@/components/sections/MastersAndFaq';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <BrandMarquee /> */}
      {/* <SocialProof /> */}
      <Rituals />
      <NewMe />
      <WhyKatso />
      <MastersAndFaq />
      <Footer />
    </main>
  );
}
