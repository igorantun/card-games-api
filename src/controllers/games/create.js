const {
  path,
  pick
} = require('ramda')

const gameService = require('../../services/games')

const create = async (req, res) => {
  const body = path(['body'], req)

  const game = await gameService.create(
    pick(['deckCount', 'deckOptions'], body)
  )

  res.status(201).send(game)
}

module.exports = create
