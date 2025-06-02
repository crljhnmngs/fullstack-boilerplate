import { useForm } from 'react-hook-form';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/ui/button';
import { ROUTES } from '@/lib/routes';
import { NavLink } from 'react-router';

export const ResetPassword = () => {
    const { register, handleSubmit } = useForm();

    const handleResetPassword = () => {};
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Set New Password
                </h1>

                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your new password below.
                </p>

                <form
                    onSubmit={handleSubmit(handleResetPassword)}
                    className="flex flex-col gap-4"
                >
                    <FormInput
                        name="password"
                        type="password"
                        placeholder="New password"
                        register={register}
                        // error={errors?.password?.message}
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        register={register}
                        // error={errors?.confirmPassword?.message}
                    />

                    <Button type="submit" className="w-full text-base h-11">
                        Reset Password
                    </Button>
                </form>
                <p className="text-sm text-center mt-4">
                    Back to&nbsp;
                    <NavLink
                        to={ROUTES.LOGIN}
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
