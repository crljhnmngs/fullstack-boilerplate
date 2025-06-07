import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaleUseCases } from '@/application/useCases/saleUseCases';
import { SaleFormData } from '@/presentation/validation/saleValidation';
import { useLoadingStore } from '@/application/store/loadingStore';
import { AlertIcon, handleApiErrorToast, showAlert } from '@/lib/utils';
import { ApiResponse } from '@/domain/types/api';
import { Sale } from '@/domain/entities/sale';
import { useSaleModalStore } from '@/application/store/modalStore';

export const useAddSale = () => {
    const queryClient = useQueryClient();
    const setLoading = useLoadingStore((state) => state.setLoading);
    const { closeModal } = useSaleModalStore();

    const mutation = useMutation({
        mutationFn: (saleData: SaleFormData) => SaleUseCases.addSale(saleData),
        onMutate: () => setLoading(true),
        onSuccess: (data: ApiResponse<Sale>) => {
            showAlert({
                title: 'Add Sale',
                text: data.message,
                icon: AlertIcon.Success,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error) => {
            handleApiErrorToast<Sale[]>(
                error,
                'Add Sale',
                'Unable to add sale.'
            );
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
    const { closeModal } = useSaleModalStore();

    const mutation = useMutation({
        mutationFn: ({
            id,
            saleData,
        }: {
            id: string;
            saleData: Partial<SaleFormData>;
        }) => SaleUseCases.updateSale(id, saleData),
        onMutate: () => setLoading(true),
        onSuccess: (data: ApiResponse<Sale>) => {
            showAlert({
                title: 'Update Sale',
                text: data.message,
                icon: AlertIcon.Success,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error) => {
            handleApiErrorToast<Sale[]>(
                error,
                'Update Sale',
                'Unable to update sale.'
            );
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
        onSuccess: (data: ApiResponse) => {
            showAlert({
                title: 'Delete Sale',
                text: data.message,
                icon: AlertIcon.Success,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            queryClient.invalidateQueries({ queryKey: ['sales'] });
        },
        onError: (error) => {
            handleApiErrorToast(error, 'Delete Sale', 'Unable to delete sale.');
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
        onSuccess: (data: ApiResponse) => {
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
            handleApiErrorToast(
                error,
                'Delete Multiple Sales',
                'Unable to delete multiple sales.'
            );
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
