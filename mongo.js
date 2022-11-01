const mongoose = require("mongoose")

const [password, name, number] = process.argv.slice(2)

const connectionString = `mongodb+srv://gregorian:${password}@cluster0.2f490il.mongodb.net/?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

async function addPerson(name, number) {
  const person = new Person({
    name,
    number,
  })
  await person.save()
  console.log(`added ${name} number ${number} to phonebook`)
}

async function printPhoneBook() {
  const people = await Person.find({})
  console.log("phonebook:")
  people.forEach((person) => {
    console.log(`${person.name} ${person.number}`)
  })
}

async function main() {
  try {
    await mongoose.connect(connectionString)
    if (name || number) return await addPerson(name, number)
    return await printPhoneBook()
  } catch (e) {
    console.error(e)
  } finally {
    mongoose.connection.close()
  }
}

main()
