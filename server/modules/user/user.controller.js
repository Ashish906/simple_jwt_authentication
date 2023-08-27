const geoip = require('geoip-lite')
const { AsyncHandler } = require('../../utils')
const { authHelper, userHelper } = require('../helpers')
const { userService } = require('../services')
const userDto = require('./user.dto')

exports.users = AsyncHandler(async (req, res, next) => {
    const allUsers = await userHelper.getUsers()
    // res.send({
    //     statusCode: 200,
    //     message: 'All users',
    //     data: allUsers
    // })
    const { user } = req
    delete user.password
    delete user.salt
    res.render('index', {
        data: {
            user,
            users: allUsers
        }
    })
})

exports.renderRegistrationPage = AsyncHandler(async (req, res, next) => {
    res.render('registration', { errors: {} })
})

exports.createUser = AsyncHandler(async (req, res, next) => {
    const { body = {} } = req
    req.destination = 'registration'
    userDto.checkUserCreationData(body)
    const { name, email, phoneNumber, password } = body
    const { salt, hPassword } = await authHelper.hashPassword(password)
    const geo = geoip.lookup(req.ip)
    const browser = req.headers["user-agent"]
    const language = req.headers["accept-language"]
    const country = geo ? geo.country : "Unknown"
    const region = geo ? geo.region : "Unknown"
    const user = await userService.createAnUser({
        name,
        email,
        phoneNumber,
        password: hPassword,
        salt,
        browser,
        language,
        country,
        region
    })
    delete user.salt
    delete user.password
    const token = authHelper.getJwtToken(user)
    const options = {
        // JWT_COOKIE_EXPIRE in day
        expires: new Date(
            Date.now() + (Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 3600 * 1000)
        ),
        httpOnly: false,
    }
    const users = await userHelper.getUsers()
    res.cookie('token', token, options)
    res.render('index', {
        data: {
            user,
            users
        }
    })
    // res.send({
    //     statusCode: 201,
    //     message: 'User created',
    //     data: user
    // })
})