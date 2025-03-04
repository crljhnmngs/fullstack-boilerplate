import { useState } from 'react';
import { Header } from '../components/Header';
import { useSales } from '../hooks/Sales/useSales';
import { SalesTable } from '../components/Tables/SalesTable';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../components/ui/popover';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '../components/ui/command';
import { Button } from '../components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { couponUsed, purchaseMethods } from '../lib/const';

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
    } = useSales();

    const [couponOpen, setCouponOpen] = useState<boolean>(false);
    const [purchaseOpen, setPurchaseOpen] = useState<boolean>(false);

    const handleCouponSelect = (selectedValue: boolean) => {
        setCouponValue((currentValue) =>
            currentValue === selectedValue ? undefined : selectedValue
        );
        setCouponOpen(false);
    };

    const handlePurchaseSelect = (selectedValue: string) => {
        setPurchaseValue((currentValue) =>
            currentValue === selectedValue ? undefined : selectedValue
        );
        setPurchaseOpen(false);
    };

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Header />
            <div className="flex justify-center w-full items-center pt-20 flex-col">
                <div className="w-[80%]">
                    <div className="w-full flex justify-between mb-2">
                        <div className="flex gap-4">
                            <Popover
                                open={couponOpen}
                                onOpenChange={setCouponOpen}
                            >
                                <PopoverTrigger asChild className="h-11">
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={couponOpen}
                                        className="w-[200px] justify-between"
                                    >
                                        {couponValue !== undefined
                                            ? couponUsed.find(
                                                  (item) =>
                                                      item.value === couponValue
                                              )?.label
                                            : 'Select Coupon Used...'}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandList>
                                            <CommandGroup>
                                                {couponUsed.map((item) => (
                                                    <CommandItem
                                                        key={item.label}
                                                        value={item.label}
                                                        onSelect={() =>
                                                            handleCouponSelect(
                                                                item.value
                                                            )
                                                        }
                                                        className="p-2"
                                                    >
                                                        {item.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <Popover
                                open={purchaseOpen}
                                onOpenChange={setPurchaseOpen}
                            >
                                <PopoverTrigger asChild className="h-11">
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={purchaseOpen}
                                        className="w-[230px] justify-between"
                                    >
                                        {purchaseValue !== undefined
                                            ? purchaseMethods.find(
                                                  (item) =>
                                                      item.value ===
                                                      purchaseValue
                                              )?.label
                                            : 'Select Purchase Method...'}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[250px] p-0">
                                    <Command>
                                        <CommandList>
                                            <CommandGroup>
                                                {purchaseMethods.map((item) => (
                                                    <CommandItem
                                                        key={item.label}
                                                        value={item.label}
                                                        onSelect={() =>
                                                            handlePurchaseSelect(
                                                                item.value
                                                            )
                                                        }
                                                        className="p-2"
                                                    >
                                                        {item.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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
