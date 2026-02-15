const Joi = require('joi');

const createCardSchema = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().allow('').optional()
});

module.exports = {
    createCardSchema
}
