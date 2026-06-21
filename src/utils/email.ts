// Import required packages
import nodemailer from "nodemailer"
const dotenv = require('dotenv');
dotenv.config();

// Create reusable transporter object using the SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },

});

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html,
    });

};