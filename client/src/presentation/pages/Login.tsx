import { useForm } from 'react-hook-form';
import { FormInput } from '../components/FormInput';
import { Header } from '../components/Header';
import { LoginFormData, loginValidation } from '../validation/loginValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/button';
import { NavLink } from 'react-router';

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = () => {
        //Cal auth API here
    };

    return (
        <div className="h-screen w-screen overflow-hidden">
            <Header />
            <div className="h-[90%] flex justify-center items-center">
                <div className="w-[35rem] h-[30rem] bg-white shadow-lg rounded-2xl p-14 border border-gray-200">
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
                                to="/register"
                                end
                            >
                                Create an account
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
