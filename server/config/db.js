const mongoose = require('mongoose')

module.exports = (mongoUrl) => {
    mongoose.connect(mongoUrl).then(()=> console.log('Database connected')).catch(err => console.log('Database connection error', err))
}