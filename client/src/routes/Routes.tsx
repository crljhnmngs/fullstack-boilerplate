import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import { Sales } from '../pages/Sales';

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="sales" element={<Sales />} />
        </Routes>
    );
};
