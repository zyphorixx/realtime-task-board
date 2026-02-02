const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
       const user = await authService.registerUser(req.body);
       return res.status(201).json({
         success : true,
         data : {
            id : user._id,
            email : user.email
         }
       });
    } 
    catch (error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
    }
}

module.exports = {
    register
};
