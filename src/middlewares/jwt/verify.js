const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
    if (error) {
        return res.status(200).json({
          status: false,
          message: 'Unauthorized',
        });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
