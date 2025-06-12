import { useNavigate } from 'react-router';
import { PageMeta } from '../components/PageMeta';
import { GridShape } from '../components/Common/GridShape';
import { Error403 } from '../assets/icons';
import { ROUTES } from '@/lib/routes';

export const Forbidden = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(ROUTES.HOME);
        }
    };

    return (
        <>
            <PageMeta title="Error 403" description="Error 403 - Forbidden" />
            <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 dark:bg-gray-900">
                <GridShape />
                <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                    <h1 className="mb-8 font-bold text-gray-800 text-md dark:text-white/90 xl:text-7xl">
                        ERROR
                    </h1>

                    <img src={Error403} alt="403" className="dark:hidden" />
                    <img
                        src={Error403}
                        alt="403"
                        className="hidden dark:block"
                    />

                    <p className="mt-4 text-gray-800 mt-10 mb-7 dark:text-white/90">
                        Access denied. You don’t have permission to view this
                        page.
                    </p>

                    <h3
                        onClick={handleGoBack}
                        className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                    >
                        Back
                    </h3>
                </div>

                <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} - Fullstack Boilerplate
                </p>
            </div>
        </>
    );
};
