import { Outlet } from 'react-router';
import { UserHeader } from './UserHeader';

export const UserLayout = () => {
    return (
        <div className="min-h-screen xl:flex">
            <div className={'flex-1'}>
                <UserHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 dark:bg-gray-900">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
