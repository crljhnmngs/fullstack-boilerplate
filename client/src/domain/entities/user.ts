export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
};

export type UserWithoutId = Omit<User, '_id' | 'isEmailVerified'>;
