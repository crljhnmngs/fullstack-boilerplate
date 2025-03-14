import { z } from 'zod';

export const saleSchema = z.object({
    _id: z.string().optional(),
    storeLocation: z.string().min(1, 'Store location is required'),
    purchaseMethod: z.enum(['Online', 'In store', 'Phone']),
    couponUsed: z.boolean(),
    customer: z.object({
        gender: z.enum(['M', 'F']),
        age: z
            .number({ invalid_type_error: 'Age must be a valid number' })
            .min(1, 'Age is required'),
        email: z.string().email('Invalid email'),
        satisfaction: z
            .number({
                invalid_type_error: 'Satisfaction must be a valid number',
            })
            .min(1)
            .max(5, 'Satisfaction must be between 1 and 5'),
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

export type SaleFormData = z.infer<typeof saleSchema>;
