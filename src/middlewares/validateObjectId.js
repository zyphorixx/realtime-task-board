const mongoose = require('mongoose');
const { BadRequestError } = require('../utils/errors');

/**
 * Middleware to validate MongoDB ObjectId in route params
 * @param {...string} paramNames - Names of params to validate
 */
function validateObjectId(...paramNames) {
  return (req, res, next) => {
    for (const paramName of paramNames) {
      const id = req.params[paramName];
      
      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestError(`Invalid ${paramName}: ${id}`);
      }
    }
    next();
  };
}

module.exports = validateObjectId;