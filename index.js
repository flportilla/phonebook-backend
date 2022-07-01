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
const morgan = require('morgan')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
  response.send(persons)
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
  console.log(persons)

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
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})