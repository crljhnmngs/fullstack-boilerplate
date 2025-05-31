import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../utils/interface/users';

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, required: true },
});

const User = mongoose.model('User', UserSchema);

export { User };
