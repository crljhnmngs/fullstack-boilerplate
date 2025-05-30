import { keys } from '../../config/keys';
import { transporter } from '../../config/nodeMailer';
import { EmailData } from 'global';

export const sendEmailService = async (emailData: EmailData) => {
    try {
        const mailOptions = {
            from: keys.nodeMailer.user,
            to: emailData.to,
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${emailData.to}: ${info.response}`);
        return info;
    } catch (error: any) {
        console.error('Email sending failed:', error.message || error);
        throw new Error('Failed to send email');
    }
};
