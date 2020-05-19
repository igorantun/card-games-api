const { Router } = require('express')

const { wrapAsync } = require('../utils')
const { validator } = require('../middlewares')
const {
  buyController,
  createController,
  returnController,
  shuffleController
} = require('../controllers')
const {
  buySchema,
  createSchema,
  returnSchema
} = require('../middlewares/validator/schemas')

const router = Router()

router.post(
  '/decks',
  validator(createSchema),
  wrapAsync(createController)
)

router.put(
  '/decks/:id/buy',
  validator(buySchema),
  wrapAsync(buyController)
)

router.put(
  '/decks/:id/return',
  validator(returnSchema),
  wrapAsync(returnController)
)

router.put(
  '/decks/:id/shuffle',
  wrapAsync(shuffleController)
)

module.exports = router
