import { z } from 'zod';

export const loginValidation = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password required'),
});

export type LoginFormData = z.infer<typeof loginValidation>;
