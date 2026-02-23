import { Request, Response, NextFunction } from 'express';
import { ContactForm } from '../types/contact.types';

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, subject, message }: ContactForm = req.body;

  const errors: string[] = [];

  // Validation du nom
  if (!name || name.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Email invalide');
  }

  // Validation du sujet
  if (!subject || subject.trim().length < 3) {
    errors.push('Le sujet doit contenir au moins 3 caractères');
  }

  // Validation du message
  if (!message || message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors
    });
  }

  next();
};

// Rate limiting simple
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requêtes max

  let requestData = requestCounts.get(ip);

  if (!requestData || now > requestData.resetTime) {
    requestData = {
      count: 1,
      resetTime: now + windowMs
    };
    requestCounts.set(ip, requestData);
    return next();
  }

  if (requestData.count >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Trop de requêtes. Veuillez réessayer plus tard.',
      error: 'RATE_LIMIT_EXCEEDED'
    });
  }

  requestData.count++;
  next();
};