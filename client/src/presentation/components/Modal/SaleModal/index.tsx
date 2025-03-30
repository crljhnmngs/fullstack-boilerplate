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
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Item } from '@/domain/entities/sale';

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

    const handleFormSubmit = (data: SaleFormData) => {
        if (data.items.length === 0) {
            setError('items', {
                type: 'manual',
                message: 'At least one item is required',
            });
            return;
        }
        onSubmit(data);
        closeModal();
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'add' ? 'Add Sale' : 'Edit Sale'}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === 'add'
                            ? 'Fill out the details to add a new sale.'
                            : 'Edit the sale details and save changes.'}
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="grid gap-4"
                >
                    <Label>Store Location</Label>
                    <Input {...register('storeLocation')} />
                    {errors.storeLocation && (
                        <p className="text-red-500">
                            {errors.storeLocation.message}
                        </p>
                    )}

                    <Label>Purchase Method</Label>
                    <select
                        {...register('purchaseMethod')}
                        className="border p-2"
                    >
                        <option value="Online">Online</option>
                        <option value="In store">In store</option>
                        <option value="Phone">Phone</option>
                    </select>
                    {errors.purchaseMethod && (
                        <p className="text-red-500">
                            {errors.purchaseMethod.message}
                        </p>
                    )}

                    <Label>
                        <Controller
                            name="couponUsed"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        Coupon Used
                    </Label>

                    <div className="border p-4 rounded flex flex-col gap-2">
                        <h3 className="font-bold">Customer Details</h3>

                        <Label>Gender</Label>
                        <select
                            {...register('customer.gender')}
                            className="border p-2 w-32"
                        >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>

                        <Label>Age</Label>
                        <Input
                            type="number"
                            {...register('customer.age', {
                                valueAsNumber: true,
                            })}
                        />
                        {errors.customer?.age && (
                            <p className="text-red-500">
                                {errors.customer.age.message}
                            </p>
                        )}

                        <Label>Email</Label>
                        <Input type="email" {...register('customer.email')} />
                        {errors.customer?.email && (
                            <p className="text-red-500">
                                {errors.customer.email.message}
                            </p>
                        )}

                        <Label>Satisfaction (1-5)</Label>
                        <Input
                            type="number"
                            {...register('customer.satisfaction', {
                                valueAsNumber: true,
                            })}
                        />
                        {errors.customer?.satisfaction && (
                            <p className="text-red-500">
                                {errors.customer.satisfaction.message}
                            </p>
                        )}
                    </div>
                    <div className="border p-4 rounded">
                        <h3 className="font-bold">Items</h3>

                        {errors.items && (
                            <p className="text-red-500">
                                {errors.items.message}
                            </p>
                        )}

                        <div className="flex flex-col gap-2 mb-3">
                            {fields.map((item, index) => (
                                <div key={item.id} className="flex gap-2">
                                    <div className="flex flex-col">
                                        <Input
                                            {...register(`items.${index}.name`)}
                                            placeholder="Item Name"
                                        />
                                        {errors.items?.[index]?.name && (
                                            <p className="text-red-500">
                                                {
                                                    errors.items[index].name
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <Input
                                            type="number"
                                            step="0.01"
                                            {...register(
                                                `items.${index}.price`,
                                                { valueAsNumber: true }
                                            )}
                                            placeholder="Price"
                                        />
                                        {errors.items?.[index]?.price && (
                                            <p className="text-red-500">
                                                {
                                                    errors.items[index].price
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <Input
                                            type="number"
                                            {...register(
                                                `items.${index}.quantity`,
                                                { valueAsNumber: true }
                                            )}
                                            placeholder="Quantity"
                                        />
                                        {errors.items?.[index]?.quantity && (
                                            <p className="text-red-500">
                                                {
                                                    errors.items[index].quantity
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant="destructive"
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            className="pt-2"
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
                            onClick={closeModal}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!isDirty}>
                            {mode === 'add' ? 'Add Sale' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
