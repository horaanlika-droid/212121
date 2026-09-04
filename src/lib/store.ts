'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTHORS, SEED_FUNDS, SEED_POSTS, SEED_PROBLEMS, SEED_TOPICS, type Fund, type Post, type Problem, type Topic } from './data';

type State = {
  xp: number; karma: number;
  isAdmin: boolean; volunteer: boolean;
  acc: { cap: boolean; glasses: boolean; flower: boolean };
  applied: string[];      // применённые разделы энциклопедии
  survival: string[];     // закрытые навыки выживания
  authors: string[];      // прочитанные авторы
  solved: string[];       // решённые проблемы
  joined: string[];       // поддержанные сборы
  createdFunds: string[];
  addedProblems: number;
  activity: number;
  problems: Problem[];
  posts: Post[];
  topics: Topic[];
  funds: Fund[];

  applySection: (id: string) => void;
  doSurvival: (id: string) => void;
  readAuthor: (id: string) => void;
  solveProblem: (id: string) => void;
  supportFund: (id: string) => void;
  addProblem: (p: { title: string; desc: string; icon: string; x: number; y: number }) => void;
  addPost: (title: string, text: string) => void;
  addTopic: (title: string) => void;
  createFund: (problemId: string, goal: number) => void;
  toggleAdmin: () => void;
  becomeVolunteer: () => void;
  setAcc: (k: keyof State['acc']) => void;
  reset: () => void;
};

const seed = () => ({
  xp: 2430, karma: 430, isAdmin: false, volunteer: false,
  acc: { cap: false, glasses: false, flower: false },
  applied: [] as string[], survival: [] as string[], authors: [] as string[],
  solved: [] as string[], joined: [] as string[], createdFunds: [] as string[],
  addedProblems: 0, activity: 12,
  problems: SEED_PROBLEMS, posts: SEED_POSTS, topics: SEED_TOPICS, funds: SEED_FUNDS,
});

export const useApp = create<State>()(
  persist(
    (set, get) => ({
      ...seed(),
      applySection: (id) => set((s) => s.applied.includes(id) ? s : {
        applied: [...s.applied, id], xp: s.xp + 20, karma: s.karma + 5, activity: s.activity + 1,
      }),
      doSurvival: (id) => set((s) => s.survival.includes(id) ? s : {
        survival: [...s.survival, id], xp: s.xp + 10, activity: s.activity + 1,
      }),
      readAuthor: (id) => set((s) => s.authors.includes(id) ? s : {
        authors: [...s.authors, id], karma: s.karma + 3, activity: s.activity + 1,
      }),
      solveProblem: (id) => set((s) => {
        if (s.solved.includes(id)) return s;
        const p = s.problems.find((x) => x.id === id);
        if (!p) return s;
        return {
          solved: [...s.solved, id], xp: s.xp + p.xp, karma: s.karma + p.karma, activity: s.activity + 1,
          problems: s.problems.map((x) => x.id === id ? { ...x, status: 'done' as const } : x),
        };
      }),
      supportFund: (id) => set((s) => {
        if (s.joined.includes(id)) return s;
        return {
          joined: [...s.joined, id], karma: s.karma + 5, activity: s.activity + 1,
          funds: s.funds.map((f) => f.id === id || f.problemId === id ? { ...f, raised: f.raised + 500 } : f),
          problems: s.problems.map((p) => p.id === id && p.fund ? { ...p, fund: { ...p.fund, raised: p.fund.raised + 500 } } : p),
        };
      }),
      addProblem: (p) => set((s) => ({
        activity: s.activity + 1, xp: s.xp + 15, addedProblems: s.addedProblems + 1,
        problems: [...s.problems, {
          id: 'u' + Date.now(), title: p.title.toUpperCase(), desc: p.desc, icon: p.icon,
          x: p.x, y: p.y, xp: 50, karma: 15, dist: 100 + Math.round(Math.random() * 300), status: 'open',
        }],
      })),
      addPost: (title, text) => set((s) => ({
        activity: s.activity + 1,
        posts: [{ id: 'p' + Date.now(), title: title.toUpperCase(), text, time: 'СЕГОДНЯ' }, ...s.posts],
      })),
      addTopic: (title) => set((s) => ({
        activity: s.activity + 1, xp: s.xp + 5,
        topics: [{ id: 't' + Date.now(), author: 'ВЫ', time: 'СЕЙЧАС', title: title.toUpperCase(), comments: 0, likes: 0 }, ...s.topics],
      })),
      createFund: (problemId, goal) => set((s) => {
        const p = s.problems.find((x) => x.id === problemId);
        if (!p) return s;
        const fid = 'f' + Date.now();
        return {
          createdFunds: [...s.createdFunds, fid], xp: s.xp + 10, activity: s.activity + 1,
          funds: [{ id: fid, title: p.title, icon: p.icon, goal, raised: 0, days: 30, problemId }, ...s.funds],
          problems: s.problems.map((x) => x.id === problemId ? { ...x, fund: { goal, raised: 0, days: 30 } } : x),
        };
      }),
      toggleAdmin: () => set((s) => ({ isAdmin: !s.isAdmin })),
      becomeVolunteer: () => set((s) => ({ volunteer: true, karma: s.karma + 10 })),
      setAcc: (k) => set((s) => ({ acc: { ...s.acc, [k]: !s.acc[k] } })),
      reset: () => set(seed()),
    }),
    { name: 'app21-v1' }
  )
);

export const level = (xp: number) => 1 + Math.floor(xp / 100);
export const canPost = (s: { volunteer: boolean; xp: number }) => s.volunteer || level(s.xp) >= 2;

export const earnedBadges = (s: { applied: string[]; survival: string[]; authors: string[]; volunteer: boolean }) => {
  const b = [...s.applied.map((x) => 'badge-' + x), ...s.survival.map((x) => 'badge-' + x)];
  if (s.authors.length >= AUTHORS.length) b.push('badge-enlightened');
  if (s.volunteer) b.push('badge-volunteer');
  return b;
};

export const earnedItems = (s: { solved: string[]; joined: string[]; applied: string[]; volunteer: boolean; createdFunds: string[]; survival: string[] }) => {
  const out: string[] = [];
  if (s.solved.length >= 1) out.push('item-wrench');
  if (s.joined.length >= 1) out.push('item-heart');
  if (s.applied.length >= 3) out.push('item-seed');
  if (s.volunteer) out.push('item-shield');
  if (s.createdFunds.length >= 1) out.push('item-lamp');
  if (s.survival.length >= 5) out.push('item-star');
  return out;
};
