import { z } from 'zod';

export const resetPasswordValidation = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(1, 'Confirm Password required'),
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

export type ResetPasswordFormData = z.infer<typeof resetPasswordValidation>;
