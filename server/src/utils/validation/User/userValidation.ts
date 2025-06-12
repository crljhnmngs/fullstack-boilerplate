import { z } from 'zod';

export const PasswordSchema = z
    .string()
    .min(6, 'Password must be at least 6 characters');

export const UserSchema = z.object({
    firstname: z.string().min(1, 'FirstName is required'),
    middlename: z.string().optional(),
    lastname: z.string().min(1, 'LastName required'),
    email: z.string().email('Invalid email format'),
    password: PasswordSchema,
    role: z.string().min(1, 'Role is required'),
});

export const UserProfileSchema = z.object({
    country: z.string().min(1, 'Country is required'),
    state: z.string().min(1, 'State/Province is required'),
    city: z.string().min(1, 'City is required'),
    phone: z
        .string()
        .min(10, 'Phone number must be at least 10 characters')
        .max(15, 'Phone number is too long')
        .regex(/^\+?\d{10,15}$/, 'Phone number must be a valid format'),
    birthdate: z.coerce.date(),
    profileImage: z.string().url('Invalid image URL').optional(),
});
