import nodemailer from 'nodemailer';
import { keys } from './keys';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: keys.nodeMailer.user,
        clientId: keys.nodeMailer.clientId,
        clientSecret: keys.nodeMailer.clientSecret,
        refreshToken: keys.nodeMailer.refreshToken,
    },
});
