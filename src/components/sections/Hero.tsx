import { colors } from '@/lib/design-tokens';

const Hero = () => {
  return (
    <section
      id="hero"
      className="dark-bg relative"
      style={{ backgroundColor: colors.graphite }}
    >
      <div className="min-h-screen flex items-center">
        <div className="container">
          <p className="text-textLight">Hero Section</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
