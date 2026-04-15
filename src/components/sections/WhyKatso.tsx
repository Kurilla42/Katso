import { colors } from '@/lib/design-tokens';

const WhyKatso = () => {
  return (
    <section
      id="why-us"
      className="dark-bg"
      style={{ backgroundColor: colors.graphite }}
    >
      <div className="container py-16 md:py-40">
        <p className="text-textLight">Why Katso Section</p>
      </div>
    </section>
  );
};

export default WhyKatso;
