import { colors } from '@/lib/design-tokens';

const Rituals = () => {
  return (
    <section
      id="rituals"
      className="dark-bg"
      style={{ backgroundColor: colors.graphite }}
    >
      <div className="container py-16 md:py-40">
        <p className="text-textLight">Rituals Section</p>
      </div>
    </section>
  );
};

export default Rituals;
