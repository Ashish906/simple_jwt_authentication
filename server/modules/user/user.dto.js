const joi = require('joi')

exports.checkUserCreationData = (data) => {
    const schema = joi.object({
        name: joi.string().regex(new RegExp('[a-zA-Z0-9]')).required().messages({
            'string.base': 'Name should be string',
            'string.empty': 'Name can not be empty',
            'string.pattern.base': 'Name should contains only alpha-numeric string',
            // 'string.length': 'Name must be less than 20 charecter',
            'any.required': 'Name is required'
        }),
        email: joi.string().email().required().messages({
            'string.base': 'Email should be string',
            'string.empty': 'Email can not be empty',
            'string.email': 'Email should be a valid email address',
            'any.required': 'Email is required'
        }),
        phoneNumber: joi.string().messages({
            'string.base': 'phoneNumber should be string',
            // 'string.length': 'Phone number must be 11 charecter long'
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
        response.error.destination = 'registration'
        throw response.error
    }
}