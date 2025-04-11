import { useForm, useWatch, Controller } from 'react-hook-form';
import { Header } from '../components/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    RegisterFormData,
    registerValidation,
} from '../validation/registerValidation';
import { Button } from '../components/ui/button';
import { FormInput } from '../components/FormInput';
import { DateTimePicker } from '../components/DateTimePicker';
import { useEffect, useMemo, useState } from 'react';
import defaultImage from '../assets/images/defaultImage.png';
import locationsData from '../../presentation/assets/data/world-cities.json';
import { FormDropdown } from '../components/FormDropdown';
import { DropdownPropsData } from '../types';
import { transformRegisterData } from '@/lib/utils';

export const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerValidation),
        defaultValues: {
            firstname: '',
            lastname: '',
            middlename: '',
            email: '',
            password: '',
            profileImage: undefined,
        },
    });

    const locations = useMemo(() => locationsData, []);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [statesOrProvinces, setStatesOrProvinces] = useState<
        DropdownPropsData<string>[]
    >([]);
    const [cities, setCities] = useState<DropdownPropsData<string>[]>([]);

    const profileImageFile = useWatch({
        control,
        name: 'profileImage',
    });

    const countries = useMemo(() => {
        const uniqueCountries = new Set(
            locations.map((location) => location.country)
        );
        return Array.from(uniqueCountries).map((country) => ({
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
            (location) => location.country === selectedCountry
        );

        const uniqueStates = new Set(
            filteredLocations.map((location) => location.subcountry)
        );

        setStatesOrProvinces(
            Array.from(uniqueStates).map((state) => ({
                value: state ?? '',
                label: state ?? '',
            }))
        );
        if (selectedState) {
            setValue('state', undefined);
        }

        if (selectedCity) {
            setValue('city', undefined);
        }
    }, [selectedCountry, locations]);

    useEffect(() => {
        if (!selectedCountry || !selectedState) return;

        const filteredCities = locationsData
            .filter(
                (location) =>
                    location.country === selectedCountry &&
                    location.subcountry === selectedState
            )
            .map((location) => ({
                value: location.name,
                label: location.name,
            }));

        setCities(filteredCities);

        if (selectedCity) {
            setValue('city', undefined);
        }
    }, [selectedCountry, selectedState]);

    useEffect(() => {
        if (profileImageFile?.[0]) {
            const url = URL.createObjectURL(profileImageFile[0]);
            setImagePreview(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [profileImageFile]);

    const handleRegister = (data: RegisterFormData) => {
        if (
            statesOrProvinces.length !== 0 &&
            (data.state === '' || data.state === undefined)
        ) {
            setError('state', {
                type: 'manual',
                message: 'State/Province is required',
            });
            return;
        }

        if (
            cities.length !== 0 &&
            (data.city === '' || data.city === undefined)
        ) {
            setError('city', {
                type: 'manual',
                message: 'City is required',
            });
            return;
        }

        //TODO: Call User register API
        console.log(transformRegisterData(data));
    };

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Header />
            <div className="h-auto flex justify-center items-center pb-5">
                <div className="w-[50rem] h-auto mt-10 bg-white shadow-lg rounded-2xl p-14 border border-gray-200">
                    <div className="h-[10%]">
                        <h1 className="font-bold text-3xl">Register</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className="h-[90%] pt-4 flex flex-col gap-2"
                    >
                        <div className="flex gap-2">
                            <FormInput
                                name="firstname"
                                type="text"
                                placeholder="First Name"
                                register={register}
                                error={errors?.firstname?.message}
                                className="h-15"
                            />
                            <FormInput
                                name="middlename"
                                type="text"
                                placeholder="Middle Name"
                                register={register}
                                error={errors?.middlename?.message}
                                className="h-15"
                            />
                            <FormInput
                                name="lastname"
                                type="text"
                                placeholder="Last Name"
                                register={register}
                                error={errors?.lastname?.message}
                                className="h-15"
                            />
                        </div>
                        <div className="flex gap-2">
                            <FormDropdown
                                data={countries}
                                value={selectedCountry}
                                defaultText="Country"
                                search={true}
                                searchPlaceholder="Search country"
                                searchEmptyText="No country found"
                                setValue={(value) => {
                                    setValue('country', value as string);
                                }}
                                triggerHeight="h-15"
                                error={errors?.country?.message}
                            />
                            <FormDropdown
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
                                }}
                                triggerHeight="h-15"
                                error={errors?.state?.message}
                                disable={selectedCountry ? false : true}
                            />
                            <FormDropdown
                                data={cities}
                                value={selectedCity}
                                defaultText={
                                    selectedState
                                        ? 'City'
                                        : 'Select state/province first'
                                }
                                search={true}
                                searchPlaceholder="Search city"
                                searchEmptyText="No city found"
                                setValue={(value) => {
                                    setValue('city', value as string);
                                }}
                                triggerHeight="h-15"
                                error={errors?.city?.message}
                                disable={selectedState ? false : true}
                            />
                        </div>
                        <div className="flex gap-2">
                            <FormInput
                                name="phone"
                                type="number"
                                placeholder="Phone number"
                                register={register}
                                error={errors?.phone?.message}
                                className="h-15"
                                rules={{ valueAsNumber: true }}
                            />
                            <Controller
                                control={control}
                                name="birthdate"
                                render={({ field }) => (
                                    <DateTimePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                        hideTime={true}
                                        placeHolder="Date Of Birth"
                                        max={new Date()}
                                        classNames={{
                                            trigger: 'h-15 mt-1 text-sm',
                                        }}
                                        error={errors.birthdate?.message}
                                    />
                                )}
                            />
                        </div>
                        <FormInput
                            name="email"
                            type="email"
                            placeholder="Email"
                            register={register}
                            error={errors?.email?.message}
                            className="h-15"
                        />
                        <div className="flex gap-2 justify-center">
                            <FormInput
                                name="password"
                                type="password"
                                placeholder="Password"
                                register={register}
                                error={errors?.password?.message}
                                className="h-15"
                            />
                            <FormInput
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                register={register}
                                error={errors?.confirmPassword?.message}
                                className="h-15"
                            />
                        </div>
                        <div className="flex gap-2">
                            <FormInput
                                name="profileImage"
                                type="file"
                                register={register}
                                className="h-15 pt-4"
                                accept="image/*"
                                label="Profile Image"
                                error={errors?.profileImage?.message as string}
                            />
                            <div className="mt-4">
                                <img
                                    src={imagePreview || defaultImage}
                                    alt="Profile Image Preview"
                                    className="mt-2 w-40 h-30 object-cover rounded-md"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="cursor-pointer w-full h-15 text-xl mt-2"
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
