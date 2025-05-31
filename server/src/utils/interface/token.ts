import { Document, Types } from 'mongoose';

export interface IToken extends Document {
    userId: Types.ObjectId;
    token: string;
    type: 'email_verification' | 'password_reset';
    tokenExpires: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
