import { Product } from '../types';

export const CATEGORIES = [
  'Все',
  'Смартфоны & Гаджеты',
  'Наушники & Аудио',
  'Умные часы',
  'Аксессуары',
  'Умный дом'
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Беспроводные наушники Pro Wireless ANC',
    subtitle: 'Активное шумоподавление до 45 дБ, пространственный звук',
    category: 'Наушники & Аудио',
    price: 34990,
    oldPrice: 42990,
    rating: 4.9,
    reviewsCount: 142,
    isHit: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Графитовый черный', hex: '#1C1C1E' },
      { name: 'Серебристый лунный', hex: '#E5E5EA' },
      { name: 'Глубокий синий', hex: '#1E3A8A' }
    ],
    description: 'Флагманские полноразмерные наушники с адаптивным гибридным шумоподавлением. Чистый Hi-Res звук с глубоким басом, до 40 часов автономной работы и ультракомфортные амбушюры с эффектом памяти для многочасового прослушивания.',
    specifications: {
      'Тип подключения': 'Bluetooth 5.3 / 3.5 мм AUX',
      'Автономность': 'До 40 часов (с ANC)',
      'Шумоподавление': 'Активное ANC (до 45 дБ)',
      'Быстрая зарядка': '10 мин = 5 часов работы',
      'Разъем зарядки': 'USB Type-C',
      'Вес': '250 г'
    },
    inStock: true
  },
  {
    id: 'prod-2',
    title: 'Умные часы Chrono Ultra Titanium',
    subtitle: 'Титановый корпус 49мм, AMOLED экран, ECG и датчик SpO2',
    category: 'Умные часы',
    price: 68900,
    oldPrice: 79900,
    rating: 4.8,
    reviewsCount: 89,
    isHit: true,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Титановый серый', hex: '#71717A' },
      { name: 'Оранжевый спорт', hex: '#F97316' },
      { name: 'Черный оникс', hex: '#18181B' }
    ],
    sizes: ['49 мм'],
    description: 'Универсальные смарт-часы повышенной прочности для спорта и повседневной жизни. Яркий сапфировый AMOLED дисплей, поддержка eSIM, GPS позиционирование и защита от воды до 100 метров.',
    specifications: {
      'Корпус': 'Аэрокосмический титан',
      'Экран': '1.96" Super AMOLED, 1000 нит',
      'Влагозащита': '10 ATM (до 100м)',
      'Датчики': 'Пульс, ЭКГ, Кислород SpO2, Температура',
      'Автономность': 'До 7 дней обычного использования',
      'Совместимость': 'iOS / Android'
    },
    inStock: true
  },
  {
    id: 'prod-3',
    title: 'Портативная акустика Pulse Studio Pro',
    subtitle: 'Мощный объемный звук 60 Вт, влагозащита IPX7, бас-радиатор',
    category: 'Наушники & Аудио',
    price: 49500,
    oldPrice: 58000,
    rating: 4.9,
    reviewsCount: 63,
    isHit: false,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Угольный черный', hex: '#18181B' },
      { name: 'Мятно-зеленый', hex: '#10B981' },
      { name: 'Песочный хаки', hex: '#78716C' }
    ],
    description: 'Компактная, но невероятно мощная колонка для вечеринок, пикников и дома. Двойные пассивные излучатели обеспечивают плотный и глубокий бас без искажений.',
    specifications: {
      'Мощность': '60 Вт RMS',
      'Время работы': 'До 24 часов',
      'Защита': 'IPX7 (не боится погружения в воду)',
      'Подключение': 'Bluetooth 5.3, TWS режим',
      'Аккумулятор': '7500 мАч с функцией Powerbank'
    },
    inStock: true
  },
  {
    id: 'prod-4',
    title: 'Магнитный Powerbank MagSafe Slim 10 000 mAh',
    subtitle: 'Быстрая зарядка 22.5W, ультратонкий алюминиевый корпус',
    category: 'Аксессуары',
    price: 18990,
    oldPrice: 23500,
    rating: 4.7,
    reviewsCount: 118,
    isHit: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Космический серый', hex: '#4B5563' },
      { name: 'Серебристый', hex: '#D1D5DB' },
      { name: 'Фиолетовый пастель', hex: '#C084FC' }
    ],
    description: 'Надежный портативный аккумулятор с мощными неодимовыми магнитами. Мгновенно фиксируется на задней панели смартфона и поддерживает беспроводную зарядку до 15W.',
    specifications: {
      'Емкость': '10 000 мА·ч',
      'Беспроводная зарядка': 'До 15 Вт MagSafe / Qi',
      'Проводная зарядка': 'USB-C PD 22.5 Вт',
      'Индикация': 'Цифровой LED дисплей уровня заряда',
      'Толщина': 'Всего 12 мм'
    },
    inStock: true
  },
  {
    id: 'prod-5',
    title: 'Умный увлажнитель воздуха Mist Oasis Smart',
    subtitle: 'Ультразвуковой туман, ароматерапия, управление через приложение',
    category: 'Умный дом',
    price: 27900,
    oldPrice: 32000,
    rating: 4.9,
    reviewsCount: 76,
    isHit: false,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Матовый белый', hex: '#F8FAFC' },
      { name: 'Графит', hex: '#334155' }
    ],
    description: 'Тихий и производительный увлажнитель с резервуаром на 4.5 литра. Поддерживает оптимальный микроклимат в помещении до 40 кв.м., имеет теплый ночник и отсек для эфирных масел.',
    specifications: {
      'Объем резервуара': '4.5 литра',
      'Площадь помещения': 'До 40 м²',
      'Уровень шума': '< 26 дБ (ночной режим)',
      'Расход воды': 'До 350 мл/час',
      'Управление': 'Сенсорное + Wi-Fi (Tuya / Smart Life)'
    },
    inStock: true
  },
  {
    id: 'prod-6',
    title: 'Механическая клавиатура Horizon Pro RGB',
    subtitle: 'Смазанные линейные свитчи, Hot-Swap, беспроводная трехрежимная',
    category: 'Аксессуары',
    price: 41900,
    oldPrice: 48000,
    rating: 5.0,
    reviewsCount: 52,
    isHit: true,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Ретро белый & серый', hex: '#E2E8F0' },
      { name: 'Неоновый киберпанк', hex: '#6366F1' }
    ],
    description: 'Премиальная кастомная механика формата 75%. Заводская шумоизоляция PORON, мягкий пружинящий Gasket Mount тайпинг и PBT кейкапы двойного литья.',
    specifications: {
      'Форм-фактор': '75% (82 клавиши)',
      'Переключатели': 'Custom Yellow Linear (смазаны)',
      'Подключение': 'Bluetooth / 2.4G / Type-C кабель',
      'Подсветка': '16.8 млн цветов RGB с настройкой эффектов',
      'Аккумулятор': '4000 мАч'
    },
    inStock: true
  },
  {
    id: 'prod-7',
    title: 'Беспроводная зарядная станция 3-в-1 FoldStand',
    subtitle: 'Одновременная зарядка смартфона, часов и наушников',
    category: 'Аксессуары',
    price: 16990,
    oldPrice: 21990,
    rating: 4.8,
    reviewsCount: 94,
    isHit: false,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609592424368-4f8150cf2a3d?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Черный бархат', hex: '#1E1E1E' },
      { name: 'Белый шелк', hex: '#FAFAFA' }
    ],
    description: 'Элегантная складная док-станция для рабочего стола или путешествий. Заряжает телефон вертикально или горизонтально, часы и футляр наушников одновременно.',
    specifications: {
      'Суммарная мощность': '25 Вт Max',
      'Материал': 'Soft-touch пластик и анодированный алюминий',
      'Защита': 'От перегрева, перенапряжения и короткого замыкания',
      'Индикатор': 'Мягкий светодиод с автовыключением'
    },
    inStock: true
  },
  {
    id: 'prod-8',
    title: 'Умная лампа-ночник с беспроводной колонкой Aura Glow',
    subtitle: '16 млн цветов, закаты, рассветы, звуки природы и Bluetooth аудио',
    category: 'Умный дом',
    price: 21500,
    oldPrice: 26000,
    rating: 4.9,
    reviewsCount: 41,
    isHit: false,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Минималистичный белый', hex: '#F3F4F6' }
    ],
    description: 'Атмосферный светильник с эффектом плавного градиентного перелива. Имитация восхода солнца помогает просыпаться легко и естественно, а встроенные звуки дождя и леса снимают стресс.',
    specifications: {
      'Режимы': '256 световых сценариев',
      'Аудио': 'Динамик 10 Вт с чистым звучанием',
      'Будильник': 'Имитация рассвета (Sunrise Alarm)',
      'Управление': 'Физические кнопки + приложение'
    },
    inStock: true
  }
];
