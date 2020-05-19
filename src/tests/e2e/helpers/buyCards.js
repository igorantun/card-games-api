const { path } = require('ramda')
const request = require('supertest')
const app = require('../../../app')

const buyCards = async (deckId, cards = 1) => {
  const response = await request(app)
    .put(`/decks/${deckId}/buy`)
    .send({ cards })

  return path(['body', 'cards'], response)
}

module.exports = buyCards
