const { pick } = require('ramda')

const { Deck } = require('../models')
const { generateDeck } = require('../utils/deck')

const createService = async ({
  decks,
  options
}) => {
  const cards = generateDeck(decks, options)

  const deck = new Deck({ availableCards: cards })
  await deck.save()

  const buildResponse = pick(['id', 'remainingCards'])

  return buildResponse(deck)
}

module.exports = createService
