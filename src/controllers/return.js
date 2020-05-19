const {
  path,
  prop
} = require('ramda')

const { returnService } = require('../services')

const returnController = async (req, res) => {
  const body = path(['body'], req)
  const params = path(['params'], req)

  const id = prop(['id'], params)
  const cards = prop(['cards'], body)
  const position = prop(['position'], body)

  const deck = await returnService(id, cards, position)

  res.status(200).send(deck)
}

module.exports = returnController
