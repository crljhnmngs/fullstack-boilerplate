import { z } from 'zod';

export const UserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const UserProfileSchema = z.object({
    address: z.string().min(1, 'Address is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    birthdate: z.coerce.date(),
    profileImage: z.string().url('Invalid image URL').optional(),
});
