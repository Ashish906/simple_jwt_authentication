const joi = require('joi')

exports.validateUserLoginData = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            'string.base': 'Email should be string',
            'string.empty': 'Email can not be empty',
            'string.email': 'Email should be a valid email address',
            'any.required': 'Email is required'
        }),
        password: joi.string().required().messages({
            'string.base': 'Password should be string',
            'string.empty': 'Password can not be empty',
            // 'string.length': 'Password must be less than 10 charecter',
            'any.required': 'Password is required'
        })
    })
    const response = schema.validate(data, { abortEarly: false })
    if(response.error) {
        // For ejs render
        response.error.destination = 'login'
        throw response.error
    }
}