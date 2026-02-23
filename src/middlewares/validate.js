// This middleware validates the request body against a Joi schema
function validate(schema){

    return (req, res, next) => {

        const { error } = schema.validate(req.body);

        // If validation fails, return error response
        if(error){
            return res.status(400).json({
                success : false,
                message : error.details[0].message
            });
        }

        // Validation passed, proceed to controller
        next();
    }
}

module.exports = validate;
