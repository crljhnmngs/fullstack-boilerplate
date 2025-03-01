import mongoose, { Schema, Document } from 'mongoose';
import { ISale } from '../utils/interface';

const SalesSchema = new Schema<ISale>({
    saleDate: {
        type: Date,
        required: true,
    },
    items: [
        {
            items: {
                type: String,
                required: true,
            },
            tags: {
                type: [String],
                required: true,
            },
            price: {
                type: mongoose.Types.Decimal128,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    storeLocation: {
        type: String,
        required: true,
    },
    customer: {
        gender: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        satisfaction: {
            type: Number,
            required: true,
        },
    },
    couponUsed: {
        type: Boolean,
        required: true,
    },
    purchaseMethod: {
        type: String,
        required: true,
    },
});

const Sale = mongoose.model('Sale', SalesSchema);
export default Sale;
