export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}