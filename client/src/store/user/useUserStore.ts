import { create } from 'zustand';
import { UserState } from './types';

export const useUserStore = create<UserState>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
}));
