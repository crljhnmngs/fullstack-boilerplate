import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import routes from './routes/index';
import dotenv from 'dotenv';
import { connectDB } from './utils/connectDB';
import session from 'express-session';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.ENVIRONMENT === 'DEV' ? false : true },
    })
);
connectDB().catch((error: any) => console.error(error));
// Routes
app.use('/', routes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
