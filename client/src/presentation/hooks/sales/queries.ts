import { useEffect, useState } from 'react';
import { useSaleStore } from '@/application/store/salesStore';
import { useQuery } from '@tanstack/react-query';
import { SaleUseCases } from '@/application/useCases/saleUseCases';
import { useDebounce } from 'use-debounce';
import { useLoadingStore } from '@/application/store/loadingStore';
import { Pagination } from '@/domain/types/global';
import { handleApiErrorToast } from '@/lib/utils';
import { Sale } from '@/domain/entities/sale';

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
                return await SaleUseCases.getAllSales({
                    page: pagination.currentPage,
                    limit: pagination.perPage,
                    search,
                    couponUsed: couponValue,
                    purchaseMethod: purchaseValue,
                });
            } finally {
                setLoading(false);
            }
        },
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (res) {
            setSales(res.data!);
            setPagination(res.pagination);
        }
    }, [res, setSales]);

    useEffect(() => {
        if (error) {
            handleApiErrorToast<Sale[]>(
                error,
                'Fetch Sales',
                'Unable to load sales data.'
            );
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
