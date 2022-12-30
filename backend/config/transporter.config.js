import nodemailer from 'nodemailer';
import config from '../config/index';

let transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.SMTP_MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.config.SMTP_MAIL_USERNAME, // generated ethereal user
        pass: testAccount.config.SMTP_MAIL_PASSWORD, // generated ethereal password
    },
});

export default transporter;