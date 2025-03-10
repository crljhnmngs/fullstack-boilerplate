import { useEffect, useState } from 'react';
import { useSaleStore } from '../../store/sales/useSaleStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    addSale,
    deleteSale,
    getAllSales,
    updateSale,
} from '../../service/sale/saleService';
import { Pagination } from '@/types/global';
import { useDebounce } from 'use-debounce';
import toast from 'react-hot-toast';
import { SaleFormData } from '@/schemas/sale/saleSchema';
import { useLoadingStore } from '../../store/loading/useLoadingStore';

export const useGetSales = () => {
    const setSales = useSaleStore((state) => state.setSales);
    const sales = useSaleStore((state) => state.sales);
    const setLoading = useLoadingStore((state) => state.setLoading);

    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 10,
    });

    const [searchInput, setSearchInput] = useState('');
    const [search] = useDebounce(searchInput, 300);

    const [couponValue, setCouponValue] = useState<boolean | undefined>(
        undefined
    );
    const [purchaseValue, setPurchaseValue] = useState<string | undefined>(
        undefined
    );

    const {
        data: res,
        isLoading,
        error,
    } = useQuery({
        queryKey: [
            'sales',
            pagination.currentPage,
            pagination.perPage,
            search,
            couponValue,
            purchaseValue,
        ],
        queryFn: async () => {
            setLoading(true);
            try {
                return await getAllSales(
                    pagination.currentPage,
                    pagination.perPage,
                    search,
                    couponValue,
                    purchaseValue
                );
            } finally {
                setLoading(false);
            }
        },
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (res) {
            setSales(res.data);
            setPagination(res.pagination);
        }
    }, [res, setSales]);

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: 'top-right',
            });
        }
    }, [error]);

    return {
        sales,
        isLoading,
        pagination,
        setPage: (page: number) =>
            setPagination((prev) => ({ ...prev, currentPage: page })),
        setPerPage: (perPage: number) =>
            setPagination((prev) => ({ ...prev, perPage })),
        searchInput,
        setSearchInput,
        couponValue,
        setCouponValue,
        purchaseValue,
        setPurchaseValue,
    };
};

export const useAddSale = () => {
    const queryClient = useQueryClient();
    const setLoading = useLoadingStore((state) => state.setLoading);

    const mutation = useMutation({
        mutationFn: (saleData: SaleFormData) => addSale(saleData),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            toast.success('Sale added successfully!', {
                position: 'top-right',
            });
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error: Error) => {
            toast.error(error.message, {
                position: 'top-right',
            });
        },
        onSettled: () => setLoading(false),
    });

    return {
        addSale: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export const useUpdateSale = () => {
    const queryClient = useQueryClient();
    const setLoading = useLoadingStore((state) => state.setLoading);

    const mutation = useMutation({
        mutationFn: ({
            id,
            saleData,
        }: {
            id: string | undefined;
            saleData: Partial<SaleFormData>;
        }) => updateSale(id, saleData),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            toast.success('Sale updated successfully!', {
                position: 'top-right',
            });
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error: Error) => {
            toast.error(error.message, { position: 'top-right' });
        },
        onSettled: () => setLoading(false),
    });

    return {
        updateSale: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export const useDeleteSale = () => {
    const queryClient = useQueryClient();
    const setLoading = useLoadingStore((state) => state.setLoading);

    const mutation = useMutation({
        mutationFn: (id: string | undefined) => deleteSale(id),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            toast.success('Sale deleted successfully!', {
                position: 'top-right',
            });
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error: Error) => {
            toast.error(error.message, { position: 'top-right' });
        },
        onSettled: () => setLoading(false),
    });

    return {
        deleteSale: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
