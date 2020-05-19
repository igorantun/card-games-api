const {
  path,
  pick
} = require('ramda')

const { createService } = require('../services')

const createController = async (req, res) => {
  const body = path(['body'], req)

  const deck = await createService(
    pick(['decks', 'options'], body)
  )

  res.status(201).send(deck)
}

module.exports = createController
