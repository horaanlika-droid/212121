'use client';
import { useState } from 'react';
import Shell from '@/components/Shell';
import { Bar, Px, Rewards } from '@/components/ui';
import { TRIBUTE } from '@/lib/base';
import { useApp } from '@/lib/store';

const TABS = ['ВСЕ', 'ДОСТУПНЫЕ', 'МОИ', 'ВЫПОЛНЕНЫ'] as const;

export default function Tasks() {
  const s = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>('ВСЕ');
  const list = s.problems.filter((p) =>
    tab === 'ВСЕ' ? true :
    tab === 'ДОСТУПНЫЕ' ? p.status === 'open' && !s.solved.includes(p.id) :
    tab === 'МОИ' ? s.solved.includes(p.id) :
    p.status === 'done');

  return (
    <Shell title="АКТИВНЫЕ ЗАДАЧИ" right={<Px n="ui-filter" size={14} />}>
      <div className="flex gap-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`chip flex-1 justify-center ${tab === t ? 'bg-ink text-card' : ''}`}>{t}</button>
        ))}
      </div>

      {list.map((p) => (
        <div key={p.id} className="card p-3 space-y-2">
          <div className="flex items-center gap-3">
            <span className="border-2 border-ink rounded p-1"><Px n={p.icon} size={24} /></span>
            <div className="flex-1 text-[10px] font-bold leading-4">{p.title}</div>
            {p.status === 'done' && <Px n="ui-check" size={14} />}
          </div>
          <div className="flex items-center justify-between">
            <Rewards xp={p.xp} karma={p.karma} dist={p.dist} />
            {p.status === 'open' && !s.solved.includes(p.id) && (
              <button className="btn btn-dark px-2 py-1" onClick={() => s.solveProblem(p.id)}>
                <Px n="ui-check" size={10} className="invert" />РЕШИТЬ
              </button>
            )}
          </div>
          {p.fund && (
            <div className="space-y-1">
              <Bar value={p.fund.raised} max={p.fund.goal} />
              <div className="flex justify-between text-[9px] font-bold">
                <span className="inline-flex items-center gap-1"><Px n="ic-ruble" size={10} />{p.fund.raised}/{p.fund.goal}</span>
                <a className="inline-flex items-center gap-1 underline" href={TRIBUTE} target="_blank" rel="noreferrer" onClick={() => s.supportFund(p.id)}>
                  <Px n="ic-ruble" size={10} />В СБОР
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </Shell>
  );
}
