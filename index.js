let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  },
  {
    "id": 5,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]

const url = `mongodb+srv://flportilla:123@phonebookdb.ajsn5tf.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  date: Date,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Person = mongoose.model('Person', personSchema)

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

//handle root request
app.get('/', (request, response) => {
  response.send('<div>Welcome</div>')
})

//handle /info request
app.get('/info', (request, response) => {
  const info = `
    <h2>phonebook has info for ${persons.length} people</h2>
    <h2>${new Date()}</h2>
    `
  response.send(info)
})

//handle /api/persons request
app.get('/api/persons', (request, response) => {
  Person.find({}).then(contact => {
    response.json(contact)
  })
})

//handle /api/persons/:id request
app.get('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.send(person)
  }
  else {
    response.status(404).end()
  }
})

//handle delete by id request
app.delete('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

//handle post request
app.post('/api/persons', (request, response) => {

  const body = request.body
  const duplicateName = persons.find(person => person.name === body.name)

  if (duplicateName) {
    response.status(400).json({ error: 'name is already in contact list' })
  }
  else if (!body.number || !body.name) {
    response.status(400).json({ error: 'number or name is missing, please add one' })
  }
  else {
    const person = {
      date: new Date(),
      id: Date.now(),
      name: body.name,
      number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
  }

})

//assign port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})