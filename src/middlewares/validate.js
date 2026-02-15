// This middleware will validate the request body
function validate(schema){

    return (req, res, next) => {

        const { error } = schema.validate(req.body);

        // agar validation fail hui
        if(error){
            return res.status(201).json({
                success : false,
                message : error.details[0].message
            });
        }

        // sab sahi -> controller pr jao
        next();
    }
}

module.exports = validate;
