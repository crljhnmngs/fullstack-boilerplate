// router/AppRouter.tsx
import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';

import { ROUTES } from '@/lib/routes';

const NotFound = lazy(() => import('@/presentation/pages/NotFound'));
const Login = lazy(() => import('@/presentation/pages/Login'));
const Register = lazy(() => import('@/presentation/pages/Register'));
const AdminDashboard = lazy(
    () => import('@/presentation/pages/AdminDashboard')
);
const ForgotPassword = lazy(
    () => import('@/presentation/pages/ForgotPassword')
);
const Calendar = lazy(() => import('@/presentation/pages/Calendar'));
const Home = lazy(() => import('@/presentation/pages/Home'));
const UserProfiles = lazy(() => import('@/presentation/pages/UserProfiles'));
const Blank = lazy(() => import('@/presentation/pages/Blank'));
const ResetPassword = lazy(() => import('@/presentation/pages/ResetPassword'));
const FormElements = lazy(() => import('@/presentation/pages/FormElements'));
const FormLayout = lazy(() => import('@/presentation/pages/FormLayout'));
const BasicTables = lazy(() => import('@/presentation/pages/BasicTables'));
const DataTables = lazy(() => import('@/presentation/pages/DataTables'));
const LineChart = lazy(() => import('@/presentation/pages/LineChart'));
const BarChart = lazy(() => import('@/presentation/pages/BarChart'));
const PieChart = lazy(() => import('@/presentation/pages/PieChart'));
const SaleManagement = lazy(
    () => import('@/presentation/pages/SaleManagement')
);
const UserManagement = lazy(
    () => import('@/presentation/pages/UserManagement')
);

import { ProtectedRoute } from '@/presentation/components/ProtectedRoute/ProtectedRoute';
import { AdminLayout } from '@/presentation/layout/AdminLayout';
import { ConfirmEmail } from '@/presentation/pages/ConfirmEmail';
import { ResendVerification } from '@/presentation/pages/ResendVerification';
import { InternalServerError } from '@/presentation/pages/InternalServerError';
import { ServiceUnavailable } from '@/presentation/pages/ServiceUnavailable';
import { Maintenance } from '@/presentation/pages/Maintenance';
import { Success } from '@/presentation/pages/Success';
import { ROLES } from '@/lib/const';
import { Forbidden } from '@/presentation/pages/Forbidden';
import { UserLayout } from '@/presentation/layout/UserLayout';
import UserLanding from '@/presentation/pages/UserLanding';
import { RoleBasedLayout } from '@/presentation/layout/RoleBasedLayout';

export const AppRouter = createBrowserRouter([
    {
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
        errorElement: <NotFound />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: ROUTES.ADMIN,
                        index: true,
                        element: <AdminDashboard />,
                    },
                    {
                        path: ROUTES.USER_MANAGEMENT,
                        element: <UserManagement />,
                    },
                    {
                        path: ROUTES.SALE_MANAGEMENT,
                        element: <SaleManagement />,
                    },
                    { path: ROUTES.CALENDAR, element: <Calendar /> },
                    { path: ROUTES.FORM_ELEMENTS, element: <FormElements /> },
                    { path: ROUTES.FORM_LAYOUT, element: <FormLayout /> },
                    { path: ROUTES.BLANK, element: <Blank /> },
                    { path: ROUTES.BASIC_TABLES, element: <BasicTables /> },
                    { path: ROUTES.DATA_TABLES, element: <DataTables /> },
                    { path: ROUTES.LINE_CHART, element: <LineChart /> },
                    { path: ROUTES.BAR_CHART, element: <BarChart /> },
                    { path: ROUTES.PIE_CHART, element: <PieChart /> },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute allowedRoles={[ROLES.USER]} />,
        errorElement: <NotFound />,
        children: [
            {
                element: <UserLayout />,
                children: [
                    {
                        path: ROUTES.USER,
                        index: true,
                        element: <UserLanding />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]} />,
        children: [
            {
                element: <RoleBasedLayout />,
                children: [{ path: ROUTES.PROFILE, element: <UserProfiles /> }],
            },
        ],
    },
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.REGISTER, element: <Register /> },
    { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
    { path: ROUTES.CONFIRM_EMAIL, element: <ConfirmEmail /> },
    { path: ROUTES.RESEND_VERIFICATION, element: <ResendVerification /> },
    {
        path: ROUTES.INTERNALSERVERERROR,
        element: <InternalServerError />,
    },
    {
        path: ROUTES.SERVICEUNAVAILABLE,
        element: <ServiceUnavailable />,
    },
    { path: ROUTES.MAINTENANCE, element: <Maintenance /> },
    { path: ROUTES.SUCCESS, element: <Success /> },
    { path: ROUTES.FORBIDDEN, element: <Forbidden /> },
    { path: '*', element: <NotFound /> },
]);
