import { keys } from '../../config/keys';
import { transporter } from '../../config/nodeMailer';
import type { EmailData } from 'global';
import type { SentMessageInfo } from 'nodemailer';

export const sendEmailService = async (
    emailData: EmailData,
    retries = 3
): Promise<SentMessageInfo> => {
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
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';

        console.log(
            `Email sending failed (attempts left: ${retries}):`,
            errorMessage
        );

        if (retries > 0) {
            /* eslint-disable no-undef */
            await new Promise((res) => setTimeout(res, 1000));
            /* eslint-enable no-undef */
            return sendEmailService(emailData, retries - 1);
        }

        throw new Error('Failed to send email after retries');
    }
};
