'use client';

import React, { useState, useEffect, useRef } from 'react';
import { colors } from '@/lib/design-tokens';

// --- DATA ---

const navLinks = [
  { id: 'manicure', label: 'МАНИКЮР' },
  { id: 'brows', label: 'БРОВИ' },
  { id: 'hair', label: 'СТРИЖКИ' },
  { id: 'color', label: 'ОКРАШИВАНИЯ' },
  { id: 'keratin', label: 'КЕРАТИН' },
  { id: 'scalp', label: 'УХОД' },
  { id: 'makeup', label: 'МАКИЯЖ' },
];

const servicesData = [
  {
    id: 'manicure',
    title: 'МАНИКЮР И НАРАЩИВАНИЕ НОГТЕЙ',
    subCategories: [
      {
        title: 'Маникюр',
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
          ['Комбинированный маникюр', '1300 р.', 'Аппаратный + отрезание кутикулы ножницы/кусачки, придание формы, покрытие прозрачным лаком (по желанию)'],
          ['Пилочный маникюр', '1800 р.', 'Атравматичная техника с использованием одноразовых пилок, придание формы'],
          ['Японский маникюр', '2000 р.', 'Комбинированный маникюр + втирание 2-х паст (используются одноразовые бафы для втирания)'],
        ],
      },
      {
        title: 'Комплексы',
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
          ['Classic Complex', '2200 р.', 'Маникюр / выравнивание / однотонное покрытие / снятие'],
          ['Light Complex', '2500 р.', '+ дизайн (точки, полоски, наклейки, кошачий глаз)'],
          ['Medium Complex', '2800 р.', '+ дизайн (френч, втирка, лунки, стэмпинг)'],
          ['Hard Complex', '3300 р.', '+ дизайн (ручная роспись, объёмные детали, корейский дизайн)'],
        ],
      },
      {
        title: 'Классическое наращивание',
        headers: ['Длина', 'Цена'],
        items: [
          ['До 3 длины', '3200 р.'],
          ['От 3 до 5', '3500 р.'],
          ['От 5 и выше', '3800–6000 р.'],
          ['Коррекция', '3000–4000 р.'],
        ],
        notes: ['маникюр / выравнивание / однотонное покрытие', 'Наращивание 1 ногтя — 300 р.'],
      },
      {
        title: 'Наращивание когтей',
        headers: ['Длина', 'Цена'],
        items: [
          ['До 3 длины', '4800 р.'],
          ['От 3 до 5', '5200 р.'],
          ['От 5 и выше', '5500–6000 р.'],
          ['Коррекция', '4500–5000 р.'],
        ],
        notes: ['маникюр / выравнивание / однотонное покрытие', 'Наращивание 1 ногтя — 450 р.'],
      },
    ],
  },
  {
    id: 'brows',
    title: 'БРОВИ И РЕСНИЦЫ',
    subCategories: [
      {
        title: 'Комплексные процедуры (брови)',
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
          ['Оформление бровей', '1600 р.', 'Коррекция формы пинцет / воск Lycon, окрашивание стойким красителем / хной, прореживание, осветление, уход'],
          ['Долговременная укладка', '2000 р.', 'Укладка по форме, окрашивание стойким красителем, коррекция формы пинцет / воск Lycon, питательный уход'],
        ],
      },
      {
        title: 'Одиночные процедуры',
        headers: ['Услуга', 'Цена'],
        items: [
          ['Коррекция формы', '1000 р.'],
          ['Окрашивание бровей', '1000 р.'],
          ['Обесцвечивание бровей', '1000 р.'],
          ['Organic Brow', '1000 р.'],
          ['Удаление пуха воском (одна зона)', '400 р.'],
        ],
      },
      {
        title: 'Ресницы',
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
            ['Окрашивание ресниц', '1000 р.', 'Окрашивание верхних и нижних ресниц'],
            ['Ламинирование верхних ресниц', '2200 р.', 'Окрашивание, увлажняющий уход'],
            ['Ламинирование верхних и нижних', '2500 р.', 'Окрашивание верхних и нижних ресниц'],
            ['Деламинирование ресниц', '2200 р.', 'Исправление неудачного случая'],
        ]
      },
      {
        title: 'Комплексы брови / ресницы',
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
            ['Full Lami', '4000 р.', 'Долговременная укладка бровей + ламинирование ресниц'],
            ['Fresh Combo', '3500 р.', 'Оформление бровей + ламинирование ресниц'],
            ['Natural Look', '2500 р.', 'Оформление бровей + окрашивание ресниц'],
        ]
      }
    ],
  },
  {
    id: 'hair',
    title: 'СТРИЖКИ / УКЛАДКИ / УХОД ЗА ДЛИНОЙ ВОЛОС',
    subCategories: [
      {
        title: 'Стрижки женские',
        headers: ['Длина', 'Цена'],
        items: [
          ['Короткие', '3000 р.'],
          ['Средние', '3500 р.'],
          ['Длинные', '4000 р.'],
        ],
        notes: ['В услугу входит: консультация, мытьё головы, стрижка и укладка по форме.'],
      },
      {
        title: 'Коррекция стрижки',
        headers: ['Длина', 'Цена'],
        items: [
          ['Короткие', '2000 р.'],
          ['Средние', '2500 р.'],
          ['Длинные', '3000 р.'],
        ],
        notes: ['Действует при записи на окрашивание / уходовые процедуры. Коррекция стрижки — раз в 1,5 мес.'],
      },
      {
        title: 'Отдельные услуги',
        headers: ['Услуга', 'Цена'],
        items: [
            ['Стрижка кончиков', '1500 р.'],
            ['Стрижка чёлки', '1200 р.'],
            ['Ручная полировка', '2000 р.'],
        ],
        notes: ['При записи на стрижку чёлки / кончиков / полировки — мытьё головы не входит в стоимость.'],
      },
      {
        title: 'Укладки',
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
            ['Мытьё головы + укладка по форме', '2000–2500 р.', ''],
            ['Укладка Day', '2000–2500 р.', 'Любой вид накрутки, вытягивание волос. Мытьё головы +1000 р.'],
            ['Укладка Night', '2500–3500 р.', 'Любой вид накрутки, сборные укладки. Мытьё головы +1000 р.'],
        ],
        notes: ['При записи на укладку важно приходить с вымытой головой за 4 часа до процедуры.', 'Доп. сушка волос (если пришли с мокрой головой) +500 р.'],
      },
      {
        title: 'Уход за длиной волос',
        headers: ['Препарат', 'Как самостоятельная услуга', 'При стрижке/окрашивании'],
        items: [
            ['Demi Flowdia (Япония)', '4500–8000 р.', '4000–7000 р.'],
            ['Alterego Egobond (Italy)', '4000–7500 р.', '3500–7000 р.'],
            ['Nook Wonderful (Italy)', '4000–7500 р.', '3500–6500 р.'],
            ['Nook Secret Miracle (Italy, экспресс)', '3000–5500 р.', null],
            ['Nook Discipline (Italy, экспресс)', '3000–5500 р.', null],
        ]
      }
    ],
  },
  {
    id: 'color',
    title: 'ОКРАШИВАНИЯ / ВЫПРЯМЛЕНИЕ',
    subCategories: [
      {
        title: 'Тонирование / стойкое окрашивание',
        headers: ['Длина', 'Цена'],
        items: [
          ['Короткие', '4500–5500 р.'],
          ['Средние', '5500–7500 р.'],
          ['Длинные', '6000–9000 р.'],
        ],
      },
      {
        title: 'Контуринг',
        headers: [],
        items: [['', '9000–13 000 р.']],
      },
      {
        title: 'Total Blonde',
        headers: ['Длина', 'Цена'],
        items: [
            ['Короткие', '7500–10 000 р.'],
            ['Средние', '8500–14 000 р.'],
            ['Длинные', '14 000–22 000 р.'],
        ]
      },
      {
        title: 'Total Blonde коррекция',
        headers: ['Длина', 'Цена'],
        items: [
            ['Короткие', '7500–8500 р.'],
            ['Средние', '8000–10 000 р.'],
            ['Длинные', '9500–15 000 р.'],
        ]
      },
      {
        title: 'Сложное окрашивание',
        headers: ['Длина', 'Цена'],
        items: [
            ['Короткие', '12 000–15 000 р.'],
            ['Средние', '14 000–17 000 р.'],
            ['Длинные', '16 000–20 000 р.'],
        ]
      },
      {
        title: 'Полуперманентное выпрямление (кр + нано + кератин)',
        headers: ['Длина', 'Цена'],
        items: [
            ['До плеч', '6000–7000 р.'],
            ['До лопаток', '7000–9000 р.'],
            ['Ниже лопаток', '9000–12 000 р.'],
            ['До пояса', '10 000–15 000 р.'],
            ['Ниже пояса', '11 000–18 000 р.'],
        ],
        notes: ['Коррекция −30% от прайса (не позднее 9 месяцев).', 'В стоимость включены: перерасход за густоту / сложность работы.'],
      }
    ],
  },
  {
    id: 'keratin',
    title: 'КЕРАТИН / БОТОКС',
    subCategories: [
      {
        title: 'Кератин',
        headers: ['Длина', 'Цена'],
        items: [
          ['До плеч', '5000–5500 р.'],
          ['До лопаток', '6000–7500 р.'],
          ['Ниже лопаток', '6500–8500 р.'],
          ['До пояса', '8000–11 000 р.'],
          ['Ниже пояса', '9000–15 000 р.'],
        ],
        description: 'Процедура, которая выпрямляет волос от лёгких волн до тугих завитков. Срок носки 3–6 месяцев.',
        notes: ['В стоимость включён уход по длине волос перед процедурой.', 'Доплата за расход состава и/или сложность — 500–1000 р.'],
      },
      {
        title: 'Холодная реконструкция',
        headers: ['Длина', 'Цена'],
        items: [
          ['До плеч', '4000–5000 р.'],
          ['До лопаток', '5000–6500 р.'],
          ['По пояс', '6000–8000 р.'],
        ],
        description: 'Напитывает и увлажняет, сокращает ломкость и сечение, структура волоса не меняется. Срок носки до 1,5 месяцев.',
        notes: ['Рекомендованный повтор раз в 2–3 месяца.', 'Курс для более выраженного эффекта: 3–4 процедуры раз в 3–4 недели.'],
      },
      {
        title: 'Ботокс',
        headers: ['Длина', 'Цена'],
        items: [
          ['До плеч', '5000–5500 р.'],
          ['До лопаток', '6000–7500 р.'],
          ['Ниже лопаток', '6500–8500 р.'],
          ['До пояса', '8000–11 000 р.'],
          ['Ниже пояса', '9000–15 000 р.'],
        ],
        description: 'Помогает избавиться от пушка, разглаживает волос, возможен лёгкий выпрямляющий эффект. Срок носки до 3 месяцев.',
      },
    ],
  },
  {
    id: 'scalp',
    title: 'УХОД ЗА КОЖЕЙ ГОЛОВЫ',
    subCategories: [
      {
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
          ['Пилинг кожи головы Time to Grow', '4000 р.', 'Полная консультация, трихоскопия, очищение кожи головы / стимуляция кровообращения — питание луковиц, экспресс-уход'],
          ['Пилинг кожи головы Detox Serum Prodiva', '4000 р.', 'То же'],
          ['Доп. услуга пилинга к стрижке / уходу', '2500 р.', ''],
        ],
        notes: ['Возможна доплата за сложный случай (доп. расход состава) — 300–800 р.'],
      },
    ],
  },
  {
    id: 'makeup',
    title: 'МАКИЯЖ / ОБРАЗ НЕВЕСТЫ',
    subCategories: [
      {
        title: 'Макияж',
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
          ['Макияж экспресс', '2700 р.', 'Подготовка кожи, выравнивание тона, межресничка, тушь, румяна, финиш'],
          ['Макияж дневной', '3000 р.', 'Подготовка кожи, выравнивание тона и рельефа, брови, ресницы, проработка века, румяна, губы'],
          ['Макияж вечерний', '3500 р.', 'То же + стрелки / смоки'],
          ['Макияж лифтинг', '3500 р.', 'Возрастной макияж с омолаживающим эффектом'],
          ['Макияж креативный', '4000–6000 р.', 'Уникальные образы для фотосессий, мероприятий. Стразы, пайетки, жемчуг, перья, рисунки на коже'],
        ],
      },
      {
        title: 'Свадебный образ',
        headers: ['Услуга', 'Цена', 'Описание'],
        items: [
          ['Макияж свадебный', '4000 р.', 'Полный свадебный макияж (стрелки / смоки)'],
          ['Пробный свадебный', '3500 р.', 'То же'],
          ['Укладка дневная', '2000–2500 р.', 'Любой вид накрутки + вытягивание. Мытьё головы +1000 р.'],
          ['Укладка вечерняя', '2500–3500 р.', 'Сборные укладки. Мытьё головы +1000 р.'],
        ],
        notes: ['Ранний выход до 10:00 → +1000 р.', 'Выезд на локацию → от 2000 до 6000 р.'],
      },
    ],
  },
];


