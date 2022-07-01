const persons = [
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
  }
]

const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('<div>Welcome</div>')
})
app.get('/info', (request, response) => {
  const info = `
    <h2>phonebook has info for ${persons.length} people</h2>
    <h2>${new Date()}</h2>
    `
  response.send(info)
})
app.get('/api/persons', (request, response) => {
  response.send(persons)
})

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})