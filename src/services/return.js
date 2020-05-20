const {
  always,
  cond,
  concat,
  equals,
  includes,
  pick,
  reduce,
  reject,
  __
} = require('ramda')

const { Deck } = require('../models')
const {
  BadRequestError,
  NotFoundError
} = require('../utils/errors')
const { insertRandomly } = require('../utils')

const returnService = async (id, cards, position) => {
  const deck = await Deck.findById(id)

  if (!deck) {
    throw new NotFoundError()
  }

  let { availableCards, takenCards } = deck

  takenCards = JSON.parse(JSON.stringify(takenCards))

  if (!cards.every(card => includes(card, takenCards))) {
    throw new BadRequestError([{
      field: 'cards',
      type: 'cards.notTaken',
      message: '"cards" must be a valid array of previously taken cards'
    }])
  }

  const returnCardsToTop = concat(cards, availableCards)
  const returnCardsToMiddle = reduce(insertRandomly, availableCards, cards)
  const returnCardsToBottom = concat(availableCards, cards)

  const returnCards = cond([
    [equals('top'), always(returnCardsToTop)],
    [equals('middle'), always(returnCardsToMiddle)],
    [equals('bottom'), always(returnCardsToBottom)]
  ])

  deck.availableCards = returnCards(position)
  deck.takenCards = reject(includes(__, cards), takenCards)
  await deck.save()

  const buildResponse = pick(['remainingCards'])

  return buildResponse(deck)
}

module.exports = returnService
