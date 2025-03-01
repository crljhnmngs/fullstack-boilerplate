import mongoose from 'mongoose';
import { keys } from '../config/keys';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(keys.database.url, {
            dbName: 'sample_supplies',
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
