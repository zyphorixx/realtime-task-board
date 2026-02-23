const Joi = require('joi');

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(1000).allow('').optional(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'DONE').default('TODO').optional()
});

const updateCardSchema = Joi.object({
  title: Joi.string().min(2).max(100).optional(),
  description: Joi.string().max(1000).allow('').optional(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'DONE').optional(),
  position: Joi.number().min(0).optional()
}).min(1); // At least one field required for update

module.exports = {
  createCardSchema,
  updateCardSchema
};
