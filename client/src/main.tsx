import { Suspense } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { AppRouter } from './infrastructure/routes';
import { GlobalLoader } from '@/presentation/components/Loader';
import 'sweetalert2/src/sweetalert2.scss';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './presentation/context/ThemeContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <HelmetProvider>
                <Suspense fallback={<GlobalLoader />}>
                    <ThemeProvider>
                        <RouterProvider router={AppRouter} />
                    </ThemeProvider>
                </Suspense>
                <GlobalLoader />
            </HelmetProvider>
        </StrictMode>
    </QueryClientProvider>
);
