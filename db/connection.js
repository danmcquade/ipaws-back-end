const mongoose = require('mongoose')

mongoose.connect(process.env.MLAB_URL, {useMongoClient: true})

mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', err => {
  console.log(err)
})

db.once('open', () => {
  console.log('Database connected successfuly.')
})

module.exports = mongoose
