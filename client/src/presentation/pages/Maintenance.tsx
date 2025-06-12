import { PageMeta } from '../components/PageMeta';
import { GridShape } from '../components/Common/GridShape';
import { MaintenanceIcon } from '../assets/icons';

export const Maintenance = () => {
    return (
        <>
            <PageMeta title="Maintenance" description="Maintenance" />
            <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 dark:bg-gray-900">
                <GridShape />
                <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                    <img
                        src={MaintenanceIcon}
                        alt="Maintenance"
                        className="dark:hidden ml-40 mb-10"
                    />
                    <img
                        src={MaintenanceIcon}
                        alt="Maintenance"
                        className="hidden dark:block ml-40 mb-10"
                    />
                    <h1 className="mb-8 font-bold text-gray-800 text-md dark:text-white/90 xl:text-7xl">
                        MAINTENANCE
                    </h1>

                    <p className="mt-4 text-gray-800 mt-10 mb-7 dark:text-white/90">
                        Our Site is Currently under maintenance We will be back
                        Shortly Thank You For Patience
                    </p>
                </div>

                <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} - Fullstack Boilerplate
                </p>
            </div>
        </>
    );
};
