import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
}

export interface IUserProfile extends Document {
    userId: Types.ObjectId;
    address: string;
    phone: string;
    birthdate: Date;
    profileImage?: string;
}
