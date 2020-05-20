const {
  head,
  map,
  last,
  xprod
} = require('ramda')
const { generateDeck } = require('../../utils/deck')

const toCardObject = card => ({ rank: head(card), suit: last(card) })

describe('Util generateDeck', () => {
  test('With 1 deck and options', () => {
    const deck = generateDeck(1, {
      without: {
        ranks: ['6', '7', '8', '9', '10', 'J', 'Q', 'K'],
        suits: ['clubs', 'diamonds']
      }
    })

    const cards = xprod(
      ['A', '2', '3', '4', '5'],
      ['hearts', 'spades']
    )
    const expected = map(toCardObject, cards)

    expect(deck).toHaveLength(10)
    expect(deck).toEqual(expect.arrayContaining(expected))
  })

  test('With 10 decks and no options', () => {
    const deck = generateDeck(10)

    expect(deck).toHaveLength(520)
  })
})
