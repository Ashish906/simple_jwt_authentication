const router = require('express').Router()
const { authenticateUser } = require('../../middleware')
const { createUser, renderRegistrationPage, users } = require('./user.controller')

router.route('/').get(authenticateUser, users)
router.route('/registration').post(createUser)
router.route('/registration').get(renderRegistrationPage)

module.exports = router