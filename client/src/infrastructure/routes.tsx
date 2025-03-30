import { Routes, Route } from 'react-router';
import Home from '../presentation/pages/Home';
import { Sales } from '../presentation/pages/Sales';
import { NotFound } from '../presentation/pages/NotFound';

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="sales" element={<Sales />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
