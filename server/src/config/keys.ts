import dotenv from 'dotenv';

dotenv.config();

export const keys = {
    app: {
        name: 'MERN Stack',
        env: process.env.ENVIRONMENT,
        sesSecret: process.env.SESSION_SECRET,
        apiSecret: process.env.API_SECRET_KEY,
    },
    port: process.env.PORT || 8080,
    database: {
        url: process.env.MONGO_URI,
    },
    limiter: {
        windowsMS: process.env.RATE_LIMIT_WINDOW_MS,
        maxRequest: process.env.RATE_LIMIT_MAX,
    },
};
