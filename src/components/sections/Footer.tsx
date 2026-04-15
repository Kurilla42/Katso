import { colors } from '@/lib/design-tokens';
import Map from '@/components/Map';
import StarIcon from '@/components/icons/Star';

const footerLinks = [
  {
    title: 'Навигация',
    links: ['Главная', 'Услуги', 'Мастера', 'Почему мы', 'FAQ'],
  },
  {
    title: 'Услуги',
    links: ['Стрижки', 'Окрашивание', 'Уход', 'Ногти', 'Косметология', 'Макияж'],
  },
  {
    title: 'Контакты',
    links: ['Bulevardul Ștefan cel Mare și Sfînt 64', '+373 69 123 456', 'hello@katso.md'],
  },
  {
    title: 'Соцсети',
    links: ['Instagram', 'Facebook', 'Telegram'],
  },
];

const Footer = () => {
  return (
    <footer
      id="footer"
      className="dark-bg"
      style={{ backgroundColor: colors.black }}
    >
      <div className="container relative">
        <div className="relative h-[300px] md:h-[500px] flex items-end overflow-hidden">
          {/* Left: Giant Wordmark */}
          <div className="absolute left-0 bottom-0 -translate-x-1/4 md:-translate-x-1/6 z-0">
             <h2 className="font-display text-[18rem] md:text-[30rem] text-white/10 leading-none select-none">
                KATSO
             </h2>
          </div>

          {/* Right: Map */}
          <div className="relative w-full md:w-1/2 lg:w-5/12 h-[240px] md:h-[360px] ml-auto rounded-md overflow-hidden z-10">
              <Map />
          </div>
        </div>
      </div>
      
      <div className="container py-16 md:py-24">
        {/* Four-column links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="caption text-textLightMuted mb-4">{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link} className="mt-2">
                    <a href="#" className="text-textLight hover:text-orange transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="border-b border-white/10 my-16 md:my-24" />

        {/* Bottom CTA */}
        <a href="#" className="group block text-center py-8">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-textLight uppercase group-hover:text-orange transition-colors duration-300">
                Записаться на ритуал
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">&nbsp;↗</span>
            </span>
        </a>
      </div>
      
      {/* Bottom bar */}
      <div className="container pb-6">
        <div className="border-t border-white/10 pt-4 flex justify-between items-center text-sm text-textLightMuted">
            <span>© {new Date().getFullYear()} KATSO Studio. All rights reserved.</span>
            <div className="flex items-center gap-2">
                <span>Made with</span>
                <StarIcon className="w-3 h-3 text-orange" />
                <span>by AI</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
