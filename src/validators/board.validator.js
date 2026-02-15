const Joi = require('joi');

const createBoardSchema = Joi.object({
    name : Joi.string().min(3).required()
});

const addMemberSchema = Joi.object({
    email : Joi.string().email().required(),
    role : Joi.string().valid('OWNER', 'EDITOR', 'VIEWER').required()
});

module.exports = {
    createBoardSchema,
    addMemberSchema
}