// --- COMPONENTS ---

const ServicesNav = ({ activeSection }: { activeSection: string }) => {
  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
        <div className="container py-4">
            <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar border-b border-cream/10 pb-4">
                {navLinks.map((link) => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        data-active={activeSection === link.id}
                        className="font-display uppercase text-nude hover:text-cream transition-colors whitespace-nowrap data-[active=true]:text-accent"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    </nav>
  );
};

const PriceRow = ({
  col1,
  col2,
  col3,
}: {
  col1: string | null;
  col2: string | null;
  col3?: string | null;
}) => (
  <div className="flex justify-between items-start gap-4 py-4 font-lora border-b border-cream/10">
    <div className="flex-1">
      {col1 && <p className="text-cream" style={{ fontSize: '1.2vw' }}>{col1}</p>}
      {col3 && <p className="text-nude mt-1 max-w-md" style={{ fontSize: '1.2vw' }}>{col3}</p>}
    </div>
    {col2 && <p className="text-cream text-right whitespace-nowrap" style={{ fontSize: '1.2vw' }}>{col2}</p>}
  </div>
);

const ThreeColPriceRow = ({ col1, col2, col3 }: { col1: string | null; col2: string | null; col3: string | null; }) => (
    <div className="grid grid-cols-3 items-start gap-4 py-4 font-lora border-b border-cream/10">
      <p className="text-cream" style={{ fontSize: '1.2vw' }}>{col1}</p>
      <p className="text-cream text-center" style={{ fontSize: '1.2vw' }}>{col2}</p>
      <p className="text-cream text-right" style={{ fontSize: '1.2vw' }}>{col3}</p>
    </div>
  );

const SwappedThreeColPriceRow = ({ col1, col2, col3 }: { col1: string | null; col2: string | null; col3: string | null; }) => (
    <div className="grid grid-cols-3 items-start gap-4 py-4 font-lora border-b border-cream/10">
      <p className="text-cream" style={{ fontSize: '1.2vw' }}>{col1}</p>
      <p className="text-cream" style={{ fontSize: '1.2vw' }}>{col2}</p>
      <p className="text-cream text-right" style={{ fontSize: '1.2vw' }}>{col3}</p>
    </div>
);


const PriceTable = ({ subCategory }: { subCategory: (typeof servicesData)[0]['subCategories'][0] }) => (
  <div className="mb-12">
    {subCategory.title && <h3 className="font-display text-2xl md:text-3xl uppercase text-cream mb-6">{subCategory.title}</h3>}
    {subCategory.description && <p className="font-lora text-nude mb-6 -mt-4" style={{ fontSize: '1.2vw' }}>{subCategory.description}</p>}
    
    <div>
        {subCategory.headers.length > 0 && subCategory.headers.length < 3 && (
             <div className="flex justify-between items-start gap-4 py-2 font-display text-nude uppercase tracking-wider text-sm border-b border-cream/10">
                <span className="flex-1">{subCategory.headers[0]}</span>
                {subCategory.headers[1] && <span className="text-right whitespace-nowrap">{subCategory.headers[1]}</span>}
            </div>
        )}
         {subCategory.headers.length === 3 && (
            <div className="grid grid-cols-3 items-start gap-4 py-2 font-display text-nude uppercase tracking-wider text-sm border-b border-cream/10">
                <span>{subCategory.headers[0]}</span>
                {subCategory.headers[1] === 'Цена' && subCategory.headers[2] === 'Описание' ? (
                    <>
                        <span>{subCategory.headers[2]}</span>
                        <span className="text-right">{subCategory.headers[1]}</span>
                    </>
                ) : (
                    <>
                        <span className="text-center">{subCategory.headers[1]}</span>
                        <span className="text-right">{subCategory.headers[2]}</span>
                    </>
                )}
            </div>
        )}

        {subCategory.items.map((item, index) => {
            if (subCategory.headers.length < 3) {
                return <PriceRow key={index} col1={item[0]} col2={item[1]} col3={item[2]} />
            }
            if (subCategory.headers[1] === 'Цена' && subCategory.headers[2] === 'Описание') {
                return <SwappedThreeColPriceRow key={index} col1={item[0]} col2={item[2]} col3={item[1]} />
            }
            return <ThreeColPriceRow key={index} col1={item[0]} col2={item[1]} col3={item[2]} />
        })}
    </div>

    {subCategory.notes && (
        <div className="mt-4 space-y-1">
            {subCategory.notes.map((note, index) => (
                <p key={index} className="text-nude font-lora" style={{ fontSize: '1.2vw' }}>
                    * {note}
                </p>
            ))}
        </div>
    )}
  </div>
);

export default function ServicesPage() {
    const [activeSection, setActiveSection] = useState('manicure');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-120px 0px -75% 0px', threshold: 0 }
        );

        const sections = document.querySelectorAll('.service-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <main style={{ backgroundColor: '#2D2D2D' }} data-cursor="dark" className="relative">
            <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    backgroundImage: 'url(https://i.ibb.co/zWNnhBMd/concrete-wall-2-1.png)',
                    backgroundRepeat: 'repeat',
                    opacity: 0.7,
                    mixBlendMode: 'overlay',
                }}
            ></div>
            <div className="paper-texture"></div>
            
            <ServicesNav activeSection={activeSection} />

            <div className="relative py-16 md:py-24" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                {servicesData.map((section, sectionIndex) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="service-section scroll-mt-header mb-16 md:mb-24"
                    >
                        <h2 className="font-display uppercase text-cream mb-10 md:mb-12" style={{ fontSize: '3.0vw', lineHeight: 1.1 }}>
                           {section.title}
                        </h2>
                        {section.subCategories.map((subCategory, subIndex) => (
                            <PriceTable key={subIndex} subCategory={subCategory} />
                        ))}
                    </section>
                ))}
            </div>
        </main>
    )
}
