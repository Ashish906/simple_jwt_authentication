const { UserCollection } = require('../models')

exports.createAnUser = async (data) => {
    const user = await UserCollection.create(data)
    return user
}