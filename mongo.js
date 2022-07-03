const mongoose = require('mongoose');

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]

const url = `mongodb+srv://flportilla:${password}@phonebookdb.ajsn5tf.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

if (contactName && contactNumber) {
  mongoose
    .connect(url)
    .then(result => {
      console.log('connected')

      const person = new Person({
        name: contactName,
        number: contactNumber,
        date: new Date(),
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${contactName} number ${contactNumber} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

else {
  mongoose
    .connect(url)
    .then(result => {
      console.log('connected')
      console.log('phonebook:')

      return Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
      })

    })
    .then(() => {
      console.log('closing connection')
      return mongoose.connection.close()
    })
}