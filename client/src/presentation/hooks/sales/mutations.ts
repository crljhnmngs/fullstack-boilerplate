import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaleUseCases } from '@/application/useCases/saleUseCases';
import { SaleFormData } from '@/presentation/validation/saleValidation';
import toast from 'react-hot-toast';
import { useLoadingStore } from '@/application/store/loadingStore';

export const useAddSale = () => {
    const queryClient = useQueryClient();
    const setLoading = useLoadingStore((state) => state.setLoading);

    const mutation = useMutation({
        mutationFn: (saleData: SaleFormData) => SaleUseCases.addSale(saleData),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            toast.success('Sale added successfully!', {
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
            id: string;
            saleData: Partial<SaleFormData>;
        }) => SaleUseCases.updateSale(id, saleData),
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
        mutationFn: (id: string) => SaleUseCases.deleteSale(id),
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

export const useMultipleDeleteSale = () => {
    const queryClient = useQueryClient();
    const setLoading = useLoadingStore((state) => state.setLoading);

    const mutation = useMutation({
        mutationFn: (ids: string[]) => SaleUseCases.deleteMultipleSale(ids),
        onMutate: () => setLoading(true),
        onSuccess: (data) => {
            toast.success(data?.message || 'Sales deleted successfully!', {
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
        deleteMultipleSale: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
