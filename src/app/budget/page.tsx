'use client';
import { useState } from 'react';
import Shell from '@/components/Shell';
import { Bar, Modal, Px } from '@/components/ui';
import { BUDGET, fmt } from '@/lib/data';

export default function Budget() {
  const [rep, setRep] = useState(false);
  return (
    <Shell title="РАСПРЕДЕЛЕНИЕ БЮДЖЕТА" right={<button onClick={() => setRep(true)}><Px n="ui-info" size={14} /></button>}>
      <div className="card p-3 flex items-center gap-3">
        <Px n="robot" size={36} />
        <div>
          <div className="text-[10px] font-bold">AI-АНАЛИЗ РАЙОНА</div>
          <div className="text-[8px] text-grey lowercase">приоритеты на основе данных</div>
        </div>
      </div>

      <div className="card p-4 space-y-3">
        <div className="flex justify-between text-[10px] font-bold">
          <span>БЮДЖЕТ РАЙОНА</span><span className="inline-flex items-center gap-1"><Px n="ic-ruble" size={12} />{fmt(BUDGET.total)}</span>
        </div>
        {BUDGET.rows.map((r) => (
          <div key={r.name} className="space-y-1">
            <div className="flex justify-between text-[9px] font-bold">
              <span>{r.name}</span>
              <span>{r.pct}% · {fmt(r.sum)}</span>
            </div>
            <Bar value={r.pct} max={50} />
          </div>
        ))}
      </div>

      <button className="btn w-full py-3" onClick={() => setRep(true)}>ПОДРОБНЫЙ ОТЧЁТ</button>

      <Modal open={rep} onClose={() => setRep(false)} title="ОТЧЁТ">
        {BUDGET.rows.map((r) => (
          <div key={r.name} className="flex justify-between text-[9px] font-bold">
            <span>{r.name}</span><span>{fmt(r.sum)}</span>
          </div>
        ))}
        <div className="text-[8px] text-grey lowercase">источник: открытые данные района (заглушка)</div>
      </Modal>
    </Shell>
  );
}
