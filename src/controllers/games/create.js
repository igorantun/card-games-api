const {
  path
} = require('ramda')

const create = async (req, res) => {
  const data = path(['body'], req)
  const decks = path(['decks'], data)

  res.status(201).send(`${decks}`)
}

module.exports = create
