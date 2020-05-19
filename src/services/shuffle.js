const shuffle = require('shuffle-array')
const { pick } = require('ramda')

const { Deck } = require('../models')
const { NotFoundError } = require('../utils/errors')

const shuffleService = async (id) => {
  const deck = await Deck.findById(id)

  if (!deck) {
    throw new NotFoundError()
  }

  deck.availableCards = shuffle(deck.availableCards, { copy: true })
  await deck.save()

  const buildResponse = pick(['remainingCards'])

  return buildResponse(deck)
}

module.exports = shuffleService
