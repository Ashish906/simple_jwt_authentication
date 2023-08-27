const router = require('express').Router()
const { authenticateUser } = require('../../middleware')
const { login, logOut, renderLoginPage } = require('./auth.controller')

router.route('/login').post(login)
router.route('/login').get(renderLoginPage)
router.route('/logout').get(authenticateUser, logOut)

module.exports = router