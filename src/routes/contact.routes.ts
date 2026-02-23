import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { validateContactForm, rateLimiter } from '../middleware/validation.middleware';

const router = Router();
const contactController = new ContactController();

// Route principale pour envoyer un message
router.post(
  '/send',
  rateLimiter,
  validateContactForm,
  contactController.sendContactMessage
);

// Route de test
router.get('/test', contactController.testEmail);

export default router;