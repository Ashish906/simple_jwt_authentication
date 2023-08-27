class CustomError extends Error {
    constructor(statusCode, message, destination) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.destination = destination
    }
}

module.exports = CustomError