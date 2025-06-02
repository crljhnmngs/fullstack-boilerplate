import { z } from 'zod';

export const emailValidation = z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format');

export const loginValidation = z.object({
    email: emailValidation,
    password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginValidation>;
