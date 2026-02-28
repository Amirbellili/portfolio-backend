import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const createTransporter = async () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

export const emailConfig = {
  from: process.env.EMAIL_FROM || 'noreply@belliliamir.com',
  contactEmail: process.env.CONTACT_EMAIL || 'amirbellili12346@gmail.com'
};