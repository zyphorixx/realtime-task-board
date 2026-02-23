const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
    const response = await authService.registerUser(req.body);
    return res.status(201).json({
        success : true,
        data : response
    });
});

const login = asyncHandler(async (req, res) => {
    const response = await authService.loginUser(req.body);
       return res.status(200).json({
        success : true,
        data : response
       });
});

module.exports = {
    register,
    login
};

