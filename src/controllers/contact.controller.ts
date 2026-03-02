import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';
import { ContactForm, ApiResponse } from '../types/contact.types';

export class ContactController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  sendContactMessage = async (req: Request, res: Response) => {
    try {
      const formData: ContactForm = req.body;

      await this.emailService.sendContactEmail(formData);

      const response: ApiResponse = {
        success: true,
        message: 'Message envoyé avec succès !'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error sending email:', error);

      const response: ApiResponse = {
        success: false,
        message: 'Erreur lors de l\'envoi du message',
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      res.status(500).json(response);
    }
  };

  testEmail = async (req: Request, res: Response) => {
    try {
      const isConnected = await this.emailService.verifyConnection();
      res.status(200).json({ success: true, message: 'Email service is working' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error testing email service' });
    }
  };
}