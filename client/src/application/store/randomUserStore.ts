import { create } from 'zustand';
import { RandomUserState } from '../types';

export const useRandomUserStore = create<RandomUserState>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
}));
