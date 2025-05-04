import { Sale } from '@/domain/entities/sale';

export type SaleModalState = {
    isOpen: boolean;
    mode: 'add' | 'edit';
    initialData?: Sale;
    openModal: (mode: 'add' | 'edit', data?: Sale) => void;
    closeModal: () => void;
};

export type LoadingState = {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
};

export type SaleState = {
    sales: Sale[];
    selectedSales: string[];
    setSales: (sales: Sale[]) => void;
    setSelectedSales: React.Dispatch<React.SetStateAction<string[]>>;
    resetSelectedSales: () => void;
};

export type RandomUser = {
    name: { title: string; first: string; last: string };
    email: string;
    phone: string;
    picture: { large: string; medium: string; thumbnail: string };
    nat: string;
};

export type RandomUserState = {
    users: RandomUser[];
    setUsers: (users: RandomUser[]) => void;
};

export type FetchRandomUserParams = {
    results?: number;
    nationality?: string;
};

export type Counter = {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
};

export type UserData = {
    name: string;
    email: string;
};

export type AuthState = {
    user: UserData;
    accessToken: string;
    setAuth: (user: UserData, accessToken: string) => void;
    clearAuth: () => void;
};
