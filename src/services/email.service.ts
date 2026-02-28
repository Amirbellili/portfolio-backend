import { Resend } from 'resend';
import { ContactForm } from '../types/contact.types';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  async sendContactEmail(formData: ContactForm): Promise<void> {
    const { name, email, subject, message } = formData;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'amirbellili123456@gmail.com',
      subject: `📩 Portfolio Contact: ${subject}`,
      html: `
        <h2>Nouveau message de ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });
  }

  async sendConfirmationEmail(email: string, name: string): Promise<void> {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '✅ Confirmation - Bellili Amir Portfolio',
      html: `<h2>Merci ${name} !</h2><p>J'ai bien reçu votre message et je vous répondrai bientôt.</p>`
    });
  }

  async verifyConnection(): Promise<boolean> {
    return true;
  }
}