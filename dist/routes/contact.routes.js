"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
const contactController = new contact_controller_1.ContactController();
// Route principale pour envoyer un message
router.post('/send', validation_middleware_1.rateLimiter, validation_middleware_1.validateContactForm, contactController.sendContactMessage);
// Route de test
router.get('/test', contactController.testEmail);
exports.default = router;
