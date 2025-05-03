import { Routes, Route } from 'react-router';
import Home from '../presentation/pages/Home';
import { Sales } from '../presentation/pages/Sales';
import { NotFound } from '../presentation/pages/NotFound';
import { Login } from '@/presentation/pages/Login';
import { Register } from '@/presentation/pages/Register';
import { isAuthenticated } from './authStorage';
import { Dashboard } from '@/presentation/pages/Dashboard';
import { useAuthStore } from '@/application/store/authStore';

export const AppRouter = () => {
    const { user, accessToken } = useAuthStore();
    if (
        isAuthenticated() &&
        (user.id === '' ||
            user.email === '' ||
            user.name === '' ||
            accessToken === '')
    ) {
        console.log('CALL REFRESH');
    }
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
