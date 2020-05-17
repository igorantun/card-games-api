const {
  map,
  path
} = require('ramda')

const { BadRequestError } = require('../../utils/errors')

const buildErrorObject = map(error => ({
  field: error.context.key,
  type: error.type,
  message: error.message
}))

const validator = schema => (req, res, next) => {
  const data = path(['body'], req)

  const { error: errors } = schema.validate(data, {
    abortEarly: false
  })

  if (!errors) {
    return next()
  }

  const error = buildErrorObject(path(['details'], errors))

  throw new BadRequestError(error)
}

module.exports = validator
