import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaleUseCases } from '@/application/useCases/saleUseCases';
import { SaleFormData } from '@/presentation/validation/saleValidation';
import { useLoadingStore } from '@/application/store/loadingStore';
import { AlertIcon, showAlert } from '@/lib/utils';

export const useAddSale = () => {
    const queryClient = useQueryClient();
    const setLoading = useLoadingStore((state) => state.setLoading);

    const mutation = useMutation({
        mutationFn: (saleData: SaleFormData) => SaleUseCases.addSale(saleData),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            showAlert({
                title: 'Add Sale',
                text: 'Sale added successfully!',
                icon: AlertIcon.Success,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error: Error) => {
            showAlert({
                title: 'Add Sale',
                text: error.message,
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
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
            id: string;
            saleData: Partial<SaleFormData>;
        }) => SaleUseCases.updateSale(id, saleData),
        onMutate: () => setLoading(true),
        onSuccess: () => {
            showAlert({
                title: 'Update Sale',
                text: 'Sale updated successfully!',
                icon: AlertIcon.Success,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error: Error) => {
            showAlert({
                title: 'Update Sale',
                text: error.message,
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
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
            showAlert({
                title: 'Delete Sale',
                text: 'Sale deleted successfully!',
                icon: AlertIcon.Success,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error: Error) => {
            showAlert({
                title: 'Delete Sale',
                text: error.message,
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
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
            showAlert({
                title: 'Delete Multiple Sales',
                text: data?.message || 'Sales deleted successfully!',
                icon: AlertIcon.Success,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error: Error) => {
            showAlert({
                title: 'Delete Multiple Sales',
                text: error.message,
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
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
