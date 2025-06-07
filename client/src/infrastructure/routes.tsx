import { Routes, Route } from 'react-router';
import Home from '../presentation/pages/Home';
import { Sales } from '../presentation/pages/Sales';
import { NotFound } from '../presentation/pages/NotFound';
import { Login } from '@/presentation/pages/Login';
import { Register } from '@/presentation/pages/Register';
import { isAuthenticated } from './authStorage';
import { Dashboard } from '@/presentation/pages/Dashboard';
import { useAuthStore } from '@/application/store/authStore';
import { useRefreshToken } from '@/presentation/hooks/auth';
import { useEffect } from 'react';
import { ConfirmEmail } from '@/presentation/pages/ConfirmEmail';
import { ResendVerification } from '@/presentation/pages/ResendVerification';
import { ForgotPassword } from '@/presentation/pages/ForgotPassword';
import { ROUTES } from '@/lib/routes';
import { ResetPassword } from '@/presentation/pages/ResetPassword';
import { ProtectedRoute } from '@/presentation/components/ProtectedRoute/ProtectedRoute';

export const AppRouter = () => {
    const { user, accessToken } = useAuthStore();
    const { refreshToken } = useRefreshToken();

    useEffect(() => {
        const shouldRefresh =
            isAuthenticated() &&
            (user.email === '' || user.name === '' || accessToken === '');

        if (shouldRefresh) {
            refreshToken();
        }
    }, [user, accessToken, refreshToken]);

    return (
        <Routes>
            <Route index path={ROUTES.HOME} element={<Home />} />
            <Route
                path={ROUTES.DASHBOARD}
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route path={ROUTES.SALES} element={<Sales />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.CONFIRM_EMAIL} element={<ConfirmEmail />} />
            <Route
                path={ROUTES.RESEND_VERIFICATION}
                element={<ResendVerification />}
            />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        </Routes>
    );
};
