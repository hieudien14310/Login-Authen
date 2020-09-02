const Joi = require('@hapi/joi')

const schemas = {
    registerSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    })
}

const validateBodyRequest = (schema) => {
    return (req,res,next) => {
        const validateBodyResult = schema.validate(req.body)
        if(validateBodyResult.error) return res.status(400).json(validateBodyResult.error)

        if(!req.value) req.value = {}
        if(!req.value['params']) req.value.params = {}
        req.value.body = validateBodyResult.value
        next()
    }
}

module.exports = {
    validateBodyRequest,schemas
}