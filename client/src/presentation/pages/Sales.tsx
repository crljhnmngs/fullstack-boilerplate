import { Header } from '@/presentation/components/Header';
import {
    useGetSales,
    useAddSale,
    useUpdateSale,
    useMultipleDeleteSale,
} from '../hooks/sales';
import { couponUsed, purchaseMethodOptions } from '../../lib/const';
import { SaleFormData } from '@/presentation/validation/saleValidation';
import { useSaleModalStore } from '@/application/store/modalStore';
import { FaTrash } from 'react-icons/fa';
import { useSaleStore } from '@/application/store/salesStore';
import { SalesTable } from '../components/Tables/SalesTable';
import { SaleModal } from '../components/Modal/SaleModal';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/ui/button';
import { ConfirmationModal } from '../components/Modal/ConfirmationModal';

const Sales = () => {
    const {
        sales,
        isLoading,
        pagination,
        setPage,
        setPerPage,
        searchInput,
        setSearchInput,
        couponValue,
        setCouponValue,
        purchaseValue,
        setPurchaseValue,
    } = useGetSales();

    const openModal = useSaleModalStore((state) => state.openModal);
    const mode = useSaleModalStore((state) => state.mode);
    const { addSale } = useAddSale();
    const { updateSale } = useUpdateSale();
    const { deleteMultipleSale } = useMultipleDeleteSale();
    const { resetSelectedSales, selectedSales } = useSaleStore();

    const handleSubmit = (data: SaleFormData) =>
        mode === 'add'
            ? addSale(data)
            : updateSale({ id: data._id ?? '', saleData: data });

    const handleMultipleDelete = () => {
        deleteMultipleSale(selectedSales);
        resetSelectedSales();
    };

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <SaleModal onSubmit={handleSubmit} />
            <Header />

            <div className="flex justify-center w-full items-center pt-20 flex-col">
                <div className="w-[80%]">
                    <div className="w-full flex justify-between mb-2">
                        <div className="flex gap-4">
                            <Dropdown
                                data={couponUsed}
                                value={couponValue}
                                setValue={(value) => {
                                    setCouponValue(value);
                                    resetSelectedSales();
                                }}
                                defaultText="Select Coupon Used..."
                            />
                            <Dropdown
                                data={purchaseMethodOptions}
                                value={purchaseValue}
                                setValue={(value) => {
                                    setPurchaseValue(value);
                                    resetSelectedSales();
                                }}
                                defaultText="Select Purchase Method..."
                                contentWith="230px"
                            />
                        </div>
                        <div className="flex gap-3">
                            {selectedSales.length > 1 && (
                                <ConfirmationModal
                                    triggerText={<FaTrash size={22} />}
                                    title="Delete Sales?"
                                    description={`Are you sure you want to delete this ${selectedSales.length} sales? This action cannot be undone.`}
                                    confirmText="Yes, Delete"
                                    cancelText="Cancel"
                                    onConfirm={() => handleMultipleDelete()}
                                />
                            )}

                            <input
                                type="text"
                                placeholder="Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                    resetSelectedSales();
                                }}
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button
                                onClick={() => openModal('add')}
                                className="h-11 w-24"
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                    <SalesTable
                        sales={sales}
                        isLoading={isLoading}
                        pagination={pagination}
                        setPage={setPage}
                        setPerPage={setPerPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sales;
