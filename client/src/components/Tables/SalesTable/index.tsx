import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';
import { Sale, Item } from '../../../store/sales/types';
import { capitalizeFirstLetter, formatDate } from '../../../lib/utils';
import { SalesTableProps } from '@/types/global';
import { useMemo } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export function SalesTable({
    sales,
    isLoading,
    pagination,
    setPage,
    setPerPage,
}: SalesTableProps) {
    const columns: ColumnDef<Sale>[] = useMemo(
        () => [
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
        ],
        []
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
        },
    });

    return (
        <div className="w-full border border-gray-300 rounded-lg shadow-sm">
            <div className="max-h-[700px] overflow-auto">
                <table className="table-fixed w-full">
                    <thead className="sticky top-0 bg-white shadow">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-2 text-center h-16"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-6 text-center text-gray-500"
                                >
                                    Loading sales data...
                                </td>
                            </tr>
                        ) : sales.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-gray-300">
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className={`px-4 py-2 border-b border-gray-300 ${cell.column.id === 'items' ? 'text-left' : 'text-center'}`}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-6 text-center text-gray-500 border-b border-gray-300"
                                >
                                    No sales data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="w-full pt-2 flex justify-end pb-2 pr-4">
                <div className="flex items-center gap-4">
                    <div>
                        <label htmlFor="select" className="pr-2">
                            Rows per page:
                        </label>
                        <select
                            className="focus:outline-none"
                            value={pagination.perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            {[10, 20, 50, 100].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="h-10 flex items-center px-2">
                        <span className="text-gray-600 font-semibold">
                            {pagination.currentPage * pagination.perPage -
                                pagination.perPage +
                                1}{' '}
                            -
                            {Math.min(
                                pagination.currentPage * pagination.perPage,
                                pagination.totalItems
                            )}
                        </span>
                        <span className="text-gray-600 pl-2">
                            of {pagination.totalItems}
                        </span>
                        <div className="flex space-x-2 pl-3">
                            <button
                                className={`cursor-pointer ${pagination.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <IoChevronBack size={20} />
                            </button>
                            <button
                                className={`cursor-pointer ${pagination.currentPage === pagination.totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <IoChevronForward size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
