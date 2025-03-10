import { LoadingState } from '@/types/global';
import { create } from 'zustand';

export const useLoadingStore = create<LoadingState>((set) => ({
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
}));
