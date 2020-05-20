const shuffle = require('shuffle-array')
const {
  always,
  defaultTo,
  flatten,
  head,
  last,
  map,
  path,
  pipe,
  times,
  without,
  xprod
} = require('ramda')

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const suits = ['clubs', 'diamonds', 'hearts', 'spades']

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

module.exports = {
  generateDeck,
  ranks,
  suits
}
