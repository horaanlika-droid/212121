import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import TgInit from '@/components/TgInit';
import './globals.css';

export const metadata: Metadata = {
  title: '21 — городская ОС',
  description: 'Карта, квесты, энциклопедия автономной жизни. E-ink.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {/* Telegram WebApp */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="lazyOnload" />
        <TgInit />
        <div className="mx-auto max-w-md min-h-screen pb-24">{children}</div>
      </body>
    </html>
  );
}
