import { Modal } from '../../ui/modal';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../Form/Input/InputField';
import { Label } from '../../Form/Label/Label';
import { useModal } from '@/presentation/hooks/modal/useModal';
import {
    useGetUserProfile,
    useUpdateUserProfile,
} from '@/presentation/hooks/user';
import { useForm } from 'react-hook-form';
import {
    UpdateProfileFormData,
    partialUpdateProfileValidation,
} from '@/presentation/validation/registerValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfileErrorStore } from '@/application/store/errorStore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DropdownPropsData } from '@/presentation/types';
import { FormDropdown } from '../../FormDropdown';
import { useLocations } from '@/presentation/hooks/useLocations';

export const UserAddressCard = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const { userProfile } = useGetUserProfile();
    const { updateUserProfile, isError } = useUpdateUserProfile();
    const { apiError, clearApiError } = useUpdateProfileErrorStore();
    const locations = useLocations();

    const [statesOrProvinces, setStatesOrProvinces] = useState<
        DropdownPropsData<string>[]
    >([]);
    const [cities, setCities] = useState<DropdownPropsData<string>[]>([]);

    const hasCountryChanged = useRef(false);
    const hasStateChanged = useRef(false);

    const {
        handleSubmit,
        formState: { errors },
        reset,
        setError,
        watch,
        setValue,
        clearErrors,
    } = useForm<Partial<UpdateProfileFormData>>({
        resolver: zodResolver(partialUpdateProfileValidation),
    });

    const countries = useMemo(() => {
        const uniqueCountries = Array.from(
            new Set(locations.map((loc) => loc.country))
        );
        return uniqueCountries.map((country) => ({
            value: country,
            label: country,
        }));
    }, [locations]);

    const selectedCountry = watch('country');
    const selectedState = watch('state');
    const selectedCity = watch('city');

    useEffect(() => {
        if (!selectedCountry) return;

        const filteredLocations = locations.filter(
            (loc) => loc.country === selectedCountry
        );
        const uniqueStates = Array.from(
            new Set(filteredLocations.map((loc) => loc.subcountry))
        );

        setStatesOrProvinces(
            uniqueStates.map((state) => ({
                value: state ?? '',
                label: state ?? '',
            }))
        );

        if (hasCountryChanged.current) {
            setValue('state', undefined);
            setValue('city', undefined);
        }
    }, [selectedCountry, locations]);

    useEffect(() => {
        if (!selectedCountry || !selectedState) return;

        const filteredCities = locations
            .filter(
                (loc) =>
                    loc.country === selectedCountry &&
                    loc.subcountry === selectedState
            )
            .map((loc) => ({
                value: loc.name,
                label: loc.name,
            }));

        setCities(filteredCities);

        if (hasStateChanged.current) {
            setValue('city', undefined);
        }
    }, [selectedCountry, selectedState, locations]);

    useEffect(() => {
        if (userProfile?.data) {
            reset({
                country: userProfile.data.country,
                state: userProfile.data.state,
                city: userProfile.data.city,
            });

            hasCountryChanged.current = false;
            hasStateChanged.current = false;
        }
    }, [userProfile?.data]);

    const handleSave = async (data: Partial<UpdateProfileFormData>) => {
        if (statesOrProvinces.length && !data.state) {
            setError('state', {
                type: 'manual',
                message: 'State/Province is required',
            });
            return;
        }

        if (cities.length && !data.city) {
            setError('city', {
                type: 'manual',
                message: 'City is required',
            });
            return;
        }

        await updateUserProfile(data);

        if (!isError) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isError && apiError) {
            if (Array.isArray(apiError)) {
                apiError.forEach((err) => {
                    setError(err.field as keyof UpdateProfileFormData, {
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

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Address
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Country
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {userProfile?.data?.country}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    State/Province
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {userProfile?.data?.state}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    City
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {userProfile?.data?.city}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Postal Code
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    6015
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
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    reset();
                    closeModal();
                }}
                className="max-w-[700px] m-4"
            >
                <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Edit Address
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Update your details to keep your profile up-to-date.
                        </p>
                    </div>
                    <form
                        className="flex flex-col pt-2"
                        onSubmit={handleSubmit(handleSave)}
                    >
                        <div className="px-2 overflow-y-auto custom-scrollbar pt-3">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div>
                                    <FormDropdown
                                        label="Country"
                                        data={countries}
                                        value={selectedCountry}
                                        defaultText="Country"
                                        search={true}
                                        searchPlaceholder="Search country"
                                        searchEmptyText="No country found"
                                        setValue={(value) => {
                                            setValue(
                                                'country',
                                                value as string
                                            );
                                            clearErrors('country');
                                            hasCountryChanged.current = true;
                                        }}
                                        classNames={{
                                            button: 'h-11.5 text-sm font-normal dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 disabled:text-gray-500 disabled:border-gray-300 disabled:opacity-40 disabled:bg-gray-100 disabled:cursor-not-allowed',
                                            content: 'z-99999',
                                            label: 'text-sm font-medium text-gray-700 dark:text-gray-400',
                                        }}
                                        error={errors?.country?.message}
                                    />
                                </div>

                                <div>
                                    <FormDropdown
                                        label="State/Province"
                                        data={statesOrProvinces}
                                        value={selectedState}
                                        defaultText={
                                            selectedCountry
                                                ? 'State/Province'
                                                : 'Select country first'
                                        }
                                        search={true}
                                        searchPlaceholder="Search state/province"
                                        searchEmptyText="No state/province found"
                                        setValue={(value) => {
                                            setValue('state', value as string);
                                            clearErrors('state');
                                            hasStateChanged.current = true;
                                        }}
                                        classNames={{
                                            button: 'h-11.5 text-sm font-normal dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 disabled:text-gray-500 disabled:border-gray-300 disabled:opacity-40 disabled:bg-gray-100 disabled:cursor-not-allowed',
                                            content: 'z-99999',
                                            label: 'text-sm font-medium text-gray-700 dark:text-gray-400',
                                        }}
                                        error={errors?.state?.message}
                                        disable={selectedCountry ? false : true}
                                    />
                                </div>

                                <div>
                                    <FormDropdown
                                        label="City"
                                        data={cities}
                                        value={selectedCity}
                                        defaultText={
                                            selectedState
                                                ? 'City'
                                                : 'Select State/Province first'
                                        }
                                        search={true}
                                        searchPlaceholder="Search city"
                                        searchEmptyText="No city found"
                                        setValue={(value) => {
                                            setValue('city', value as string);
                                            clearErrors('city');
                                        }}
                                        classNames={{
                                            button: 'h-11.5 text-sm font-normal dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 disabled:text-gray-500 disabled:border-gray-300 disabled:opacity-40 disabled:bg-gray-100 disabled:cursor-not-allowed',
                                            content: 'z-99999',
                                            label: 'text-sm font-medium text-gray-700 dark:text-gray-400',
                                        }}
                                        error={errors?.city?.message}
                                        disable={selectedState ? false : true}
                                    />
                                </div>
                                <div>
                                    <Label>Postal Code</Label>
                                    <Input type="text" value="6015" />
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
                            <Button size="sm" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};
