const {
  path,
  prop
} = require('ramda')

const { shuffleService } = require('../services')

const shuffleController = async (req, res) => {
  const params = path(['params'], req)
  const id = prop(['id'], params)

  const deck = await shuffleService(id)

  res.status(200).send(deck)
}

module.exports = shuffleController
