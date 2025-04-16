export default function errorHandler(err, req, res, next) {
    console.error(err.stack);
  

    if (err.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({ 
        success: false,
        message: 'Database configuration error',
        details: 'Required tables are missing'
      });
    }
  

    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
  
