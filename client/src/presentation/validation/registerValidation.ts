import { z } from 'zod';

const baseRegisterSchema = z.object({
    firstname: z.string().min(1, 'FirstName is required'),
    middlename: z.string().optional(),
    lastname: z.string().min(1, 'LastName is required'),
    country: z.string().min(1, 'Country is required'),
    state: z.string().optional(),
    city: z.string().optional(),
    phone: z
        .string()
        .min(10, 'Phone number must be at least 10 characters')
        .max(15, 'Phone number is too long')
        .regex(/^\+?\d{10,15}$/, 'Phone number must be a valid format'),
    birthdate: z.coerce.date(),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password required'),
    profileImage: z
        .any()
        .transform((value) => (value instanceof FileList ? value[0] : value))
        .refine((file) => !file || (file instanceof File && file.size > 0), {
            message: 'File is required and must have a size greater than 0',
        })
        .optional(),
});

export const partialUpdateProfileValidation = baseRegisterSchema
    .partial()
    .superRefine((data, ctx) => {
        if (
            data.password &&
            data.confirmPassword &&
            data.password !== data.confirmPassword
        ) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: 'Passwords do not match',
                code: z.ZodIssueCode.custom,
            });
        }
    });

export const registerValidation = baseRegisterSchema.superRefine(
    (data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: 'Passwords do not match',
                code: z.ZodIssueCode.custom,
            });
        }
    }
);

export type RegisterFormData = z.infer<typeof registerValidation>;
export type UpdateProfileFormData = z.infer<
    typeof partialUpdateProfileValidation
>;
