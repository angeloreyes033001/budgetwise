const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: false,
          message: 'Unauthorized: Token has expired',
        });
      } else {
        return res.status(401).json({
          status: false,
          message: 'Unauthorized: Invalid token',
        });
      }
    }
    
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
