const { size } = require('lodash')

const errorHandler = (err, req, res, next) => {
	const error = { ...err }
	const errors = {}
	console.log('Error', err)
	if (err.name === 'ValidationError') {
		error.statusCode = 400
		error.message = err.name
		//Joi validation err
		if (err.details) {
			err.errors = err.details
		}
		Object.values(err.errors).forEach(item => {
			errors[item.path] = item.message
		})
	} else if(err.name === 'MongoServerError') {
		error.statusCode = 400
		error.message = err.name
		if(error.code === 11000) {
			Object.keys(err.keyValue).forEach(item => {
				errors[item] = item + ' already exists'
			})
		}
	}
	// For ejs only
	res.render(err.destination || req.destination, { errors, error: { message: error.message } })

	// res.status(error.statusCode || 500).json({
	// 	message: error.message || 'server error',
	// 	errors,
	// })
}

module.exports = errorHandler