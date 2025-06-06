import { create } from 'zustand';
import { AuthState } from '../types';
import { clearAuth } from '@/infrastructure/authStorage';

export const useAuthStore = create<AuthState>((set) => ({
    user: { name: '', email: '' },
    accessToken: '',
    setAuth: (user, accessToken) => set({ user, accessToken }),
    clearAuth: () => {
        clearAuth();
        set({ user: { name: '', email: '' }, accessToken: '' });
    },
}));
