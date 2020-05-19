const { Router } = require('express')

const { wrapAsync } = require('../utils')
const { validator } = require('../middlewares')
const {
  createController,
  shuffleController
} = require('../controllers')
const { createSchema } = require('../middlewares/validator/schemas')

const router = Router()

router.post(
  '/decks',
  validator(createSchema),
  wrapAsync(createController)
)

router.put(
  '/decks/:id/shuffle',
  wrapAsync(shuffleController)
)

module.exports = router
