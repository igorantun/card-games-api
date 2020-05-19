const { path } = require('ramda')
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')

beforeAll(async () =>
  await mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
)

const createDeck = async (decks = 1, options = {}) => {
  const response = await request(app)
    .post('/decks')
    .send({ decks, options })

  return path(['body', 'id'], response)
}

describe('Shuffle deck', () => {
  test('With valid deck_id', async () => {
    const deckId = await createDeck()

    return request(app)
      .put(`/decks/${deckId}/shuffle`)
      .then(({ status, body }) => {
        expect(status).toBe(200)
        expect(body).toHaveProperty('remainingCards')
        expect(body.remainingCards).toBe(52)
      })
  })

  test('With invalid deck_id', () =>
    request(app)
      .put('/decks/not_a_deck/shuffle')
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          status: 400,
          message: [
            {
              field: 'id',
              type: 'object.id',
              message: '"id" must be a valid deck id'
            }
          ]
        })
      })
  )
})

afterAll(async () => await mongoose.connection.close())
