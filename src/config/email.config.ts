import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const createTransporter = async () => {
  // Pour les tests : utiliser Ethereal Email
  if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_USER) {
    console.log('⚠️ Utilisation d\'Ethereal Email pour les tests');
    const testAccount = await nodemailer.createTestAccount();
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }

  // Configuration Gmail normale
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
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