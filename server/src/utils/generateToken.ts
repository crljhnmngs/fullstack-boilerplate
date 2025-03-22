import jwt from 'jsonwebtoken';
import { keys } from '../config/keys';
import ms from 'ms';

export const generateToken = (userId: string, expiresIn: ms.StringValue) => {
    try {
        return jwt.sign({ userId }, keys.app.JWTSecret, {
            expiresIn: ms(expiresIn),
        });
    } catch (error) {
        throw new Error(`Error generating token: ${error.message}`);
    }
};
