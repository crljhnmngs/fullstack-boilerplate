import { useAuthStore } from '@/application/store/authStore';
import { ROLES } from '@/lib/const';
import { AdminLayout } from './AdminLayout';
import { UserLayout } from './UserLayout';
import { Navigate } from 'react-router';
import { ROUTES } from '@/lib/routes';

export const RoleBasedLayout = () => {
    const { user } = useAuthStore();

    switch (user.role) {
        case ROLES.ADMIN:
            return <AdminLayout />;
        case ROLES.USER:
            return <UserLayout />;
        default:
            return <Navigate to={ROUTES.FORBIDDEN} replace />;
    }
};
