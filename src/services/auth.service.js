const User = require('../models/user');

async function registerUser({ email, password }){
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new Error('User already exists');
    }

    const user = await User.create({ email, password });
    return user;
}

module.exports = {
    registerUser
}
