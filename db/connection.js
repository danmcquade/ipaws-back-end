const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/ipaws', {useMongoClient: true})
mongoose.connect('mongodb://dbadmin:password123@ds161016.mlab.com:61016/ipaws', {useMongoClient: true})

mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', err => {
  console.log(err)
})

db.once('open', () => {
  console.log('Database connected successfuly.')
})

module.exports = mongoose
