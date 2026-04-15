import { colors } from '@/lib/design-tokens';

const Footer = () => {
  return (
    <footer
      id="footer"
      className="dark-bg"
      style={{ backgroundColor: colors.black }}
    >
      <div className="container py-16 md:py-40">
        <p className="text-textLight">Footer Section</p>
      </div>
    </footer>
  );
};

export default Footer;
