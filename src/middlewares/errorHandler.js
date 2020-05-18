const {
  always,
  unless
} = require('ramda')

const {
  BaseError,
  InternalServerError
} = require('../utils/errors')

const instanceOfBaseError = error => error instanceof BaseError

const errorHandler = (err, req, res, next) => {
  const error = unless(
    instanceOfBaseError,
    always(new InternalServerError())
  )(err)

  if (error instanceof InternalServerError) {
    console.error(err)
  }

  const { status, body } = error

  return res.status(status).send(body)
}

module.exports = errorHandler
