'use client';
import { useState } from 'react';
import Shell from '@/components/Shell';
import MapView from '@/components/MapView';
import { Modal, Px } from '@/components/ui';
import { useApp } from '@/lib/store';

const ICONS = ['t-bench', 't-trash', 't-sprout', 't-lamp', 't-drop'];

export default function MapPage() {
  const volunteer = useApp((s) => s.volunteer);
  const addProblem = useApp((s) => s.addProblem);
  const [placing, setPlacing] = useState(false);
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState(ICONS[0]);

  return (
    <Shell title="КАРТА РАЙОНА" right={
      volunteer ? (
        <button onClick={() => setPlacing((v) => !v)} aria-label="добавить проблему">
          <Px n={placing ? 'ui-close' : 'ui-plus'} size={14} />
        </button>
      ) : <Px n="ui-filter" size={14} />
    }>
      <MapView placing={placing} onPlacePoint={(x, y) => { setPt({ x, y }); setPlacing(false); }} />

      <Modal open={!!pt} onClose={() => setPt(null)} title="НОВАЯ ПРОБЛЕМА">
        <div className="space-y-2">
          <input className="inp" placeholder="название" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="inp" placeholder="описание" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="flex gap-2">
            {ICONS.map((i) => (
              <button key={i} onClick={() => setIcon(i)}
                className={`p-1 border-2 rounded ${icon === i ? 'border-ink bg-lite' : 'border-transparent'}`}>
                <Px n={i} size={20} />
              </button>
            ))}
          </div>
          <button className="btn btn-dark w-full" disabled={!title.trim()}
            onClick={() => { if (pt) addProblem({ title, desc, icon, x: pt.x, y: pt.y }); setPt(null); setTitle(''); setDesc(''); }}>
            <Px n="ui-check" size={12} className="invert" />НА КАРТУ
          </button>
        </div>
      </Modal>
    </Shell>
  );
}
