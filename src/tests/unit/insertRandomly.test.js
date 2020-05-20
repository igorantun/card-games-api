const { head, last } = require('ramda')
const { insertRandomly } = require('../../utils')

describe('Util insertRandomly', () => {
  test('With array of length 2', () => {
    const array = [1, 2]
    const element = 'x'
    const newArray = insertRandomly(array, element)

    expect(newArray).toEqual([1, 'x', 2])
  })

  test('With array of length 10', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const element = 'x'
    const newArray = insertRandomly(array, element)

    expect(newArray).toHaveLength(11)
    expect(newArray).toEqual(expect.arrayContaining([...array, 'x']))
    expect(head(newArray)).toEqual(1)
    expect(last(newArray)).toEqual(10)
  })
})
