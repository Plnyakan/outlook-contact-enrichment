import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { getContactByEmail } from '../controllers/contacts.controller.js';

const router = express.Router();

router.get('/:email', authenticateToken, getContactByEmail);


export default router;