const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const [, , password, contactName, contactNumber] = process.argv

const url = `mongodb+srv://flportilla:123@phonebookdb.ajsn5tf.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  number: String,
  date: Date,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const { _id, __v, ...rest } = returnedObject
    return { id: _id.toString(), ...rest }
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
app.get('/info', async (request, response) => {

  const persons = await Person.find({})
  const info = `
    <h2>phonebook has info for ${persons.length} people</h2>
    <h2>${new Date()}</h2>
    `
  response.send(info)
})

//handle /api/persons request
app.get('/api/persons', async (request, response) => {
  const contacts = await Person.find({})
  response.json(contacts)
})

//handle /api/persons/:id request
app.get('/api/persons/:id', async (request, response) => {

  const id = request.params.id
  await Person.findOne({ _id: id })
    .catch(error => {
      console.log(error)
      response.status(400).end('error: malformatted id')
    })
})

//handle delete by id request
app.delete('/api/persons/:id', async (request, response) => {

  const id = request.params.id
  await Person.findByIdAndRemove({ _id: id })

  response.status(204).end()
})

//handle post request
app.post('/api/persons', async (request, response) => {

  const body = request.body
  const name = body.name

  if (!body.number || !body.name) {
    response.status(400).json({ error: 'number or name is missing, please add one' })
  }
  else {
    const person = new Person({
      date: new Date(),
      id: Date.now(),
      name: body.name,
      number: body.number
    })
    try {
      await person.save()
      response.json(person)
    }
    catch (error) {
      response.status(400).json({ error: 'name is already in contact list' })
    }
  }
})

//handle put request
app.put('/api/persons/:id', async (request, response) => {

  const body = request.body
  const id = request.params.id
  const person = {
    name: body.name,
    number: body.number
  }

  await Person.findByIdAndUpdate(id, person, { new: true })
    .catch(error => {
      console.log(error)
      response.status(400).end('error: malformatted id')
    }
    )
  response.json(person)
})

//assign port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})