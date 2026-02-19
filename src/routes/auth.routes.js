const express = require('express');
const router = express.Router();

const { authLimiter } = require("../middlewares/rateLimiter");

const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validators/auth.validator');
const { register,login } = require('../controllers/auth.controller');

router.post('/register', validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);

module.exports = router;
