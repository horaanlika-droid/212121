'use client';
import { useState } from 'react';
import Shell from '@/components/Shell';
import { Bar, Modal, Px } from '@/components/ui';
import { fmt } from '@/lib/data';
import { TRIBUTE } from '@/lib/base';
import { useApp } from '@/lib/store';

const TABS = ['ВСЕ', 'СБОР ИДЁТ', 'УСПЕШНЫЕ', 'МОИ'] as const;

export default function Crowd() {
  const s = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>('ВСЕ');
  const [open, setOpen] = useState(false);
  const [pid, setPid] = useState('');
  const [goal, setGoal] = useState('250000');

  const list = s.funds.filter((f) =>
    tab === 'ВСЕ' ? true :
    tab === 'СБОР ИДЁТ' ? f.raised < f.goal :
    tab === 'УСПЕШНЫЕ' ? f.raised >= f.goal :
    s.joined.includes(f.id) || s.createdFunds.includes(f.id));

  const openProblems = s.problems.filter((p) => p.status === 'open' && !p.fund);

  return (
    <Shell title="КРАУДФАНДИНГ" right={<Px n="ui-filter" size={14} />}>
      <div className="flex gap-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`chip flex-1 justify-center ${tab === t ? 'bg-ink text-card' : ''}`}>{t}</button>
        ))}
      </div>

      {list.map((f) => (
        <div key={f.id} className="card p-3 space-y-2">
          <div className="flex items-center gap-3">
            <span className="border-2 border-ink rounded p-1"><Px n={f.icon} size={24} /></span>
            <div className="flex-1 text-[10px] font-bold leading-4">{f.title}</div>
            <span className="text-[10px] font-bold">{Math.round((f.raised / f.goal) * 100)}%</span>
          </div>
          <div className="flex justify-between text-[9px] font-bold">
            <span className="inline-flex items-center gap-1"><Px n="ic-ruble" size={10} />{fmt(f.raised)} / {fmt(f.goal)}</span>
            <span className="inline-flex items-center gap-1"><Px n="ic-clock" size={10} />{f.days}</span>
          </div>
          <Bar value={f.raised} max={f.goal} />
          <div className="grid grid-cols-2 gap-2">
            <a className="btn btn-dark" href={TRIBUTE} target="_blank" rel="noreferrer" onClick={() => s.supportFund(f.id)}>
              <Px n="ic-ruble" size={12} className="invert" />{s.joined.includes(f.id) ? 'ЕЩЁ' : 'ПОДДЕРЖАТЬ'}
            </a>
            <button className="btn" onClick={() => { try { navigator.clipboard?.writeText(TRIBUTE); } catch { /* noop */ } }}>
              <Px n="ui-send" size={12} />ПОДЕЛИТЬСЯ
            </button>
          </div>
        </div>
      ))}

      <button className="btn w-full py-3" onClick={() => setOpen(true)}>
        <Px n="ui-plus" size={12} />СОЗДАТЬ ПРОЕКТ
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="СБОР НА ПРОБЛЕМУ">
        {openProblems.length === 0 ? (
          <div className="text-[10px] font-bold">нет проблем без сбора</div>
        ) : (
          <div className="space-y-2">
            <div className="space-y-1">
              {openProblems.map((p) => (
                <button key={p.id} onClick={() => setPid(p.id)}
                  className={`card w-full p-2 flex items-center gap-2 text-left text-[9px] font-bold ${pid === p.id ? 'bg-lite' : ''}`}>
                  <Px n={p.icon} size={16} />{p.title}
                </button>
              ))}
            </div>
            <input className="inp" type="number" value={goal} onChange={(e) => setGoal(e.target.value)} />
            <button className="btn btn-dark w-full" disabled={!pid}
              onClick={() => { s.createFund(pid, Math.max(1000, Number(goal) || 1000)); setOpen(false); setPid(''); }}>
              <Px n="ui-check" size={12} className="invert" />ЗАПУСТИТЬ СБОР
            </button>
            <div className="text-[8px] text-grey text-center lowercase">оплата — tribute (ссылка-заглушка)</div>
          </div>
        )}
      </Modal>
    </Shell>
  );
}
