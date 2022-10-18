const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
const mongoose = require("mongoose");
const Person = require("./person.js");

const people = [
  {
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

async function addPerson(data) {
  const person = new Person(data);
  return await person.save();
}

mongoose.connection.on("connected", async () => {
  console.log("connected");
  await Person.deleteMany();
  console.log("persons database entries deleted");
  await Promise.all(people.map((el) => addPerson(el)));
  console.log("persons database seeded with data");
  await mongoose.connection.close();
  console.log("mongoose connection closed");
});
