// Статический экспорт для GitHub Pages (бесплатный хостинг).
// Для Pages: BASE_PATH=/имя-репозитория npm run build
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath + '/' } : {}),
};

export default nextConfig;
