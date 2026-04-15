import { colors } from '@/lib/design-tokens';

const BrandMarquee = () => {
  return (
    <section
      id="brand-marquee"
      className="dark-bg"
      style={{ backgroundColor: colors.black }}
    >
      <div className="h-40 md:h-24">
        <div className="container h-full flex items-center">
          <p className="text-textLight">Brand Marquee Section</p>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
