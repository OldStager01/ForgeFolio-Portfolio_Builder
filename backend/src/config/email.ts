import nodemailer from 'nodemailer';
import { USER_EMAIL, USER_PASS } from './dotenv';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: USER_EMAIL,
        pass: USER_PASS
    }
})