import { z } from 'zod';

export const registerValidation = z
    .object({
        firstname: z.string().min(1, 'FirstName is required'),
        middlename: z.string().optional(),
        lastname: z.string().min(1, 'FirstName required'),
        country: z.string().min(1, 'Countty is required'),
        state: z.string().optional(),
        city: z.string().optional(),
        phone: z.number({
            invalid_type_error: 'Phone must be a valid number',
        }),
        birthdate: z.coerce.date(),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z.string().min(1, 'Password required'),
        confirmPassword: z.string().min(1, 'Confirm Password required'),
        profileImage: z
            .any()
            .transform((value) =>
                value instanceof FileList ? value[0] : value
            )
            .refine((file) => file instanceof File && file.size > 0, {
                message: 'File is required',
            }),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: 'Passwords do not match',
                code: z.ZodIssueCode.custom,
            });
        }
    });

export type RegisterFormData = z.infer<typeof registerValidation>;
