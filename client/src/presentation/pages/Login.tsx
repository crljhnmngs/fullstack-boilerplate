import { useForm } from 'react-hook-form';
import { FormInput } from '../components/FormInput';
import { Header } from '../components/Header';
import { LoginFormData, loginValidation } from '../validation/loginValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/button';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { useLoginUser } from '../hooks/auth';
import { LoginParams } from '../types';
import { useLoginErrorStore } from '@/application/store/errorStore';
import { useEffect } from 'react';
import { ROUTES } from '@/lib/routes';
import { AlertIcon, showAlert } from '@/lib/utils';
import { PageMeta } from '../components/PageMeta';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { userLogin, isError } = useLoginUser();
    const { apiError, clearApiError } = useLoginErrorStore();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data: LoginParams) => {
        userLogin(data);
    };

    useEffect(() => {
        if (location.state?.showError) {
            showAlert({
                title: 'Something Went Wrong',
                text: 'Please login again.',
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            setTimeout(() => {
                navigate(location.pathname, { replace: true });
            }, 3100);
        }
    }, []);
    useEffect(() => {
        if (isError && apiError) {
            if (Array.isArray(apiError)) {
                apiError.forEach((err) => {
                    setError(err.field, {
                        type: 'manual',
                        message: err.message,
                    });
                });
            } else if ('field' in apiError && 'message' in apiError) {
                setError(apiError.field as keyof LoginFormData, {
                    type: 'manual',
                    message: apiError.message,
                });
            }
            clearApiError();
        }
    }, [isError, apiError]);

    return (
        <>
            <PageMeta
                title="Login Page"
                description="Securely access your account"
            />
            <div className="h-screen w-screen overflow-hidden">
                <Header />
                <div className="h-[90%] flex justify-center items-center">
                    <div className="w-[35rem] h-auto bg-white shadow-lg rounded-2xl p-14 border border-gray-200">
                        <div className="pt-7 h-[10%]">
                            <h1 className="font-bold text-3xl">Login</h1>
                        </div>
                        <form
                            onSubmit={handleSubmit(handleLogin)}
                            className="h-[90%] pt-10 flex flex-col gap-2"
                        >
                            <FormInput
                                name="email"
                                type="email"
                                placeholder="Email"
                                register={register}
                                error={errors?.email?.message}
                                className="h-15"
                            />
                            <FormInput
                                name="password"
                                type="password"
                                placeholder="Password"
                                register={register}
                                error={errors?.password?.message}
                                className="h-15"
                            />
                            <div className="w-full text-right mb-4">
                                <NavLink
                                    to={ROUTES.FORGOT_PASSWORD}
                                    className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                                >
                                    Forgot Password?
                                </NavLink>
                            </div>
                            <Button
                                type="submit"
                                className="cursor-pointer w-full h-15 text-xl"
                            >
                                Login
                            </Button>
                            <div className="flex pt-3 w-full justify-center gap-1">
                                <p className="text-lg">Not registered?</p>
                                <NavLink
                                    className="text-lg cursor-pointer text-blue-600 hover:text-blue-800"
                                    to={ROUTES.REGISTER}
                                    end
                                >
                                    Create an account
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
