export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
};

export type UserWithoutId = Omit<User, '_id'>;
