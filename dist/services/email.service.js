"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
class EmailService {
    async sendContactEmail(formData) {
        const { name, email, subject, message } = formData;
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'amirbellili123456@gmail.com',
            replyTo: email,
            subject: `📩 Portfolio Contact: ${subject}`,
            html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px; }
          .header { background: linear-gradient(135deg, #0f0c29 0%, #302b63 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 15px 0; padding: 10px; background: #f5f5f5; border-left: 4px solid #ff0055; }
          .label { font-weight: bold; color: #ff0055; }
          .message-box { margin-top: 20px; padding: 20px; background: #f9f9f9; border-radius: 8px; border: 1px solid #ddd; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nouveau Message de Contact</h1>
            <p>Depuis votre Portfolio</p>
          </div>
          <div class="content">
            <div class="info-row"><span class="label">Nom :</span> ${name}</div>
            <div class="info-row"><span class="label">Email :</span> ${email}</div>
            <div class="info-row"><span class="label">Sujet :</span> ${subject}</div>
            <div class="message-box">
              <h3>Message :</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="footer">
              <p>Ce message a été envoyé depuis votre portfolio Bellili Amir</p>
              <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
        });
    }
    async sendConfirmationEmail(email, name) {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: '✅ Confirmation - Bellili Amir Portfolio',
            html: `<h2>Merci ${name} !</h2><p>J'ai bien reçu votre message et je vous répondrai bientôt.</p>`
        });
    }
    async verifyConnection() {
        return true;
    }
}
exports.EmailService = EmailService;
