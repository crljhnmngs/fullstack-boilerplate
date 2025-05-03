import { create } from 'zustand';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
    user: { id: '', name: '', email: '' },
    accessToken: '',
    setAuth: (user, accessToken) => set({ user, accessToken }),
    clearAuth: () =>
        set({ user: { id: '', name: '', email: '' }, accessToken: '' }),
}));
