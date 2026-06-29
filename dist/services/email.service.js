"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
class EmailService {
    async sendContactEmail(formData) {
        const { name, email, subject, message } = formData;
        const now = new Date();
        const date = now.toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            timeZone: 'Africa/Tunis'
        });
        const time = now.toLocaleTimeString('fr-FR', {
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false,
            timeZone: 'Africa/Tunis'
        });
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'amirbellili123456@gmail.com',
            replyTo: email,
            subject: `📩 Portfolio Contact: ${subject}`,
            html: `
        <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#f9f9f9;border-radius:10px;padding:20px;">
          <div style="background:linear-gradient(135deg,#0f0c29,#302b63);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0;">
            <h1 style="margin:0;">📧 Nouveau Message de Contact</h1>
            <p style="margin:10px 0 0;">Depuis votre Portfolio</p>
          </div>
          <div style="background:white;padding:30px;border-radius:0 0 10px 10px;">
            <div style="margin:15px 0;padding:10px;background:#f5f5f5;border-left:4px solid #ff0055;">
              <span style="font-weight:bold;color:#ff0055;">Nom :</span> ${name}
            </div>
            <div style="margin:15px 0;padding:10px;background:#f5f5f5;border-left:4px solid #ff0055;">
              <span style="font-weight:bold;color:#ff0055;">Email :</span> ${email}
            </div>
            <div style="margin:15px 0;padding:10px;background:#f5f5f5;border-left:4px solid #ff0055;">
              <span style="font-weight:bold;color:#ff0055;">Sujet :</span> ${subject}
            </div>
            <div style="margin-top:20px;padding:20px;background:#f9f9f9;border-radius:8px;border:1px solid #ddd;">
              <h3 style="margin-top:0;">Message :</h3>
              <p style="margin:0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div style="text-align:center;margin-top:20px;color:#666;font-size:12px;">
              <p>Ce message a été envoyé depuis votre portfolio Bellili Amir</p>
              <p>Date : ${date} à ${time}</p>
            </div>
          </div>
        </div>
      `
        });
    }
    async sendConfirmationEmail(email, name) {
        // Désactivé sur plan gratuit Resend
        console.log(`Confirmation skipped for ${name} (${email})`);
    }
    async verifyConnection() {
        return true;
    }
}
exports.EmailService = EmailService;
