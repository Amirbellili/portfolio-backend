"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const email_service_1 = require("../services/email.service");
class ContactController {
    constructor() {
        this.sendContactMessage = async (req, res) => {
            try {
                const formData = req.body;
                // Envoyer l'email au propriétaire
                await this.emailService.sendContactEmail(formData);
                // Envoyer un email de confirmation à l'utilisateur
                await this.emailService.sendConfirmationEmail(formData.email, formData.name);
                const response = {
                    success: true,
                    message: 'Message envoyé avec succès ! Vous recevrez une réponse bientôt.'
                };
                res.status(200).json(response);
            }
            catch (error) {
                console.error('Error sending email:', error);
                const response = {
                    success: false,
                    message: 'Erreur lors de l\'envoi du message',
                    error: error instanceof Error ? error.message : 'Unknown error'
                };
                res.status(500).json(response);
            }
        };
        this.testEmail = async (req, res) => {
            try {
                const isConnected = await this.emailService.verifyConnection();
                if (isConnected) {
                    res.status(200).json({
                        success: true,
                        message: 'Email service is working'
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: 'Email service is not configured properly'
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error testing email service',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        this.emailService = new email_service_1.EmailService();
    }
}
exports.ContactController = ContactController;
