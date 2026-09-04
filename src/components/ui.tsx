'use client';
import { img } from '@/lib/base';
import { fmt } from '@/lib/data';

export function Px({ n, size = 16, className = '', alt = '' }: { n: string; size?: number; className?: string; alt?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={img(n + '.png')} width={size} height={size} alt={alt}
      className={`pix inline-block align-middle ${className}`} draggable={false} />
  );
}

// Награды без слов: иконка + число
export function Rewards({ xp, karma, dist, rub }: { xp?: number; karma?: number; dist?: number; rub?: number }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold">
      {xp !== undefined && <span className="inline-flex items-center gap-1"><Px n="ic-star" size={12} />{xp}</span>}
      {karma !== undefined && <span className="inline-flex items-center gap-1"><Px n="ic-heart" size={12} />{karma}</span>}
      {dist !== undefined && <span className="inline-flex items-center gap-1"><Px n="ic-pin" size={12} />{dist}</span>}
      {rub !== undefined && <span className="inline-flex items-center gap-1"><Px n="ic-ruble" size={12} />{fmt(rub)}</span>}
    </div>
  );
}

export function Bar({ value, max, className = '' }: { value: number; max: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <div className={`h-3 border-2 border-ink bg-card rounded-sm overflow-hidden ${className}`}>
      <div className="h-full bg-ink" style={{ width: pct + '%' }} />
    </div>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-ink/50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="card w-full max-w-sm p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="h1">{title}</div>
          <button onClick={onClose} aria-label="закрыть"><Px n="ui-close" size={14} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function StatusIcons() {
  return (
    <span className="inline-flex items-center gap-1">
      <Px n="st-sig" size={10} /><Px n="st-wifi" size={10} /><Px n="st-batt" size={12} />
    </span>
  );
}
