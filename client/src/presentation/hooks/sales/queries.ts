import { useEffect, useState } from 'react';
import { useSaleStore } from '@/application/store/salesStore';
import { useQuery } from '@tanstack/react-query';
import { SaleUseCases } from '@/application/useCases/saleUseCases';
import { useDebounce } from 'use-debounce';
import toast from 'react-hot-toast';
import { useLoadingStore } from '@/application/store/loadingStore';
import { Pagination } from '@/domain/types/global';

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
                return await SaleUseCases.getAllSales(
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
            toast.error(error.message, { position: 'top-right' });
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
