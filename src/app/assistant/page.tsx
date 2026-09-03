'use client';
import { useState } from 'react';
import Shell from '@/components/Shell';
import { Px } from '@/components/ui';

const QUICK = [
  'как решить проблему с водой?',
  'как создать задачу?',
  'как провести голосование?',
  'как сделать двор лучше?',
];

const answer = (q: string): string => {
  const t = q.toLowerCase();
  if (t.includes('вод')) return 'энциклопедия → вода: уголь+песок+ткань, кипяток 5 мин. на карте — утечка: реши или вступи в сбор.';
  if (t.includes('задач')) return 'карта → маркер → «решить». волонтёры добавляют проблемы кнопкой +. награда: значок + xp.';
  if (t.includes('голос')) return 'форум → тема (волонтёры, уровень 2+). обсуждение → субботник/сбор.';
  if (t.includes('двор')) return 'краудфандинг: выбери проблему → создай сбор (tribute). соседи видят прогресс.';
  return 'смотри энциклопедию — там база: вода, энергия, еда, ремонт, выживание.';
};

export default function Assistant() {
  const [msg, setMsg] = useState<{ me?: string; ai?: string }[]>([{ ai: 'чем могу помочь?' }]);
  const [inp, setInp] = useState('');
  const ask = (q: string) => {
    if (!q.trim()) return;
    setMsg((m) => [...m, { me: q }, { ai: answer(q) }]);
    setInp('');
  };
  return (
    <Shell title="AI-АССИСТЕНТ">
      <div className="flex items-start gap-3">
        <Px n="robot" size={56} />
        <div className="card px-3 py-2 text-[10px] font-bold lowercase">{msg[msg.length - 1].ai}</div>
      </div>

      <div className="space-y-2">
        {QUICK.map((q) => (
          <button key={q} className="card w-full p-3 text-left text-[9px] font-bold lowercase" onClick={() => ask(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input className="inp" placeholder="напишите сообщение..." value={inp}
          onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && ask(inp)} />
        <button className="btn px-3" onClick={() => ask(inp)} aria-label="отправить"><Px n="ui-send" size={14} /></button>
      </div>
    </Shell>
  );
}
