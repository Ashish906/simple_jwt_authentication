const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
        browser: {
            type: String
        },
        language: {
            type: String
        },
        country: {
            type: String
        },
        region: {
            type: String
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true }
    }
)

module.exports = mongoose.model('User', userSchema)