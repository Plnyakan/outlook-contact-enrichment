import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbService from '../services/db.service.js'; 
import config from '../config.js';

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        console.log('Request body:', JSON.stringify(req.body));
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const { rows } = await dbService.query(
            'SELECT * FROM users WHERE email = ?', 
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];
       const isValidPassword = await bcrypt.compare(
        Buffer.from(password, 'utf8').toString(), 
        user.password_hash
      );
        
        if (isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        res.json({ 
            token,
            expiresIn: 3600,
            userId: user.id 
        });
    } catch (error) {
        next(error);
    }
}