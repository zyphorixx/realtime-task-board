const Joi = require('joi');

// Validation rules for user registration
const registerSchema = Joi.object({

    // Email must be valid format
    email : Joi.string().email().required(),

    // Password must be 6+ characters
    password : Joi.string().min(6).required()
});

// Validation rules for user login
const loginSchema = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
}

