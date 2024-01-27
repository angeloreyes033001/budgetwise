const express = require('express');

//middleware
const verifyToken = require('../middlewares/jwt/verify')
//controllers
const {registration, login,verify} = require('../controllers/userController')


const router = express.Router();

router.get('/verify',verifyToken,verify)

router.post('/registration',registration);
router.post('/login', login);

module.exports = router;