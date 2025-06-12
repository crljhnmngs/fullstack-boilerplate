import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../utils/interface/users';

const UserSchema = new Schema<IUser>({
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    isEmailVerified: { type: Boolean, required: true },
});

const User = mongoose.model('User', UserSchema);

export { User };
