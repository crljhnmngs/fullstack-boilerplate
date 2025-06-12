import { useAuthStore } from '@/application/store/authStore';
import { UserData } from '@/application/types';
import { isAuthenticated } from '@/infrastructure/authStorage';
import { ROUTES } from '@/lib/routes';
import { useRefreshToken } from '@/presentation/hooks/auth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useLocation } from 'react-router';

type ProtectedRouteProps = {
    allowedRoles: string[];
};

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user, clearAuth } = useAuthStore();
    const { refreshToken, isLoading } = useRefreshToken();
    const [checked, setChecked] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const location = useLocation();

    const isValidUser = (user: UserData) => {
        return !!user && !!user.role && allowedRoles.includes(user.role);
    };

    useEffect(() => {
        const tryRefresh = async () => {
            if (isAuthenticated() && !isValidUser(user)) {
                try {
                    const res = await refreshToken();
                    const refreshedUser = res?.data?.user;
                    if (
                        refreshedUser &&
                        allowedRoles.includes(refreshedUser.role)
                    ) {
                        setHasAccess(true);
                    } else {
                        setHasAccess(false);
                    }
                } catch (err) {
                    console.error('Refresh failed:', err);
                    clearAuth();
                    setHasAccess(false);
                }
            } else {
                setHasAccess(isValidUser(user));
            }

            setChecked(true);
        };

        tryRefresh();
    }, [location.pathname]);

    if (!checked || isLoading) return null;

    if (!isAuthenticated()) return <Navigate to={ROUTES.LOGIN} replace />;
    if (!hasAccess) return <Navigate to={ROUTES.FORBIDDEN} replace />;

    return <Outlet />;
};
