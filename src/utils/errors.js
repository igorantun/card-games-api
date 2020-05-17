class BaseError extends Error {
  constructor (status, message) {
    super(message)

    this.status = status
    this.message = message
  }

  get body () {
    return {
      status: this.status,
      message: this.message
    }
  }
}

class BadRequestError extends BaseError {
  constructor (message = 'Bad request') {
    super(400, message)
  }
}

class NotFoundError extends BaseError {
  constructor (message = 'Not found') {
    super(404, message)
  }
}

class InternalServerError extends BaseError {
  constructor (message = 'Internal server error') {
    super(500, message)
  }
}

module.exports = {
  BaseError,
  BadRequestError,
  NotFoundError,
  InternalServerError
}
