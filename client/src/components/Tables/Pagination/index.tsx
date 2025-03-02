import { PaginationControlsProps } from '@/types/global';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export function PaginationControls({
    perPage,
    setPerPage,
    startItem,
    endItem,
    totalItems,
    page,
    totalPages,
    handlePrevious,
    handleNext,
}: PaginationControlsProps) {
    return (
        <div className="w-full pt-2 flex justify-end">
            <div className="flex items-center justify-center gap-2">
                <select
                    className="px-4 py-2 border rounded-md h-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                </select>
                <div className="h-10 flex items-center justify-between border rounded-md px-2">
                    <span className="text-gray-600 font-semibold">
                        {startItem}-{endItem}
                    </span>
                    <span className="text-gray-600 pl-2">of {totalItems}</span>
                    <div className="flex space-x-2 pl-3">
                        <button
                            className={`cursor-pointer ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handlePrevious}
                            disabled={page === 1}
                        >
                            <IoChevronBack size={20} />
                        </button>
                        <button
                            className={`cursor-pointer ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleNext}
                            disabled={page === totalPages}
                        >
                            <IoChevronForward size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
