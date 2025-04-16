import dbService from '../services/db.service.js';

export async function getContactByEmail(req, res, next) {
    try {

        const email = decodeURIComponent(req.params.email);
        
        console.log("decoded email",email);
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Valid email address is required' });
        }

        const { rows } = await dbService.query(
            'SELECT id, email, full_name, department, phone_number, job_title FROM contacts WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ 
                message: 'Contact not found',
                suggestion: 'Try searching with a different email address'
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        next(error);
    }
}

