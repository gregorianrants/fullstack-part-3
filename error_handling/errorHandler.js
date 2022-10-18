function errorHandler(err, req, res, next) {
  console.log("error", err);
  console.log("error message: ", err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
  res.status(500).json({ error: "something went very wrong" });
  next(err);
}

module.exports = errorHandler;
