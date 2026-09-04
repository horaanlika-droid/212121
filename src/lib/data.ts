// Контент «21». Текста минимум — механика на значках и числах.

export type Section = {
  id: string; title: string; icon: string; badge: string;
  lines: string[]; quest: string | null;
};

export const SECTIONS: Section[] = [
  { id: 'water', title: 'ВОДА', icon: 'sec-water', badge: 'badge-water',
    lines: ['уголь + песок + ткань', 'кипяток 5 мин', 'сбор дождя'], quest: 'проверить фильтр' },
  { id: 'energy', title: 'ЭНЕРГИЯ', icon: 'sec-energy', badge: 'badge-energy',
    lines: ['свет — по необходимости', 'солнце / ветер', 'утеплить окна'], quest: 'выключить лишний свет' },
  { id: 'food', title: 'ЕДА', icon: 'sec-food', badge: 'badge-food',
    lines: ['грядки во дворе', 'консервация', 'обмен семенами'], quest: 'посадить / поделиться' },
  { id: 'repair', title: 'РЕМОНТ', icon: 'sec-repair', badge: 'badge-repair',
    lines: ['клей + изолента', 'инструмент дома', 'заявка в ЖКХ'], quest: 'починить скрипучее' },
  { id: 'tools', title: 'ИНСТРУМЕНТЫ', icon: 'sec-tools', badge: 'badge-tools',
    lines: ['соседский обмен', 'список у старосты', 'своими руками'], quest: 'добавить в общий список' },
  { id: 'survival', title: 'ВЫЖИВАНИЕ', icon: 'sec-survival', badge: 'badge-survival',
    lines: ['8 навыков', 'значки скаута'], quest: null },
  { id: 'selforg', title: 'САМООРГАНИЗАЦИЯ', icon: 'sec-selforg', badge: 'badge-selforg',
    lines: ['соседский совет', 'субботник раз в месяц', 'общий чат дома'], quest: 'позвать соседа в чат' },
  { id: 'reading', title: 'ВНЕКЛАССНОЕ ЧТЕНИЕ', icon: 'sec-reading', badge: 'badge-reading',
    lines: ['9 авторов', 'философия «21»'], quest: null },
];

export type SurvivalTopic = { id: string; name: string; badge: string; tip: string };
export const SURVIVAL: SurvivalTopic[] = [
  { id: 'fire', name: 'ОГОНЬ', badge: 'badge-fire', tip: 'огниво + трут' },
  { id: 'shelter', name: 'УКРЫТИЕ', badge: 'badge-shelter', tip: 'шалаш, землянка' },
  { id: 'wildwater', name: 'ВОДА', badge: 'badge-wildwater', tip: 'найти и очистить' },
  { id: 'wildfood', name: 'ЕДА', badge: 'badge-wildfood', tip: 'растения, рыбалка' },
  { id: 'firstaid', name: 'ПЕРВАЯ ПОМОЩЬ', badge: 'badge-firstaid', tip: 'аптечка, базовые навыки' },
  { id: 'orient', name: 'ОРИЕНТАЦИЯ', badge: 'badge-orient', tip: 'без карты и компаса' },
  { id: 'signal', name: 'СИГНАЛЫ', badge: 'badge-signal', tip: 'как позвать на помощь' },
  { id: 'mind', name: 'ПСИХОЛОГИЯ', badge: 'badge-mind', tip: 'страх, паника, решения' },
];

export type Author = { id: string; name: string; idea: string; quote: string; p: string };
export const AUTHORS: Author[] = [
  { id: 'kropotkin', name: 'ПЁТР КРОПОТКИН', idea: 'взаимопомощь', quote: 'Взаимная помощь — важнейший фактор эволюции.', p: 'p0' },
  { id: 'fresco', name: 'ЖАК ФРЕСКО', idea: 'ресурсная экономика', quote: 'Изобилие — вопрос организации, а не природы.', p: 'p1' },
  { id: 'bookchin', name: 'МЮРРЕЙ БУКЧИН', idea: 'муниципализм', quote: 'Город — сцена прямой демократии.', p: 'p2' },
  { id: 'ilyin', name: 'ИВАН ИЛЬИН', idea: 'соборность', quote: 'Общее дело рождает общность.', p: 'p3' },
  { id: 'graeber', name: 'ДЭВИД ГРЭБЕР', idea: 'долг и взаимопомощь', quote: 'Долг — извращённая форма взаимопомощи.', p: 'p4' },
  { id: 'leguin', name: 'УРСУЛА ЛЕ ГУИН', idea: 'соц. эксперимент', quote: 'Утопия — не место, а направление.', p: 'p5' },
  { id: 'ksr', name: 'КИМ СТЭНЛИ РОБИНСОН', idea: 'эко-фантастика', quote: 'Мы — то, что делаем вместе.', p: 'p6' },
  { id: 'bey', name: 'ХАКИМ БЕЙ', idea: 'автономные зоны', quote: 'Автономия начинается сегодня.', p: 'p7' },
  { id: 'greens', name: 'КОЛЛЕКТИВ «ЗЕЛЁНЫЕ»', idea: 'эко-самоорганизация', quote: 'Двор — это экосистема.', p: 'p8' },
];

export type Problem = {
  id: string; title: string; desc: string; icon: string;
  x: number; y: number; xp: number; karma: number; dist: number;
  status: 'open' | 'done';
  fund?: { goal: number; raised: number; days: number };
};

