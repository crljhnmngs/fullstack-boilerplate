import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import routes from './routes/index';
import { connectDB } from './utils/db';
import session from 'express-session';
import { keys } from './config/keys';
import apiSecretMiddleware from './middlewares/apiSecretMiddleware';
import limiter from './middlewares/limiter';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(helmet());
app.use(
    cors({
        origin:
            keys.app.env === 'DEV'
                ? 'http://localhost:3000'
                : keys.app.clientUrl,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-secret'],
    })
);

app.use(limiter);
app.use(express.json());
app.use(apiSecretMiddleware);
app.use(
    session({
        secret: keys.app.sesSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: keys.app.env === 'DEV' ? false : true,
            httpOnly: true,
            sameSite: 'none',
        },
    })
);
app.use(cookieParser());

connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch((error) => {
        console.error('Database connection error:', error);
        process.exit(1);
    });

// Routes
app.use('/api/v1', routes);

// Start server
app.listen(keys.port, () => {
    console.log(`Server is running on http://localhost:${keys.port}`);
});
