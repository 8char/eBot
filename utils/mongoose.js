const db = require('mongoose')
require('dotenv').config({ path: '../' })

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4,
        }

        db.connect(process.env.DB_INFO, dbOptions)

        db.Promise = global.Promise
        db.connection.on('connected', () => {
            console.log('💻 Connected to the Mongoose database sucessfully! ✅')
        })

        db.connection.on('err', err => {
            console.error(`❌ Mongoose connection error: \n${err.stack}`)
        })

        db.connection.on('disconnected', () => {
            console.warn('❌ Connection lost to the Mongoose database!')
        })
    }
}