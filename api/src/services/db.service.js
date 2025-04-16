import mysql from 'mysql2/promise';
import config from '../config.js';

class DBService {
    constructor() {
        this.pool = mysql.createPool({
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.name,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async query(sql, params) {
        try {
            const [rows] = await this.pool.execute(sql, params);
            return { rows };
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }
}


const dbService = new DBService();
export { dbService as default }; 