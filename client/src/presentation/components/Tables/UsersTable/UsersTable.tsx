import { useMemo, useState } from 'react';
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
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    SortingState,
} from '@tanstack/react-table';

import { Pagination } from '../Pagination';
import { calculateAge, capitalizeFirstLetter } from '@/lib/utils';
import { useGetAllUsers } from '@/presentation/hooks/user';
import { UserWithProfile } from '@/domain/types/api';
import { AvatarText } from '../../ui/avatar-text';
import { Badge } from '../../ui/badge';
import { FilterPopover } from './FilterPopover';

export const UsersTable = () => {
    const {
        users,
        isLoading,
        pagination,
        setPage,
        setPerPage,
        searchInput,
        setSearchInput,
        role,
        setRole,
        isEmailVerified,
        setIsEmailVerified,
    } = useGetAllUsers();

    const [sorting, setSorting] = useState<SortingState>([]);

    const columns: ColumnDef<UserWithProfile>[] = useMemo(
        () => [
            {
                header: 'User',
                accessorFn: (row) =>
                    `${row.firstname} ${row.middlename || ''} ${row.lastname}`.trim(),
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        {row.original.profile?.profileImage ? (
                            <img
                                src={row.original.profile?.profileImage}
                                alt="Profile"
                                className="size-10 rounded-full object-cover"
                            />
                        ) : (
                            <AvatarText
                                name={
                                    row.original.firstname +
                                    ' ' +
                                    row.original.lastname
                                }
                                classNames={{
                                    div: 'size-10',
                                }}
                            />
                        )}

                        <span>
                            {row.original.firstname}{' '}
                            {row.original.middlename ?? ''}{' '}
                            {row.original.lastname}
                        </span>
                    </div>
                ),
            },
            {
                header: 'Role',
                accessorKey: 'role',
                cell: ({ getValue }) => {
                    return (
                        <Badge
                            size="sm"
                            color={
                                getValue() === 'admin' ? 'success' : 'primary'
                            }
                        >
                            {capitalizeFirstLetter(getValue() as string)}
                        </Badge>
                    );
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Location',
                accessorFn: (row) =>
                    `${row.profile?.country || ''}, ${row.profile?.state || ''}, ${row.profile?.city || ''}`,
            },
            {
                header: 'Phone',
                accessorFn: (row) => row.profile?.phone || '',
            },
            {
                header: 'Age',
                accessorKey: 'age',
                accessorFn: (row) =>
                    calculateAge(new Date(row.profile?.birthdate)),
            },
            {
                header: 'Email Verified',
                accessorKey: 'isEmailVerified',
                cell: ({ getValue }) => {
                    return (
                        <Badge
                            size="sm"
                            color={getValue() ? 'success' : 'warning'}
                        >
                            {getValue() ? 'Yes' : 'No'}
                        </Badge>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: users,
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
            sorting,
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
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <>
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
                        <FilterPopover
                            role={role}
                            setRole={setRole}
                            isEmailVerified={isEmailVerified}
                            setIsEmailVerified={setIsEmailVerified}
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
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-full overflow-x-auto custom-scrollbar">
                    <div>
                        <Table className="w-full">
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableCell
                                                isHeader
                                                key={header.id}
                                                className={`px-4 py-3 border border-gray-100 dark:border-white/[0.05] ${header.id === 'role' || header.id === 'age' ? 'min-w-24' : ''}`}
                                            >
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
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
                                                    {header.id !== 'select' &&
                                                        header.id !==
                                                            'actions' && (
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
                                            <span> Loading users data...</span>
                                        </TableCell>
                                    </TableRow>
                                ) : users.length > 0 ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className={`px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400  ${
                                                            cell.column.id ===
                                                            'Location'
                                                                ? ''
                                                                : cell.column
                                                                        .id ===
                                                                        'age' ||
                                                                    cell.column
                                                                        .id ===
                                                                        'role' ||
                                                                    cell.column
                                                                        .id ===
                                                                        'isEmailVerified'
                                                                  ? 'text-center'
                                                                  : 'whitespace-nowrap'
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
                                            <span>No users data found</span>
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
