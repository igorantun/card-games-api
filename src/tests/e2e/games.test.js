const request = require('supertest')
const app = require('../../app')

test('POST /games with valid payload', done =>
  request(app)
    .post('/games')
    .send({
      decks: 2
    })
    .expect(201, '2')
    .end(done)
)

test('POST /games with invalid payload', done =>
  request(app)
    .post('/games')
    .send({
      decks: 'dois'
    })
    .expect(400, {
      status: 400,
      message: [
        {
          field: 'decks',
          type: 'number.base',
          message: '"decks" must be a number'
        }
      ]
    })
    .end(done)
)
