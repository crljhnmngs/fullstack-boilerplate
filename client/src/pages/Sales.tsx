import { useState } from 'react';
import { Header } from '../components/Header';
import {
    useGetSales,
    useAddSale,
    useUpdateSale,
} from '../hooks/sales/useSales';
import { SalesTable } from '../components/Tables/SalesTable';
import { couponUsed, purchaseMethods } from '../lib/const';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/ui/button';
import { SaleModal } from '../components/Modal/SaleModal';
import { SaleFormData } from '../schemas/sale/saleSchema';
import { useSaleModalStore } from '../store/modal/sale/useSaleModalStore';

export const Sales = () => {
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
    const [couponOpen, setCouponOpen] = useState<boolean>(false);
    const [purchaseOpen, setPurchaseOpen] = useState<boolean>(false);
    const { addSale } = useAddSale();
    const { updateSale } = useUpdateSale();

    const handleSubmit = (data: SaleFormData) =>
        mode === 'add'
            ? addSale(data)
            : updateSale({ id: data._id ?? '', saleData: data });

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
                                setValue={setCouponValue}
                                open={couponOpen}
                                setOpen={setCouponOpen}
                                defaultText="Select Coupon Used..."
                            />
                            <Dropdown
                                data={purchaseMethods}
                                value={purchaseValue}
                                setValue={setPurchaseValue}
                                open={purchaseOpen}
                                setOpen={setPurchaseOpen}
                                defaultText="Select Purchase Method..."
                                contentWith="230px"
                            />
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
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
