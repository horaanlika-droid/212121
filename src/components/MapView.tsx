'use client';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/lib/store';
import { img, TRIBUTE } from '@/lib/base';
import { Bar, Modal, Px, Rewards } from './ui';
import type { Problem } from '@/lib/data';

const YKEY = process.env.NEXT_PUBLIC_YANDEX_KEY || '';

export default function MapView({ onPlacePoint, placing }: { onPlacePoint?: (x: number, y: number) => void; placing?: boolean }) {
  const problems = useApp((s) => s.problems);
  const solved = useApp((s) => s.solved);
  const joined = useApp((s) => s.joined);
  const solveProblem = useApp((s) => s.solveProblem);
  const supportFund = useApp((s) => s.supportFund);

  const [sel, setSel] = useState<Problem | null>(null);
  const [zoom, setZoom] = useState(1);
  const [yandex, setYandex] = useState<boolean | null>(null);
  const yref = useRef<HTMLDivElement>(null);

  // Яндекс Карты: если ключ не поднялся — пиксельная заглушка
  useEffect(() => {
    if (!YKEY) { setYandex(false); return; }
    let dead = false;
    const t = setTimeout(() => { if (!dead) setYandex((v) => v === null ? false : v); }, 5000);
    const s = document.createElement('script');
    s.src = `https://api-maps.yandex.ru/2.1/?apikey=${YKEY}&lang=ru_RU`;
    s.onload = () => {
      if (dead) return;
      try {
        const ymaps = (window as any).ymaps;
        ymaps.ready(() => {
          if (dead || !yref.current) return;
          const map = new ymaps.Map(yref.current, { center: [55.75, 37.62], zoom: 15, controls: [] }, { suppressMapOpenBlock: true });
          problems.forEach((p) => map.geoObjects.add(new ymaps.Placemark([55.75 + (50 - p.y) / 500, 37.62 + (p.x - 50) / 500], {}, { iconImageHref: img(p.status === 'done' ? 'ui-check' : 'mark-problem'), iconImageSize: [24, 32] })));
          setYandex(true);
        });
      } catch { setYandex(false); }
    };
    s.onerror = () => { if (!dead) setYandex(false); };
    document.head.appendChild(s);
    return () => { dead = true; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const click = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!placing || !onPlacePoint) return;
    const r = e.currentTarget.getBoundingClientRect();
    onPlacePoint(Math.round(((e.clientX - r.left) / r.width) * 100), Math.round(((e.clientY - r.top) / r.height) * 100));
  };

  return (
    <div className="space-y-3">
      <div className={`relative border-2 border-ink rounded-md overflow-hidden bg-card ${placing ? 'cursor-crosshair' : ''}`}
        style={{ aspectRatio: '1/1' }} onClick={click}>
        {yandex === true && <div ref={yref} className="absolute inset-0 grayscale contrast-125" />}
        {yandex !== true && (
          <div className="absolute inset-0 transition-transform" style={{ transform: `scale(${zoom})` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img('map.png')} alt="" className="pix w-full h-full object-cover" draggable={false} />
            {problems.map((p) => (
              <button key={p.id}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: p.x + '%', top: p.y + '%' }}
                onClick={(e) => { e.stopPropagation(); if (!placing) setSel(p); }}>
                <Px n={p.status === 'done' ? 'ui-check' : 'mark-problem'} size={28} className="drop-shadow-[2px_2px_0_rgba(20,20,20,0.3)]" />
              </button>
            ))}
          </div>
        )}
        <div className="absolute right-2 top-2 flex flex-col gap-1">
          <button className="btn px-2 py-1" onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(2, z + 0.25)); }}><Px n="ui-plus" size={12} /></button>
          <button className="btn px-2 py-1" onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(1, z - 0.25)); }}><Px n="ui-minus" size={12} /></button>
        </div>
        {placing && <div className="absolute inset-x-0 bottom-0 bg-ink text-card text-[10px] font-bold text-center py-1">ТАПНИ ПО КАРТЕ</div>}
      </div>

      <div className="card p-3 flex items-center justify-between text-[9px] font-bold">
        {[['mark-problem', 'ПРОБЛЕМЫ'], ['mark-task', 'ЗАДАЧИ'], ['mark-project', 'ПРОЕКТЫ'], ['mark-vote', 'ГОЛОСОВАНИЯ']].map(([i, l]) => (
          <span key={l} className="flex flex-col items-center gap-1"><Px n={i} size={20} />{l}</span>
        ))}
      </div>

      <Modal open={!!sel} onClose={() => setSel(null)} title="ПРОБЛЕМА">
        {sel && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Px n={sel.icon} size={28} />
              <div>
                <div className="text-[11px] font-bold">{sel.title}</div>
                <div className="text-[10px] text-grey lowercase">{sel.desc}</div>
              </div>
            </div>
            <Rewards xp={sel.xp} karma={sel.karma} dist={sel.dist} />
            {sel.fund && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="inline-flex items-center gap-1"><Px n="ic-ruble" size={12} />{sel.fund.raised}/{sel.fund.goal}</span>
                  <span className="inline-flex items-center gap-1"><Px n="ic-clock" size={12} />{sel.fund.days}</span>
                </div>
                <Bar value={sel.fund.raised} max={sel.fund.goal} />
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              {sel.status === 'open' ? (
                <button className="btn btn-dark" onClick={() => { solveProblem(sel.id); setSel(null); }}>
                  <Px n="ui-check" size={12} className="invert" />РЕШИТЬ
                </button>
              ) : (
                <span className="btn opacity-60"><Px n="ui-check" size={12} />ГОТОВО</span>
              )}
              {sel.fund && (
                <a className="btn" href={TRIBUTE} target="_blank" rel="noreferrer"
                  onClick={() => supportFund(sel.id)}>
                  <Px n="ic-ruble" size={12} />{joined.includes(sel.id) ? 'ЕЩЁ' : 'В СБОР'}
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
