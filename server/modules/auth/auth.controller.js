const { AsyncHandler, CustomError } = require("../../utils")
const { authHelper, userHelper } = require("../helpers")
const { validateUserLoginData } = require("./auth.dto")

exports.login = AsyncHandler(async (req, res, next) => {
    const { body = {} } = req
    req.destination = 'login'
    validateUserLoginData(body)
    const { email, password } = body
    const userInfo = await userHelper.getAnUser({
        email
    })
    if (!userInfo) {
        throw new CustomError(404, 'User not found', 'login')
    }
    if (!(await authHelper.verifyPassword(password, userInfo.password))) {
        throw new CustomError(401, "Credential doesn't match", 'login')
    }
    const token = authHelper.getJwtToken(userInfo)
    const options = {
        // JWT_COOKIE_EXPIRE in day
        expires: new Date(
            Date.now() + (Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 3600 * 1000)
        ),
        httpOnly: false,
    }
    delete userInfo.salt
    delete userInfo.password
    const users = await userHelper.getUsers()
    res.cookie('token', token, options)
    res.render('index', {
        data: {
            user: userInfo,
            users
        }
    })
    // res.send({
    //     statusCode: 200,
    //     message: 'Login successful',
    //     data: userInfo
    // })
})

exports.logOut = AsyncHandler(async (req, res, next) => {
    const options = {
        // JWT_COOKIE_EXPIRE in day
        expires: new Date(
            Date.now() - 1
        ),
        httpOnly: false,
    }
    res.cookie('token', '', options)
    res.render('login', { errors: {} })
    // res.send({
    //     statusCode: 200,
    //     message: 'Logout successful'
    // })
})

exports.renderLoginPage = async (req, res, next) => {
    res.render('login', { errors: {} })
}