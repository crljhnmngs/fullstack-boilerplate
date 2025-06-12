import mongoose, { Schema } from 'mongoose';
import { IUserProfile } from '../../utils/interface/users';

const ProfileSchema = new Schema<IUserProfile>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true,
    },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    birthdate: { type: Date, required: true },
    profileImage: { type: String },
});

const Profile = mongoose.model('Profile', ProfileSchema);

export { Profile };
