import { colors } from '@/lib/design-tokens';

const Masters = () => {
  return (
    <section
      id="masters"
      className="dark-bg"
      style={{ backgroundColor: colors.black }}
    >
      <div className="container py-16 md:py-40">
        <p className="text-textLight">Masters Section</p>
      </div>
    </section>
  );
};

export default Masters;
