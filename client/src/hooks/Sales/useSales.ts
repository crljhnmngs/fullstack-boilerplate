import { useEffect, useState } from 'react';
import { useSaleStore } from '../../store/sales/useSaleStore';
import { useQuery } from '@tanstack/react-query';
import { getAllSales } from '../../service/sale/saleService';
import { Pagination } from '@/types/global';
import { useDebounce } from 'use-debounce';

export const useSales = () => {
    const setSales = useSaleStore((state) => state.setSales);
    const sales = useSaleStore((state) => state.sales);

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

    const { data: res, isLoading } = useQuery({
        queryKey: [
            'sales',
            pagination.currentPage,
            pagination.perPage,
            search,
            couponValue,
            purchaseValue,
        ],
        queryFn: () =>
            getAllSales(
                pagination.currentPage,
                pagination.perPage,
                search,
                couponValue,
                purchaseValue
            ),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (res) {
            setSales(res.data);
            setPagination(res.pagination);
        }
    }, [res, setSales]);

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
