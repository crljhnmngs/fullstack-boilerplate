import { create } from 'zustand';
import { SaleState } from './types';

export const useSaleStore = create<SaleState>((set) => ({
    sales: [],
    setSales: (sales) => set({ sales }),
}));
