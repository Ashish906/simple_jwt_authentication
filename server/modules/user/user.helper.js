const { UserCollection } = require('../models')

exports.getUsers = async (query, session) => {
    const users = await UserCollection.find(query, {
        _id: 1,
        name: 1,
        email: 1,
        phoneNumber: 1,
        createdAt: 1,
        browser: 1,
        language: 1,
        country: 1,
        region: 1,
    }).session(session)
    return users
}

exports.getAnUser = async (query) => await UserCollection.findOne(query)