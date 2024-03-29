const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')

beforeAll(async () =>
  await mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
)

describe('Create deck', () => {
  test('With valid payload', () =>
    request(app)
      .post('/decks')
      .send({
        decks: 2
      })
      .then(({ status, body }) => {
        expect(status).toBe(201)
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('remainingCards')
        expect(body.remainingCards).toBe(104)
      })
  )

  test('With invalid payload', () =>
    request(app)
      .post('/decks')
      .send({
        decks: 'dois'
      })
      .then(({ status, body }) => {
        expect(status).toBe(400)
        expect(body).toEqual({
          status: 400,
          message: [
            {
              field: 'decks',
              type: 'number.base',
              message: '"decks" must be a number'
            }
          ]
        })
      })
  )
})

afterAll(async () => await mongoose.connection.close())
