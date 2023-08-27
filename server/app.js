const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const bindRoutes = require('./modules/routes')
const { errorHandler } = require('./middleware')

dotenv.config({
    path: 'server/config/.env'
})

let mongoUrl = process.env.MONGO_URL
connectDB(mongoUrl)

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.set('view engine', 'ejs')
bindRoutes(app)
app.use(errorHandler)
app.listen(process.env.PORT, 'localhost', () => console.log('App running on port: ', process.env.PORT))

module.exports = app