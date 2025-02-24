import { create } from 'zustand';
import { Counter } from './types';

export const useCounter = create<Counter>((set) => ({
    count: 1,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set(() => ({ count: 0 })),
}));
