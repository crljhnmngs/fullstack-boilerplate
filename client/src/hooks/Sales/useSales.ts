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
    const [startItem, setStartItem] = useState<number>(0);
    const [endItem, setEndItem] = useState<number>(0);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [search] = useDebounce(searchInput, 300);

    const { data: res, isLoading } = useQuery({
        queryKey: ['sales', page, perPage, search],
        queryFn: () => getAllSales(page, perPage, search),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (res) {
            setSales(res.data);
            setPagination(res.pagination);
        }
    }, [res, setSales]);

    useEffect(() => {
        const start = (pagination.currentPage - 1) * pagination.perPage + 1;
        const end = Math.min(
            start + pagination.perPage - 1,
            pagination.totalItems
        );

        setStartItem(start);
        setEndItem(end);
    }, [pagination]);

    const handlePrevious = () => {
        if (page > 1 && !isLoading) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < pagination.totalPages && !isLoading)
            setPage((prev) => prev + 1);
    };

    return {
        sales,
        isLoading,
        pagination,
        startItem,
        endItem,
        perPage,
        page,
        searchInput,
        setSearchInput,
        setPerPage,
        handlePrevious,
        handleNext,
    };
};
