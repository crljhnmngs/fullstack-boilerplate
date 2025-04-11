import { Routes, Route } from 'react-router';
import Home from '../presentation/pages/Home';
import { Sales } from '../presentation/pages/Sales';
import { NotFound } from '../presentation/pages/NotFound';
import { Login } from '@/presentation/pages/Login';
import { Register } from '@/presentation/pages/Register';

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="sales" element={<Sales />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
