const {
  path,
  prop
} = require('ramda')
const mongoose = require('mongoose')

const { BadRequestError } = require('../utils/errors')

const isValidObjectId = (req, res, next) => {
  const params = path(['params'], req)
  const id = prop(['id'], params)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError([{
      field: 'id',
      type: 'object.id',
      message: '"id" must be a valid deck id'
    }])
  }

  next()
}

module.exports = isValidObjectId
