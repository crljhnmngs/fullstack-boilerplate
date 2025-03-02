import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import routes from './routes/index';
import { connectDB } from './utils/db';
import session from 'express-session';
import { keys } from './config/keys';
import apiSecretMiddleware from './middlewares/apiSecretMiddleware';
import limiter from './middlewares/limiter';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(apiSecretMiddleware);
app.use(
    session({
        secret: keys.app.sesSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: keys.app.env === 'DEV' ? false : true },
    })
);
connectDB().catch((error: any) => console.error(error));
// Routes
app.use('/api/v1', routes);

// Start server
app.listen(keys.port, () => {
    console.log(`Server is running on http://localhost:${keys.port}`);
});
