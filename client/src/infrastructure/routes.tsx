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

export const AppRouter = () => {
    const { user, accessToken } = useAuthStore();
    const { refresh } = useRefreshToken();

    useEffect(() => {
        const shouldRefresh =
            isAuthenticated() &&
            (user.email === '' || user.name === '' || accessToken === '');

        if (shouldRefresh) {
            refresh();
        }
    }, [user, accessToken]);

    return (
        <Routes>
            {isAuthenticated() ? (
                <Route index element={<Dashboard />} />
            ) : (
                <Route index element={<Home />} />
            )}
            <Route path="sales" element={<Sales />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
