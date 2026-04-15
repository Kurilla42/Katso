import { colors } from '@/lib/design-tokens';

const SocialProof = () => {
  return (
    <section
      id="social-proof"
      className="light-bg"
      style={{ backgroundColor: colors.offwhite }}
    >
      <div className="h-32 md:h-22">
        <div className="container h-full flex items-center">
          <p className="text-textDark">Social Proof Section</p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
