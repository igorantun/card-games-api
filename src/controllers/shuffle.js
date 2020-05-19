const {
  path,
  prop
} = require('ramda')
const mongoose = require('mongoose')

const deckService = require('../services')
const { BadRequestError } = require('../utils/errors')

const shuffleController = async (req, res) => {
  const params = path(['params'], req)
  const id = prop(['id'], params)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError([{
      field: 'id',
      type: 'object.id',
      message: '"id" must be a valid deck id'
    }])
  }

  const deck = await deckService.shuffle(id)

  res.status(200).send(deck)
}

module.exports = shuffleController
