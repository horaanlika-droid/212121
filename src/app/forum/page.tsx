'use client';
import { useState } from 'react';
import Shell from '@/components/Shell';
import { Modal, Px } from '@/components/ui';
import { canPost, useApp } from '@/lib/store';

const TABS = ['ПОСЛЕДНИЕ', 'ОБСУЖДАЕМЫЕ', 'МОИ'] as const;

export default function Forum() {
  const s = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>('ПОСЛЕДНИЕ');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const allowed = canPost(s);

  const list = [...s.topics].sort((a, b) => tab === 'ОБСУЖДАЕМЫЕ' ? b.likes - a.likes : 0)
    .filter((t) => tab !== 'МОИ' || t.author === 'ВЫ');

  return (
    <Shell title="ФОРУМ" right={
      <button onClick={() => allowed && setOpen(true)} aria-label="новая тема">
        {allowed ? <Px n="ui-edit" size={14} /> : <Px n="ui-lock" size={14} />}
      </button>
    }>
      <div className="flex gap-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`chip flex-1 justify-center ${tab === t ? 'bg-ink text-card' : ''}`}>{t}</button>
        ))}
      </div>

      {!allowed && (
        <div className="card p-3 flex items-center gap-3 text-[9px] font-bold">
          <Px n="ui-lock" size={16} />темы создают волонтёры (уровень 2+)
        </div>
      )}

      {list.map((t) => (
        <div key={t.id} className="card p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Px n="p0" size={20} />
            <span className="text-[9px] font-bold">{t.author}</span>
            <span className="text-[8px] text-grey ml-auto">{t.time}</span>
          </div>
          <div className="text-[10px] font-bold leading-4">{t.title}</div>
          <div className="flex items-center gap-4 text-[9px] font-bold">
            <span className="inline-flex items-center gap-1"><Px n="nav-forum" size={12} />{t.comments}</span>
            <span className="inline-flex items-center gap-1"><Px n="ic-heart" size={12} />{t.likes}</span>
          </div>
        </div>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} title="НОВАЯ ТЕМА">
        <input className="inp" placeholder="тема" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="btn btn-dark w-full" disabled={!title.trim()}
          onClick={() => { s.addTopic(title); setOpen(false); setTitle(''); }}>
          <Px n="ui-send" size={12} className="invert" />ОПУБЛИКОВАТЬ
        </button>
      </Modal>
    </Shell>
  );
}
