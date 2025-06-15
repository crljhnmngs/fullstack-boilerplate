import { useState } from 'react';
import { isEmailVerifiedData, RolesData } from '@/lib/const';
import { Dropdown } from '../../Dropdown';

export const FilterPopover = ({
    role,
    setRole,
    isEmailVerified,
    setIsEmailVerified,
}: {
    role: string | undefined;
    setRole: React.Dispatch<React.SetStateAction<string | undefined>>;
    isEmailVerified: boolean | undefined;
    setIsEmailVerified: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative ">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
                <svg
                    className="stroke-current fill-white dark:fill-gray-800"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2.29004 5.90393H17.7067"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M17.7075 14.0961H2.29085"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                        fill=""
                        stroke=""
                        strokeWidth="1.5"
                    />
                    <path
                        d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                        fill=""
                        stroke=""
                        strokeWidth="1.5"
                    />
                </svg>
                Filter
            </button>

            {open && (
                <div className="absolute z-20 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex flex-col gap-4">
                        <Dropdown
                            data={isEmailVerifiedData}
                            value={isEmailVerified}
                            setValue={(value) => {
                                setIsEmailVerified(value);
                            }}
                            defaultText="Select Email Verified..."
                            contentWith="230px"
                        />
                        <Dropdown
                            data={RolesData}
                            value={role}
                            setValue={(value) => {
                                setRole(value);
                            }}
                            defaultText="Select Role..."
                            contentWith="230px"
                        />
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                            <button
                                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors dark:text-red-400"
                                onClick={() => {
                                    setIsEmailVerified(undefined);
                                    setRole(undefined);
                                    setOpen(false);
                                }}
                            >
                                Clear Filters
                            </button>
                            <button
                                className="text-sm font-medium text-brand-600 dartext-brand-700 hover:text-brand-700 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
