import nodemailer from 'nodemailer';
import { keys } from './keys';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.nodeMailer.user,
        pass: keys.nodeMailer.password,
    },
});
