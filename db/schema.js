const mongoose = require('./connection.js')

const InquiriesSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  comment: String
})

const DogSchema = new mongoose.Schema({
  name: String,
  photo: String,
  breed: String,
  weight: Number,
  spayneuter: Boolean,
  sex: String,
  age: Number,
  description: String,
  inquiries: [InquiriesSchema]
})

mongoose.model('Dog', DogSchema)
mongoose.model('Inquiries', InquiriesSchema)

module.exports = mongoose
