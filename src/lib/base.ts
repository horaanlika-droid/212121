// Префикс для GitHub Pages (BASE_PATH при сборке)
export const BASE = process.env.BASE_PATH || '';
export const img = (n: string) => `${BASE}/images/${n}`;
export const TRIBUTE = 'https://tribute.show/21-district'; // ссылка-заглушка сборов
