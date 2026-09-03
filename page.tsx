'use client';
import Link from 'next/link';
import Shell from '@/components/Shell';
import { Bar, Px } from '@/components/ui';
import { img } from '@/lib/base';
import { fmt } from '@/lib/data';
import { level, useApp } from '@/lib/store';

export default function Home() {
  const s = useApp();
  const openTasks = s.problems.filter((p) => p.status === 'open').length;
  return (
    <Shell title="ГОРОДСКАЯ ОС" right={<Link href="/tasks"><Px n="ui-bell" size={14} /></Link>}>
      <div className="text-center">
        <div className="text-6xl font-black tracking-tight">21</div>
      </div>

      <div className="card p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-[13px] font-bold">
            <span className="inline-flex items-center gap-2"><Px n="ic-heart" size={16} />{fmt(s.karma)}</span>
            <span className="inline-flex items-center gap-2"><Px n="ic-star" size={16} />{fmt(s.xp)}</span>
          </div>
          <Link href="/profile" className="btn px-2 py-1"><Px n="ui-plus" size={12} /></Link>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold">
          <span>{level(s.xp)}</span>
          <Bar value={s.xp % 100} max={100} className="flex-1" />
          <span>{s.xp % 100}/100</span>
        </div>
      </div>

      <div className="relative border-2 border-ink rounded-md overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img('hero.png')} alt="" className="pix w-full" draggable={false} />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 card px-3 py-2 text-center text-[9px] font-bold leading-4">
          РАЙОН ЦВЕТОЧНЫЙ<br /><span className="lowercase">живи лучше каждый день</span>
        </div>
      </div>

      <Link href="/tasks" className="btn btn-dark w-full py-3">
        АКТИВНЫЕ ЗАДАЧИ <span className="border-2 border-card rounded px-2">{openTasks}</span>
      </Link>

      {s.posts.length > 0 && (
        <div className="space-y-2">
          {s.posts.map((p) => (
            <div key={p.id} className="card p-3 flex items-center gap-3">
              <Px n="ui-bell" size={16} />
              <div className="flex-1">
                <div className="text-[10px] font-bold">{p.title}</div>
                <div className="text-[9px] text-grey lowercase">{p.text}</div>
              </div>
              <span className="text-[8px] text-grey">{p.time}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <Link href="/crowd" className="card p-3 flex flex-col items-center gap-2 text-[9px] font-bold">
          <Px n="ic-ruble" size={20} />СБОРЫ
        </Link>
        <Link href="/budget" className="card p-3 flex flex-col items-center gap-2 text-[9px] font-bold">
          <Px n="ic-star" size={20} />БЮДЖЕТ
        </Link>
        <Link href="/assistant" className="card p-3 flex flex-col items-center gap-2 text-[9px] font-bold">
          <Px n="robot" size={20} />AI
        </Link>
      </div>
    </Shell>
  );
}
