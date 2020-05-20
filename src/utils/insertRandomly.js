const {
  clamp,
  insert,
  length
} = require('ramda')

const insertRandomly = (array, item) => {
  const size = length(array)
  const clampIndex = clamp(1, size - 1)
  const index = Math.round(Math.random() * size)

  return insert(clampIndex(index), item, array)
}

module.exports = insertRandomly
