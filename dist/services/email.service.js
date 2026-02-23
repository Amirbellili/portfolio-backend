"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const email_config_1 = require("../config/email.config");
class EmailService {
    constructor() {
        this.testMode = process.env.USE_TEST_MODE === 'true';
        if (!this.testMode) {
            this.initTransporter();
        }
    }
    async initTransporter() {
        this.transporter = await (0, email_config_1.createTransporter)();
    }
    async sendContactEmail(formData) {
        const { name, email, subject, message } = formData;
        // MODE TEST : Afficher dans la console
        if (this.testMode) {
            console.log('\n📧 ========== NOUVEAU MESSAGE ==========');
            console.log('👤 Nom:', name);
            console.log('📧 Email:', email);
            console.log('📝 Sujet:', subject);
            console.log('💬 Message:', message);
            console.log('======================================\n');
            return;
        }
        // MODE PRODUCTION : Envoyer vraiment l'email
        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: #f9f9f9;
              border-radius: 10px;
            }
            .header {
              background: linear-gradient(135deg, #0f0c29 0%, #302b63 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .info-row {
              margin: 15px 0;
              padding: 10px;
              background: #f5f5f5;
              border-left: 4px solid #ff0055;
            }
            .label {
              font-weight: bold;
              color: #ff0055;
            }
            .message-box {
              margin-top: 20px;
              padding: 20px;
              background: #f9f9f9;
              border-radius: 8px;
              border: 1px solid #ddd;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nouveau Message de Contact</h1>
              <p>Depuis votre Portfolio</p>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Nom :</span> ${name}
              </div>
              <div class="info-row">
                <span class="label">Email :</span> ${email}
              </div>
              <div class="info-row">
                <span class="label">Sujet :</span> ${subject}
              </div>
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
    `;
        const mailOptions = {
            to: email_config_1.emailConfig.contactEmail,
            subject: `📩 Portfolio Contact: ${subject}`,
            html: htmlContent
        };
        await this.transporter.sendMail({
            from: email_config_1.emailConfig.from,
            to: mailOptions.to,
            subject: mailOptions.subject,
            html: mailOptions.html,
            replyTo: email
        });
    }
    async sendConfirmationEmail(email, name) {
        if (this.testMode) {
            console.log(`✅ Email de confirmation envoyé à ${name} (${email})`);
            return;
        }
        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #ff0055, #cc0044);
              color: white;
              padding: 40px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: white;
              padding: 40px;
              border: 1px solid #ddd;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              background: #ff0055;
              color: white;
              text-decoration: none;
              border-radius: 25px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Message Reçu !</h1>
            </div>
            <div class="content">
              <h2>Merci ${name} !</h2>
              <p>J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.</p>
              <p>En attendant, n'hésitez pas à consulter mes autres projets sur mon portfolio.</p>
              <a href="http://localhost:4200" class="button">Visiter le Portfolio</a>
              <p style="margin-top: 30px; color: #666;">
                Cordialement,<br>
                <strong>Bellili Amir</strong><br>
                Full Stack Developer & UI/UX Designer
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
        await this.transporter.sendMail({
            from: email_config_1.emailConfig.from,
            to: email,
            subject: '✅ Confirmation de réception - Bellili Amir Portfolio',
            html: htmlContent
        });
    }
    async verifyConnection() {
        if (this.testMode) {
            console.log('✅ Email service in TEST MODE - Messages will be logged to console');
            return true;
        }
        console.log('🔍 Vérification de la configuration email...');
        console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
        console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***défini***' : '❌ NON DÉFINI');
        try {
            await this.transporter.verify();
            console.log('✅ Email service is ready');
            return true;
        }
        catch (error) {
            console.error('❌ Email service error:', error);
            return false;
        }
    }
}
exports.EmailService = EmailService;
