const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.verifyPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(4)
    const hPassword = await bcrypt.hash(password, salt)
    return { salt, hPassword }
}

exports.getJwtToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    )
}