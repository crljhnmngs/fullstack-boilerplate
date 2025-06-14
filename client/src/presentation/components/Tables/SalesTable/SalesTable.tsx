import { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../../ui/table';
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { HiOutlinePencil } from 'react-icons/hi';
import { IoTrashOutline } from 'react-icons/io5';
import { Checkbox } from '@/presentation/components/Form/Input/Checkbox';
import { Pagination } from './Pagination';
import { Button } from '@/presentation/components/ui/Button/Button';
import {
    useAddSale,
    useDeleteSale,
    useGetSales,
    useMultipleDeleteSale,
    useUpdateSale,
} from '@/presentation/hooks/sales';
import { useSaleStore } from '@/application/store/salesStore';
import { ConfirmationModal } from '../../Modal/ConfirmationModal';
import { useSaleModalStore } from '@/application/store/modalStore';
import { SaleModal } from '../../Modal/SaleModal';
import { Sale, Item } from '@/domain/entities/sale';
import { capitalizeFirstLetter, formatDate } from '@/lib/utils';
import { SaleFormData } from '@/presentation/validation/saleValidation';
import { FilterPopover } from './FilterPopover';

export const SalesTable = () => {
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
    const { resetSelectedSales, selectedSales, setSelectedSales } =
        useSaleStore();
    const { deleteSale } = useDeleteSale();
    const { addSale } = useAddSale();
    const { updateSale } = useUpdateSale();
    const { deleteMultipleSale } = useMultipleDeleteSale();

    const handleEdit = (sale: Sale) => {
        openModal('edit', sale);
    };

    const handleDelete = (sale: Sale) => {
        deleteSale(sale._id);
    };

    const handleSubmit = (data: SaleFormData) =>
        mode === 'add'
            ? addSale(data)
            : updateSale({ id: data._id ?? '', saleData: data });

    const handleMultipleDelete = () => {
        deleteMultipleSale(selectedSales);
        resetSelectedSales();
    };

    const columns: ColumnDef<Sale>[] = useMemo(
        () => [
            {
                id: 'select',
                size: 50,
                header: () => {
                    const isAllSelected =
                        selectedSales.length === sales.length &&
                        sales.length > 0;

                    return (
                        <Checkbox
                            checked={isAllSelected}
                            onChange={(checked) => {
                                setSelectedSales(
                                    checked ? sales.map((sale) => sale._id) : []
                                );
                            }}
                        />
                    );
                },
                cell: ({ row }) => (
                    <Checkbox
                        checked={selectedSales.includes(row.original._id)}
                        onChange={(checked) => {
                            setSelectedSales((prev: string[]) =>
                                checked
                                    ? [...prev, row.original._id]
                                    : prev.filter(
                                          (id) => id !== row.original._id
                                      )
                            );
                        }}
                    />
                ),
            },
            {
                header: 'Sale Date',
                accessorKey: 'saleDate',
                cell: ({ getValue }) => formatDate(getValue() as string),
            },
            {
                header: 'Items Name',
                accessorKey: 'items',
                cell: ({ getValue }) =>
                    (getValue() as Item[])
                        .map((item) => capitalizeFirstLetter(item.name))
                        .join(', '),
            },
            { header: 'Store Location', accessorKey: 'storeLocation' },
            { header: 'Customer Email', accessorKey: 'customer.email' },
            {
                header: 'Coupon Used',
                accessorKey: 'couponUsed',
                cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
            },
            { header: 'Purchase Method', accessorKey: 'purchaseMethod' },
            {
                header: 'Actions',
                accessorKey: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center w-full gap-2">
                        <button
                            className="  text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                            onClick={() => handleEdit(row.original)}
                        >
                            <HiOutlinePencil className="size-5" />
                        </button>
                        <ConfirmationModal
                            triggerText={
                                <IoTrashOutline className="size-5 text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500" />
                            }
                            title="Delete Sale?"
                            description="Are you sure you want to delete this sale? This action cannot be undone."
                            confirmText="Yes, Delete"
                            cancelText="Cancel"
                            onConfirm={() => handleDelete(row.original)}
                        />
                    </div>
                ),
            },
        ],
        [sales, selectedSales]
    );

    const table = useReactTable({
        data: sales,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        rowCount: pagination.totalItems,
        state: {
            pagination: {
                pageIndex: pagination.currentPage - 1,
                pageSize: pagination.perPage,
            },
        },
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === 'function'
                    ? updater({
                          pageIndex: pagination.currentPage - 1,
                          pageSize: pagination.perPage,
                      })
                    : updater;

            setPage(newPagination.pageIndex + 1);
            setPerPage(newPagination.pageSize);
            resetSelectedSales();
        },
    });
    return (
        <>
            <SaleModal onSubmit={handleSubmit} />
            <div className="overflow-hidden  rounded-xl  bg-white  dark:bg-white/[0.03]">
                <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 dark:text-gray-400">
                            Show
                        </span>
                        <div className="relative z-20 bg-transparent">
                            <select
                                className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                value={pagination.perPage}
                                onChange={(e) => {
                                    setPerPage(Number(e.target.value));
                                    setPage(1);
                                    resetSelectedSales();
                                }}
                            >
                                {[10, 20, 50, 100].map((size) => (
                                    <option
                                        key={size}
                                        value={size}
                                        className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                    >
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                                <svg
                                    className="stroke-current"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                                        stroke=""
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">
                            {' '}
                            entries{' '}
                        </span>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {selectedSales.length > 1 && (
                            <ConfirmationModal
                                triggerText={
                                    <IoTrashOutline
                                        size={30}
                                        className=" text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                                    />
                                }
                                title="Delete Sales?"
                                description={`Are you sure you want to delete this ${selectedSales.length} sales? This action cannot be undone.`}
                                confirmText="Yes, Delete"
                                cancelText="Cancel"
                                onConfirm={() => handleMultipleDelete()}
                            />
                        )}
                        <FilterPopover
                            couponValue={couponValue}
                            setCouponValue={setCouponValue}
                            purchaseValue={purchaseValue}
                            setPurchaseValue={setPurchaseValue}
                            resetSelectedSales={resetSelectedSales}
                        />
                        <div className="relative">
                            <button className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
                                <svg
                                    className="fill-current"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                                        fill=""
                                    />
                                </svg>
                            </button>

                            <input
                                type="text"
                                placeholder="Search..."
                                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                    resetSelectedSales();
                                }}
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                openModal('add');
                            }}
                        >
                            Add
                            <svg
                                className="fill-current"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 4.5C12.4142 4.5 12.75 4.83579 12.75 5.25V11.25H18.75C19.1642 11.25 19.5 11.5858 19.5 12C19.5 12.4142 19.1642 12.75 18.75 12.75H12.75V18.75C12.75 19.1642 12.4142 19.5 12 19.5C11.5858 19.5 11.25 19.1642 11.25 18.75V12.75H5.25C4.83579 12.75 4.5 12.4142 4.5 12C4.5 11.5858 4.83579 11.25 5.25 11.25H11.25V5.25C11.25 4.83579 11.5858 4.5 12 4.5Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>

                <div className="max-w-full overflow-x-auto custom-scrollbar">
                    <div>
                        <Table className=" w-full">
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableCell
                                                isHeader
                                                key={header.id}
                                                className={`px-4 py-3 border border-gray-100 dark:border-white/[0.05] ${
                                                    header.id === 'select'
                                                        ? 'w-[50px]'
                                                        : header.id ===
                                                            'actions'
                                                          ? 'w-[80px]'
                                                          : ''
                                                }`}
                                            >
                                                <div className="flex items-center justify-between cursor-pointer">
                                                    <div className="flex gap-3">
                                                        <span className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                                            {flexRender(
                                                                header.column
                                                                    .columnDef
                                                                    .header,
                                                                header.getContext()
                                                            )}
                                                        </span>
                                                    </div>
                                                    {header.id !== 'select' && (
                                                        <button className="flex flex-col gap-0.5">
                                                            <svg
                                                                className="text-gray-300 dark:text-gray-700"
                                                                width="8"
                                                                height="5"
                                                                viewBox="0 0 8 5"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                            <svg
                                                                className="text-gray-300 dark:text-gray-700"
                                                                width="8"
                                                                height="5"
                                                                viewBox="0 0 8 5"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={
                                                table.getAllColumns().length
                                            }
                                            className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap"
                                        >
                                            <span> Loading sales data...</span>
                                        </TableCell>
                                    </TableRow>
                                ) : sales.length > 0 ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className={`px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400  ${
                                                            cell.column.id !==
                                                                'items' &&
                                                            'whitespace-nowrap'
                                                        }`}
                                                    >
                                                        <span>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </span>
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={
                                                table.getAllColumns().length
                                            }
                                            className="px-4 py-4 font-normal text-center text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap"
                                        >
                                            <span>No sales data found</span>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                        <div className="pb-3 xl:pb-0">
                            <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                                Showing{' '}
                                {pagination.currentPage * pagination.perPage -
                                    pagination.perPage +
                                    1}{' '}
                                to{' '}
                                {Math.min(
                                    pagination.currentPage * pagination.perPage,
                                    pagination.totalItems
                                )}{' '}
                                of {pagination.totalItems} entries
                            </p>
                        </div>
                        <Pagination
                            currentPage={
                                table.getState().pagination.pageIndex + 1
                            }
                            totalPages={table.getPageCount()}
                            onPageChange={(page) => {
                                table.setPageIndex(page - 1);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
