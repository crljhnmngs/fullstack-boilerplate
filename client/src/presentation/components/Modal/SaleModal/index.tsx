import { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSaleModalStore } from '@/application/store/modalStore';
import {
    saleValidation,
    SaleFormData,
} from '@/presentation/validation/saleValidation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Customer, Item, Sale } from '@/domain/entities/sale';
import { FormInput } from '../../FormInput';
import { FormDropdown } from '../../FormDropdown';
import { genderOptions, purchaseMethodOptions } from '@/lib/const';
import { FaTimes } from 'react-icons/fa';

export const SaleModal = ({
    onSubmit,
}: {
    onSubmit: (data: SaleFormData) => void;
}) => {
    const { isOpen, mode, initialData, closeModal } = useSaleModalStore();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isDirty },
        setError,
        setValue,
        watch,
    } = useForm<SaleFormData>({
        resolver: zodResolver(saleValidation),
        defaultValues: {
            storeLocation: '',
            purchaseMethod: 'Online',
            couponUsed: false,
            customer: {
                gender: 'M',
                age: 0,
                email: '',
                satisfaction: 0,
            },
            items: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            const transformedData = {
                ...initialData,
                items:
                    initialData.items?.map((item: Item) => ({
                        ...item,
                        price: item.price?.$numberDecimal
                            ? parseFloat(item.price.$numberDecimal)
                            : 0,
                    })) || [],
            };
            reset(transformedData);
        } else {
            reset({
                storeLocation: '',
                purchaseMethod: 'Online',
                couponUsed: false,
                customer: {
                    gender: 'M',
                    age: 0,
                    email: '',
                    satisfaction: 0,
                },
                items: [],
            });
        }
    }, [mode, initialData, reset]);

    const selectedPurchaseMethod = watch('purchaseMethod');
    const selectedGender = watch('customer.gender');

    const handleFormSubmit = (data: SaleFormData) => {
        if (data.items.length === 0) {
            setError('items', {
                type: 'manual',
                message: 'At least one item is required',
            });
            return;
        }
        onSubmit(data);
    };

    const handleNumberOnlyKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const invalidKeys = ['e', 'E', '+', '-', '.'];
        if (invalidKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[660px] max-h-[90vh] overflow-y-auto [&>button]:hidden z-99999 dark:bg-gray-dark dark:text-white">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'add' ? 'Add Sale' : 'Edit Sale'}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === 'add'
                            ? 'Fill out the details to add a new sale.'
                            : 'Edit the sale details and save changes.'}
                    </DialogDescription>
                    <button
                        onClick={() => {
                            reset();
                            closeModal();
                        }}
                        className="absolute top-4 right-3 text-lg cursor-pointer"
                    >
                        <FaTimes className="size-5 text-gray-600" />
                    </button>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="grid gap-4 "
                >
                    <FormInput
                        name="storeLocation"
                        type="text"
                        label="Store Location"
                        register={register}
                        error={errors.storeLocation?.message}
                        classNames={{
                            label: 'dark:text-white',
                        }}
                    />

                    <FormDropdown
                        data={purchaseMethodOptions}
                        value={selectedPurchaseMethod}
                        label="Purchase Method"
                        setValue={(value) => {
                            setValue(
                                'purchaseMethod',
                                value as Pick<
                                    Sale,
                                    'purchaseMethod'
                                >['purchaseMethod'],
                                { shouldDirty: true }
                            );
                        }}
                        error={errors?.purchaseMethod?.message}
                        classNames={{
                            content: 'z-99999',
                            label: 'dark:text-white',
                        }}
                    />

                    <Label>
                        <Controller
                            name="couponUsed"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    className="size-5"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        Coupon Used
                    </Label>

                    <div className="border p-4 rounded flex flex-col gap-2">
                        <h3 className="font-bold">Customer Details</h3>

                        <FormDropdown
                            data={genderOptions}
                            value={selectedGender}
                            label="Gender"
                            setValue={(value) => {
                                setValue(
                                    'customer.gender',
                                    value as Pick<Customer, 'gender'>['gender'],
                                    { shouldDirty: true }
                                );
                            }}
                            error={errors?.purchaseMethod?.message}
                            classNames={{
                                content: 'z-99999',
                                label: 'dark:text-white',
                            }}
                        />

                        <FormInput
                            name={`customer.age`}
                            type="number"
                            min="0"
                            step="1"
                            label="Age"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onKeyDown={handleNumberOnlyKeyDown}
                            register={register}
                            error={errors.customer?.age?.message}
                            rules={{ valueAsNumber: true }}
                            classNames={{
                                label: 'dark:text-white',
                            }}
                        />

                        <FormInput
                            name={`customer.email`}
                            type="email"
                            label="Email"
                            register={register}
                            error={errors.customer?.email?.message}
                            classNames={{
                                label: 'dark:text-white',
                            }}
                        />

                        <FormInput
                            name={`customer.satisfaction`}
                            type="number"
                            min="0"
                            max="5"
                            step="1"
                            label="Satisfaction (1-5)"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onKeyDown={handleNumberOnlyKeyDown}
                            register={register}
                            error={errors.customer?.satisfaction?.message}
                            rules={{ valueAsNumber: true }}
                            classNames={{
                                label: 'dark:text-white',
                            }}
                        />
                    </div>
                    <div className="border p-4 rounded">
                        <h3 className="font-bold">Items</h3>

                        {errors.items && (
                            <p className="text-red-500">
                                {errors.items.message}
                            </p>
                        )}

                        <div className="flex flex-col gap-2 mb-3 ">
                            {fields.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex gap-2 items-center"
                                >
                                    <FormInput
                                        name={`items.${index}.name`}
                                        type="text"
                                        placeholder="Item Name"
                                        register={register}
                                        error={
                                            errors.items?.[index]?.name?.message
                                        }
                                        classNames={{
                                            label: 'dark:text-white',
                                        }}
                                    />

                                    <FormInput
                                        name={`items.${index}.price`}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="Price"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        onKeyDown={handleNumberOnlyKeyDown}
                                        register={register}
                                        error={
                                            errors.items?.[index]?.price
                                                ?.message
                                        }
                                        rules={{ valueAsNumber: true }}
                                        classNames={{
                                            label: 'dark:text-white',
                                        }}
                                    />

                                    <FormInput
                                        name={`items.${index}.quantity`}
                                        type="number"
                                        min="0"
                                        step="1"
                                        placeholder="Quantity"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        onKeyDown={handleNumberOnlyKeyDown}
                                        register={register}
                                        error={
                                            errors.items?.[index]?.quantity
                                                ?.message
                                        }
                                        rules={{ valueAsNumber: true }}
                                    />

                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant="destructive"
                                        className="cursor-pointer mt-5"
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            className="pt-2 cursor-pointer"
                            onClick={() =>
                                append({
                                    name: '',
                                    price: 0,
                                    quantity: 0,
                                    tags: [],
                                })
                            }
                        >
                            + Add Item
                        </Button>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={() => {
                                reset();
                                closeModal();
                            }}
                            variant="outline"
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isDirty}
                            className="cursor-pointer"
                        >
                            {mode === 'add' ? 'Add Sale' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
