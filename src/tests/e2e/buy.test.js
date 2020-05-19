const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')

const createDeck = require('./helpers/createDeck')

beforeAll(async () =>
  await mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
)

describe('Buy cards from deck', () => {
  test('With valid deck_id and valid card count', async () => {
    const deckId = await createDeck()

    return request(app)
      .put(`/decks/${deckId}/buy`)
      .send({ cards: 2 })
      .then(({ status, body }) => {
        expect(status).toBe(200)
        expect(body).toHaveProperty('remainingCards')
        expect(body.remainingCards).toBe(50)
        expect(body).toHaveProperty('cards')
        expect(body.cards).toHaveLength(2)
        expect(body.cards).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              rank: expect.any(String),
              suit: expect.any(String)
            })
          ])
        )
      })
  })

  test('With valid deck_id and invalid card count', async () => {
    const deckId = await createDeck()

    return request(app)
      .put(`/decks/${deckId}/buy`)
      .send({ cards: -1 })
      .then(({ status, body }) => {
        expect(status).toBe(400)
        expect(body).toEqual({
          status: 400,
          message: [
            {
              field: 'cards',
              type: 'number.min',
              message: '"cards" must be larger than or equal to 1'
            }
          ]
        })
      })
  })

  test('With invalid deck_id', () =>
    request(app)
      .put('/decks/not_a_deck/buy')
      .send({ cards: 1 })
      .then(({ status, body }) => {
        expect(status).toBe(400)
        expect(body).toEqual({
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
