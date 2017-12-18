const mongoose = require('./schema.js')

const Dog = mongoose.model('Dog')

const seedData = require('./seeds.json')

Dog.remove({})
  .then(() => {
    Dog.collection.insert(seedData)
    .then((dogs) => {
      console.log(dogs)
      process.exit()
    })
  })
  .catch((err) => {
    console.log(err)
  })
