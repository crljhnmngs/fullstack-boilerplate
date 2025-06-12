import mongoose from 'mongoose';
import { keys } from '../config/keys';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(keys.database.url, {
            dbName: keys.database.name,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB Disconnected');
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error disconnecting from MongoDB: ${error.message}`);
        }
        process.exit(1);
    }
};