export const SEED_PROBLEMS: Problem[] = [
  { id: 'bench', title: 'ПОЧИНИТЬ СКАМЕЙКУ', desc: 'доска отходит, нужны шурупы', icon: 't-bench', x: 30, y: 24, xp: 50, karma: 18, dist: 120, status: 'open' },
  { id: 'trash', title: 'КОНТЕЙНЕР ДЛЯ РАЗДЕЛЬНОГО СБОРА', desc: 'нет бака для стекла', icon: 't-trash', x: 63, y: 38, xp: 80, karma: 25, dist: 340, status: 'open', fund: { goal: 90000, raised: 31000, days: 14 } },
  { id: 'green', title: 'ОЗЕЛЕНИТЬ ДВОР', desc: 'клумба у подъезда №2', icon: 't-sprout', x: 46, y: 56, xp: 60, karma: 20, dist: 210, status: 'open' },
  { id: 'light', title: 'ПРОВЕРИТЬ ОСВЕЩЕНИЕ', desc: 'фонарь мигает с понедельника', icon: 't-lamp', x: 72, y: 66, xp: 40, karma: 12, dist: 150, status: 'open' },
  { id: 'leak', title: 'УТЕЧКА ВОДЫ', desc: 'капает в подвале', icon: 't-drop', x: 22, y: 72, xp: 70, karma: 22, dist: 300, status: 'open', fund: { goal: 50000, raised: 21000, days: 9 } },
];

export type Fund = { id: string; title: string; icon: string; goal: number; raised: number; days: number; problemId?: string };
export const SEED_FUNDS: Fund[] = [
  { id: 'play', title: 'ДЕТСКАЯ ПЛОЩАДКА ВО ДВОРЕ', icon: 'c-play', goal: 1200000, raised: 750000, days: 12 },
  { id: 'alley', title: 'ОЗЕЛЕНЕНИЕ АЛЛЕИ У ДОМА', icon: 'c-tree', goal: 500000, raised: 310000, days: 8 },
  { id: 'benches', title: 'НОВЫЕ ЛАВКИ И УРНЫ', icon: 'c-bench', goal: 250000, raised: 125000, days: 5 },
];

export type Topic = { id: string; author: string; time: string; title: string; comments: number; likes: number };
export const SEED_TOPICS: Topic[] = [
  { id: 't1', author: 'СОСЕД_87', time: '2 МИН НАЗАД', title: 'ШУМНЫЕ СОСЕДИ ПО НОЧАМ', comments: 12, likes: 24 },
  { id: 't2', author: 'ЦВЕТОЧНЫЙ_АКТИВИСТ', time: '15 МИН НАЗАД', title: 'ПРЕДЛОЖЕНИЕ: ПЛОЩАДКА ДЛЯ ВЫГУЛА СОБАК', comments: 8, likes: 37 },
  { id: 't3', author: 'ЮРИСТ_ОНЛАЙН', time: '1 ЧАС НАЗАД', title: 'КАК ОСПОРИТЬ НЕЗАКОННУЮ ПЕРЕПЛАНИРОВКУ?', comments: 5, likes: 19 },
];

export type Post = { id: string; title: string; text: string; time: string };
export const SEED_POSTS: Post[] = [
  { id: 'p1', title: 'СУББОТНИК В СУББОТУ', text: '10:00, двор. перчатки выдаём.', time: 'СЕГОДНЯ' },
];

export const BUDGET = {
  total: 2500000,
  rows: [
    { name: 'БЛАГОУСТРОЙСТВО', pct: 40, sum: 1000000 },
    { name: 'ИНФРАСТРУКТУРА', pct: 25, sum: 625000 },
    { name: 'БЕЗОПАСНОСТЬ', pct: 15, sum: 375000 },
    { name: 'ЭКОЛОГИЯ', pct: 10, sum: 250000 },
    { name: 'ОБРАЗОВАНИЕ', pct: 10, sum: 250000 },
  ],
};

export const ITEM_DEFS = [
  { id: 'item-wrench', name: 'МАСТЕР' },
  { id: 'item-heart', name: 'СЕРДЦЕ РАЙОНА' },
  { id: 'item-seed', name: 'САДОВНИК' },
  { id: 'item-shield', name: 'ХРАНИТЕЛЬ' },
  { id: 'item-lamp', name: 'СВЕТ РАЙОНА' },
  { id: 'item-star', name: 'ЗВЕЗДА РАЙОНА' },
];

export const BADGE_NAMES: Record<string, string> = {
  'badge-water': 'ВОДА', 'badge-energy': 'ЭНЕРГИЯ', 'badge-food': 'ЕДА', 'badge-repair': 'РЕМОНТ',
  'badge-tools': 'ИНСТРУМЕНТ', 'badge-survival': 'ВЫЖИВАНИЕ', 'badge-selforg': 'СООБЩЕСТВО', 'badge-reading': 'ЧТЕНИЕ',
  'badge-fire': 'ОГОНЬ', 'badge-shelter': 'УКРЫТИЕ', 'badge-wildwater': 'ВОДА', 'badge-wildfood': 'ЕДА',
  'badge-firstaid': 'ПОМОЩЬ', 'badge-orient': 'ПУТЬ', 'badge-signal': 'СИГНАЛ', 'badge-mind': 'РАЗУМ',
  'badge-enlightened': 'ПРОСВЕЩЁННЫЙ', 'badge-volunteer': 'ВОЛОНТЁР',
};

export const fmt = (n: number) => n.toLocaleString('ru-RU');
