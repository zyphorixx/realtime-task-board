const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { ConflictError, UnauthorizedError } = require('../utils/errors');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/serverConfig');

async function registerUser({ email, password }) {
  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    throw new ConflictError('User already exists');
  }

  const user = await User.create({ email, password });

  // Generate token for auto-login after registration
  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email
    }
  };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email
    }
  };
}

module.exports = {
  registerUser,
  loginUser
};
