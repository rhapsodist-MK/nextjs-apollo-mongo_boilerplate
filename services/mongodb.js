const mongoose = require('mongoose')
const connection = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo-test'

// mongoose.Promise = global.Promise
const connectDb = () => mongoose.connect(connection)

module.exports = connectDb