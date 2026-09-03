'use client';
import { useState } from 'react';
import Shell from '@/components/Shell';
import { Px, Rewards } from '@/components/ui';
import { AUTHORS, SECTIONS, SURVIVAL } from '@/lib/data';
import { useApp } from '@/lib/store';

export default function Encyclopedia() {
  const s = useApp();
  const [sel, setSel] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const unlocked = (i: number) => i === 0 || s.applied.includes(SECTIONS[i - 1].id);
  const section = SECTIONS.find((x) => x.id === sel);
  const allAuthors = s.authors.length >= AUTHORS.length;

  const copy = (id: string, q: string) => {
    try { navigator.clipboard?.writeText(q); } catch { /* noop */ }
    setCopied(id);
    setTimeout(() => setCopied(null), 1200);
  };

  if (section) {
    const idx = SECTIONS.indexOf(section);
    return (
      <Shell title="ЭНЦИКЛОПЕДИЯ">
        <button className="btn px-2 py-1" onClick={() => setSel(null)}><Px n="ui-arrowl" size={12} />НАЗАД</button>

        <div className="card p-4 flex items-center gap-4">
          <Px n={section.badge} size={56} className={s.applied.includes(section.id) ? '' : 'grayscale opacity-50'} />
          <div>
            <div className="h1">{section.title}</div>
            <div className="text-[9px] text-grey">{s.applied.includes(section.id) ? 'ПРИМЕНЕНО' : unlocked(idx) ? 'ЧИТАЙ И ПРИМЕНЯЙ' : 'ЗАКРЫТО'}</div>
          </div>
        </div>

        <div className="card p-3 space-y-1">
          {section.lines.map((l) => (
            <div key={l} className="flex items-center gap-2 text-[10px] font-bold lowercase">
              <Px n="ic-star" size={8} />{l}
            </div>
          ))}
        </div>

        {section.quest && (
          <div className="card p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold lowercase">применить: {section.quest}</span>
              <Rewards xp={20} karma={5} />
            </div>
            {s.applied.includes(section.id) ? (
              <div className="btn w-full opacity-60"><Px n="ui-check" size={12} />СДЕЛАНО</div>
            ) : (
              <button className="btn btn-dark w-full" onClick={() => s.applySection(section.id)}>
                <Px n="ui-check" size={12} className="invert" />ВЫПОЛНИТЬ
              </button>
            )}
            <div className="text-[8px] text-grey text-center">следующий раздел откроется после применения</div>
          </div>
        )}

        {section.id === 'survival' && (
          <div className="grid grid-cols-2 gap-2">
            {SURVIVAL.map((t) => {
              const done = s.survival.includes(t.id);
              return (
                <div key={t.id} className="card p-3 flex flex-col items-center gap-1 text-center">
                  <Px n={t.badge} size={44} className={done ? '' : 'grayscale opacity-40'} />
                  <div className="text-[9px] font-bold">{t.name}</div>
                  <div className="text-[8px] text-grey lowercase">{t.tip}</div>
                  {done ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold"><Px n="ui-check" size={10} /><Px n="ic-star" size={10} />10</span>
                  ) : (
                    <button className="btn btn-dark px-2 py-1" onClick={() => s.doSurvival(t.id)}>
                      <Px n="ic-star" size={10} className="invert" />10
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {section.id === 'reading' && (
          <div className="space-y-2">
            {allAuthors && (
              <div className="card p-3 flex items-center gap-3">
                <Px n="badge-enlightened" size={44} />
                <div className="text-[10px] font-bold">ПРОСВЕЩЁННЫЙ<br /><span className="text-grey">все авторы прочитаны</span></div>
              </div>
            )}
            {AUTHORS.map((a) => {
              const read = s.authors.includes(a.id);
              return (
                <div key={a.id} className="card p-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <Px n={a.p} size={32} />
                    <div className="flex-1">
                      <div className="text-[10px] font-bold">{a.name}</div>
                      <div className="text-[8px] text-grey lowercase">{a.idea}</div>
                    </div>
                    {read && <Px n="ui-check" size={14} />}
                  </div>
                  <div className="text-[9px] lowercase border-l-2 border-ink pl-2">«{a.quote}»</div>
                  <div className="flex gap-2">
                    {!read ? (
                      <button className="btn btn-dark flex-1 py-1" onClick={() => s.readAuthor(a.id)}>
                        <Px n="ic-heart" size={10} className="invert" />3
                      </button>
                    ) : (
                      <span className="btn flex-1 py-1 opacity-60">ПРОЧИТАНО</span>
                    )}
                    <button className="btn px-2 py-1" onClick={() => copy(a.id, a.quote)}>
                      {copied === a.id ? <Px n="ui-check" size={12} /> : <Px n="ui-edit" size={12} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Shell>
    );
  }

  return (
    <Shell title="ЭНЦИКЛОПЕДИЯ" right={<Px n="ui-search" size={14} />}>
      <div className="card p-3 flex justify-between">
        {SECTIONS.map((sec, i) => (
          <button key={sec.id} onClick={() => unlocked(i) && setSel(sec.id)} className="text-center">
            <Px n={sec.badge} size={26} className={s.applied.includes(sec.id) ? '' : 'grayscale opacity-40'} />
          </button>
        ))}
      </div>

      {SECTIONS.map((sec, i) => {
        const open = unlocked(i);
        const done = s.applied.includes(sec.id);
        return (
          <button key={sec.id} onClick={() => open && setSel(sec.id)}
            className={`card w-full p-3 flex items-center gap-3 ${open ? '' : 'opacity-50'}`}>
            <Px n={sec.icon} size={24} />
            <span className="flex-1 text-left text-[10px] font-bold">{i + 1}. {sec.title}</span>
            {sec.id === 'survival' && <span className="text-[8px] text-grey">+10<Px n="ic-star" size={8} /></span>}
            {sec.id === 'reading' && <span className="text-[8px] text-grey">+3<Px n="ic-heart" size={8} /></span>}
            {!open ? <Px n="ui-lock" size={14} /> : done ? <Px n="ui-check" size={14} /> : <Px n="ui-arrowr" size={14} />}
          </button>
        );
      })}
    </Shell>
  );
}
