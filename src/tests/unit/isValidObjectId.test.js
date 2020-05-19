const { isValidObjectId } = require('../../middlewares')
const { BadRequestError } = require('../../utils/errors')

describe('Middleware isValidObjectId', () => {
  test('With valid ObjectId', () => {
    const validate = () =>
      isValidObjectId(
        { params: { id: '507f1f77bcf86cd799439011' } },
        {},
        () => {}
      )

    expect(validate).not.toThrow()
  })

  test('With invalid ObjectId', () => {
    const validate = () =>
      isValidObjectId(
        { params: { id: 'not-a-valid-object-id' } },
        {},
        () => {}
      )

    expect(validate).toThrow(BadRequestError)
  })
})
