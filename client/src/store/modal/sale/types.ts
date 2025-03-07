import { Sale } from '../../sales/types';

export type SaleModalState = {
    isOpen: boolean;
    mode: 'add' | 'edit';
    initialData?: Sale;
    openModal: (mode: 'add' | 'edit', data?: Sale) => void;
    closeModal: () => void;
};
