import { keys } from '../config/keys';

export const generateConfirmationEmail = (name: string, link: string) => `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <title>Confirm Your Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        body {
        margin: 0;
        padding: 0;
        background-color: #f6f9fc;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333;
        }

        .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 40px 30px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        h1 {
        font-size: 24px;
        margin-bottom: 16px;
        color: #2c3e50;
        }

        p {
        font-size: 16px;
        line-height: 1.6;
        margin: 12px 0;
        }

        .button {
        display: inline-block;
        margin-top: 24px;
        padding: 14px 28px;
        background-color: #007bff;
        color: #fff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 16px;
        transition: background-color 0.3s ease;
        }

        .button:hover {
        background-color: #0056b3;
        }

        .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #999;
        text-align: center;
        }

        @media (max-width: 600px) {
        .container {
            padding: 24px 16px;
        }

        .button {
            width: 100%;
            text-align: center;
        }
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>Confirm Your Email</h1>
        <p>Hi ${name || 'User'},</p>
        <p>
        Thanks for signing up! To complete your registration, please confirm your email by clicking the button below:
        </p>
        <a href="${link}" class="button" target="_blank" rel="noopener noreferrer">Confirm Email</a>
        <p>If you didn’t create an account, no further action is required.</p>
        <div class="footer">
        &copy; ${new Date().getFullYear()} ${keys.app.name}. All rights reserved.
        </div>
    </div>
    </body>
</html>
`;

export const generateForgotPasswordEmail = (name: string, link: string) => `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        body {
        margin: 0;
        padding: 0;
        background-color: #f6f9fc;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333;
        }

        .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 40px 30px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        h1 {
        font-size: 24px;
        margin-bottom: 16px;
        color: #2c3e50;
        }

        p {
        font-size: 16px;
        line-height: 1.6;
        margin: 12px 0;
        }

        .button {
        display: inline-block;
        margin-top: 24px;
        padding: 14px 28px;
        background-color: #007bff;
        color: #fff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 16px;
        transition: background-color 0.3s ease;
        }

        .button:hover {
        background-color: #0056b3;
        }

        .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #999;
        text-align: center;
        }

        @media (max-width: 600px) {
        .container {
            padding: 24px 16px;
        }

        .button {
            width: 100%;
            text-align: center;
        }
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>Reset Your Password</h1>
        <p>Hi ${name || 'User'},</p>
        <p>
        We received a request to reset your password. Click the button below to set a new password:
        </p>
        <a href="${link}" class="button" target="_blank" rel="noopener noreferrer">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
        <div class="footer">
        &copy; ${new Date().getFullYear()} ${keys.app.name}. All rights reserved.
        </div>
    </div>
    </body>
</html>
`;
