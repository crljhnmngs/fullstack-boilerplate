import { z } from 'zod';
import { PURCHASE_METHODS, GENDERS } from '../../lib/const';

export const saleValidation = z.object({
    _id: z.string().optional(),
    storeLocation: z.string().min(1, 'Store location is required'),
    purchaseMethod: z.enum(PURCHASE_METHODS),
    couponUsed: z.boolean(),
    customer: z.object({
        gender: z.enum(GENDERS),
        age: z
            .number({ invalid_type_error: 'Age must be a valid number' })
            .min(1, 'Age is required'),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        satisfaction: z
            .number({
                invalid_type_error: 'Satisfaction must be a valid number',
            })
            .min(1, { message: 'Satisfaction must be at least 1' })
            .max(5, { message: 'Satisfaction must be at most 5' }),
    }),
    items: z.array(
        z.object({
            name: z.string().min(1, 'Item name is required'),
            tags: z.array(z.string()).optional(),
            price: z
                .number({
                    invalid_type_error: 'Price must be a valid number',
                })
                .min(1, 'Price must be not zero'),
            quantity: z
                .number({
                    invalid_type_error: 'Quantity must be a valid number',
                })
                .min(1, 'Quantity must be at least 1'),
        })
    ),
});

export type SaleFormData = z.infer<typeof saleValidation>;
