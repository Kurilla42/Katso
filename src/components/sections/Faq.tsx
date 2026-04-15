import { colors } from '@/lib/design-tokens';

const Faq = () => {
  return (
    <section
      id="faq"
      className="light-bg"
      style={{ backgroundColor: colors.bonefaq }}
    >
      <div className="container py-16 md:py-40">
        <p className="text-textDark">FAQ Section</p>
      </div>
    </section>
  );
};

export default Faq;
