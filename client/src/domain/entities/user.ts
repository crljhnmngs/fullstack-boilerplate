export type User = {
    _id: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
};

export type UserWithoutId = Omit<User, '_id' | 'isEmailVerified'>;
