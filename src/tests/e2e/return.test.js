const { take } = require('ramda')
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')

const createDeck = require('./helpers/createDeck')
const buyCards = require('./helpers/buyCards')

beforeAll(async () =>
  await mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
)

describe('Return cards to deck', () => {
  test('With valid deck_id and valid cards', async () => {
    const deckId = await createDeck()
    const boughtCards = await buyCards(deckId, 5)

    return request(app)
      .put(`/decks/${deckId}/return`)
      .send({
        cards: take(2, boughtCards),
        position: 'top'
      })
      .then(({ status, body }) => {
        expect(status).toBe(200)
        expect(body).toHaveProperty('remainingCards')
        expect(body.remainingCards).toBe(49)
      })
  })

  test('With valid deck_id and invalid cards', async () => {
    const deckId = await createDeck(1, {
      without: { ranks: ['A'] }
    })

    return request(app)
      .put(`/decks/${deckId}/return`)
      .send({
        cards: [
          { rank: 'A', suit: 'clubs' }
        ],
        position: 'top'
      })
      .then(({ status, body }) => {
        expect(status).toBe(400)
        expect(body).toEqual({
          status: 400,
          message: [
            {
              field: 'cards',
              type: 'cards.notTaken',
              message: '"cards" must be a valid array of previously taken cards'
            }
          ]
        })
      })
  })

  test('With invalid parameters', () =>
    request(app)
      .put('/decks/not-a-deck/return')
      .send({
        position: 'otherside'
      })
      .then(({ status, body }) => {
        expect(status).toBe(400)
        expect(body).toEqual({
          status: 400,
          message: [
            {
              field: 'cards',
              type: 'any.required',
              message: '"cards" is required'
            },
            {
              field: 'position',
              type: 'any.allowOnly',
              message: '"position" must be one of [top, middle, bottom]'
            }
          ]
        })
      })
  )
})

afterAll(async () => await mongoose.connection.close())
