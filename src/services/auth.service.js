const User = require('../models/user');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/serverConfig');
const jwt = require('jsonwebtoken');

async function registerUser({ email, password }){
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new Error('User already exists');
    }

    const user = await User.create({ email, password });
    return user;
}

async function loginUser({ email, password }){
    const user = await User.findOne({ email });
    if(!user){
        throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        {userId : user._id},
        JWT_SECRET,
        {expiresIn : JWT_EXPIRES_IN}
    );

    return {
        token,
        user : {
            id : user._id,
            email : user.email
        }
    };
}
module.exports = {
    registerUser,
    loginUser
}
