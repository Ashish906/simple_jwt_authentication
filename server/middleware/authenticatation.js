const jsonwebtoken = require('jsonwebtoken')
const { CustomError, AsyncHandler } = require("../utils")
const { userHelper } = require('../modules/helpers')

module.exports = AsyncHandler(async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new CustomError(401, 'Unauthenticated', 'login')
        }
        const decodedValue = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        const userInfo = await userHelper.getAnUser({
            _id: decodedValue.userId
        })
        if (!userInfo) {
            throw new CustomError(401, 'Unauthenticated', 'login')
        }
        req.user = userInfo
        next()
    } catch (err) {
        console.log('error login: ', err)
        throw new CustomError(401, 'Unauthenticated', 'login')
    }
})