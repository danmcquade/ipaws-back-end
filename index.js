const express = require('express')
const parser = require('body-parser')
const cors = require('cors')

const mongoose = require('./db/schema.js')

const Dog = mongoose.model('Dog')

const app = express()

app.use(cors())
app.set('port', process.env.PORT || 3001)
app.use(parser.json())
app.use(express.static('client/build'))

// Route to return all dogs in the databsae
app.get('/api/dogs', (req, res) => {
  Dog.find()
  .then((dogs) => {
    res.json(dogs)
  })
  .catch((err) => {
    console.log(err)
  })
})

// Route to return an individual dog by ID
app.get('/api/dogs/:id', (req, res) => {
  Dog.findById(req.params.id)
    .then((dog) => {
      res.json(dog)
    })
    .catch((err) => {
      console.log(err)
    })
})

// Route to create a new dog
app.post('/api/dogs/new', (req, res) => {
  Dog.create(req.body)
    .then((dog) => {
      res.json(dog)
    })
    .catch((err) => {
      console.log(err)
    })
})

// Route to uddate an individual dog by ID
app.post('/api/dogs/update/:id', (req, res) => {
  Dog.findOneAndUpdate({ _id: req.params.id }, req.body)
  .then((dog) => {
    res.json(dog)
  })
  .catch((err) => {
    console.log(err)
  })
})

// Route to delete an indiviudal dog by ID
app.get('/api/dogs/delete/:id', (req, res) => {
  Dog.findOneAndRemove({ _id: req.params.id }).then(res.redirect('http://localhost:3000/dogs'))
  .then((deleted) => {
    console.log('Dog has been deleted')
  })
})

// Route to post a new inquiry
app.post('/api/dogs/newinquiry/:id', (req, res) => {
  Dog.findOneAndUpdate({_id: req.params.id}, {$push: {inquiries: req.body}}, {new: true})
  .then((inquiry) => {
    console.log('New inquiry recorded')
    res.send(inquiry)
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Hello, dogs!</h1>')
})

app.listen(app.get('port'), () => {
  console.log('API server listening on port ' + app.get('port'))
})
