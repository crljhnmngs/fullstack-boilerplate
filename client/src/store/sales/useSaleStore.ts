import { create } from 'zustand';
import { SaleState } from './types';

export const useSaleStore = create<SaleState>((set) => ({
    sales: [],
    selectedSales: [],
    setSales: (sales) => set({ sales }),
    setSelectedSales: (selectedSales) =>
        set((state) => ({
            selectedSales:
                typeof selectedSales === 'function'
                    ? selectedSales(state.selectedSales)
                    : selectedSales,
        })),
    resetSelectedSales: () => set({ selectedSales: [] }),
}));
