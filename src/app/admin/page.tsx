'use client';
import { useState } from 'react';
import Link from 'next/link';
import Shell from '@/components/Shell';
import { Px } from '@/components/ui';
import { fmt } from '@/lib/data';
import { useApp } from '@/lib/store';

const ICONS = ['t-bench', 't-trash', 't-sprout', 't-lamp', 't-drop'];
const TABS = ['ПРОБЛЕМЫ', 'ПОСТЫ', 'СТАТИСТИКА'] as const;

export default function Admin() {
  const s = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>('ПРОБЛЕМЫ');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState(ICONS[0]);
  const [pt, setPt] = useState('');
  const [px, setPx] = useState('');

  if (!s.isAdmin) {
    return (
      <Shell title="АДМИН-ПАНЕЛЬ">
        <div className="card p-6 flex flex-col items-center gap-3 text-center">
          <Px n="ui-lock" size={32} />
          <div className="text-[10px] font-bold">только для isAdmin</div>
          <Link href="/profile" className="btn btn-dark">ВКЛЮЧИТЬ В ПРОФИЛЕ</Link>
        </div>
      </Shell>
    );
  }

  const open = s.problems.filter((p) => p.status === 'open').length;
  const done = s.problems.length - open;
  const raised = s.funds.reduce((a, f) => a + f.raised, 0);

  return (
    <Shell title="АДМИН-ПАНЕЛЬ">
      <div className="flex gap-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`chip flex-1 justify-center ${tab === t ? 'bg-ink text-card' : ''}`}>{t}</button>
        ))}
      </div>

      {tab === 'ПРОБЛЕМЫ' && (
        <div className="space-y-2">
          <div className="card p-3 space-y-2">
            <input className="inp" placeholder="название" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="inp" placeholder="описание" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <div className="flex gap-2 items-center">
              {ICONS.map((i) => (
                <button key={i} onClick={() => setIcon(i)}
                  className={`p-1 border-2 rounded ${icon === i ? 'border-ink bg-lite' : 'border-transparent'}`}>
                  <Px n={i} size={18} />
                </button>
              ))}
            </div>
            <button className="btn btn-dark w-full" disabled={!title.trim()}
              onClick={() => {
                s.addProblem({ title, desc, icon, x: 10 + Math.round(Math.random() * 80), y: 10 + Math.round(Math.random() * 80) });
                setTitle(''); setDesc('');
              }}>
              <Px n="ui-plus" size={12} className="invert" />ДОБАВИТЬ ПРОБЛЕМУ
            </button>
          </div>
          {s.problems.map((p) => (
            <div key={p.id} className="card p-2 flex items-center gap-2 text-[9px] font-bold">
              <Px n={p.icon} size={16} />
              <span className="flex-1">{p.title}</span>
              {p.status === 'done' ? <Px n="ui-check" size={12} /> : <Px n="ui-lock" size={12} className="opacity-30" />}
            </div>
          ))}
        </div>
      )}

      {tab === 'ПОСТЫ' && (
        <div className="space-y-2">
          <div className="card p-3 space-y-2">
            <input className="inp" placeholder="заголовок" value={pt} onChange={(e) => setPt(e.target.value)} />
            <input className="inp" placeholder="текст" value={px} onChange={(e) => setPx(e.target.value)} />
            <button className="btn btn-dark w-full" disabled={!pt.trim()}
              onClick={() => { s.addPost(pt, px); setPt(''); setPx(''); }}>
              <Px n="ui-send" size={12} className="invert" />В ЛЕНТУ
            </button>
          </div>
          {s.posts.map((p) => (
            <div key={p.id} className="card p-2 text-[9px] font-bold">
              {p.title}<div className="text-grey lowercase font-normal">{p.text}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'СТАТИСТИКА' && (
        <div className="card p-4 space-y-3 text-[10px] font-bold">
          <div className="flex justify-between"><span className="inline-flex items-center gap-2"><Px n="nav-profile" size={14} />ПОЛЬЗОВАТЕЛИ</span><span>128</span></div>
          <div className="flex justify-between"><span className="inline-flex items-center gap-2"><Px n="mark-problem" size={14} />ПРОБЛЕМЫ ОТКРЫТЫ</span><span>{open}</span></div>
          <div className="flex justify-between"><span className="inline-flex items-center gap-2"><Px n="ui-check" size={14} />РЕШЕНО</span><span>{done}</span></div>
          <div className="flex justify-between"><span className="inline-flex items-center gap-2"><Px n="ic-ruble" size={14} />СОБРАНО</span><span>{fmt(raised)}</span></div>
          <div className="flex justify-between"><span className="inline-flex items-center gap-2"><Px n="ic-star" size={14} />АКТИВНОСТЬ</span><span>{s.activity}</span></div>
        </div>
      )}
    </Shell>
  );
}
