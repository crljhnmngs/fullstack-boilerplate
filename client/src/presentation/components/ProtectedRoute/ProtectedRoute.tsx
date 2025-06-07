import { isAuthenticated } from '@/infrastructure/authStorage';
import { ROUTES } from '@/lib/routes';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated() ? (
        children
    ) : (
        <Navigate to={ROUTES.LOGIN} replace />
    );
};
