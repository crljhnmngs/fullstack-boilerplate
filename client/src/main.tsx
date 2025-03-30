import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { AppRouter } from './infrastructure/routes.tsx';
import { Toaster } from 'react-hot-toast';
import { GlobalLoader } from '@/presentation/components/Loader';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <BrowserRouter>
                <AppRouter />
                <Toaster />
                <GlobalLoader />
            </BrowserRouter>
        </StrictMode>
    </QueryClientProvider>
);
