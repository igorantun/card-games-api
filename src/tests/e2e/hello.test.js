const request = require('supertest')
const app = require('../../app')

test('GET /hello', done =>
  request(app)
    .get('/hello')
    .expect(200, 'Hello!')
    .end(done)
)
