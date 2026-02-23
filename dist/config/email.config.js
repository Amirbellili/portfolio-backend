"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConfig = exports.createTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createTransporter = async () => {
    // Pour les tests : utiliser Ethereal Email
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_USER) {
        console.log('⚠️ Utilisation d\'Ethereal Email pour les tests');
        const testAccount = await nodemailer_1.default.createTestAccount();
        return nodemailer_1.default.createTransport({
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
    return nodemailer_1.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};
exports.createTransporter = createTransporter;
exports.emailConfig = {
    from: process.env.EMAIL_FROM || 'noreply@belliliamir.com',
    contactEmail: process.env.CONTACT_EMAIL || 'amirbellili12346@gmail.com'
};
