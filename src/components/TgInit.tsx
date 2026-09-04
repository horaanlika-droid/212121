'use client';
import { useEffect } from 'react';

// Адаптация под Telegram WebApp: ready + expand + safe-area
export default function TgInit() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      try {
        tg.ready();
        tg.expand();
        tg.setHeaderColor?.('#edeae2');
        tg.setBackgroundColor?.('#edeae2');
      } catch { /* noop */ }
    }
  }, []);
  return null;
}
