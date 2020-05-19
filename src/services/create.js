const shuffle = require('shuffle-array')
const {
  always,
  defaultTo,
  flatten,
  head,
  last,
  map,
  path,
  pick,
  pipe,
  times,
  without,
  xprod
} = require('ramda')

const { Deck } = require('../models')
const { ranks, suits } = require('../utils/deck')

const generateCards = (options) => {
  const toCardObject = card => ({ rank: head(card), suit: last(card) })

  const ranksToOmit = defaultTo([], path(['without', 'ranks'], options))
  const suitsToOmit = defaultTo([], path(['without', 'suits'], options))

  const availableRanks = without(ranksToOmit, ranks)
  const availableSuits = without(suitsToOmit, suits)

  const cardCombinations = xprod(availableRanks, availableSuits)

  const cards = pipe(
    map(toCardObject),
    shuffle
  )(cardCombinations)

  return cards
}

const generateDeck = (count, options) =>
  flatten(times(
    always(generateCards(options)),
    Number(count)
  ))

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
