const {
  path,
  prop
} = require('ramda')
const mongoose = require('mongoose')

const { buyService } = require('../services')
const { BadRequestError } = require('../utils/errors')

const buyController = async (req, res) => {
  const body = path(['body'], req)
  const params = path(['params'], req)

  const id = prop(['id'], params)
  const cards = prop(['cards'], body)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError([{
      field: 'id',
      type: 'object.id',
      message: '"id" must be a valid deck id'
    }])
  }

  const deck = await buyService(id, cards)

  res.status(200).send(deck)
}

module.exports = buyController
