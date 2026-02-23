const Joi = require('joi');

const createBoardSchema = Joi.object({
  name: Joi.string().min(3).max(100).required()
});

const updateBoardSchema = Joi.object({
  name: Joi.string().min(3).max(100).required()
});

const addMemberSchema = Joi.object({
  email: Joi.string().email().required(),
  // Only EDITOR and VIEWER allowed when adding members
  // OWNER transfer should be a separate operation
  role: Joi.string().valid('EDITOR', 'VIEWER').required()
});

const updateMemberRoleSchema = Joi.object({
  role: Joi.string().valid('OWNER', 'EDITOR', 'VIEWER').required()
});

module.exports = {
  createBoardSchema,
  updateBoardSchema,
  addMemberSchema,
  updateMemberRoleSchema
};
