const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error("there was an error connecting to mongod", err.message);
  });

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);


module.exports = Person;
