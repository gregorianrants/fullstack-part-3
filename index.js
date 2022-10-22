require("dotenv").config();
const express = require("express");
let persons = require("./persons.js");
const morgan = require("morgan");
const Person = require("./models/person.js");
const errorHandler = require("./error_handling/errorHandler.js");
const AppError = require("./error_handling/AppError.js");
const app = express();

const { containsName, getId } = require("./utilities.js");

app.use(express.json());

app.use(express.static("build"));

morgan.token("post-body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] :response-time ms :post-body"
  )
);

app.get("/info", async (req, res) => {
  const dateTime = new Date().toString();
  try {
    const persons = await Person.find({});
    const content = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${dateTime}</p>`;
    res.type("html");
    res.status(200).send(content);
  } catch (err) {
    next(err);
  }
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((mongo_res) => {
      res.json(mongo_res);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Person.findById(id)
    .then((person) => {
      if (!person) return next(new AppError("no such person", 404));
      res.status(200).json(person);
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return next(new AppError("content missing", 400));
  }

  const person = new Person({ name, number, id: getId() });

  person
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/persons/:id", async (req, res, next) => {
  /*
  course seems to think we should do a partial update here 
  from MDN 
  The HTTP PATCH request method applies partial modifications to a resource.
  also from MDN
  The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload.
  i have done this as per the spec and made it replace the resource with the payload
  i will do it the way they expect in the course but i dont think this is correct way to do it,
  */
  try {
    const id = req.params.id;
    const person = await Person.findByIdAndUpdate(id, req.body, { new: true });
    console.log(person);
    if (person === null) return next(new AppError("no such person", 404));
    res.status(200).json(person);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server now listening on ${PORT}`));
