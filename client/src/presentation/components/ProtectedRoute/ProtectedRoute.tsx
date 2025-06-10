import { isAuthenticated } from '@/infrastructure/authStorage';
import { ROUTES } from '@/lib/routes';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
    return isAuthenticated() ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.LOGIN} replace />
    );
};
