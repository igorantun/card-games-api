const {
  path,
  prop
} = require('ramda')

const { buyService } = require('../services')

const buyController = async (req, res) => {
  const body = path(['body'], req)
  const params = path(['params'], req)

  const id = prop(['id'], params)
  const cards = prop(['cards'], body)

  const deck = await buyService(id, cards)

  res.status(200).send(deck)
}

module.exports = buyController
