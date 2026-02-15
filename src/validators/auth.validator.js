const Joi = require('joi');

// validation rules during registeration of user
const registerSchema = Joi.object({

    // email must be valid format
    email : Joi.string().email().required(),

    // password must be 6+ characters
    password : Joi.string().min(6).required()
});

// validation rules during login in
const loginSchema = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
}

