import { Header } from '../components/Header';
import { useSales } from '../hooks/Sales/useSales';
import { SalesTable } from '../components/Tables/SalesTable';
import { PaginationControls } from '../components/Tables/Pagination';

export const Sales = () => {
    const {
        sales,
        isLoading,
        pagination,
        startItem,
        endItem,
        perPage,
        setPerPage,
        page,
        searchInput,
        setSearchInput,
        handlePrevious,
        handleNext,
    } = useSales();

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Header />
            <div className="flex justify-center w-full items-center pt-20 pb-24 flex-col">
                <div>
                    <div className="w-full flex justify-end mb-2 ">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <SalesTable sales={sales} isLoading={isLoading} />
                    <PaginationControls
                        {...{
                            perPage,
                            setPerPage,
                            startItem,
                            endItem,
                            totalItems: pagination.totalItems,
                            page,
                            totalPages: pagination.totalPages,
                            handlePrevious,
                            handleNext,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
