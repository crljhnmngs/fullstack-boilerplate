import { create } from 'zustand';
import { SaleModalState } from '../types';

export const useSaleModalStore = create<SaleModalState>((set) => ({
    isOpen: false,
    mode: 'add',
    initialData: undefined,
    openModal: (mode, data) => set({ isOpen: true, mode, initialData: data }),
    closeModal: () => set({ isOpen: false, initialData: undefined }),
}));
