import mongoose, { Schema } from 'mongoose';
import { IToken } from '../../utils/interface/token';

const TokensSchema: Schema = new Schema<IToken>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            index: true,
        },
        token: {
            type: String,
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: ['email_verification', 'password_reset'],
            required: true,
        },
        tokenExpires: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

TokensSchema.index({ userId: 1, type: 1 });

const Token = mongoose.model('Token', TokensSchema);

export { Token };
