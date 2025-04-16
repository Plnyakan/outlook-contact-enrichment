export default {
    db: {
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME
    },
    jwtSecret: process.env.JWT_SECRET,
    env: process.env.NODE_ENV || 'development'
  };