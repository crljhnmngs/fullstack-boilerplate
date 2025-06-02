import { z } from 'zod';
import { emailValidation } from './loginValidation';

export const forgotPasswordValidation = z.object({
    email: emailValidation,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordValidation>;
