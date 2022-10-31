const mongoose = require("mongoose");
const validatePhoneNumber = require("../utilities/validatePhoneNumber.js");

mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error("there was an error connecting to mongod", err.message);
  });

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        console.log("hello");
        return validatePhoneNumber(v);
      },
      message: (props) =>
        `${props.value} is invalid.  the phone number can optionaly start with 2 or 3 digits followed by a hyphen and it should have at least 8 digits in total`,
    },
  },
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
