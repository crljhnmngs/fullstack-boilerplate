import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
}

export interface IUserProfile extends Document {
    userId: Types.ObjectId;
    country: string;
    state: string;
    city: string;
    phone: string;
    birthdate: Date;
    profileImage?: string;
}
