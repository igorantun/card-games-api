const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')

beforeAll(async () =>
  await mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
)

describe('POST /games', () => {
  test('With valid payload', () =>
    request(app)
      .post('/games')
      .send({
        deckCount: 2
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
      .post('/games')
      .send({
        deckCount: 'dois'
      })
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          status: 400,
          message: [
            {
              field: 'deckCount',
              type: 'number.base',
              message: '"deckCount" must be a number'
            }
          ]
        })
      })
  )
})

afterAll(async () => await mongoose.connection.close())
