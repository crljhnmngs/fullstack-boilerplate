import { create } from 'zustand';
import { AuthState, UserData } from '../types';
import { clearAuth } from '@/infrastructure/authStorage';

export const useAuthStore = create<AuthState>((set) => ({
    user: { firstname: '', middlename: '', lastname: '', email: '', role: '' },
    accessToken: '',
    setAuth: (user, accessToken) => set({ user, accessToken }),
    updateUser: (updatedUser: UserData) =>
        set((state) => ({
            user: {
                ...state.user,
                ...updatedUser,
            },
        })),
    clearAuth: () => {
        clearAuth();
        set({
            user: {
                firstname: '',
                middlename: '',
                lastname: '',
                email: '',
                role: '',
            },
            accessToken: '',
        });
    },
}));
