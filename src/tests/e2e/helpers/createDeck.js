const { path } = require('ramda')
const request = require('supertest')
const app = require('../../../app')

const createDeck = async (decks = 1, options = {}) => {
  const response = await request(app)
    .post('/decks')
    .send({ decks, options })

  return path(['body', 'id'], response)
}

module.exports = createDeck
