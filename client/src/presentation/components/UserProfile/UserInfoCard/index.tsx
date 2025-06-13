import { Modal } from '../../ui/modal';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../Form/Input/InputField';
import { Label } from '../../Form/Label/Label';
import { useAuthStore } from '@/application/store/authStore';
import {
    useGetUserProfile,
    useUpdateUserProfile,
} from '@/presentation/hooks/user';
import { useModal } from '@/presentation/hooks/modal/useModal';
import { useForm } from 'react-hook-form';
import {
    UpdateProfileFormData,
    partialUpdateProfileValidation,
} from '@/presentation/validation/registerValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../FormInput';
import { useUpdateProfileErrorStore } from '@/application/store/errorStore';
import { useEffect } from 'react';

export const UserInfoCard = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const { user } = useAuthStore();
    const { userProfile } = useGetUserProfile();
    const { updateUserProfile, isError } = useUpdateUserProfile();
    const { apiError, clearApiError } = useUpdateProfileErrorStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        setError,
    } = useForm<Partial<UpdateProfileFormData>>({
        resolver: zodResolver(partialUpdateProfileValidation),
        defaultValues: {
            firstname: user.firstname,
            middlename: user.middlename,
            lastname: user.lastname,
            email: user.email,
            phone: '',
        },
    });

    const handleSave = async (data: Partial<UpdateProfileFormData>) => {
        await updateUserProfile(data);

        if (!isError) {
            closeModal();
        }
    };

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
                setError(apiError.field as keyof UpdateProfileFormData, {
                    type: 'manual',
                    message: apiError.message,
                });
            }
            clearApiError();
        }
    }, [isError, apiError]);

    useEffect(() => {
        if (user || userProfile?.data) {
            reset({
                firstname: user.firstname,
                middlename: user.middlename,
                lastname: user.lastname,
                email: user.email,
                phone: userProfile?.data?.phone,
            });
        }
    }, [user, userProfile?.data]);
    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        Personal Information
                    </h4>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                First Name
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                {user.firstname}
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Middle Name
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                {user.middlename}
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Last Name
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                {user.lastname}
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Email address
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                {user.email}
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Phone
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                {userProfile?.data?.phone}
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Bio
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                Team Manager
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={openModal}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                    <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                            fill=""
                        />
                    </svg>
                    Edit
                </button>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    reset();
                    closeModal();
                }}
                className="max-w-[700px] m-4"
            >
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Edit Personal Information
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Update your details to keep your profile up-to-date.
                        </p>
                    </div>
                    <form
                        className="flex flex-col"
                        onSubmit={handleSubmit(handleSave)}
                    >
                        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                            <div>
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Social Links
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div>
                                        <Label>Facebook</Label>
                                        <Input
                                            type="text"
                                            value="https://www.facebook.com/Test"
                                        />
                                    </div>

                                    <div>
                                        <Label>X.com</Label>
                                        <Input
                                            type="text"
                                            value="https://x.com/Test"
                                        />
                                    </div>

                                    <div>
                                        <Label>Linkedin</Label>
                                        <Input
                                            type="text"
                                            value="https://www.linkedin.com/Test"
                                        />
                                    </div>

                                    <div>
                                        <Label>Instagram</Label>
                                        <Input
                                            type="text"
                                            value="https://instagram.com/Test"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Personal Information
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <FormInput
                                            name="firstname"
                                            type="text"
                                            label="First Name"
                                            register={register}
                                            error={errors?.firstname?.message}
                                            classNames={{
                                                label: 'text-sm font-medium text-gray-700 dark:text-gray-400',
                                                input: 'h-11 text-gray-800 dark:text-white/90 dark:focus:border-brand-800 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800',
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <FormInput
                                            name="middlename"
                                            type="text"
                                            label="Middle Name"
                                            register={register}
                                            error={errors?.middlename?.message}
                                            classNames={{
                                                label: 'text-sm font-medium text-gray-700 dark:text-gray-400',
                                                input: 'h-11 text-gray-800 dark:text-white/90 dark:focus:border-brand-800 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800',
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <FormInput
                                            name="lastname"
                                            type="text"
                                            label="Last Name"
                                            register={register}
                                            error={errors?.lastname?.message}
                                            classNames={{
                                                label: 'text-sm font-medium text-gray-700 dark:text-gray-400',
                                                input: 'h-11 text-gray-800 dark:text-white/90 dark:focus:border-brand-800 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800',
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <FormInput
                                            name="email"
                                            type="text"
                                            label="Email Address"
                                            register={register}
                                            error={errors?.email?.message}
                                            disabled
                                            classNames={{
                                                label: 'text-sm font-medium text-gray-700 dark:text-gray-400',
                                                input: 'h-11 text-gray-800 disabled:text-gray-500 disabled:border-gray-300 disabled:opacity-40 disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40',
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <FormInput
                                            name="phone"
                                            type="text"
                                            label="Phone"
                                            register={register}
                                            error={errors?.phone?.message}
                                            classNames={{
                                                label: 'text-sm font-medium text-gray-700 dark:text-gray-400',
                                                input: 'h-11 text-gray-800 dark:text-white/90 dark:focus:border-brand-800 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800',
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label>Bio</Label>
                                        <Input
                                            type="text"
                                            value="Team Manager"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    reset();
                                    closeModal();
                                }}
                            >
                                Close
                            </Button>
                            <Button size="sm" disabled={!isDirty} type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
