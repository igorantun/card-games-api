const {
  assoc,
  concat,
  drop,
  pick,
  pipe,
  take
} = require('ramda')

const { Deck } = require('../models')
const { NotFoundError } = require('../utils/errors')

const buyService = async (id, cards) => {
  const deck = await Deck.findById(id)

  if (!deck) {
    throw new NotFoundError()
  }

  const { availableCards, takenCards } = deck

  const taken = take(cards, availableCards)

  deck.availableCards = drop(cards, availableCards)
  deck.takenCards = concat(taken, takenCards)
  await deck.save()

  const buildResponse = pipe(
    pick(['remainingCards']),
    assoc('cards', taken)
  )

  return buildResponse(deck)
}

module.exports = buyService
